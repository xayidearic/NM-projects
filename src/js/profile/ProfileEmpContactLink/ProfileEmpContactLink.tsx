const ProfileEmpContactLink = ({ label, value }: { label: string; value: string }) => {
    return (
      <a
        className="link link--external text-break weight-400 anchor-scroll"
        href={
        label === 'Work Phone'
          ? `tel:${value}`
          : label === 'Work Email'
          ? `mailto:${value}`
          : value
        }
      >
        {value}
      </a>
    );
  };

  export default ProfileEmpContactLink;