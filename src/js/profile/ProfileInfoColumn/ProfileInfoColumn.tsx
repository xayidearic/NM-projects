import { LocalTime } from '../LocalTime/LocalTime';
import { NamePronunciation } from '../ProfileNamePronunciation/ProfileNamePronunciation';
import Styles from './ProfileInfoColumn.module.scss';
import ProfileAvatarImage from '../ProfileAvatarImage/ProfileAvatarImage';
import ProfileEmployeeContact from '../ProfileEmployeeContact/ProfileEmployeeContact';
import ProfileEmpInfo from '../ProfileEmpInfo/ProfileEmpInfo';
import { ProfileEditButtonProps, ProfileInfoProps } from '../utils';

const ProfileName = ({ data }: ProfileInfoProps) => {
  const firstName = data?.NMUserModelWorkday.FirstName;
  const lastName = data?.NMUserModelWorkday.LastName;
  const employeeName = `${firstName} ${lastName}`;
  const isContingentWorker = data?.NMUserModelWorkday.WorkerType === 'Contingent Worker';

  return (
    <h1
      id="profile-name"
      className={`${Styles.employeeName} text-break mt-6 mt-md-3 mt-lg-8 mb-2 mb-md-1 mb-lg-2 text-center`}
    >
      {employeeName}
      {isContingentWorker && <span> [C]</span>}
    </h1>
  );
};

const ProfileBusinessTitle = ({ data }: ProfileInfoProps) => {
  const businessTitle = data?.NMUserModelWorkday.BusinessTitle;

  return <p className={`${Styles.employeeTitle} mb-4 weight-100 text-center`}>{businessTitle}</p>;
};

const ProfileEditButton = ({ showEdit }: ProfileEditButtonProps) => {
  if (!showEdit) return null;

  return (
      <a className={`${Styles.editBtn} button button--secondary align-items-center button-form`} href={`/en/profile-update`}>
        Edit My Profile
      </a>
    );
};

const ProfileInfoColumn = ({ data, showEdit }: ProfileEditButtonProps) => {
  const { NMUserModelWorkday, NMUserModelLocalData } = data ?? {};
  const { LanId, PhoneticAudioFlag} = NMUserModelWorkday ?? {};
  const { TimeZone } = NMUserModelLocalData ?? {};

  return (
    <div className={`${Styles.rightCol} col-12 col-md-4 pb-lg-0 pe-lg-7 pe-md-4 pe-0`}>
      <div className={`${Styles.info} align-items-center d-flex flex-column justify-content-center w-100`}>
        <ProfileAvatarImage data={data} />
        <ProfileName data={data} />
        {PhoneticAudioFlag && <NamePronunciation pageType="profile-page" phoneticName={data?.NMUserModelWorkday.PhoneticName} lanId={LanId} />}
        <ProfileBusinessTitle data={data} />
        <ProfileEmployeeContact data={data} />
        {TimeZone && <LocalTime timeZone={TimeZone} />}
        <hr className={`${Styles.divider} my-6 my-lg-10`} aria-hidden="true" />
        <ProfileEmpInfo data={data} />
        <ProfileEditButton data={data} showEdit={showEdit} />
      </div>
    </div>
  );
};

export default ProfileInfoColumn;
