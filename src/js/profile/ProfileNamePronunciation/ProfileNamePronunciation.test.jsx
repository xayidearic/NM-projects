import { describe, it, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';

import { NamePronunciation } from './ProfileNamePronunciation';
import store from '../../store';

const mockUseGetAudioUrlQuery = vi.fn(() => ({
  data: {
    AudioUrl: 'https://example.com/audio.mp3',
  },
}));

vi.mock('../../../dux/audioNameService.ts', () => ({
  useGetAudioUrlQuery: () => mockUseGetAudioUrlQuery(),
}));

describe('NamePronunciation section', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders without crashing and displays NamePronunciation section', () => {
    render(
      <Provider store={store}>
        <NamePronunciation pageType="update-page" name="Wis - Ker - chen" lanId="456" />
      </Provider>
    );
    expect(screen.getByText('Name Pronunciation')).toBeInTheDocument();
  });
});
