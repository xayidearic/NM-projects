/**
 * This is a reusable function that will return the time difference from the time stamp passed
 * @param {string} timeStamp time stamp
 */
export const getTimeDiff = (timeStamp) => {
  const givenDate = new Date(timeStamp);
  //   const now = new Date();
  const diff = Date.now() - givenDate.getTime();

  return timeDiff(diff);
};

const timeDiff = (diff) => {
  let days = Math.floor(diff / 1000 / 60 / (60 * 24));
  days = parseInt(days);

  const hh = Math.floor(diff / 1000 / 60 / 60);
  diff -= hh * 1000 * 60 * 60;

  const mm = Math.floor(diff / 1000 / 60);
  diff -= mm * 1000 * 60;

  const ss = Math.floor(diff / 1000);
  diff -= ss * 1000;

  const rtf = new Intl.RelativeTimeFormat('en', { style: 'long' });

  if (days < 0) return rtf.format(-1, 'second');
  if (days >= 1) return rtf.format(-days, 'day');
  if (hh >= 1) return rtf.format(-hh, 'hour');
  if (mm >= 1) return rtf.format(-mm, 'minute');

  return rtf.format(-ss, 'second');
};
