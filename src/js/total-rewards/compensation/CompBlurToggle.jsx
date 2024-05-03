import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import { BlurToggle } from '../BlurToggle.jsx';
import { registerCustomElement } from '../../app/registerCustomElement.js';
import store from '../../store.js';
import { useGetCompensationDataQuery } from '../../dux/totalRewardsApi.js';

const cookieNameAttr = 'cookie-name';

export const CompBlurToggle = ({ cookName }) => {
  const { refetch } = useGetCompensationDataQuery('data');
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
        <CompBlurToggle cookName={this.cookName} />
      </Provider>
    );
  }
}

registerCustomElement('total-rewards-comp-blur-toggle', BlurToggleClass);
