import { createRoot } from 'react-dom/client';
import { useEffect, useState } from 'react';

import { CookieManager } from '../app/cookieManager';
import { GetBlurChoices } from '../total-rewards/BlurToggle';
import { registerCustomElement } from '../app/registerCustomElement';

const analyticsHandler = (resourceLink, campaignType) => {
  window.adobeDataLayer?.push({
    event: 'DLP Banner Interact',
    resource_details: {
      resource_name: campaignType,
      resource_selected: resourceLink,
    },
  });

  window.heap?.track('DLP Banner Interact', {
    resource_name: campaignType,
    resource_selected: resourceLink,
  });
};

/**
 *
 * @param {Object} props
 * @param {string} props.blockData model properties
 * @param {string} props.blockImg model image path
 * @returns {JSX.Element} Banner block
 * Parse data as JSON
 * Sets cookie name using campaign type & value to true
 * Features:
 *      -Dismissal/closing of block (sets state & campaign type cookie to false)
 *      -Title font size should be bigger if there isn't a subtitle
 *      -If block is not checked off as Dismissible by author - do not show close button
 * Adobe Analytics:
 *      -on component mount
 *      -on CTA & close click
 */
export const PersonalizedBanner = ({ blockData, blockImg }) => {
  const data = blockData.replace(/\\(.)/gm, '$1');
  const parsedData = JSON.parse(data);
  const [isOpen, setIsOpen] = useState(GetBlurChoices(parsedData.CampaignType));

  const closeBanner = () => {
    setIsOpen(false);
    CookieManager.setCookie(parsedData.CampaignType, false);
    analyticsHandler('Close', parsedData.CampaignType);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      window.adobeDataLayer?.push({
        event: 'Show DLP Banner',
        resource_details: {
          resource_name: parsedData.CampaignType,
        },
      });
      clearInterval(timer);
    }, 8000);

    return () => clearInterval(timer); // cleanup the timer to avoid memory leaks
  }, [parsedData.CampaignType]);

  useEffect(() => {
    const timer = setInterval(() => {
      window.heap?.track('Show DLP Banner', {
        resource_name: parsedData.CampaignType,
      });
      clearInterval(timer);
    }, 5000);

    return () => clearInterval(timer); // cleanup the timer to avoid memory leaks
  }, [parsedData.CampaignType]);

  return (
    isOpen && (
      <div className="campaign-banner">
        <div className="d-flex col-12">
          <div className="campaign-banner__img col-4">
            <img src={blockImg} className="h-100" />
          </div>
          <div className="campaign-banner__content justify-content-between w-100">
            <div className="d-flex py-lg-8 py-6">
              <div className="campaign-banner__content-divider h-100 mx-lg-10 mx-6"></div>
              <div>
                <div className="eyebrow text-uppercase">{parsedData.MessageType}</div>
                <div className={`campaign-banner__title ${parsedData.Subtitle ? 'with-subtitle' : 'without-subtitle'} my-2`}>{parsedData.Title}</div>
                <p className="p1">{parsedData.Subtitle}</p>
                <div
                  tabIndex="0"
                  className="template-btn__primary-blue d-inline-block mt-4"
                  onClick={() => analyticsHandler(parsedData.Link.Text, parsedData.CampaignType)}
                >
                  <a
                    role="button"
                    tabIndex="-1"
                    href={parsedData.Link.Href}
                    title={parsedData.Link.Title}
                    target={parsedData.Link.Target}
                    className="text-decoration-none weight-500"
                  >
                    {parsedData.Link.Text}
                  </a>
                </div>
              </div>
            </div>
            {parsedData.IsDismissible && (
              <button className="campaign-banner__content--close p-0 mt-lg-4 me-lg-4 mt-2 me-3">
                <img src="/Content/Images/icons/close-blue_icon.svg" className="p-lg-2" onClick={closeBanner} />
              </button>
            )}
          </div>
        </div>
      </div>
    )
  );
};

class PersonalizedBannerClass extends HTMLElement {
  connectedCallback() {
    const root = createRoot(this);
    root.render(<PersonalizedBanner blockData={this.getAttribute('block-data')} blockImg={this.getAttribute('block-img')} />);
  }
}

registerCustomElement('personalization-banner-block', PersonalizedBannerClass);
