import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProfileAvatarImage from './ProfileAvatarImage';
import Styles from './ProfileAvatarImage.module.scss';
import { mockUseGetUserDataQuery } from './../ProfilePage.test';

describe('ProfileAvatarImage', () => {
  it('renders profile image with correct src and alt text', () => {
    render(<ProfileAvatarImage data={mockUseGetUserDataQuery().data} />);

    const imgElement = screen.getByRole('img');
    expect(imgElement).toHaveAttribute('src', `/api/Workday/ProfileImage/123456`);
    expect(imgElement).toHaveAttribute('alt', `Profile image for John Doe`);
  });

  it('renders avatar container with correct styles', () => {
    render(<ProfileAvatarImage data={mockUseGetUserDataQuery().data} />);

    const avatarContainer = screen.getByRole('img').closest('div');
    expect(avatarContainer).toHaveClass(Styles.avatar);
  });
});
