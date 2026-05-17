# Weather App 2.0

A modern weather application with an AI assistant.

This repository contains:
- A Next.js frontend for city weather, hourly and multi-day forecasts, air quality, and weather details.
- A Python FastAPI backend agent for natural-language weather and travel guidance.

## What Is New

Compared to the earlier version, the project now includes:
- Integrated Weather AI chat in the city page (floating assistant UI).
- Dedicated Python agent service with multiple AI/weather endpoints.
- Hourly forecast panel and expanded weather detail cards.
- In-memory caching in the weather API route for faster repeated city queries.
- Enhanced weather insights generation and recommendation logic.

## Features

### Frontend (Next.js)
- Search weather by city and route to dynamic pages (`/[city]`).
- Current weather card (temperature, feels like, humidity, wind, UV).
- Multi-day forecast list (data currently returned up to 5 days).
- Hourly forecast strip.
- Additional cards for sunrise/sunset and AQI summary.
- Responsive UI with glassmorphism styling.

### Weather Data API (Next.js Route)
- Geocoding lookup by city name.
- Current weather retrieval.
- Forecast retrieval and formatting.
- Air quality data (AQI, PM2.5, PM10, O3, NO2).
- UV index retrieval.
- Computed weather insights.

### AI Agent Backend (FastAPI)
- Natural language weather responses (`/agent/agentic`).
- Endpoint set for weather, forecast, rain, wind, nearby places, travel-time advice, and personalized report.
- OpenRouter-powered response generation with OpenWeather-backed tools.

## Tech Stack

### Frontend
- Next.js 16.1.1
- React 19.2.3
- Axios 1.13.2
- Tailwind CSS 4
- Lucide React

### AI Backend
- FastAPI
- Uvicorn
- Pydantic
- Python Dotenv
- HTTPX
- Requests

### External Services
- OpenWeather API (geocoding, weather, forecast, air pollution, UV)
- OpenRouter API (LLM responses)

## Project Structure

```text
weather app/
|- README.md
|- vercel.json
|- agent/
|  |- agent.py
|  |- main.py
|  |- requirements.txt
|  |- .env.example
|  `- README.md
`- frontend/
   |- package.json
   |- next.config.ts
   |- tsconfig.json
   |- public/
   |  `- assets/
   |     |- fonts/
   |     `- images/
   `- src/
      |- app/
      |  |- api/weather/
      |  |  |- route.js
      |  |  `- insights.js
      |  |- [city]/page.jsx
      |  |- layout.jsx
      |  `- page.jsx
      |- components/
      |  |- CitySearch.jsx
      |  |- TodayWeather.jsx
      |  |- ForecastList.jsx
      |  |- HourlyForecast.jsx
      |  |- WeatherDetails.jsx
      |  |- WeatherAgent.jsx
      |  `- SimpleBackground.jsx
      |- hooks/useWeather.jsx
      |- services/weather.service.jsx
      `- lib/axios.jsx
```

## How It Works

1. User searches for a city on the home page.
2. App routes to `/<city-name>`.
3. Frontend calls `GET /api/weather?city=<city>`.
4. API route resolves coordinates and fetches weather + forecast + AQI + UV from OpenWeather.
5. API route returns formatted payload for current, hourly, forecast, details, and insights.
6. City page renders weather cards and optional AI chat assistant.
7. AI chat sends user query to Python backend (`/agent/agentic`) with the selected city.

## API Endpoints

### Next.js weather route
- `GET /api/weather?city=<city>`
- `POST /api/weather` with body:

```json
{
  "action": "compare",
  "city1": "Pune",
  "city2": "Mumbai"
}
```

### FastAPI weather agent 
- `GET /`
- `GET /health`
- `POST /agent/agentic`
- `POST /agent/insights`
- `POST /agent/weather`
- `POST /agent/forecast`
- `POST /agent/rain`
- `POST /agent/wind`
- `POST /agent/nearby`
- `POST /agent/travel-time`


## Acknowledgments

- OpenWeather API
- OpenRouter API
- Next.js and React
- FastAPI

Made with 💗 by [@pratik02-07](https://github.com/pratik02-07)
