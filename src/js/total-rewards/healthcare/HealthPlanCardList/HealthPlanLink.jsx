import { PLAN_TYPES, BASE_PATH } from '../../constants/health-page.js';

/**
 * Represents a link related to a specific health plan type.
 *
 * @component
 * @param {Object} props
 * @param {string} props.benefitType - The type of the benefit (e.g., MEDICAL, PRESCRIPTIONS, DENTAL, VISION).
 * @param {Object} props.benefitData - Data related to the benefit.
 * @param {string} props.benefitData.PLAN_NAME - Name of the benefit plan.
 * @param {string} [props.benefitPlanType] - Optional parameter for the type of the benefit plan.
 * @returns {JSX.Element} A component that displays a link based on the benefit type and data.
 */
const HealthPlanLink = ({ benefitType, benefitData, benefitPlanType }) => {
  let linkHref;
  let linkText;

  switch (benefitType) {
    case PLAN_TYPES.MEDICAL:
      if (
        benefitData.PLAN_NAME &&
        (benefitData.PLAN_NAME.includes('High Performance HSA Plan') || benefitData.PLAN_NAME.includes('High Performance Copay Plan'))
      ) {
        linkHref = `${BASE_PATH}/medical/high-performance-copay-and-hsa-plans/`;
        linkText = 'Learn about my medical plan';
      } else {
        linkHref = `${BASE_PATH}/medical/hsa-saver-and-select-plans/`;
        linkText = 'Learn about my medical plan';
      }
      break;
    case PLAN_TYPES.PRESCRIPTIONS:
      linkHref = 'https://www.caremark.com/';
      linkText = 'View my prescriptions';
      break;
    case PLAN_TYPES.DENTAL:
      linkHref = `${BASE_PATH}/dental/`;
      linkText = 'Learn about my dental plan';
      break;
    case PLAN_TYPES.VISION:
      linkHref = `${BASE_PATH}/vision/`;
      linkText = 'Learn about my vision plan';
      break;
    default:
      if (benefitPlanType === PLAN_TYPES.MEDICAL) {
        (linkHref = `${BASE_PATH}/medical/medical-overview/`), (linkText = 'Learn about healthcare plan offerings');
      } else if (benefitPlanType === PLAN_TYPES.PRESCRIPTIONS) {
        linkHref = `${BASE_PATH}/prescription-drugs/`;
        linkText = 'Learn about prescription plan offerings';
      } else if (benefitPlanType === PLAN_TYPES.DENTAL) {
        linkHref = `${BASE_PATH}/dental/`;
        linkText = 'Learn about dental plan offerings';
      } else if (benefitPlanType === PLAN_TYPES.VISION) {
        linkHref = `${BASE_PATH}/vision/`;
        linkText = 'Learn about vision plan offerings';
      }
  }

  return (
    <div className="health-care__plan-link">
      <a className="mb-0 d-flex" href={linkHref} target="_blank">
        {linkText}
        <div>
          <img className="icon--xs ms-2" src="/Content/Images/icons/arrow-right_icon.svg" alt="Learn More" />
        </div>
      </a>
    </div>
  );
};

export default HealthPlanLink;
