import { useEffect, useState } from 'react';
import { useCommentLikeMutation } from '../../dux/commentsService';

/**
 * Custom hook to handle like button for comments
 * @param {Object} props
 * @param {Boolean} props.likedByCurrentUser - If the current user has liked the comment
 * @param {Number} props.initialLikesCount - Number of likes the comment has
 * @returns
 */
const useLikeButton = (initialLikedByCurrentUser, initialLikesCount) => {
  const [likedByCurrentUser, setLikedByCurrentUser] = useState(initialLikedByCurrentUser);
  const [likesCount, setLikesCount] = useState(initialLikesCount);
  const [commentLikeMutation, { data }] = useCommentLikeMutation();

  useEffect(() => {
    if (data) {
      setLikedByCurrentUser(data.Data.Liked);
      setLikesCount(data.Data.LikesCount);
    }
  }, [data]);

  const handleLike = (id) => {
    commentLikeMutation(id);
  };

  return { likedByCurrentUser, likesCount, handleLike };
};

/**
 * Like button for comments
 * @param {Object} props
 * @param {Boolean} props.likedByCurrentUser - If the current user has liked the comment
 * @param {Number} props.likesCount - Number of likes the comment has
 * @param {String} props.id - Comment ID
 *
 * @returns {JSX.Element} - Like button that:
 * keeps track of the number of likes
 * make a request to the server to like a comment
 */

const LikeButton = ({ likedByCurrentUser, likesCount, id }) => {
  const { likedByCurrentUser: isLiked, likesCount: likeCount, handleLike } = useLikeButton(likedByCurrentUser, likesCount);

  return (
    <button className="like-btn d-flex align-items-center me-2 me-md-4 pe-0" title="Like this post" onClick={() => handleLike(id)}>
      <div className="text-decoration-none">
        <img className="icon icon--small me-1 mb-1" src={`/Content/Images/icons/${isLiked ? 'hearted_icon' : 'heart_icon'}.svg`} alt="like" />
      </div>
      <p className="metadata brand__blue-enabled pe-2 like-count">{likeCount > 0 ? likeCount : ''}</p>
      <span className="metadata brand__blue-enabled">{likeCount > 1 ? 'Likes' : 'Like'}</span>
    </button>
  );
};

export default LikeButton;
