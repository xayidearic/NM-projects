using EPiServer.Core;
using EPiServer.Web.Mvc;
using EPiServer.Web.Routing;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Text.Json;
using System.Threading.Tasks;

namespace NMIC02_DC.Features.Blocks.ImageCarouselBlock;

public class ImageCarouselBlockComponent : AsyncBlockComponent<ImageCarouselBlock>
{
    private readonly IUrlResolver _urlResolver;

    public ImageCarouselBlockComponent(IUrlResolver urlResolver)
    {
        _urlResolver = urlResolver;
    }   

    private List<CarouselImage> BuildCarousel(ImageCarouselBlock currentContent)
    {
        if (currentContent.Images is not null)
        {
            var carouselImages = new List<CarouselImage>();

            foreach (var image in currentContent.Images.Items)
            {
                var media = image.LoadContent() as ImageData;

                var carouselImage = new CarouselImage
                {
                    ImageAltText = media?.GetPropertyValue("AltText"),
                    ImageCaption = media?.GetPropertyValue("Caption"),
                    ImageUrl = _urlResolver.GetUrl(media.ContentLink),
                    ImageID = media.ContentLink.ID.ToString()
                };

                if (carouselImage is not null)
                {
                    carouselImages.Add(carouselImage);
                }
            }

            return carouselImages;
        }

        return new List<CarouselImage>();
    }

    protected override async Task<IViewComponentResult> InvokeComponentAsync(ImageCarouselBlock currentContent)
    {
        var model = new ImageCarouselBlockViewModel(currentContent)
        {
            Id = (currentContent as IContent).ContentLink.ID,
            Images = currentContent.Images,
            Caption = currentContent.Caption,
            IsSearchable = currentContent.IsSearchable,
            CarouselImages = BuildCarousel(currentContent),
        };

        model.AllCarouselImagesJson = JsonSerializer.Serialize(
        new
        {
            model.Id,
            model.Caption,
            model.IsSearchable,
            model.CarouselImages
        },
         new JsonSerializerOptions
        {
            PropertyNamingPolicy = JsonNamingPolicy.CamelCase
        });

        return await Task.FromResult(View("~/Features/Blocks/ImageCarouselBlock/ImageCarouselBlock.cshtml", model));
    }
}