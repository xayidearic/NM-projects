export interface Data {
  data: FeaturedEventData;
}

export interface FeaturedEventData {
  events: Event[];
  timezone?: string;
  isScrollable?: boolean;
}

export interface Event {
  ctaText: string;
  description: string;
  endDateIso: string;
  eventMode: string;
  eventPageID: string;
  eventType: string;
  icsJson: string;
  imageUrl: string;
  leftLoc: string;
  title: string;
  relativeUrl: string;
  rightLoc: string;
  startDateIso: string;
  urlForCTA: string;
  ctaTitle: string;
  ctaTarget: string;
}

export interface EventItems {
  event: Event;
}

export interface EventTimeProps {
  startDate: string;
  endDate: string;
  modal: boolean;
}

export interface FormatTimeOptions {
  dates: string | Date;
  displayTimeZone: boolean;
}

export interface EventModalProps {
  event: Event;
  toggle: () => void;
}

export interface EventImageProps {
  event: Event;
  isModalOpen: boolean;
}

export interface EventModalControls {
  eventIcs: Event;
  eventId: string;
  eventUrl: string;
}

export const sameDateChecker = (startDate: string, endDate: string) => {
  const start = new Date(startDate);
  const end = new Date(endDate);

  return start.toDateString() === end.toDateString();
};

/**
 * Get the event date
 * If the start and end date are the same, return 1 date with the year
 * If the start and end date are different, return the start date with the month and day and the end date with the year
 */
export const getEventDate = (startDate: string, endDate: string, modal: boolean) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const monthType = modal ? 'short' : 'long';

  const optionsWithYear: Intl.DateTimeFormatOptions = { month: monthType, day: 'numeric', year: 'numeric' };
  const optionsWithOutYear: Intl.DateTimeFormatOptions = { month: monthType, day: 'numeric' };

  return sameDateChecker(startDate, endDate)
    ? start.toLocaleDateString('en-US', optionsWithYear)
    : start.toLocaleDateString('en-US', optionsWithOutYear) + ' - ' + end.toLocaleDateString('en-US', optionsWithYear);
};

export const event = {
  relativeUrl: '/en/news-events/featured-events/2025/february/022425_ergweek/',
  startDateIso: '2025-02-27T07:30:00Z',
  endDateIso: '2025-02-28T07:30:00Z',
  icsJson:
    '{"description":"Mark your calendars for ERG Week, and attend the Recognition Awards on Feb. 24.","endDate":"2025-02-28T07:30:00Z","fileName":"022425_ergweek","location":"See description for list of events","startDate":"2025-02-27T07:30:00Z","title":"ERG Week (Feb. 17-24)"}',
  eventPageID: '144330',
  eventType: 'ERG',
  eventMode: 'Hybrid',
  title: 'ERG Week (Feb. 17-24)',
  description:
    '<p>Get ready to be part of something new and amazing.&nbsp;</p>\n<ul>\n<li><strong>Feb 17-20:&nbsp;</strong>Visit the Employee Resource Group (ERG) table at T2 Crossing at the Milwaukee campus for fun, giveaways and to join an ERG.</li>\n<li><a href="https://web.cvent.com/event/17f243fb-97ad-4785-b7db-5bb2bf17c526/summary?rt=sulHxl32AEmQ-Qei2q5jiQ" target="_blank" rel="noopener"><strong>Attend the Annual ERG Recognition Awards</strong></a>: Join us at our Milwaukee campus on <strong>Feb. 24 at 3 p.m. CT</strong> in the Grand Hall BC or virtually to learn about and celebrate the outstanding work of our ERGs.</li>\n</ul>',
  ctaText: 'Link Name',
  ctaTitle: 'Title',
  urlForCTA: '/en/news-events/2023/november/111023_fridayphoto/',
  ctaTarget: '_self',
  leftLoc: 'Hybrid',
  rightLoc: 'See description for list of events',
  imageUrl: '/contentassets/233fe2881c5447daab3300aca726c761/bhm_tile_2025_1920x1080.jpg',
};

export const mockEventsData = {
  events: [
    {
      relativeUrl: '/en/news-events/featured-events/2025/february/022525_blackhistorymonthevents/',
      startDateIso: '2025-02-22T14:30:00Z',
      endDateIso: '2025-02-22T14:30:00Z',
      icsJson:
        '{"description":"Events and activities to engage in during Black History Month.","endDate":"2025-02-22T14:30:00Z","fileName":"022525_blackhistorymonthevents","location":"See description for list of events","startDate":"2025-02-22T14:30:00Z","title":"Black History Month (Feb. 1-28)"}',
      eventPageID: '143979',
      eventType: 'ERG',
      eventMode: 'Remote',
      title: 'Black History Month (Feb. 1-28)',
      description: '<div class="epi-contentfragment">BHM events 2025</div>',
      ctaText: 'Link Name',
      ctaTitle: '',
      urlForCTA: '/en/',
      ctaTarget: '',
      leftLoc: 'Remote',
      rightLoc: 'See description for list of events',
    },
    {
      relativeUrl: '/en/news-events/featured-events/2025/february/021825_nmdsispeakerseries/',
      startDateIso: '2025-02-24T07:30:00Z',
      endDateIso: '2025-02-24T07:30:00Z',
      icsJson:
        '{"description":"The Northwestern Mutual Data Science Institute (NMDSI) will host \\u201CTaking AI Agents to Production\\u201D as part of our regular virtual speaker series on Tuesday, Feb. 18, from 10 \\u2013 11 a.m. (CT).\\u00A0","endDate":"2025-02-24T07:30:00Z","fileName":"021825_nmdsispeakerseries","location":"Remote","startDate":"2025-02-24T07:30:00Z","title":"NMDSI Speaker Series: Taking AI Agents to Production"}',
      eventPageID: '144032',
      eventType: 'Technology',
      eventMode: 'Remote',
      title: 'NMDSI Speaker Series: Taking AI Agents to Production',
      description:
        '<p><span data-preserver-spaces="true">The Northwestern Mutual Data Science Institute (NMDSI) will host &ldquo;</span><span data-preserver-spaces="true">Taking AI Agents to Production</span><span data-preserver-spaces="true">&rdquo; as part of our regular virtual speaker series.</span></p>\n<p><span data-preserver-spaces="true">Hear from Heiko Zuerker, enterprise architect principal, about how NM has embraced generative AI since it went viral, immediately recognizing its value and the opportunities it provides. Learn how Heiko&rsquo;s team took the next step forward by leveraging AI agents to create an advanced internal support bot. This presentation will explore the decisions made, the architecture and technology used, the challenges faced, the solutions found, and the lessons learned.&nbsp;</span></p>\n<div class="template-btn" style="text-align: center;"><a href="https://www.eventbrite.com/e/taking-ai-agents-to-production-tickets-1131199751909?aff=FeaturedEvents" target="_blank" rel="noopener"><button class="template-btn__primary-blue">RESERVE A SPOT</button></a></div>',
      ctaText: 'link',
      ctaTitle: '',
      urlForCTA: 'http://someurl.com/',
      ctaTarget: '',
      leftLoc: 'Remote',
      rightLoc: 'Remote',
      imageUrl: '/contentassets/2efd7d0c39a543bb95152f629f42b469/istock-1400359666.jpg',
    },
    {
      relativeUrl: '/en/news-events/featured-events/2025/february/021425_revelintechsubmissions/',
      startDateIso: '2025-02-24T14:30:00Z',
      endDateIso: '2025-02-26T16:30:00Z',
      icsJson:
        '{"description":"Submissions are due today for the 2025 Revel in Tech conference on April 22. Complete the submission form outlining your presentation proposal.  ","endDate":"2025-02-26T16:30:00Z","fileName":"021425_revelintechsubmissions","location":"Remote","startDate":"2025-02-24T14:30:00Z","title":"Spring Revel in Tech - Submissions Due"}',
      eventPageID: '142299',
      eventType: 'Technology',
      eventMode: 'Remote',
      title: 'Spring Revel in Tech - Submissions Due',
      description:
        '<p>Submissions are now open for the 2025 Revel in Tech conference on April 22. Don&rsquo;t miss this opportunity to share your insights, expertise and experiences with colleagues. Whether a success story, a breakthrough innovation, or a valuable lesson learned, this is your chance to shine and inspire others with your knowledge.</p>\n<p>Complete the submission form outlining your presentation proposal by&nbsp;<strong>February 14</strong>.&nbsp;</p>\n<div class="template-btn" style="text-align: center;"><a href="https://forms.office.com/Pages/ResponsePage.aspx?id=xHqCqmVGu02Y-vpJMahHCZZ-FwKg12FJsBt3r05FVDlURFRPVjg4OVczRkVFQkpNOVEzOU02SkFNSS4u" target="_blank" rel="noopener"><button class="template-btn__primary-blue">SUBMIT TODAY</button></a></div>\n<h3>&nbsp;</h3>\n<h4>About Revel in Tech&nbsp;</h4>\n<p>Open to all employees, this enterprise-wide hybrid event returns on April 22 for a full day of learning and inspiration during breakout sessions, keynotes and endless insights from your peers.</p>\n<p>The conference aims to create a space of curiosity, collaboration and connection for people to explore, dig into and provide content on a wide range of topics.&nbsp;</p>\n<p>Join the<strong> <a href="https://northwesternmutual.enterprise.slack.com/archives/C04165J8LVB" target="_blank" rel="noopener">#revel</a> </strong>Slack channel to for the latest updates and conference details. New to Revel in Tech? Check out the <a href="https://revel.nml.com/conf/2024/2" target="_blank" rel="noopener">2024 Fall Revel in Tech site</a> to experience the revel mania.&nbsp;</p>',
      ctaText: '',
      ctaTitle: '',
      urlForCTA: '',
      ctaTarget: '',
      leftLoc: 'Remote',
      rightLoc: 'Remote',
      imageUrl: '/contentassets/e14fa4b1078345388d45880fbd3c73b7/revel_2025-01-24-174204.png',
    },
    {
      relativeUrl: '/en/news-events/featured-events/2025/february/020725_mlkdaycelebrationofservice/',
      startDateIso: '2025-02-25T06:00:00Z',
      endDateIso: '2025-02-26T05:59:00Z',
      icsJson:
        '{"description":"Join the NM Foundation and our eight ERGs in celebrating MLK Day by engaging in four weeks of volunteer opportunities designed for you and your families. Visit https://cybergrants.nm.com/ to select from various opportunities available Jan. 13 to Feb. 7, 2025.","endDate":"2025-02-26T05:59:00Z","fileName":"020725_mlkdaycelebrationofservice","location":"View event for more information","startDate":"2025-02-25T06:00:00Z","title":"MLK: Celebration of Service (Jan. 13-Feb. 7)"}',
      eventPageID: '141209',
      eventType: 'Community and Volunteering',
      eventMode: 'Hybrid',
      title: 'MLK: Celebration of Service (Jan. 13-Feb. 7)',
      description:
        '<p>Join the NM Foundation and our eight Employee Resource Groups (ERGs) in celebrating MLK Day by engaging in four weeks of volunteer opportunities designed for you and your families.</p>\n<p>Visit the <a href="https://cybergrants.nm.com/" target="_blank" rel="noopener">Giving and Volunteering Hub</a>&nbsp;<span data-preserver-spaces="true">and click on the Find Events tab at the top of the homepage. Once there, click the blue Find An Event button and enter &ldquo;MLK&rdquo; in the Keyword Search or scroll through the event calendar. Opportunities are available </span><strong><span data-preserver-spaces="true">from Jan. 13 to Feb. 7</span></strong><span data-preserver-spaces="true">.</span></p>\n<p>If you&rsquo;d like to order a special MLK Day volunteer t-shirt, go to&nbsp;<a href="https://urldefense.com/v3/__https://nmfoundationshop.com/collections/volunteer-shirts__;!!IqRYp603ny2KL2MbNA!xdpttySAWYUXSCQVNMhga9qDOd1gkx1FVbCU0LeqChRGWLFJQvjaE9XRu6M48NkDLIlCC14AsnOKHzKJ-fnrCZhAWEqd71dTgEufmA$" target="_blank" rel="noopener">The NM Volunteer Store</a> and use passcode "volunteer" &nbsp;</p>',
      ctaText: '',
      ctaTitle: '',
      urlForCTA: '',
      ctaTarget: '',
      leftLoc: 'Hybrid',
      rightLoc: 'View event for more information',
      imageUrl: '/contentassets/7691465642064196aa8c5f56e0861ea8/mlk-image_featured-event.png',
    },
    {
      relativeUrl: '/en/news-events/featured-events/2025/february/022425_ergweek/',
      startDateIso: '2025-02-27T07:30:00Z',
      endDateIso: '2025-02-28T07:30:00Z',
      icsJson:
        '{"description":"Mark your calendars for ERG Week, and attend the Recognition Awards on Feb. 24.","endDate":"2025-02-28T07:30:00Z","fileName":"022425_ergweek","location":"See description for list of events","startDate":"2025-02-27T07:30:00Z","title":"ERG Week (Feb. 17-24)"}',
      eventPageID: '144330',
      eventType: 'ERG',
      eventMode: 'Hybrid',
      title: 'ERG Week (Feb. 17-24)',
      description:
        '<p>Get ready to be part of something new and amazing.&nbsp;</p>\n<ul>\n<li><strong>Feb 17-20:&nbsp;</strong>Visit the Employee Resource Group (ERG) table at T2 Crossing at the Milwaukee campus for fun, giveaways and to join an ERG.</li>\n<li><a href="https://web.cvent.com/event/17f243fb-97ad-4785-b7db-5bb2bf17c526/summary?rt=sulHxl32AEmQ-Qei2q5jiQ" target="_blank" rel="noopener"><strong>Attend the Annual ERG Recognition Awards</strong></a>: Join us at our Milwaukee campus on <strong>Feb. 24 at 3 p.m. CT</strong> in the Grand Hall BC or virtually to learn about and celebrate the outstanding work of our ERGs.</li>\n</ul>',
      ctaText: 'Link Name',
      ctaTitle: 'Title',
      urlForCTA: '/en/news-events/2023/november/111023_fridayphoto/',
      ctaTarget: '_top',
      leftLoc: 'Hybrid',
      rightLoc: 'See description for list of events',
      imageUrl: '',
    },
  ],
  timezone: 'US/Eastern',
} as FeaturedEventData;
