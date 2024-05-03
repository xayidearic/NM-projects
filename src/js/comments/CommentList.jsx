import { createComponents } from '@dwwp/create-components';

import { CommentActions } from './commentActions/CommentActions';
import { CommentHeader } from './CommentHeader';
import { FlagButton } from './commentActions/FlagButton';
import { ViewMore } from './commentActions/ViewMore';
import { useSelector } from 'react-redux';

/**
 *
 * @param {Object} props
 * @param {string} props.comment - The comment body
 * Uses decodeURIComponent to decode the comment body & createComponents to render the comment body
 */
export const CommentContent = ({ comment }) => {
  const decodedComment = decodeURIComponent(comment);

  return (
    <div className="my-5">
      <div className="p1 ps-3 text-break">{createComponents(decodedComment)}</div>
    </div>
  );
};

/**
 *
 * @param {Object} props
 * @param {Object} props.res - The response object
 * Decouple response object and display comment
 * @returns Each Comment component UI
 */
export const Comment = ({ res }) => {
  const {
    AuthorName,
    LikedByCurrentUser,
    CanHaveChildren,
    FlaggedByCurrentUser,
    Comment: {
      Data: { Author, Created, Id, HasChildren, Body },
      Extension: { LikesCount },
    },
  } = res;

  return (
    <div className="comments__list">
      <div className="comment">
        <div id="tooltipOverlay" className="tooltip-overlay d-none"></div>
        <div className="comment__body">
          <div className="d-flex justify-content-between align-items-center position-relative">
            <CommentHeader authorName={AuthorName} authorId={Author.Id} dateCreated={Created} />
            <FlagButton id={Id.Id} flagged={FlaggedByCurrentUser} />
          </div>
          <CommentContent comment={Body} />
        </div>
        <CommentActions
          likedByCurrentUser={LikedByCurrentUser}
          likesCount={LikesCount}
          id={Id.Id}
          hasChildren={HasChildren}
          canHaveChildren={CanHaveChildren}
        />
      </div>
    </div>
  );
};

/**
 *
 * @param {Object} props - The props for this component
 * @param {Object} props.res - The response object
 * @returns Comment list wrapper
 * Loop through the comments and display them
 * If there are more comments, display the view more button
 */
const CommentList = ({ res }) => {
  const pageId = useSelector((state) => state.parameters.articleId);

  return (
    <>
      {res?.Comments.length > 0 ? (
        <>
          {res.Comments.map((comment, key) => (
            <Comment key={key} res={comment} />
          ))}
        </>
      ) : null}

      {res?.HasMore && <ViewMore id={pageId} nextSet={res.Skip} />}
    </>
  );
};

export default CommentList;
