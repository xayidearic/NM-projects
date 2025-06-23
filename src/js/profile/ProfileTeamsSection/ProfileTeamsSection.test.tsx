import { describe, it } from 'vitest';
import ProfileTeamsSection from './ProfileTeamsSection';
import { render } from '@testing-library/react';


const mockUseGetUserDataQuery = vi.fn(() => ({
    data: {
        NMUserModelLocalData: {
            TeamName: 'Test Team',
            AboutTeam: 'This is a test team description.',
        },
        NMUserModelWorkday: {
            WorkdayServiceOnline: true,
        }
    },
}));

vi.mock('../../dux/lanIdApi', () => ({
    useGetUserDataQuery: () => mockUseGetUserDataQuery(),
}));

describe('ProfileAboutSection', () => {
    it('renders the ProfileAboutSection component', () => {
        expect(() => {
            render(
                <ProfileTeamsSection lanId={'12345'} />
            );
        }).not.toThrowError();
    });
    it('renders the team name and description', () => {
        const { getByText } = render(
            <ProfileTeamsSection lanId={'12345'} />
        );

        expect(getByText('Test Team')).toBeInTheDocument();
        expect(getByText('This is a test team description.')).toBeInTheDocument();
    });
});