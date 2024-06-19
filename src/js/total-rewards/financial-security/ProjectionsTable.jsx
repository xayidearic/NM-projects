import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import DataTableHeader from './DataTableHeader.jsx';
import ProjectionsTableBody from './ProjectionsTableBody.jsx';
import ServiceFailureAlert from './ServiceFailureAlert.jsx';
import { registerCustomElement } from '../../app/registerCustomElement.js';
import store from '../../store.js';
import useFetchData from './FetchFSData.jsx';

export const LegalNote = () => {
  return (
    <div className="legal mt-4">
      Current 401(k) balance and employee contribution percentage are updated in real time; current projections are based on current contribution
      percentage. Cash Balance is updated on the seventh business day of each month. The amounts shown above represent potential benefits and are not
      a promise or guarantee of amounts payable in the future. The amounts assume you work through the end of the month in which you reach the
      illustrated projection age. See full{' '}
      <a href="/en/topic-sites/my-total-rewards/assumptions-disclaimers/" className="legal text-decoration-underline">
        assumptions and disclaimers
      </a>
      .
    </div>
  );
};

/**
 *
 * @returns Table Header and Body
 */
const ProjectionsTableContent = () => {
  const { comp } = useFetchData();

  const age = comp?.age || 0;

  return (
    <section className="total-rewards-table">
      <h1 className="mb-lg-8 mb-4 color-primary">Employee Retirement Projections</h1>
      <table className="w-100 retirement-data">
        <DataTableHeader age={age} />
        <ProjectionsTableBody age={age} />
      </table>
      <LegalNote />
    </section>
  );
};

/**
 * Projections Table wrapper
 * @returns Alert box and Table Content
 * Uses error hooks to display error messages
 * - hasProjectionsError - displays error message if projections fail
 * - hasInvestmentsError - displays error message if investments fail
 *  - gets user age and parses string as an Integer
 */
const ProjectionsTable = () => {
  const { hasProjectionsError, hasInvestmentsError } = useFetchData();

  const errorMessage = hasProjectionsError ? (
    <>
      We are currently experiencing issues displaying your retirement information. Contact{' '}
      <a href="https://nml.service-now.com/askhr" target="_blank">
        Ask HR
      </a>{' '}
      if you have questions.
    </>
  ) : hasInvestmentsError ? (
    <>
      Your investments are currently unavailable. Log in to{' '}
      <a href="https://ownyourfuture.vanguard.com/en/home/publogin" target="_blank" title="Vanguard">
        Vanguard
      </a>{' '}
      to see your balance and make changes to your plan. Contact{' '}
      <a href="https://nml.service-now.com/askhr" target="_blank">
        Ask HR
      </a>{' '}
      if you have questions.
    </>
  ) : null;

  return (
    <div className="fs-projections blue-section py-8 py-lg-10 my-8 mby-md-9 my-lg-12">
      {errorMessage && <ServiceFailureAlert children={errorMessage} />}
      <ProjectionsTableContent />
    </div>
  );
};

class RetirementProjectionsClass extends HTMLElement {
  connectedCallback() {
    const root = createRoot(this);
    root.render(
      <Provider store={store}>
        <ProjectionsTable />
      </Provider>
    );
  }
}

registerCustomElement('total-rewards-retirement-projections-table', RetirementProjectionsClass);
