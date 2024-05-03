/**
 * @param {Object} props
 * @param {Function} props.toggleEditorView - Toggles the editor view
 * @returns {JSX.Element} - Reply button that toggles the editor view
 */
export const ReplyButton = ({ toggleEditorView }) => {
  return (
    <button className="comment-btn d-flex align-items-center me-2 me-md-4 px-0" title="Reply to this post" onClick={toggleEditorView}>
      <img className="icon me-2" src="/Content/Images/icons/comment_icon.svg" />
      <p className="metadata brand__blue-enabled">Reply</p>
    </button>
  );
};
