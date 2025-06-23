import { describe, it, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import ProfileManagerLink from './ProfileInfoColLink';

const mockUseGetUserDataQuery = vi.fn(() => ({
  data: {
    NMUserModelWorkday: {
      FirstName: 'John',
      LastName: 'Doe',
      BusinessTitle: 'Manager',
    },
  },
}));

// Mock the useGetUserDataQuery hook
vi.mock('../../dux/lanIdApi', () => ({
  useGetUserDataQuery: () => mockUseGetUserDataQuery(),
}));

describe('ProfileManagerLink', () => {
  beforeEach(() => {
    mockUseGetUserDataQuery.mockClear();
  });

  it('renders manager link with correct name and title', () => {
    render(<ProfileManagerLink lanId="123456" linkType="manager" />);

    const linkElement = screen.getByRole('link', { name: 'John Doe' });
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute('href', '/en/profile/?lanId=123456');

    const titleElement = screen.getByText('Manager');
    expect(titleElement).toBeInTheDocument();
  });

  it('applies secondary color class for assistant link', () => {
    render(<ProfileManagerLink lanId="123456" linkType="assistant" />);

    const linkElement = screen.getByRole('link', { name: 'John Doe' });
    expect(linkElement).toHaveClass('color-secondary');
  });

});
