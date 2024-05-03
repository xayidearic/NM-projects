using System.ComponentModel.DataAnnotations;
using EPiServer;
using EPiServer.Core;
using EPiServer.DataAbstraction;
using EPiServer.DataAnnotations;
using NM.Opti.Common.Utilities.Validation;
using NMIC02_DC.Features.Blocks.TrHealthCareQuickLinkBlock;
using NMIC02_DC.Features.Blocks.TrSectionBlock;
using NMIC02_DC.Features.Pages.TopicContent;
using NMIC02_DC.Features.Pages.TotalRewards.Shared;
using NMIC02_DC.Features.Shared.Static;

namespace NMIC02_DC.Features.Pages.TotalRewards.HealthCare;

[
    ContentType(
        DisplayName = "Total Rewards HealthCare Page",
        GUID = "5FF937A3-2CD5-4C26-9572-BBD98C896D17",
        Description = "Used to author the HealthCare page for Total Rewards; [Single Use]"
    ),
    Access(Roles = $"{SiteRoles.AdminGroups}, {SiteRoles.EmpExpEditors}")
]
[AvailableContentTypes(Exclude = new[] { typeof(TopicHome), typeof(TrContentBasePageData) })]
public class TrHealthCarePage : TrContentBasePageData
{
    #region Page Only Fields

    [CultureSpecific]
    [Display(
        Name = "QuickLink Title",
        Description = "The heading to render above the Quick Link area",
        GroupName = SystemTabNames.Content,
        Order = 40
    )]
    public virtual string QuickLinkTitle { get; set; }

    [CultureSpecific]
    [Display(
        Name = "QuickLink SubTitle",
        Description = "The subheading to render above the Quick Link area",
        GroupName = SystemTabNames.Content,
        Order = 50
    )]
    public virtual string QuickLinkSubTitle { get; set; }

    #endregion

    [CultureSpecific]
    [Display(
        Name = "QuickLink Content Area",
        Description = "Content Area for QuickLink Block. Limit 4 QuickLink blocks",
        Order = 60
    )]
    [AllowedTypes(AllowedTypes = new[] { typeof(TrHealthCareQuickLinkBlock) })]
    [ContentAreaLimit(4)]
    public virtual ContentArea QuickLinkContentArea { get; set; }

    [CultureSpecific]
    [Display(
        Name = "Main Content",
        Description = "Content area for HealthCare Section Blocks",
        Order = 70
    )]
    [AllowedTypes(AllowedTypes = new[] { typeof(TrSectionBlock) })]
    public override ContentArea MainContent { get; set; }

    public override void SetDefaultValues(ContentType contentType)
    {
        base.SetDefaultValues(contentType);
        PageHeaderIcon = new Url("/Content/Images/icons/total-rewards/health-care.svg"); //need file healthcare.svg
    }
}
