# Weather AI Agent - Feature Rich Server
# Impressive version with many features for recruiters!

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, Dict, Any
import os
from dotenv import load_dotenv

load_dotenv()

from agent import WeatherAgent, WeatherTools, AdditionalFeatures

# Create the app
app = FastAPI(
    title="Weather AI Agent",
    description="Feature-rich weather assistant with AI capabilities"
)

# Allow frontend to access backend
frontend_origin = os.getenv("FRONTEND_ORIGIN", "http://localhost:3000")
allowed_origins = [origin.strip() for origin in frontend_origin.split(",") if origin.strip()]

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins or ["http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Start the weather agent
try:
    weather_agent = WeatherAgent()
    print("Weather Agent is ready!")
except:
    print("Could not start Weather Agent")
    weather_agent = None


# --- Request Models ---
class QueryData(BaseModel):
    query: str
    city: str


class InsightData(BaseModel):
    weather: Dict[str, Any]
    forecast: Dict[str, Any]
    air_quality: Optional[Dict[str, Any]] = None
    uv_index: int = 0


# --- API Endpoints ---

@app.get("/")
def home():
    """Show API information"""
    return {
        "message": "Weather AI Agent API",
        "version": "2.0.0",
        "features": [
            "Weather queries",
            "Travel advice",
            "Multilingual support",
            "Nearby places",
            "Travel time suggestions",
            "Personalized reports"
        ]
    }


@app.post("/agent/agentic")
def agentic_query(request: QueryData):
    """Main endpoint for weather questions"""
    if weather_agent is None:
        return {"message": "Agent not ready"}

    response = weather_agent.get_response(request.query, request.city)
    return {"message": response}


@app.post("/agent/weather")
def get_weather(request: QueryData):
    """Get current weather for a city"""
    weather = WeatherTools.get_weather(request.city)
    return {"weather": weather}


@app.post("/agent/forecast")
def get_forecast(request: QueryData):
    """Get weather forecast"""
    forecast = WeatherTools.get_forecast(request.city, days=5)
    return {"forecast": forecast}


@app.post("/agent/rain")
def check_rain(request: QueryData):
    """Check if rain is expected"""
    rain_status = WeatherTools.detect_rain(request.city)
    return {"rain_status": rain_status}


@app.post("/agent/wind")
def check_wind(request: QueryData):
    """Get wind information"""
    wind_info = WeatherTools.get_wind_speed(request.city)
    return {"wind": wind_info}


@app.post("/agent/multilingual")
def multilingual_weather(request: QueryData):
    """Get weather in different languages"""
    # Try to extract language from query
    languages = ["english", "spanish", "french", "german", "hindi", "chinese", "japanese"]
    lang = "english"
    for language in languages:
        if language in request.query.lower():
            lang = language
            break

    result = AdditionalFeatures.multilingual_weather(request.city, lang)
    return {"weather": result, "language": lang}


@app.post("/agent/nearby")
def nearby_places(request: QueryData):
    """Get nearby place suggestions"""
    coordinates = WeatherTools.get_city_coordinates(request.city)
    if "error" in coordinates:
        return {"places": coordinates["error"]}

    result = AdditionalFeatures.nearby_places(
        coordinates["lat"],
        coordinates["lon"],
        coordinates.get("name", request.city)
    )
    return {"places": result}


@app.post("/agent/travel-time")
def travel_time(request: QueryData):
    """Get best travel time suggestions"""
    result = AdditionalFeatures.suggest_travel_time(request.city)
    return {"travel_advice": result}


@app.post("/agent/personalized")
def personalized_weather(request: QueryData):
    """Get personalized weather report"""
    result = AdditionalFeatures.personalized_weather("user123")
    return {"personalized_report": result}


@app.post("/agent/insights")
def get_insights(request: InsightData):
    """Get weather insights"""
    if weather_agent is None:
        return {"insights": []}

    insights = weather_agent.get_insights(
        request.weather,
        request.forecast,
        request.air_quality,
        request.uv_index
    )
    return {"insights": insights}


@app.get("/health")
def health():
    """Health check"""
    return {"status": "OK", "agent": "ready" if weather_agent else "not ready"}


# Run the server
if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", "8000"))
    uvicorn.run(app, host="0.0.0.0", port=port)