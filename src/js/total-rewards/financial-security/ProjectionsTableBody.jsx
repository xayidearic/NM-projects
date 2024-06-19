import { useDispatch, useSelector } from 'react-redux';
import useFetchData from './FetchFSData.jsx';

import Tooltip from '../../components/Tooltip.jsx';
import blur from '../formatting/blurDataFormat.js';
import { useEffect } from 'react';
import { setHideData } from '../../dux/hideDataSlice.js';
import { CookieManager } from '../../app/cookieManager.js';

const TableCell = ({ tdHeader, balance, metadata }) => {
  const hideData = useSelector((state) => state.hideData.hideFSData);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setHideData({ hideFSData: CookieManager.getCookie('hideFSData') }));
  }, [dispatch]);

  return (
    <td data-cell={tdHeader}>
      {hideData ? blur.amount : balance}
      {metadata && <div className="metadata">{metadata}</div>}
    </td>
  );
};

const TableCellError = ({ tdHeader }) => {
  return (
    <td data-cell={tdHeader} className="error">
      {blur.amount}
    </td>
  );
};

const TableCellCondition = ({ isError, tdHeader, balance, metadata }) => {
  return isError ? <TableCellError tdHeader={tdHeader} /> : <TableCell tdHeader={tdHeader} balance={balance} metadata={metadata} />;
};

/**
 * @param { number } age - compensation data
 * @returns 401K savings Row
 * Current balance cell checks if investmentsError hook has an error (Vanguard API)
 * Table cells 60-62-65 checks if projectionsError hook has an error (Retirment & Calculations API)
 * **IF projections fails, so does retirement**
 */
const Savings401KRow = ({ age }) => {
  const { hasInvestmentsError, hasProjectionsError, investments, projections } = useFetchData();

  const { planBalance } = investments?.formattedAmount ?? {};
  const { cashBalances60, balances401k60, cashBalances62, balances401k62, cashBalances65, balances401k65 } = projections?.formattedAmount ?? {};

  const balance60 = cashBalances60 ? balances401k60 : null;
  const balance62 = cashBalances62 ? balances401k62 : null;
  const balance65 = cashBalances65 ? balances401k65 : null;

  return (
    <tr>
      <td data-cell="Benefit">
        401(k) Savings <br /> Plan
      </td>

      <TableCellCondition isError={hasInvestmentsError} tdHeader={'Current Balance'} balance={planBalance} />

      {age < 60 && (
        <TableCellCondition isError={hasInvestmentsError || hasProjectionsError} tdHeader={'at 60'} balance={balance60} metadata={'Balance'} />
      )}

      {age < 62 && (
        <TableCellCondition isError={hasInvestmentsError || hasProjectionsError} tdHeader={'at 62'} balance={balance62} metadata={'Balance'} />
      )}

      {age < 65 && (
        <TableCellCondition isError={hasInvestmentsError || hasProjectionsError} tdHeader={'at 65'} balance={balance65} metadata={'Balance'} />
      )}
    </tr>
  );
};

/**
 * @param { number } age - compensation data
 * @returns Cash Balance Row
 * Table Cell 60-62-65 checks if projectionsError hook has an error (Retirment & Calculations API)
 */
const CashBalanceRow = ({ age }) => {
  const { retirement, projections, hasProjectionsError, hasRetirementError } = useFetchData();

  const { bal_tot } = retirement?.formattedAmount ?? {};
  const { cashBalances60, cashBalances62, cashBalances65 } = projections?.formattedAmount ?? {};

  return (
    <tr>
      <td data-cell="Benefit">
        Cash Balance <br /> Retirement <br /> Plan
      </td>

      <TableCellCondition isError={hasRetirementError} tdHeader={'Current Balance'} balance={bal_tot} />

      {age < 60 && <TableCellCondition isError={hasProjectionsError} tdHeader={'at 60'} balance={cashBalances60} metadata={'Balance'} />}

      {age < 62 && <TableCellCondition isError={hasProjectionsError} tdHeader={'at 62'} balance={cashBalances62} metadata={'Balance'} />}

      {age < 65 && <TableCellCondition isError={hasProjectionsError} tdHeader={'at 65'} balance={cashBalances65} metadata={'Balance'} />}
    </tr>
  );
};

/**
 * @param { number } age - compensation data
 * @returns Social Security Row
 * Table cells 62 & 65 checks if retirement has an error
 */
const SocialSecurityRow = ({ age }) => {
  const { retirement, hasRetirementError } = useFetchData();
  const { soc_sec_ben_62, soc_sec_ben_65 } = retirement?.formattedAmount ?? {};

  return (
    <tr>
      <td data-cell="Benefit">Social Security</td>
      <td data-cell="Current Balance"></td>

      {age < 60 && <td data-cell="at 60"></td>}

      {age < 62 && <TableCellCondition isError={hasRetirementError} tdHeader={'at 62'} balance={soc_sec_ben_62} metadata={'Annually'} />}

      {age < 65 && <TableCellCondition isError={hasRetirementError} tdHeader={'at 65'} balance={soc_sec_ben_65} metadata={'Annually'} />}
    </tr>
  );
};

/**
 * Hide row if no Final Average Pay info from retirement/Actuarial API (<FAP_ACCRUED_BEN>)
 *
 * @param { number } age - compensation data
 *
 * @returns Average Pay Row
 */
const AvgPayRow = ({ age }) => {
  const { retirement } = useFetchData();
  const { mar_status, formattedAmount, fap_accrued_ben } = retirement ?? {};
  const isMarried = mar_status === 'M';
  const { fap_sngl_life_c10_60, fap_sngl_life_c10_62, fap_sngl_life_c10_65, fap_jnt_full_c10_60, fap_jnt_full_c10_62, fap_jnt_full_c10_65 } =
    formattedAmount ?? {};

  return fap_accrued_ben ? (
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

      {age < 60 && <TableCell tdHeader={'at 60'} balance={isMarried ? fap_jnt_full_c10_60 : fap_sngl_life_c10_60} metadata={'Annually'} />}

      {age < 62 && <TableCell tdHeader={'at 62'} balance={isMarried ? fap_jnt_full_c10_62 : fap_sngl_life_c10_62} metadata={'Annually'} />}

      {age < 65 && <TableCell tdHeader={'at 65'} balance={isMarried ? fap_jnt_full_c10_65 : fap_sngl_life_c10_65} metadata={'Annually'} />}
    </tr>
  ) : null;
};

/**
 *
 * @param {number} age - compensation data
 * @returns Table body with all rows/columns
 */
const ProjectionsTableBody = ({ age }) => {
  return (
    <tbody>
      <Savings401KRow age={age} />
      <CashBalanceRow age={age} />
      <AvgPayRow age={age} />
      <SocialSecurityRow age={age} />
    </tbody>
  );
};

export default ProjectionsTableBody;
