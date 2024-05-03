import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectParams } from '../../dux/commentsSlice';
import { usePostCommentMutation } from '../../dux/commentsService';
import { GuidelinesToolTip } from '../GuidelinesToolTip';

const payload = {};

const message = {
  empty: 'Comment cannot be empty',
  success: 'Saved!',
};

export const SubmitArticleComment = ({ editor, editorContent, refetchComments }) => {
  const [alert, setAlert] = useState(false);
  const [error, setError] = useState(false);
  const params = useSelector(selectParams);
  const articleId = params.articleId;
  const pageTitle = params.pageTitle;

  payload.contentId = articleId;
  payload.commentId = '';
  payload.subject = pageTitle;
  payload.body = editorContent;

  const [postCommentMutation, { data }] = usePostCommentMutation(payload);

  useEffect(() => {
    if (data) {
      editor.commands.clearContent(true);
      setAlert(true);
      refetchComments();
      setTimeout(() => {
        setAlert(false);
      }, 5000);
    }
  }, [data, editor, refetchComments]);

  const handleValidation = (e) => {
    e.preventDefault();
    editorContent === '%3Cp%3E%3C%2Fp%3E' || !editorContent ? setError(true) : postCommentMutation(payload);
  };

  return (
    <div className="row d-flex align-items-center justify-content-between mt-5">
      {alert && (
        <div className={`comments-alert alert mt-5 ${error ? 'alert-danger' : 'alert-success'}`}>{error ? message.empty : message.success}</div>
      )}
      <GuidelinesToolTip />

      <button type="submit" className="button button--primary-blue" onClick={handleValidation}>
        Leave A Comment
      </button>
    </div>
  );
};
