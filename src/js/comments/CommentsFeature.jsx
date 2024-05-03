import { createRoot } from 'react-dom/client';
import { registerCustomElement } from '../app/registerCustomElement';
import { useDispatch, useSelector } from 'react-redux';
import { Provider } from 'react-redux';
import { useCallback, useEffect, useState } from 'react';

import CommentEditor from './editor/CommentEditor';
import CommentList from './CommentList';
import store from '../store';
import { setParams } from '../dux/commentsSlice';
import SortCommentsDropdown from './SortCommentsDropdown';
import { useGetArticleCommentsQuery } from '../dux/commentsService';
import { CommentsHeader } from './commentActions/CommentsHeader';

const CommentsDivider = () => {
  return <div className="section-divider section-divider--gray w-100" />;
};

/**
 *
 * @param {Object} props - The props with `pageId` string
 * @param {string} props.pageId - Id of the page
 * @param {string} props.pageTitle - Title of the page
 * @returns {JSX.Element} Main Comment Modal components
 * Fetches the Main comments for the article
 * Dispatches state change for articleId in the store
 * refetches the comments on Post Comment to get new set of comments
 */
export const CommentsFeature = ({ pageId, pageTitle }) => {
  const openModal = useSelector((state) => state.parameters.openModal);
  const orderBy = useSelector((state) => state.parameters.orderBy);
  const [res, setRes] = useState(null);
  const dispatch = useDispatch();
  const { data, refetch } = useGetArticleCommentsQuery({ id: pageId, nextSet: 0, orderBy });

  useEffect(() => {
    setRes(data);
    data && dispatch(setParams({ articleId: pageId, articleCommentCount: data.Data.TotalCount, pageTitle }));
    const handleClickOutsideModal = (event) => {
      if (openModal) {
        let modal = document.querySelector('.modal');
        if (modal.contains(event.target)) {
          dispatch(setParams({ openModal: false }));
        }
      }
    };

    document.addEventListener('click', handleClickOutsideModal);
  }, [dispatch, pageId, openModal, data, pageTitle, orderBy]);

  const refetchComments = useCallback(() => {
    setRes(null);
    refetch();
  }, [refetch]);

  return (
    openModal && (
      <>
        <div className="modal p-0 d-block"></div>
        <div className="comments">
          <CommentsHeader />
          <CommentsDivider />
          <CommentEditor mainEditor={true} refetch={refetchComments} />
          <CommentsDivider />
          <SortCommentsDropdown />
          {res && <CommentList res={res.Data} />}
        </div>
      </>
    )
  );
};

class CommentsClass extends HTMLElement {
  connectedCallback() {
    const root = createRoot(this);
    root.render(
      <Provider store={store}>
        <CommentsFeature pageId={this.getAttribute('page-id')} pageTitle={this.getAttribute('page-title')} />
      </Provider>
    );
  }
}

registerCustomElement('dc-comments-feature', CommentsClass);
