import Compensation from './Compensation';
import Development from './Development';
import Health from './Health';
import Security from './Security';
import TimeOff from './TimeOff';
import UserCircle from './UserCircle';
import WellBeing from './WellBeing';

/**
 * @param {Object} props - The props for this component
 * @param {string} props.section - The active graph section state
 * @param {function} props.setSection - The function to excute on click - updates section type
 * @param {function} props.setSlideNum - The function to excute on click - updates slide number
 * @returns {JSX.Element} Circle Graph
 */
const CircleGraph = ({ section, setSection, setSlideNum }) => {
    return (
        <div className="col-lg-6 mt-4 ps-lg-0">
            <svg className="dashboard__graph" viewBox="0 0 713 721" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                <defs>
                    <filter
                        id="user-circle-shadow"
                        x="148.578"
                        y="153.083"
                        width="401.363"
                        height="401.363"
                        filterUnits="userSpaceOnUse"
                        colorInterpolationFilters="sRGB"
                    >
                        <feFlood floodOpacity="0" result="BackgroundImageFix" />
                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                        <feOffset dy="3.9446" />
                        <feGaussianBlur stdDeviation="4.93075" />
                        <feComposite in2="hardAlpha" operator="out" />
                        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0" />
                        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_7869_150430" />
                        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_7869_150430" result="shape" />
                    </filter>
                </defs>
                <UserCircle />
                <Compensation currentSection={section} setSection={setSection} setSlideNum={setSlideNum} />
                <Development currentSection={section} setSection={setSection} setSlideNum={setSlideNum} />
                <Health currentSection={section} setSection={setSection} setSlideNum={setSlideNum} />
                <WellBeing currentSection={section} setSection={setSection} setSlideNum={setSlideNum} />
                <Security currentSection={section} setSection={setSection} setSlideNum={setSlideNum} />
                <TimeOff currentSection={section} setSection={setSection} setSlideNum={setSlideNum} />
            </svg>
        </div>
    );
}

export default CircleGraph;