import { describe, it } from 'vitest';

import ProfileInfoColumn from './ProfileInfoColumn';
import { mockUseGetUserDataQuery } from '../ProfilePage.test';
import { renderStores } from '../../../../test/render-stores';

const showEdit = true;

describe('ProfileInfoColumn', () => {
    const renderComponent = () =>
        renderStores(
            <ProfileInfoColumn data={mockUseGetUserDataQuery().data} showEdit={showEdit} />
        );

    it('renders without throwing', () => {
        expect(() => {
            renderComponent();
        }).not.toThrow();
    });

    it('shows the "Edit My Profile" button when showEdit is true', () => {
        const { getByText } = renderComponent();
        expect(getByText('Edit My Profile')).toBeInTheDocument();
    });

    it('displays the correct profile name', () => {
        const { getByText } = renderComponent();
        expect(getByText('John Doe')).toBeInTheDocument();
    });
});
