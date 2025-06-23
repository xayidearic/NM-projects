import classNames from "classnames";

import { EventItems } from "../utils";
import Styles from "./EventCTA.module.scss";

const EventCTA = ({ event }: EventItems) => {
  if (!event.ctaText) {
    return null;
  }

  return (  
    <a href={event.urlForCTA}
      className={classNames(Styles.eventCta, 'button button--secondary m-0 mt-6')}
      target={event.ctaTarget}
      title={event.ctaTitle}
    >{event.ctaText}</a>
  );
}

export default EventCTA;