using EPiServer.Core;
using EPiServer.SpecializedProperties;

namespace NMIC02_DC.Features.Blocks.BannerBlock;

public class BannerBlockViewModel
{
    public string Title { get; set; }
    public string Subtitle { get; set; }
    public string MessageType { get; set; }
    public ContentReference Image { get; set; }
    public LinkItem Link { get; set; }
    public bool IsDismissible { get; set; }
    public string CampaignType { get; set; }
    public bool IsSearchable { get; set; }
}