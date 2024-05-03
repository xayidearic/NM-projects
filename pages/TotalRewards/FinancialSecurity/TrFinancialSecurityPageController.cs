using System.Linq;
using System.Text.Json;
using EPiServer;
using EPiServer.Web.Mvc;
using EPiServer.Web.Routing;
using Microsoft.AspNetCore.Mvc;
using NMIC02_DC.Features.Shared;
using NMIC02_DC.Infrastructure.Extensions;

namespace NMIC02_DC.Features.Pages.TotalRewards.FinancialSecurity;

public class TrFinancialSecurityPageController : PageController<TrFinancialSecurityPage>
{
    private readonly IContentLoader _contentLoader;
    private readonly IUrlResolver _urlResolver;

    public TrFinancialSecurityPageController(IContentLoader contentLoader, IUrlResolver urlResolver)
    {
        _contentLoader = contentLoader;
        _urlResolver = urlResolver;
    }

    private string GetAdditionalLifeJson(TrFinancialSecurityPage currentPage)
    {
        var lifeIcon = currentPage.AdditionalLifeInsuranceIcon is not null
            ? _urlResolver.GetUrl(currentPage.AdditionalLifeInsuranceIcon.OriginalString)
            : "";
        var lifeDesc = currentPage.AdditionalLifeInsuranceDescription?.ToHtmlString() ?? "";
        var lifeLink = currentPage.AdditionalLifeInsuranceLink?.FirstOrDefault();
        var jsonData = new
        {
            AdditionalLifeInsuranceDescription = lifeDesc,
            AdditionalLifeInsuranceIcon = lifeIcon,
            AdditionalLifeInsuranceTitle = currentPage.AdditionalLifeInsuranceTitle ?? "",
            AdditionalLifeLinkName = lifeLink?.Text ?? "",
            AdditionalLifeLinkPath = lifeLink is not null
                ? _urlResolver.GetUrl(lifeLink.GetMappedHref())
                : "",
            AdditionalLifeLinkTitle = lifeLink?.Title ?? ""
        };

        return JsonSerializer.Serialize(jsonData);
    }

    private string GetLegalPlanJson(TrFinancialSecurityPage currentPage)
    {
        var legalIcon = currentPage.VoluntaryLegalPlanIcon is not null
            ? _urlResolver.GetUrl(currentPage.VoluntaryLegalPlanIcon.OriginalString)
            : "";
        var legalDesc = currentPage.VoluntaryLegalPlanDescription?.ToHtmlString() ?? "";
        var legalLink = currentPage.VoluntaryLegalPlanLink?.FirstOrDefault();
        var jsonData = new
        {
            VoluntaryLegalPlanDescription = legalDesc,
            VoluntaryLegalPlanIcon = legalIcon,
            VoluntaryLegalPlanTitle = currentPage.VoluntaryLegalPlanTitle ?? "",
            VoluntaryLegalLinkName = legalLink?.Text ?? "",
            VoluntaryLegalLinkPath = legalLink is not null
                ? _urlResolver.GetUrl(legalLink.GetMappedHref())
                : "",
            VoluntaryLegalLinkTitle = legalLink?.Title ?? ""
        };

        return JsonSerializer.Serialize(jsonData);
    }

    public ActionResult Index(TrFinancialSecurityPage currentPage)
    {
        var model = new TrFinancialSecurityPageViewModel(currentPage)
        {
            AdditionalLifeInsuranceJson = GetAdditionalLifeJson(currentPage),
            Breadcrumbs = currentPage.ContentLink.FindBreadcrumb(_contentLoader),
            VoluntaryLegalPlanJson = GetLegalPlanJson(currentPage)
        };

        model.Hero = new HeroBlock(model.CurrentContent.Title, model.Breadcrumbs, null);

        if (currentPage.PageHeaderIcon is not null)
        {
            model.PageHeaderImage = _urlResolver.GetUrl(currentPage.PageHeaderIcon.OriginalString);
        }

        return View("~/Features/Pages/TotalRewards/FinancialSecurity/Index.cshtml", model);
    }
}
