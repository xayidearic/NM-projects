import { render } from '@testing-library/react';
import { vi } from 'vitest';
import ProfileWorkers from './ProfileWorkers';
import { mockUseGetUserDataQuery } from './../ProfilePage.test';
import store from '../../store';
import { Provider } from 'react-redux';

describe('ProfileWorkers', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('handles empty coworker list gracefully', () => {
    const renderComponent = () =>
      render(
        <Provider store={store}>
          <ProfileWorkers
            data={mockUseGetUserDataQuery().data}
            userLanId="user2"
            title="Coworkers"
          />
        </Provider>
      );
    expect(() => {
      renderComponent();
    }).not.toThrow();
  });
});
