export const GuidelinesToolTip = () => {
  return (
    <div className="tool-tip tool-tip--comments d-flex align-items-center col-sm-5 mb-2 mb-sm-0" tabIndex={0}>
      <div className="tool-tip__content tool-tip__content--comments">
        <div className="tool-tip__carrot">
          <img src="/Content/Images/icons/tooltip-carrot-top_icon.svg" alt="bottom arrow" />
        </div>
        <p className="metadata">Comments are moderated by the communications team and saved by compliance.</p>
      </div>
      <img className="ps-2" src="/Content/Images/icons/security_icon.svg" alt="guidelines" />
      <p className="legal brand__blue-primary ms-2">Guidelines &amp; Data Privacy</p>
    </div>
  );
};
