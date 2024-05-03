using System.ComponentModel.DataAnnotations;
using EPiServer.Core;
using EPiServer.DataAbstraction;
using EPiServer.DataAnnotations;
using EPiServer.Web;
using NM.Opti.Common.Utilities.Validation;
using NMIC02_DC.Features.Shared;

namespace NMIC02_DC.Features.Blocks.ImageCarouselBlock;

[ContentType(
    DisplayName = "Image Carousel",
    GUID = "e5267438-03a3-4491-9ccf-3d42183a7bdc",
    Description = ""
)]
[ImageUrl("~/Assets/icons/cms/blocks/DC_ContentBlock-Thumbnail_Carasouel.png")]
public class ImageCarouselBlock : DCBaseBlockData
{
    [CultureSpecific]
    [Display(
        Name = "Images",
        Description = "Content's images",
        GroupName = SystemTabNames.Content,
        Order = 10
    )]
    [ContentAreaLimit(10)]
    [AllowedTypes(typeof(ImageData))]
    [UIHint(UIHint.Image)]
    public virtual ContentArea Images { get; set; }

    [CultureSpecific]
    [Display(
        Name = "Main Caption",
        Description = "Content's caption. This caption will override individual captions",
        GroupName = SystemTabNames.Content,
        Order = 20
    )]
    public virtual string Caption { get; set; }
}
