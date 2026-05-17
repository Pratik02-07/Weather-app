import type { NextRequest } from 'next/server';

const OWM_API_KEY = process.env.NEXT_PUBLIC_OWM_API_KEY || process.env.OWM_API_KEY;
const OWM_WEATHER = "https://api.openweathermap.org/data/2.5/weather";
const OWM_FORECAST = "https://api.openweathermap.org/data/2.5/forecast";
const OWM_GEO = "https://api.openweathermap.org/geo/1.0/direct";
const OWM_AIR_POLLUTION = "https://api.openweathermap.org/data/2.5/air_pollution";

export async function GET(request: NextRequest) {
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

  try {
    // -------- GEO LOCATION --------
    const geoResponse = await fetch(
      `${OWM_GEO}?q=${city}&limit=1&appid=${OWM_API_KEY}`
    );

    const geoData = await geoResponse.json();

    if (geoResponse.status !== 200 || !geoData || geoData.length === 0) {
      return Response.json(
        { error: "City not found" },
        { status: 404 }
      );
    }

    const lat = geoData[0].lat;
    const lon = geoData[0].lon;

    // -------- CURRENT WEATHER --------
    const weatherResponse = await fetch(
      `${OWM_WEATHER}?lat=${lat}&lon=${lon}&appid=${OWM_API_KEY}&units=metric`
    );
    const weather = await weatherResponse.json();

    if (weather.cod !== 200) {
      return Response.json(
        { error: "Failed to fetch current weather" },
        { status: 500 }
      );
    }

    // -------- FORECAST --------
    const forecastResponse = await fetch(
      `${OWM_FORECAST}?lat=${lat}&lon=${lon}&appid=${OWM_API_KEY}&units=metric`
    );
    const forecast = await forecastResponse.json();

    if (forecast.cod !== "200") {
      return Response.json(
        { error: "Failed to fetch forecast" },
        { status: 500 }
      );
    }

    // -------- AIR QUALITY --------
    let airQuality = null;
    try {
      const aqiResponse = await fetch(
        `${OWM_AIR_POLLUTION}?lat=${lat}&lon=${lon}&appid=${OWM_API_KEY}`
      );
      const aqiData = await aqiResponse.json();
      
      if (aqiResponse.status === 200 && aqiData.list && aqiData.list[0]) {
        airQuality = {
          aqi: aqiData.list[0].main.aqi,
          pm2_5: aqiData.list[0].components.pm2_5,
          pm10: aqiData.list[0].components.pm10
        };
      }
    } catch (error) {
      console.error("Failed to fetch air quality:", error);
      // Continue without air quality data
    }

    // Process forecast data
    const dailyForecast: any[] = [];
    const now = new Date();

    for (const item of forecast.list || []) {
      if (item.dt_txt?.includes("12:00:00")) {
        const date = new Date(item.dt_txt);
        dailyForecast.push({
          day: date.toLocaleDateString("en-US", { weekday: "short" }),
          temp: Math.round(item.main.temp),
          condition: item.weather[0].main
        });
      }
    }

    const response = {
      city: city.charAt(0).toUpperCase() + city.slice(1),
      date: now.toLocaleDateString("en-US", { 
        weekday: "long", 
        year: "numeric", 
        month: "long", 
        day: "numeric" 
      }),
      current: {
        temp: Math.round(weather.main.temp),
        condition: weather.weather[0].main,
        min: Math.round(weather.main.temp_min),
        max: Math.round(weather.main.temp_max),
        wind: weather.wind.speed,
        sunrise: weather.sys.sunrise,
        sunset: weather.sys.sunset,
        humidity: weather.main.humidity
      },
      forecast: dailyForecast.slice(0, 5),
      airQuality,
      coordinates: { lat, lon }
    };

    return Response.json(response);
  } catch (error) {
    console.error(error);
    return Response.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
