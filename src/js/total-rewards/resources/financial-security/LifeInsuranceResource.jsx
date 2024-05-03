import AuthoredContentHandler from "../../AuthoredContentHandler.jsx";
import ResourceListLinks from "../ResourceListLinks.jsx";
import ResourceLogoSection from '../ResourceLogoSection.jsx';


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


const Table = () => {
    return (
        <div className="total-rewards-table mb-8">
            <table className="w-100 disability-insurance">
                <tbody>
                    <tr className="neutral-light-gray-background">
                        <td>2x salary not to exceed $750,000</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

/**
 * 
 * @param {object} sectionContent CMS authored connect
 * @returns Life Insurance resource section
 * All static information
 */
const LifeInsuranceResource = ({ sectionContent }) => {
    return (
        <section className="total-rewards-resource mt-lg-11">
            <div className="d-lg-block d-flex flex-column">
                <ResourceListLinks hasResources={sectionContent.HasResources} resourceLinks={sectionContent.ResourceLinks} />
                <div className={sectionContent.HasResources && 'col-lg-8 pe-lg-7'}>
                    <SectionTitle title={sectionContent.Title} />
                    <Table />
                </div>
                <AuthoredContentHandler content={sectionContent.SectionBody} />
                <ResourceLogoSection sectionContent={sectionContent} />
            </div>
        </section>
    )
};

export default LifeInsuranceResource;