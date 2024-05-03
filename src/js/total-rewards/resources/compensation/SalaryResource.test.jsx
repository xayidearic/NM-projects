import { renderHook, waitFor } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { errorHandlers, server } from '../../../../../mocks/server';
import { renderStores, wrapper } from '../../../../../test/render-stores';
import { useGetCompensationDataQuery } from '../../../services/total-rewards/api';
import SalaryResource from './SalaryResource';

describe('SalaryResource', () => {
  it('should render and get data back successfully', async () => {
    const { result, rerender } = renderHook(useGetCompensationDataQuery, { wrapper });

    const { queryByRole, queryByText } = renderStores(
      <SalaryResource sectionContent={{ HasResources: false, SectionBody: '<p>I am Bob</p>', Title: 'My Salary' }} />
    );

    const loader = queryByRole('progressbar');

    expect(loader).toBeInTheDocument();

    rerender();
    await waitFor(() => expect(result.current.isLoading).toBe(false));

    const annualSalary = queryByText('Base Pay:');
    const sectionBody = queryByText('I am Bob');

    expect(annualSalary).toBeInTheDocument();
    expect(annualSalary).toHaveTextContent('Base Pay: $66,872');
    expect(sectionBody).toBeInTheDocument();
  });

  it('should render and has an error', async () => {
    server.use(...errorHandlers);

    const { result, rerender } = renderHook(useGetCompensationDataQuery, { wrapper });

    const { queryByRole } = renderStores(
      <SalaryResource sectionContent={{ HasResources: false, SectionBody: '<p>I am Bob</p>', Title: 'My Salary' }} />
    );

    rerender();
    await waitFor(() => expect(result.current.isLoading).toBe(false));

    const loader = queryByRole('progressbar');

    expect(loader).toBeInTheDocument();
    expect(result.current.isError).toBe(true);
  });
});
