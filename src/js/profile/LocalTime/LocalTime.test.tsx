import { describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';

import { LocalTime } from './LocalTime';

const mockTimeZone = 'America/New_York';

describe('LocalTime', () => {

  it('renders the local time correctly', () => {
    render(<LocalTime timeZone={mockTimeZone} />);

    const localTimeElement = screen.getByText(/Local Time/i);

    expect(localTimeElement).toBeInTheDocument();
  });
});
