import AuthoredContentHandler from "../../AuthoredContentHandler.jsx";
import useFetchData from "../../financial-security/FetchFSData.jsx";
import blur from "../../formatting/blurDataFormat.js";
import ResourceDivider from "../../ResourceDivider.jsx";
import ResourceListLinks from "../ResourceListLinks.jsx";
import ResourceLogoSection from "../ResourceLogoSection.jsx";

/**
 * 
 * @param {string} title authored title 
 * @returns header title
 */
const SectionTitle = ({ title }) => {
    return (
        <div className="d-flex align-items-center mb-2 justify-content-between">
            <h2 className="color-primary m-0">{title}</h2>
        </div>
    )
}


/**
 * @param {object} investments cookie data
 * @param {object} retirement data
 * @param {boolean} render successful endpoints
 * @returns the loading or error state / if successful then the table returns
 */
const TableConnectionState = ({ investments, retirement, render }) => {
    if (render) {
        return <Table investments={investments} retirement={retirement} />
    } else {
        return (
            <div className="neutral-light-gray-bg total-rewards-resource__data col-12">
                <p className="mb-0 p-8"></p>
            </div>
        );
    }
}


/**
 * @param {object} investments vanguard data
 * @param {object} retirement actuarial data
 * @returns Final average pay table

 */
const Table = ({ investments, retirement }) => {
    return (
        <div className="total-rewards-table mb-8">
            <table className="w-100">
                <tbody>
                    <tr className="neutral-light-gray-background">
                        <td className="color-primary weight-500">Annual Final Average Pay Benefit</td>
                        <td className="text-truncate color-primary text-end">{investments.hideData ? blur.amount : retirement.formattedAmount.fap_accrued_ben}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

/**
 * 
 * @param {object} sectionContent CMS authored connect
 * @returns Final Average Plan resource section
 * if fap_accrued_ben is 0 then don't show this section 
 */
const FAPBenefitResource = ({ sectionContent }) => {
    const { investments, retirement, render } = useFetchData();

    //if fap_accrued_ben is 0 then don't show this section 
    if (retirement && !retirement.fap_accrued_ben) {
        return null
    }

    return (
        <section className="total-rewards-resource mt-lg-11">
            <div className="d-lg-block d-flex flex-column">
                <ResourceListLinks
                    hasResources={sectionContent.HasResources}
                    resourceLinks={sectionContent.ResourceLinks}
                />
                <div className={sectionContent.HasResources && 'col-lg-8 pe-lg-7'}>
                    <SectionTitle title={sectionContent.Title} />
                    <TableConnectionState
                        investments={investments}
                        retirement={retirement}
                        render={render}
                    />
                </div>
                <AuthoredContentHandler content={sectionContent.SectionBody} />
                <ResourceLogoSection sectionContent={sectionContent} />
            </div>
            <ResourceDivider />
        </section>
    )
};

export default FAPBenefitResource;