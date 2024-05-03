using EPiServer.Core;
using NM.Opti.Common.BlockViewModels.Features.ViewModels;
using System.Collections.Generic;

namespace NMIC02_DC.Features.Blocks.ImageCarouselBlock;

public class ImageCarouselBlockViewModel : BaseBlockViewModel<ImageCarouselBlock>
{
    public int Id { get; set; }
    public ContentArea Images { get; set; }
    public string Caption { get; set; }
    public bool IsSearchable { get; set; }
    public List<CarouselImage> CarouselImages { get; set; }
    public string AllCarouselImagesJson { get; set; }

    public ImageCarouselBlockViewModel(ImageCarouselBlock currentBlock) : base(currentBlock)
    {
       CarouselImages = new();
    }
}