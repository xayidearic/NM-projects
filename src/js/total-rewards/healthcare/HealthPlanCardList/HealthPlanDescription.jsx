import Tooltip from '../../../components/Tooltip.jsx';
import blur from '../../formatting/blurDataFormat';
import { getCurrencyFormat } from '../../formatting/formatSalaryAmount.js';
import { PLAN_TYPES } from '../../constants/health-page.js';
import { useSelector } from 'react-redux';

/**
 * HealthPlanDescription Component displays the description of health plans.
 *
 * @param {Object} props - Component props.
 * @param {("MEDICAL"|"DENTAL"|"VISION"|"PRESCRIPTIONS")} props.benefitType - Type of the benefit.
 * @param {Object} props.benefitData - Data associated with the benefit.
 * @param {string} props.benefitData.PLAN_NAME - Name of the plan.
 * @param {number} props.benefitData.EMPLOYEE_MONTHLY_COST - Monthly cost for the employee.
 * @param {number} props.benefitData.CREDIT_AMOUNT - Credit amount the user has earned.
 *
 * @returns {React.Element}
 */
const HealthPlanDescription = ({ benefitType, benefitData }) => {
  const hideHCData = useSelector((state) => state.hideData.hideHCData);
  const hasEmployeeMonthlyCost = benefitData.EMPLOYEE_MONTHLY_COST !== 0;

  /**
   * Get the plan manager for the Health plan based on the PLAN_NAME.
   *
   * @returns {string} - Returns 'Centivo' if PLAN_NAME includes "High Performance HSA Plan", otherwise returns 'UMR'.
   */
  const getHealthPlanManager = () => {
    if (
      benefitData.PLAN_NAME &&
      (benefitData.PLAN_NAME.includes('High Performance HSA Plan') || benefitData.PLAN_NAME.includes('High Performance Copay Plan'))
    ) {
      return 'Centivo';
    }
    return 'UMR';
  };

  /**
   * Get the plan manager for the Dental plan based on the PLAN_NAME.
   *
   * @returns {string} - Returns 'Anthem Dental' if PLAN_NAME includes "Anthem Dental Essential Choice", otherwise returns 'Delta Dental'.
   */
  const getDentalPlanManager = () => {
    if (benefitData.PLAN_NAME && benefitData.PLAN_NAME.includes('Anthem Dental Essential Choice')) {
      return 'Anthem';
    }
    return 'Delta';
  };

  /**
   * Describes the managers for different plan types.
   * @type {Record<string, string>}
   */
  const planManagers = {
    MEDICAL: getHealthPlanManager(),
    DENTAL: getDentalPlanManager(),
    VISION: 'Anthem',
  };

  /**
   * Provides display names for different plan types.
   * @type {Record<string, string>}
   */
  const planDisplayNames = {
    MEDICAL: 'Medical',
    DENTAL: 'Dental',
    VISION: 'Vision',
    PRESCRIPTIONS: 'Prescriptions',
  };

  /**
   * Renders the text displaying the credit amount the user has earned.
   *
   */
  const renderCreditAmountText = () => (
    <div className="mb-4 d-flex">
      <p className="metadata mb-0">
        You've earned{' '}
        <span className="color-primary weight-brand-bold">{hideHCData ? blur.amountSmall : getCurrencyFormat(benefitData.CREDIT_AMOUNT)} OFF</span>{' '}
        your monthly premium by meeting your wellness incentives.
      </p>
      <Tooltip targetClass={'position-relative mt-1 mt-lg-2'} targetContent={'tool-tip__content--credit-amount'}>
        You and your spouse or domestic partner can each earn up to $1600 annually ($133.33/mo.) in wellness rewards by participating in Well360
        activities. Wellness rewards earned offset the costs of enrolling in your health plan in the following year.
      </Tooltip>
    </div>
  );

  /**
   * Renders the description of the plan for the given plan type.
   *
   * @param {string} planType - Type of the plan (e.g., MEDICAL, DENTAL, VISION, etc.).
   */
  const renderPlanDescription = (planType) => (
    <p className="metadata">
      Your {planDisplayNames[planType]} Plan is managed by {planManagers[planType]}.
    </p>
  );

  switch (benefitType) {
    case PLAN_TYPES.MEDICAL:
      return (
        <div>
          {benefitData.CREDIT_AMOUNT && hasEmployeeMonthlyCost ? renderCreditAmountText() : null}
          {renderPlanDescription(benefitType)}
        </div>
      );
    case PLAN_TYPES.PRESCRIPTIONS:
      return hasEmployeeMonthlyCost ? (
        <p className="metadata">CVS Caremark covers medications at different rates according to different tiers.</p>
      ) : (
        renderPlanDescription('Medical')
      );
    case PLAN_TYPES.DENTAL:
    case PLAN_TYPES.VISION:
      return renderPlanDescription(benefitType);
    default:
      return null;
  }
};

export default HealthPlanDescription;
