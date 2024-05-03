using System.Collections.Generic;
using EPiServer.Core;
using NMIC02_DC.Features.Shared;

namespace NMIC02_DC.Features.Pages.TotalRewards.FinancialSecurity;

public class TrFinancialSecurityPageViewModel : ContentViewModel<TrFinancialSecurityPage>
{
    public virtual string PageHeaderImage { get; set; } = "";
    public List<PageReference> Breadcrumbs { get; set; }
    public HeroBlock Hero { get; set; }
    public string AdditionalLifeInsuranceJson { get; set; }
    public string VoluntaryLegalPlanJson { get; set; }

    public TrFinancialSecurityPageViewModel(TrFinancialSecurityPage page)
    {
        CurrentContent = page;
    }
}
