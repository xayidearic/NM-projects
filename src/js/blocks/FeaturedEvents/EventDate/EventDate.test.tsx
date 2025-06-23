import { render } from "@testing-library/react";
import EventDate from "./EventDate";
describe('EventDate', () => {
  it('renders EventDate', () => {
      const { container } = render(<EventDate startDateIso="2025-02-22T14:30:00Z" endDateIso="2025-02-22T14:30:00Z" modal={false} />);
      expect(container).toBeInTheDocument();
  });
});