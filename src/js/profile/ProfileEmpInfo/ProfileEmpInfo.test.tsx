import { describe, it } from 'vitest';
import { render } from '@testing-library/react';

import ProfileEmpInfo from './ProfileEmpInfo';
import { mockUseGetUserDataQuery } from '../ProfilePage.test';
import { Provider } from 'react-redux';
import store from '../../store';

describe('ProfileEmpInfo', () => {
  it('renders the ProfileEmpInfo component', () => {
    expect(() => {
      render(
        <Provider store={store}>
          <ProfileEmpInfo data={mockUseGetUserDataQuery().data} />
        </Provider>
      );
    }).not.toThrowError();
  });
});
