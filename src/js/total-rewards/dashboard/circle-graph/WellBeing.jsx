import { useState } from 'react';

import sections from '../../constants/graphSections';

const wellFill = {
  unSelected: '#EDF0F3',
  selected: '#009E92',
};

/**
 * @param {Object} props - The props for this component
 * @param {string} props.currentSection - The active graph section state
 * @param {function} props.setSection - The function to excute on click - updates section type
 * @param {function} props.setSlideNum - The function to excute on click - updates slide number
 * @returns {JSX.Element} SVG section of graph for WellBeing category
 */
const WellBeing = ({ currentSection, setSection, setSlideNum }) => {
  const [isHover, setIsHover] = useState(false);
  const isWell = currentSection === sections.wellBeing;
  const fill = isWell ? wellFill.selected : wellFill.unSelected;

  /*Triggers state setters*/
  const handleClick = () => {
    setSection(sections.wellBeing);
    setSlideNum(3);
  }

  return (
    <g className="section" name="well-being">
      <path
        name="well-being-section"
        d="M356.439 0C439.282 0 519.531 28.8914 583.362 81.6973C647.194 134.503 690.611 207.917 706.134 289.292L692.146 291.961C677.244 213.84 635.564 143.363 574.285 92.6694C513.007 41.9758 435.968 14.24 356.439 14.24V0Z"
        fill={fill}
      />

      <symbol id="well-being-icon">
        <ellipse opacity="0.15" cx="601.559" cy="103.114" rx="40" ry="40" fill="#009E92" />
        <ellipse opacity="0.05" cx="601.559" cy="103.114" rx="40" ry="40" fill="#009E92" />

        <path
          d="M639.586 103.114C639.586 124.116 622.561 141.141 601.559 141.141C580.556 141.141 563.531 124.116 563.531 103.114C563.531 82.1114 580.556 65.0858 601.559 65.0858C622.561 65.0858 639.586 82.1114 639.586 103.114Z"
          fill="#009E92"
          stroke="white"
          strokeWidth={isHover ? '1' : '3.9446'}
        />
        <mask id="well-icon-mask" style={{ maskType: 'alpha' }} maskUnits="userSpaceOnUse" x="579" y="83" width="44" height="39">
          <path
            d="M616.604 107.346C620.727 102.986 622.961 99.6788 622.961 94.6912C622.907 91.741 621.647 88.9365 619.466 86.9103C617.284 84.8841 614.365 83.8069 611.366 83.9216C607.504 84.0224 603.881 85.7876 601.46 88.7489C599.039 85.7876 595.416 84.0224 591.553 83.9216C588.555 83.8069 585.636 84.8841 583.454 86.9103C581.273 88.9365 580.013 91.741 579.958 94.6912C579.958 99.6788 582.192 102.986 586.316 107.346C590.109 111.352 600.256 120.477 600.686 120.853L601.446 121.536L602.209 120.853C602.639 120.468 612.801 111.368 616.604 107.346ZM601.46 118.523C598.814 116.133 591.114 109.14 587.984 105.837C584.159 101.798 582.222 98.9666 582.222 94.6912C582.283 92.3332 583.306 90.0984 585.062 88.491C586.817 86.8835 589.157 86.0388 591.553 86.1472C595.179 86.3421 598.496 88.2156 600.493 91.1971L601.462 92.755L602.426 91.1971C604.419 88.2105 607.739 86.3354 611.366 86.1472C613.763 86.0388 616.102 86.8835 617.858 88.491C619.614 90.0984 620.637 92.3332 620.698 94.6912C620.698 98.9666 618.761 101.798 614.947 105.83C611.828 109.131 604.103 116.13 601.46 118.523Z"
            fill="white"
          />
        </mask>
        <g mask="url(#well-icon-mask)">
          <path
            d="M616.603 107.346C620.727 102.986 622.961 99.6788 622.961 94.6912C622.906 91.741 621.647 88.9365 619.465 86.9103C617.284 84.8841 614.364 83.8069 611.366 83.9216C607.503 84.0224 603.881 85.7876 601.459 88.7489C599.038 85.7876 595.416 84.0224 591.553 83.9216C588.554 83.8069 585.635 84.8841 583.454 86.9103C581.272 88.9365 580.012 91.741 579.958 94.6912C579.958 99.6788 582.192 102.986 586.316 107.346C590.109 111.352 600.255 120.477 600.685 120.853L601.446 121.536L602.209 120.853C602.639 120.468 612.801 111.368 616.603 107.346ZM601.459 118.523C598.814 116.133 591.114 109.14 587.984 105.837C584.159 101.798 582.221 98.9666 582.221 94.6912C582.282 92.3332 583.306 90.0984 585.061 88.491C586.817 86.8835 589.157 86.0388 591.553 86.1472C595.178 86.3421 598.495 88.2156 600.493 91.1971L601.462 92.755L602.426 91.1971C604.419 88.2105 607.738 86.3354 611.366 86.1472C613.762 86.0388 616.102 86.8835 617.858 88.491C619.613 90.0984 620.637 92.3332 620.698 94.6912C620.698 98.9666 618.76 101.798 614.946 105.83C611.828 109.131 604.103 116.13 601.459 118.523Z"
            fill="white"
          />
          <path d="M627.487 75.0115H573.168V128.425H627.487V75.0115Z" fill="white" />
          <path d="M627.487 75.0115H573.168V128.425H627.487V75.0115Z" fill="white" />
        </g>
      </symbol>

      <ellipse
        className={`${isWell && 'iconWellSelected iconAnimate'} iconButton iconWell`}
        name="iconAnimte"
        cx="601.559"
        cy="103.114"
        rx="40"
        ry="40"
      />

      <use
        className={`${isWell && 'iconWellSelected'} iconButton iconWell`}
        href="#well-being-icon"
        onClick={() => handleClick()}
        onMouseOver={() => setIsHover(true)}
        onMouseOut={() => setIsHover(false)}
      />

      {/* Toolip HTML */}
      {!isWell &&
        <foreignObject
          className={`${isHover && 'show'} iconButton toolTip`}
          x="530"
          y="6"
          width="148"
          height="45"
          onClick={() => handleClick()}
          onMouseOver={() => setIsHover(true)}
          onMouseOut={() => setIsHover(false)}
        >
          <div className="toolTipBody">My Well-being</div>
        </foreignObject>
      }
    </g>
  );
}

export default WellBeing;
