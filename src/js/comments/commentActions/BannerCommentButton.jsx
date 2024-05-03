import { createRoot } from 'react-dom/client';
import { registerCustomElement } from '../../app/registerCustomElement';
import { Provider, useDispatch } from 'react-redux';
import store from '../../store';
import { setParams } from '../../dux/commentsSlice';

export const BannerCommentButton = () => {
  const dispatch = useDispatch();

  const openModal = () => {
    dispatch(setParams({ openModal: true }));
  };

  return (
    <button title="Open Comments" className="open-comments p-0" onClick={() => openModal()}>
      <img className="icon--large icon--light-blue" src="/Content/Images/icons/comment_icon.svg" alt="open comments" />
    </button>
  );
};

class BannerCommentButtonClass extends HTMLElement {
  connectedCallback() {
    const root = createRoot(this);
    root.render(
      <Provider store={store}>
        <BannerCommentButton />
      </Provider>
    );
  }
}

registerCustomElement('dc-banner-comment-button', BannerCommentButtonClass);
