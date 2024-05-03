/**
 * @type {function} PrevArrow - Function to slide to the previous image in the carousel
 * @param {object} swiperRef - swiperRef object
 * @returns {JSX.Element} - Returns the previous arrow button
 */
const PrevArrow = ({ swiperRef, data }) => {
  const prevSlide = (event) => event.keyCode === 13 && swiperRef.current.slidePrev();

  return (
    <>
      <div className={`carousel__prev-button--${data.id} carousel__prev-button carousel__arrows`} onKeyDown={prevSlide}>
        <svg viewBox="0 0 50 51" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M0 0.5L47.561 0.5C48.908 0.5 50 1.59199 50 2.93902L50 48.061C50 49.408 48.908 50.5 47.561 50.5L0 50.5L0 0.5Z"
            fill="black"
            fillOpacity="0.75"
          />
          <mask id="mask0_1660_7251" style={{ maskType: 'alpha' }} maskUnits="userSpaceOnUse" x="17" y="13" width="15" height="26">
            <path d="M20.9126 26.1396L31.846 15.2605L30.3772 13.7834L17.9668 26.1334L30.4126 38.6396L31.8897 37.1709L20.9126 26.1396Z" fill="white" />
          </mask>
          <g mask="url(#mask0_1660_7251)">
            <path d="M20.9126 26.1396L31.846 15.2605L30.3772 13.7834L17.9668 26.1334L30.4126 38.6396L31.8897 37.1709L20.9126 26.1396Z" fill="white" />
            <path d="M-0.783205 1.13965L-0.783203 51.1396L49.2168 51.1396L49.2168 1.13965L-0.783205 1.13965Z" fill="white" />
            <path d="M-0.783205 1.13965L-0.783203 51.1396L49.2168 51.1396L49.2168 1.13965L-0.783205 1.13965Z" fill="white" />
          </g>
        </svg>
      </div>
    </>
  );
};

/**
 * @type {function} NextArrow - Function to slide to the next image in the carousel
 * @param {object} swiperRef - swiperRef object
 * @returns {JSX.Element} - Returns the next arrow button
 */

const NextArrow = ({ swiperRef, data }) => {
  const nextSlide = (event) => event.keyCode === 13 && swiperRef.current.slideNext();

  return (
    <>
      <div className={`carousel__next-button--${data.id} carousel__next-button carousel__arrows`} onKeyDown={nextSlide}>
        <svg viewBox="0 0 50 51" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M50 50.5L2.43903 50.5C1.09199 50.5 9.54647e-08 49.408 2.13226e-07 48.061L4.15791e-06 2.93902C4.27567e-06 1.59198 1.09199 0.499996 2.43903 0.499996L50 0.5L50 50.5Z"
            fill="black"
            fillOpacity="0.75"
          />
          <mask id="mask0_1660_7249" style={{ maskType: 'alpha' }} maskUnits="userSpaceOnUse" x="18" y="12" width="15" height="26">
            <path d="M29.0893 24.8605L18.156 35.7396L19.6247 37.2167L32.0352 24.8667L19.5893 12.3605L18.1122 13.8292L29.0893 24.8605Z" fill="white" />
          </mask>
          <g mask="url(#mask0_1660_7249)">
            <path d="M29.0893 24.8605L18.156 35.7396L19.6247 37.2167L32.0352 24.8667L19.5893 12.3605L18.1122 13.8292L29.0893 24.8605Z" fill="white" />
            <path d="M50.7852 49.8605L50.7852 -0.139526L0.785149 -0.139529L0.785146 49.8605L50.7852 49.8605Z" fill="white" />
            <path d="M50.7852 49.8605L50.7852 -0.139526L0.785149 -0.139529L0.785146 49.8605L50.7852 49.8605Z" fill="white" />
          </g>
        </svg>
      </div>
    </>
  );
};

/**
 * @type {function} ImageCarouselArrows - Function to display the previous and next arrow buttons
 * @param {object} data - The data object
 * @param {object} swiperRef - swiperRef object
 * @returns {JSX.Element} - Returns the previous and next arrow buttons
 * @returns {null} - Returns null if there is only one image in the carousel
 */
const ImageCarouselArrows = ({ data, swiperRef }) => {
  if (data.carouselImages.length === 1) return null;

  return (
    <>
      <PrevArrow swiperRef={swiperRef} data={data} />
      <NextArrow swiperRef={swiperRef} data={data} />
    </>
  );
};

export default ImageCarouselArrows;
