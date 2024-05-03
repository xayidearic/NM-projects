import HealthPlanImage from './HealthPlanImage';
import HealthPlanData from './HealthPlanData';
import HealthPlanDescription from './HealthPlanDescription';
import HealthPlanLink from './HealthPlanLink';

/**
 * Component to display health plan card.
 * 
 * @param {Object} props - Component props
 * @param {string} props.healthPlanName - Name of the health plan
 * @param {Record<string, any>} props.healthPlanData - Data associated with the health plan
 * @param {string} props.healthPlanType - Type of the health plan
 * @param {boolean} props.hideState - Flag to determine if the data should be hidden
 * @param {"MEDICAL" | "PRESCRIPTIONS" | "DENTAL" | "VISION"} props.benefitType - The benefit type
 * 
 * @returns {React.Element}
 */
const HealthPlanCard = ({ healthPlanName, healthPlanData, healthPlanType, hideState }) => {
    const benefitType =
        healthPlanName === "Prescriptions" || healthPlanName === "CVS Caremark"
            ? "PRESCRIPTIONS"
            : healthPlanData.BENEFIT_TYPE;

    const cardClasses = `health-care__plan-coverage-card ${!benefitType ? 'health-care__plan-coverage-card--no-coverage' : ''} p-6 py-10 p-lg-2 p-xl-6 rounded`;

    const titleMarginClass = healthPlanData.PLAN_NAME && (healthPlanData.PLAN_NAME.includes("High Performance HSA Plan") || healthPlanData.PLAN_NAME.includes("High Performance Copay Plan"))? 'mt-0' : 'my-2';

    return (
        <div className={cardClasses}>
            <HealthPlanImage benefitType={benefitType} benefitData={healthPlanData} />

            <h3 className={titleMarginClass}>{healthPlanName}</h3>

            <div className='health-care__plan-data p-4 rounded mb-3 mb-lg-6'>
                <HealthPlanData benefitType={benefitType} benefitData={healthPlanData} benefitPlanType={healthPlanType} hideData={hideState} />
            </div>

            <div className='mb-2'>
                <HealthPlanDescription benefitType={benefitType} benefitData={healthPlanData} hideData={hideState} />
            </div>

            <HealthPlanLink benefitType={benefitType} benefitData={healthPlanData} benefitPlanType={healthPlanType} />
        </div>
    )
}

export default HealthPlanCard;