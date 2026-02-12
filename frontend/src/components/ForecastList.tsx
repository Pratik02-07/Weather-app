"use client";

import { ForecastItem } from "@/types/weather";
import Image from "next/image";

interface ForecastListProps {
  forecast: ForecastItem[];
}

const getWeatherIcon = (condition: string) => {
  const conditionLower = condition.toLowerCase();
  
  if (conditionLower.includes("clear") || conditionLower.includes("sunny")) {
    return "/assets/images/icon-sunny.webp";
  } else if (conditionLower.includes("cloud") || conditionLower.includes("overcast")) {
    return "/assets/images/icon-overcast.webp";
  } else if (conditionLower.includes("rain") || conditionLower.includes("drizzle")) {
    return "/assets/images/icon-rain.webp";
  } else if (conditionLower.includes("snow")) {
    return "/assets/images/icon-snow.webp";
  } else if (conditionLower.includes("storm") || conditionLower.includes("thunder")) {
    return "/assets/images/icon-storm.webp";
  } else if (conditionLower.includes("fog") || conditionLower.includes("mist")) {
    return "/assets/images/icon-fog.webp";
  } else if (conditionLower.includes("partly")) {
    return "/assets/images/icon-partly-cloudy.webp";
  }
  
  return "/assets/images/icon-sunny.webp";
};

export default function ForecastList({ forecast }: ForecastListProps) {
  return (
    <div className="glass-effect rounded-2xl p-6 relative overflow-hidden group hover:border-white/20 transition-all">
      {/* Decorative gradient orb */}
      <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-white/5 rounded-full blur-3xl group-hover:bg-white/10 transition-all"></div>
      
      <div className="mb-4 relative z-10">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <span className="text-2xl">📅</span>
          5-Day Forecast
        </h2>
        <p className="text-xs text-neutral-400 mt-1">Extended weather outlook</p>
      </div>
      
      <div className="space-y-2 relative z-10">
        {forecast.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all group/item cursor-pointer transform hover:scale-[1.02]"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex items-center gap-3 flex-1">
              <span className="text-sm font-bold w-16 text-white group-hover/item:text-white transition-colors">
                {item.day}
              </span>
              
              <div className="relative w-10 h-10 flex-shrink-0">
                <div className="absolute inset-0 bg-white/10 rounded-full blur-lg opacity-0 group-hover/item:opacity-100 transition-opacity"></div>
                <Image
                  src={getWeatherIcon(item.condition)}
                  alt={item.condition}
                  fill
                  className="object-contain relative z-10 group-hover/item:scale-110 transition-transform"
                />
              </div>
              
              <span className="text-neutral-300 flex-1 group-hover/item:text-neutral-200 transition-colors text-sm">
                {item.condition}
              </span>
            </div>
            
            <div className="text-right">
              <span className="text-2xl font-bold text-white">
                {Math.round(item.temp)}°
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
