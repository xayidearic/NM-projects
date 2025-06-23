import classNames from 'classnames';
import Styles from '../FeaturedEvents/FeaturedEventsApp.module.scss';
import { EventTimeProps, FormatTimeOptions } from '../utils';

const formatTime = ({ dates, displayTimeZone }: FormatTimeOptions) => {
  const date = new Date(dates);
  const options: Intl.DateTimeFormatOptions = {
    hour: '2-digit',
    minute: '2-digit',
  };

  if (displayTimeZone) {
    options.timeZoneName = 'short';
  }

  return new Intl.DateTimeFormat('en-US', options).format(date);
};

function EventTime({ startDate, endDate, modal }: EventTimeProps) {
  const startTime = formatTime({ dates: startDate, displayTimeZone: false });
  const endTime = formatTime({ dates: endDate, displayTimeZone: true });

  return (
    <div className={classNames('d-flex align-items-center', modal ? 'col-7 mb-3 mb-md-0' : 'mt-3')}>
      <img className={classNames(Styles.icons, modal ? 'me-2' : 'me-1')} src="/Content/Images/icons/upcomingpayment_icon.svg" alt="Event Time" />
      <p className={classNames(modal ? 'p1' : 'metadata')}>
        {startTime} - {endTime}
      </p>
    </div>
  );
}

export default EventTime;