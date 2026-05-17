"use client";

export default function TodayWeather({ weather }) {
  if (!weather || !weather.current) return null;

  const { current, city, country } = weather;

  const getWeatherEmoji = (condition) => {
    const c = condition?.toLowerCase() || '';
    if (c.includes('clear') || c.includes('sun')) return '☀️';
    if (c.includes('cloud')) return '⛅';
    if (c.includes('rain')) return '🌧️';
    if (c.includes('thunder')) return '⛈️';
    if (c.includes('snow')) return '❄️';
    if (c.includes('fog') || c.includes('mist')) return '🌫️';
    return '🌤️';
  };

  return (
    <div className="glass rounded-2xl p-6 h-full">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h2 className="text-2xl font-bold text-white">{city}{country ? `, ${country}` : ''}</h2>
          <p className="text-sm text-gray-500">{weather.date}</p>
        </div>
        <div className="text-5xl">{getWeatherEmoji(current.condition)}</div>
      </div>

      <div className="mb-6">
        <div className="flex items-baseline gap-2">
          <span className="text-6xl font-bold text-white">{Math.round(current.temp)}°</span>
          <span className="text-lg text-gray-400">C</span>
        </div>
        <p className="text-gray-400 mt-1">Feels like {Math.round(current.feelsLike)}°C</p>
        <p className="text-gray-400 capitalize">{current.condition}</p>
      </div>

      <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/10">
        <div className="text-center">
          <p className="text-xl">💧</p>
          <p className="text-xs text-gray-500">Humidity</p>
          <p className="text-sm text-white">{current.humidity || '--'}%</p>
        </div>
        <div className="text-center">
          <p className="text-xl">💨</p>
          <p className="text-xs text-gray-500">Wind</p>
          <p className="text-sm text-white">{current.wind || '--'} m/s</p>
        </div>
        <div className="text-center">
          <p className="text-xl">👁️</p>
          <p className="text-xs text-gray-500">UV Index</p>
          <p className="text-sm text-white">{current.uvIndex || '--'}</p>
        </div>
      </div>
    </div>
  );
}