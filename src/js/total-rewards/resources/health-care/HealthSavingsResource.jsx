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
 * Renders the connection state for the table. This handles the loading, error, and success states.
 *
 * @param {Object} props.data - Data to be displayed.
 * @returns {JSX.Element} The rendered state for the table.
 */
const TableConnectionState = ({ data }) => {
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
    return <Table data={data} displayError={isError} />;
  }
};

/**
 * Renders a table displaying the annual contributions for health savings.
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
      <table className="w-100 mb-4">
        <tbody>
          {data ? (
            <tr>
              <td>
                <div className="d-flex">
                  My Annual Contributions
                  <Tooltip targetClass={'position-relative ms-2'} targetContent={'tool-tip__content--my-ann-contributions'}>
                    An HSA is often referred to as having a “triple tax advantage” because contributions, earnings and distributions (for qualified
                    medical expenses) are all tax-free. Plus, the accumulated money rolls over from year to year and is all yours regardless of your
                    employment status. Consider increasing your contribution – a well-funded HSA can help you now and well into your retirement years.
                  </Tooltip>
                </div>
              </td>
              <td className="text-truncate text-end">{hideData ? blur.amount : getCurrencyFormat(data.VOLUME)}</td>
            </tr>
          ) : null}
          {data ? (
            <tr>
              <td>
                <div className="d-flex">
                  Company Annual Contributions
                  <Tooltip targetClass={'position-relative ms-2'} targetContent={'tool-tip__content--comp-ann-contributions'}>
                    Because you elected an HSA eligible plan, Northwestern Mutual will contribute to your account every quarter. The value of NM’s
                    contribution is based on the following amounts (and is prorated for new hires):
                    <ul>
                      <li>Employee only = $500/yr.</li>
                      <li>Employee + spouse/partner = $1000/yr. </li>
                      <li>Employee + child(ren) = $1000/yr.</li>
                      <li>Employee + family = $1500/yr..</li>
                    </ul>
                  </Tooltip>
                </div>
              </td>
              <td className="text-truncate text-end">{hideData ? blur.amount : getCurrencyFormat(data.EMPLOYER_ANNUAL_CONTRIBUTION)}</td>
            </tr>
          ) : null}
        </tbody>
      </table>
    </div>
  );
};

/**
 * Renders the Health Savings Resource section.
 *
 * @param {Object} props.sectionContent - Content for the section.
 * @returns {JSX.Element|null} The rendered health savings resource or null.
 */
const HealthSavingsResource = ({ sectionContent }) => {
  const { data = {} } = useGetHealthBenefitsDataQuery('data');

  const healthSavingsAccount = data?.data?.find((plan) => plan.BENEFIT_TYPE === 'HSA');
  const flexSpendingAccount = data?.data?.find((plan) => plan.BENEFIT_TYPE === 'HFSA');
  const dependantFlexSpendingAccount = data?.data?.find((plan) => plan.BENEFIT_TYPE === 'DCFSA');
  const healthReimburseAccount = data?.data?.find((plan) => plan.BENEFIT_TYPE === 'HRA');

  const notLastResource = flexSpendingAccount || dependantFlexSpendingAccount || healthReimburseAccount;

  return healthSavingsAccount ? (
    <section className={`total-rewards-resource mt-lg-11 ${!notLastResource ? 'pb-12' : ''}`}>
      <div className="d-lg-block d-flex flex-column">
        <ResourceListLinks hasResources={sectionContent.HasResources} resourceLinks={sectionContent.ResourceLinks} />
        <div className={sectionContent.HasResources && 'col-lg-7'}>
          <SectionTitle title={sectionContent.Title} />
          <TableConnectionState data={healthSavingsAccount} />
        </div>
        <AuthoredContentHandler content={sectionContent.SectionBody} />
        <ResourceLogoSection sectionContent={sectionContent} linkInline={true} />
      </div>

      {notLastResource ? <ResourceDivider /> : null}
    </section>
  ) : null;
};

export default HealthSavingsResource;
