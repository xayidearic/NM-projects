using EPiServer.Core;
using NMIC02_DC.Features.Shared;
using System.Collections.Generic;

namespace NMIC02_DC.Features.Pages.TotalRewards.Landing;

public class TrLandingPageViewModel : ContentViewModel<TrLandingPage>
{
    public IEnumerable<IContentData[]> AvailableBenefits { get; set; }
    public List<PageReference> Breadcrumbs { get; set; }
    public string DashboardSections { get; set; }
    public HeroBlock Hero { get; set; }
    public string ViewAllRelatedArticleLinkPath { get; set; }
    public string ViewAllRelatedArticleLinkTitle { get; set; }
    public string ViewAllRelatedArticleLinkName { get; set; }

    public TrLandingPageViewModel(TrLandingPage page)
    {
        CurrentContent = page;
    }
}