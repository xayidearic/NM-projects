import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import ConnectionAlertBanner from '../ConnectionAlertBanner.jsx';
import { registerCustomElement } from '../../app/registerCustomElement.js';
import store from '../../store.js';
import useFetchData from './FetchFSData.jsx';

/**
 *
 * @returns Banner if an endpoint fails
 * Track any errors for the 6 endpoints
 * Reusable banner UI
 */
export const ServiceStatus = () => {
  const { isError } = useFetchData();
  return isError ? (
    <ConnectionAlertBanner textContent="Some data on this page is currently unavailable. You'll find more details in the impacted section(s) below. " />
  ) : null;
};

class BannerAlertClass extends HTMLElement {
  connectedCallback() {
    const root = createRoot(this);
    root.render(
      <Provider store={store}>
        <ServiceStatus />
      </Provider>
    );
  }
}

/**Registers class to define it as a handler for specific element */
registerCustomElement('total-rewards-fs-alert-banner', BannerAlertClass);
