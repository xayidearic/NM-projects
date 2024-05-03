import sections from './constants/graphSections';

/**
 * @param {string | number} index - Active pagination bullet index
 * @returns Active graph category based on the active pagination bullet
 */
export const getActiveSlideIndex = (index) => {
  const activeSlide = parseInt(index);

  switch (activeSlide) {
    case 0:
      return sections.comp;
    case 1:
      return sections.security;
    case 2:
      return sections.health;
    case 3:
      return sections.wellBeing;
    case 4:
      return sections.timeOff;
    case 5:
      return sections.develop;
  }
};

export default getActiveSlideIndex;
