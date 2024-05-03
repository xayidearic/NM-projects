import DOMPurify from 'dompurify';
import ReactDOM from 'react-dom/client';

import TipTapEditor from './TipTapEditor.jsx';

let textEditorTemplate = '';

/**
 * builds out the comment text editor wrapper
 */
const textEditorHandler = (btn) => {
  const resultContainer = btn.closest('.comment__body').parentNode;
  const id = btn.getAttribute('data-id');
  if (!document.getElementById(`reply-section-${id}`)) {
    textEditorTemplate = `
        <div id="reply-section-${id}" class="comment-reply" style=""></div>`;

    const sanitizeTextEditorContainer = DOMPurify.sanitize(textEditorTemplate);
    resultContainer.insertAdjacentHTML('afterend', sanitizeTextEditorContainer);

    const container = document.getElementById(`reply-section-${id}`);
    const root = ReactDOM.createRoot(container);
    root.render(<TipTapEditor mainEditor={false} commentId={id} />);
  } else {
    document.getElementById(`reply-section-${id}`).remove();
  }
};

export default textEditorHandler;
