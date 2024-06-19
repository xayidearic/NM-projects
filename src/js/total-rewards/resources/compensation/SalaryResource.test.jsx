/// <reference types="@testing-library/jest-dom" />
import { screen } from '@testing-library/dom';
import { renderHook, waitFor } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { errorHandlers, server } from '../../../../../mocks/server.js';
import { renderStores, wrapper } from '../../../../../test/render-stores.jsx';
import { useGetCompensationDataQuery } from '../../../dux/totalRewardsApi.js';
import SalaryResource from './SalaryResource';

describe('SalaryResource', () => {
  it('should render and get data back successfully', async () => {
    const { result, rerender } = renderHook(useGetCompensationDataQuery, { wrapper });

    renderStores(<SalaryResource sectionContent={{ HasResources: false, SectionBody: '<p>I am Bob</p>', Title: 'My Salary' }} />);

    const loader = screen.queryByRole('progressbar');

    expect(loader).toBeInTheDocument();

    rerender();
    await waitFor(() => expect(result.current.isLoading).toBe(false));

    const annualSalary = screen.queryByText('Base Pay:');
    const sectionBody = screen.queryByText('I am Bob');

    expect(annualSalary).toBeInTheDocument();
    expect(annualSalary).toHaveTextContent('Base Pay: $66,872');
    expect(sectionBody).toBeInTheDocument();
  });

  it('should render and has an error', async () => {
    server.use(...errorHandlers);

    const { result, rerender } = renderHook(useGetCompensationDataQuery, { wrapper });

    renderStores(<SalaryResource sectionContent={{ HasResources: false, SectionBody: '<p>I am Bob</p>', Title: 'My Salary' }} />);

    rerender();
    await waitFor(() => expect(result.current.isLoading).toBe(false));

    const loader = screen.queryByRole('progressbar');

    expect(loader).toBeInTheDocument();
    expect(result.current.isError).toBe(true);
  });
});
