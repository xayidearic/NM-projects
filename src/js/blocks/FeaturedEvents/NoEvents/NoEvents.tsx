import Styles from './NoEvents.module.scss';

const NoEvents = () => {
    return (
        <div className="row flex-row align-items-center py-9 px-4">
            <div className="col-2 text-center">
                <img className={Styles.calendarIcon} src="/Content/Images/icons/event-calendar_icon.svg" alt="Calendar" />
            </div>

            <div className="col-10">
                <h3 className="brand__blue-primary font-500 mb-2">You have no featured events currently.</h3>
                <p className="p1">Stay tuned! Future featured events will appear here.</p>
            </div>
        </div>
    )
}

export default NoEvents;