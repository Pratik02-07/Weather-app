"use client";

export default function ForecastList({ forecast }) {
  if (!forecast || !forecast.length) return null;

  const getWeatherEmoji = (condition) => {
    const c = condition?.toLowerCase() || '';
    if (c.includes('clear') || c.includes('sun')) return '☀️';
    if (c.includes('cloud')) return '⛅';
    if (c.includes('rain')) return '🌧️';
    if (c.includes('thunder')) return '⛈️';
    if (c.includes('snow')) return '❄️';
    return '🌤️';
  };

  const getDayName = (day) => {
    if (!day) return '';
    if (day === 'Today') return 'Today';
    if (day === 'Tomorrow') return 'Tomorrow';
    return day;
  };

  return (
    <div className="glass rounded-2xl p-6 h-full">
      <h3 className="text-lg font-semibold text-white mb-4">7-Day Forecast</h3>
      <div className="space-y-3">
        {forecast.slice(0, 7).map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between py-3 px-3 rounded-lg hover:bg-white/5 transition-colors"
          >
            <div className="flex items-center gap-3 w-24">
              <span className="text-xl">{getWeatherEmoji(item.condition)}</span>
              <span className="text-sm text-white">{getDayName(item.day)}</span>
            </div>
            <div className="flex-1 text-center">
              <span className="text-sm text-gray-400 capitalize">{item.condition}</span>
            </div>
            <div className="flex items-center gap-2 w-20 justify-end">
              <span className="text-sm text-white font-medium">{Math.round(item.max)}°</span>
              <span className="text-sm text-gray-500">{Math.round(item.min)}°</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}