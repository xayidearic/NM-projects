using EPiServer.Core;
using NMIC02_DC.Features.Shared;
using System.Collections.Generic;

namespace NMIC02_DC.Features.Pages.TotalRewards.Compensation;

public class TrCompensationPageViewModel : ContentViewModel<TrCompensationPage>
{
    public virtual string PageHeaderImage { get; set; } = "";
    public List<PageReference> Breadcrumbs { get; set; }
    public HeroBlock Hero { get; set; }

    public TrCompensationPageViewModel(TrCompensationPage page)
    {
        CurrentContent = page;
    }
}