const ResourceLogoSection = ({ sectionContent, linkInline }) => {
    return sectionContent.BottomLinkPath &&
        <div className="total-rewards-resource__footer d-flex align-items-center align-items-lg-start mt-8">

            {sectionContent.BottomLinkIconPath ? (
                <div className="me-3">
                    <img src={sectionContent.BottomLinkIconPath}
                        className={`logo ${linkInline ? 'icon--medium mb-0' : ''}`}
                        alt="" />
                </div>) : null
            }

            <div>

                {sectionContent.BottomLinkDescription ? (
                    <div className="metadata">
                        {sectionContent.BottomLinkDescription}
                    </div>
                ) : null
                }

                <a href={sectionContent.BottomLinkPath}
                    target={sectionContent.BottomLinkTarget}
                    title={sectionContent.BottomLinkTitle}>
                    {sectionContent.BottomLinkName}
                    <img src="/Content/Images/icons/total-rewards/chevron-right_bold.svg" alt="right arrow" />
                </a>
            </div>
        </div>
}

export default ResourceLogoSection;