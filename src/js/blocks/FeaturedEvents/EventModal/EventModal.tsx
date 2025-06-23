import classNames from 'classnames';
import { useEffect, useState } from 'react';

// @ts-expect-error - TODO: Fix this by converting to TypeScript
import AuthoredContentHandler from '../../../total-rewards/AuthoredContentHandler';
import Modal from '../../../utils/Modal';
import { EventModalControls } from '../EventModalContols';
import EventDate from '../EventDate/EventDate';
import EventTime from '../EventTime/EventTime';
import EventMode from '../EventMode/EventMode';
import EventImage from '../EventImage/EventImage';
import { EventItems, EventModalProps } from '../utils';

import styles from '../FeaturedEvents/FeaturedEventsApp.module.scss';

const EventLocation = ({ location }: { location: string }) => {
  return (
    <div className="d-flex align-items-center">
      <img
        className={classNames('me-1', styles.icons)}
        src="/Content/Images/icons/mappin_icon.svg"
        alt="Event Mode"
      />
      <p className="p1 truncated-text truncated-text--short">{location}</p>
    </div>
  );
};

const EventInfo = ({ event }: EventItems) => {
  return (
    <div className="col-md-8 mb-4 ps-4 pt-5 pt-md-0">
      <div className="">
        <p className="eyebrow mb-2 neutral__medium-gray">
          {event.eventType} <span className="mx-2">/</span> {event.eventMode}
        </p>
        <a
          className="h1 mb-3 brand__blue-enabled link link--external"
          href={event.relativeUrl}
          title={event.ctaTitle}
        >
          {event.title}
        </a>
        <div className="d-flex flex-column flex-md-row pt-4 pb-md-3 col-12">
          <EventDate
            startDateIso={event.startDateIso}
            endDateIso={event.endDateIso}
            modal={true}
          />
          <EventTime
            startDate={event.startDateIso}
            endDate={event.endDateIso}
            modal={true}
          />
        </div>

        <div className="d-flex flex-column flex-md-row pb-2 col-12">
          <EventMode
            eventMode={event.eventMode}
            modal={true}
            icon={'map'}
          />
          <EventLocation location={event.rightLoc} />
        </div>
      </div>
    </div>
  );
};

const ModalCTA = ({ event }: EventItems) => {
  return (
    event.ctaText && (
      <a
        className="button button--left button--primary-blue button--larger mt-5"
        href={event.urlForCTA}
        title={event.ctaTitle}
        target={event.ctaTarget}
      >
        {event.ctaText}
      </a>
    )
  );
};

const ViewMore = ({ relativeUrl }: { relativeUrl: string }) => {
  return (
    <>
      <span className="p1 me-2">&hellip;</span>

      <a
        className="link link--external text-decoration-underline"
        href={relativeUrl}
        title="View More"
      >
        View More
      </a>
    </>
  );
};

const EventModal = ({ event, toggle }: EventModalProps) => {
  const jsonData = JSON.parse(event?.icsJson);
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (event.eventPageID) {
      const descTemplate = document.getElementById(`event-desc-${event.eventPageID}`);

      setDescription(descTemplate?.innerHTML ?? '');
    }
  }, [event.eventPageID]);

  return (
    <Modal>
      <div className={classNames(styles.modalContainer)}>
        <EventModalControls
          eventIcs={jsonData}
          eventId={event.eventPageID}
          eventUrl={event.relativeUrl}
          toggle={toggle}
        />
        <div className="d-md-flex justify-content-between">
          <EventImage
            event={event}
            isModalOpen={true}
          />
          <EventInfo event={event} />
        </div>
        <div className={classNames(styles.description, 'mt-7')}>
          <AuthoredContentHandler content={description ?? ''} />
          <ViewMore relativeUrl={event.relativeUrl} />
          <ModalCTA event={event} />
        </div>
      </div>
    </Modal>
  );
};

export default EventModal;
