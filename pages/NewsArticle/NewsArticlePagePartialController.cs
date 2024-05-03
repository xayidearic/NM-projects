using EPiServer.Framework.DataAnnotations;
using EPiServer.Framework.Web;
using EPiServer.Web.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace NMIC02_DC.Features.Pages.NewsArticle;

[TemplateDescriptor(TemplateTypeCategory = TemplateTypeCategories.MvcPartialComponent)]
public class NewsArticlePagePartialController : PageController<NewsArticlePage>
{
    public Microsoft.AspNetCore.Mvc.ActionResult Index(NewsArticlePage currentPage)
    {
        var model = new NewsArticlePageViewModel(currentPage);

        return PartialView("~/Features/Pages/NewsArticle/Partial.cshtml", model);
    }
}