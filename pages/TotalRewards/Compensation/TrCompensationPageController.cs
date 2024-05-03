using EPiServer;
using EPiServer.Web.Mvc;
using EPiServer.Web.Routing;
using Microsoft.AspNetCore.Mvc;
using NMIC02_DC.Features.Shared;
using NMIC02_DC.Infrastructure.Extensions;

namespace NMIC02_DC.Features.Pages.TotalRewards.Compensation;

public class TrCompensationPageController : PageController<TrCompensationPage>
{
    private readonly IContentLoader _contentLoader;
    private readonly IUrlResolver _urlResolver;


    public TrCompensationPageController(IContentLoader contentLoader, IUrlResolver urlResolver)
    {
        _contentLoader = contentLoader;
        _urlResolver = urlResolver;
    }

    public ActionResult Index(TrCompensationPage currentPage)
    {

        var model = new TrCompensationPageViewModel(currentPage)
        {
            Breadcrumbs = currentPage.ContentLink.FindBreadcrumb(_contentLoader),
        };

        model.Hero = new HeroBlock(model.CurrentContent.Title, model.Breadcrumbs, null);

        if (currentPage.PageHeaderIcon is not null)
        {
            model.PageHeaderImage = _urlResolver.GetUrl(currentPage.PageHeaderIcon.OriginalString);
        }

        return View("~/Features/Pages/TotalRewards/Compensation/Index.cshtml", model);
    }
}
