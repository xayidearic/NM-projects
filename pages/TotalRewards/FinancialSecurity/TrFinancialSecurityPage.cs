using EPiServer;
using EPiServer.Core;
using EPiServer.DataAbstraction;
using EPiServer.DataAnnotations;
using EPiServer.SpecializedProperties;
using NMIC02_DC.Features.Blocks.TrSectionBlock;
using NMIC02_DC.Features.Pages.TopicContent;
using NMIC02_DC.Features.Pages.TotalRewards.Shared;
using NMIC02_DC.Features.Shared.Static;
using System.ComponentModel.DataAnnotations;

namespace NMIC02_DC.Features.Pages.TotalRewards.FinancialSecurity;

[ContentType(
    DisplayName = "Total Rewards Financial Security Page",
    GUID = "B401C1E1-6676-4CC0-84E3-5D114084A7D7",
    Description = "Used to author the FinancialsSecurity page for Total Rewards; [Single Use]"),
 Access(Roles = $"{SiteRoles.AdminGroups}, {SiteRoles.EmpExpEditors}")]
[AvailableContentTypes(Exclude = new[] { typeof(TopicHome), typeof(TrContentBasePageData) })]
public class TrFinancialSecurityPage : TrContentBasePageData
{
    [CultureSpecific]
    [Display(
          Name = "Main Content",
          Description = "Content area for Security Section Blocks",
          Order = 100)]
    [AllowedTypes(AllowedTypes = new[] { typeof(TrSectionBlock) })]
    public override ContentArea MainContent { get; set; }

    #region Legal Plan Fields

    [CultureSpecific]
    [Display(Name = "Voluntary Legal Plan Icon",
       Description = "Icon image for the Voluntary Legal Plan Link. This should be an image URL.",
       GroupName = SystemTabNames.Content,
       Order = 110)]
    public virtual Url VoluntaryLegalPlanIcon { get; set; }

    [CultureSpecific]
    [Display(Name = "Voluntary Legal Plan Title",
        Description = "The heading to render above the Voluntary Legal Plan area",
        GroupName = SystemTabNames.Content,
        Order = 120)]
    public virtual string VoluntaryLegalPlanTitle { get; set; }

    [CultureSpecific]
    [Display(
          Name = "Voluntary Legal Plan Description",
          Description = "Content area for the Voluntary Legal Plan",
          GroupName = SystemTabNames.Content,
          Order = 130)]
    public virtual XhtmlString VoluntaryLegalPlanDescription { get; set; }

    [CultureSpecific]
    [Display(
          Name = "Voluntary Legal Plan Link",
          Description = "Link for the Voluntary Legal Plan area",
          GroupName = SystemTabNames.Content,
          Order = 140)]
    [ListItems(1, ErrorMessage = "There is a limit of 1 for the Voluntary Legal Plan Link!")]
    public virtual LinkItemCollection VoluntaryLegalPlanLink { get; set; }

    #endregion

    #region Additional Life Insurance Fields

    [CultureSpecific]
    [Display(Name = "Additional Life Insurance Icon",
       Description = "Icon image for the Additional Life Insurance Link. This should be an image URL.",
       GroupName = SystemTabNames.Content,
       Order = 150)]
    public virtual Url AdditionalLifeInsuranceIcon { get; set; }

    [CultureSpecific]
    [Display(Name = "Additional Life Insurance Title",
        Description = "The heading to render above the Additional Life Insurance area",
        GroupName = SystemTabNames.Content,
        Order = 160)]
    public virtual string AdditionalLifeInsuranceTitle { get; set; }

    [CultureSpecific]
    [Display(
          Name = "Additional Life Insurance Description",
          Description = "Content area for the Additional Life Insurance",
          GroupName = SystemTabNames.Content,
          Order = 170)]
    public virtual XhtmlString AdditionalLifeInsuranceDescription { get; set; }

    [CultureSpecific]
    [Display(
          Name = "Additional Life Insurance Link",
          Description = "Link for the Additional Life Insurance area",
          GroupName = SystemTabNames.Content,
          Order = 180)]
    [ListItems(1, ErrorMessage = "There is a limit of 1 for the Additional Life Insurance Link!")]
    public virtual LinkItemCollection AdditionalLifeInsuranceLink { get; set; }

    #endregion

    public override void SetDefaultValues(ContentType contentType)
    {
        base.SetDefaultValues(contentType);
        PageHeaderIcon = new Url("/Content/Images/icons/total-rewards/financial-security.svg");
    }
}