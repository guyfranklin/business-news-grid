import NewsGrid from '../components/NewsGrid';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="w-full max-w-7xl mx-auto p-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">
            Today in business news
          </h1>
        </div>
        <div className="grid grid-cols-3 auto-rows-fr gap-6">
          {['Smart Company', 'Inside Small Business', 'Startup Daily', 'Flying Solo', "Kochie's Business Builders", 'My Business'].map((source) => (
            <div key={source} className="bg-white rounded-lg shadow p-6">
              <h2 className="text-sm font-semibold text-gray-600 mb-4">{source}</h2>
              <div className="animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
