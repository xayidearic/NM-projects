import classNames from 'classnames';

import Styles from './EventImage.module.scss';
import { EventImageProps, sameDateChecker } from '../utils';

const EventImage = ({ event, isModalOpen }: EventImageProps) => {
  const startDate = new Date(event.startDateIso);
  const endDate = new Date(event.endDateIso);

  const start = startDate.getDate();
  const end = endDate.getDate();
  const startMonth = startDate.toLocaleString('default', { month: 'short' });
  const endMonth = endDate.toLocaleString('default', { month: 'short' });

  return event.imageUrl ? (
    <div className={classNames(isModalOpen ? Styles.modalEventImage : Styles.eventImage)}>
      <img
        src={event.imageUrl}
        alt={event.title}
        className={classNames('w-100', !isModalOpen && 'h-100')}
      />
    </div>
  ) : (
    <div className={classNames(isModalOpen ? Styles.defaultEventImage : Styles.defaultEventImageBlock)}>
      <div>
        <div className="position-absolute">
          <h3>{sameDateChecker(event.startDateIso, event.endDateIso) ? start : `${start} - ${end}`}</h3>
          <p className="eyebrow text-uppercase text-center">{startMonth !== endMonth ? `${startMonth} - ' + ${endMonth}` : startMonth}</p>
        </div>
      </div>
    </div>
  );
};

export default EventImage;
