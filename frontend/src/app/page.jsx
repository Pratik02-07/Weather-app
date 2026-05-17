"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import CitySearch from "../components/CitySearch";
import SimpleBackground from "../components/SimpleBackground";

export default function Home() {
  const router = useRouter();

  const handleSearch = (city) => {
    const formattedCity = city.toLowerCase().replace(/\s+/g, '-');
    router.push(`/${encodeURIComponent(formattedCity)}`);
  };

  const popularCities = [
    { name: "Kolhapur", temp: "28°", condition: "☀️" },
    { name: "Pune", temp: "26°", condition: "⛅" },
    { name: "Mumbai", temp: "30°", condition: "🌤️" },
    { name: "Delhi", temp: "32°", condition: "☀️" },
    { name: "Bangalore", temp: "24°", condition: "🌧️" }
  ];

  return (
    <main className="min-h-screen p-4 sm:p-6 md:p-8 relative flex flex-col">
      <SimpleBackground />

      <div className="max-w-5xl mx-auto relative z-10 flex-1 flex flex-col w-full">
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-12 sm:mb-16">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl glass flex items-center justify-center">
              <span className="text-2xl">🌤️</span>
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
                Weather
              </h1>
              <p className="text-xs text-gray-500 mt-1">AI-Powered Assistant</p>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="flex-1 flex flex-col items-center justify-center">
          <div className="w-full max-w-xl text-center mb-12">
            <div className="text-8xl sm:text-9xl mb-6 filter drop-shadow-2xl">
              🌤️
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
              Your Weather, <span className="text-gray-500">Simplified</span>
            </h2>

            <p className="text-gray-400 text-sm sm:text-base leading-relaxed mb-8 max-w-md mx-auto">
              Get instant weather updates and AI-powered insights for cities around the world.
            </p>

            {/* Search */}
            <div className="w-full max-w-md mx-auto">
              <CitySearch onSearch={handleSearch} />
            </div>
          </div>

          {/* Popular Cities */}
          <div className="mb-12">
            <p className="text-xs text-gray-600 mb-4 text-center uppercase tracking-widest font-medium">Popular Cities</p>
            <div className="flex flex-wrap gap-3 justify-center">
              {popularCities.map((city) => (
                <button
                  key={city.name}
                  onClick={() => handleSearch(city.name)}
                  className="px-5 py-3 glass rounded-xl border border-white/5 hover:border-white/15 text-white transition-all flex items-center gap-3 group"
                >
                  <span className="text-xl">{city.condition}</span>
                  <span className="font-medium text-sm">{city.name}</span>
                  <span className="text-gray-500 text-sm">{city.temp}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Features */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full max-w-2xl">
            <div className="p-5 rounded-2xl glass-card text-center">
              <div className="w-11 h-11 mx-auto mb-3 rounded-xl bg-white/5 flex items-center justify-center">
                <span className="text-xl">🤖</span>
              </div>
              <h3 className="text-sm font-semibold text-white mb-1">AI Insights</h3>
              <p className="text-xs text-gray-600">Smart recommendations</p>
            </div>
            <div className="p-5 rounded-2xl glass-card text-center">
              <div className="w-11 h-11 mx-auto mb-3 rounded-xl bg-white/5 flex items-center justify-center">
                <span className="text-xl">📅</span>
              </div>
              <h3 className="text-sm font-semibold text-white mb-1">7-Day Forecast</h3>
              <p className="text-xs text-gray-600">Plan ahead</p>
            </div>
            <div className="p-5 rounded-2xl glass-card text-center">
              <div className="w-11 h-11 mx-auto mb-3 rounded-xl bg-white/5 flex items-center justify-center">
                <span className="text-xl">🌍</span>
              </div>
              <h3 className="text-sm font-semibold text-white mb-1">Global</h3>
              <p className="text-xs text-gray-600">Any city worldwide</p>
            </div>
            <div className="p-5 rounded-2xl glass-card text-center">
              <div className="w-11 h-11 mx-auto mb-3 rounded-xl bg-white/5 flex items-center justify-center">
                <span className="text-xl">💨</span>
              </div>
              <h3 className="text-sm font-semibold text-white mb-1">Air Quality</h3>
              <p className="text-xs text-gray-600">Know before you go</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="max-w-5xl mx-auto relative z-10 mt-auto py-6 w-full">
        <div className="text-center">
          <p className="text-gray-600 text-xs flex items-center justify-center gap-2 flex-wrap">
            <span>Powered by</span>
            <span className="text-gray-400 font-medium">OpenWeatherMap</span>
            <span className="text-gray-700">+</span>
            <span className="text-gray-400 font-medium">OpenRouter AI</span>
          </p>
        </div>
      </footer>
    </main>
  );
}