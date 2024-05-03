import { useDispatch, useSelector } from 'react-redux';
import { setParams } from '../../dux/commentsSlice';

/**
 * CloseModalButton component
 * Dispatches the action to close the modal
 * @returns Close button component
 */
export const CloseModalButton = () => {
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(setParams({ openModal: false }));
  };

  return (
    <button className="comments--close me-3 d-flex align-items-center button--link" onClick={() => handleClose()}>
      <img src="/Content/Images/icons/cross_icon.svg" alt="Close" />
    </button>
  );
};

/**
 *
 * @param {Object} props
 * @param {number} props.count - The total number of comments
 * @returns {JSX.Element} Comments header with the total number of comments
 */
export const CommentsHeader = () => {
  const count = useSelector((state) => state.parameters.articleCommentCount);

  return (
    <div className="d-flex justify-content-between align-items-center">
      <h2 className="weight-600">
        Comments{' '}
        <span className="weight-200">
          (<span className="total-comment-count weight-200">{count}</span>)
        </span>
      </h2>
      <CloseModalButton />
    </div>
  );
};
