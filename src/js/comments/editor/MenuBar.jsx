import { useCallback } from 'react';

/**
 * This components holds the formatting options
 * @param {object} editor
 * @param {function} linkInputHandler state to show the link input field
 * @returns editor buttons (bold/italic/ordered/unordered list)
 * Each button contains a chain of commands - https://tiptap.dev/guide/menus#commands
 */
const MenuBar = ({ editor, linkInputHandler }) => {
  const openLink = useCallback(() => {
    linkInputHandler(true);
  }, [linkInputHandler]);

  if (!editor) {
    return null;
  }

  return (
    <div className="editor-menu-bar position-absolute">
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={`h-auto me-1 ${editor.isActive('bold') ? 'is-active' : ''}`}
      >
        <img width="22" height="22" src="/Content/Images/icons/icon_bold.svg" title="Bold" />
      </button>
      <button 
        onClick={() => editor.chain().focus().toggleItalic().run()} 
        className={`h-auto me-1 ${editor.isActive('italic') ? 'is-active' : ''}`}>
        <img width="22" height="22" src="/Content/Images/icons/icon_italic.svg" title="Italic" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`h-auto me-1 ${editor.isActive('bulletList') ? 'is-active' : ''}`}
      >
        <img width="22" height="22" src="/Content/Images/icons/icon_list-bullet.svg" title="Dotted list"></img>
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`h-auto me-1 ${editor.isActive('orderedList') ? 'is-active' : ''}`}
      >
        <img width="22" height="22" src="/Content/Images/icons/icon_list-numbered.svg" title="Numbered list" />
      </button>
      <button onClick={openLink} className={`h-auto me-1 ${editor.isActive('link') ? 'is-active' : ''}`}>
        <img title="Hyperlink" src="/Content/Images/icons/icon_link.svg" height="22" width="22" />
      </button>
    </div>
  );
};

export default MenuBar;
