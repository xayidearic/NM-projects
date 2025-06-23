import { useMemo } from 'react';
import ProfileEmpContactLink from '../ProfileEmpContactLink/ProfileEmpContactLink';
import { ProfileInfoProps } from '../utils';
import ProfileInfoColLink from '../ProfileInfoColLink/ProfileInfoColLink';

/**
 * Profile page right side column with employee information.
 */
const ProfileEmpInfo = ({ data }: ProfileInfoProps) => {
  const employeeInfo = useMemo(() => [
    [
      { label: 'Dept.', value: data.NMUserModelWorkday.Department, isLink: false },
      { label: 'Budget Code', value: data.NMUserModelWorkday.Budget, isLink: false },
      { label: 'Division', value: data.NMUserModelWorkday.Division, isLink: false },
    ],
    [
      { label: 'Lan Id', value: data.NMUserModelWorkday.LanId, isLink: false },
      { label: 'Address', value: data.NMUserModelWorkday.Address, isLink: false },
      { label: 'Location', value: data.NMUserModelLocation.Location, isLink: false },
      { label: 'Cubie', value: data.NMUserModelLocation.Cubicle, isLink: false },
    ],
    [
      { label: 'Work Phone', value: data.NMUserModelWorkday.WorkPhone, isLink: true },
      { label: 'Work Email', value: data.NMUserModelWorkday.WorkEmail, isLink: true },
    ],
    [
      { label: 'Manager', value: data.NMUserModelWorkday.ManagerLanId, isLink: true },
      { label: 'Assistant', value: data.NMUserModelLocalData.AdministrativeAssistantLanId, isLink: true },
    ],
  ], [data]);

  // Helper to render link or plain value
  const renderInfoValue = (info: { label: string; value: string | undefined; isLink: boolean }) => {
    if (!info.value) return <p className="text-break col-7">—</p>;

    if (info.isLink) {
      if (info.label === 'Manager') {
        return (
          <ProfileInfoColLink
            lanId={data.NMUserModelWorkday.ManagerLanId || ''}
            linkType="manager"
          />
        );
      }
      if (info.label === 'Assistant') {
        return (
          <ProfileInfoColLink
            lanId={data.NMUserModelLocalData.AdministrativeAssistantLanId || ''}
            linkType="assistant"
          />
        );
      }
      return (
        <ProfileEmpContactLink
          label={info.label}
          value={info.value}
        />
      );
    }
    return <p className="text-break col-7">{info.value}</p>;
  };

  return (
    <div className="w-100">
      {employeeInfo.map((infoGroup, index) => (
        <ul
          key={index}
          className="list-unstyled w-100 flex-column pb-4 pb-lg-5"
        >
          {infoGroup.map((info, subIndex) => {
            // Filter out Cubie if remote, or Assistant if 'None' or ''
            const isCubieRemote = info.label === 'Cubie' && data.NMUserModelLocation.Location === 'REMOTE';
            const isAssistantNone = info.label === 'Assistant' && (!data.NMUserModelLocalData.AdministrativeAssistantLanId || data.NMUserModelLocalData.AdministrativeAssistantLanId === 'None');

            if (isCubieRemote || isAssistantNone) {
              return null;
            }

            return (
              <li
                key={subIndex}
                className="d-flex flex-row"
              >
                <p className="offset-1 offset-sm-3 offset-md-0 offset-lg-1 col-3 col-sm-2 col-md-5 col-lg-4 color-secondary">
                  {info.label}
                </p>
                {renderInfoValue(info)}
              </li>
            );
          })}
        </ul>
      ))}
    </div>
  );
};

export default ProfileEmpInfo;
