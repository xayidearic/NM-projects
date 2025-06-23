import { useGetUserDataQuery } from '../../dux/lanIdApi';
import styles from './ProfileOrgChartResult.module.scss';
import classNames from 'classnames';
import { ProfileOrgChartProps } from './../utils';

export const ProfileOrgChartImg = ({ data, isMainOrgChart }: ProfileOrgChartProps) => {
  const userLanId = data.NMUserModelWorkday.LanId;
  const imgSrc = `/api/Workday/ProfileImage/${userLanId}`;
  const directReports = data.NMUserModelWorkday.DirectReportsLanIds ?? '';
  const directReportsCount = directReports.split(';').filter((item: string) => item !== '').length;

  return (
    <div className={classNames(styles.avatar, {
      [styles.orgChartEmpImg]: isMainOrgChart,
      [styles.orgChartCoworkerImg]: !isMainOrgChart,
    })}>
      <img
        src={imgSrc}
        alt={`Profile Image for ${userLanId}`}
      />
      {directReportsCount && isMainOrgChart ? (
        <div className={styles.reportCount}>
          <span>{directReportsCount}</span>
        </div>
      ) : null}
    </div>
  );
};

export const ProfileOrgChartInfo = ({ data, isMainOrgChart }: ProfileOrgChartProps) => {
  const userLanId = data.NMUserModelWorkday.LanId;
  const name = `${data.NMUserModelWorkday.FirstName} ${data.NMUserModelWorkday.LastName}`;
  const title = data.NMUserModelWorkday.BusinessTitle;
  const profileLink = `/en/profile/?lanId=${userLanId}`;

  return (
    <div className="d-flex flex-column">
      <a
        className={`text-decoration-none link-fit-content text-break ${isMainOrgChart && 'h4'}`}
        href={profileLink}
      >
        {name}
      </a>
      <p className="p2">{title}</p>
    </div>
  );
};

const ProfileOrgChartResult = ({ lanId }: { lanId: string }) => {
  const { data } = useGetUserDataQuery({ lanid: lanId, isCoworkers: false });

  return data && (
      <>
        <ProfileOrgChartImg
          data={data}
          isMainOrgChart={true}
        />
        <ProfileOrgChartInfo data={data} 
        isMainOrgChart={true} />
      </>
    )
};

export default ProfileOrgChartResult;
