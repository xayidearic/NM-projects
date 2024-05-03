import { useEffect, useState } from 'react';

import ResourceListLinks from '../ResourceListLinks.jsx';
import AuthoredContentHandler from '../../AuthoredContentHandler.jsx';
import blur from '../../formatting/blurDataFormat.js';
import { getCurrencyFormat } from '../../formatting/formatSalaryAmount.js';
import { useGetCompensationDataQuery } from '../../../dux/totalRewardsApi.js';

const LongTermIPDataConditional = () => {
  const { data, isError, isLoading } = useGetCompensationDataQuery('data');

  if (isLoading || isError) {
    return (
      <div className={`${isLoading ? 'neutral-light-gray-bg' : 'neutral-cloud-bg'} total-rewards-resource__data p-4 mb-4`}>
        <p className="mb-0 p-12"></p>
      </div>
    );
  }

  return data ? <OutstandingGrantsTable data={data} /> : null;
};

const OutstandingGrantsTable = ({ data }) => {
  const [totalGrant, setTotalGrant] = useState(getCurrencyFormat(0));
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    if (data) {
      const totalLongTermGrant = data.Future_LTI_Grant_Amt + data.Future_LTI_Amt_1_Year + data.Future_LTI_Amt_2_Years + data.Future_LTI_Amt_3_Years;

      setTotalGrant(getCurrencyFormat(totalLongTermGrant));
    }
  }, [data]);

  return (
    <div className="total-rewards-table mb-8">
      <table>
        <thead>
          <tr>
            <th colSpan={3}>
              <h4 className="color-primary m-0">Outstanding Long-term Grants</h4>
              <div className="metadata mt-1">Payout date is three years after it was awarded.</div>
            </th>
          </tr>
        </thead>
        <tbody>
          {/**do not display row if data not populated */}
          {data.Future_LTI_Grant_Amt ? (
            <tr>
              <td>{currentYear} Long-term Incentive</td>
              <td className="text-truncate text-end">{data.hideData ? blur.amount : data.formattedAmount.Future_LTI_Grant_Amt}</td>
            </tr>
          ) : null}
          {data.Future_LTI_Amt_1_Year ? (
            <tr>
              <td>{currentYear - 1} Long-term Incentive</td>
              <td className="text-truncate text-end">{data.hideData ? blur.amount : data.formattedAmount.Future_LTI_Amt_1_Year}</td>
            </tr>
          ) : null}
          {data.Future_LTI_Amt_2_Years ? (
            <tr>
              <td>{currentYear - 2} Long-term Incentive</td>
              <td className="text-truncate text-end">{data.hideData ? blur.amount : data.formattedAmount.Future_LTI_Amt_2_Years}</td>
            </tr>
          ) : null}
          {data.Future_LTI_Amt_3_Years ? (
            <tr>
              <td>{currentYear - 3} Long-term Incentive</td>
              <td className="text-truncate text-end">{data.hideData ? blur.amount : data.formattedAmount.Future_LTI_Amt_3_Years}</td>
            </tr>
          ) : null}
          <tr>
            <td>Total Outstanding Long-term Grants</td>
            <td className="text-truncate text-end">{data.hideData ? blur.amount : totalGrant}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

const LongTermIPResource = ({ sectionContent }) => {
  const { data } = useGetCompensationDataQuery('data');
  if (data && !data.Future_LTI_Grant_Amt && !data.Future_LTI_Amt_1_Year && !data.Future_LTI_Amt_2_Years && !data.Future_LTI_Amt_3_Years) {
    return null;
  }

  return (
    <section className="total-rewards-resource">
      <h2 className="color-primary">{sectionContent.Title}</h2>
      <div className="d-lg-block d-flex flex-column">
        <ResourceListLinks hasResources={sectionContent.HasResources} resourceLinks={sectionContent.ResourceLinks} />
        <div className={sectionContent.HasResources && 'col-lg-8 pe-lg-7'}>
          <LongTermIPDataConditional />
        </div>
        <AuthoredContentHandler content={sectionContent.SectionBody} />
      </div>
    </section>
  );
};

export default LongTermIPResource;
