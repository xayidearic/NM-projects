using NMIC02_DC.Features.Ratings;
using NMIC02_DC.Features.Services.NewsArticle;
using System.Collections.Generic;

namespace NMIC02_DC.Features.Pages.NewsArticle;

public class NewsArticlePageViewModel : NewsArticlePageBaseViewModel<NewsArticlePage>
{
    public bool IsLeaderNews { get; set; }
    public string CategoryName { get; set; }

    public NewsArticlePageViewModel(NewsArticlePage currentContent) : base(currentContent)
    {
        Rating = new RatingViewModel();
        Categories = new List<string>();
        IsLeaderNews = currentContent.Audience != null;
    }

    public NewsArticlePageViewModel(NewsArticlePageBaseViewModel<NewsArticlePage> model) : base(model.CurrentContent)
    {
        Rating = model.Rating;
        Categories = model.Categories;
        LinkedComment = model.LinkedComment;
    }
}