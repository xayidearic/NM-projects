import { useState } from 'react';

import { EventItems } from '../utils';
import EventModal from '../EventModal/EventModal';

const EventTitle = ({ event }: EventItems) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggle = () => setIsModalOpen(!isModalOpen);

  return (
    <>
      <button
        className="button--link h4 link--external text-start"
        onClick={toggle}
      >
        {event.title}
      </button>

      {isModalOpen && (
        <EventModal
          event={event}
          toggle={toggle}
        />
      )}
    </>
  );
};

export default EventTitle;
