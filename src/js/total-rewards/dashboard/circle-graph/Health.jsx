import { useState } from 'react';

import sections from '../../constants/graphSections';

const healthFill = {
  unSelected: '#EDF0F3',
  selected: '#FFB81C',
};

/**
 * @param {Object} props - The props for this component
 * @param {string} props.currentSection - The active graph section state
 * @param {function} props.setSection - The function to excute on click - updates section type
 * @param {function} props.setSlideNum - The function to excute on click - updates slide number
 * @returns {JSX.Element} SVG section of graph for Health category
 */
const Health = ({ currentSection, setSection, setSlideNum }) => {
  const [isHover, setIsHover] = useState(false);
  const isHealth = currentSection === sections.health;
  const fill = isHealth ? healthFill.selected : healthFill.unSelected;

  /*Triggers state setters*/
  const handleClick = () => {
    setSection(sections.health);
    setSlideNum(2);
  }

  return (
    <g className="section" name="health">
      <g id="health-section">
        <mask id="health-section-mask" fill="white">
          <path d="M356.576 651.751C405.92 650.521 454.212 637.225 497.232 613.025C540.252 588.825 576.691 554.458 603.365 512.926L539.784 472.092C519.779 503.241 492.45 529.016 460.185 547.166C427.92 565.316 391.701 575.288 354.693 576.211L356.576 651.751Z" />
        </mask>
        <path
          d="M356.576 651.751C405.92 650.521 454.212 637.225 497.232 613.025C540.252 588.825 576.691 554.458 603.365 512.926L539.784 472.092C519.779 503.241 492.45 529.016 460.185 547.166C427.92 565.316 391.701 575.288 354.693 576.211L356.576 651.751Z"
          fill={fill}
          stroke="white"
          strokeWidth={`${isHealth ? '0' : '8'}`}
          mask="url(#health-section-mask)"
        />
      </g>

      <symbol id="health-icon">
        <ellipse opacity="0.15" cx="511.819" cy="604.078" rx="40" ry="40" fill="#FFB81C" />
        <ellipse opacity="0.05" cx="511.819" cy="604.078" rx="40" ry="40" fill="#FFB81C" />
        <path
          d="M549.847 604.078C549.847 625.08 532.821 642.105 511.819 642.105C490.817 642.105 473.791 625.08 473.791 604.078C473.791 583.076 490.817 566.05 511.819 566.05C532.821 566.05 549.847 583.076 549.847 604.078Z"
          fill="#FFB81C"
          stroke="white"
          strokeWidth={isHover ? '1' : '3.9446'}
        />
        <mask id="health-icon-mask" style={{ maskType: 'alpha' }} maskUnits="userSpaceOnUse" x="494" y="590" width="35" height="28">
          <path
            d="M494.969 594.509H506.922V590.478H516.666V594.509H528.619V617.046H494.969V594.509ZM514.889 592.269H508.698V594.509H514.889V592.269ZM522.677 615.254H526.842V596.301H522.677V615.254ZM502.716 615.254H520.9V596.301H502.716V615.254ZM496.747 596.301V615.254H500.939V596.301H496.747ZM510.815 600.936V604.341H507.453V606.132H510.815V609.539H512.591V606.132H515.955V604.341H512.591V600.936H510.815Z"
            fill="white"
          />
        </mask>
        <g mask="url(#health-icon-mask)">
          <path
            d="M494.969 594.509H506.922V590.478H516.666V594.509H528.619V617.046H494.969V594.509ZM514.889 592.269H508.698V594.509H514.889V592.269ZM522.677 615.254H526.842V596.301H522.677V615.254ZM502.716 615.254H520.9V596.301H502.716V615.254ZM496.747 596.301V615.254H500.939V596.301H496.747ZM510.815 600.936V604.341H507.453V606.132H510.815V609.539H512.591V606.132H515.955V604.341H512.591V600.936H510.815Z"
            fill="white"
          />
          <path d="M491.305 581.519H533.949V624.522H491.305V581.519Z" fill="white" />
          <path d="M491.305 581.519H533.949V624.522H491.305V581.519Z" fill="white" />
        </g>
      </symbol>

      <ellipse
        className={`${isHealth && 'iconSelected iconAnimate'} iconButton iconHealth`}
        name="iconAnimte"
        cx="511.819"
        cy="604.078"
        rx="40"
        ry="40"
      />

      <use
        className={`${isHealth && 'iconSelected'} iconButton iconHealth`}
        href="#health-icon"
        onClick={() => handleClick()}
        onMouseOver={() => setIsHover(true)}
        onMouseOut={() => setIsHover(false)}
      />

      {/* Toolip HTML */}
      {!isHealth &&
        <foreignObject
          className={`${isHover && 'show'} iconButton toolTip`}
          x="442"
          y="509"
          width="140"
          height="45"
          onClick={() => handleClick()}
          onMouseOver={() => setIsHover(true)}
          onMouseOut={() => setIsHover(false)}
        >
          <div className="toolTipBody">My Healthcare</div>
        </foreignObject>
      }
    </g>
  );
}

export default Health;