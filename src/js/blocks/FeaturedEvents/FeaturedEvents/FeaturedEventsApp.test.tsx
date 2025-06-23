import { render } from "@testing-library/react";

import { FeaturedEvents } from "./FeaturedEventsApp";
import { mockEventsData } from "../utils";

describe('FeaturedEvents', () => {
    it('renders FeaturedEvents', () => {
        const { container } = render(<FeaturedEvents data={mockEventsData} />);
        expect(container).toBeInTheDocument();
    });
});