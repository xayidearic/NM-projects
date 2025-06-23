import { render } from "@testing-library/react";
import EventTitle from "./EventTitle";
import { event } from "../utils";

describe('EventTitle', () => {
    it('renders Event Title', () => {
        const { getByText } = render(<EventTitle event={event} />);
        const titleElement = getByText("ERG Week (Feb. 17-24)");
        expect(titleElement).toBeInTheDocument();
    });
});