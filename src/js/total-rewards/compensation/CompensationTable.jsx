import DataTableHeader from './DataTableHeader.jsx';
import DataTableBody from './DataTableBody.jsx';

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
    )
}

export default CompensationTable;