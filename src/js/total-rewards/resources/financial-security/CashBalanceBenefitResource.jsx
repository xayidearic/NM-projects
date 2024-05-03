import AuthoredContentHandler from '../../AuthoredContentHandler.jsx';
import blur from '../../formatting/blurDataFormat.js';
import ResourceListLinks from '../ResourceListLinks.jsx';
import ResourceDivider from '../../ResourceDivider.jsx';
import useFetchData from '../../financial-security/FetchFSData.jsx';
import ResourceLogoSection from '../ResourceLogoSection.jsx';

/**
 *
 * @param {string} title authored title
 * @param {object} investments cookie data
 * @param {object} retirement data
 * @param {boolean} render successful endpoints
 * @returns header & date
 */
const SectionTitle = ({ title, investments, retirement, render }) => {
  return (
    <div className="d-lg-flex flex-column">
      <h2 className="color-primary mb-2">{title}</h2>
      {render && <div className="metadata mb-2">As of Date: {investments.hideData ? blur.date : retirement.valuation_dte}</div>}
    </div>
  );
};

/**
 * @param {object} investments cookie data
 * @param {object} retirement data
 * @param {boolean} render successful endpoints
 * @returns the loading or error state / if successful then the table returns
 */
const TableConnectionState = ({ investments, retirement, render }) => {
  if (render) {
    return <Table investments={investments} retirement={retirement} />;
  } else {
    return (
      <div className="neutral-light-gray-bg total-rewards-resource__data col-12">
        <p className="mb-0 p-12"></p>
      </div>
    );
  }
};

/**
 * @returns Table section
 * store data needed in components state
 * show subtitle to unvested employee only
 * track endpoint state & render UI
 */
const Table = ({ investments, retirement }) => {
  const srvcDatePlus3Yrs = Date.parse(retirement.vesting_srvc_dte_add_3YEARS);
  const todaysDate = new Date();
  const hideData = investments.hideData;
  const isUnvested = srvcDatePlus3Yrs > todaysDate; /**if srvcDatePlus3Yrs >  todaysDate*/
  const vestingDate3Years = retirement.vesting_srvc_dte_add_3YEARS;

  return (
    <>
      <div className="total-rewards-table mb-2 d-lg-flex flex-column">
        {isUnvested ? (
          <div className="metadata mb-2">You will be 100% vested in your account balance on {hideData ? blur.date : vestingDate3Years} </div>
        ) : null}
        <TableBody hideData={hideData} retirement={retirement} />
      </div>
      <div className="legal mb-8">
        Cash Balance accounts accrue interest at an annual effective rate of 5.13% for 2024. Numbers shown update on the seventh working day of each
        month and include qualified and, if applicable, non-qualified amounts.
      </div>
    </>
  );
};

/**
 *
 * @param {boolean} hideData cookie value
 * @param {object} retirement data
 * @returns Table rows
 * store data needed in components state
 */
const TableBody = ({ hideData, retirement }) => {
  const ytdCompanyContribution = retirement.formattedAmount.pay_credit_ytd;
  const balanceTotal = retirement.formattedAmount.bal_tot;

  return (
    <table>
      <tbody>
        <tr>
          <td>YTD Company Contributions</td>
          <td className="text-end text-truncate">{hideData ? blur.amount : ytdCompanyContribution}</td>
        </tr>
        <tr>
          <td>Current Balance</td>
          <td className="text-end text-truncate">{hideData ? blur.amount : balanceTotal}</td>
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
  const { investments, retirement, render } = useFetchData();

  return (
    <section className="total-rewards-resource financial-security-resource mt-lg-11">
      <div className="d-lg-block d-flex flex-column">
        <ResourceListLinks hasResources={sectionContent.HasResources} resourceLinks={sectionContent.ResourceLinks} />
        <div className={sectionContent.HasResources ? 'col-lg-8 pe-lg-7' : undefined}>
          <SectionTitle title={sectionContent.Title} investments={investments} retirement={retirement} render={render} />
          <TableConnectionState investments={investments} retirement={retirement} render={render} />
        </div>
        <AuthoredContentHandler content={sectionContent.SectionBody} />
        <ResourceLogoSection sectionContent={sectionContent} />
      </div>
      <ResourceDivider />
    </section>
  );
};

export default CashBalanceBenefitResource;
