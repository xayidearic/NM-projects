import classNames from "classnames";

import EventTime from "../EventTime/EventTime";
import Styles from "./Events.module.scss";
import { FeaturedEventData } from "../utils";
import EventImage from "../EventImage/EventImage";
import EventTitle from "../EventTitle/EventTitle";
import EventCTA from "../EventCTA/EventCTA";
import EventDate from "../EventDate/EventDate";
import EventMode from "../EventMode/EventMode";

export const Events = ({ events, isScrollable }: FeaturedEventData) => {
  console.log(events);

  return (
    <div
      className={classNames(
        isScrollable && Styles.scrollable,
        isScrollable ? "me-lg-4 me-2" : "me-lg-8 me-4",
        "mt-lg-8 mt-4 ms-lg-8 ms-4"
      )}
    >
      <div className="pe-2">
        {events.map((event, index) => (
          <div
            className={classNames(
              Styles.event,
              "col-12 d-flex",
              index === 0 ? "pb-6" : "py-lg-6 py-4"
            )}
            key={event.eventPageID}
          >
            <div className="col-5 d-flex justify-content-center flex-column">
              <EventImage event={event} isModalOpen={false} />
              <EventCTA event={event} />
            </div>

            <div className="col-6 ms-2">
              <EventTitle event={event} />

              <EventDate
                startDateIso={event.startDateIso}
                endDateIso={event.endDateIso}
                modal={false}
              />

              <EventTime
                startDate={event.startDateIso}
                endDate={event.endDateIso}
                modal={false}
              />

              <EventMode
                eventMode={event.eventMode}
                modal={false}
                icon={"mappin"}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
