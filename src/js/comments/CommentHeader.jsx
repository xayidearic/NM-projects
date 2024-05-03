import { getTimeDiff } from '../components/getTimeDiff';

export const CommentHeader = ({ authorName, authorId, dateCreated }) => {
  return (
    <div className="d-flex">
      <a className="comment__photo avatar accessible-hover accessible-hover--round" target="_blank" href={`/en/profile?lanId=${authorId}`}>
        <img alt={`Profile image for ${authorName}`} className="w-100" src={`/api/Workday/ProfileImage/${authorId}`} />
      </a>
      <div className="flex-column">
        <div className="d-flex">
          <a href={`/en/profile?lanId=${authorId}`} className="brand__blue-primary weight-400 p1 text-decoration-none mb-2" target="_blank">
            {authorName}
          </a>
        </div>
        <p className="comment__body-date metadata">{getTimeDiff(dateCreated)}</p>
      </div>
    </div>
  );
};
