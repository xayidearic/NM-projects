const PrimaryGoldButton = ({ content }) => {
  return (
    content.sectionLinkUrl && (
      <div className="d-flex justify-content-center">
        <a
          href={content.sectionLinkUrl}
          target={content.sectionLinkTarget}
          title={content.sectionLinkTitle}
          className="template-btn__primary-gold mb-0 text-center"
        >
          {content.sectionLinkText}
        </a>
      </div>
    )
  );
};

export default PrimaryGoldButton;
