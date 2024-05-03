import Tooltip from '../../components/Tooltip.jsx';
import blur from '../formatting/blurDataFormat.js';

/**
 * @param { number } age - compensation data
 * @param { object } investmentTotalBalance - calculations data
 * @param { object } projections - projections data
 * @param { boolean } hideData - cookie value status
 * @returns 401K savings Row
 * Store data in variables
 * Table Cell conditinals: age
 */
const Savings401KRow = ({ age, investmentTotalBalance, projections, hideData }) => {
  const balance60 = projections.formattedAmount.cashBalances60 ? projections.formattedAmount.balances401k60 : null;
  const balance62 = projections.formattedAmount.cashBalances62 ? projections.formattedAmount.balances401k62 : null;
  const balance65 = projections.formattedAmount.cashBalances65 ? projections.formattedAmount.balances401k65 : null;

  return (
    <tr>
      <td data-cell="Benefit">
        401(k) Savings <br /> Plan
      </td>
      <td data-cell="Current Balance">{hideData ? blur.amount : investmentTotalBalance}</td>
      {age < 60 ? (
        <td data-cell="at 60">
          {hideData ? blur.amount : balance60}
          {balance60 && <div className="metadata">Balance</div>}
        </td>
      ) : null}

      {age < 62 ? (
        <td data-cell="at 62">
          {hideData ? blur.amount : balance62}
          {balance62 && <div className="metadata">Balance</div>}
        </td>
      ) : null}

      {age < 65 ? (
        <td data-cell="at 65">
          {hideData ? blur.amount : balance65}
          {balance65 && <div className="metadata">Balance</div>}
        </td>
      ) : null}
    </tr>
  );
};

/**
 * @param { number } age - compensation data
 * @param { string } retirementTotalBalance - actuarial data
 * @param { object } projections - projections data
 * @param { boolean } hideData - cookie value status
 * @returns Cash Balance Row
 * Store data in variables
 * Table Cell conditinals: age
 */
const CashBalanceRow = ({ age, retirementTotalBalance, projections, hideData }) => {
  const cashBalance60 = projections.formattedAmount.cashBalances60 ? projections.formattedAmount.cashBalances60 : null;
  const cashBalance62 = projections.formattedAmount.cashBalances62 ? projections.formattedAmount.cashBalances62 : null;
  const cashBalance65 = projections.formattedAmount.cashBalances65 ? projections.formattedAmount.cashBalances65 : null;

  return (
    <tr>
      <td data-cell="Benefit">
        Cash Balance <br /> Retirement <br /> Plan
      </td>
      <td data-cell="Current Balance">{hideData ? blur.amount : retirementTotalBalance}</td>

      {age < 60 ? (
        <td data-cell="at 60">
          {hideData ? blur.amount : cashBalance60}
          {cashBalance60 && <div className="metadata">Balance</div>}
        </td>
      ) : null}

      {age < 62 ? (
        <td data-cell="at 62">
          {hideData ? blur.amount : cashBalance62}
          {cashBalance62 && <div className="metadata">Balance</div>}
        </td>
      ) : null}

      {age < 65 ? (
        <td data-cell="at 65">
          {hideData ? blur.amount : cashBalance65}
          {cashBalance65 && <div className="metadata">Balance</div>}
        </td>
      ) : null}
    </tr>
  );
};

/**
 * @param { number } age - compensation data
 * @param { object } retirement - actuarial data
 * @param { boolean } hideData - cookie value status
 * @returns Social Security Row
 * Store data in variables
 * Table Cell conditinals: age
 */
const SocialSecurityRow = ({ age, retirement, hideData }) => {
  const socialBalance62 = retirement.formattedAmount.soc_sec_ben_62;
  const socialBalance65 = retirement.formattedAmount.soc_sec_ben_65;

  return (
    <tr>
      <td data-cell="Benefit">Social Security</td>
      <td data-cell="Current Balance"></td>

      {age < 60 ? <td data-cell="at 60"></td> : null}

      {age < 62 ? (
        <td data-cell="at 62">
          {hideData ? blur.amount : socialBalance62}
          {socialBalance62 && <div className="metadata">Annually</div>}
        </td>
      ) : null}

      {age < 65 ? (
        <td data-cell="at 65">
          {hideData ? blur.amount : socialBalance65}
          {socialBalance65 && <div className="metadata">Annually</div>}
        </td>
      ) : null}
    </tr>
  );
};

/**
 * Hide row if no Final Average Pay info from retirement/Actuarial API (<FAP_ACCRUED_BEN>)
 *
 * @param { number } age - compensation data
 * @param { object } retirement - actuarial data
 * @param { boolean } isMarried - marital status - compensation data
 * @param { boolean } hideData - cookie value status
 *
 * @returns Average Pay Row
 * Store data in variables
 * Table Cell conditinals: age & marital status
 */
const AvgPayRow = ({ age, retirement, isMarried, hideData }) => {
  const single60 = retirement.formattedAmount.fap_sngl_life_c10_60;
  const single62 = retirement.formattedAmount.fap_sngl_life_c10_62;
  const single65 = retirement.formattedAmount.fap_sngl_life_c10_65;
  const jnt60 = retirement.formattedAmount.fap_jnt_full_c10_60;
  const jnt62 = retirement.formattedAmount.fap_jnt_full_c10_62;
  const jnt65 = retirement.formattedAmount.fap_jnt_full_c10_65;

  return retirement.fap_accrued_ben ? (
    <tr>
      <td className="position-relative" data-cell="Benefit">
        Final Average Pay
        <Tooltip
          targetClass={'tool-tip--final-avg-pay ms-lg-1'}
          targetContent={`tool-tip__content--final-avg-pay ${isMarried ? 'married' : 'single'}`}
          bottom={true}
        >
          {`${isMarried ? 'Joint & Full Survivor Annuity, 10 Years Certain' : 'Single Life Annuity, 10 Years Certain'}`}
        </Tooltip>
      </td>
      <td data-cell="Current Balance"></td>
      {age < 60 ? (
        <td data-cell="at 60">
          {hideData ? blur.amount : isMarried ? jnt60 : single60}
          <div className="metadata">Annually</div>
        </td>
      ) : null}

      {age < 62 ? (
        <td data-cell="at 62">
          {hideData ? blur.amount : isMarried ? jnt62 : single62}
          <div className="metadata">Annually</div>
        </td>
      ) : null}

      {age < 65 ? (
        <td data-cell="at 65">
          {hideData ? blur.amount : isMarried ? jnt65 : single65}
          <div className="metadata">Annually</div>
        </td>
      ) : null}
    </tr>
  ) : null;
};

/**
 *
 * @param {number} age - compensation data
 * @param {boolean} isMarried - marital status - compensation data
 * @param {object} investments data
 * @param {object} retirement data
 * @param {object} projections data
 * @returns Table body with all rows/columns
 * Endpoints : projections - retirement - investments
 */
const DataTableBody = ({ age, isMarried, investments, retirement, projections }) => {
  return (
    <tbody>
      <Savings401KRow
        age={age}
        investmentTotalBalance={investments.formattedAmount.planBalance}
        projections={projections}
        hideData={investments.hideData}
      />
      <CashBalanceRow
        age={age}
        retirementTotalBalance={retirement.formattedAmount.bal_tot}
        projections={projections}
        hideData={investments.hideData}
      />
      <AvgPayRow age={age} retirement={retirement} isMarried={isMarried} hideData={investments.hideData} />
      <SocialSecurityRow age={age} retirement={retirement} hideData={investments.hideData} />
    </tbody>
  );
};

export default DataTableBody;
