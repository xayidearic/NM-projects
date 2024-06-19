import { useState, useLayoutEffect, useRef, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider, useSelector } from 'react-redux';
import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar, ReferenceLine, LabelList } from 'recharts';

import { registerCustomElement } from '../../app/registerCustomElement.js';
import { barChartLabels, formatSalaryAmounts } from '../formatting/formatSalaryAmount.js';
import { useGetCompensationDataQuery } from '../../dux/totalRewardsApi.js';
import store from '../../store.js';

/**
 * Renders a custom tooltip for the BarChart.
 *
 * @param {Object} props - The properties passed to the tooltip.
 * @param {boolean} props.active - Indicates if the tooltip should be active.
 * @param {Array} props.payload - The data to be shown in the tooltip.
 * @param {string} props.label - The label for the tooltip.
 * @param {boolean} props.tooltipVisible - Flag to check if tooltip is visible.
 * @param {number} props.x - The x-coordinate for the tooltip.
 * @param {number} props.barIndex - The bar index for the tooltip.
 * @returns {React.Element|null} - A rendered tooltip element or null.
 */
const CustomTooltip = ({ active, payload, label, tooltipVisible, x, barIndex }) => {
  if (!tooltipVisible || !active || !payload) return null;

  const totalValue = payload.reduce((acc, curr) => acc + curr.value, 0);
  const barWidth = 84;
  const tooltipX = x - barIndex * barWidth;

  const formatLabelName = (name) => name.replaceAll('*', '');

  return (
    <div className="compensation-bar-chart__custom-tooltip" style={{ left: `${tooltipX}px` }}>
      <p className="h3 year mb-4">{`${label}`}</p>
      {payload.map((entry, index) => (
        <div key={`item-${index}`} className="tooltip-item d-flex align-items-start">
          <div className="color-box" style={{ backgroundColor: entry.color }} />
          <p className="p1 desc mb-0">
            {`${formatLabelName(entry.name)} : `}
            <span>{formatSalaryAmounts(entry.value)}</span>
          </p>
        </div>
      ))}
      <p className="p1 total">
        {`Total Compensation: `}
        <span>{formatSalaryAmounts(totalValue)}</span>
      </p>
    </div>
  );
};

/**
 * Renders custom tick marks for the chart's axis.
 *
 * @param {Object} props - The properties passed to the tick component.
 * @param {number} props.x - The x-coordinate for the tick.
 * @param {number} props.y - The y-coordinate for the tick.
 * @param {Object} props.payload - The data related to the tick.
 * @returns {React.Element} - A rendered tick element.
 */
const CustomTick = (props) => {
  const { x, y, payload } = props;

  return (
    <g transform={`translate(${x},${y})`}>
      <foreignObject x={-20} y={0} width="60" height="40">
        <p className="p2 mt-1 mb-4">{payload.value}</p>
      </foreignObject>
    </g>
  );
};

/**
 * Renders a custom legend for the BarChart.
 *
 * @param {Object} props - The properties passed to the legend.
 * @param {Array} props.payload - The data to be shown in the legend.
 * @returns {React.Element} - A rendered legend element.
 */
const CustomLegend = ({ payload }) => {
  return (
    <div className="compensation-bar-chart__custom-legend">
      {payload.map((entry, index) => (
        <div key={`item-${index}`} className="legend-entry mb-2">
          <div
            style={{
              backgroundColor: entry.color,
              width: '1.6rem',
              height: '1.6rem',
              borderRadius: '0.2rem',
            }}
          />
          <p className="metadata mb-0">{entry.value}</p>
        </div>
      ))}
    </div>
  );
};

/**
 * StackedBarChart component renders a visual representation of compensation data over the years.
 * Displays Base Pay, AIP payment, and LTIP payout.
 *
 * @returns {React.Element|null} - A rendered BarChart or null if data is not available.
 */
export const StackedBarChart = () => {
  const chartRef = useRef(null);
  const { data, isError, isLoading, isSuccess } = useGetCompensationDataQuery('data');
  const currentYear = new Date().getFullYear();
  const [chartWidth, setChartWidth] = useState(0);
  const [barWidth, setBarWidth] = useState(84);
  const [currentHoveredIndex, setCurrentHoveredIndex] = useState(null);
  const [tooltipVisible, setTooltipVisible] = useState(true);
  const [compensationData, setCompensationData] = useState([]);
  const [legendHeight, setLegendHeight] = useState(40);
  const hideData = useSelector((state) => state.hideData.hideCompData);

  const updateLegendHeight = () => {
    if (window.innerWidth <= 412) {
      setLegendHeight(100);
    } else if (window.innerWidth <= 572) {
      setLegendHeight(60);
    } else if (window.innerWidth <= 768) {
      setLegendHeight(40);
    } else if (window.innerWidth <= 874) {
      setLegendHeight(60);
    } else {
      setLegendHeight(40);
    }
  };

  useEffect(() => {
    updateLegendHeight();
    window.addEventListener('resize', updateLegendHeight);

    return () => window.removeEventListener('resize', updateLegendHeight);
  }, []);

  useEffect(() => {
    if (data) {
      setCompensationData([
        {
          year: currentYear - 3,
          [barChartLabels.salary]: data.Salary_3_Year_Ago,
          [barChartLabels.aip]: data.AI_Amt_3_Year_Ago,
          [barChartLabels.ltip]: data.Past_LTI_Amt_3_Years,
          index: 0,
        },
        {
          year: currentYear - 2,
          [barChartLabels.salary]: data.Salary_2_Year_Ago,
          [barChartLabels.aip]: data.AI_Amt_2_Year_Ago,
          [barChartLabels.ltip]: data.Past_LTI_Amt_2_Years,
          index: 1,
        },
        {
          year: currentYear - 1,
          [barChartLabels.salary]: data.Salary_1_Year_Ago,
          [barChartLabels.aip]: data.AI_Amt_1_Year_Ago,
          [barChartLabels.ltip]: data.Past_LTI_Amt_1_Year,
          index: 2,
        },
        {
          year: currentYear,
          [barChartLabels.salary]: data.Salary,
          [barChartLabels.aip]: data.Latest_AI_Amt,
          [barChartLabels.ltip]: data.Past_LTI_Grant_Amt,
          index: 3,
        },
      ]);
    }
  }, [data, currentYear]);

  const minYValue = 0;
  const totalStacksPerYear = compensationData.map((item) => item[barChartLabels.salary] + item[barChartLabels.aip] + item[barChartLabels.ltip]);

  const maxStackValue = Math.max(...totalStacksPerYear);
  const maxYValue = maxStackValue * 1.25;

  const numberOfTicks = 10;
  const tickInterval = (maxYValue - minYValue) / (numberOfTicks - 1);
  const yAxisTicks = Array.from({ length: numberOfTicks }, (_, i) => minYValue + i * tickInterval);

  const getTotalValue = (data) => data[barChartLabels.salary] + data[barChartLabels.aip] + data[barChartLabels.ltip];

  const [tooltipPosition, setTooltipPosition] = useState([]);

  const handleResize = () => {
    const containerWidth = chartRef.current ? chartRef.current.offsetWidth : 0;
    let calculatedChartWidth;
    let calculatedBarWidth = 84;

    if (containerWidth <= 340) {
      calculatedChartWidth = 270;
    } else if (containerWidth <= 380) {
      calculatedChartWidth = 340;
    } else if (containerWidth <= 416) {
      calculatedChartWidth = 370;
    } else if (containerWidth <= 450) {
      calculatedChartWidth = 400;
    } else if (containerWidth <= 490) {
      calculatedChartWidth = 420;
    } else if (containerWidth <= 540) {
      calculatedChartWidth = 460;
    } else if (containerWidth <= 580) {
      calculatedChartWidth = 510;
    } else if (containerWidth <= 600) {
      calculatedChartWidth = 540;
    } else if (containerWidth <= 640) {
      calculatedChartWidth = 540;
    } else if (containerWidth <= 760) {
      calculatedChartWidth = 610;
      calculatedBarWidth = 70;
    } else if (containerWidth <= 807) {
      calculatedChartWidth = 680;
    } else {
      calculatedChartWidth = 810;
      calculatedBarWidth = 20;
    }

    setChartWidth(calculatedChartWidth);
    setBarWidth(calculatedBarWidth);
  };

  useLayoutEffect(() => {
    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, [compensationData]);

  const onMouseEnter = (data) => {
    if (data && data.tooltipPayload) {
      const { x, tooltipPayload } = data;

      if (tooltipPayload.length === 0 || tooltipPayload[0].value === 0) {
        setTooltipVisible(false);
      } else {
        setTooltipPosition({ x, y: 0 });
        setTooltipVisible(true);
      }
    } else {
      setTooltipVisible(false);
    }
  };

  const onMouseMove = (e) => {
    if (e && e.activePayload && e.activePayload.length > 0 && e.activePayload[0].value !== 0) {
      setTooltipVisible(true);
    } else {
      setTooltipVisible(false);
    }
  };

  const onMouseLeave = () => {
    setTooltipVisible(false);
    setCurrentHoveredIndex(null);
  };

  // function to display sum of all amounts that appear at the top of each bar in the chart
  const renderLabel = (props) => {
    const { x, y, width, value } = props;
    const centeredX = x + width / 2;

    if (!value) return null;

    return (
      <text
        x={centeredX}
        y={y}
        dy={-10}
        fill="#333"
        className="compensation-bar-chart__bar-label"
        style={{ fontWeight: '500', textAnchor: 'middle' }}
      >
        {formatSalaryAmounts(value)}
      </text>
    );
  };

  if (isSuccess && data) {
    return (
      <div className="compensation-bar-chart mt-10 mb-10" ref={chartRef}>
        <div className="chart-header">
          <h2 className="mb-4">Year-to-Year Actual Compensation</h2>
          <p className="p1 mb-4">
            A side-by-side view of your annual compensation over the last four years. This includes your current base pay, latest AIP payment and
            latest LTIP payment (if applicable).*
          </p>
        </div>

        <div className={`chart-container ${isLoading || isError ? 'chart-container--hidden' : ''}`}>
          {!isLoading || !isError ? (
            <BarChart
              className={`chart-content ${hideData ? 'hidden-bar-chart' : ''}`}
              width={chartWidth}
              height={521}
              data={compensationData}
              margin={{
                top: 0,
                right: 30,
                left: -58,
                bottom: 0,
              }}
              barSize={barWidth}
              barGap={100}
              onMouseEnter={onMouseEnter}
              onMouseLeave={onMouseLeave}
              onMouseMove={onMouseMove}
            >
              <CartesianGrid vertical={false} horizontalStroke="#000" strokedDasharray="none" stroke="false" />

              {yAxisTicks.map((tickValue, index) =>
                index !== yAxisTicks.length - 1 ? <ReferenceLine key={index} y={tickValue} stroke="#EDF0F3" /> : null
              )}

              <XAxis dataKey="year" tickLine={false} axisLine={{ stroke: '#D4D4D4' }} padding={{ left: 10 }} tick={CustomTick} />

              <YAxis tick={false} tickLine={false} domain={[0, maxYValue]} ticks={yAxisTicks} axisLine={{ stroke: '#D4D4D4' }} />

              {!hideData && (
                <Tooltip
                  cursor={false}
                  content={<CustomTooltip data={compensationData} tooltipVisible={tooltipVisible} x={tooltipPosition[currentHoveredIndex]?.x} />}
                  position={{ x: tooltipPosition[currentHoveredIndex]?.x, y: tooltipPosition[currentHoveredIndex]?.y }}
                  allowEscapeViewBox={{ y: true }}
                />
              )}

              <Legend verticalAlign="top" align="left" height={legendHeight} content={<CustomLegend />} />

              <Bar
                className="customBarChart"
                dataKey="Base Pay"
                stackId="salary"
                fill="#0e497b"
                barSize={84}
                isAnimationActive={false}
                activeShape={() => null}
                onMouseEnter={onMouseEnter}
              />

              <Bar
                className="customBarChart"
                dataKey="Actual Annual Incentive Plan (AIP) Payment"
                stackId="salary"
                fill="#83D4F1"
                barSize={84}
                isAnimationActive={false}
                activeShape={() => null}
                onMouseEnter={onMouseEnter}
              />

              <Bar
                dataKey="Actual Long-Term Incentive Plan (LTIP) Payment"
                stackId="salary"
                fill="#FFB81C"
                barSize={84}
                isAnimationActive={false}
                onMouseEnter={onMouseEnter}
              >
                <LabelList dataKey={getTotalValue} content={renderLabel} />
              </Bar>
            </BarChart>
          ) : (
            ''
          )}
        </div>
        <div className={`chart-footer ${isLoading || isError ? 'd-none' : ''}`}>
          <p className="legal mb-0">
            *AIP and LTIP (if applicable) awards are displayed in the year in which they are paid. AIP awards are based off base pay as of 12/31 the
            prior year. If applicable, LTIP payout displayed each year represents the grant that was awarded three years prior plus leverage. Base pay
            reflects amount as of 12/31 for of the previous years shown; current year shows current base pay. See full{' '}
            <a className="legal link" href="/en/topic-sites/my-total-rewards/assumptions-disclaimers/">
              assumptions and disclaimers
            </a>
            .
          </p>
        </div>
      </div>
    );
  }
};

class BarChartClass extends HTMLElement {
  connectedCallback() {
    const root = createRoot(this);

    root.render(
      <Provider store={store}>
        <StackedBarChart />
      </Provider>
    );
  }
}

registerCustomElement('total-rewards-bar-chart', BarChartClass);
