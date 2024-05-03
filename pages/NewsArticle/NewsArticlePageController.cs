using EPiServer.Web.Mvc;
using System.Threading.Tasks;
using System;
using EPiServer.Logging;
using NMIC02_DC.Features.Services.NewsArticle;
using Microsoft.AspNetCore.Mvc;

namespace NMIC02_DC.Features.Pages.NewsArticle;

public class NewsArticlePageController : PageController<NewsArticlePage>
{
    private readonly INewsArticleService _newsArticleService;
    private readonly ILogger _log = LogManager.GetLogger();

    public NewsArticlePageController(INewsArticleService newsArticleService)
    {
        _newsArticleService = newsArticleService;
    }

    public async Task<ActionResult> Index(NewsArticlePage currentPage, string commentId)
    {
        NewsArticlePageViewModel model;

        try
        {
            NewsArticlePageBaseViewModel<NewsArticlePage> baseModel = await _newsArticleService.GetBaseData(currentPage, commentId);
            
            model = new NewsArticlePageViewModel(baseModel);
        }
        catch (Exception ex)
        {
            _log.Error("[NewsArticlePageController/Index]", ex);
            model = new NewsArticlePageViewModel(currentPage);
        }

        return View(model);
    }
}