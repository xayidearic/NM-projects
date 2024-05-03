using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using EPiServer;
using EPiServer.Core;
using EPiServer.DataAbstraction;
using EPiServer.DataAccess;
using EPiServer.DataAnnotations;
using EPiServer.ServiceLocation;
using EPiServer.Shell.ObjectEditing;
using EPiServer.Web;
using Geta.Optimizely.Categories;
using NM.Opti.Common.Content.Integration.Attributes;
using NM.Opti.Common.Models.ContentEvents.ContentEventInterfaces;
using NMIC02_DC.Features.Blocks.MiniNewsFeedBlock;
using NMIC02_DC.Features.Blocks.TopContentBlock;
using NMIC02_DC.Features.Categories;
using NMIC02_DC.Features.Shared;
using NMIC02_DC.Features.Shared.SelectionFactories;
using NMIC02_DC.Features.Shared.Static;
using NMIC02_DC.Infrastructure.Definitions;

namespace NMIC02_DC.Features.Pages.NewsArticle;

[ContentType(
    DisplayName = "News Article",
    GUID = "c9f58b43-6502-4df6-b36c-b65723488665",
    Description = "Displays information about a particular news item"
)]
[ImageUrl("~/Assets/icons/cms/pages/DC_PageType-Thumbnail_NewsArticle.png")]
[Access(Roles = SiteRoles.NewsPagesAndBlocksGroups)]
public class NewsArticlePage : DCBasePageData, IPublishingContent
{
    public override string PageType => PageTypes.News;
    private Injected<IContentVersionRepository> _versionRepo;
    private Injected<IContentRepository> _contentRepository;

    [Display(
        Name = "Top banner",
        Description = "Content area for top banner block",
        GroupName = ExtendedTabNames.TopContent,
        Order = 10
    )]
    public virtual TopContentBlock TopContentBlock { get; set; }

    [UIHint(UIHint.Textarea)]
    [CultureSpecific]
    [Display(
        Name = "Title",
        Description = "Title for top banner block",
        GroupName = SystemTabNames.Content,
        Order = 20
    )]
    public override string Title { get; set; }

    [CultureSpecific]
    [Display(
        Name = "Toggle full width image",
        Description = "Toggle full width image",
        GroupName = SystemTabNames.Content,
        Order = 21
    )]
    public virtual bool ToggleFullWidthImage { get; set; }

    [CultureSpecific]
    [Display(
        Name = "Banner image",
        Description = "Author or news related image",
        GroupName = SystemTabNames.Content,
        Order = 22
    )]
    [UIHint(UIHint.Image)]
    public virtual ContentReference BannerImage { get; set; }

    [CultureSpecific]
    [Display(
        Name = "Use banner image as thumbnail",
        Description = "Indicates if the banner image should be used as the thumbnail image",
        GroupName = SystemTabNames.Content,
        Order = 23
    )]
    public virtual bool UseBannerImageAsThumbnail { get; set; }

    [CultureSpecific]
    [Display(
        Name = "Thumbnail image",
        Description = "Image that is displayed on the News Landing page, and on the Home page",
        GroupName = SystemTabNames.Content,
        Order = 24
    )]
    [UIHint(UIHint.Image)]
    public virtual ContentReference ThumbnailImage { get; set; }

    [CultureSpecific]
    [Display(
        Name = "Summary",
        Description = "Text that is displayed on the News Landing page, and on the Home page",
        GroupName = SystemTabNames.Content,
        Order = 70
    )]
    [UIHint(UIHint.Textarea)]
    public virtual string Summary { get; set; }

    [CultureSpecific]
    [Display(
        Name = "Featured content for latest news",
        Description = "Marks the content as featured content for the latest news",
        GroupName = SystemTabNames.Content,
        Order = 80
    )]
    public virtual bool IsFeaturedContentForLatestNews { get; set; }

    [CultureSpecific]
    [Display(
        Name = "Featured content for landing news",
        Description = "Marks the content as featured content for the landing news",
        GroupName = SystemTabNames.Content,
        Order = 90
    )]
    public virtual bool IsFeaturedContentForLandingNews { get; set; }

    [CultureSpecific]
    [Display(
        Name = "Show in latest news block",
        Description = "Marks the content as able to be shown in the latest news block",
        GroupName = SystemTabNames.Content,
        Order = 100
    )]
    public virtual bool ShowInLatestNewsBlock { get; set; }

    [ScaffoldColumn(false)]
    public override ContentArea MainContent { get; set; }

    [Display(
        Name = "Mini News Feed Content Area",
        Description = "Content area to display Mini News Feed Content",
        Order = 110
    )]
    [AllowedTypes(AllowedTypes = new[] { typeof(MiniNewsFeedBlock) })]
    public virtual ContentArea MiniNewsFeedContentArea { get; set; }

    [Display(
        Name = "Categories",
        Description = "Categories for the news article",
        GroupName = SystemTabNames.Content,
        Order = 120
    )]
    public override IList<ContentReference> Categories { get; set; }

    [CultureSpecific]
    [Display(
        Name = "Targeted Leader Audience",
        Description = "AD groups for leader groups based targeting. Note: Do not select if Location groups are selected.",
        GroupName = ExtendedTabNames.Audience,
        Order = 130
    )]
    [SelectMany(SelectionFactoryType = typeof(AdGroupsSelectionFactory))]
    public virtual string Audience { get; set; }

    [CultureSpecific]
    [Display(
        Name = "Location based Audience",
        Description = "Location based audience targeting. Note: Do not select if Leader groups are selected.",
        GroupName = ExtendedTabNames.Audience,
        Order = 140
    )]
    [SelectMany(SelectionFactoryType = typeof(AudienceLocationSelectionFactory))]
    public virtual string AudienceLocation { get; set; }

    [ScaffoldColumn(false)]
    public override ContentArea Menu { get; set; }

    [CultureSpecific]
    [Display(
        Name = "News Category",
        Description = "News category for the page",
        GroupName = SystemTabNames.Content,
        Order = 510
    )]
    [SerializeAsEpiCategory]
    [UIHint(CategoryUIHint.Category)]
    [AllowedTypes(typeof(NewsCategory))]
    public virtual ContentReference MainCategory { get; set; }

    [CultureSpecific]
    [Display(
        Name = "News Location Category",
        Description = "News location category for the page",
        GroupName = SystemTabNames.Content,
        Order = 520
    )]
    [SerializeAsEpiCategory]
    [UIHint(CategoryUIHint.Category)]
    [AllowedTypes(typeof(NewsLocationCategory))]
    public virtual ContentReference LocationCategory { get; set; }

    public override void PublishingContent(object sender, ContentEventArgs e)
    {
        base.PublishingContent(sender, e);

        var page = e.Content as NewsArticlePage;
        var versions = _versionRepo.Service.ListPublished(page.ContentLink);

        if (versions.Count() == 1 && page.StopPublish == null)
        {
            var clone = page.CreateWritableClone();
            var startDate = page.StartPublish ?? DateTime.Now;

            clone.StartPublish = startDate.AddSeconds(-10);
            clone.StopPublish = clone.StartPublish?.AddDays(365);
            _contentRepository.Service.Save(
                clone,
                SaveAction.Patch,
                EPiServer.Security.AccessLevel.NoAccess
            );
        }
    }

    public override void SetDefaultValues(ContentType contentType)
    {
        base.SetDefaultValues(contentType);

        var startDate = StartPublish ?? DateTime.Now;

        StopPublish = startDate.AddDays(365);
        UseBannerImageAsThumbnail = true;
    }
}
