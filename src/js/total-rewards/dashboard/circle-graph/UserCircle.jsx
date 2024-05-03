import { useGetCompensationDataQuery, useGetDashboardDataQuery } from '../../../dux/totalRewardsApi';
import blur from '../../formatting/blurDataFormat';

/**
 * @returns Graph centered circle with user data
 * Endpoint data:
 * User image - Valuation date (actuarial) - Total sum
 */
const UserCircle = () => {
  const urlOrigin = window.location.origin;
  const { data: comp } = useGetCompensationDataQuery('data');
  const { data: totals } = useGetDashboardDataQuery('totals');

  return (
    <g name="user-circle" filter="url(#user-circle-shadow)">
      <circle cx="349.259" cy="349.82" r="190.82" fill="white" />
      <foreignObject x="200" y="220" width="310" height="381">
        <div className="user-circle__content d-flex align-items-center flex-column">
          <div className="user-circle__img overflow-hidden d-flex align-items-center">
            {comp && <img alt="Employee profile picture" src={`${urlOrigin}/api/Workday/ProfileImage/${comp.LAN_ID}`}></img>}
          </div>
          <h4 className="color-primary mb-0">My Total Rewards Value</h4>
          <h1 className="color-primary m-0">{totals.hideData ? blur.amount : totals.formattedAmount.Total}</h1>
        </div>
      </foreignObject>
      <line x1="225.439" y1="452.72" x2="472.439" y2="452.72" stroke="#D4D4D4" strokeWidth="0.98615" />
      <foreignObject x="225.439" y="452.72" width="230" height="100" className="date-foreign-object">
        <div className="user-circle__date mt-4 metadata">Estimated</div>
      </foreignObject>
    </g>
  );
};

export default UserCircle;
