"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Bot } from "lucide-react";
import { useWeather } from "../../hooks/useWeather";
import CitySearch from "../../components/CitySearch";
import TodayWeather from "../../components/TodayWeather";
import ForecastList from "../../components/ForecastList";
import SimpleBackground from "../../components/SimpleBackground";
import WeatherAgent from "../../components/WeatherAgent";
import HourlyForecast from "../../components/HourlyForecast";
import WeatherDetails from "../../components/WeatherDetails";

export default function CityPage({ params }) {
  const router = useRouter();
  const resolvedParams = use(params);
  const {
    weather,
    loading,
    error,
    fetchWeather,
    agentMessages,
    agentLoading,
    sendAgentQuery,
    clearAgentMessages
  } = useWeather();

  const cityName = decodeURIComponent(resolvedParams.city).replace(/-/g, ' ');
  const [showAgent, setShowAgent] = useState(false);

  useEffect(() => {
    if (cityName) fetchWeather(cityName);
  }, [cityName]);

  const handleSearch = (newCity) => {
    router.push(`/${encodeURIComponent(newCity.toLowerCase().replace(/\s+/g, '-'))}`);
  };

  return (
    <main className="min-h-screen p-3 sm:p-4 md:p-6 relative flex flex-col">
      <SimpleBackground />

      <div className="max-w-5xl mx-auto relative z-10 flex-1 flex flex-col w-full">
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 sm:gap-4 mb-6">
          <div
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => router.push('/')}
          >
            <div className="w-10 h-10 rounded-xl glass flex items-center justify-center group-hover:bg-white/10 transition-all">
              <span className="text-xl">🌤️</span>
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-white group-hover:text-gray-300 transition-colors">
                Weather
              </h1>
              <p className="text-xs text-gray-600 mt-0.5">AI Agent</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 flex-1 md:max-w-xl">
            <div className="flex-1">
              <CitySearch onSearch={handleSearch} currentCity={weather?.city} />
            </div>
          </div>
        </header>

        {/* Loading */}
        {loading && (
          <div className="flex items-center justify-center flex-1 py-20">
            <div className="text-center glass rounded-3xl p-8 sm:p-12 max-w-sm mx-4">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full glass flex items-center justify-center">
                <span className="text-3xl">🌤️</span>
              </div>
              <p className="text-lg font-semibold text-white mb-2">Fetching weather...</p>
              <p className="text-sm text-gray-500">Loading for {cityName}</p>
            </div>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="flex items-center justify-center flex-1 py-20 px-4">
            <div className="glass rounded-3xl p-8 sm:p-10 max-w-md w-full text-center border border-white/10">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-white/5 flex items-center justify-center">
                <span className="text-4xl">⚠️</span>
              </div>
              <h2 className="text-2xl font-bold mb-2 text-white">Something went wrong</h2>
              <p className="text-gray-500 leading-relaxed mb-4 text-sm">{error}</p>
              <button
                onClick={() => router.push('/')}
                className="px-6 py-3 glass hover:bg-white/10 text-white rounded-xl font-semibold border border-white/10 transition-all"
              >
                Go Back Home
              </button>
            </div>
          </div>
        )}

        {/* Weather Content */}
        {weather && !loading && (
          <div className="flex-1 flex flex-col gap-4 sm:gap-6 mb-6">
            {/* Main Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              <TodayWeather weather={weather} />
              <ForecastList forecast={weather.forecast} />
            </div>

            {/* Hourly */}
            {weather.hourlyForecast && weather.hourlyForecast.length > 0 && (
              <HourlyForecast hourlyData={weather.hourlyForecast} />
            )}

            <WeatherDetails current={weather.current} />

            {/* Additional Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {weather.current.sunrise && weather.current.sunset && (
                <div className="glass rounded-2xl p-4">
                  <h3 className="text-xs text-gray-500 mb-2">Sunrise & Sunset</h3>
                  <div className="flex justify-between">
                    <div>
                      <p className="text-2xl">🌅</p>
                      <p className="text-sm text-white">{new Date(weather.current.sunrise * 1000).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl">🌇</p>
                      <p className="text-sm text-white">{new Date(weather.current.sunset * 1000).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
                    </div>
                  </div>
                </div>
              )}
              {weather.airQuality && (
                <div className="glass rounded-2xl p-4">
                  <h3 className="text-xs text-gray-500 mb-2">Air Quality</h3>
                  <p className="text-2xl font-bold text-white">{weather.airQuality.aqi}</p>
                  <p className="text-sm text-gray-400">{weather.airQuality.aqiLabel}</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Floating Chat Button */}
      <div className="fixed bottom-6 right-6 z-50">
        {showAgent && (
          <div className="absolute bottom-16 right-0 w-80 sm:w-96 mb-4">
            <WeatherAgent
              messages={agentMessages}
              onSendMessage={sendAgentQuery}
              loading={agentLoading}
              onClose={() => {
                clearAgentMessages();
                setShowAgent(false);
              }}
            />
          </div>
        )}

        <button
          onClick={() => setShowAgent(!showAgent)}
          className={`w-14 h-14 rounded-xl flex items-center justify-center border transition-all ${
            showAgent
              ? 'bg-white/10 border-white/20 text-white'
              : 'glass border-white/10 text-white/70 hover:bg-white/10 hover:border-white/20'
          }`}
        >
          <Bot className="h-4 w-4" />
        </button>
      </div>

      {/* Footer */}
      <footer className="max-w-5xl mx-auto relative z-10 mt-auto py-6 w-full">
        <div className="text-center">
          <p className="text-gray-600 text-xs">
            Powered by OpenWeatherMap + OpenRouter AI
          </p>
        </div>
      </footer>
    </main>
  );
}