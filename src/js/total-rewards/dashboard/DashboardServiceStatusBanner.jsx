import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import ConnectionAlertBanner from '../ConnectionAlertBanner.jsx';
import { registerCustomElement } from '../../app/registerCustomElement.js';
import store from '../../store.js';
import { useGetDashboardDataQuery } from '../../dux/totalRewardsApi.js';

export const ServiceStatus = () => {
  const { data, isError, isFetching } = useGetDashboardDataQuery('totals');

  return isFetching ? null : isError ? (
    <ConnectionAlertBanner textContent="Data is currently unavailable, and a resolution is in progress" />
  ) : !(data.CompensationTotalSuccess && data.FinancialSecureSuccess && data.HealthcareTotalSuccess) ? (
    <ConnectionAlertBanner textContent="Some data on this page is currently unavailable. You’ll find more details in the impacted section(s) below." />
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
registerCustomElement('total-rewards-dashboard-alert-banner', BannerAlertClass);
