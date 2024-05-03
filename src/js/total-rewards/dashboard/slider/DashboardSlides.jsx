import { useEffect, useRef } from 'react';
import { Swiper } from 'swiper';

import getActiveSlideIndex from '../../getActiveSlideIndex';
import { NextArrow, PrevArrow } from './SlideNavArrows';
import SlideContent from './SlideContent';

/** @typedef {import('./SlideContent').SlideContentModel} SlideContentModel */

/**
 * @param {Object} props - The props for this component
 * @param {string} props.section - The active graph section state
 * @param {function} props.setSection - The function to execute on click - updates section type
 * @param {function} props.setSlideNum - The function to execute on click - updates slide number
 * @param {SlideContentModel[]} props.slideAuthoredContent - Authored JSON
 * @returns {JSX.Element} Slide section witn authored content
 */
const DashboardSlides = ({ section, setSection, slideNum, setSlideNum, slideAuthoredContent, blurSlide, setBlurSlide }) => {
  const content = slideAuthoredContent.find((category) => category.sectionId === section) ?? {};
  /** @type {React.MutableRefObject<HTMLElement | null>} */
  const swiperElRef = useRef(null);
  /** @type {React.MutableRefObject<Swiper | null>} */
  const swiperRef = useRef(null);

  // activates section on graph
  const handleClick = (event) => {
    const index = event.target.getAttribute('data-index');
    setSection(getActiveSlideIndex(index));
  };

  // Swiper configuration options
  useEffect(() => {
    if (!swiperRef.current) {
      swiperRef.current = new Swiper(swiperElRef.current, {
        loop: true,
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
          renderBullet: (index, className) => `<span class="${className}" data-index="${index}"></span>`,
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        keyboard: {
          enabled: true,
          onlyInViewport: false,
        },
      });
    }
  }, []);

  useEffect(() => {
    swiperRef.current.on('slideChange', () => {
      const activePagination = document.querySelector('.swiper-pagination-bullet-active');
      const index = activePagination?.getAttribute('data-index');

      setSection(getActiveSlideIndex(index));
    });

    swiperRef.current.slideToLoop(slideNum);
    swiperRef.current.update();
  }, [setSection, slideNum]);

  return (
    <div className="col-lg-6 mt-9 mt-lg-0">
      <div className="dashboard__slide col-12 position-relative">
        <div className="dashboard__slide-content swiper" ref={swiperElRef} slides-per-view="1">
          <div className="swiper-wrapper">
            {slideAuthoredContent.map((val) => {
              return <SlideContent content={content} key={val.sectionId} blurSlide={blurSlide} setBlurSlide={setBlurSlide} />;
            })}
          </div>
        </div>

        <PrevArrow slideNum={slideNum} setSlideNum={setSlideNum} />
        <NextArrow slideNum={slideNum} setSlideNum={setSlideNum} />

        <div className="dashboard__slide-pagination swiper-pagination mt-8" onClick={handleClick} onKeyDown={handleClick}></div>
      </div>
    </div>
  );
};

export default DashboardSlides;
