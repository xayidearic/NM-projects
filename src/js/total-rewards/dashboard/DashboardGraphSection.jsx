import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/client';

import DashboardCircleGraph from './circle-graph/DashboardCircleGraph';
import DashboardGraphInstruction from './DashboardGraphInstruction';
import DashboardSlides from './slider/DashboardSlides';
import { registerCustomElement } from '../../app/registerCustomElement';
import sections from '../constants/graphSections';
import store from '../../store.js';
import { useGetDashboardDataQuery } from '../../dux/totalRewardsApi.js';
import { GetBlurChoices } from '../BlurToggle.jsx';
import DashboardBlurToggle from './DashboardBlurToggle.jsx';

/**
 *
 * @returns {JSX.Element} Static graph section footer
 */
const DashboardGraphFooter = () => {
  return (
    <div className="dashboard__graph-footer text-center mt-lg-11 mt-9">
      <div className="col-12 medium-gray-border mb-5"></div>
      <div className="source">
        "My Total Rewards Value" is an estimation. The benefits you receive under any of the plans depend on the actual conditions existing at the
        time of a particular benefit claim or compensation payment. See{' '}
        <a className="link--underlined-always source" href="/en/topic-sites/my-total-rewards/assumptions-disclaimers/">
          {' '}
          assumptions and disclaimers
        </a>{' '}
        for more information.
      </div>
    </div>
  );
};

/**
 *
 * @returns {JSX.Element} Service error placeholder
 */
const ErrorPlaceholder = () => {
  return (
    <div className="col-lg-6 mt-4">
      <div className="dashboard__graph--error-state"></div>
    </div>
  );
};

/**
 * @param {Object} props - The props for this component
 * @param {Object} props.slideContent - Authored JSON
 * @returns {JSX.Element} TR Circle + Slide Content
 */
export const DashboardGraph = ({ slideContent }) => {
  const { data } = useGetDashboardDataQuery('totals');
  const [section, setSection] = useState(sections.comp);
  const [slideNum, setSlideNum] = useState(0);
  const [blurSlide, setBlurSlide] = useState(GetBlurChoices('hideDashboardData'));
  const slideAuthoredContent = JSON.parse(slideContent);

  return (
    <div className="dashboard">
      <div className="d-block d-lg-none">
        <DashboardBlurToggle blurSlide={blurSlide} setBlurSlide={setBlurSlide} />
      </div>
      <DashboardGraphInstruction />
      <div className="row gx-lg-12 d-flex align-items-center">
        {!data ? <ErrorPlaceholder /> : <DashboardCircleGraph section={section} setSection={setSection} setSlideNum={setSlideNum} />}
        <DashboardSlides
          section={section}
          setSection={setSection}
          slideNum={slideNum}
          setSlideNum={setSlideNum}
          slideAuthoredContent={slideAuthoredContent}
          blurSlide={blurSlide}
          setBlurSlide={setBlurSlide}
        />
        <DashboardGraphFooter />
      </div>
    </div>
  );
};

class GraphSectionClass extends HTMLElement {
  connectedCallback() {
    const root = createRoot(this);
    root.render(
      <Provider store={store}>
        <DashboardGraph slideContent={this.getAttribute('slide-content')} />
      </Provider>
    );
  }
}

/** Registers class to define it as a handler for specific element */
registerCustomElement('total-rewards-dashboard-graph-section', GraphSectionClass);
