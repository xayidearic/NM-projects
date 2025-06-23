import { render } from "@testing-library/react";

import EventImage from "./EventImage";
import { event } from "../utils";

describe('EventImage', () => {
    it('renders Event Image', () => {
        const { getByAltText } = render(<EventImage event={event} isModalOpen={false} />);
        const imageElement = getByAltText("ERG Week (Feb. 17-24)");
        expect(imageElement).toBeInTheDocument();
        expect(imageElement).toHaveAttribute('src', '/contentassets/233fe2881c5447daab3300aca726c761/bhm_tile_2025_1920x1080.jpg');
    });
    
    it('renders default image when imageUrl is empty', () => {
        // const { getByText } = render(<EventImage event={eventWithOutImg} isModalOpen={false} />);
        const { getByText } = render(<EventImage event={{...event, imageUrl: ''}} isModalOpen={false} />);
        const dateElement = getByText(/27 - 28/i);
        expect(dateElement).toBeInTheDocument();
    });
});