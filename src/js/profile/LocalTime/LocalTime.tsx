import { useEffect, useState } from 'react';
import styles from './LocalTime.module.scss';


const formatTime = (timeZone : string) => {
  const isUSTimeZone = timeZone.includes('US');
  const today = new Date();
  /** get local time + time zone abbreviations */
  const options: Intl.DateTimeFormatOptions = {
    timeZone,
    hour: "numeric",
    minute: "numeric",
    timeZoneName: isUSTimeZone ? "short" : "long",
  };
  const formattedTime = new Intl.DateTimeFormat('en-US', options).format(today);

  // get Greenwich Mean Time (GMT)
  const gmt = new Intl.DateTimeFormat('en-GB', { timeStyle: 'long', timeZone }).format(today).slice(9);

  return `${formattedTime} ${gmt}`;
};

export const LocalTime = ({ timeZone } : {timeZone : string}) => {
  const [time, setTime] = useState<string>(formatTime(timeZone));

  useEffect(() => {
    const intervalId = setInterval(() => setTime(formatTime(timeZone)), 1000);

    return () => clearInterval(intervalId);
  }, [timeZone]);

  return (
    <div className={`${styles.localTime} mt-6 mt-lg-8 d-flex align-items-center justify-content-center text-center flex-wrap`}>
      <span>Local Time</span>
      <span className={styles.realTime}>{time}</span>
    </div>
  );
};

