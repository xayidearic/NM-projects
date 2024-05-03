using EPiServer.Core;
using NMIC02_DC.Features.Shared;
using System.Collections.Generic;

namespace NMIC02_DC.Features.Pages.TotalRewards.HealthCare;

public class TrHealthCarePageViewModel : ContentViewModel<TrHealthCarePage>
{
    public virtual string PageHeaderImage { get; set; } = "";
    public List<PageReference> Breadcrumbs { get; set; }
    public HeroBlock Hero { get; set; }

    public TrHealthCarePageViewModel(TrHealthCarePage page)
    {
        CurrentContent = page;
    }
}