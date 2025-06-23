import { render } from "@testing-library/react";

import EventTime from "./EventTime";
describe('EventTime', () => {
    it('renders EventTime', () => {
        const { container } = render(<EventTime startDate="2025-02-22T14:30:00Z" endDate="2025-02-22T14:30:00Z" modal={false} />);
        expect(container).toBeInTheDocument();
    });

    it('renders EventTime with modal', () => {
        const { container } = render(<EventTime startDate="2025-02-22T14:30:00Z" endDate="2025-02-22T14:30:00Z" modal={true} />);
        expect(container).toBeInTheDocument();
    });
});