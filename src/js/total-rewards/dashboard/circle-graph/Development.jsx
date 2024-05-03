import { useState } from 'react';

import sections from '../../constants/graphSections';

const devFill = {
  unSelected: '#EDF0F3',
  selected: '#ABD864',
};

/**
 * @param {Object} props - The props for this component
 * @param {string} props.currentSection The active graph section state
 * @param {function} props.setSection - The function to excute on click - updates section type
 * @param {function} props.setSlideNum - The function to excute on click - updates slide number
 * @returns {JSX.Element} SVG section of graph for Development category
 */
const Development = ({ currentSection, setSection, setSlideNum }) => {
  const [isHover, setIsHover] = useState(false);
  const isDev = currentSection === sections.develop;
  const fill = isDev ? devFill.selected : devFill.unSelected;

  /*Triggers state setters*/
  const handleClick = () => {
    setSection(sections.develop);
    setSlideNum(5);
  }

  return (
    <g className="section" name="develop">
      <path
        name="develop-section"
        d="M475.13 691.631C397.028 719.251 311.738 718.768 233.953 690.265C156.168 661.762 90.7593 607.024 48.9937 535.48L61.2915 528.301C101.387 596.983 164.179 649.531 238.852 676.894C313.526 704.257 395.404 704.721 470.383 678.206L475.13 691.631Z"
        fill={fill}
      />

      <symbol id="develop-icon">
        <ellipse opacity="0.15" cx="229.78" cy="680.997" rx="40" ry="40" fill="#ABD864" />
        <ellipse opacity="0.05" cx="229.78" cy="680.997" rx="40" ry="40" fill="#ABD864" />
        <path
          d="M267.807 680.997C267.807 701.999 250.782 719.025 229.78 719.025C208.778 719.025 191.752 701.999 191.752 680.997C191.752 659.995 208.778 642.97 229.78 642.97C250.782 642.97 267.807 659.995 267.807 680.997Z"
          fill="#ABD864"
          stroke="white"
          strokeWidth={isHover ? '1' : '3.9446'}
        />

        <mask id="develop-icon-mask" style={{ maskType: 'alpha' }} maskUnits="userSpaceOnUse" x="213" y="660" width="33" height="42">
          <path
            d="M226.848 679.871C227.24 679.78 227.598 679.676 227.92 679.557C233.477 677.511 237.455 672.226 238.161 665.953L234.534 668.686L233.055 666.416L240.251 660.997L245.288 668.739L243.181 670.327L240.741 666.58C239.867 673.135 235.973 678.612 230.604 681.33C235.801 684.103 239.554 689.546 240.397 696.036L243.221 691.64L245.306 693.233L239.981 701.531L232.373 695.722L233.836 693.444L237.825 696.492C237.033 689.863 232.683 684.474 226.893 682.699C226.497 682.795 226.096 682.876 225.69 682.944C224.588 683.126 222.954 683.155 220.788 683.03L220.811 682.138C219.003 682.137 216.659 682.164 213.78 682.218V679.483C220.543 679.374 224.457 679.41 225.521 679.59C225.969 679.666 226.412 679.76 226.848 679.871ZM213.782 679.422H231.296L227.793 681.264L231.296 683.106H213.782V679.422Z"
            fill="white"
          />
        </mask>
        <g mask="url(#develop-icon-mask)">
          <path
            d="M226.848 679.871C227.24 679.78 227.598 679.676 227.92 679.557C233.477 677.511 237.455 672.226 238.161 665.953L234.534 668.686L233.055 666.416L240.251 660.997L245.288 668.739L243.181 670.327L240.741 666.58C239.867 673.135 235.973 678.612 230.604 681.33C235.801 684.103 239.554 689.546 240.397 696.036L243.221 691.64L245.306 693.233L239.981 701.531L232.373 695.722L233.836 693.444L237.825 696.492C237.033 689.863 232.683 684.474 226.893 682.699C226.497 682.795 226.096 682.876 225.69 682.944C224.588 683.126 222.954 683.155 220.788 683.03L220.811 682.138C219.003 682.137 216.659 682.164 213.78 682.218V679.483C220.543 679.374 224.457 679.41 225.521 679.59C225.969 679.666 226.412 679.76 226.848 679.871ZM213.782 679.422H231.296L227.793 681.264L231.296 683.106H213.782V679.422Z"
            fill="white"
          />
          <path d="M256.565 654.243H202.521V708.288H256.565V654.243Z" fill="white" />
          <path d="M256.564 654.243H202.52V708.288H256.564V654.243Z" fill="white" />
        </g>
      </symbol>

      <ellipse
        className={`${isDev && 'iconSelected iconAnimate'} iconButton iconDev`}
        name="iconAnimate"
        cx="229.78"
        cy="680.997"
        rx="40"
        ry="40"
      />

      <use
        className={`${isDev && 'iconSelected'} iconButton iconDev`}
        href="#develop-icon"
        onClick={() => handleClick()}
        onMouseOver={() => setIsHover(true)}
        onMouseOut={() => setIsHover(false)}
      />

      {/* Toolip HTML */}
      {!isDev &&
        <foreignObject
          className={`${isHover && 'show'} iconButton toolTip`}
          x="126"
          y="585"
          width="210"
          height="45"
          onClick={() => handleClick()}
          onMouseOver={() => setIsHover(true)}
          onMouseOut={() => setIsHover(false)}
        >
          <div className="toolTipBody">My Career Development</div>
        </foreignObject>
      }
    </g>
  );
}

export default Development;