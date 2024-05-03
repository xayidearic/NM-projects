/**
 *
 * @returns Table header with dynamic year
 */
const DataTableHeader = () => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();

  return (
    <caption>
      <h2 className="color-primary m-0">{currentYear} Target Compensation</h2>
    </caption>
  );
};

export default DataTableHeader;
