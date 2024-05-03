import { useCallback, useEffect, useState } from 'react';

import CommentEditor from '../editor/CommentEditor';
import LikeButton from './LikeButton';
import { ReplyButton } from './ReplyButton';
import { ShareButton } from './ShareButton';
import { CommentThreadList, ViewThreadButton } from './ViewThreadButton';
import { useGetNestedCommentsQuery } from '../../dux/commentsService';

/**
 *
 * @param {Obect} props
 * @param {boolean} props.likedByCurrentUser - The current user's like status
 * @param {number} props.likesCount - The total number of likes
 * @param {string} props.id - The comment id
 * @param {boolean} props.hasChildren - The comment has children/replies
 * @returns Like, Reply, View Thread, Share buttons, and Comment Editor
 * @returns Comment Thread/respies List component
 * Api hook fetches nested comments on view thread button click
 */
export const CommentActions = ({ likedByCurrentUser, likesCount, id, hasChildren, canHaveChildren }) => {
  const [viewThread, setViewThread] = useState(false);
  const [viewEditor, setViewEditor] = useState(false);
  const [showThreadButn, setShowThreadButn] = useState(hasChildren);
  const [skipFetch, setSkipFetch] = useState(true);
  const [replyData, setReplyData] = useState(null);
  const { data, refetch } = useGetNestedCommentsQuery(id, { skip: skipFetch });

  useEffect(() => {
    data && setReplyData(data);
    viewThread && setSkipFetch(false);
  }, [data, viewThread]);

  const toggleEditorView = () => setViewEditor(!viewEditor);

  const toggleThreadView = () => setViewThread(!viewThread);

  const refetchThread = useCallback(() => {
    viewThread && refetch();
    setShowThreadButn(true);
  }, [refetch, viewThread]);

  return (
    <>
      <div className="comment__footer d-flex justify-content-between align-items-center mb-8">
        <div className="d-flex">
          <LikeButton likedByCurrentUser={likedByCurrentUser} likesCount={likesCount} id={id} />
          {canHaveChildren && <ReplyButton toggleEditorView={toggleEditorView} />}
          {showThreadButn && <ViewThreadButton viewThread={viewThread} toggleThreadView={toggleThreadView} />}
        </div>
        <ShareButton id={id} />
      </div>

      {viewEditor && (
        <CommentEditor mainEditor={false} refetch={refetchThread} id={id} threadIsOpen={viewThread} toggleEditorView={toggleEditorView} />
      )}

      {viewThread && replyData && <CommentThreadList data={replyData.Data} id={id} />}
    </>
  );
};
