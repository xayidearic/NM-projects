import { render } from "@testing-library/react";

import ProfileEmpContactLink from "./ProfileEmpContactLink";
describe('ProfileEmpContactLink', () => {
    const renderComponent = (label: string, value: string) =>
        render(<ProfileEmpContactLink label={label} value={value} />);

    it.each([
        { label: 'Work Phone', value: '123-456-7890', expectedHref: 'tel:123-456-7890' },
        { label: 'Work Email', value: 'xc@nm.com', expectedHref: 'mailto:xc@nm.com' },
        { label: 'Other', value: '/en/profile?lanId=BRE9539', expectedHref: '/en/profile?lanId=BRE9539' },
    ])('renders correct link for $label', ({ label, value, expectedHref }) => {
        const { getByText } = renderComponent(label, value);
        const linkElement = getByText(value);
        expect(linkElement).toHaveAttribute('href', expectedHref);
    });
});
