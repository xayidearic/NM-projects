import Styles from './ProfilePageBanner.module.scss';
import { ProfileInfoProps } from './../utils';

const ProfilePageBanner = ({ data }: ProfileInfoProps) => {

  return (
    <div className={`${Styles.banner} row`}>
      <div className="col-12 d-flex justify-content-center align-items-center">
        <div className="text-center">
          <p className="metadata mb-4">
            Home<span className="mx-3">/</span> People Pages
          </p>
          <h1 className={Styles.title}>
            {data?.NMUserModelWorkday.FirstName} {data?.NMUserModelWorkday.LastName}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default ProfilePageBanner;
