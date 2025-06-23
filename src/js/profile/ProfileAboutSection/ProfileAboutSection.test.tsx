import { describe, it } from 'vitest';
import ProfileAboutSection from './ProfileAboutSection';
import { renderStores } from '../../../../test/render-stores';
import { mockUseGetUserDataQuery } from './../ProfilePage.test';

describe('ProfileAboutSection', () => {
  it('renders the ProfileAboutSection component', () => {
    expect(() => {
      renderStores(<ProfileAboutSection data={mockUseGetUserDataQuery().data} />);
    }).not.toThrowError();
  });
});
