import { createRoot } from 'react-dom/client';
import { registerCustomElement } from '../app/registerCustomElement';

export const Header = ({ headerTitle, headerIcon }) => {
  return (
    <div className="total-rewards__header d-flex align-items-center">
      <img src={headerIcon} alt={headerTitle} />
      <h1 className="color-primary mt-0 mb-0 ms-4 d-lg-none">{headerTitle}</h1>
    </div>
  );
};

class HeaderClass extends HTMLElement {
  connectedCallback() {
    const root = createRoot(this);
    root.render(<Header headerTitle={this.getAttribute('header-title')} headerIcon={this.getAttribute('header-icon')} />);
  }
}

registerCustomElement('total-rewards-header', HeaderClass);
