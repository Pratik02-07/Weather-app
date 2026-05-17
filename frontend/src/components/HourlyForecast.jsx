"use client";

export default function HourlyForecast({ hourlyData }) {
  if (!hourlyData || !hourlyData.length) return null;

  const formatHourLabel = (time) => {
    if (typeof time === "string" && time.trim()) {
      return time.replace(/(\d)(AM|PM)$/i, "$1 $2").toUpperCase();
    }

    const parsedTime = new Date(time);
    if (Number.isNaN(parsedTime.getTime())) {
      return "--:--";
    }

    return parsedTime.toLocaleTimeString([], { hour: "numeric", hour12: true });
  };

  const getWeatherEmoji = (condition) => {
    const c = condition?.toLowerCase() || '';
    if (c.includes('clear') || c.includes('sun')) return '☀️';
    if (c.includes('cloud')) return '⛅';
    if (c.includes('rain')) return '🌧️';
    if (c.includes('thunder')) return '⛈️';
    return '🌤️';
  };

  return (
    <div className="glass rounded-2xl p-6">
      <h3 className="text-lg font-semibold text-white mb-4">Hourly Forecast</h3>
      <div className="flex gap-4 overflow-x-auto pb-2">
        {hourlyData.slice(0, 24).map((item, index) => (
          <div
            key={index}
            className="shrink-0 text-center p-3 rounded-xl bg-white/5 min-w-26"
          >
            <p className="text-xs text-gray-500 mb-2 whitespace-nowrap leading-none">{formatHourLabel(item.time)}</p>
            <div className="text-2xl mb-2">{getWeatherEmoji(item.condition)}</div>
            <p className="text-sm font-semibold text-white">{Math.round(item.temp)}°</p>
            {item.precipitation > 0 && (
              <p className="text-xs text-gray-500">{Math.round(item.precipitation)}%</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}