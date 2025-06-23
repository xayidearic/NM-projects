import styles from './ProfileAboutSection.module.scss';
import { ProfileInfoProps } from '../utils';
// @ts-expect-error - TODO: Fix this by converting to TypeScript
import AuthoredContentHandler from './../../total-rewards/AuthoredContentHandler';

const ProfileAboutSection = ({ data }: ProfileInfoProps ) => {
  const { NMUserModelWorkday, NMUserModelLocalData } = data ?? {};
  const { WorkerType, AboutMe } = NMUserModelWorkday ?? {};
  const { ProfileSummary } = NMUserModelLocalData ?? {};

  const aboutInfo = WorkerType === 'Employee' ? AboutMe : ProfileSummary;

  return (
    <div className={`${styles.aboutSection} card`}>
      <h2 className="mb-2">About</h2>
      {aboutInfo && (
        <p style={{ whiteSpace: 'pre-wrap'}} className='p1'>
          <AuthoredContentHandler content={aboutInfo} />
        </p>
      )}
    </div>
  );
};
export default ProfileAboutSection;
