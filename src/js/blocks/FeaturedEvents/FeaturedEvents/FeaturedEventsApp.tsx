import { createRoot } from 'react-dom/client';
import classNames from 'classnames';

import { Data } from '../utils.ts';
import Styles from '../FeaturedEvents/FeaturedEventsApp.module.scss';
import { Events } from '../Events/Events.tsx';
import { useEffect, useState } from 'react';
import { registerCustomElement } from '../../../app/registerCustomElement.ts';
import NoEvents from '../NoEvents/NoEvents.tsx';

const Header = () => {
  return (
    <div className={classNames(Styles.header)}>
      <h2 className="neutral__dark-gray py-4 py-lg-6 text-center">Featured Events</h2>
    </div>
  );
};

export const FeaturedEvents = ({ data }: Data) => {
  console.log(data);
  const [isScrollable, setIsScrollable] = useState(false);

  useEffect(() => {
    if (data.events.length >= 4) {
      setIsScrollable(true);
    }
  }, [data.events]);

  return (
    <div className={classNames(Styles.featuredEvents)}>
      <Header />
      <div className={classNames(isScrollable ? Styles.bodyScroll : Styles.body)}>
        {!data.events.length ? (
          <NoEvents />
        ) : (
          <Events
            events={data.events}
            isScrollable={isScrollable}
          />
        )}
      </div>
    </div>
  );
};

class FeaturedEventsApp extends HTMLElement {
  connectedCallback() {
    const root = createRoot(this);
    const data = this.getAttribute('event-data');

    root.render(<FeaturedEvents data={data ? JSON.parse(data) : {}} />);
  }
}

registerCustomElement('feature-events-block', FeaturedEventsApp);
