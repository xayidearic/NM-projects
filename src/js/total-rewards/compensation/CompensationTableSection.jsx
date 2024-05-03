import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import { useGetCompensationDataQuery } from '../../dux/totalRewardsApi.js';
import { registerCustomElement } from '../../app/registerCustomElement.js';
import CompensationTable from './CompensationTable.jsx';
import CompensationTableErrorPlaceholder from './CompensationTableErrorPlaceholder.jsx';
import store from '../../store.js';

export const CompensationTableSection = () => {
  const { isError } = useGetCompensationDataQuery('data');

  return <>{isError ? <CompensationTableErrorPlaceholder /> : <CompensationTable />}</>;
};

class CompensationTableClass extends HTMLElement {
  connectedCallback() {
    const root = createRoot(this);
    root.render(
      <Provider store={store}>
        <CompensationTableSection />
      </Provider>
    );
  }
}

registerCustomElement('total-rewards-compensation-table', CompensationTableClass);
