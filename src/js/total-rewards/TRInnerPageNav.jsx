import { createRoot } from "react-dom/client";
import { useState, useEffect, useRef } from 'react';
import { registerCustomElement } from "../app/registerCustomElement";
import sections from "./constants/graphSections";

/**
 * Renders inner page navigation.
 * Only for items that are part of the sections object.
 * @param {Object} props - The component props.
 * @param {string} props.navData - The navigation data in JSON format.
 * @returns {JSX.Element} - The rendered component.
 */
export const InnerPageNav = ({ navData }) => {
    const nav = JSON.parse(navData);

    const [isNavbarOpen, setIsNavbarOpen] = useState(false);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const navbarRef = useRef(null);
    const navbarItemsRef = useRef([]);

    const handlePageClick = (event) => {
        if (navbarRef.current && !navbarRef.current.contains(event.target)) {
            if (!navbarItemsRef.current.some((item) => item === document.activeElement)) {
                setIsNavbarOpen(false);
            }
        }
    };

    const handleKeyDown = event => {
        if (navbarRef.current && event.key === 'Tab' && !navbarRef.current.contains(event.target)) {
            setIsNavbarOpen(false);
        }
    };

    const handleResize = () => {
        setWindowWidth(window.innerWidth);
    };

    useEffect(() => {
        window.addEventListener('resize', handleResize); // Add resize event listener
        document.addEventListener('mousedown', handlePageClick);
        document.addEventListener('keydown', handleKeyDown);

        // Set initial window width
        setWindowWidth(window.innerWidth);

        return () => {
            document.removeEventListener('mousedown', handlePageClick);
            document.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const toggleNavbar = () => {
        setIsNavbarOpen(!isNavbarOpen);
    };

    const handleNavbarItemClick = index => {
        navbarItemsRef.current[index].focus();
    };

    const handleNavbarItemBlur = event => {
        const isAnyNavbarItemFocused = navbarItemsRef.current.some((item) => item === event.relatedTarget);
        if (!isAnyNavbarItemFocused) {
            setIsNavbarOpen(false);
        }
    };

    return (
        <div className="tr-navbar col-12 mt-4 mt-lg-0 pt-lg-6 pb-lg-4" ref={navbarRef}>
            <nav className="tr-navbar__list navbar navbar-expand-lg navbar-light col-lg-10 m-auto">
                <button
                    className="navbar-toggler d-flex align-items-center nav-link justify-content-between d-lg-none"
                    type="button"
                    onClick={toggleNavbar}
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded={isNavbarOpen ? 'true' : 'false'}
                    aria-label="Toggle navigation"
                >
                    <div className="p1">Navigation</div>
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className={`collapse navbar-collapse ${isNavbarOpen ? 'show' : ''}`} id="navbarNav">
                    <ul className="navbar-nav col-12 d-flex justify-content-around align-items-lg-center"
                        role="menubar">
                        {nav.map((link, index) => {
                            if (Object.values(sections).includes(link.Id)) {
                                return (
                                    <li className="nav-item"
                                        key={index}
                                        role="none">
                                        <a className="nav-link d-flex align-items-center"
                                            href={link.Url}
                                            target={link.IsExternal ? '_blank' : '_self'}
                                            role="menuitem"
                                            onClick={() => handleNavbarItemClick(index)}
                                            ref={(element) => (navbarItemsRef.current[index] = element)}
                                            onBlur={handleNavbarItemBlur}
                                            tabIndex={isNavbarOpen || windowWidth > '1024' ? '0' : '-1'}
                                        >
                                            <div className={`${link.Id}-icon nav-link-icon me-2`}></div>
                                            <div>{link.Text}</div>
                                        </a>
                                    </li>
                                );
                            }
                            return null;
                        })}
                    </ul>
                </div>
            </nav>
        </div>
    )
}

class TRInnerPageNav extends HTMLElement {
    #rootClasses = [
        'sticky-navbar',
    ];

    connectedCallback() {
        const root = createRoot(this);

        this.classList.add(...this.#rootClasses);

        root.render(
            <InnerPageNav navData={this.getAttribute('nav-data')} />
        )
    }
}

registerCustomElement('total-rewards-inner-page-nav', TRInnerPageNav);