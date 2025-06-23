import { render } from "@testing-library/react";

import EventMode from "./EventMode";

describe('EventMode', () => {
    it('renders Event Mode', () => {
        const { getByText } = render(<EventMode eventMode={'In Person'} modal={false} icon={'map'} />);
        const modeElement = getByText("In Person");
        expect(modeElement).toBeInTheDocument();
    });

    it('renders Online Event Mode', () => {
        const { getByText } = render(<EventMode eventMode={'Online'} modal={false} icon={'map'} />);
        const modeElement = getByText("Online");
        expect(modeElement).toBeInTheDocument();
    });
});