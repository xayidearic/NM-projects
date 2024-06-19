import { createRoot } from 'react-dom/client';
import { Provider, useDispatch } from 'react-redux';

import { useGetCompensationDataQuery } from '../../dux/totalRewardsApi.js';
import { registerCustomElement } from '../../app/registerCustomElement.js';
import CompensationTableErrorPlaceholder from './CompensationTableErrorPlaceholder.jsx';
import store from '../../store.js';
import DataTableHeader from './DataTableHeader.jsx';
import DataTableBody from './DataTableBody.jsx';
import { useEffect } from 'react';
import { CookieManager } from '../../app/cookieManager.js';
import { setHideData } from '../../dux/hideDataSlice.js';

/**
 *
 * @returns Compensation Table wrapper
 */
const CompensationTable = () => {
  return (
    <section className="total-rewards-table">
      <table className="w-100 comp-data">
        <DataTableHeader />
        <DataTableBody />
      </table>
    </section>
  );
};

export const CompensationTableSection = () => {
  const { isError, isLoading } = useGetCompensationDataQuery('data');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setHideData({ hideCompData: CookieManager.getCookie('hideCompData') }));
  }, [dispatch]);

  return isError || isLoading ? <CompensationTableErrorPlaceholder /> : <CompensationTable />;
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

export default CompensationTable;
