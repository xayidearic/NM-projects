import CashBalanceBenefitResource from "./resources/financial-security/CashBalanceBenefitResource.jsx";
import HealthReimburstResource from './resources/health-care/HealthReimburstResource.jsx';
import IncentivePlanResource from "./resources/compensation/IncentivePlanResource.jsx";
import HealthSavingsResource from "./resources/health-care/HealthSavingsResource.jsx";
import Plan401kResource from "./resources/financial-security/Plan401kResource.jsx";
import FlexSpendingResource from './resources/health-care/FlexSpendingResource.jsx';
import LongTermIPResource from "./resources/compensation/LongTermIPResource.jsx";
import SalaryResource from "./resources/compensation/SalaryResource.jsx";
import FAPBenefitResource from "./resources/financial-security/FAPBenefitResource.jsx";
import DeferredCompensation from "./resources/financial-security/DeferredCompensation.jsx";
import DisabilityInsuranceResource from "./resources/financial-security/DisabilityInsuranceResource.jsx";
import LifeInsuranceResource from "./resources/financial-security/LifeInsuranceResource.jsx";

/**
 * Object used to retrieve the corresponding component based on the provided sectionType
 * Used in DynamicResourceSection.jsx
 */
const resourceSectionType = new Map([
    ['AS', SalaryResource],
    ['AIP', IncentivePlanResource],
    ['LTIP', LongTermIPResource],
    ['4KP', Plan401kResource],
    ['CBB', CashBalanceBenefitResource],
    ['FSA', FlexSpendingResource],
    ['HRA', HealthReimburstResource],
    ['HSA', HealthSavingsResource],
    ['4KP', Plan401kResource],
    ['CBB', CashBalanceBenefitResource],
    ['FAPB', FAPBenefitResource],
    ['DC', DeferredCompensation],
    ['DI', DisabilityInsuranceResource],
    ['LI', LifeInsuranceResource]
]);

export default resourceSectionType;