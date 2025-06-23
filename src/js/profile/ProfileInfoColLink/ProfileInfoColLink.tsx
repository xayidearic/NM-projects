import { useGetUserDataQuery } from '../../dux/lanIdApi';

const ProfileInfoColLink = ({ lanId, linkType }: { lanId: string; linkType: string }) => {
  const { data } = useGetUserDataQuery({ lanid: lanId, isCoworkers: false });
  const managerName = `${data?.NMUserModelWorkday.FirstName} ${data?.NMUserModelWorkday.LastName}`;
  const managerTitle = data?.NMUserModelWorkday.BusinessTitle;

  return data && (
    <div className="d-flex flex-column col-7">
      <a
        className={`link link--external mb-1 ${linkType === 'assistant' ? 'color-secondary' : null}`}
        href={`/en/profile/?lanId=${lanId}`}
      >
        {managerName}
      </a>
      {linkType === 'manager' && <p className="p2 color-secondary">{managerTitle}</p>}
    </div>
  );
};

export default ProfileInfoColLink;
