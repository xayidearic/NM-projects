import DataTableHeader from './DataTableHeader.jsx';
import DataTableBody from './DataTableBody.jsx';
import { useEffect, useState } from 'react';
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
 * @returns Compensation Table wrapper
 * custome hook to get data from 4 endpoints (investments, retirement, comp, projections)
 *  - gets user age and parses string as an Integer
 *  - get marital status state
 */
const RetirementProjectionsTable = () => {
  const { investments, retirement, comp, projections } = useFetchData();

  const [age, setAge] = useState(null);
  const [isMarried, setIsMarried] = useState(null);

  useEffect(() => {
    if ((retirement, comp)) {
      setAge(parseInt(comp.Age));

      const isMarriedStatus = retirement.mar_status === 'M';
      setIsMarried(isMarriedStatus);
    }
  }, [retirement, comp]);

  return (
    <div className="blue-section py-8 py-lg-10 my-8 mby-md-9 my-lg-12">
      <section className="total-rewards-table">
        <h1 className="mb-lg-8 mb-4 color-primary">Employee Retirement Projections</h1>
        <table className="w-100 retirement-data">
          <DataTableHeader age={age} />
          <DataTableBody age={age} isMarried={isMarried} investments={investments} retirement={retirement} projections={projections} />
        </table>
        <LegalNote />
      </section>
    </div>
  );
};

export default RetirementProjectionsTable;
