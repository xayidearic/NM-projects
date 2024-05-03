import { CommentActions } from './CommentActions';
import { CommentContent } from '../CommentList';
import { CommentHeader } from '../CommentHeader';
import { ViewMore } from './ViewMore';

/**
 *
 * @param {Object} props
 * @param {boolean} props.viewThread - Flag to show or hide the thread
 * @param {Function} props.toggleThreadView - Function to toggle the thread view
 * @returns Show replies button
 */
export const ViewThreadButton = ({ viewThread, toggleThreadView }) => {
  return (
    <button className="show-thread brand__blue-enabled button--link align-items-center" onClick={() => toggleThreadView()}>
      <div className="d-flex">
        <img
          className="me-2"
          src={`/Content/Images/icons/arrow-${viewThread ? 'up' : 'down'}_icon.svg`}
          alt={viewThread ? 'Show replies' : 'Hide replies'}
        />
        <p className="metadata brand__blue-enabled">{viewThread ? 'Hide' : 'Show'} Replies</p>
      </div>
    </button>
  );
};

/**
 *
 * @param {Object} props
 * @param {Object} props.data - nested comment data object
 * Decouple response object and display nested comments
 * @returns Comment Thread component
 */
export const CommentThread = ({ data }) => {
  return data.Comments.map(
    (
      {
        AuthorName,
        Comment: {
          Data: { Author, Created, Body, Id, HasChildren },
          Extension: { LikesCount },
        },
        LikedByCurrentUser,
      },
      key
    ) => {
      return (
        <div key={key} className="comment-reply">
          <CommentHeader authorName={AuthorName} authorId={Author.Id} dateCreated={Created} />
          <CommentContent comment={Body} />
          <CommentActions likedByCurrentUser={LikedByCurrentUser} likesCount={LikesCount} id={Id.Id} hasChildren={HasChildren} />
        </div>
      );
    }
  );
};

/**
 *
 * @param {Object} props
 * @param {Object} props.data - The response object with the nested comments
 * @param {string} props.id - The main comment's id
 * @returns Comment Thread List component
 * Maps through the nested comments and displays them
 * If there are more comments, display the view more button
 */
export const CommentThreadList = ({ data, id }) => {
  return (
    data && (
      <>
        <CommentThread data={data} />
        {data.HasMore && <ViewMore id={id} nextSet={data.Skip} viewThreads={true} />}
      </>
    )
  );
};
