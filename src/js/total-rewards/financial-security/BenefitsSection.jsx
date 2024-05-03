import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import { registerCustomElement } from '../../app/registerCustomElement.js';
import store from '../../store.js';
import { useEffect, useState } from 'react';
import AuthoredContentHandler from '../AuthoredContentHandler.jsx';
import useFetchData from './FetchFSData.jsx';

import { formatSalaryAmounts } from '../formatting/formatSalaryAmount.js';
import blur from '../formatting/blurDataFormat.js';

/**
 *
 * @param {string} linkPath
 * @param {string} linkTitle
 * @param {string} linkName
 * @returns Authored links for benefit blocks
 * Reusable component
 */
const Link = ({ linkPath, linkTitle, linkName }) => {
  return (
    <div className="mt-4">
      <a href={linkPath} target="_blank" className="weight-500" title={linkTitle}>
        {linkName}
        <img src="/Content/Images/icons/total-rewards/chevron-right_bold.svg" alt="right arrow" />
      </a>
    </div>
  );
};

/**
 *
 * @param {object} authoredLegalBenefit authored content
 * @param {object} legalBenefitData benefits data
 * @param {object} lifeInsuranceData benefits data
 * @param {object} hideData blur cookie val
 * @param {boolean} render successful endpoints flag
 * @returns
 * Display if in Benefitfocus file, employee <Benefit Type> contains ‘Legal’
 * Format legalBenefitData.EMPLOYEE_MONTHLY_COST to currency
 */
const VoluntaryLegalPlan = ({ authoredLegalBenefit, legalBenefitData, halfSection, hideData, render }) => {
  const legalBenefitEmployeeCost = formatSalaryAmounts(legalBenefitData.EMPLOYEE_MONTHLY_COST);

  return (
    <div className={`total-rewards__fs-benefits col-12 col-lg ${halfSection ? 'me-7' : 'me-0 p-inline-13'}`}>
      {halfSection && <img src={authoredLegalBenefit.VoluntaryLegalPlanIcon} alt={`${authoredLegalBenefit.VoluntaryLegalLinkName}" Icon"`} />}
      <h2 className="color-primary mt-4">{authoredLegalBenefit.VoluntaryLegalPlanTitle}</h2>
      <div className="d-flex">
        {!halfSection && <img src={authoredLegalBenefit.VoluntaryLegalPlanIcon} alt={`${authoredLegalBenefit.VoluntaryLegalLinkName}" Icon"`} />}
        <div className={`neutral-light-gray-bg mt-4 mb-4 d-flex justify-content-between w-100 ${render ? 'p-4' : 'p-6'}`}>
          <div>
            <p className="weight-500 color-primary mb-0">{render && 'My Monthly Contributions:'}</p>
          </div>
          <div>{render && <p className="mb-0">{hideData ? blur.amount : legalBenefitEmployeeCost}</p>}</div>
        </div>
      </div>

      <AuthoredContentHandler content={authoredLegalBenefit.VoluntaryLegalPlanDescription} />

      <Link
        linkPath={authoredLegalBenefit.VoluntaryLegalLinkPath}
        linkTitle={authoredLegalBenefit.VoluntaryLegalLinkTitle}
        linkName={authoredLegalBenefit.VoluntaryLegalLinkName}
      />
    </div>
  );
};

/**
 *
 * @param {object} authoredLifeInsuranceBenefit authored content
 * @param {object} lifeInsuranceData benefits data
 * @param {object} hideData blur cookie val
 * @param {boolean} render successful endpoints flag
 * @returns
 * Display if in Benefitfocus file, employee <Benefit Type> contains ‘SUPLIFE’
 * Format data to currency
 */
const LifeInsurancePlan = ({ authoredLifeInsuranceBenefit, lifeInsuranceData, halfSection, hideData, render }) => {
  const lifeInsuranceEmployeeCost = formatSalaryAmounts(lifeInsuranceData.EMPLOYEE_MONTHLY_COST);
  const coverageAmount = formatSalaryAmounts(lifeInsuranceData.COVERAGE);
  const volume = formatSalaryAmounts(lifeInsuranceData.VOLUME);

  return (
    <div className={`total-rewards__fs-benefits col-12 col-lg mt-8 mt-lg-0 ${halfSection ? '' : 'p-inline-13'}`}>
      {halfSection && (
        <img src={authoredLifeInsuranceBenefit.AdditionalLifeInsuranceIcon} alt={`${authoredLifeInsuranceBenefit.AdditionalLifeLinkName}" Icon"`} />
      )}
      <h2 className="color-primary mt-4">{authoredLifeInsuranceBenefit.AdditionalLifeInsuranceTitle}</h2>
      <div className="d-flex">
        {!halfSection && (
          <img src={authoredLifeInsuranceBenefit.AdditionalLifeInsuranceIcon} alt={`${authoredLifeInsuranceBenefit.AdditionalLifeLinkName}" Icon"`} />
        )}
        <div className={`neutral-light-gray-bg mt-4 mb-4 w-100 ${render ? 'p-4' : 'p-10'}`}>
          <div className="d-flex justify-content-between">
            <div>
              <p className="weight-500 color-primary mb-0">{render && 'Monthly Premium:'}</p>
            </div>
            <div>{render && <p className="mb-0">{hideData ? blur.amount : lifeInsuranceEmployeeCost}</p>}</div>
          </div>
          <div className="d-flex justify-content-between mt-2 mb-2">
            <div>
              <p className="weight-500 color-primary mb-0">{render && 'Coverage Amount:'}</p>
            </div>
            <div>{render && <p className="mb-0">{hideData ? blur.amount : volume}</p>}</div>
          </div>
          <div className="d-flex justify-content-between">
            <div>
              <p className="weight-500 color-primary mb-0">{render && 'Coverage Details:'}</p>
            </div>
            <div>{render && <p className="mb-0">{hideData ? '' : coverageAmount}</p>}</div>
          </div>
        </div>
      </div>

      <AuthoredContentHandler content={authoredLifeInsuranceBenefit.AdditionalLifeInsuranceDescription} />

      <Link
        linkPath={authoredLifeInsuranceBenefit.AdditionalLifeLinkPath}
        linkTitle={authoredLifeInsuranceBenefit.AdditionalLifeLinkTitle}
        linkName={authoredLifeInsuranceBenefit.AdditionalLifeLinkName}
      />
    </div>
  );
};

/**
 *
 * @returns Benefits section
 * Legal Benefits & Life Insurance
 * Endpoints : check all 6 endpoints are successful
 * Parse through authored json (Legal Benefits & Life Insurance)
 * Find Legal/life insurance Object from benefits array by it's property name BENEFIT_TYPE
 */
export const BenefitsSection = ({ legalBenefitContent, lifeInsuranceContent }) => {
  const { benefits, investments, render } = useFetchData();

  const [legalBenefitData, setLegalBenefitData] = useState(null);
  const [lifeInsuranceData, setLifeInsuranceData] = useState(null);
  const [authoredLegalBenefit, setAuthoredLegalBenefit] = useState(null);
  const [authoredLifeInsuranceBenefit, setAuthoredLifeInsuranceBenefit] = useState(null);

  useEffect(() => {
    if (legalBenefitContent) {
      setAuthoredLegalBenefit(JSON.parse(legalBenefitContent));
    }

    if (lifeInsuranceContent) {
      setAuthoredLifeInsuranceBenefit(JSON.parse(lifeInsuranceContent));
    }

    if (benefits) {
      setLegalBenefitData(benefits.data.find((plan) => plan.BENEFIT_TYPE === 'LEGAL'));
      setLifeInsuranceData(benefits.data.find((plan) => plan.BENEFIT_TYPE === 'SUPLIFE'));
    }
  }, [legalBenefitContent, lifeInsuranceContent, render, benefits]);

  return (
    <div className="col-12 row gx-7 m-0 mt-lg-10 mt-8">
      {legalBenefitContent && legalBenefitData && investments && (
        <VoluntaryLegalPlan
          authoredLegalBenefit={authoredLegalBenefit}
          legalBenefitData={legalBenefitData}
          halfSection={lifeInsuranceData}
          hideData={investments.hideData}
          render={render}
        />
      )}

      {lifeInsuranceContent && lifeInsuranceData && investments && lifeInsuranceData.EMPLOYEE_MONTHLY_COST > 0 && (
        <LifeInsurancePlan
          authoredLifeInsuranceBenefit={authoredLifeInsuranceBenefit}
          lifeInsuranceData={lifeInsuranceData}
          halfSection={legalBenefitData}
          hideData={investments.hideData}
          render={render}
        />
      )}
    </div>
  );
};

class BenefitsSectionClass extends HTMLElement {
  connectedCallback() {
    const root = createRoot(this);

    root.render(
      <Provider store={store}>
        <BenefitsSection
          legalBenefitContent={this.getAttribute('legal-benefit-content')}
          lifeInsuranceContent={this.getAttribute('life-insurance-content')}
        />
      </Provider>
    );
  }
}

registerCustomElement('total-rewards-fs-benefits', BenefitsSectionClass);
