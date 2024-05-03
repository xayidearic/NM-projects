import { useState } from 'react';

/**
 * Share button component
 * @param {Object} props - Share button component
 * @param {string} props.id - The id of the comment being shared
 * @returns {JSX.Element} Element with share button
 * Opens the tooltip for the share button
 */
export const ShareButton = ({ id }) => {
  const [viewTooltip, setViewTooltip] = useState(false);

  // Open the tooltip for the flag button
  const handleViewTooltip = () => {
    setViewTooltip(true);
  };

  return (
    <>
      <div className="position-relative">
        <button className="share-button d-flex" title="Share this post" onClick={handleViewTooltip}>
          <img className="icon icon--small me-2" src="/Content/Images/icons/share_icon.svg" alt="share comment" />
          <p className="metadata brand__blue-enabled">Share</p>
        </button>
        {viewTooltip && <ShareTooltip id={id} setViewTooltip={setViewTooltip} />}
      </div>
    </>
  );
};

/**
 * Share Tooltip component
 * @param {Object} props - Share Tooltip component
 * @param {string} props.id - The id of the comment being shared
 * @param {Function} props.setViewTooltip - Function to set the view of the tooltip
 * @returns {JSX.Element} Element with share tooltip content
 * function to copy the URL to the clipboard
 */
const ShareTooltip = ({ id, setViewTooltip }) => {
  const handleShareURLCreation = () => {
    const url = new URL(window.location.href);
    url.searchParams.set('commentId', id);
    navigator.clipboard.writeText(url.href);
    setViewTooltip(false);
  };

  return (
    <div className="overflow-tool-tip overflow-tool-tip--smaller">
      <div className="overflow-tool-tip__content">
        <button className="align-items-center overflow-tool-tip__content--share" onClick={handleShareURLCreation}>
          <img className="me-3" src="/Content/Images/icons/edit_icon.svg" alt="copy comment" />
          <p className="p2 text-nowrap">Copy URL to Clipboard</p>
        </button>
      </div>
    </div>
  );
};
