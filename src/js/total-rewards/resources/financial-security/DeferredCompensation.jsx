import { useSelector } from 'react-redux';

import AuthoredContentHandler from '../../AuthoredContentHandler.jsx';
import blur from '../../formatting/blurDataFormat.js';
import ResourceDivider from '../../ResourceDivider.jsx';
import ResourceListLinks from '../ResourceListLinks.jsx';
import ResourceLogoSection from '../ResourceLogoSection.jsx';
import useFetchData from '../../financial-security/FetchFSData.jsx';

/**
 *
 * @param {string} title authored title
 * @returns header title & date
 *
 */
const SectionTitle = ({ title }) => {
  const { deferred } = useFetchData();
  const hideData = useSelector((state) => state.hideData.hideFSData);

  return (
    <div className="d-lg-flex flex-column col-12">
      <h2 className="color-primary mb-2">{title}</h2>
      {deferred && <div className="metadata mb-1">As of Date: {hideData ? blur.date : deferred[0].BalanceAsofDate}</div>}
    </div>
  );
};

/**
 * @returns Deferred compensation table
 */
const Table = () => {
  const { deferred } = useFetchData();
  const hideData = useSelector((state) => state.hideData.hideFSData);

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
 * Return null if no data or error
 */
const DeferredCompensation = ({ sectionContent }) => {
  const { deferred, hasDeferredError } = useFetchData();

  return hasDeferredError || deferred?.length === 0 ? null : (
    <section className="total-rewards-resource mt-lg-11">
      <div className="d-lg-block d-flex flex-column">
        <SectionTitle title={sectionContent.Title} />
        <Table />
        <ResourceListLinks hasResources={sectionContent.HasResources} resourceLinks={sectionContent.ResourceLinks} />
        <AuthoredContentHandler content={sectionContent.SectionBody} />
        <ResourceLogoSection sectionContent={sectionContent} />
      </div>
      <ResourceDivider />
    </section>
  );
};

export default DeferredCompensation;
