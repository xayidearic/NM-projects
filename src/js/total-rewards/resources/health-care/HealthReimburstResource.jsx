import AuthoredContentHandler from '../../AuthoredContentHandler.jsx';
import blur from '../../formatting/blurDataFormat.js';
import ResourceListLinks from '../ResourceListLinks.jsx';
import ResourceLogoSection from '../ResourceLogoSection.jsx';
import { getCurrencyFormat } from '../../formatting/formatSalaryAmount.js';

import { useGetHealthBenefitsDataQuery } from '../../../dux/totalRewardsApi.js';

/**
 *
 * @param {string} title authored title
 * @returns header title
 */
const SectionTitle = ({ title }) => {
  return (
    <div className="d-flex align-items-center mb-2 justify-content-between">
      <h2 className="color-primary m-0">{title}</h2>
    </div>
  );
};

/**
 * Renders the connection state for the table, including loading, error, and success states,
 * along with the authored content.
 *
 * @param {Object} props.data - Data to be displayed.
 * @param {Object} props.sectionContent - Content for the section.
 * @returns {JSX.Element} The rendered state and content.
 */
const TableConnectionState = ({ data }) => {
  const { isError, isLoading } = useGetHealthBenefitsDataQuery('data');

  if (isError) {
    return (
      <div className="neutral-cloud-bg total-rewards-resource__data col-12 mb-4">
        <p className="mb-0 p-6"></p>
      </div>
    );
  } else if (isLoading) {
    return (
      <div>
        <div className="neutral-light-gray-bg total-rewards-resource__data col-12 mb-4">
          <p className="mb-0 p-6"></p>
        </div>
      </div>
    );
  } else {
    return <Table data={data} displayError={isError} />;
  }
};

/**
 * Renders a table displaying the company's annual health benefits contributions.
 *
 * @param {Object} props.data - Data to be displayed.
 * @returns {JSX.Element} The rendered table.
 */
const Table = ({ data }) => {
  const {
    data: { hideData },
  } = useGetHealthBenefitsDataQuery('data');

  return (
    <div className="total-rewards-table mb-8">
      <table className="w-100">
        <tbody>
          {data ? (
            <tr>
              <td>Company Annual Contributions</td>
              <td className="text-truncate text-end">{hideData ? blur.amount : getCurrencyFormat(data.EMPLOYER_ANNUAL_CONTRIBUTION)}</td>
            </tr>
          ) : null}
        </tbody>
      </table>
    </div>
  );
};

/**
 * Renders the Health Reimbursement Resource section.
 *
 * @param {Object} props.sectionContent - Content for the section.
 * @returns {JSX.Element|null} The rendered health reimbursement resource or null.
 */
const HealthReimburstResource = ({ sectionContent }) => {
  const { data = {} } = useGetHealthBenefitsDataQuery('data');

  const healthReimburseAccount = data?.data?.find((plan) => plan.BENEFIT_TYPE === 'HRA');

  return healthReimburseAccount ? (
    <section className="total-rewards-resource financial-security-resource mt-lg-11 pb-12">
      <div className="d-lg-block d-flex flex-column">
        <ResourceListLinks hasResources={sectionContent.HasResources} resourceLinks={sectionContent.ResourceLinks} />
        <div className={sectionContent.HasResources && 'col-lg-8 pe-8'}>
          <SectionTitle title={sectionContent.Title} />
          <TableConnectionState data={healthReimburseAccount} sectionContent={sectionContent} />
        </div>
        <AuthoredContentHandler content={sectionContent.SectionBody} />
        <ResourceLogoSection sectionContent={sectionContent} linkInline={true} />
      </div>
    </section>
  ) : null;
};

export default HealthReimburstResource;
