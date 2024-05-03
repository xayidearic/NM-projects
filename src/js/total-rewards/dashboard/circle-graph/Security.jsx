import { useState } from 'react';

import sections from '../../constants/graphSections';

const secFill = {
  unSelected: '#EDF0F3',
  selected: '#83D4F1',
};

/**
 * @param {Object} props - The props for this component
 * @param {string} props.currentSection - The active graph section state
 * @param {function} props.setSection - The function to excute on click - updates section type
 * @param {function} props.setSlideNum - The function to excute on click - updates slide number
 * @returns {JSX.Element} SVG section of graph for Security category
 */
export const Security = ({ currentSection, setSection, setSlideNum }) => {
  const [isHover, setIsHover] = useState(false);
  const isSec = currentSection === sections.security;
  const fill = isSec ? secFill.selected : secFill.unSelected;

  /*Triggers state setters*/
  const handleClick = () => {
    setSection(sections.security);
    setSlideNum(1);
  }

  return (
    <g className="section" name="security">
      <g name="security-section">
        <mask id="security-mask" fill="white">
          <path d="M600.775 516.89C625.687 479.406 641.913 436.831 648.269 392.274C654.625 347.718 650.95 302.304 637.513 259.349C624.075 216.394 601.215 176.982 570.6 143.991C539.985 111 502.388 85.2623 460.556 68.6575L432.678 138.891C464.052 151.344 492.249 170.647 515.211 195.391C538.172 220.134 555.317 249.693 565.395 281.909C575.474 314.125 578.23 348.186 573.463 381.603C568.696 415.021 556.526 446.952 537.842 475.065L600.775 516.89Z" />
        </mask>
        <path
          d="M600.775 516.89C625.687 479.406 641.913 436.831 648.269 392.274C654.625 347.718 650.95 302.304 637.513 259.349C624.075 216.394 601.215 176.982 570.6 143.991C539.985 111 502.388 85.2623 460.556 68.6575L432.678 138.891C464.052 151.344 492.249 170.647 515.211 195.391C538.172 220.134 555.317 249.693 565.395 281.909C575.474 314.125 578.23 348.186 573.463 381.603C568.696 415.021 556.526 446.952 537.842 475.065L600.775 516.89Z"
          fill={fill}
          stroke="white"
          strokeWidth={`${isSec ? '0' : '8'}`}
          mask="url(#security-mask)"
        />
      </g>

      <symbol id="security-icon">
        <ellipse opacity="0.15" cx="634.102" cy="274.704" rx="40" ry="40" fill="#83D4F1" />
        <ellipse opacity="0.05" cx="634.102" cy="274.704" rx="40" ry="40" fill="#83D4F1" />
        <path
          d="M672.129 274.704C672.129 295.706 655.104 312.731 634.102 312.731C613.099 312.731 596.074 295.706 596.074 274.704C596.074 253.701 613.099 236.676 634.102 236.676C655.104 236.676 672.129 253.701 672.129 274.704Z"
          fill="#83D4F1"
          stroke="white"
          strokeWidth={isHover ? '1' : '3.9446'}
        />
        <mask id="mask4_7869_150596" style={{ maskType: 'alpha' }} maskUnits="userSpaceOnUse" x="617" y="254" width="34" height="41">
          <path
            d="M633.764 254.704L633.851 254.729L650.224 259.626L650.224 266.482C650.137 273.032 647.995 279.391 644.097 284.629C641.32 288.307 638.028 291.553 634.324 294.261L633.764 294.631L633.203 294.266C629.499 291.557 626.206 288.312 623.43 284.633C619.362 279.166 617.207 272.478 617.305 265.627V259.626L633.764 254.704ZM633.764 256.88L619.362 261.189V265.627C619.262 272.006 621.259 278.236 625.037 283.334C627.574 286.616 630.506 289.563 633.764 292.106C637.023 289.557 639.955 286.605 642.492 283.317C646.266 278.224 648.263 272 648.166 265.627V261.189L633.764 256.88ZM640.319 266.452L641.78 267.92L632.388 277.551L626.716 271.794L628.17 270.318L632.38 274.589L640.319 266.452Z"
            fill="white"
          />
        </mask>
        <g mask="url(#mask4_7869_150596)">
          <path
            d="M633.764 254.704L633.851 254.729L650.224 259.626L650.224 266.482C650.137 273.032 647.995 279.391 644.097 284.629C641.32 288.307 638.028 291.553 634.324 294.261L633.764 294.631L633.203 294.266C629.499 291.557 626.206 288.312 623.43 284.633C619.362 279.166 617.207 272.478 617.305 265.627V259.626L633.764 254.704ZM633.764 256.88L619.362 261.189V265.627C619.262 272.006 621.259 278.236 625.037 283.334C627.574 286.616 630.506 289.563 633.764 292.106C637.023 289.557 639.955 286.605 642.492 283.317C646.266 278.224 648.263 272 648.166 265.627V261.189L633.764 256.88ZM640.319 266.452L641.78 267.92L632.388 277.551L626.716 271.794L628.17 270.318L632.38 274.589L640.319 266.452Z"
            fill="white"
          />
          <path d="M658.45 250.526H609.072V300.652H658.45V250.526Z" fill="white" />
          <path d="M658.45 250.526H609.072V300.652H658.45V250.526Z" fill="white" />
        </g>
      </symbol>

      <ellipse
        className={`${isSec && 'iconSecSelected iconAnimate'} iconButton iconCenterRight`}
        name="security-anim"
        cx="634.102"
        cy="274.704"
        rx="40"
        ry="40"
      />

      <use
        className={`${isSec && 'iconSecSelected'} iconButton iconCenterRight`}
        href="#security-icon"
        onClick={() => handleClick()}
        onMouseOver={() => setIsHover(true)}
        onMouseOut={() => setIsHover(false)}
      />

      {/* Toolip HTML */}
      {!isSec &&
        <foreignObject
          className={`${isHover && 'show'} iconButton toolTip`}
          x="539"
          y="179"
          width="190"
          height="45"
          onClick={() => handleClick()}
          onMouseOver={() => setIsHover(true)}
          onMouseOut={() => setIsHover(false)}
        >
          <div className="toolTipBody">My Financial Security</div>
        </foreignObject>
      }
    </g>
  );
}

export default Security;