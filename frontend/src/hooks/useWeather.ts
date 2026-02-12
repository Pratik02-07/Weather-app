import { useState } from "react";
import { getWeather } from "../services/weather.service";
import { WeatherData } from "../types/weather";

export function useWeather() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchWeather = async (city: string) => {
    setLoading(true);
    setError(null);
    setWeather(null);
    try {
      const data = await getWeather(city);
      setWeather(data);
    } catch (err: any) {
      let errorMsg = "Failed to fetch weather data";
      
      if (err.response?.status === 404) {
        errorMsg = "City not found. Please check the spelling and try again.";
      } else if (err.response?.data?.error) {
        errorMsg = err.response.data.error;
      } else if (err.message === "Network Error" || err.code === "ERR_NETWORK") {
        errorMsg = "Cannot connect to the server.";
      } else if (err.message) {
        errorMsg = err.message;
      }
      
      setError(errorMsg);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return { weather, loading, error, fetchWeather };
}
