import { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/client';

import { Comment } from './CommentList';
import store from '../store';
import { registerCustomElement } from '../app/registerCustomElement';
import { useGetCommentQuery } from '../dux/commentsService';

/**
 *
 * @param {function} props.handleModalClose - Function to close the modal
 * @returns {JSX.Element} Modal header for linked comment
 */
const LinkedCommentModalHeader = ({ handleModalClose }) => {
  return (
    <div className="modal-header">
      <h5 className="modal-title">Linked comment</h5>
      <button type="button" className="close border-0 bg-white comments--close" onClick={handleModalClose}>
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  );
};

/**
 * Closes the linked comment modal
 * @returns {JSX.Element} Close button for linked comment modal
 */
const CloseLinkedCommentModal = ({ handleModalClose }) => {
  return (
    <div className="modal-footer">
      <button type="button" className="comments--close btn btn-primary fs-4" onClick={handleModalClose}>
        Close
      </button>
    </div>
  );
};

/**Deconstruct comment id query string from URL*/
const url = new URLSearchParams(window.location.search);
const urlCommentId = url.get('commentId');

/**
 *
 * @returns Linked comment modal
 * Fetches the linked comment ID from the URL
 * Fetches the linked comment from the API
 * Displays the linked comment in a modal
 * Closes the modal on button click
 * @returns {JSX.Element} Linked comment modal
 */
export const LinkedCommentModal = () => {
  const [skipFetch, setSkipFetch] = useState(true);
  const [closeModal, setCloseModal] = useState(false);
  const { data } = useGetCommentQuery(urlCommentId, { skip: skipFetch });

  useEffect(() => {
    if (urlCommentId) {
      setSkipFetch(false);
    }
  }, [data]);

  const handleModalClose = () => {
    setCloseModal(true);
  };

  return (
    data &&
    !closeModal && (
      <div id="linked-comment-modal" className="modal show comments__list d-block" tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <LinkedCommentModalHeader handleModalClose={handleModalClose} />
            <div className="modal-body">
              <div className="row">
                <div id="linked-comment-modal-content" className="col px-5">
                  {data?.Data && <Comment res={data.Data} />}
                </div>
              </div>
            </div>
            <CloseLinkedCommentModal handleModalClose={handleModalClose} />
          </div>
        </div>
      </div>
    )
  );
};

class LinkedCommentModalClass extends HTMLElement {
  connectedCallback() {
    const root = createRoot(this);
    root.render(
      <Provider store={store}>
        <LinkedCommentModal />
      </Provider>
    );
  }
}

registerCustomElement('dc-linked-comment-modal', LinkedCommentModalClass);
