import { useCallback, useState } from 'react';

/**
 * Link input component
 * @param {object} editor
 * @param {function} linkInputHandler state to hide the link input field
 * @returns link button accept/cancel
 */
const CreateLink = ({ editor, linkInputHandler }) => {
  const previousUrl = editor.getAttributes('link').href;
  const [linkValue, setLinkValue] = useState(previousUrl ? previousUrl : '');

  const setLink = useCallback(() => {
    // cancelled
    if (linkValue === null) {
      return;
    }

    // empty
    if (linkValue === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();

      return;
    }

    // update link
    editor.chain().focus().extendMarkRange('link').setLink({ href: linkValue }).run();

    //remove input
    linkInputHandler(false);
  }, [editor, linkInputHandler, linkValue]);

  const unsetLink = useCallback(() => {
    editor.chain().focus().unsetLink().run();
    linkInputHandler(false);
    setLinkValue('');
  }, [editor, linkInputHandler]);

  const handleLinkChange = (event) => {
    setLinkValue(event.target.value);
  };

  return (
    <>
      <div className="hyperlink-prompt input-group mb-3 mt-5">
        <input placeholder="Your hyperlink here" className="form-control" type="text" value={linkValue} onChange={handleLinkChange}></input>
        <button className="h-auto btn btn-primary" onClick={setLink}>
          Accept
        </button>
        <button className="h-auto btn btn-danger" onClick={unsetLink}>
          Cancel
        </button>
      </div>
    </>
  );
};

export default CreateLink;
