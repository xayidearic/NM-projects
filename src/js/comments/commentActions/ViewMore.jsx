import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useGetArticleCommentsQuery } from '../../dux/commentsService';
import CommentList from '../CommentList';
import { CommentThreadList } from './ViewThreadButton';

/**
 *
 * @param {Object} props - The props for this component
 * @param {string} props.id - The id of the article
 * @param {number} props.nextSet - The next set of comments
 * @param {boolean} props.viewThreads - Flags if the comment replies is open
 * @returns {JSX.Element} View more comments button for both the Article and the Comment Thread
 * Api hook only fetches data when button is clicked not on initial render (skipFetch)
 * Checks if there are more comments to display
 * Button only appears if there are more comments to display and button is not already rendered
 */
export const ViewMore = ({ id, nextSet, viewThreads }) => {
  const [skipFetch, setSkipFetch] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [buttnExists, setButtonExists] = useState(false);
  const orderBy = useSelector((state) => state.parameters.orderBy);

  const { data } = useGetArticleCommentsQuery({ id, nextSet, orderBy }, { skip: skipFetch });

  useEffect(() => {
    data && setHasMore(data?.Data.HasMore);
  }, [data, hasMore]);

  const handleViewMore = () => {
    setButtonExists(true);
    setSkipFetch(!skipFetch);
  };

  return (
    <>
      {data && !viewThreads && (
        <div>
          <CommentList res={data.Data} />
        </div>
      )}

      {data && viewThreads && (
        <div>
          <CommentThreadList data={data.Data} id={id} />
        </div>
      )}

      {hasMore && !buttnExists && (
        <div className="row mt-4">
          <button className="button button--secondary bg-white mx-auto mt-5 view-more" onClick={() => handleViewMore()}>
            View More
          </button>
        </div>
      )}
    </>
  );
};
