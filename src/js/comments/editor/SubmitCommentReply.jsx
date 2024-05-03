import { useEffect, useState } from 'react';
import { usePostCommentMutation } from '../../dux/commentsService';
import { useSelector } from 'react-redux';
import { selectParams } from '../../dux/commentsSlice';

/**
 * Comment button/guidelines container
 * @param {object} editor
 * @param {string} editorContent content with HTML format
 * @param {object} isMainEditor
 * @param {object} id
 * @returns button, guidelines, validation alert msg
 */
export const SubmitCommentReply = ({ editor, editorContent, refetchThread, id, threadIsOpen, toggleEditorView }) => {
  const [disabled, setDisabled] = useState(false);
  const params = useSelector(selectParams);
  const articleId = params.articleId;
  const pageTitle = params.pageTitle;

  const payload = {
    contentId: articleId,
    commentId: id,
    subject: pageTitle,
    body: editorContent,
  };

  const [postCommentMutation, { data }] = usePostCommentMutation(payload);

  useEffect(() => {
    if (data) {
      setDisabled(false);
      editor.commands.clearContent(true);
      refetchThread();
      toggleEditorView();
    }
  }, [data, editor, refetchThread, threadIsOpen, toggleEditorView]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setDisabled(true);
    postCommentMutation(payload);
  };

  return (
    <div className="comment-reply__button text-align-end">
      <div className="comments-alert alert d-none mt-5"></div>

      <button type="submit" className="button button--primary-blue" disabled={disabled} onClick={handleSubmit}>
        Leave A Comment
      </button>
    </div>
  );
};
