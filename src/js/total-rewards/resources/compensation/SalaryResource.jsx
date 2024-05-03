import AuthoredContentHandler from '../../AuthoredContentHandler.jsx';
import blur from '../../formatting/blurDataFormat.js';
import { useGetCompensationDataQuery } from '../../../dux/totalRewardsApi.js';
import ResourceListLinks from '../ResourceListLinks.jsx';
import ResourceDivider from '../../ResourceDivider.jsx';

const SalaryDataConditional = () => {
  const { data, isError, isLoading } = useGetCompensationDataQuery('data');

  if (isError || isLoading) {
    // Render empty neutral light gray box
    return (
      <div
        className={`total-rewards-resource__data col-lg-4 p-4 mb-4 ${isLoading ? 'neutral-light-gray-bg' : 'neutral-cloud-bg'}`}
        role="progressbar"
      >
        <p className="mb-0 p-2"></p>
      </div>
    );
  }

  return data ? (
    <div className="total-rewards-resource__data neutral-light-gray-bg p-4 display-inline-block mb-4">
      <p className="mb-0">
        Base Pay: <span className="weight-500 color-primary">{data.hideData ? blur.amount : data.formattedAmount.Salary}</span>
      </p>
    </div>
  ) : null;
};

/**
 * Section for displaying salary data and resources
 * @param {{ sectionContent: SectionContent }} props
 * @returns
 */
const SalaryResource = ({ sectionContent }) => {
  return (
    <section className="total-rewards-resource">
      <h2 className="color-primary">{sectionContent.Title}</h2>
      <div className="d-lg-block d-flex flex-column">
        <ResourceListLinks hasResources={sectionContent.HasResources} resourceLinks={sectionContent.ResourceLinks} />
        <SalaryDataConditional />
        <AuthoredContentHandler content={sectionContent.SectionBody} />
      </div>
      <ResourceDivider />
    </section>
  );
};

export default SalaryResource;
