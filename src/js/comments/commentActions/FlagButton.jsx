import { useEffect, useState } from 'react';
import { useFlagCommentMutation } from '../../dux/commentsService';

/**
 * Flag button component
 * @param {Object} props - Flag button component
 * @param {string} props.id - The id of the comment being flagged
 * @param {boolean} props.flagged - The flag status of the comment
 * @returns {JSX.Element} Element with flag button
 * button that opens a tooltip to flag a comment
 */
export const FlagButton = ({ id, flagged }) => {
  const [isFlagged, setIsFlagged] = useState(flagged);
  const [viewTooltip, setViewTooltip] = useState(false);
  // Open the tooltip for the flag button
  const handleViewTooltip = () => {
    setViewTooltip(true);
  };

  return (
    <>
      <button
        className="overflow-tool-tip-button flag-button accessible-hover"
        title="Open tooltip for this post"
        onClick={() => handleViewTooltip()}
      >
        <img className="icon" src="/Content/Images/icons/overflow_icon.svg" alt="open overflow" />
      </button>
      {viewTooltip && <FlagTooltip id={id} isFlagged={isFlagged} setIsFlagged={setIsFlagged} setViewTooltip={setViewTooltip} />}
    </>
  );
};

/**
 * Flag Tooltip component
 * @param {Object} props - Flag content component
 * @param {string} props.id - The id of the comment being flagged
 * @param {boolean} props.flagged - The flag status of the comment
 * @param {Function} props.setViewTooltip - Function to set the view of the tooltip
 * @returns {JSX.Element} Element with flag tooltip content
 * Uses the useFlagCommentMutation hook to POST the flag comment mutation
 */
const FlagTooltip = ({ id, isFlagged, setIsFlagged, setViewTooltip }) => {
  const [flagMutation, { data }] = useFlagCommentMutation();

  useEffect(() => {
    data && setIsFlagged(data.Data.Flagged);
  }, [data, setIsFlagged]);

  const handleFlagPost = () => {
    flagMutation(id);
  };

  const handleClose = () => {
    setViewTooltip(false);
  };

  return (
    <div className="overflow-tool-tip overflow-tool-tip--flag">
      <button className="overflow-tool-tip__close d-flex position-absolute justify-content-end align-items-center" onClick={handleClose}>
        <p className="metadata brand__blue-enabled">Close</p>
        <img className="ms-2" src="/Content/Images/icons/cross_icon.svg" alt="close overflow" />
      </button>
      <div className="overflow-tool-tip__content--flag-comment">
        <div className="align-items-center d-flex overflow-tool-tip__copy">
          <button className="d-flex text-decoration-none align-items-center" onClick={handleFlagPost}>
            <img className="me-3" src={`/Content/Images/icons/${isFlagged ? 'flagged_icon.svg' : 'security_icon.svg'}`} />
            <p className="p2 text-nowrap">Flag comment for review</p>
          </button>
        </div>
      </div>
    </div>
  );
};
