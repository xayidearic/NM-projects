import { describe, it } from 'vitest';
import { render } from '@testing-library/react';

import ProfilePageBanner from './ProfilePageBanner';
import { mockUseGetUserDataQuery } from '../ProfilePage.test';

describe('ProfilePageBanner', () => {
  it('renders the profile page banner with correct name', () => {
    const { getByText } = render(<ProfilePageBanner data={mockUseGetUserDataQuery().data} />);
    expect(getByText(/John Doe/i)).toBeInTheDocument();
  });
});
