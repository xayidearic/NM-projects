import Styles from './ProfileInputField.module.scss';

interface Props {
  classes: string;
  isDisabled: boolean;
  children?: React.ReactNode;
  fieldId: string;
  value?: string;
}

const ProfileInputField = ({ classes, isDisabled, children, fieldId, value = '' }: Props) => {
  return (
    <div className={classes}>
      <div className="position-relative">
        <input className={`${isDisabled && Styles.inputDisabled} `} id={fieldId} name={fieldId} readOnly={isDisabled} type="text" value={value} />
        {children}
        <img className="profile-update__input-icon" src="/Content/Images/icons/lock_icon.svg" alt="disabled field" />
      </div>
    </div>
  );
};

export default ProfileInputField;
