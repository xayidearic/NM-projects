import '@testing-library/jest-dom';
import { act, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { ImageCarousel } from './ImageCarousel';

const blockDataObj = {
  id: 120945,
  caption: '',
  isSearchable: true,
  carouselImages: [
    {
      imageAltText: 'Image 1',
      imageCaption: '',
      imageUrl: '/globalassets/topic/workplace-and-project-solutions/images/group-tour-abstract-painting.jpg',
      imageID: '63498',
    },
    {
      imageAltText: 'Image 2',
      imageCaption: '',
      imageUrl: '/globalassets/topic/workplace-and-project-solutions/images/intern-tour.jpg',
      imageID: '63499',
    },
    {
      imageAltText: 'Image 3',
      imageCaption: '',
      imageUrl: '/globalassets/topic/workplace-and-project-solutions/images/gardentour_tree.jpg',
      imageID: '63497',
    },
    {
      imageAltText: 'Image 4',
      imageCaption: '',
      imageUrl: '/globalassets/topic/dc-content-authoring-guide/images/aapihm_ee-spotlights_2.jpg',
      imageID: '112329',
    },
    {
      imageAltText: 'Image 5',
      imageCaption: '',
      imageUrl: '/globalassets/topic/dc-content-authoring-guide/images/875x492.jpg',
      imageID: '112330',
    },
  ],
};

describe('ImageCarousel', () => {

  it('renders without crashing', () => {
    const { baseElement } = render(<ImageCarousel blockData={blockDataObj} />);
    expect(baseElement).toBeInTheDocument();
  });

  it('doesnt render the ImageCarousel if there are no images', async () => {
    const { baseElement } = render(<ImageCarousel blockData={{ ...blockDataObj, carouselImages: [] }} />);
    const container = baseElement.querySelector('.carousel');
    expect(container).not.toBeInTheDocument();
  });

  it('renders the ImageCarousel with the correct number of images', async () => {
    const { getAllByTestId } = render(<ImageCarousel blockData={blockDataObj} />);
    const images = getAllByTestId('image');
    expect(images).toHaveLength(5);
  });

  it('clicking on an image opens the modal', async () => {
    const { getAllByTestId, getByTestId } = render(<ImageCarousel blockData={blockDataObj} />);
    const image = getAllByTestId('image');
    act(() => {
      image[0].click();
    });

    const modal = getByTestId('modal');
    expect(modal).toBeInTheDocument();
  });

  it('clicking on the close button closes the modal', async () => {
    const { getAllByTestId, getByAltText } = render(<ImageCarousel blockData={blockDataObj} />);
    const image = getAllByTestId('image');
    act(() => {
      image[0].click();
    });

    const closeBtn = getByAltText('close modal');
    act(() => {
      closeBtn.click();
    });

    expect(closeBtn).not.toBeInTheDocument();
  });

  it('clicking on the next arrow changes the image', async () => {
    const { getByTestId } = render(<ImageCarousel blockData={blockDataObj} />);

    const nextBtn = getByTestId('next-arrow');
    act(() => {
      nextBtn.click();
    });

    const img = screen.getByAltText('Image 2');
    expect(img).toBeInTheDocument();
  });
});
