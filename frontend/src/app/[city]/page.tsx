"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import { useWeather } from "@/hooks/useWeather";
import CitySearch from "@/components/CitySearch";
import TodayWeather from "@/components/TodayWeather";
import ForecastList from "@/components/ForecastList";
import AirQualityCard from "@/components/AirQualityCard";
import SunTimesCard from "@/components/SunTimesCard";
import Beams from "@/components/Beams";
import Image from "next/image";

interface CityPageProps {
  params: Promise<{
    city: string;
  }>;
}

export default function CityPage({ params }: CityPageProps) {
  const router = useRouter();
  const { weather, loading, error, fetchWeather } = useWeather();
  const resolvedParams = use(params);
  const cityName = decodeURIComponent(resolvedParams.city).replace(/-/g, ' ');

  useEffect(() => {
    if (cityName) {
      fetchWeather(cityName);
    }
  }, [cityName]);

  const handleSearch = (newCity: string) => {
    router.push(`/${encodeURIComponent(newCity.toLowerCase().replace(/\s+/g, '-'))}`);
  };

  return (
    <main className="min-h-screen p-3 sm:p-4 md:p-6 relative overflow-hidden flex flex-col">
      {/* Beams background */}
      <div className="absolute inset-0 pointer-events-none">
        <Beams
          beamWidth={3}
          beamHeight={30}
          beamNumber={20}
          lightColor="#ffffff"
          speed={2}
          noiseIntensity={1.75}
          scale={0.2}
          rotation={30}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10 flex-1 flex flex-col w-full">
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
          <div className="flex items-center gap-3 sm:gap-4 cursor-pointer" onClick={() => router.push('/')}>
            <div>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
                Weather App
              </h1>
              <p className="text-xs text-neutral-300 mt-0.5 sm:mt-1">Real-time weather updates</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 flex-1 md:max-w-2xl">
            <div className="flex-1">
              <CitySearch onSearch={handleSearch} currentCity={weather?.city} />
            </div>
          </div>
        </header>

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center flex-1">
            <div className="text-center glass-effect rounded-2xl sm:rounded-3xl p-6 sm:p-8 max-w-sm mx-4">
              <div className="relative">
                <div className="absolute inset-0 bg-white/20 rounded-full blur-xl opacity-50"></div>
                <Image
                  src="/assets/images/icon-loading.svg"
                  alt="Loading"
                  width={40}
                  height={40}
                  className="mx-auto mb-3 sm:mb-4 animate-spin relative z-10"
                />
              </div>
              <p className="text-sm sm:text-base text-neutral-200 font-medium">Fetching weather data...</p>
              <p className="text-xs sm:text-sm text-neutral-300 mt-2">Loading {cityName}</p>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="flex items-center justify-center flex-1 animate-scaleIn px-4">
            <div className="glass-effect rounded-2xl sm:rounded-3xl p-6 sm:p-8 max-w-md w-full text-center border-2 border-red-400/50">
              <div className="bg-red-500/20 rounded-full w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <Image
                  src="/assets/images/icon-error.svg"
                  alt="Error"
                  width={32}
                  height={32}
                  className="sm:w-10 sm:h-10"
                />
              </div>
              <h2 className="text-lg sm:text-xl font-bold mb-2 text-white">
                City Not Found
              </h2>
              <p className="text-neutral-200 leading-relaxed mb-2 text-xs sm:text-sm">{error}</p>
              <p className="text-xs text-neutral-300 mb-3 sm:mb-4">Couldn't find weather data for "{cityName}"</p>
              <button
                onClick={() => router.push('/')}
                className="px-4 sm:px-5 py-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-xl font-medium transition-all transform hover:scale-105 text-xs sm:text-sm"
              >
                Go Back Home
              </button>
            </div>
          </div>
        )}

        {/* Weather Content */}
        {weather && !loading && (
          <div className="flex-1 flex flex-col">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
              <div className="animate-slideIn">
                <TodayWeather weather={weather} />
              </div>
              <div className="animate-slideIn" style={{ animationDelay: '0.1s' }}>
                <ForecastList forecast={weather.forecast} />
              </div>
            </div>

            {/* Additional Info Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 animate-slideIn" style={{ animationDelay: '0.2s' }}>
              {weather.current.sunrise && weather.current.sunset && (
                <SunTimesCard 
                  sunrise={weather.current.sunrise} 
                  sunset={weather.current.sunset} 
                />
              )}
              {weather.airQuality && (
                <AirQualityCard airQuality={weather.airQuality} />
              )}
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto relative z-10 mt-auto py-4 w-full">
        <div className="text-center px-4">
          <p className="text-neutral-400 text-xs">
            Made with <span className="text-red-400">❤</span> by{' '}
            <a 
              href="https://github.com/pratik02-07" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white hover:text-neutral-200 transition-colors font-medium"
            >
              @pratik02-07
            </a>
          </p>
        </div>
      </footer>
    </main>
  );
}
