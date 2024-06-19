import { useSelector } from 'react-redux';

import blur from '../formatting/blurDataFormat.js';
import handleSectionScroll from '../scrollToSection.js';
import jobLevels from '../qualifyingLTIPJobLevels.js';
import { useGetCompensationDataQuery } from '../../dux/totalRewardsApi.js';
import { getCurrencyFormat } from '../formatting/formatSalaryAmount.js';

const BaseSalaryRow = () => {
  const { data } = useGetCompensationDataQuery('data');
  const { Salary } = data?.formattedAmount || {};
  const hideData = useSelector((state) => state.hideData.hideCompData);

  return (
    <tr className="hover" onClick={() => handleSectionScroll('AS')}>
      <td>Base Pay</td>
      <td></td>
      <td className="text-truncate text-end">{hideData ? blur.amount : Salary}</td>
    </tr>
  );
};

const AnnualIncentiveRow = () => {
  const { data } = useGetCompensationDataQuery('data');
  const { Target_AI_Amt } = data?.formattedAmount || {};
  const { Target_AI_Percent } = data?.formattedPercentage || {};
  const hideData = useSelector((state) => state.hideData.hideCompData);

  return (
    <tr className="hover" onClick={() => handleSectionScroll('AIP')}>
      <td>Target Annual Incentive Plan</td>
      <td>{hideData ? blur.percentage : Target_AI_Percent} of Base Pay</td>
      <td>{hideData ? blur.amount : Target_AI_Amt}</td>
    </tr>
  );
};

const LongTermIncentiveRow = () => {
  const { data } = useGetCompensationDataQuery('data');
  const { LTI_Amt_Target_Amt } = data?.formattedAmount || {};
  const { LTI_Amt_Target_Pct } = data?.formattedPercentage || {};
  const hideData = useSelector((state) => state.hideData.hideCompData);

  return jobLevels.includes(data.Job_Level) ? (
    <tr className="hover" onClick={() => handleSectionScroll('LTIP')}>
      <td>Target Long-term Incentive Plan</td>
      <td>
        {hideData ? blur.percentage : LTI_Amt_Target_Pct} of{' '}
        {data.Annual_Incentive_Plan_is_Investment.toLowerCase() === 'yes' ? 'Target Annual Incentive Amt' : 'Base Pay'}
      </td>
      <td>{hideData ? blur.amount : LTI_Amt_Target_Amt}</td>
    </tr>
  ) : null;
};

const TotalCompensation = () => {
  const { data } = useGetCompensationDataQuery('data');
  const { Salary, Target_AI_Amt, LTI_Amt_Target_Amt, Job_Level } = data || {};
  const hasLTIP = jobLevels.includes(Job_Level);
  const totalComp = hasLTIP ? Salary + Target_AI_Amt + LTI_Amt_Target_Amt : Salary + Target_AI_Amt;
  const totalCompensation = getCurrencyFormat(totalComp);
  const hideData = useSelector((state) => state.hideData.hideCompData);

  return (
    <tr>
      <td colSpan={2}>Target Total Compensation</td>
      <td className="text-end text-truncate">{hideData ? blur.sumTotal : totalCompensation}</td>
    </tr>
  );
};

const DataTableBody = () => {
  return (
    <tbody>
      <BaseSalaryRow />
      <AnnualIncentiveRow />
      <LongTermIncentiveRow />
      <TotalCompensation />
    </tbody>
  );
};

export default DataTableBody;
