import { render } from "@testing-library/react";

import EventCTA from "./EventCTA";
import { event } from "../utils";

describe('EventCTA', () => {
    it('renders EventCTA', () => {
        const { getByText } = render(<EventCTA event={event} />);
            
        const ctaElement = getByText(/Link Name/i);
        expect(ctaElement).toBeInTheDocument();
        expect(ctaElement).toHaveAttribute('href', '/en/news-events/2023/november/111023_fridayphoto/');
        expect(ctaElement).toHaveAttribute('target', '_self');
        expect(ctaElement).toHaveAttribute('title', 'Title');
    });
    
    it(' doesnt render EventCTA', () => {
        const { container } = render(<EventCTA event={{...event, ctaText: ''}} />);
        expect(container).toBeEmptyDOMElement();
    });
});