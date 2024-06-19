/**
 *
 * @returns Table Headers
 * Hide age table headers based on user age
 */
const DataTableHeader = ({ age }) => {
  return (
    <thead>
      <tr className="eyebrow">
        <th className="pb-2 brand__blue-primary">BENEFIT</th>
        <th className="pb-2 brand__blue-primary">CURRENT BALANCE</th>

        {age < 60 ? <th className="pb-2 brand__blue-primary">AT 60</th> : null}
        {age < 62 ? <th className="pb-2 brand__blue-primary">AT 62</th> : null}
        {age < 65 ? <th className="pb-2 brand__blue-primary">AT 65</th> : null}
      </tr>
    </thead>
  );
};

export default DataTableHeader;
