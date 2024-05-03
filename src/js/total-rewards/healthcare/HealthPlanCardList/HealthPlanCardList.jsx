import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import { registerCustomElement } from '../../../app/registerCustomElement.js';
import store from '../../../store.js';
import { useGetHealthBenefitsDataQuery } from '../../../dux/totalRewardsApi.js';

import HealthPlanCard from './HealthPlanCard.jsx';
import blur from '../../formatting/blurDataFormat';
import { PLAN_TYPES } from '../../constants/health-page.js';

/**
 * Renders a default blur state for health cards.
 *
 * @returns {JSX.Element} The blur state for health plan cards.
 */
const HealthCardBlurState = () => (
  // create an array of 4 elements using spread
  // _, to indicate this argument wont be used, thus arrays will be targeted only through the index to set specific class rules. i.e. index % 2 === 0
  <div className="row">
    {[...Array(4)].map((_, index) => (
      <div
        key={index}
        className={`health-care__plan-coverage-card health-care__plan-coverage-card--blur-state px-0 col-12 col-lg-6 ${
          index % 2 === 0 ? 'pe-lg-3' : 'ps-lg-3'
        } ${index < 2 ? 'mb-6 mb-lg-6' : ''} ${index < 3 ? 'mb-6 mb-lg-6' : ''}`}
      >
        <div></div>
      </div>
    ))}
  </div>
);

/**
 * Renders a specific health plan card based on plan type.
 *
 * @param {Array} plans - The list of health plans.
 * @param {string} planType - The type of health plan.
 * @param {string} defaultName - The default name to display if a plan isn't found.
 * @param {boolean} hideData - Indicator whether to hide the data or not.
 * @returns {JSX.Element} The health plan card.
 */
const renderPlanCard = (plans, planType, defaultName, hideData) => {
  const plan = plans?.find((plan) => plan.BENEFIT_TYPE === planType);

  const planData = { ...plan };

  if (planType === PLAN_TYPES.PRESCRIPTIONS) {
    const medicalPlan = plans?.find((plan) => plan.BENEFIT_TYPE === PLAN_TYPES.MEDICAL);

    if (medicalPlan && medicalPlan.COVERAGE) {
      planData.COVERAGE = medicalPlan.COVERAGE;
    }
  }

  return (
    <HealthPlanCard healthPlanName={planData.PLAN_NAME || defaultName} healthPlanData={planData} healthPlanType={planType} hideState={hideData} />
  );
};

/**
 * Main component to render a list of health plan cards.
 *
 * @returns {JSX.Element} The rendered list of health plan cards.
 */
export const HealthPlanCardList = () => {
  const { data: { data: plans, hideData, As_Of_Date } = {}, isLoading, isError } = useGetHealthBenefitsDataQuery('data');
  const prescriptionPlanName = plans?.some((plan) => plan.BENEFIT_TYPE === PLAN_TYPES.MEDICAL && plan.EMPLOYEE_MONTHLY_COST !== 0)
    ? 'CVS Caremark'
    : 'Prescriptions Plan';

  return (
    <section className="health-care__health-plans blue-section">
      <div className="d-flex flex-column flex-lg-row justify-content-between align-items-lg-end mb-4">
        <h2 className="color-primary mb-0">My healthcare plans</h2>
        <p className="metadata mt-2 mt-lg-0">
          As of date: <span className="metadata">{hideData || isLoading || isError ? blur.date : As_Of_Date}</span>
        </p>
      </div>

      {isError || isLoading ? (
        <HealthCardBlurState />
      ) : (
        <div className="row">
          <div className="col-12 col-lg-6 pe-lg-3 mb-6 mb-lg-6">{renderPlanCard(plans, PLAN_TYPES.MEDICAL, 'Healthcare Plan', hideData)}</div>
          <div className="col-12 col-lg-6 ps-lg-3 mb-6 mb-lg-6">
            {renderPlanCard(plans, PLAN_TYPES.PRESCRIPTIONS, prescriptionPlanName, hideData)}
          </div>
          <div className="col-12 col-lg-6 mb-4 mb-lg-0 pe-lg-3">{renderPlanCard(plans, PLAN_TYPES.DENTAL, 'Dental Plan', hideData)}</div>
          <div className="col-12 col-lg-6 ps-lg-3">{renderPlanCard(plans, PLAN_TYPES.VISION, 'Vision Plan', hideData)}</div>
        </div>
      )}
    </section>
  );
};

class HealthPlansClass extends HTMLElement {
  connectedCallback() {
    const root = createRoot(this);
    root.render(
      <Provider store={store}>
        <HealthPlanCardList />
      </Provider>
    );
  }
}

registerCustomElement('health-plan-card-list', HealthPlansClass);
