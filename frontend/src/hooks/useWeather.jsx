import { useState, useCallback } from "react";
import { getWeather } from "../services/weather.service";

const AGENT_API_URL = process.env.NEXT_PUBLIC_AGENT_API_URL || 'http://localhost:8000';

export function useWeather() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [agentMessages, setAgentMessages] = useState([]);
  const [agentLoading, setAgentLoading] = useState(false);
  const [agentError, setAgentError] = useState(null);

  const fetchWeather = useCallback(async (city) => {
    setLoading(true);
    setError(null);
    setWeather(null);
    setAgentMessages([]);
    setAgentError(null);

    try {
      const data = await getWeather(city);
      setWeather(data);
    } catch (err) {
      let errorMsg = "Failed to fetch weather data";

      if (err.response?.status === 404) {
        errorMsg = "City not found. Please check the spelling and try again.";
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
  }, []);

  const sendAgentQuery = useCallback(async (query) => {
    if (!weather || !query.trim()) return;

    setAgentError(null);
    const userMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: query,
      timestamp: Date.now()
    };

    setAgentMessages(prev => [...prev, userMessage]);
    setAgentLoading(true);

    try {
      const queryText = query.toLowerCase();

      const pickEndpoint = () => {
        if (/(insight|summary|alert|recommendation)/.test(queryText)) return '/agent/insights';
        if (/(forecast|tomorrow|next\s+\d+\s*day|next\s+week|weekend)/.test(queryText)) return '/agent/forecast';
        if (/(rain|umbrella|drizzle|thunderstorm)/.test(queryText)) return '/agent/rain';
        if (/(wind|breeze|gust)/.test(queryText)) return '/agent/wind';
        if (/(nearby|places|visit|around\s+me|things\s+to\s+do)/.test(queryText)) return '/agent/nearby';
        if (/(travel|trip|commute|best\s+time\s+to\s+go|drive)/.test(queryText)) return '/agent/travel-time';
        if (/(weather|temperature|temp|humidity|condition|how\s+is\s+it)/.test(queryText)) return '/agent/weather';
        return '/agent/agentic';
      };

      const endpoint = pickEndpoint();
      const body = endpoint === '/agent/insights'
        ? {
            weather,
            forecast: { list: weather.hourlyForecast || [] },
            air_quality: weather.airQuality || null,
            uv_index: weather.current?.uvIndex || 0
          }
        : {
            query,
            city: weather.city
          };

      const response = await fetch(`${AGENT_API_URL}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();

      const getAssistantContent = () => {
        if (endpoint === '/agent/agentic') return data.message;
        if (endpoint === '/agent/weather') return data.weather;
        if (endpoint === '/agent/forecast') return data.forecast;
        if (endpoint === '/agent/rain') return data.rain_status;
        if (endpoint === '/agent/wind') return data.wind;
        if (endpoint === '/agent/nearby') return data.places;
        if (endpoint === '/agent/travel-time') return data.travel_advice;
        if (endpoint === '/agent/insights') {
          if (!Array.isArray(data.insights) || data.insights.length === 0) {
            return 'No special insights right now. Conditions look normal.';
          }

          return data.insights
            .map((item) => `${item.icon || '•'} ${item.title}: ${item.description}`)
            .join('\n');
        }

        return data.message;
      };

      const assistantMessage = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: getAssistantContent() || "I couldn't understand that. Try asking about weather!",
        timestamp: Date.now()
      };

      setAgentMessages(prev => [...prev, assistantMessage]);
    } catch (err) {
      console.error("Agent query failed:", err);
      setAgentError("AI Agent is temporarily unavailable. Please try again later.");
      const errorMessage = {
        id: `error-${Date.now()}`,
        role: 'assistant',
        content: "AI Agent is temporarily unavailable.",
        timestamp: Date.now()
      };
      setAgentMessages(prev => [...prev, errorMessage]);
    } finally {
      setAgentLoading(false);
    }
  }, [weather]);

  const clearAgentMessages = useCallback(() => {
    setAgentMessages([]);
    setAgentError(null);
  }, []);

  return {
    weather,
    loading,
    error,
    fetchWeather,
    agentMessages,
    agentLoading,
    sendAgentQuery,
    clearAgentMessages,
    agentError
  };
}