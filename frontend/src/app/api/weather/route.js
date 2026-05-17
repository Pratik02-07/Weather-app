import { generateInsights } from './insights.js';

const OWM_API_KEY = process.env.NEXT_PUBLIC_OWM_API_KEY || process.env.OWM_API_KEY;
const OWM_WEATHER = "https://api.openweathermap.org/data/2.5/weather";
const OWM_FORECAST = "https://api.openweathermap.org/data/2.5/forecast";
const OWM_GEO = "https://api.openweathermap.org/geo/1.0/direct";
const OWM_AIR_POLLUTION = "https://api.openweathermap.org/data/2.5/air_pollution";
const OWM_UVI = "https://api.openweathermap.org/data/2.5/uvi";

const cache = new Map();
const CACHE_DURATION = 10 * 60 * 1000;

function getCachedData(key) {
  const entry = cache.get(key);
  if (entry && Date.now() - entry.timestamp < CACHE_DURATION) {
    return entry.data;
  }
  cache.delete(key);
  return null;
}

function setCachedData(key, data) {
  cache.set(key, { data, timestamp: Date.now() });
}

export async function GET(request) {
  const searchParams = request.nextUrl.searchParams;
  const city = searchParams.get('city');

  if (!city) {
    return Response.json(
      { error: "City parameter is required" },
      { status: 400 }
    );
  }

  if (!OWM_API_KEY) {
    return Response.json(
      { error: "API key not configured" },
      { status: 500 }
    );
  }

  const cacheKey = `weather_${city.toLowerCase()}`;
  const cached = getCachedData(cacheKey);
  if (cached) {
    return Response.json(cached);
  }

  try {
    // Geo location
    const geoResponse = await fetch(
      `${OWM_GEO}?q=${city}&limit=1&appid=${OWM_API_KEY}`
    );

    const geoData = await geoResponse.json();

    if (geoResponse.status !== 200 || !geoData || geoData.length === 0) {
      return Response.json({ error: "City not found" }, { status: 404 });
    }

    const lat = geoData[0].lat;
    const lon = geoData[0].lon;
    const country = geoData[0].country || "";

    // Current weather
    const weatherResponse = await fetch(
      `${OWM_WEATHER}?lat=${lat}&lon=${lon}&appid=${OWM_API_KEY}&units=metric`
    );
    const weather = await weatherResponse.json();

    if (weather.cod !== 200) {
      return Response.json({ error: "Failed to fetch current weather" }, { status: 500 });
    }

    // Forecast
    const forecastResponse = await fetch(
      `${OWM_FORECAST}?lat=${lat}&lon=${lon}&appid=${OWM_API_KEY}&units=metric`
    );
    const forecast = await forecastResponse.json();

    if (forecast.cod !== "200") {
      return Response.json({ error: "Failed to fetch forecast" }, { status: 500 });
    }

    // Air quality
    let airQuality = null;
    try {
      const aqiResponse = await fetch(
        `${OWM_AIR_POLLUTION}?lat=${lat}&lon=${lon}&appid=${OWM_API_KEY}`
      );
      const aqiData = await aqiResponse.json();

      if (aqiResponse.status === 200 && aqiData.list && aqiData.list[0]) {
        const aqiLabels = ["Good", "Fair", "Moderate", "Poor", "Very Poor"];
        airQuality = {
          aqi: aqiData.list[0].main.aqi,
          aqiLabel: aqiLabels[aqiData.list[0].main.aqi - 1] || "Unknown",
          pm2_5: Math.round(aqiData.list[0].components.pm2_5 * 10) / 10,
          pm10: Math.round(aqiData.list[0].components.pm10 * 10) / 10,
          o3: Math.round(aqiData.list[0].components.o3 * 10) / 10,
          no2: Math.round(aqiData.list[0].components.no2 * 10) / 10
        };
      }
    } catch (error) {
      console.error("Failed to fetch air quality:", error);
    }

    // Hourly forecast
    const hourlyForecast = [];
    for (const item of forecast.list || []) {
      if (item.dt_txt?.includes("00:00:00") ||
          item.dt_txt?.includes("03:00:00") ||
          item.dt_txt?.includes("06:00:00") ||
          item.dt_txt?.includes("09:00:00") ||
          item.dt_txt?.includes("12:00:00") ||
          item.dt_txt?.includes("15:00:00") ||
          item.dt_txt?.includes("18:00:00") ||
          item.dt_txt?.includes("21:00:00")) {
        const time = new Date(item.dt_txt);
        hourlyForecast.push({
          time: time.toLocaleTimeString("en-US", { hour: "numeric", hour12: true }),
          temp: Math.round(item.main.temp),
          condition: item.weather[0].main,
          conditionIcon: item.weather[0].icon,
          precipitation: Math.round((item.pop || 0) * 100)
        });
      }
    }

    // Daily forecast
    const dailyForecast = [];
    const seenDays = new Set();
    const now = new Date();

    for (const item of forecast.list || []) {
      const date = new Date(item.dt_txt);
      const dayName = date.toLocaleDateString("en-US", { weekday: "short" });

      if (item.dt_txt?.includes("12:00:00") && !seenDays.has(dayName)) {
        seenDays.add(dayName);
        dailyForecast.push({
          day: dayName,
          temp: Math.round(item.main.temp),
          min: Math.round(item.main.temp_min),
          max: Math.round(item.main.temp_max),
          condition: item.weather[0].main,
          conditionIcon: item.weather[0].icon,
          humidity: item.main.humidity,
          precipitation: Math.round((item.pop || 0) * 100),
          wind: Math.round(item.wind.speed)
        });
      }
    }

    // Add today to daily forecast
    const todayForecast = dailyForecast[0];
    if (todayForecast && todayForecast.day !== now.toLocaleDateString("en-US", { weekday: "short" })) {
      dailyForecast.unshift({
        day: "Today",
        temp: Math.round(weather.main.temp),
        min: Math.round(weather.main.temp_min),
        max: Math.round(weather.main.temp_max),
        condition: weather.weather[0].main,
        conditionIcon: weather.weather[0].icon,
        humidity: weather.main.humidity,
        precipitation: 0,
        wind: Math.round(weather.wind.speed)
      });
    }

    // UV Index
    let uvIndex = 0;
    try {
      const uviResponse = await fetch(
        `${OWM_UVI}?lat=${lat}&lon=${lon}&appid=${OWM_API_KEY}`
      );
      const uviData = await uviResponse.json();
      if (uviResponse.status === 200) {
        uvIndex = Math.round(uviData.value);
      }
    } catch (error) {
      console.error("Failed to fetch UV index:", error);
    }

    // Generate insights
    const insights = generateInsights(weather, forecast, airQuality, uvIndex);

    const response = {
      city: city.charAt(0).toUpperCase() + city.slice(1),
      country,
      date: now.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
      }),
      current: {
        temp: Math.round(weather.main.temp),
        feelsLike: Math.round(weather.main.feels_like),
        condition: weather.weather[0].main,
        conditionIcon: weather.weather[0].icon,
        description: weather.weather[0].description,
        min: Math.round(weather.main.temp_min),
        max: Math.round(weather.main.temp_max),
        wind: weather.wind.speed,
        windDirection: weather.wind.deg || 0,
        pressure: weather.main.pressure,
        visibility: Math.round((weather.visibility || 10000) / 1000),
        humidity: weather.main.humidity,
        uvIndex,
        sunrise: weather.sys.sunrise,
        sunset: weather.sys.sunset
      },
      hourlyForecast: hourlyForecast.slice(0, 8),
      forecast: dailyForecast.slice(0, 5),
      airQuality,
      coordinates: { lat, lon },
      timezone: weather.timezone,
      insights
    };

    setCachedData(cacheKey, response);
    return Response.json(response);
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { action } = body;

    if (action === 'compare') {
      const { city1, city2 } = body;

      const [weather1, weather2] = await Promise.all([
        fetch(`${request.nextUrl.origin}/api/weather?city=${city1}`).then(r => r.json()),
        fetch(`${request.nextUrl.origin}/api/weather?city=${city2}`).then(r => r.json())
      ]);

      if (weather1.error || weather2.error) {
        return Response.json({ error: "Failed to fetch weather for comparison" }, { status: 400 });
      }

      const tempDiff = Math.abs(weather1.current.temp - weather2.current.temp);
      const betterWeather = weather1.current.temp > weather2.current.temp ? city1 : city2;

      const comparison = {
        tempDiff,
        betterWeather,
        summary: `${city1} is ${tempDiff}°C ${tempDiff > 5 ? 'much ' : ''}warmer than ${city2}. ${betterWeather} has better conditions for outdoor activities.`
      };

      return Response.json({ city1: weather1, city2: weather2, comparison });
    }

    return Response.json({ error: "Invalid action" }, { status: 400 });
  } catch (error) {
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}