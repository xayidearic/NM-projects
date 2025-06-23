import classNames from "classnames";

import Styles from '../FeaturedEvents/FeaturedEventsApp.module.scss';
import { getEventDate } from '../utils';

const EventDate = ({ startDateIso, endDateIso, modal }: { startDateIso: string, endDateIso: string, modal: boolean }) => {
  return (
    <div className={classNames('d-flex align-items-center', modal ? 'col-6 mb-3 mb-md-0' : 'mt-3')}>
      <img className={classNames(Styles.icons, modal ? 'me-2' : 'me-1')} src='/Content/Images/icons/calendar-blue_icon.svg' alt='Event Calendar' />
      <p className={classNames(modal ? 'p1' : 'metadata')}>
        {getEventDate(startDateIso, endDateIso, modal)}
      </p>
    </div>
  );
}

export default EventDate;