using System.ComponentModel.DataAnnotations;
using EPiServer;
using EPiServer.Core;
using EPiServer.DataAbstraction;
using EPiServer.DataAnnotations;
using NMIC02_DC.Features.Blocks.TrSectionBlock;
using NMIC02_DC.Features.Pages.TopicContent;
using NMIC02_DC.Features.Pages.TotalRewards.Shared;
using NMIC02_DC.Features.Shared.Static;

namespace NMIC02_DC.Features.Pages.TotalRewards.Compensation;

[ContentType(
    DisplayName = "Total Rewards Compensation Page",
    GUID = "83EA06CC-6A4E-4E62-B4C0-9DCB32604F2A",
    Description = "Used to author the Compensation page for Total Rewards; [Single Use]"),
 Access(Roles = $"{SiteRoles.AdminGroups}, {SiteRoles.EmpExpEditors}")]
[AvailableContentTypes(Exclude = new[] { typeof(TopicHome), typeof(TrContentBasePageData) })]
public class TrCompensationPage : TrContentBasePageData
{
    [CultureSpecific]
    [Display(
          Name = "Main Content",
          Description = "Content area for Compensation Section Blocks",
          Order = 60)]
    [AllowedTypes(AllowedTypes = new[] { typeof(TrSectionBlock) })]
    public override ContentArea MainContent { get; set; }

    public override void SetDefaultValues(ContentType contentType)
    {
        base.SetDefaultValues(contentType);
        PageHeaderIcon = new Url("/Content/Images/icons/total-rewards/compensation.svg");
    }
}
