import Styles from './ProfileEmployeeContact.module.scss';
import { ProfileInfoProps } from '../utils';

const ProfileEmployeeContact = ({ data }: ProfileInfoProps) => {
  const href = `tel:${data?.NMUserModelWorkday.WorkPhone}`;
  const email = `mailto:${data?.NMUserModelWorkday.WorkEmail}`

  return (
    <div className="-flex flex-row justify-content-center align-items-center">
      <a className={`me-5 ${Styles.phoneIcon}`} href={href}>
        <img src="/Content/Images/icons/phone_icon.svg" alt="work phone" />
      </a>
      <a className={Styles.mailIcon} href={email}>
        <img src="/Content/Images/icons/mail_icon.svg" alt="email" />
      </a>
    </div>
  );
};

export default ProfileEmployeeContact;