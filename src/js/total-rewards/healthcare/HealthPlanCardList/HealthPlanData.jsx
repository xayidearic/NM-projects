import blur from '../../formatting/blurDataFormat.js';
import { getCurrencyFormat } from '../../formatting/formatSalaryAmount.js';
import { PLAN_TYPES } from '../../constants/health-page.js';

/**
 * Helper function to transform text to uppercase. Returns 'NA' if text is not provided.
 * @param {string} textToTransform - The text to be transformed.
 * @returns {string} - Transformed text in uppercase.
 */
const changeToUpperCase = (textToTransform) => {
  return textToTransform ? textToTransform.toUpperCase() : 'NA';
};

/**
 * Displays a row with a label and a value, formatted based on the provided props.
 *
 * @param {Object} props
 * @param {string} props.label - Text to display as the row's label.
 * @param {string|number} props.value - Value to display next to the label.
 * @param {boolean} [props.isCurrency] - Indicates if the value should be formatted as a currency defaults to false.
 */
const DisplayRow = ({ label, value, isCurrency = false }) => (
  <div className="d-flex align-items-center justify-content-between">
    <p className="metadata mb-0">{label}</p>
    <p className={isCurrency ? 'p1 color-primary weight-brand-bold' : 'eyebrow color-primary weight-brand-bold text-end'}>
      {value}
      {isCurrency && (
        <>
          <span className="source color-primary mx-1">/</span>
          <span className="source color-primary">Month</span>
        </>
      )}
    </p>
  </div>
);

/**
 * Displays relevant health plan data based on the given benefit type.
 *
 * @param {Object} props
 * @param {string} props.benefitType - The type of the benefit (e.g., MEDICAL, PRESCRIPTIONS, DENTAL, VISION).
 * @param {Record<string, unknown>} props.benefitData - Data related to the benefit, includes fields like EMPLOYEE_MONTHLY_COST, EMPLOYER_MONTHLY_COST, and COVERAGE.
 * @param {boolean} props.hideData - If true, hides the actual data values.
 */
const HealthPlanData = ({ benefitType, benefitData, hideData }) => {
  switch (benefitType) {
    case PLAN_TYPES.MEDICAL:
      return (
        <div>
          <DisplayRow label="My Premium:" value={hideData ? blur.amountSmall : getCurrencyFormat(benefitData.EMPLOYEE_MONTHLY_COST)} isCurrency />
          <DisplayRow
            label="Company Contribution:"
            value={hideData ? blur.amountSmall : getCurrencyFormat(benefitData.EMPLOYER_MONTHLY_COST + benefitData.CREDIT_AMOUNT)}
            isCurrency
          />
          <DisplayRow label="Current Coverage:" value={hideData ? 'NA' : changeToUpperCase(benefitData.COVERAGE)} />
        </div>
      );
    case PLAN_TYPES.PRESCRIPTIONS:
      return (
        <div>
          <DisplayRow label="My Premium:" value={hideData ? 'NA' : 'INCLUDED IN MEDICAL PREMIUM'} />
          <DisplayRow label="Current Coverage:" value={hideData ? 'NA' : changeToUpperCase(benefitData.COVERAGE)} />
        </div>
      );
    case PLAN_TYPES.DENTAL:
      return (
        <div>
          <DisplayRow label="My Premium:" value={hideData ? blur.amountSmall : getCurrencyFormat(benefitData.EMPLOYEE_MONTHLY_COST)} isCurrency />
          <DisplayRow
            label="Company Contribution:"
            value={hideData ? blur.amountSmall : getCurrencyFormat(benefitData.EMPLOYER_MONTHLY_COST)}
            isCurrency
          />
          <DisplayRow label="Current Coverage:" value={hideData ? 'NA' : changeToUpperCase(benefitData.COVERAGE)} />
        </div>
      );
    case PLAN_TYPES.VISION:
      return (
        <div>
          <DisplayRow label="My Premium:" value={hideData ? blur.amountSmall : getCurrencyFormat(benefitData.EMPLOYEE_MONTHLY_COST)} isCurrency />
          <DisplayRow label="Current Coverage:" value={hideData ? 'NA' : changeToUpperCase(benefitData.COVERAGE)} />
        </div>
      );
    default:
      return (
        <div className="d-flex align-items-center">
          <div className="me-2 mb-0">
            <img className="icon--small icon--blue-primary" src="/Content/Images/icons/exclamation_icon.svg" />
          </div>
          <p className="p1 color-primary weight-brand-bold">NO COVERAGE ELECTED</p>
        </div>
      );
  }
};

export default HealthPlanData;
