import { describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';

import ProfileEmployeeContact from './ProfileEmployeeContact';
import { mockUseGetUserDataQuery } from './../ProfilePage.test';

describe('ProfileEmployeeContact', () => {
  const renderComponent = () =>
    render(<ProfileEmployeeContact data={mockUseGetUserDataQuery().data} />);

  it('renders work phone link with correct href', () => {
    renderComponent();
    const phoneLink = screen.getByRole('link', { name: /work phone/i });
    expect(phoneLink).toHaveAttribute('href', 'tel:(414) 665-2834');
  });

  it('renders email link with correct href', () => {
    renderComponent();
    const emailLink = screen.getByRole('link', { name: /email/i });
    expect(emailLink).toHaveAttribute('href', 'mailto:johndoe@northwesternmutual.com');
  });
});