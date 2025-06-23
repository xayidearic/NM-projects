import classNames from 'classnames';
import { useEffect, useState } from 'react';

// @ts-expect-error - TODO: Fix this by converting to TypeScript
import { getElementObserver } from '../../app/elementObserver.js';
import { EventDownloadButton } from './EventDownloadButton.tsx';
import { EventOverflowTooltip } from './EventOverflowTooltip.tsx';
import { EventShareTooltip } from './EventShareToolTip/EventShareToolTip.tsx';

import styles from '../FeaturedEvents/FeaturedEvents/FeaturedEventsApp.module.scss';
interface ModalControls {
  eventIcs: {
    description: string;
    endDate: string;
    title: string;
    fileName: string;
    location: string;
    startDate: string;
  };
  eventId: string;
  eventUrl: string;
  toggle: () => void;
}

const modelIdPrefix = 'FeaturedEventModal';

export function EventModalControls({ eventIcs, eventId, eventUrl, toggle }: ModalControls) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isShareOpen, setIsShareOpen] = useState<boolean>(false);
  const modelId = `${modelIdPrefix}_${eventId}`;

  useEffect(() => {
    getElementObserver(modelId, (list: MutationRecord[]) => {
      const modal = list.find(mutation => (mutation.target as Element).id === modelId);

      if (modal && (modal.target as Element).getAttribute('aria-hidden') === 'true') {
        setIsOpen(false);
        setIsShareOpen(false);
      }
    });
  }, [eventId, modelId]);

  return (
    <div className={classNames(styles.buttonContainer, 'd-flex align-items-center')}>
      <button
        className="overflow-tooltip-open px-0"
        onClick={() => setIsOpen(true)}
      >
        <img
          className="icon--large icon--medium-gray"
          src="/Content/Images/icons/overflow_icon.svg"
          alt="open overflow"
        />
      </button>
      <button
        type="button"
        onClick={toggle}
      >
        <img
          className="icon--medium icon--medium-gray"
          src="/Content/Images/icons/cross_icon.svg"
          alt="close modal"
        />
      </button>

      {/* Overflow tooltip */}
      {isOpen && (
        <EventOverflowTooltip
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        >
          <button
            className="overflow-tooltip-share-open mb-3"
            title="Share Event"
            onClick={() => setIsShareOpen(true)}
          >
            <p className="overflow-tooltip-share-open p2">
              <span className="me-2">
                <img
                  className="icon"
                  src="/Content/Images/icons/share_icon.svg"
                  alt="share event"
                />
              </span>
              Share Event
            </p>
          </button>
          <EventDownloadButton ics={eventIcs}>
            <p className="p2">
              <span className="me-2">
                <img
                  className="icon"
                  src="/Content/Images/icons/calendar-blue_icon.svg"
                  alt="download event"
                />
              </span>
              Add Event to Calendar
            </p>
          </EventDownloadButton>
        </EventOverflowTooltip>
      )}

      {/* Share Tooltip */}
      {isShareOpen && (
        <EventOverflowTooltip
          className="overflow-tool-tip--share"
          isOpen={isShareOpen}
          setIsOpen={(updateOpen: boolean) => {
            setIsOpen(updateOpen);
            setIsShareOpen(updateOpen);
          }}
        >
          <EventShareTooltip eventUrl={eventUrl} />
        </EventOverflowTooltip>
      )}
    </div>
  );
}
