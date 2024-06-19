import { useSelector } from 'react-redux';

import AuthoredContentHandler from '../../AuthoredContentHandler.jsx';
import blur from '../../formatting/blurDataFormat.js';
import dateFormat from '../../formatting/formatDate.js';
import ResourceDivider from '../../ResourceDivider.jsx';
import ResourceListLinks from '../ResourceListLinks.jsx';
import ResourceLogoSection from '../ResourceLogoSection.jsx';
import Tooltip from '../../../components/Tooltip.jsx';
import { useEffect, useState } from 'react';
import useFetchData from '../../financial-security/FetchFSData.jsx';
import { formatDataAmounts } from '../../formatting/formatDataAmounts.js';
import ServiceFailureAlert from '../../financial-security/ServiceFailureAlert.jsx';

/**
 * Display if a user has “maxed-out” their annual 401(k) contribution
 * Endpoints : vanguard & actuarial
 * Data flow : store data needed in states
 * Conditionals :
 *      if ytdEmpContribMinusCatchup (Vanguard) is >= contribution_limit_401k (Actuarial)
 * @returns GREEN alert banner
 */
const MaxedOut401kAlert = () => {
  const { investments, retirement } = useFetchData();
  const { ytdEmpContribMinusCatchup } = investments ?? {};
  const { contribution_limit_401k } = retirement ?? {};

  let hasContributionLimit = ytdEmpContribMinusCatchup >= contribution_limit_401k;
  const [viewAlert, setViewAlert] = useState(false);

  useEffect(() => {
    investments && retirement && setViewAlert(hasContributionLimit);
  }, [investments, retirement, hasContributionLimit]);

  const handleAlrtView = () => {
    setViewAlert(false);
  };

  return (
    viewAlert && (
      <div className="brand_grass-tertiary-bg p-4 pe-9 position-relative mb-8">
        <img src="/Content/Images/icons/close_icon.svg" onClick={() => handleAlrtView()} className="position-absolute close-msg" />
        <h5 className="color-primary mt-0 mb-2">Congratulations, you've reached the 401(k) contribution limit for this fiscal year! </h5>
        <div className="p2">
          Because you've reached current IRS limits on contribution, your deferral rate is now 0%. At the beginning of next year, it will default back
          to your previous deferral rate.
        </div>
      </div>
    )
  );
};

/**
 *
 * @param {string} title authored title
 * @returns header title & date
 */
const SectionTitle = ({ title }) => {
  const { investments } = useFetchData();
  const { balance } = investments ?? {};
  const hideData = useSelector((state) => state.hideData.hideFSData);

  return (
    <div className="d-lg-flex flex-column">
      <h2 className="color-primary mb-2">{title}</h2>
      {investments && <div className="metadata mb-2">As of Date: {hideData ? blur.date : dateFormat(balance.planBalanceDate)}</div>}
    </div>
  );
};

/**
 * @returns Loading state or error state / if successful then the table returns
 */
const Plan401kTableConnectionState = () => {
  const { hasInvestmentsError, hasInvestmentsLoading } = useFetchData();

  return hasInvestmentsLoading ? (
    <div className="neutral-light-gray-bg total-rewards-resource__data col-12">
      <p className="mb-0 p-12"></p>
    </div>
  ) : hasInvestmentsError ? (
    <ServiceFailureAlert>
      Your 401(k) information isn't available right now. Log in to{' '}
      <a href="https://ownyourfuture.vanguard.com/en/home/publogin" target="_blank" title="Vanguard">
        Vanguard{' '}
      </a>{' '}
      to access your account, make changes to your plan, or to create an account if you don't have one.
    </ServiceFailureAlert>
  ) : (
    <Plan401kTable />
  );
};

/**
 * @returns 401K Plan resource table
 * Data flow : store data needed in states
 * Conditionals :
 *      if ytdEmpContribMinusCatchup (Vanguard) is >= contribution_limit_401k (Actuarial) -
 *          green background color for the first 2 rows
 *          this will be in ssync with the Maxed out 401k Alert Message
 *      Display last row (Net of loans) if there are loans outstanding
 */
const Plan401kTable = () => {
  const { investments, retirement } = useFetchData();
  const { balance, deferral, formattedAmount, ytdEmpContribMinusCatchup } = investments ?? {};
  const { contribution_limit_401k } = retirement ?? {};
  const { ytdEmployeeContributions, planBalance } = formattedAmount ?? {};

  const contribution = deferral.find((s) => s.sourceCode === 'AAA')?.allocation ?? 0;
  const rothContribution = deferral.find((s) => s.sourceCode === 'NRB')?.allocation ?? 0;

  const balanceRemaining = formatDataAmounts({
    loanBalanceRemaining: balance?.planLoanBalance > 0 ? balance?.planBalance - balance?.planLoanBalance : 0,
  });
  const hideData = useSelector((state) => state.hideData.hideFSData);

  return (
    <div className="total-rewards-table d-lg-flex">
      <table className="retirement-contribution-data">
        <tbody>
          <tr className={ytdEmpContribMinusCatchup >= contribution_limit_401k ? 'brand_grass-bg' : 'neutral-light-gray-background'}>
            <td className="position-relative">
              401(k) Contribution:
              <span className="color-primary weight-500 d-sm-inline d-block"> {hideData ? blur.percentage : contribution + '%'}</span>
            </td>
            <td>
              Roth Contribution:
              <span className="color-primary weight-500 d-sm-inline d-block "> {hideData ? blur.percentage : rothContribution + '%'}</span>
            </td>
          </tr>
          <tr className={ytdEmpContribMinusCatchup >= contribution_limit_401k ? 'brand_grass-bg' : ''}>
            <td>YTD Employee Contributions</td>
            <td className="text-end">{hideData ? blur.amount : ytdEmployeeContributions}</td>
          </tr>
          <tr>
            <td>Current Balance</td>
            <td className="text-end">{hideData ? blur.amount : planBalance}</td>
          </tr>
          {balance?.planLoanBalance ? (
            <tr>
              <td>
                <div className="d-inline">
                  Current Balance &ndash; Net of loans
                  <Tooltip targetClass={'tool-tip--loan-balance'} targetContent={'tool-tip__content--loan-balance'}>
                    This is your current 401(k) balance minus any outstanding loans.
                  </Tooltip>
                </div>
              </td>
              <td className="text-end">{hideData ? blur.amount : balanceRemaining.formattedAmount.loanBalanceRemaining}</td>
            </tr>
          ) : null}
        </tbody>
      </table>
    </div>
  );
};

/**
 *
 * @param {object} sectionContent CMS authored connect
 * @returns 401k Plan Resource section
 */
const Plan401kResource = ({ sectionContent }) => {
  return (
    <section className="total-rewards-resource mt-lg-11">
      <MaxedOut401kAlert />
      <div className="d-lg-block d-flex flex-column">
        <ResourceListLinks hasResources={sectionContent.HasResources} resourceLinks={sectionContent.ResourceLinks} />
        <div className={sectionContent.HasResources && 'col-lg-8 pe-lg-7 mb-6'}>
          <SectionTitle title={sectionContent.Title} />
          <Plan401kTableConnectionState />
        </div>
        <AuthoredContentHandler content={sectionContent.SectionBody} />
        <ResourceLogoSection sectionContent={sectionContent} />
      </div>
      <ResourceDivider />
    </section>
  );
};

export default Plan401kResource;
