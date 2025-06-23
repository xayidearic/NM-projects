import { ProfileInfoProps } from '../utils';
import style from './ProfileSkills.module.scss';
import { useState } from 'react';

const MAX_VISIBLE_SKILLS = 10;

const ProfileSkills = ({ data }: ProfileInfoProps) => {
  const skillsString = data?.NMUserModelWorkday?.Skills ?? '';
  const [showAllSkills, setShowAllSkills] = useState(false);
  if (!skillsString) return null;
  const skillsList = skillsString
    .split(',')
    .map(skill => skill.trim())
    .filter(Boolean);


  const visibleSkills = showAllSkills ? skillsList : skillsList.slice(0, MAX_VISIBLE_SKILLS);
  const hasMoreSkills = skillsList.length > MAX_VISIBLE_SKILLS;

  return (
    <div>
      <h2 className="mb-0">Skills</h2>
      <div className="d-flex flex-row flex-wrap">
        {visibleSkills.map((skill, index) => (
          <span
            key={skill + index}
            className={`${style.skillItem} p1`}
          >
            {skill}
          </span>
        ))}

        {hasMoreSkills && (
          <button
            className={`button--link ${style.showMore}`}
            onClick={() => setShowAllSkills(prev => !prev)}
          >
            {showAllSkills ? 'Show Less' : 'Show More'}
          </button>
        )}
      </div>
    </div>
  );
};

export default ProfileSkills;
