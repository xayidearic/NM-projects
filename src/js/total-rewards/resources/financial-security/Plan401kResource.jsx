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

/**
 * @param {object} investments cookie data
 * @param {object} retirement data
 * Display if a user has “maxed-out” their annual 401(k) contribution
 * Endpoints : vanguard & actuarial
 * Data flow : store data needed in states
 * Conditionals :
 *      if ytdEmpContribMinusCatchup (Vanguard) is >= contribution_limit_401k (Actuarial)
 * @returns GREEN alert banner
 */
const MaxedOut401kAlert = ({ investments, retirement }) => {
  const [viewMsg, setViewMsg] = useState(null);
  const [ytdEmpContribMinusCatchup, setYtdEmpContribMinusCatchup] = useState(null);
  const [contributionLimit, setContributionLimit] = useState(null);

  const handleAlrtView = () => {
    setViewMsg(false);
  };

  useEffect(() => {
    if (investments && retirement) {
      setYtdEmpContribMinusCatchup(investments.ytdEmpContribMinusCatchup);
      setContributionLimit(retirement.contribution_limit_401k);
      ytdEmpContribMinusCatchup >= contributionLimit ? setViewMsg(true) : setViewMsg(false);
    }
  }, [investments, retirement, ytdEmpContribMinusCatchup, contributionLimit]);

  return (
    viewMsg && (
      <div className="brand_grass-tertiary-bg p-4 pe-9 position-relative mb-8">
        <img src="/Content/Images/icons/close_icon.svg" onClick={handleAlrtView} className="position-absolute close-msg" />
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
 * @param {object} investments data
 * @param {boolean} render successful endpoints
 * @returns header title & date
 */
const SectionTitle = ({ title, investments, render }) => {
  return (
    <div className="d-lg-flex flex-column">
      <h2 className="color-primary mb-2">{title}</h2>
      {render && (
        <div className="metadata mb-2">As of Date: {investments.hideData ? blur.date : dateFormat(investments.balance.planBalanceDate)}</div>
      )}
    </div>
  );
};

/**
 * @param {object} investments cookie data
 * @param {object} retirement data
 * @param {boolean} render successful endpoints
 * @returns the loading or error state / if successful then the table returns
 * Endpoints : check all 6 endpoints are successful
 */
const Plan401kTableConnectionState = ({ investments, retirement, render }) => {
  if (render) {
    return <Plan401kTable investments={investments} retirement={retirement} />;
  } else {
    return (
      <div className="neutral-light-gray-bg total-rewards-resource__data col-12">
        <p className="mb-0 p-12"></p>
      </div>
    );
  }
};

/**
 * @param {object} investments vanguard data
 * @param {object} retirement actuarial data
 * @returns 401K Plan resource table
 * Data flow : store data needed in states
 * Conditionals :
 *      if ytdEmpContribMinusCatchup (Vanguard) is >= contribution_limit_401k (Actuarial) -
 *          green background color for the first 2 rows
 *          this will be in ssync with the Maxed out 401k Alert Message
 *      Display last row (Net of loans) if there are loans outstanding
 */
const Plan401kTable = ({ investments, retirement }) => {
  const contribution = investments.deferral.find((s) => s.sourceCode === 'AAA')?.allocation ?? 0;
  const rothContribution = investments.deferral.find((s) => s.sourceCode === 'NRB')?.allocation ?? 0;
  const ytdEmployeeContributions = investments.formattedAmount.ytdEmployeeContributions;
  const totalBalance = investments.formattedAmount.planBalance;
  const balanceRemaining = formatDataAmounts({
    'loanBalanceRemaining': investments.balance.planLoanBalance > 0 ? (investments.balance.planBalance - investments.balance.planLoanBalance) : 0
  });
  const ytdEmpContribMinusCatchup = investments.ytdEmpContribMinusCatchup;
  const contributionLimit = retirement.contribution_limit_401k;
  const hideData = investments.hideData;

  return (
    <div className="total-rewards-table d-lg-flex">
      <table className="retirement-contribution-data">
        <tbody>
          <tr className={ytdEmpContribMinusCatchup >= contributionLimit ? 'brand_grass-bg' : 'neutral-light-gray-background'}>
            <td className="position-relative">
              401(k) Contribution:
              <span className="color-primary weight-500 d-sm-inline d-block"> {hideData ? blur.percentage : contribution + '%'}</span>
            </td>
            <td>
              Roth Contribution:
              <span className="color-primary weight-500 d-sm-inline d-block "> {hideData ? blur.percentage : rothContribution + '%'}</span>
            </td>
          </tr>
          <tr className={ytdEmpContribMinusCatchup >= contributionLimit ? 'brand_grass-bg' : ''}>
            <td>YTD Employee Contributions</td>
            <td className="text-end">{hideData ? blur.amount : ytdEmployeeContributions}</td>
          </tr>
          <tr>
            <td>Current Balance</td>
            <td className="text-end">{hideData ? blur.amount : totalBalance}</td>
          </tr>
          {investments.balance.planLoanBalance ? (
            <tr>
              <td>
                <div className="d-inline">
                  Current Balance &ndash; Net of loans
                  <Tooltip targetClass={'tool-tip--loan-balance'}
                    targetContent={'tool-tip__content--loan-balance'}>
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
  const { investments, retirement, render } = useFetchData();

  return (
    <section className="total-rewards-resource mt-lg-11">
      <MaxedOut401kAlert investments={investments} retirement={retirement} />
      <div className="d-lg-block d-flex flex-column">
        <ResourceListLinks hasResources={sectionContent.HasResources} resourceLinks={sectionContent.ResourceLinks} />
        <div className={sectionContent.HasResources && 'col-lg-8 pe-lg-7 mb-6'}>
          <SectionTitle title={sectionContent.Title} investments={investments} render={render} />
          <Plan401kTableConnectionState investments={investments} retirement={retirement} render={render} />
        </div>
        <AuthoredContentHandler content={sectionContent.SectionBody} />
        <ResourceLogoSection sectionContent={sectionContent} />
      </div>
      <ResourceDivider />
    </section>
  );
};

export default Plan401kResource;
