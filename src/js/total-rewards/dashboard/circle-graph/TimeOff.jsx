import { useState } from 'react';

import sections from '../../constants/graphSections';

const TimeFill = {
  unSelected: '#EDF0F3',
  selected: '#F36F35',
};

/**
 * @param {Object} props - The props for this component
 * @param {string} props.currentSection - The active graph section state
 * @param {function} props.setSection - The function to excute on click - updates section type
 * @param {function} props.setSlideNum - The function to excute on click - updates slide number
 * @returns {JSX.Element} SVG section of graph for TimeOff category
 */
const TimeOff = ({ currentSection, setSection, setSlideNum }) => {
  const [isHover, setIsHover] = useState(false);
  const isTime = currentSection === sections.timeOff;
  const fill = isTime ? TimeFill.selected : TimeFill.unSelected;

  /*Triggers state setters*/
  const handleClick = () => {
    setSection(sections.timeOff);
    setSlideNum(4);
  }

  return (
    <g className="section" name="time-off">
      <path
        name="time-off-section"
        d="M707.325 295.874C721.317 377.527 706.394 461.502 665.127 533.335C623.861 605.168 558.835 660.36 481.25 689.404L476.258 676.068C550.739 648.186 613.164 595.201 652.78 526.242C692.396 457.282 706.722 376.665 693.29 298.279L707.325 295.874Z"
        fill={fill}
      />

      <symbol id="timeOff-icon">
        <ellipse opacity="0.15" cx="672.561" cy="507.435" rx="40" ry="40" fill="#F36F35" />
        <ellipse opacity="0.05" cx="672.561" cy="507.435" rx="40" ry="40" fill="#F36F35" />
        <path
          d="M710.589 507.435C710.589 528.437 693.563 545.463 672.561 545.463C651.559 545.463 634.533 528.437 634.533 507.435C634.533 486.433 651.559 469.407 672.561 469.407C693.563 469.407 710.589 486.433 710.589 507.435Z"
          fill="#F36F35"
          stroke="white"
          strokeWidth={isHover ? '1' : '3.9446'}
        />
        <mask id="time-off-icon-mask" style={{ maskType: 'alpha' }} maskUnits="userSpaceOnUse" x="654" y="490" width="39" height="35">
          <path
            d="M673.332 494.357C681.848 494.357 688.752 501.209 688.752 509.661C688.752 518.114 681.848 524.966 673.332 524.966C664.817 524.966 657.913 518.114 657.913 509.661C657.921 501.212 664.82 494.364 673.332 494.357ZM673.332 496.321C665.913 496.328 659.9 502.297 659.892 509.661C659.892 517.029 665.91 523.002 673.332 523.002C680.755 523.002 686.773 517.029 686.773 509.661C686.773 502.293 680.755 496.321 673.332 496.321ZM671.552 501.063L673.53 501.077L673.473 509.396L682.948 509.398V511.362L671.481 511.36L671.552 501.063ZM662.124 490.502C664.183 489.95 666.378 490.245 668.216 491.319C668.97 491.786 669.644 492.368 670.214 493.045L670.412 493.271L668.891 494.53L668.693 494.304C668.258 493.786 667.742 493.34 667.165 492.984C665.777 492.189 664.123 491.986 662.581 492.42C660.442 492.936 658.594 494.267 657.437 496.124C655.889 498.631 656.239 501.857 658.287 503.98L658.485 504.19L657.075 505.565L656.877 505.355C654.193 502.593 653.727 498.381 655.743 495.107C657.178 492.799 659.47 491.145 662.124 490.502ZM676.435 493.047C678.495 490.574 681.838 489.552 684.943 490.445C687.493 491.134 689.648 492.831 690.904 495.14C692.838 498.424 692.367 502.578 689.747 505.353L689.549 505.563L688.138 504.188L688.366 503.97C690.371 501.81 690.709 498.598 689.197 496.073C688.197 494.235 686.48 492.886 684.448 492.342C682.083 491.64 679.525 492.414 677.956 494.306L677.759 494.532L676.237 493.273L676.435 493.047Z"
            fill="white"
          />
        </mask>
        <g mask="url(#time-off-icon-mask)">
          <path
            d="M673.332 494.357C681.848 494.357 688.752 501.209 688.752 509.661C688.752 518.114 681.848 524.966 673.332 524.966C664.817 524.966 657.913 518.114 657.913 509.661C657.921 501.212 664.82 494.364 673.332 494.357ZM673.332 496.321C665.913 496.328 659.9 502.297 659.892 509.661C659.892 517.029 665.91 523.002 673.332 523.002C680.755 523.002 686.773 517.029 686.773 509.661C686.773 502.293 680.755 496.321 673.332 496.321ZM671.552 501.063L673.53 501.077L673.473 509.396L682.948 509.398V511.362L671.481 511.36L671.552 501.063ZM662.124 490.502C664.183 489.95 666.378 490.245 668.216 491.319C668.97 491.786 669.644 492.368 670.214 493.045L670.412 493.271L668.891 494.53L668.693 494.304C668.258 493.786 667.742 493.34 667.165 492.984C665.777 492.189 664.123 491.986 662.581 492.42C660.442 492.936 658.594 494.267 657.437 496.124C655.889 498.631 656.239 501.857 658.287 503.98L658.485 504.19L657.075 505.565L656.877 505.355C654.193 502.593 653.727 498.381 655.743 495.107C657.178 492.799 659.47 491.145 662.124 490.502ZM676.435 493.047C678.495 490.574 681.838 489.552 684.943 490.445C687.493 491.134 689.648 492.831 690.904 495.14C692.838 498.424 692.367 502.578 689.747 505.353L689.549 505.563L688.138 504.188L688.366 503.97C690.371 501.81 690.709 498.598 689.197 496.073C688.197 494.235 686.48 492.886 684.448 492.342C682.083 491.64 679.525 492.414 677.956 494.306L677.759 494.532L676.237 493.273L676.435 493.047Z"
            fill="white"
          />
          <path d="M696.047 484.235H648.561V531.368H696.047V484.235Z" fill="white" />
          <path d="M696.047 484.235H648.561V531.368H696.047V484.235Z" fill="white" />
        </g>
      </symbol>

      <ellipse
        className={`${isTime && 'iconSelected iconAnimate'} iconButton iconCenterRight`}
        name="iconRipple"
        cx="672.561"
        cy="507.435"
        rx="40"
        ry="40"
      />

      <use
        className={`${isTime && 'iconSelected'} iconButton iconCenterRight`}
        href="#timeOff-icon"
        onClick={() => handleClick()}
        onMouseOver={() => setIsHover(true)}
        onMouseOut={() => setIsHover(false)}
      />

      {/* Toolip HTML */}
      {!isTime &&
        <foreignObject
          className={`${isHover && 'show'} iconButton toolTip`}
          x="603"
          y="410"
          width="140"
          height="45"
          onClick={() => handleClick()}
          onMouseOver={() => setIsHover(true)}
          onMouseOut={() => setIsHover(false)}
        >
          <div className="toolTipBody">My Time Off</div>
        </foreignObject>
      }
    </g>
  );
}

export default TimeOff;