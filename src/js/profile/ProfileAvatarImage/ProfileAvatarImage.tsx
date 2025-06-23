import { ProfileInfoProps } from '../utils';
import Styles from './ProfileAvatarImage.module.scss';

const ProfileAvatarImage = ({ data }: ProfileInfoProps) => {
  const { FirstName = '', LastName = '', LanId } = data?.NMUserModelWorkday || {};
  const name = `${FirstName} ${LastName}`;
  const altText = `Profile image for ${name}`;
  const src = LanId ? `/api/Workday/ProfileImage/${LanId}` : undefined;

  return (
    <div className="position-relative">
      <div className={Styles.avatar}>
        {src ? (
          <img
            className="w-100 d-block"
            src={src}
            alt={altText}
          />
        ) : (
          <div className={Styles.placeholder}>{name[0]}</div>
        )}
      </div>
    </div>
  );
};


export default ProfileAvatarImage;