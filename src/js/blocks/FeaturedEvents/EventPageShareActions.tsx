import { createRoot } from 'react-dom/client';
import { useEffect, useState, useRef } from 'react';

import { registerCustomElement } from '../../app/registerCustomElement.ts';
import { EventShareTooltip } from './EventShareToolTip/EventShareToolTip.tsx';
import { Event, EventDownloadButton } from './EventDownloadButton.tsx';
import { EventOverflowTooltip } from './EventOverflowTooltip.tsx';

const eventIcsAttr = 'event-ics';
const eventUrlAttr = 'event-url';


interface EventPageShareActionsProps {
  ics: Event;
  url: string;
}

export function EventPageShareActions({ ics, url }: EventPageShareActionsProps) {
  const [isShareOpen, setIsShareOpen] = useState<boolean>(false);
  const shareActionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (shareActionRef.current) {
      const element = shareActionRef.current;

      window.addEventListener('click', (event) => {
        const target = event.target as HTMLElement;
        if (!element.contains(target)) {
          setIsShareOpen(false);
        }
      });
    }
  }, []);

  return (
    <div className="d-flex flex-column py-3 ps-4 bg-neutral-cloud mt-4 position-relative" ref={shareActionRef}>
      <button className="overflow-tooltip-share-open link link--external mb-2 weight-500" onClick={() => setIsShareOpen(true)}>
        <span className="me-2">
          <img className="icon icon--small mb-1" src="/Content/Images/icons/share_icon.svg" alt="share event icon" />
        </span>
        Share Event
        <span className="ms-2">
          <img className="icon icon--xs" src="/Content/Images/icons/arrow-right_icon.svg" alt="share event icon" />
        </span>
      </button>
      <EventDownloadButton ics={ics}>
        <span className="link link--external">
          <span className="me-2">
            <img className="icon icon--small mb-1" src="/Content/Images/icons/download_icon.svg" alt="download event icon" />
          </span>
          Download Event
          <span className="ms-2">
            <img className="icon icon--xs" src="/Content/Images/icons/arrow-right_icon.svg" alt="download event icon" />
          </span>
        </span>
      </EventDownloadButton>

      {/* Share tooltip */}
      <EventOverflowTooltip className="top-0" isOpen={isShareOpen} setIsOpen={setIsShareOpen}>
        <EventShareTooltip eventUrl={url} />
      </EventOverflowTooltip>
    </div>
  );
}

class EventPageShareActionsElement extends HTMLElement {
  connectedCallback() {
    const ics = JSON.parse(this.getAttribute(eventIcsAttr) ?? '{}');
    const url = this.getAttribute(eventUrlAttr) ?? '';
    const root = createRoot(this);

    root.render(<EventPageShareActions ics={JSON.parse(ics)} url={url} />);
  }
}

registerCustomElement('dc-event-share-actions', EventPageShareActionsElement);
