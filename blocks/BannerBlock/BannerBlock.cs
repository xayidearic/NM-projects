using System.ComponentModel.DataAnnotations;
using EPiServer.Core;
using EPiServer.DataAbstraction;
using EPiServer.DataAnnotations;
using EPiServer.Shell.ObjectEditing;
using EPiServer.SpecializedProperties;
using EPiServer.Web;
using NMIC02_DC.Features.Shared;
using NMIC02_DC.Features.Shared.SelectionQuery;

namespace NMIC02_DC.Features.Blocks.BannerBlock;

[ContentType(
    DisplayName = "Banner Block",
    GUID = "bbed62a9-9a1a-4c0b-912f-3e674c258df5",
    Description = "The Banner/Campaign/Nudges block."
)]
[ImageUrl("~/Assets/icons/cms/blocks/DC_ContentBlock-Thumbnail_Resources.png")]
public class BannerBlock : DCBaseBlockData
{
    #region Overrides

    [ScaffoldColumn(false)]
    public override bool IsSearchable { get; set; }

    [ScaffoldColumn(false)]
    public override bool IsGlobal { get; set; }

    [ScaffoldColumn(false)]
    public override bool ShowFullWidth { get; set; }

    #endregion


    [Required]
    [CultureSpecific]
    [Display(
        Name = "Title",
        Description = "The heading for the block. (Ex. Low-cost, premier healthcare for you and your family)",
        GroupName = SystemTabNames.Content,
        Order = 10
    )]
    public virtual string Title { get; set; }

    [CultureSpecific]
    [Display(
        Name = "Subtitle",
        Description = "The optional main subsection/body, under the title, for the block. "
            + "(Ex. Find the care you need, right on campus at the Mutual Health Centers.)",
        GroupName = SystemTabNames.Content,
        Order = 20
    )]
    public virtual string Subtitle { get; set; }

    [Required]
    [CultureSpecific]
    [Display(
        Name = "Message Type",
        Description = "The block message type above the title. (Ex. ‘My Total Rewards’)",
        GroupName = SystemTabNames.Content,
        Order = 30
    )]
    public virtual string MessageType { get; set; }

    [Required]
    [CultureSpecific]
    [Display(
        Name = "Image",
        Description = "The block's image",
        GroupName = SystemTabNames.Content,
        Order = 40
    )]
    [UIHint(UIHint.Image)]
    public virtual ContentReference Image { get; set; }

    [Required]
    [CultureSpecific]
    [Display(
        Name = "Link",
        Description = "The block's button link and text.",
        GroupName = SystemTabNames.Content,
        Order = 50
    )]
    public virtual LinkItem Link { get; set; }

    [CultureSpecific]
    [Display(
        Name = "Toggle Dismissible",
        Description = "Toggle on to turn off the ability for the block to be dismissible. "
            + "Please do not not make the block permanent (no block expatriation) and allow users to "
            + "dismiss it at the same time (this toggle turned on).",
        GroupName = SystemTabNames.Content,
        Order = 60
    )]
    public virtual bool IsDismissible { get; set; }

    [Required]
    [CultureSpecific]
    [Display(
        Name = "Campaign Type",
        Description = "The block's campaign type for Adobe Analytics.",
        GroupName = SystemTabNames.Content,
        Order = 70
    )]
    [AutoSuggestSelection(typeof(CampaignTypeSelectionQuery), AllowCustomValues = true)]
    public virtual string CampaignType { get; set; }

    public override void SetDefaultValues(ContentType contentType)
    {
        base.SetDefaultValues(contentType);

        IsSearchable = false;
    }
}
