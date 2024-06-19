import { useSelector } from 'react-redux';

import AuthoredContentHandler from '../../AuthoredContentHandler.jsx';
import useFetchData from '../../financial-security/FetchFSData.jsx';
import blur from '../../formatting/blurDataFormat.js';
import ResourceDivider from '../../ResourceDivider.jsx';
import ResourceListLinks from '../ResourceListLinks.jsx';
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
  );
};

const Table = () => {
  const { retirement } = useFetchData();
  const hideData = useSelector((state) => state.hideData.hideFSData);
  const { fap_accrued_ben } = retirement?.formattedAmount ?? {};

  return (
    <div className="total-rewards-table mb-8">
      <table className="w-100">
        <tbody>
          <tr className="neutral-light-gray-background">
            <td className="color-primary weight-500">Annual Final Average Pay Benefit</td>
            <td className="text-truncate color-primary text-end">{hideData ? blur.amount : fap_accrued_ben}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

/**
 *
 * @param {object} sectionContent CMS authored connect
 * @returns Final Average Plan resource section
 * if Error or fap_accrued_ben is 0 then return null
 */
const FAPBenefitResource = ({ sectionContent }) => {
  const { hasProjectionsError, retirement } = useFetchData();

  return hasProjectionsError || !retirement?.fap_accrued_ben ? null : (
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
      <ResourceDivider />
    </section>
  );
};

export default FAPBenefitResource;
