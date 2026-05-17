"use client";

export default function WeatherDetails({ current }) {
  if (!current) return null;

  const details = [
    { icon: '🌡️', label: 'Feels Like', value: `${Math.round(current.feelsLike || 0)}°C` },
    { icon: '💧', label: 'Humidity', value: `${current.humidity || '--'}%` },
    { icon: '💨', label: 'Wind', value: `${current.wind || '--'} m/s` },
    { icon: '📊', label: 'Pressure', value: `${current.pressure || '--'} hPa` },
    { icon: '👁️', label: 'Visibility', value: `${(current.visibility || 0) / 1000} km` },
    { icon: '☀️', label: 'UV Index', value: current.uvIndex || '--' },
  ];

  return (
    <div className="glass rounded-2xl p-6">
      <h3 className="text-lg font-semibold text-white mb-4">Weather Details</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
        {details.map((item, index) => (
          <div key={index} className="text-center p-3 rounded-xl bg-white/5">
            <div className="text-2xl mb-2">{item.icon}</div>
            <p className="text-xs text-gray-500 mb-1">{item.label}</p>
            <p className="text-sm font-semibold text-white">{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}