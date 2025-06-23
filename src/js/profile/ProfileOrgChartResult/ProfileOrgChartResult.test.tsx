import { describe, it } from 'vitest';
import { render } from '@testing-library/react';
import { ProfileOrgChartImg, ProfileOrgChartInfo } from './ProfileOrgChartResult';
import { mockUseGetUserDataQuery } from '../ProfilePage.test';

describe('ProfileOrgChartResult components', () => {
    const mockData = mockUseGetUserDataQuery().data;

    it('ProfileOrgChartImg renders with correct alt and src', () => {
        const { getByAltText } = render(
            <ProfileOrgChartImg data={mockData} isMainOrgChart />
        );
        const img = getByAltText('Profile Image for 123456');
        expect(img).toBeInTheDocument();
        expect(img).toHaveAttribute('src', '/api/Workday/ProfileImage/123456');
    });

    it('ProfileOrgChartInfo displays user name', () => {
        const { getByText } = render(
            <ProfileOrgChartInfo data={mockData} isMainOrgChart />
        );
        expect(getByText('John Doe')).toBeInTheDocument();
    });

    it('ProfileOrgChartInfo link has correct class', () => {
        const { container } = render(
            <ProfileOrgChartInfo data={mockData} isMainOrgChart />
        );
        const linkElement = container.querySelector('a');
        expect(linkElement).toHaveClass('h4');
    });
});
