import React, { useState } from 'react';
import { Card, CardContent } from "../components/ui/card";
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';

// NEWS_SOURCES data stays the same...

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
    <div className="min-h-screen bg-gray-50">
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
    </div>
  );
};

export default NewsGrid;
