import { useEffect, useState } from 'react';

import blur from '../formatting/blurDataFormat.js';
import handleSectionScroll from '../scrollToSection.js';
import jobLevels from '../qualifyingLTIPJobLevels.js';
import { useGetCompensationDataQuery } from '../../dux/totalRewardsApi.js';

const BaseSalaryRow = ({ salary, hideData }) => {
  return (
    <tr className="hover" onClick={() => handleSectionScroll('AS')}>
      <td>Base Pay</td>
      <td></td>
      <td className="text-truncate text-end">{hideData ? blur.amount : salary}</td>
    </tr>
  );
};

const AnnualIncentiveRow = ({ Target_AI_Percent, Target_AI_Amt, hideData }) => {
  return (
    <tr className="hover" onClick={() => handleSectionScroll('AIP')}>
      <td>Target Annual Incentive Plan</td>
      <td>{hideData ? blur.percentage : Target_AI_Percent} of Base Pay</td>
      <td>{hideData ? blur.amount : Target_AI_Amt}</td>
    </tr>
  );
};

const LongTermIncentiveRow = ({ data, LTI_Amt_Target_Pct, LTI_Amt_Target_Amt, hideData }) => {
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

const TotalCompensation = ({ data }) => {
  const [totalCompensation, setTotalCompensation] = useState(null);
  const hasLTIP = jobLevels.includes(data.Job_Level);

  useEffect(() => {
    if (data) {
      const totalComp = hasLTIP ? data.Salary + data.Target_AI_Amt + data.LTI_Amt_Target_Amt : data.Salary + data.Target_AI_Amt;

      setTotalCompensation(new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', currencyDisplay: 'narrowSymbol' }).format(totalComp));
    }
  }, [data, hasLTIP]);

  return (
    <tr>
      <td colSpan={2}>Target Total Compensation</td>
      <td className="text-end text-truncate">{data.hideData ? blur.sumTotal : totalCompensation}</td>
    </tr>
  );
};

const DataTableBody = () => {
  const { data } = useGetCompensationDataQuery('data');

  return (
    data && (
      <tbody>
        <BaseSalaryRow salary={data.formattedAmount.Salary} hideData={data.hideData} />
        <AnnualIncentiveRow
          Target_AI_Percent={data.formattedPercentage.Target_AI_Percent}
          Target_AI_Amt={data.formattedAmount.Target_AI_Amt}
          hideData={data.hideData}
        />
        <LongTermIncentiveRow
          data={data}
          LTI_Amt_Target_Pct={data.formattedPercentage.LTI_Amt_Target_Pct}
          LTI_Amt_Target_Amt={data.formattedAmount.LTI_Amt_Target_Amt}
          hideData={data.hideData}
        />
        <TotalCompensation data={data} />
      </tbody>
    )
  );
};

export default DataTableBody;
