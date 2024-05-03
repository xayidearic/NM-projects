import AuthoredContentHandler from '../../AuthoredContentHandler.jsx';
import blur from '../../formatting/blurDataFormat.js';
import ResourceDivider from '../../ResourceDivider.jsx';
import ResourceListLinks from '../ResourceListLinks.jsx';
import ResourceLogoSection from '../ResourceLogoSection.jsx';
import useFetchData from '../../financial-security/FetchFSData.jsx';

/**
 *
 * @param {string} title authored title
 * @param {object} investments cookie data
 * @param {object} deferred data
 * @param {boolean} render successful endpoints
 * @returns header title & date
 *
 */
const SectionTitle = ({ title, investments, deferred, render }) => {
  return (
    <div className="d-lg-flex flex-column col-12">
      <h2 className="color-primary mb-2">{title}</h2>
      {render && <div className="metadata mb-1">As of Date: {investments.hideData ? blur.date : deferred[0].BalanceAsofDate}</div>}
    </div>
  );
};

/**
 * @param {object} investments cookie data
 * @param {object} deferred data
 * @param {boolean} render successful endpoints
 * @returns the loading or error state / if successful then the table returns
 */
const TableConnectionState = ({ deferred, investments, render }) => {
  if (render) {
    return <Table deferred={deferred} hideData={investments.hideData} />;
  } else {
    return (
      <div className="neutral-light-gray-bg total-rewards-resource__data col-12">
        <p className="mb-0 p-12"></p>
      </div>
    );
  }
};

/**
 * @param {object} deferred data
 * @param {boolean} hideData cookie value
 * @returns Deferred compensation table
 */
const Table = ({ deferred, hideData }) => {
  const dollarFormat = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', currencyDisplay: 'narrowSymbol' });

  return (
    deferred && (
      <div className="total-rewards-table col-12 mb-8">
        <table className="deferred-comp">
          <tbody>
            <tr className="neutral-light-gray-background">
              <td>Agreement</td>
              <td>Maturity Date</td>
              <td>Payout Length</td>
              <td>Balance</td>
            </tr>

            {deferred.map((item, index) => (
              <tr key={index}>
                <td data-cell="Agreement">{hideData ? blur.text : item.AgreementNumber}</td>
                <td data-cell="Maturity Date">{hideData ? blur.date : item.EventDescription}</td>
                <td data-cell="Payout Length">
                  {hideData ? blur.text : item.noOfPayments < 2 ? item.noOfPayments + ' Payment ' : item.noOfPayments + ' Payments '}
                  {hideData ? null : <span className="metadata">/ paid monthly</span>}
                </td>
                <td data-cell="Balance">{hideData ? blur.amount : dollarFormat.format(item.accountBalanceAsOfDate)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  );
};

/**
 *
 * @param {object} sectionContent CMS authored connect
 * @returns Deferred compensation Resource section
 * *if no data exists for the employee, do not display the section
 */
const DeferredCompensation = ({ sectionContent }) => {
  const { investments, deferred, render } = useFetchData();

  if (deferred && deferred.length === 0) {
    return null;
  }

  return (
    <section className="total-rewards-resource mt-lg-11">
      <div className="d-lg-block d-flex flex-column">
        <SectionTitle title={sectionContent.Title} investments={investments} deferred={deferred} render={render} />
        <TableConnectionState deferred={deferred} investments={investments} render={render} />
        <ResourceListLinks hasResources={sectionContent.HasResources} resourceLinks={sectionContent.ResourceLinks} />
        <AuthoredContentHandler content={sectionContent.SectionBody} />
        <ResourceLogoSection sectionContent={sectionContent} />
      </div>
      <ResourceDivider />
    </section>
  );
};

export default DeferredCompensation;
