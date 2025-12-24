  "use client";

  import SearchForm from "@/components/SearchForm";
  import WeatherCard from "@/components/WeatherCard";
  import ErrorDisplay from "@/components/ErrorDisplay";
  import Footer from "@/components/Footer";
  import { useWeather } from "@/hooks/useWeather";

  export default function Home() {
    const { weather, loading, error, fetchWeather } = useWeather();

    return (
      <main className="relative w-full min-h-screen overflow-hidden">
        {/* Beach/Ocean Background */}
        <div className="fixed inset-0 -z-10">
          {/* Sky gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-sky-300 via-sky-200 to-cyan-100"></div>
          
          {/* Ocean waves effect */}
          <div className="absolute bottom-0 left-0 right-0 h-1/3">
            <svg className="w-full h-full" viewBox="0 0 1200 400" preserveAspectRatio="none">
              <defs>
                <linearGradient id="oceanGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" style={{ stopColor: "#0ea5e9", stopOpacity: 0.8 }} />
                  <stop offset="50%" style={{ stopColor: "#06b6d4", stopOpacity: 0.9 }} />
                  <stop offset="100%" style={{ stopColor: "#0369a1", stopOpacity: 1 }} />
                </linearGradient>
              </defs>
              <path
                d="M0,100 Q300,50 600,100 T1200,100 L1200,400 L0,400 Z"
                fill="url(#oceanGradient)"
              />
              <path
                d="M0,150 Q300,100 600,150 T1200,150 L1200,400 L0,400 Z"
                fill="#06b6d4"
                opacity="0.7"
              />
              <path
                d="M0,200 Q300,150 600,200 T1200,200 L1200,400 L0,400 Z"
                fill="#0284c7"
                opacity="0.5"
              />
            </svg>
          </div>

          {/* Sandy beach section */}
          <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-b from-amber-100 to-amber-200 opacity-80"></div>

          {/* Decorative palm trees */}
          <div className="absolute bottom-32 right-10 opacity-30">
            <div className="text-8xl">🌴</div>
          </div>
          <div className="absolute bottom-32 left-10 opacity-30">
            <div className="text-8xl">🌴</div>
          </div>
        </div>

        {/* Content Container */}
        <div className="relative z-10 flex flex-col items-center justify-start w-full h-screen pt-6 pb-4 px-4">
          <h1 className="text-4xl font-bold mb-1 text-white drop-shadow-lg text-center">Weather App</h1>
          <p className="text-white drop-shadow-md text-sm mb-4 text-center">Get current weather and forecasts</p>

          <SearchForm onSearch={fetchWeather} />

          {/* Content Area */}
          <div className="flex-1 w-full max-w-lg overflow-y-auto custom-scroll">
            <div className="flex flex-col items-center">
              {loading && (
                <p className="mt-4 text-white font-semibold animate-pulse drop-shadow-md">
                  🔄 Loading weather data...
                </p>
              )}
              {error && <ErrorDisplay error={error} />}
              {weather && <WeatherCard weather={weather} />}
            </div>
          </div>

          <Footer />
        </div>
      </main>
    );
  }
