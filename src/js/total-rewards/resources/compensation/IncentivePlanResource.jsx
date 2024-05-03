import AuthoredContentHandler from '../../AuthoredContentHandler.jsx';
import blur from '../../formatting/blurDataFormat.js';
import { useGetCompensationDataQuery } from '../../../dux/totalRewardsApi.js';
import ResourceListLinks from '../ResourceListLinks.jsx';
import ResourceDivider from '../../ResourceDivider.jsx';

const IncentiveConnectionState = () => {
  const { data, isError, isLoading } = useGetCompensationDataQuery('data');

  if (isLoading || isError) {
    return (
      <div className={`${isLoading ? 'neutral-light-gray-bg' : 'neutral-cloud-bg'} total-rewards-resource__data col-lg-6 p-4 mb-4`}>
        <p className="mb-0 p-4"></p>
      </div>
    );
  }

  return data ? (
    <div className="total-rewards-resource__data neutral-light-gray-bg p-4 display-inline-block mb-4">
      <p className="mb-0">
        Target Annual Incentive: <span className="weight-500 color-primary">{data.hideData ? blur.amount : data.formattedAmount.Target_AI_Amt}</span>
      </p>
      <div className="eyebrow color-primary mt-1">{data.hideData ? blur.percentage : data.formattedPercentage.Target_AI_Percent} of Base Pay</div>
    </div>
  ) : null;
};

const IncentivePlanResource = ({ sectionContent }) => {
  return (
    <section className="total-rewards-resource">
      <h2 className="color-primary">{sectionContent.Title}</h2>
      <div className="d-lg-block d-flex flex-column">
        <ResourceListLinks hasResources={sectionContent.HasResources} resourceLinks={sectionContent.ResourceLinks} />
        <IncentiveConnectionState />
        <AuthoredContentHandler content={sectionContent.SectionBody} />
      </div>
      <ResourceDivider />
    </section>
  );
};

export default IncentivePlanResource;
