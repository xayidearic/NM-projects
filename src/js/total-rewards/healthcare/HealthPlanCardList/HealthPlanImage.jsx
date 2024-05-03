import { PLAN_TYPES } from '../../constants/health-page.js';

// Define default images for each plan type
const planImages = {
  MEDICAL: {
    src: '/Content/Images/icons/total-rewards/health-care/umr-logo.svg',
    alt: 'UMR logo',
  },
  PRESCRIPTIONS: {
    src: '/Content/Images/icons/total-rewards/health-care/caremark-logo.svg',
    alt: 'CVS logo',
  },
  DENTAL: {
    src: '/Content/Images/icons/total-rewards/health-care/dental-logo.svg',
    alt: 'Delta Dental logo',
  },
  VISION: {
    src: '/Content/Images/icons/total-rewards/health-care/anthem-logo.svg',
    alt: 'Anthem logo',
  },
};

/**
 * Defines the structure of the benefit data.
 *
 * @typedef {Object} BenefitData
 *
 * @property {string} PLAN_NAME - The name of the health plan.
 */

/**
 * HealthPlanImage Component.
 *
 * Renders the appropriate image based on the benefit type and plan name.
 *
 * @component
 * @param {Object} props
 * @param {PLAN_TYPES[keyof PLAN_TYPES]} props.benefitType - The type of health plan. Can be 'MEDICAL', 'PRESCRIPTIONS', 'DENTAL', or 'VISION'.
 * @param {BenefitData} props.benefitData - The benefit data for the specific type.
 */
const HealthPlanImage = ({ benefitType, benefitData: { PLAN_NAME } }) => {
  // Update image details based on specific PLAN_NAME conditions
  if (benefitType === PLAN_TYPES.MEDICAL && PLAN_NAME && (PLAN_NAME.includes('High Performance HSA Plan') || PLAN_NAME.includes("High Performance Copay Plan"))) {
    planImages.MEDICAL = {
      src: '/Content/Images/icons/total-rewards/health-care/centivo-logo.png',
      alt: 'Centivo logo',
      className: 'health-care__plan-coverage-logo--centivo-icon',
    };
  } else if (benefitType === PLAN_TYPES.DENTAL && PLAN_NAME && PLAN_NAME.includes('Anthem Dental Essential Choice')) {
    planImages.DENTAL = {
      src: '/Content/Images/icons/total-rewards/health-care/anthem-logo.svg',
      alt: 'Anthem logo',
    };
  }

  // access the value of "planImages" based on benefit type using destructuring
  const { src, alt, className } = planImages[benefitType] || {};

  // render image if a src attribute was found
  return src ? (
    <div className={`health-care__plan-coverage-logo d-flex justify-content-end ${className || ''}`}>
      <img src={src} alt={alt} />
    </div>
  ) : null;
};

export default HealthPlanImage;
