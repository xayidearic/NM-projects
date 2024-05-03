using EPiServer.Core;
using EPiServer.DataAnnotations;
using EPiServer.Web;
using NMIC02_DC.Features.Shared;
using System.ComponentModel.DataAnnotations;
using EPiServer.DataAbstraction;
using System.Collections.Generic;
using NMIC02_DC.Features.Shared.Static;
using NMIC02_DC.Features.Blocks.BenefitCardBlock;
using NMIC02_DC.Features.Blocks.TrLandingPageSectionBlock;
using NMIC02_DC.Features.Blocks.RelatedNewsContentBlock;
using NMIC02_DC.Features.Blocks.WhoToContactListBlock;
using NMIC02_DC.Features.Blocks.WhoToContactBlock;
using EPiServer.Shell.ObjectEditing;
using NMIC02_DC.Features.Shared.SelectionFactories;
using EPiServer.SpecializedProperties;
using NMIC02_DC.Features.Blocks.BannerBlock;
using NM.Opti.Common.Utilities.Validation;

namespace NMIC02_DC.Features.Pages.TotalRewards.Landing;

[ContentType(DisplayName = "Total Rewards Landing Page",
    GUID = "{889ADD83-6C25-4097-B833-A7845DF3ABF5}",
     Description = "Used to author the Landing page for Total Rewards; [Single Use]"),
    Access(Roles = $"{SiteRoles.AdminGroups}, {SiteRoles.EmpExpEditors}")]
public class TrLandingPage : DCBasePageData
{
    #region Overrides

    public override string PageType => PageTypes.TotalRewards;

    [ScaffoldColumn(false)]
    public override XhtmlString MainBody { get; set; }

    [AllowedTypes(RestrictedTypes = new[] { typeof(WhoToContactListBlock), typeof(WhoToContactBlock) })]
    public override ContentArea BottomContent { get; set; }

    [Display(
       Name = "Categories",
       Description = "Categories for the Topic Content",
       GroupName = SystemTabNames.Content,
       Order = 100)]
    public override IList<ContentReference> Categories { get; set; }

    #endregion

    [Display(Name = "Campaign Banner block",
      Description = "Content area to display Campaign Banner block. Limit 1 block",
      Order = 10)]
    [AllowedTypes(AllowedTypes = new[] { typeof(BannerBlock) })]
    [ContentAreaLimit(2)]
    public virtual ContentArea CampaignBanner { get; set; }

    [Display(Name = "Hero Background Image",
       Description = "Override the default white background of heros with a choosen image here for Banner",
       Order = 50)]
    [UIHint(UIHint.Image)]
    public virtual ContentReference HeroImage { get; set; }

    [Display(Name = "Banner Text Color ",
        Description = "Select the color of the banner text. Default to blue if none selected",
        Order = 60)]
    [SelectOne(SelectionFactoryType = typeof(ThemeSelectionFactory))]
    public virtual string BannerTextFontColor { get; set; }

    [Display(Name = "Title",
     Description = "Title goes with the Banner",
     Order = 70)]
    public override string Title { get; set; }

    [CultureSpecific]
    [Display(
     Name = "Main Content",
     Description = "Content area for Landing Page Circle Section Blocks",
     Order = 110)]
    [AllowedTypes(AllowedTypes = new[] { typeof(TrLandingPageSectionBlock) })]
    public override ContentArea MainContent { get; set; }

    [Display(Name = "Available Benefits Title",
       Description = "The Heading to render above the Available Benefits area",
       Order = 120)]
    public virtual string AvailableBenefitsTitle { get; set; }

    [CultureSpecific]
    [Display(
     Name = "Available benefits",
     Description = "Content area for Landing Page Available benefits Blocks",
     Order = 130)]
    [AllowedTypes(AllowedTypes = new[] { typeof(BenefitCardBlock) })]
    public virtual ContentArea AvailableBenefits { get; set; }

    [Display(
        Name = "RelatedNews Article Title",
        Description = "Related News Article Heading",
        Order = 140)]
    public virtual string RelatedNewsArticleTile { get; set; }

    [CultureSpecific]
    [Display(
        Name = "Related News Articles",
        Description = "The Heading to render above Related News Article area",
        Order = 150)]
    [AllowedTypes(AllowedTypes = new[] { typeof(RelatedNewsContentBlock) })]
    public virtual ContentArea RelatedNewsContentArea { get; set; }

    [CultureSpecific]
    [Display(Name = "View All Related Articles Link",
       Description = "Link to view all Related Articles for Compensation and Benefits Category ",
       GroupName = SystemTabNames.Content,
       Order = 160)]
    [ListItems(1, ErrorMessage = "There is a limit of 1 Link!")]
    public virtual LinkItemCollection ViewAllRelatedNewsArticleLink { get; set; }

    public override void SetDefaultValues(ContentType contentType)
    {
        base.SetDefaultValues(contentType);
        IsSearchable = false;
        StopPublish = null;
        BannerTextFontColor = "white";
    }
}
