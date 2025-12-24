import datetime
import requests
import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)

OWM_API_KEY = os.getenv("OWM_API_KEY")

OWM_WEATHER = "https://api.openweathermap.org/data/2.5/weather"
OWM_FORECAST = "https://api.openweathermap.org/data/2.5/forecast"
OWM_GEO = "https://api.openweathermap.org/geo/1.0/direct"


@app.route("/api/weather", methods=["GET"])
def get_weather():
    city = request.args.get("city")

    if not city:
        return jsonify({"error": "City parameter is required"}), 400

    if not OWM_API_KEY:
        return jsonify({"error": "API key not configured"}), 500

    # -------- GEO LOCATION --------
    geo_response = requests.get(
        OWM_GEO,
        params={
            "q": city,
            "limit": 1,
            "appid": OWM_API_KEY
        }
    )

    geo_data = geo_response.json()

    if geo_response.status_code != 200 or not geo_data:
        return jsonify({"error": "City not found"}), 404

    lat = geo_data[0].get("lat")
    lon = geo_data[0].get("lon")

    # -------- CURRENT WEATHER --------
    weather_response = requests.get(
        OWM_WEATHER,
        params={
            "lat": lat,
            "lon": lon,
            "appid": OWM_API_KEY,
            "units": "metric"
        }
    )
    weather = weather_response.json()

    if weather.get("cod") != 200:
        return jsonify({"error": "Failed to fetch current weather"}), 500

    # -------- FORECAST --------
    forecast_response = requests.get(
        OWM_FORECAST,
        params={
            "lat": lat,
            "lon": lon,
            "appid": OWM_API_KEY,
            "units": "metric"
        }
    )
    forecast = forecast_response.json()

    if forecast.get("cod") != "200":
        return jsonify({"error": "Failed to fetch forecast"}), 500

    today = datetime.datetime.now()
    daily_forecast = []

    for item in forecast.get("list", []):
        if "12:00:00" in item.get("dt_txt", ""):
            date = datetime.datetime.strptime(
                item["dt_txt"], "%Y-%m-%d %H:%M:%S"
            )
            daily_forecast.append({
                "day": date.strftime("%a"),
                "temp": round(item["main"]["temp"]),
                "condition": item["weather"][0]["main"]
            })

    response = {
        "city": city.title(),
        "date": today.strftime("%A, %B %d"),
        "current": {
            "temp": round(weather["main"]["temp"]),
            "condition": weather["weather"][0]["main"],
            "min": round(weather["main"]["temp_min"]),
            "max": round(weather["main"]["temp_max"]),
            "wind": weather["wind"]["speed"]
        },
        "forecast": daily_forecast[:5]
    }

    return jsonify(response), 200
@app.route("/", methods=["GET", "HEAD"])
def index():
    return jsonify({"status": "ok"}), 200


if __name__ == "__main__":
    # Use PORT env var (provided by many hosts) and bind to all interfaces
    port = int(os.environ.get("PORT", 5000))
    host = os.environ.get("HOST", "0.0.0.0")
    debug = os.environ.get("FLASK_DEBUG", "False").lower() in ("1", "true", "yes")
    app.run(host=host, port=port, debug=debug)
