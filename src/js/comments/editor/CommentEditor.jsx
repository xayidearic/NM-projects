/** General Editor dependencies */
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import StarterKit from '@tiptap/starter-kit';

/** Depencies that help parse editor content to HTML format to submit data */
import BulletList from '@tiptap/extension-bullet-list';
import Bold from '@tiptap/extension-bold';
import Document from '@tiptap/extension-document';
import Italic from '@tiptap/extension-italic';
import ListItem from '@tiptap/extension-list-item';
import OrderedList from '@tiptap/extension-ordered-list';
import Paragraph from '@tiptap/extension-paragraph';
import { generateHTML, useEditor, EditorContent } from '@tiptap/react';
import Text from '@tiptap/extension-text';
import { useState, useEffect } from 'react';
import CreateLink from './CreateLink.jsx';

import MenuBar from './MenuBar.jsx';
import { SubmitCommentReply } from './SubmitCommentReply.jsx';
import { SubmitArticleComment } from './SubmitArticleComment.jsx';

/**
 * Editor creator
 * @returns Editor + Menu Bar
 * Hooking into editor event onUpdate()
 * List of events that editor fires https://tiptap.dev/api/events
 */
const CommentEditor = ({ mainEditor, refetch, id, threadIsOpen, toggleEditorView }) => {
  const [editorContent, setEditorContent] = useState(null); // handles state of editor content
  const [contentHTML, setContentHTML] = useState('');
  const [viewLinkInput, setViewLinkInput] = useState(false);

  const linkInputHandler = (linkStatus) => {
    setViewLinkInput(linkStatus);
  };

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: 'What are your thoughts?',
      }),
      Link.configure({
        autolink: false,
        openOnClick: false,
        HTMLAttributes: {
          rel: '',
          target: '_self',
        },
      }),
    ],
    editorProps: {
      attributes: {
        class: 'comments__form-container rounded pt-4 px-4 text-field mt-5',
      },
    },
    onUpdate({ editor }) {
      /** store json on editorContent */
      setEditorContent(editor.getJSON());
    },
  });

  /** Tracks when editorContent has JSON, to generate the HTML for comment to submit */
  useEffect(() => {
    if (editorContent) {
      setContentHTML(
        encodeURIComponent(generateHTML(editorContent, [Document, Paragraph, Text, Bold, Italic, ListItem, BulletList, OrderedList, Link]))
      );
    }
  }, [editorContent]);

  return (
    <div className="comment-reply">
      {viewLinkInput && <CreateLink editor={editor} linkInputHandler={linkInputHandler} />}
      <div className="position-relative">
        <EditorContent editor={editor} />
        <MenuBar editor={editor} linkInputHandler={linkInputHandler} />
      </div>

      {mainEditor && <SubmitArticleComment editor={editor} editorContent={contentHTML} refetchComments={refetch} />}

      {!mainEditor && (
        <SubmitCommentReply
          editor={editor}
          editorContent={contentHTML}
          refetchThread={refetch}
          id={id}
          threadIsOpen={threadIsOpen}
          toggleEditorView={toggleEditorView}
        />
      )}
    </div>
  );
};

export default CommentEditor;
