import { createRoot } from 'react-dom/client';
import { useEffect, useState } from 'react';

import { registerCustomElement } from '../app/registerCustomElement';

const timeZoneAttr = 'timezone';

/**
 * Gets the formated Time
 * @param {string} timeZone
 * @return {string}
 */
const formatTime = (timeZone) => {
  const isUSTimeZone = timeZone.includes('US');
  const today = new Date();
  /**
   * get local time + time zone abbreviations
   * @type {Intl.DateTimeFormatOptions}
   */
  const options = {
    timeZone,
    hour: 'numeric',
    minute: 'numeric',
    timeZoneName: isUSTimeZone ? 'short' : 'long',
  };
  const formattedTime = new Intl.DateTimeFormat('en-US', options).format(today);

  // get Greenwich Mean Time (GMT)
  const gmt = new Intl.DateTimeFormat('en-GB', { timeStyle: 'long', timeZone }).format(today).slice(9);

  return `${formattedTime} ${gmt}`;
};

/**
 *
 * @param {{ timeZone: string }} props
 * @returns
 */
export const LocalTime = ({ timeZone }) => {
  const [time, setTime] = useState(formatTime(timeZone));

  useEffect(() => {
    setInterval(() => setTime(formatTime(timeZone)), 1000);

    return () => clearInterval(setTime);
  }, [timeZone]);

  return (
    <>
      <span>Local Time</span>
      <span className="time-zone">{time}</span>
    </>
  );
};

class ProfileLocalTime extends HTMLElement {
  static observedAttributes = [timeZoneAttr];

  #rootClasses = [
    'profile__employee-real-time',
    'mt-6',
    'mt-lg-8',
    'd-flex',
    'align-items-center',
    'justify-content-center',
    'text-center',
    'flex-wrap',
  ];

  get timeZone() {
    return this.getAttribute(timeZoneAttr) ?? '';
  }

  set timeZone(value) {
    this.setAttribute(timeZoneAttr, value);
  }

  /**
   * @param {string} name
   * @param {string} oldValue
   * @param {string} newValue
   */
  attributeChangedCallback(name, oldValue, newValue) {
    if (name === timeZoneAttr && oldValue !== newValue) {
      this.timeZone = newValue;
    }
  }

  connectedCallback() {
    const root = createRoot(this);

    this.classList.add(...this.#rootClasses);

    root.render(<LocalTime timeZone={this.timeZone} />);
  }
}

registerCustomElement('dc-profile-time', ProfileLocalTime);
