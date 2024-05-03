import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import { registerCustomElement } from '../../app/registerCustomElement.js';
import resourceSectionType from '../resourceSectionType.js';
import store from '../../store.js';

/**
 * @typedef ResourceLink
 *
 * @property {{ Target: string; Text: string; Title: string; }} CurrentLink
 * @property {string} IconUrl
 * @property {string} Uri
 */

/**
 * @typedef SectionContent
 *
 * @property {boolean} HasResources
 * @property {ResourceLink[]} ResourceLinks
 * @property {string} SectionBody
 * @property {string} Title
 */

/**
 * Resource section component that dynamically renders the correct component based on the section type
 * @param {{ sectionType: string; sectionContent: string; }} props
 */
export const DynamicResourceSection = ({ sectionType, sectionContent }) => {
  const Section = resourceSectionType.get(sectionType);
  const decodedJsonString = sectionContent.replace(/\\(.)/gm, '$1');
  /** @type {SectionContent} */
  const jsonData = JSON.parse(decodedJsonString);

  return (
    <>
      <Section sectionContent={jsonData} />
    </>
  );
};

class ResourceClass extends HTMLElement {
  connectedCallback() {
    const root = createRoot(this);

    root.render(
      <Provider store={store}>
        <DynamicResourceSection sectionType={this.getAttribute('section-type')} sectionContent={this.getAttribute('section-content')} />
      </Provider>
    );
  }
}

/** Registers class to define it as a handler for specific element */
registerCustomElement('total-rewards-resources', ResourceClass);
