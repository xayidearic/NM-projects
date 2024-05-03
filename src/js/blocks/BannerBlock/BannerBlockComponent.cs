using EPiServer.Core;
using EPiServer.Web.Mvc;
using EPiServer.Web.Routing;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace NMIC02_DC.Features.Blocks.BannerBlock;

public class BannerBlockComponent : AsyncBlockComponent<BannerBlock>
{
    private readonly IUrlResolver _UrlResolver;

    public BannerBlockComponent(IUrlResolver urlResolver)
    {
        _UrlResolver = urlResolver;
    }

    protected override async Task<IViewComponentResult> InvokeComponentAsync(BannerBlock currentContent)
    {
        var content = currentContent as IVersionable;
        var link = currentContent.Link;
        var isDismissible = content.StopPublish is not null && currentContent.IsDismissible;

        link.Href = _UrlResolver.GetUrl(currentContent.Link.Href);

        var model = new BannerBlockViewModel()
        {
            Title = currentContent.Title,
            Subtitle = currentContent.Subtitle,
            MessageType = currentContent.MessageType,
            Image = currentContent.Image,
            Link = link,
            IsDismissible = isDismissible,
            CampaignType = currentContent.CampaignType,
            IsSearchable = currentContent.IsSearchable
        };

        return await Task.FromResult(View("~/Features/Blocks/BannerBlock/BannerBlock.cshtml", model));
    }
}