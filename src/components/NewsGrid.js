import React, { useState } from 'react';
import { Card, CardContent } from '../components/ui/card';
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';

const NEWS_SOURCES = {
  'Smart Company': {
    sourceColor: "bg-blue-100 text-blue-800",
    articles: [
      {
        title: "Transformational: AirTrunk's Robin Khuda donates $100 million for women in STEM",
        excerpt: "AirTrunk CEO and founder Robin Khuda has donated $100 million to the University of Sydney to boost women in STEM.",
        date: "Feb 4, 2025",
        category: "People",
        url: "https://www.smartcompany.com.au/article1"
      },
      {
        title: "Lawpath secures $10 million from Westpac",
        excerpt: "Westpac has made a $10 million investment into Lawpath, deepening its partnership with the legal technology startup.",
        date: "Feb 4, 2025",
        category: "Funding",
        url: "https://www.smartcompany.com.au/article2"
      },
      {
        title: "Excise increases are killing craft breweries",
        excerpt: "A perfect storm of issues, exacerbated by steady, relentless excise increases, is taking its toll on Australia's craft beer sector.",
        date: "Feb 4, 2025",
        category: "Industry",
        url: "https://www.smartcompany.com.au/article3"
      }
    ]
  },
  'Inside Small Business': {
    sourceColor: "bg-green-100 text-green-800",
    articles: [
      {
        title: "Small businesses drive sustainability in supply chains",
        excerpt: "New research reveals that small businesses are taking the lead in implementing sustainable practices throughout supply chains.",
        date: "Feb 4, 2025",
        category: "Sustainability",
        url: "https://insidesmallbusiness.com.au/article1"
      },
      {
        title: "Digital transformation success stories",
        excerpt: "How small businesses are leveraging technology to compete in the digital age.",
        date: "Feb 4, 2025",
        category: "Technology",
        url: "https://insidesmallbusiness.com.au/article2"
      },
      {
        title: "Government grants update 2025",
        excerpt: "Latest opportunities for small business funding and support programs.",
        date: "Feb 4, 2025",
        category: "Finance",
        url: "https://insidesmallbusiness.com.au/article3"
      }
    ]
  },
  'Startup Daily': {
    sourceColor: "bg-purple-100 text-purple-800",
    articles: [
      {
        title: "Sydney startup raises $5M for AI-powered retail solution",
        excerpt: "A Sydney-based retail tech startup has secured $5M in seed funding to expand its AI-powered inventory management system.",
        date: "Feb 4, 2025",
        category: "Funding",
        url: "https://www.startupdaily.net/article1"
      },
      {
        title: "Melbourne AI startup goes global",
        excerpt: "Local success story expands to US and European markets.",
        date: "Feb 4, 2025",
        category: "Growth",
        url: "https://www.startupdaily.net/article2"
      },
      {
        title: "Top startup accelerators of 2025",
        excerpt: "Guide to the best startup programs and incubators in Australia.",
        date: "Feb 4, 2025",
        category: "Resources",
        url: "https://www.startupdaily.net/article3"
      }
    ]
  },
  'Flying Solo': {
    sourceColor: "bg-red-100 text-red-800",
    articles: [
      {
        title: "The rise of solo entrepreneurs in Australia",
        excerpt: "New data shows a significant increase in solo entrepreneurs, with technology and professional services leading the way.",
        date: "Feb 4, 2025",
        category: "Trends",
        url: "https://www.flyingsolo.com.au/article1"
      },
      {
        title: "Work-life balance strategies",
        excerpt: "Expert tips for managing solo business and personal life.",
        date: "Feb 4, 2025",
        category: "Lifestyle",
        url: "https://www.flyingsolo.com.au/article2"
      },
      {
        title: "Tax tips for solopreneurs",
        excerpt: "Essential tax planning strategies for solo business owners.",
        date: "Feb 4, 2025",
        category: "Finance",
        url: "https://www.flyingsolo.com.au/article3"
      }
    ]
  },
  "Kochie's Business Builders": {
    sourceColor: "bg-orange-100 text-orange-800",
    articles: [
      {
        title: "5 essential financial tips for small business owners",
        excerpt: "Expert advice on managing cash flow, investments, and growth strategies for small business success.",
        date: "Feb 4, 2025",
        category: "Finance",
        url: "https://www.kochiesbusinessbuilders.com.au/article1"
      },
      {
        title: "Marketing on a budget",
        excerpt: "Cost-effective strategies for small business marketing.",
        date: "Feb 4, 2025",
        category: "Marketing",
        url: "https://www.kochiesbusinessbuilders.com.au/article2"
      },
      {
        title: "Leadership in small business",
        excerpt: "Building and managing effective teams in small organizations.",
        date: "Feb 4, 2025",
        category: "Leadership",
        url: "https://www.kochiesbusinessbuilders.com.au/article3"
      }
    ]
  },
  'My Business': {
    sourceColor: "bg-teal-100 text-teal-800",
    articles: [
      {
        title: "Changes to workplace laws: What business owners need to know",
        excerpt: "A comprehensive guide to the latest workplace law changes affecting Australian businesses.",
        date: "Feb 4, 2025",
        category: "Legal",
        url: "https://www.mybusiness.com.au/article1"
      },
      {
        title: "Business insurance essentials",
        excerpt: "Understanding and choosing the right insurance coverage.",
        date: "Feb 4, 2025",
        category: "Insurance",
        url: "https://www.mybusiness.com.au/article2"
      },
      {
        title: "HR compliance checklist",
        excerpt: "Stay compliant with the latest HR regulations and best practices.",
        date: "Feb 4, 2025",
        category: "HR",
        url: "https://www.mybusiness.com.au/article3"
      }
    ]
  }
};

const SourceCard = ({ source, sourceData }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const articles = sourceData.articles;

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === articles.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? articles.length - 1 : prevIndex - 1
    );
  };

  const currentArticle = articles[currentIndex];

  return (
    <Card className="bg-white hover:shadow-lg transition-shadow duration-200">
      <CardContent className="pt-3 px-6 pb-6 h-full flex flex-col relative">
        <div className="border-b border-gray-200 pb-2 mb-3">
          <h2 className="text-sm font-semibold text-gray-600">{source}</h2>
        </div>

        <div className="absolute top-1/2 -translate-y-1/2 left-2">
          <button 
            onClick={prevSlide}
            className="p-1 rounded-full bg-white shadow-md hover:bg-gray-50 transition-colors"
            aria-label="Previous article"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
        </div>

        <div className="absolute top-1/2 -translate-y-1/2 right-2">
          <button 
            onClick={nextSlide}
            className="p-1 rounded-full bg-white shadow-md hover:bg-gray-50 transition-colors"
            aria-label="Next article"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="mb-4 flex items-center justify-between flex-wrap gap-3">
          <span className={`text-sm font-medium px-3 py-1.5 rounded-full ${sourceData.sourceColor}`}>
            {currentArticle.category}
          </span>
          <span className="text-sm text-gray-500">
            {currentArticle.date}
          </span>
        </div>
        
        <h3 className="text-lg font-bold mb-3 text-gray-900 line-clamp-2">
          {currentArticle.title}
        </h3>
        
        <p className="text-gray-600 text-sm line-clamp-3 mb-4 flex-grow">
          {currentArticle.excerpt}
        </p>

        <div className="flex items-center justify-between mt-auto">
          <div className="flex gap-1">
            {articles.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-1.5 h-1.5 rounded-full transition-colors ${
                  index === currentIndex ? 'bg-gray-800' : 'bg-gray-300'
                }`}
                aria-label={`Go to article ${index + 1}`}
              />
            ))}
          </div>
          <a 
            href={currentArticle.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
          >
            Read More 
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </CardContent>
    </Card>
  );
};

const NewsGrid = () => {
  return (
    <div className="w-full max-w-7xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6 text-gray-900">
        Today in business news
      </h1>

      <div className="grid grid-cols-3 auto-rows-fr gap-6">
        {Object.entries(NEWS_SOURCES).map(([source, data]) => (
          <SourceCard key={source} source={source} sourceData={data} />
        ))}
      </div>
    </div>
  );
};

export default NewsGrid;
