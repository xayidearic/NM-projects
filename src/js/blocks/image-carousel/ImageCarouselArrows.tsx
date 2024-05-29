import { RefObject } from 'react';
import Swiper from 'swiper';

interface Image {
  imageUrl: string;
  imageAltText: string;
  imageCaption?: string;
  imageID: string;
}

interface ImageCarouselArrowsProps {
  data: {
    id: number;
    carouselImages: Image[];
  };
  swiperRef: RefObject<Swiper>;
}

const PrevArrow = ({ swiperRef, data }: ImageCarouselArrowsProps): JSX.Element => {
  const prevSlide = (e: React.KeyboardEvent<HTMLElement>) => e.key === 'Enter' && swiperRef.current?.slidePrev();

  return (
    <>
      <div
        className={`carousel__prev-button--${data.id} carousel__prev-button carousel__arrows`}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => prevSlide(e)}
      >
        <img src="/Content/Images/icons/image-carousel/prev-arrow.svg" alt="Previous Arrow" />
      </div>
    </>
  );
};

const NextArrow = ({ swiperRef, data }: ImageCarouselArrowsProps): JSX.Element => {
  const nextSlide = (e: React.KeyboardEvent<HTMLElement>) => e.key === 'Enter' && swiperRef.current?.slideNext();

  return (
    <>
      <div
        className={`carousel__next-button--${data.id} carousel__next-button carousel__arrows`}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => nextSlide(e)}
        data-testid="next-arrow"
      >
        <img src="/Content/Images/icons/image-carousel/next-arrow.svg" alt="Next Arrow" />
      </div>
    </>
  );
};

const ImageCarouselArrows = ({ data, swiperRef }: ImageCarouselArrowsProps): JSX.Element => {
  if (data.carouselImages.length === 1) return <></>;

  return (
    <>
      <PrevArrow swiperRef={swiperRef} data={data} />
      <NextArrow swiperRef={swiperRef} data={data} />
    </>
  );
};

export default ImageCarouselArrows;
