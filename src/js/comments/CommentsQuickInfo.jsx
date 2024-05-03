import { createRoot } from 'react-dom/client';
import { Provider, useDispatch, useSelector } from 'react-redux';
import store from '../store';
import { setParams } from '../dux/commentsSlice';
import { registerCustomElement } from '../app/registerCustomElement';
import { useEffect, useState } from 'react';
import { usePostArticleLikeMutation } from '../dux/commentsService';

export const SeeAllCommentsLink = () => {
  const openModal = useSelector((state) => state.parameters.openModal);
  const dispatch = useDispatch();

  const viewModal = () => {
    dispatch(setParams({ openModal: true }));
  };

  return (
    <button className="open-comments d-flex align-items-center comments-arrow" onClick={() => viewModal()}>
      <span className="eyebrow brand__blue-enabled me-4">See All Comments</span>
      <img
        className="icon--small icon--blue-primary"
        src={`/Content/Images/icons/arrow-${openModal ? 'right.svg' : 'left.svg'}`}
        alt="open comments"
      />
    </button>
  );
};

const LikeArticleButton = ({ articleLikeCount, pageId, liked }) => {
  const [count, setCount] = useState(articleLikeCount);
  const [isLiked, setIsLiked] = useState(liked);
  const [postLikeMutation, { data }] = usePostArticleLikeMutation(pageId, { skip: true });

  useEffect(() => {
    if (data) {
      setCount(data.Data.LikesCount);
      setIsLiked(data.Data.Liked);
    }
  }, [data]);

  const handleLike = () => {
    postLikeMutation(pageId);
  };

  return (
    <div className="d-flex align-items-center me-3" title="Like">
      <button className="news-article__like-btn button--link" onClick={() => handleLike()}>
        <img id="page-like-icon" alt="like" src={`/Content/Images/icons/heart${isLiked ? 'ed' : ''}_icon.svg`} className="liked" />
      </button>
      <span id="total-page-likes-count" className="eyebrow ms-2 brand__blue-enabled">
        {count ? count : '0'}
      </span>
    </div>
  );
};

const CommentArticleButton = () => {
  const commentCount = useSelector((state) => state.parameters.articleCommentCount);
  const dispatch = useDispatch();

  const openModal = () => {
    dispatch(setParams({ openModal: true }));
  };

  return (
    <div className="open-comments d-flex align-items-center" title="Comment count" onClick={() => openModal()}>
      <img className="icon--medium" src="/Content/Images/icons/comment_icon.svg" alt="comment count" />
      <span className="total-comment-count eyebrow ms-2 brand__blue-enabled">{commentCount ? commentCount : '0'}</span>
    </div>
  );
};

const CommentsQuickInfo = ({ articleLikeCount, pageId, liked }) => {
  return (
    <div className="news-article__comments-quick-info d-flex justify-content-between">
      <div className="d-flex">
        <LikeArticleButton articleLikeCount={articleLikeCount} pageId={pageId} liked={liked} />
        <CommentArticleButton />
      </div>
      <SeeAllCommentsLink />
    </div>
  );
};

class CommentInfo extends HTMLElement {
  connectedCallback() {
    const root = createRoot(this);
    root.render(
      <Provider store={store}>
        <CommentsQuickInfo
          articleLikeCount={this.getAttribute('like-count')}
          pageId={this.getAttribute('page-id')}
          liked={this.getAttribute('liked')}
        />
      </Provider>
    );
  }
}

registerCustomElement('dc-comments-quick-info', CommentInfo);
