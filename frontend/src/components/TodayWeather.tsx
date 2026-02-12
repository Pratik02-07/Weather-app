"use client";

import { WeatherData } from "../types/weather";
import Image from "next/image";

interface TodayWeatherProps {
  weather: WeatherData;
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

export default function TodayWeather({ weather }: TodayWeatherProps) {
  return (
    <div className="glass-effect rounded-2xl p-6 h-full flex flex-col relative overflow-hidden group hover:border-white/20 transition-all">
      {/* Decorative gradient orb */}
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-white/5 rounded-full blur-3xl group-hover:bg-white/10 transition-all"></div>
      
      <div className="mb-4 relative z-10">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-white text-sm font-semibold mb-1 flex items-center gap-2">
              <span className="w-2 h-2 bg-white rounded-full"></span>
              Today's Weather
            </h2>
            <p className="text-neutral-300 text-xs">{weather.date}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-neutral-400">Location</p>
            <p className="text-xs font-semibold text-white">{weather.city}</p>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center relative z-10">
        <div className="relative w-32 h-32 mb-4">
          <div className="absolute inset-0 bg-white/10 rounded-full blur-2xl"></div>
          <Image
            src={getWeatherIcon(weather.current.condition)}
            alt={weather.current.condition}
            fill
            className="object-contain drop-shadow-[0_0_25px_rgba(255,255,255,0.3)] relative z-10"
          />
        </div>

        <div className="text-center mb-6">
          <div className="text-6xl font-bold mb-2 text-white drop-shadow-lg">
            {Math.round(weather.current.temp)}°
          </div>
          <p className="text-xl font-bold text-white mb-1">{weather.current.condition}</p>
          <p className="text-xs text-neutral-300 font-medium">Feels like {Math.round(weather.current.temp)}°</p>
        </div>

        <div className="w-full border-t border-white/10 pt-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all">
              <p className="text-neutral-300 text-xs uppercase tracking-wider mb-1 font-bold">High</p>
              <p className="text-2xl font-bold text-white">
                {Math.round(weather.current.max)}°
              </p>
            </div>
            <div className="text-center p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all">
              <p className="text-neutral-300 text-xs uppercase tracking-wider mb-1 font-bold">Low</p>
              <p className="text-2xl font-bold text-white">
                {Math.round(weather.current.min)}°
              </p>
            </div>
            <div className="text-center p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all">
              <p className="text-neutral-300 text-xs uppercase tracking-wider mb-1 font-bold">Wind</p>
              <p className="text-2xl font-bold text-white">
                {weather.current.wind}
              </p>
              <p className="text-xs text-neutral-400 mt-1">m/s</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
