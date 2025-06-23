import { useMemo } from 'react';
import classNames from 'classnames';

import { ProfileOrgChartImg, ProfileOrgChartInfo } from '../ProfileOrgChartResult/ProfileOrgChartResult';
import { useGetUserDataQuery } from '../../dux/lanIdApi';
import { skipToken } from '@reduxjs/toolkit/query';
import styles from './ProfileWorkers.module.scss';
import { Coworker, ProfileOrgChartListProps } from '../utils';

/**
 * Component to display a list of coworkers in the profile section.
 * Logic:
 * To display NO coworkers message if DirectReportsLanIds should equal CoworkerLanIds.
 * It fetches coworker data based on the Ids provided in the CoworkerLanIds field.
 * It filters out the current user's LanId from the list of coworkers.
 * Loading state is handled to show a loader while fetching data.
 */
const ProfileWorkers = ({ data, userLanId, title }: ProfileOrgChartListProps) => {
  const { CoworkerLanIds = '', DirectReportsLanIds = '', IsLeader } = data?.NMUserModelWorkday || {};
  const showDirectReports = title === 'Direct Reports';
  const showCoworkers = title === 'Coworkers';

  // Memoize filtered coworker lanIds (excluding current user)
  const lanIds = useMemo(() => {
    const ids = showDirectReports
      ? DirectReportsLanIds
      : showCoworkers
      ? CoworkerLanIds
      : '';
    return ids.split(';').filter(lanId => lanId && lanId !== userLanId);
  }, [userLanId, showCoworkers, showDirectReports, CoworkerLanIds, DirectReportsLanIds]);

  const displayNoCoworkers = showCoworkers && ( CoworkerLanIds === DirectReportsLanIds || !lanIds.length);

  const queryString = lanIds.length > 0 ? `lanId=${lanIds.join('&lanId=')}` : '';
  const { data: dataSet = [], isLoading } = useGetUserDataQuery(
    queryString ? { lanid: queryString, isCoworkers: true } : skipToken
  );

  const renderContent = () => {
    if (isLoading) {
      return (
        <>
          <div className={classNames('w-100', styles.coworkers, { [styles.fullHeightCoworkers]: !IsLeader })} />
          <div className={styles.brandLoader} aria-busy="true" />
        </>
      );
    }
    if (displayNoCoworkers) {
      return (
        <div className={styles.noCoworkers}>
          <div>
            <img
              className="w-100"
              src="/Content/Images/icons/coworkers_icon.svg"
              alt="coworkers icon"
            />
          </div>
          <p className="eyebrow">No coworkers to display</p>
        </div>
      );
    }
    return (
      <div className={classNames('w-100', styles.coworkers, { [styles.fullHeightCoworkers]: !IsLeader })}>
        {dataSet.map((coworker: Coworker) => (
          <div key={coworker.NMUserModelWorkday.LanId} className={styles.resultListItem}>
            <ProfileOrgChartImg data={coworker} isMainOrgChart={false} />
            <ProfileOrgChartInfo data={coworker} />
          </div>
        ))}
      </div>
    );
  };

  return (
    <div
      className={classNames('d-flex flex-column position-relative', styles.container, {
        [styles.fullHeightCoworkers]: !IsLeader,
        'mb-md-4 mb-6': IsLeader,
      })}
    >
      <h4 className="me-auto">{title}</h4>
      {renderContent()}
    </div>
  );
};

export default ProfileWorkers;
