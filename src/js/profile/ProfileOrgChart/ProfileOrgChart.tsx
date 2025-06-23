import { useGetUserDataQuery } from '../../dux/lanIdApi';
import ProfileOrgChartResult from '../ProfileOrgChartResult/ProfileOrgChartResult';
import styles from './ProfileOrgChart.module.scss';
import { ProfileOrgChartListProps, ProfileInfoProps } from './../utils';
import ProfileWorkers from '../ProfileWorkers/ProfileWorkers';

const OrgChartArrow = () => {
  return (
    <div
      className={styles.arrow}
    >
      <img
        className="w-100"
        src="/Content/Images/icons/org-chart-arrow_icon.svg"
        alt="org chart"
      />
    </div>
  );
};

const ProfileOrgChartList = ({ data, userLanId }: ProfileOrgChartListProps) => {
  if (!data?.NMUserModelWorkday?.WorkdayServiceOnline) return null;

  const { ManagerLevel2LanId, ManagerLanId } = data.NMUserModelWorkday;
  const showManagerLevel2 = !!ManagerLevel2LanId && ManagerLevel2LanId !== ManagerLanId;
  const showManagerLevel1 = ManagerLanId && ManagerLanId !== userLanId;

  return (
    <>
      {showManagerLevel2 && (
        <>
          <div className="d-flex flex-row justify-content-start align-items-center">
            <div className="d-flex align-items-center w-100 position-relative">
              <ProfileOrgChartResult lanId={ManagerLevel2LanId} />
            </div>
          </div>
          <OrgChartArrow />
        </>
      )}

      {showManagerLevel1 && (
        <>
          <div className="d-flex flex-row justify-content-start align-items-center">
            <div className="d-flex align-items-center w-100 position-relative">
              <ProfileOrgChartResult lanId={ManagerLanId} />
            </div>
          </div>
          <OrgChartArrow />
        </>
      )}

      <div className="d-flex flex-row justify-content-start align-items-center">
        <div className="d-flex align-items-center w-100 position-relative">
          <ProfileOrgChartResult lanId={userLanId ?? '' } />
        </div>
      </div>
    </>
  );
};

const ProfileOrgChartButton = ({ data } : ProfileInfoProps ) => {
  const { NMUserModelWorkday } = data;
  const { OrgChartLink } = NMUserModelWorkday;

  return (
    <a
      className="button w-100 button--secondary d-flex text-decoration-none text-center mx-auto mt-8"
      href={OrgChartLink}
      target="_blank"
    >
      <img
        className="me-3"
        src="/Content/Images/icons/branch_icon.svg"
        alt="org chart"
      />
      View Full Visual Org Chart
    </a>
  );
};

const ProfileOrgChart = ({ lanId }: { lanId: string }) => {
  const { data } = useGetUserDataQuery({ lanid: lanId, isCoworkers: false });
  const hasDirectReports = data?.NMUserModelWorkday?.IsLeader;

  return data && (
      <div className="org-chart row">
        <div className="col-12 col-md-6 align-items-center text-break">
          <div className={styles.orgChartContainer}>
            <h3>Org Chart</h3>
            <ProfileOrgChartList data={data} userLanId={lanId} />
            <ProfileOrgChartButton data={data} />
          </div>
        </div>
        <div className="col-12 col-md-6 align-items-center text-break">
          {hasDirectReports && <ProfileWorkers
            data={data}
            userLanId={lanId}
            title="Direct Reports"
          />}
          <ProfileWorkers
            data={data}
            userLanId={lanId}
            title="Coworkers"
          />
        </div>
      </div>
    )
};

export default ProfileOrgChart;
