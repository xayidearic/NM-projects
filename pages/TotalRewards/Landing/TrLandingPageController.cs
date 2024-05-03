using EPiServer;
using EPiServer.Web.Mvc;
using EPiServer.Web.Routing;
using Microsoft.AspNetCore.Mvc;
using NMIC02_DC.Features.Blocks.TrLandingPageSectionBlock;
using NMIC02_DC.Features.Shared;
using NMIC02_DC.Infrastructure.Extensions;
using System.Linq;
using EPiServer.Core;
using System.Collections.Generic;
using System.Text.Json;

namespace NMIC02_DC.Features.Pages.TotalRewards.Landing;

public class TrLandingPageController : PageController<TrLandingPage>
{
    private readonly IContentLoader _contentLoader;
    private readonly IUrlResolver _urlResolver;

    public TrLandingPageController(IContentLoader contentLoader, IUrlResolver urlResolver)
    {
        _contentLoader = contentLoader;
        _urlResolver = urlResolver;
    }

    private List<TrLandingPageSectionModel> GetDashboardSections(ContentArea mainContent)
    {
        var sectionData = mainContent?.FilteredItems.Select(x => x.LoadContent() as TrLandingPageSectionBlock);
        var sections = new List<TrLandingPageSectionModel>();

        foreach (var section in sectionData)
        {
            sections.Add(new TrLandingPageSectionModel(section, _urlResolver));
        }

        return sections;
    }

    public ActionResult Index(TrLandingPage currentPage)
    {
        var model = new TrLandingPageViewModel(currentPage)
        {
            Breadcrumbs = currentPage.ContentLink.FindBreadcrumb(_contentLoader),
        };

        model.Hero = new HeroBlock(model.CurrentContent.Title, model.Breadcrumbs, model.CurrentContent.HeroImage, model.CurrentContent.BannerTextFontColor);

        var viewAllArticlelinkitem = currentPage.ViewAllRelatedNewsArticleLink?.FirstOrDefault();

        if (viewAllArticlelinkitem is not null)
        {
            model.ViewAllRelatedArticleLinkPath = _urlResolver.GetUrl(viewAllArticlelinkitem.GetMappedHref());
            model.ViewAllRelatedArticleLinkTitle = viewAllArticlelinkitem.Title;
            model.ViewAllRelatedArticleLinkName = viewAllArticlelinkitem.Text;
        }

        if (currentPage.AvailableBenefits is not null)
        {
            var blockList = currentPage.AvailableBenefits.FilteredItems.Select(x => x.LoadContent());

            model.AvailableBenefits = Enumerable.Chunk(blockList, 2);
        }

        if (currentPage.MainContent is not null && currentPage.MainContent.FilteredItems.Any())
        {
            model.DashboardSections = JsonSerializer.Serialize(GetDashboardSections(currentPage.MainContent), new JsonSerializerOptions
            {
                PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
            });
        }

        return View("~/Features/Pages/TotalRewards/Landing/Index.cshtml", model);
    }
}
