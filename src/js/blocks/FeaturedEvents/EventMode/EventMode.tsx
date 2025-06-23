import classNames from 'classnames';
import Styles from '../FeaturedEvents/FeaturedEventsApp.module.scss';

const EventMode = ({ eventMode, modal, icon }: { eventMode: string, modal: boolean, icon: string }) => {
  return (
    <div className={classNames('d-flex align-items-center', modal ? 'col-6 mb-3 mb-md-0' : 'mt-3')}>
      <img className={classNames(Styles.icons, modal ? 'me-2' : 'me-1')} src={`/Content/Images/icons/${icon}_icon.svg`} alt='Event Mode' />
      <p className={classNames(modal ? 'p1' : 'metadata')}>{eventMode}</p>
    </div>
  );
}

export default EventMode;