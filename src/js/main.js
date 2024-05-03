import { register } from 'swiper/element/bundle';
// register Swiper custom elements

import 'bootstrap';
import 'vanillajs-datepicker';

// Added for HTML Sanitization
import DOMPurify from 'dompurify';

import './app/bravoIntegrationBlock';
import './app/eventFunctions';
import './app/heapUserElement';
import './app/helpers';
import './app/swiper';
import './dates/datePicker';
import './app/service-error/newsBlock/ServiceError.jsx';
import './app/service-error/tdtkBlock/ServiceError.jsx';
import './app/service-error/eventsBlock/ServiceError.jsx';
import './blocks/image-carousel/ImageCarousel.jsx';
import './blocks/PersonalizationBanner.jsx';
import './blocks/EmergencyBlock.jsx';
/**Total Rewards */
import './total-rewards/compensation/CompensationTableSection.jsx';
import './total-rewards/compensation/CompBlurToggle.jsx';
import './total-rewards/compensation/CompensationBarChart.jsx';
import './total-rewards/compensation/CompServiceStatus.jsx';
import './total-rewards/Header.jsx';
import './total-rewards/TRInnerPageNav.jsx';
import './total-rewards/resources/DynamicResourceSection.jsx';
import './total-rewards/financial-security/BenefitsSection.jsx';
import './total-rewards/financial-security/FSBlurToggle.jsx';
import './total-rewards/financial-security/FSServiceStatus.jsx';
import './total-rewards/financial-security/RetirementProjections.jsx';
import './total-rewards/healthcare/HCServiceStatus.jsx';
import './total-rewards/healthcare/HealthPlanCardList/HealthPlanCardList.jsx';
import './total-rewards/healthcare/HealthBlurToggle.jsx';
import './total-rewards/dashboard/DashboardGraphSection.jsx';
import './total-rewards/dashboard/DashboardServiceStatusBanner.jsx';

import { CookieManager } from './app/cookieManager';
import { registerCustomElement } from './app/registerCustomElement';
import Drag from './myApps/drag'; // Added element dragging for myapps

import '../scss/main.scss';

register();
Drag.init();

globalThis.DOMPurify = DOMPurify;
globalThis.registerCustomElement = registerCustomElement;

/**
 *
 * @param {(id: unknown) => void & {keys: () => (unknown[])}} context
 */
export function importAll(context) {
  context.keys().forEach((id) => context(id));
}

CookieManager.initializeStore();
