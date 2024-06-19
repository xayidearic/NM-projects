import { useEffect, useState } from 'react';
import { useGetDashboardDataQuery } from '../../../dux/totalRewardsApi';

import AuthoredContentHandler from '../../AuthoredContentHandler';
import blur from '../../formatting/blurDataFormat';
import DashboardBlurToggle from '../DashboardBlurToggle';
import PrimaryGoldButton from './PrimaryGoldButton';
import sections from '../../constants/graphSections';
import { useSelector } from 'react-redux';

/**
 * @typedef SlideContentModel
 *
 * @property {string} sectionBody - The body of the slide
 * @property {string} sectionId - The id of the slide
 * @property {string} sectionTitle - The title of the slide
 */

/**
 *
 * @param {Object} props - Slide Amount for comp, security or healthcare
 * @param {string} props.section - Slide Amount fpr comp, security or healthcare
 * @returns {JSX.Element} Element with endpoint data amount
 */
const AmountElement = ({ section }) => {
  const { data, isFetching } = useGetDashboardDataQuery('totals');
  const hideData = useSelector((state) => state.hideData.hideDashboardData);
  const [amount, setAmount] = useState(null);

  useEffect(() => {
    if (data) {
      section === sections.comp ? setAmount(data.formattedAmount.CompensationTotal) : '';
      section === sections.security ? setAmount(data.formattedAmount.FinancialSecurityTotal) : '';
      section === sections.health ? setAmount(data.formattedAmount.HealthcareTotal) : '';
    }
  }, [data, section]);

  if (!isFetching) {
    if (
      (section === sections.comp && !data?.CompensationTotalSuccess) ||
      (section === sections.security && !data?.FinancialSecureSuccess) ||
      (section === sections.health && !data?.HealthcareTotalSuccess)
    ) {
      return (
        <div className="text-center">
          <div className="neutral-cloud-bg col-8 m-auto pb-11 mt-2 mb-1 rounded"></div>
          <p className="amount-error-text eyebrow mb-8">This data is currently unavailable.</p>
        </div>
      );
    }
  }

  return <div className="amount color-primary mb-2">{hideData ? blur.amount : amount}</div>;
};

/**
 * @param {Object} props - Slide Amount for comp, security or healthcare
 * @param {SlideContentModel} props.content - Authored content
 * @param {boolean} props.blurSlide - Blur slide state
 * @param {() => void} props.setBlurSlide - Blur slide state function
 * @returns
 */
const SlideContent = ({ content, blurSlide, setBlurSlide }) => {
  const { data } = useGetDashboardDataQuery('totals');
  const showAmount = content.sectionId === sections.comp || content.sectionId === sections.security || content.sectionId === sections.health;

  return (
    <div className="swiper-slide">
      <h3 className="color-primary mb-0">{content.sectionTitle}</h3>
      {showAmount && <AmountElement section={content.sectionId} />} {/* if slide is comp, financial security or healthcare */}
      {data &&
        ((content.sectionId === sections.comp && data?.CompensationTotalSuccess) ||
          (content.sectionId === sections.security && data?.FinancialSecureSuccess) ||
          (content.sectionId === sections.health && data?.HealthcareTotalSuccess)) && (
          <div className="d-none d-lg-block">
            <DashboardBlurToggle blurSlide={blurSlide} setBlurSlide={setBlurSlide} />
          </div>
        )}
      <AuthoredContentHandler content={content.sectionBody} />
      <PrimaryGoldButton content={content} />
    </div>
  );
};

export default SlideContent;
