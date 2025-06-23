import classNames from 'classnames';

interface EventOverflowTooltipProps {
  className?: string;
  children?: React.ReactNode;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export function EventOverflowTooltip({ children, className, isOpen = false, setIsOpen } : EventOverflowTooltipProps) {
  return (
    <div className={classNames(['overflow-tool-tip', 'overflow-tool-tip--larger', className, { ['d-none']: !isOpen }])}>
      <button className="overflow-tool-tip__close d-flex align-items-center" onClick={() => setIsOpen(!isOpen)} type="button">
        <img className="icon--small me-3" src="/Content/Images/icons/cross_icon.svg" alt="close overflow" />
        <p className="metadata brand__blue-enabled">Close</p>
      </button>
      <div className="overflow-tool-tip__content">{children}</div>
    </div>
  );
}
