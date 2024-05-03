import AuthoredContentHandler from '../../AuthoredContentHandler.jsx';
import blur from '../../formatting/blurDataFormat.js';
import ResourceListLinks from '../ResourceListLinks.jsx';
import ResourceDivider from '../../ResourceDivider.jsx';
import ResourceLogoSection from '../ResourceLogoSection.jsx';
import Tooltip from '../../../components/Tooltip.jsx';
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
 * Renders the connection state for the table, which includes loading, error, and success states.
 *
 * @param {Object} props - The props for the component.
 * @param {Object} props.flexSpendingData - Flex spending data.
 * @param {Object} props.dependantFlexSpendingData - Dependant flex spending data.
 * @returns {JSX.Element} The rendered state and content.
 */
const TableConnectionState = ({ flexSpendingData, dependantFlexSpendingData }) => {
  const { isError, isLoading } = useGetHealthBenefitsDataQuery('data');

  if (isError) {
    return (
      <div className="neutral-cloud-bg total-rewards-resource__data col-12">
        <p className="mb-0 p-12"></p>
      </div>
    );
  } else if (isLoading) {
    return (
      <div className="neutral-light-gray-bg total-rewards-resource__data col-12">
        <p className="mb-0 p-12"></p>
      </div>
    );
  } else {
    return <Table flexSpendingData={flexSpendingData} dependantFlexSpendingData={dependantFlexSpendingData} />;
  }
};

/**
 * Renders the table displaying the health benefits data.
 *
 * @param {Object} props.flexSpendingData - Flex spending data.
 * @param {Object} props.dependantFlexSpendingData - Dependant flex spending data.
 */
const Table = ({ flexSpendingData, dependantFlexSpendingData }) => {
  const {
    data: { hideData },
  } = useGetHealthBenefitsDataQuery('data');

  return (
    <div className="total-rewards-table mb-8">
      <table className="w-100">
        <tbody>
          <tr className="neutral-light-gray-background">
            <td className="weight-brand-bold">Account Type</td>
            <td className="text-truncate text-end">Annual Contribution</td>
          </tr>
          {flexSpendingData ? (
            <tr>
              <td>
                <div className="d-flex">
                  Health Care FSA
                  <Tooltip targetClass={'position-relative ms-2'} targetContent={'tool-tip__content--hfsa'}>
                    If you’re enrolled in one of our Health Savings Account (HSA) plans, your FSA will be a Limited Purpose FSA (LPFSA). Until you
                    reach the deductible, the funds in your LPFSA can only be used for eligible dental and vision expenses.
                  </Tooltip>
                </div>
              </td>
              <td className="text-truncate text-end">{hideData ? blur.amount : getCurrencyFormat(flexSpendingData.VOLUME)}</td>
            </tr>
          ) : null}
          {dependantFlexSpendingData ? (
            <tr>
              <td>Dependant Care FSA</td>
              <td className="text-truncate text-end">{hideData ? blur.amount : getCurrencyFormat(dependantFlexSpendingData.VOLUME)}</td>
            </tr>
          ) : null}
        </tbody>
      </table>
    </div>
  );
};

/**
 * Renders the Flex Spending Resource section.
 *
 * @param {Object} props.sectionContent - Content for the section.
 * @returns {JSX.Element|null} The rendered flex spending resource or null.
 */
const FlexSpendingResource = ({ sectionContent }) => {
  const { data = {} } = useGetHealthBenefitsDataQuery('data');

  const flexSpendingAccount = data?.data?.find((plan) => plan.BENEFIT_TYPE === 'HFSA');
  const dependantFlexSpendingAccount = data?.data?.find((plan) => plan.BENEFIT_TYPE === 'DCFSA');
  const healthReimburseAccount = data?.data?.find((plan) => plan.BENEFIT_TYPE === 'HRA');

  const notLastResource = healthReimburseAccount;

  return flexSpendingAccount || dependantFlexSpendingAccount ? (
    <section className={`total-rewards-resource financial-security-resource mt-lg-11 ${!notLastResource ? 'pb-12' : ''}`}>
      <div className="d-lg-block d-flex flex-column">
        <ResourceListLinks hasResources={sectionContent.HasResources} resourceLinks={sectionContent.ResourceLinks} />
        <div className={sectionContent.HasResources && 'col-lg-8 pe-lg-7'}>
          <SectionTitle title={sectionContent.Title} />
          <TableConnectionState flexSpendingData={flexSpendingAccount} dependantFlexSpendingData={dependantFlexSpendingAccount} />
        </div>
        <AuthoredContentHandler content={sectionContent.SectionBody} />
        <ResourceLogoSection sectionContent={sectionContent} linkInline={true} />
      </div>

      {notLastResource ? <ResourceDivider /> : null}
    </section>
  ) : null;
};

export default FlexSpendingResource;
