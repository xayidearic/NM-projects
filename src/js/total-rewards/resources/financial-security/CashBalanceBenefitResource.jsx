import { useSelector } from 'react-redux';

import AuthoredContentHandler from '../../AuthoredContentHandler.jsx';
import blur from '../../formatting/blurDataFormat.js';
import ResourceListLinks from '../ResourceListLinks.jsx';
import ResourceDivider from '../../ResourceDivider.jsx';
import useFetchData from '../../financial-security/FetchFSData.jsx';
import ResourceLogoSection from '../ResourceLogoSection.jsx';
import ServiceFailureAlert from '../../financial-security/ServiceFailureAlert.jsx';

/**
 *
 * @param {string} title authored title
 * @returns header & date
 */
const SectionTitle = ({ title }) => {
  const { retirement } = useFetchData();
  const hideData = useSelector((state) => state.hideData.hideFSData);

  return (
    <div className="d-lg-flex flex-column">
      <h2 className="color-primary mb-2">{title}</h2>
      {retirement && <div className="metadata mb-2">As of Date: {hideData ? blur.date : retirement.valuation_dte}</div>}
    </div>
  );
};

/**
 * @returns Loading state or error state, if successful render Table
 */
const TableConnectionState = () => {
  const { hasRetirementError, hasRetirementLoading } = useFetchData();

  return hasRetirementLoading ? (
    <div className="neutral-light-gray-bg total-rewards-resource__data col-12">
      <p className="mb-0 p-12"></p>
    </div>
  ) : hasRetirementError ? (
    <ServiceFailureAlert>
      Cash Balance Retirement Plan information isn't available right now. Contact{' '}
      <a href="https://nml.service-now.com/askhr" target="_blank">
        Ask HR
      </a>{' '}
      if you have questions.
    </ServiceFailureAlert>
  ) : (
    <Table />
  );
};

/**
 * @returns Table section
 * store data needed in components state
 * show subtitle to unvested employee only
 * track endpoint state & render UI
 */
const Table = () => {
  const { retirement } = useFetchData();
  const hideData = useSelector((state) => state.hideData.hideFSData);
  const { vesting_srvc_dte_add_3YEARS } = retirement ?? {};

  const srvcDatePlus3Yrs = Date.parse(vesting_srvc_dte_add_3YEARS);
  const todaysDate = new Date();
  const isUnvested = srvcDatePlus3Yrs > todaysDate; /**if srvcDatePlus3Yrs >  todaysDate*/

  return (
    <>
      <div className="total-rewards-table mb-2 d-lg-flex flex-column">
        {isUnvested ? (
          <div className="metadata mb-2">
            You will be 100% vested in your account balance on {hideData ? blur.date : vesting_srvc_dte_add_3YEARS}{' '}
          </div>
        ) : null}
        <TableBody />
      </div>
      <div className="legal mb-8">
        Cash Balance accounts accrue interest at an annual effective rate of 5.13% for 2024. Numbers shown update on the seventh working day of each
        month and include qualified and, if applicable, non-qualified amounts.
      </div>
    </>
  );
};

/**
 * @returns Table rows
 * store data needed in components state
 */
const TableBody = () => {
  const { retirement } = useFetchData();
  const hideData = useSelector((state) => state.hideData.hideFSData);
  const { pay_credit_ytd, bal_tot } = retirement?.formattedAmount ?? {};

  return (
    <table>
      <tbody>
        <tr>
          <td>YTD Company Contributions</td>
          <td className="text-end text-truncate">{hideData ? blur.amount : pay_credit_ytd}</td>
        </tr>
        <tr>
          <td>Current Balance</td>
          <td className="text-end text-truncate">{hideData ? blur.amount : bal_tot}</td>
        </tr>
      </tbody>
    </table>
  );
};

/**
 *
 * @param {object} sectionContent CMS authored connect
 * @returns Cash Balance Benefit Resources
 */
const CashBalanceBenefitResource = ({ sectionContent }) => {
  return (
    <section className="total-rewards-resource financial-security-resource mt-lg-11">
      <div className="d-lg-block d-flex flex-column">
        <ResourceListLinks hasResources={sectionContent.HasResources} resourceLinks={sectionContent.ResourceLinks} />
        <div className={sectionContent.HasResources ? 'col-lg-8 pe-lg-7' : undefined}>
          <SectionTitle title={sectionContent.Title} />
          <TableConnectionState />
        </div>
        <AuthoredContentHandler content={sectionContent.SectionBody} />
        <ResourceLogoSection sectionContent={sectionContent} />
      </div>
      <ResourceDivider />
    </section>
  );
};

export default CashBalanceBenefitResource;
