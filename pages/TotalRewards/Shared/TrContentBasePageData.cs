using EPiServer;
using EPiServer.Core;
using EPiServer.DataAbstraction;
using EPiServer.DataAnnotations;
using NM.Opti.Common.Utilities.Validation;
using NMIC02_DC.Features.Blocks.BannerBlock;
using NMIC02_DC.Features.Blocks.WhoToContactBlock;
using NMIC02_DC.Features.Shared;
using System.ComponentModel.DataAnnotations;

namespace NMIC02_DC.Features.Pages.TotalRewards.Shared;

public abstract class TrContentBasePageData : DCBasePageData
{
    /// To Revisit - This is a temporary fix allowing to add 2 Banner blocks to the content area
    [Display(Name = "Campaign Banner block",
        Description = "Content area to display Campaign Banner block. Limit 2 block",
        Order = 10)]
    [AllowedTypes(AllowedTypes = new[] { typeof(BannerBlock) })]
    [ContentAreaLimit(2)]
    public virtual ContentArea CampaignBanner { get; set; }

    [CultureSpecific]
    [Display(
        Name = "Header",
        Description = "Top Page Header",
        GroupName = SystemTabNames.Content,
        Order = 10)]
    public virtual string PageHeader { get; set; }

    [CultureSpecific]
    [Display(
        Name = "Page Header Icon URL",
        Description = "Top Page Header Icon / Image Path",
        GroupName = SystemTabNames.Content, Order = 20)]
    public virtual Url PageHeaderIcon { get; set; }

    [CultureSpecific]
    [Display(
          Name = "Who To Contact Block Content",
          Description = "Content area for Who To Contact block",
          Order = 300)]
    [AllowedTypes(AllowedTypes = new[] { typeof(WhoToContactBlock) })]
    public virtual ContentArea Contacts { get; set; }


    #region Hide Search Field

    [ScaffoldColumn(false)]
    public override ContentArea BottomContent { get; set; }

    [ScaffoldColumn(false)]
    public override bool IsSearchable { get; set; }

    [ScaffoldColumn(false)]
    public override string Keywords { get; set; }

    [ScaffoldColumn(false)]
    public override string SearchTitle { get; set; }

    [ScaffoldColumn(false)]
    public override string ShortDescription { get; set; }

    #endregion

    public override string PageType => PageTypes.TotalRewards;

    public override void SetDefaultValues(ContentType contentType)
    {
        base.SetDefaultValues(contentType);
        IsSearchable = false;
    }
}
