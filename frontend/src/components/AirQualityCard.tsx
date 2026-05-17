"use client";

import { AirQuality } from "../types/weather";

interface AirQualityCardProps {
  airQuality: AirQuality;
}

const AQI_LEVELS = [
  { level: 1, label: "Good", color: "from-green-500 to-green-600", bg: "bg-green-500/20" },
  { level: 2, label: "Fair", color: "from-yellow-500 to-yellow-600", bg: "bg-yellow-500/20" },
  { level: 3, label: "Moderate", color: "from-orange-500 to-orange-600", bg: "bg-orange-500/20" },
  { level: 4, label: "Poor", color: "from-red-500 to-red-600", bg: "bg-red-500/20" },
  { level: 5, label: "Very Poor", color: "from-purple-500 to-purple-600", bg: "bg-purple-500/20" },
];

export default function AirQualityCard({ airQuality }: AirQualityCardProps) {
  const aqiInfo = AQI_LEVELS.find(a => a.level === airQuality.aqi) || AQI_LEVELS[0];

  return (
    <div className="glass-effect rounded-xl p-4">
      <h3 className="text-white text-xs font-bold mb-3 flex items-center gap-2">
        <span className="w-2 h-2 bg-white rounded-full"></span>
        Air Quality
      </h3>
      
      <div className="flex items-center gap-3 mb-3">
        <div className="bg-white/10 rounded-full p-3">
          <div className="text-2xl font-bold text-white">
            {airQuality.aqi}
          </div>
        </div>
        <div>
          <p className="text-base font-semibold text-white">{aqiInfo.label}</p>
          <p className="text-xs text-neutral-400">AQI Level</p>
        </div>
      </div>

      {(airQuality.pm2_5 || airQuality.pm10) && (
        <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-white/10">
          {airQuality.pm2_5 && (
            <div>
              <p className="text-xs text-neutral-400 mb-1">PM2.5</p>
              <p className="text-base font-semibold text-white">{airQuality.pm2_5.toFixed(1)}</p>
            </div>
          )}
          {airQuality.pm10 && (
            <div>
              <p className="text-xs text-neutral-400 mb-1">PM10</p>
              <p className="text-base font-semibold text-white">{airQuality.pm10.toFixed(1)}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
