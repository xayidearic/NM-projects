import { describe, it } from 'vitest';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';

import ProfileOrgChart from './ProfileOrgChart';
import store from '../../store';

describe('ProfileOrgChart', () => {
  it('renders the org chart ', () => {
    expect(() => {
      render(
        <Provider store={store}>
          <ProfileOrgChart lanId={'123456'} />
        </Provider>
      );
    }).not.toThrowError();
  });
});
