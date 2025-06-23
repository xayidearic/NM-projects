import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { EventShareTooltip } from './EventShareToolTip';

beforeEach(() => {
  Object.assign(navigator, {
    clipboard: {
      writeText: vi.fn(),
    },
  });
});


describe('EventShareTooltip', () => {
  const eventUrl = '/test-event';

  it('should render EventShareTooltip', () => {
    const { getByText } = render(<EventShareTooltip eventUrl="/en/_testing/featured-events-test/test-event3-for-multiple-days/" />);
    const copyTextElement = getByText('Copy Link');
    expect(copyTextElement).toBeInTheDocument();
  });

  it('copies the link to the clipboard and updates the text', async () => {
    const writeTextMock = vi.spyOn(navigator.clipboard, 'writeText').mockResolvedValue();

    render(<EventShareTooltip eventUrl={eventUrl} />);

    const button = screen.getByRole('button', { name: 'Copy Link' });
    fireEvent.click(button);

    await waitFor(() => {
      expect(writeTextMock).toHaveBeenCalledWith(`${window.location.origin}${eventUrl}`);
      expect(screen.getByText('Link Copied to clipboard')).toBeInTheDocument();
    });
  });
});