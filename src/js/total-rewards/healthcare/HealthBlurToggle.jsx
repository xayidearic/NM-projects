import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import { BlurToggle } from '../BlurToggle.jsx';
import { registerCustomElement } from '../../app/registerCustomElement.js';
import store from '../../store.js';
import { useGetHealthBenefitsDataQuery } from '../../dux/totalRewardsApi.js';

const cookieNameAttr = 'cookie-name';

/**
 * Sets a cookie name with boolean value
 * @param {string} cookName cookie name
 * @returns BlurToggle
 *  - sets a cookie name with a boolean value
 *  - toggle ui
 */
export const HealthBlurToggle = ({ cookName }) => {
  const { refetch } = useGetHealthBenefitsDataQuery('data');
  return <BlurToggle cookName={cookName} refetch={refetch} />;
};

class BlurToggleClass extends HTMLElement {
  static observedAttributes = [cookieNameAttr];

  get cookName() {
    return this.getAttribute(cookieNameAttr);
  }

  connectedCallback() {
    const root = createRoot(this);

    root.render(
      <Provider store={store}>
        <HealthBlurToggle cookName={this.cookName} />
      </Provider>
    );
  }
}

registerCustomElement('total-rewards-health-blur-toggle', BlurToggleClass);
