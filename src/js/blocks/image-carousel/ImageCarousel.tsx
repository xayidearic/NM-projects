import { createRoot } from 'react-dom/client';
import { registerCustomElement } from '../../app/registerCustomElement';
import { useEffect, useRef, useState } from 'react';
import Swiper from 'swiper';
import Modal from './Modal';
import ImageCarouselArrows from './ImageCarouselArrows';
import useModal from '../../customHooks/useModal';

interface Image {
  imageUrl: string;
  imageAltText: string;
  imageCaption?: string;
}

interface BlockData {
  id: string;
  carouselImages: Image[];
  caption: string;
}

interface ImageCarouselProps {
  blockData: BlockData;
}


export const ImageCarousel = ({ blockData }: ImageCarouselProps) => {
  const {id, caption, carouselImages} = blockData;
  const swiperElRef = useRef<HTMLDivElement>(null);
  const swiperRef = useRef<Swiper |null>(null);
  const [isModalOpen, toggleModal] = useModal();
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  const openModal = (e: React.MouseEvent<HTMLImageElement>) => {
    setImageSrc(e.currentTarget.src);
    toggleModal();
  };

  useEffect(() => {
    if (!swiperRef.current) {
      swiperRef.current = new Swiper(swiperElRef.current!, {
        loop: true,
        pagination: {
          el: `.carousel__pagination--${id}`,
          clickable: true,
          renderBullet: (index, className) => {
            const { imageUrl, imageAltText } = carouselImages[index];
            const imageCaption = carouselImages[index].imageCaption || '';
            const thumbnailWithCaptions = `
              <span class="${className} carousel__thumbnails" data-index="${index}">
                <img class="d-block" src="${imageUrl}" alt="${imageAltText}" />
                <div class="carousel__captions position-absolute mt-3 mt-md-4">${caption ?? imageCaption}</div>
              </span>`;

            return thumbnailWithCaptions;
          },
        },
        navigation: {
          nextEl: `.carousel__next-button--${id}`,
          prevEl: `.carousel__prev-button--${id}`,
        },
        keyboard: {
          enabled: true,
          onlyInViewport: false,
        },
      });
    }
  }, [id, caption, carouselImages]);

  return (
    <div className="carousel justify-content-center align-items-center position-relative" data-lwsearch="@exclude">
      <div className="carousel__container swiper" ref={swiperElRef} slides-per-view="1">
        <div className="swiper-wrapper">
          {carouselImages.map((image: Image, index: number) => (
            <div className="d-flex swiper-slide" key={index}>
              <img className="d-block" src={image.imageUrl} alt={image.imageAltText} onClick={openModal} />
            </div>
          ))}
        </div>
      </div>
      <ImageCarouselArrows data={carouselImages} swiperRef={swiperRef} />
      <div className={`carousel__pagination--${id} carousel__pagination position-relative mt-3 mt-md-4`}></div>
      <Modal isModalOpen={isModalOpen} toggleModal={toggleModal} imgSrc={imageSrc} />
    </div>
  );
};


class ImageCarouselClass extends HTMLElement {
  connectedCallback() {
    const root = createRoot(this);
    const blockData = JSON.parse(this.getAttribute('block-data') || '{}');
    root.render(<ImageCarousel blockData={blockData} />);
  }
}

registerCustomElement('dc-image-carousel-block', ImageCarouselClass);
