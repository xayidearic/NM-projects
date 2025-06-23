import { useGetUserDataQuery } from '../../dux/lanIdApi';
import ProfileOrgChart from '../ProfileOrgChart/ProfileOrgChart';
import styles from './ProfileTeamsSection.module.scss';
// @ts-expect-error - TODO: Fix this by converting to TypeScript
import AuthoredContentHandler from './../../total-rewards/AuthoredContentHandler';

const ProfileTeamsSection = ({ lanId }: { lanId: string }) => {
  const { data } = useGetUserDataQuery({ lanid: lanId, isCoworkers: false });
  const { NMUserModelLocalData } = data;
  const { TeamName, AboutTeam } = NMUserModelLocalData;

  return (
    <div className={`${styles.teamsSection} card mt-6 mt-md-4 mt-lg-8`}>
      <div className="mb-6 mb-md-8 mb-lg-10">
        <h2 className="mb-4">Teams</h2>
        {TeamName && <p className="metadata mb-2 color-secondary weight-500">{TeamName}</p>}
        {AboutTeam && (
          <p
            style={{ whiteSpace: 'pre-wrap' }}
            className="p1"
          >
            <AuthoredContentHandler content={AboutTeam} />
          </p>
        )}
      </div>

      <ProfileOrgChart lanId={lanId} />
    </div>
  );
};

export default ProfileTeamsSection;
