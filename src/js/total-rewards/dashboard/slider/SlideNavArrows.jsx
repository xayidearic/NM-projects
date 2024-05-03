import { useState } from 'react';

/**
 * @param {Object} props - The props for this component
 * @param {number} props.slideNum - The active slide number state
 * @param {function} props.setSlideNum - The function to excute on click - updates Slide number
 * @returns {JSX.Element} Right Arrow with animations (click,hover & mouse out)
 * Click updates graph active section
 */
export const NextArrow = ({ slideNum, setSlideNum }) => {
  const [isHover, setIsHover] = useState(false);

  const nextSlide = () => {
    /**if not the last slide - activate next pagination bullet span & updates states */
    if (slideNum !== 5) {
      const nextIndex = slideNum + 1;

      setSlideNum(nextIndex);

      return;
    }

    setSlideNum(0);
  };

  return (
    <div className="swiper-arrows">
      <svg
        width="85"
        height="85"
        viewBox="0 0 85 85"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        onClick={() => nextSlide()}
        onMouseOver={() => setIsHover(true)}
        onMouseOut={() => setIsHover(false)}
        className="swiper-button-next arrows"
      >
        <g filter="url(#filter0_d_7869_148815)">
          <rect x="10.561" y="6.1416" width="64" height="64" rx="32" className={isHover ? 'blueFill' : 'whiteFill'} />
          <mask id="mask0_7869_148815">
            <path d="M34.617 52.0669L36.497 53.9576L52.3824 38.1496L36.4517 22.1416L34.561 24.0216L48.6117 38.1416L34.617 52.0669Z" fill="white" />
          </mask>
          <g mask="url(#mask0_7869_148815)">
            <path d="M34.617 52.0669L36.497 53.9576L52.3824 38.1496L36.4517 22.1416L34.561 24.0216L48.6117 38.1416L34.617 52.0669Z" fill="#1570BC" />
            <path d="M74.561 6.1416H10.561V70.1416H74.561V6.1416Z" className={isHover ? 'whiteFill' : 'blueFill'} />
            <path d="M74.561 6.1416H10.561V70.1416H74.561V6.1416Z" className={isHover ? 'whiteFill' : 'blueFill'} />
          </g>
        </g>
        <defs>
          <filter
            id="filter0_d_7869_148815"
            x="0.561035"
            y="0.141602"
            width="84"
            height="84"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
            <feOffset dy="4" />
            <feGaussianBlur stdDeviation="5" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0" />
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_7869_148815" />
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_7869_148815" result="shape" />
          </filter>
        </defs>
      </svg>
    </div>
  );
};

/**
 * @param {Object} props - The props for this component
 * @param {number} props.slideNum - The active slide number state
 * @param {function} props.setSlideNum - The function to excute on click - updates Slide number
 * @returns {JSX.Element} Left Arrow with animations (click,hover & mouse out)
 * Click updates graph active section
 */
export const PrevArrow = ({ slideNum, setSlideNum }) => {
  const [isHover, setIsHover] = useState(false);

  const prevSlide = () => {
    /**if not the 1st slide - activate prev pagination bullet span & updates states */
    if (slideNum !== 0) {
      const prevIndex = slideNum - 1;

      setSlideNum(prevIndex);

      return;
    }

    setSlideNum(5);
  };

  return (
    <div className="swiper-arrows">
      <svg
        width="85"
        height="85"
        viewBox="0 0 85 85"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        onClick={() => prevSlide()}
        onMouseOver={() => setIsHover(true)}
        onMouseOut={() => setIsHover(false)}
        className="swiper-button-prev arrows"
      >
        <g filter="url(#prevArrow)">
          <rect x="10.561" y="6.1416" width="64" height="64" rx="32" className={isHover ? 'blueFill' : 'whiteFill'} />
          <mask id="mask0_7869_150643">
            <path
              d="M37.3293 38.9604L51.3239 25.0351L49.4439 23.1444L33.5586 38.9524L49.4893 54.9604L51.3799 53.0804L37.3293 38.9604Z"
              fill="white"
            />
          </mask>
          <g mask="url(#mask0_7869_150643)">
            <path
              d="M37.3293 38.9604L51.3239 25.0351L49.4439 23.1444L33.5586 38.9524L49.4893 54.9604L51.3799 53.0804L37.3293 38.9604Z"
              fill="#1570BC"
            />
            <path
              d="M9.55859 6.96045L9.55859 70.9604L73.5586 70.9604L73.5586 6.96045L9.55859 6.96045Z"
              className={isHover ? 'whiteFill' : 'blueFill'}
            />
            <path
              d="M9.55859 6.96045L9.55859 70.9604L73.5586 70.9604L73.5586 6.96045L9.55859 6.96045Z"
              className={isHover ? 'whiteFill' : 'blueFill'}
            />
          </g>
        </g>
        <defs>
          <filter id="prevArrow" x="0.561035" y="0.141602" width="84" height="84" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
            <feOffset dy="4" />
            <feGaussianBlur stdDeviation="5" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0" />
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_7869_150643" />
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_7869_150643" result="shape" />
          </filter>
        </defs>
      </svg>
    </div>
  );
};
