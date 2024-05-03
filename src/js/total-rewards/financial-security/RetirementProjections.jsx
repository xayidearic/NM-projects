import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import RetirementProjectionsErrorPlaceholder from './RetirementProjectionsErrorPlaceholder.jsx';
import { registerCustomElement } from '../../app/registerCustomElement.js';
import RetirementProjectionsTable from './RetirementProjectionsTable.jsx';
import store from '../../store.js';
import useFetchData from './FetchFSData.jsx';

/**
 *
 * @returns
 * Endpoints : check all 6 endpoints are successful
 */
export const RetirementProjections = () => {
  const { render } = useFetchData();

  if (render) {
    return <RetirementProjectionsTable />;
  } else {
    return <RetirementProjectionsErrorPlaceholder />;
  }
};

class RetirementProjectionsClass extends HTMLElement {
  connectedCallback() {
    const root = createRoot(this);
    root.render(
      <Provider store={store}>
        <RetirementProjections />
      </Provider>
    );
  }
}

registerCustomElement('total-rewards-retirement-projections-table', RetirementProjectionsClass);
