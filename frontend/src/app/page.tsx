"use client";

import { useRouter } from "next/navigation";
import CitySearch from "@/components/CitySearch";
import Beams from "@/components/Beams";
import RotatingText from "@/components/RotatingText";

export default function Home() {
  const router = useRouter();

  const handleSearch = (city: string) => {
    const formattedCity = city.toLowerCase().replace(/\s+/g, '-');
    router.push(`/${encodeURIComponent(formattedCity)}`);
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
        <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 sm:gap-4 mb-6 sm:mb-8">
          <div className="flex items-center gap-3 sm:gap-4">
            <div>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
                Weather App
              </h1>
              <p className="text-xs text-neutral-300 mt-0.5 sm:mt-1 font-medium">Real-time weather updates</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 flex-1 md:max-w-2xl">
            <div className="flex-1">
              <CitySearch onSearch={handleSearch} />
            </div>
          </div>
        </header>

        {/* Empty State */}
        <div className="flex items-center justify-center flex-1">
          <div className="text-center max-w-lg glass-effect rounded-2xl sm:rounded-3xl p-8 sm:p-10 md:p-12 mx-4">
            <div className="text-6xl sm:text-7xl md:text-8xl mb-4 sm:mb-6">🌤️</div>
            <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 text-white">
              Welcome to Weather App
            </h2>
            <div className="mb-6 sm:mb-8 flex justify-center">
              <div className="w-[180px] sm:w-[200px] h-[40px] sm:h-[44px] flex items-center justify-center overflow-hidden">
                <RotatingText
                  texts={[
                    'Real-time Updates',
                    '7-Day Forecasts',
                    'Global Coverage',
                    'Accurate Data'
                  ]}
                  mainClassName="w-full inline-flex px-3 py-2 bg-white/10 text-white rounded-lg text-xs sm:text-sm font-medium justify-center whitespace-nowrap"
                  staggerFrom="last"
                  initial={{ y: "100%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: "-120%", opacity: 0 }}
                  staggerDuration={0.015}
                  splitLevelClassName="inline-flex"
                  elementLevelClassName="inline-block"
                  transition={{ type: "spring", damping: 35, stiffness: 500 }}
                  rotationInterval={2500}
                />
              </div>
            </div>
            <p className="text-neutral-200 text-sm sm:text-base leading-relaxed mb-6 sm:mb-8 px-2">
              Discover weather conditions and forecasts for any city around the world
            </p>
            <div className="flex flex-wrap gap-2 sm:gap-3 justify-center">
              {['Kolhapur', 'Pune', 'Mumbai', 'Delhi'].map((city) => (
                <button
                  key={city}
                  onClick={() => handleSearch(city)}
                  className="px-4 sm:px-5 py-1.5 sm:py-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold rounded-full text-xs sm:text-sm transition-all transform hover:scale-105"
                >
                  {city}
                </button>
              ))}
            </div>
          </div>
        </div>
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
