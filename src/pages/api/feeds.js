import Parser from 'rss-parser';

const parser = new Parser();

const FEED_URLS = {
  'Smart Company': 'https://www.smartcompany.com.au/feed/',
  'Inside Small Business': 'https://insidesmallbusiness.com.au/feed',
  'Startup Daily': 'https://www.startupdaily.net/feed',
  'Flying Solo': 'https://www.flyingsolo.com.au/feed',
  'Kochies Business Builders': 'https://www.kochiesbusinessbuilders.com.au/feed',
  'My Business': 'https://www.mybusiness.com.au/feed'
};

export default async function handler(req, res) {
  try {
    const feeds = {};
    for (const [source, url] of Object.entries(FEED_URLS)) {
      const feed = await parser.parseURL(url);
      feeds[source] = {
        sourceColor: getSourceColor(source),
        articles: feed.items.slice(0, 3).map(item => ({
          title: item.title,
          excerpt: stripHtml(item.contentSnippet || item.content),
          date: new Date(item.pubDate).toLocaleDateString(),
          category: item.categories?.[0] || 'General',
          url: item.link
        }))
      };
    }
    res.status(200).json(feeds);
  } catch (error) {
    console.error('Feed fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch feeds' });
  }
}

function getSourceColor(source) {
  const colors = {
    'Smart Company': 'bg-blue-100 text-blue-800',
    'Inside Small Business': 'bg-green-100 text-green-800',
    'Startup Daily': 'bg-purple-100 text-purple-800',
    'Flying Solo': 'bg-red-100 text-red-800',
    'Kochies Business Builders': 'bg-orange-100 text-orange-800',
    'My Business': 'bg-teal-100 text-teal-800'
  };
  return colors[source] || 'bg-gray-100 text-gray-800';
}

function stripHtml(html) {
  if (!html) return '';
  // Remove HTML tags and limit to a reasonable length
  return html
    .replace(/<[^>]*>/g, '')
    .replace(/\[.*?\]/g, '')
    .split('The post')[0]
    .trim()
    .slice(0, 200) + '...';
}
