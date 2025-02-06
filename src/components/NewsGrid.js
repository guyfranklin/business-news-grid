import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "../components/ui/card";
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';

const SourceCard = ({ source, sourceData }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const articles = sourceData?.articles || [];

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

  if (!articles.length) {
    return (
      <Card className="bg-white hover:shadow-lg transition-shadow duration-200">
        <CardContent className="p-6">
          <div className="text-center text-gray-500">Loading...</div>
        </CardContent>
      </Card>
    );
  }

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
   const [feeds, setFeeds] = useState({
    'Smart Company': { articles: [], sourceColor: 'bg-blue-100 text-blue-800' },
    'Inside Small Business': { articles: [], sourceColor: 'bg-green-100 text-green-800' },
    'Startup Daily': { articles: [], sourceColor: 'bg-purple-100 text-purple-800' },
    'Flying Solo': { articles: [], sourceColor: 'bg-red-100 text-red-800' },
    "Kochie's Business Builders": { articles: [], sourceColor: 'bg-orange-100 text-orange-800' },
    'My Business': { articles: [], sourceColor: 'bg-teal-100 text-teal-800' }
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  const fetchFeeds = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/feeds');
      if (!response.ok) throw new Error('Failed to fetch feeds');
      
      const data = await response.json();
      setFeeds(data);
      setLastUpdated(new Date());
      setError(null);
    } catch (err) {
      console.error('Error fetching feeds:', err);
      setError('Failed to load feeds. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFeeds();
    // Refresh feeds every 15 minutes
    const interval = setInterval(fetchFeeds, 15 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  if (error) {
    return (
      <div className="w-full max-w-7xl mx-auto p-4">
        <div className="text-red-600 text-center">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="w-full max-w-7xl mx-auto p-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">
            Today in business news
          </h1>
          {lastUpdated && (
            <p className="text-sm text-gray-500">
              Last updated: {lastUpdated.toLocaleTimeString()}
            </p>
          )}
        </div>

        <div className="grid grid-cols-3 auto-rows-fr gap-6">
          {Object.entries(feeds).map(([source, data]) => (
            <SourceCard key={source} source={source} sourceData={data} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewsGrid;
