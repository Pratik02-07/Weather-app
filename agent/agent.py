"""
Weather AI Agent - Feature Rich Version
With built-in limitations and error handling for production use!
"""

# Import basic tools
import os
import json
import requests
import httpx
from datetime import datetime
import time

# Get settings from environment
from dotenv import load_dotenv
load_dotenv()


# --- Rate Limiter Class ---
class RateLimiter:
    """Prevent API abuse with rate limiting"""

    def __init__(self):
        self.requests_today = 0
        self.last_request_time = 0
        self.daily_limit = 100  # 100 requests per day
        self.min_interval = 1.0  # 1 second between requests

    def can_make_request(self):
        """Check if we can make a request"""
        # Check daily limit
        current_time = time.time()
        if current_time - self.last_request_time > 86400:  # New day
            self.requests_today = 0
            self.last_request_time = current_time

        if self.requests_today >= self.daily_limit:
            return False, "Daily limit reached. Try again tomorrow!"

        # Check interval
        elapsed = current_time - self.last_request_time
        if elapsed < self.min_interval:
            return False, "Please wait a moment before making another request."

        return True, "OK"

    def record_request(self):
        """Record that we made a request"""
        self.requests_today += 1
        self.last_request_time = time.time()


# Global rate limiter
rate_limiter = RateLimiter()


# --- Weather Tools ---

class WeatherTools:
    """All weather tools with error handling"""

    @staticmethod
    def get_weather(city: str) -> str:
        """Get current weather details"""
        # Check rate limit first
        can_proceed, message = rate_limiter.can_make_request()
        if not can_proceed:
            return f"Limit: {message}"

        owm_key = os.getenv("OPENWEATHER_API_KEY", "")
        if not owm_key:
            return "Error: Weather API not configured. Please set OPENWEATHER_API_KEY."

        # Validate city name
        if not city or len(city) < 2:
            return "Error: Please provide a valid city name."

        if len(city) > 50:
            return "Error: City name too long. Please use a shorter name."

        try:
            url = "https://api.openweathermap.org/data/2.5/weather"
            data = {"q": city, "appid": owm_key, "units": "metric"}
            response = requests.get(url, params=data, timeout=10)

            if response.status_code == 404:
                return "Error: City not found. Please check the spelling."
            elif response.status_code == 401:
                return "Error: Invalid API key. Please check your OpenWeatherMap key."
            elif response.status_code != 200:
                return f"Error: Weather service unavailable. Status: {response.status_code}"

            weather = response.json()
            temp = weather["main"]["temp"]
            feels = weather["main"]["feels_like"]
            desc = weather["weather"][0]["description"]
            humidity = weather["main"]["humidity"]
            wind = weather["wind"]["speed"]

            rate_limiter.record_request()
            return f"Temperature: {temp}°C (feels like {feels}°C). {desc}. Humidity: {humidity}%. Wind: {wind} m/s."
        except requests.exceptions.Timeout:
            return "Error: Request timed out. Please try again."
        except Exception as e:
            return f"Error: {str(e)}"

    @staticmethod
    def get_forecast(city: str, days: int = 5) -> str:
        """Get weather forecast for upcoming days"""
        # Limit to 5 days max
        if days > 5:
            days = 5
        if days < 1:
            days = 1

        can_proceed, message = rate_limiter.can_make_request()
        if not can_proceed:
            return f"Limit: {message}"

        owm_key = os.getenv("OPENWEATHER_API_KEY", "")
        if not owm_key:
            return "Error: Weather API not configured"

        try:
            url = "https://api.openweathermap.org/data/2.5/forecast"
            data = {"q": city, "appid": owm_key, "units": "metric", "cnt": days * 8}
            response = requests.get(url, params=data, timeout=10)

            if response.status_code != 200:
                return "Error: Could not get forecast"

            forecast = response.json()
            list_data = forecast.get("list", [])

            if not list_data:
                return "Error: No forecast data available"

            result = f"Weather forecast for {city} ({days} days):\n"
            daily = {}
            for item in list_data:
                dt = item.get("dt", 0)
                date = datetime.fromtimestamp(dt).strftime("%Y-%m-%d")
                if date not in daily:
                    daily[date] = []
                daily[date].append(item)

            for i, (date, items) in enumerate(sorted(daily.items())[:days]):
                day_name = datetime.strptime(date, "%Y-%m-%d").strftime("%A")
                temps = [item["main"]["temp"] for item in items]
                conditions = [item["weather"][0]["description"] for item in items]
                min_temp = min(temps) if temps else "N/A"
                max_temp = max(temps) if temps else "N/A"
                cond = conditions[0] if conditions else "Unknown"
                result += f"- {day_name}: {min_temp}°C to {max_temp}°C, {cond}\n"

            rate_limiter.record_request()
            return result.strip()
        except Exception as e:
            return f"Error: {str(e)}"

    @staticmethod
    def detect_rain(city: str) -> str:
        """Detect if rain is expected"""
        can_proceed, message = rate_limiter.can_make_request()
        if not can_proceed:
            return f"Limit: {message}"

        owm_key = os.getenv("OPENWEATHER_API_KEY", "")
        if not owm_key:
            return "Error: Weather API not configured"

        try:
            url = "https://api.openweathermap.org/data/2.5/forecast"
            data = {"q": city, "appid": owm_key, "units": "metric", "cnt": 16}
            response = requests.get(url, params=data, timeout=10)

            if response.status_code != 200:
                return "Error: Could not check rain"

            forecast = response.json()
            list_data = forecast.get("list", [])

            rain_found = False
            for item in list_data:
                condition = item.get("weather", [{}])[0].get("main", "").lower()
                if "rain" in condition or "drizzle" in condition or "thunderstorm" in condition:
                    rain_found = True
                    break

            rate_limiter.record_request()

            if rain_found:
                return "Rain is expected in the next 24-48 hours. Consider carrying an umbrella! 🌧️"
            else:
                return "No rain expected in the near future. Good to go! ☀️"
        except Exception as e:
            return f"Error: {str(e)}"

    @staticmethod
    def get_wind_speed(city: str) -> str:
        """Get wind speed information"""
        can_proceed, message = rate_limiter.can_make_request()
        if not can_proceed:
            return f"Limit: {message}"

        owm_key = os.getenv("OPENWEATHER_API_KEY", "")
        if not owm_key:
            return "Error: Weather API not configured"

        try:
            url = "https://api.openweathermap.org/data/2.5/weather"
            data = {"q": city, "appid": owm_key, "units": "metric"}
            response = requests.get(url, params=data, timeout=10)

            if response.status_code != 200:
                return "Error: Could not get wind info"

            w = response.json()
            wind = w.get("wind", {})
            speed = wind.get("speed", 0)
            deg = wind.get("deg", 0)

            directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"]
            direction = directions[int((deg + 22.5) / 45) % 8]

            if speed < 2:
                interpretation = "Calm - great for outdoor activities"
            elif speed < 5:
                interpretation = "Light breeze - pleasant"
            elif speed < 10:
                interpretation = "Moderate breeze - some activities may be affected"
            else:
                interpretation = "Strong wind - be careful outside"

            rate_limiter.record_request()
            return f"Wind: {speed} m/s from {direction}. {interpretation}"
        except Exception as e:
            return f"Error: {str(e)}"

    @staticmethod
    def get_city_coordinates(city: str):
        """Resolve city name to latitude/longitude using OpenWeather geocoding API"""
        owm_key = os.getenv("OPENWEATHER_API_KEY", "")
        if not owm_key:
            return {"error": "Error: Weather API not configured. Please set OPENWEATHER_API_KEY."}

        if not city or len(city.strip()) < 2:
            return {"error": "Error: Please provide a valid city name."}

        try:
            url = "https://api.openweathermap.org/geo/1.0/direct"
            data = {"q": city.strip(), "limit": 1, "appid": owm_key}
            response = requests.get(url, params=data, timeout=10)

            if response.status_code != 200:
                return {"error": f"Error: Could not resolve city coordinates. Status: {response.status_code}"}

            geo = response.json()
            if not geo:
                return {"error": "Error: City not found. Please check the spelling."}

            place = geo[0]
            return {
                "lat": place.get("lat"),
                "lon": place.get("lon"),
                "name": place.get("name", city),
                "country": place.get("country", "")
            }
        except requests.exceptions.Timeout:
            return {"error": "Error: Request timed out. Please try again."}
        except Exception as e:
            return {"error": f"Error: {str(e)}"}


# --- Additional Features ---

class AdditionalFeatures:
    """Extra features with error handling"""

    @staticmethod
    def multilingual_weather(city: str, language: str) -> str:
        """Return weather report in selected language"""
        can_proceed, message = rate_limiter.can_make_request()
        if not can_proceed:
            return f"Limit: {message}"

        weather_data = WeatherTools.get_weather(city)
        if "Error" in weather_data or "Limit" in weather_data:
            return weather_data

        language_codes = {
            "english": "in English",
            "spanish": "in Spanish (Español)",
            "french": "in French (Français)",
            "german": "in German (Deutsch)",
            "hindi": "in Hindi (हिंदी)",
            "chinese": "in Chinese (中文)",
            "japanese": "in Japanese (日本語)",
        }

        lang_prompt = language_codes.get(language.lower(), "in English")

        prompt = f"""Translate this weather report {lang_prompt}:

Current weather in {city}: {weather_data}

Keep it short and helpful."""

        return AdditionalFeatures.call_ai(prompt)

    @staticmethod
    def suggest_travel_time(city: str) -> str:
        """Suggest best travel time based on weather"""
        can_proceed, message = rate_limiter.can_make_request()
        if not can_proceed:
            return f"Limit: {message}"

        weather_data = WeatherTools.get_weather(city)
        if "Error" in weather_data or "Limit" in weather_data:
            return weather_data

        prompt = f"""Based on this weather, suggest best travel time:

{weather_data}

Give specific recommendations (morning/evening/night). Be practical!"""

        return AdditionalFeatures.call_ai(prompt)

    @staticmethod
    def nearby_places(lat: float, lon: float, city: str = "") -> str:
        """Suggest nearby places based on weather"""
        can_proceed, message = rate_limiter.can_make_request()
        if not can_proceed:
            return f"Limit: {message}"

        location_context = f"{city} "

        prompt = f"""Suggest exactly 6 must-visit places near {location_context}.
    Only suggest places from that same city/area.

    Output format rules (strict):
    1) Return plain text only.
    2) Do NOT use markdown tables, pipes (|), or code blocks.
    3) Use this readable format:

    Nearby places in <City Name>

    1) <Place Name> — <Type>
       Why go: <one short line>
       Approx location: <short landmark/location>

    2) ... (continue up to 6)

    4) Keep each place concise (max 3 short lines per place).
    5) End with one short travel tip line.
    """

        return AdditionalFeatures.call_ai(prompt)

    @staticmethod
    def personalized_weather(user_id: str) -> str:
        """Personalized weather report based on user preferences"""
        can_proceed, message = rate_limiter.can_make_request()
        if not can_proceed:
            return f"Limit: {message}"

        prompt = """Create a personalized weather report:
- Friendly greeting
- Current conditions
- 3 recommendations (clothing, activity, health tip)

Make it short and helpful!"""

        return AdditionalFeatures.call_ai(prompt)

    @staticmethod
    def call_ai(prompt: str) -> str:
        """Helper to call OpenRouter AI"""
        can_proceed, message = rate_limiter.can_make_request()
        if not can_proceed:
            return f"Limit: {message}"

        api_key = os.getenv("OPENROUTER_API_KEY", "")
        api_url = "https://openrouter.ai/api/v1"
        model = os.getenv("MODEL", "openai/gpt-oss-120b:free")

        if not api_key:
            return "Error: API not configured. Please set OPENROUTER_API_KEY."

        try:
            headers = {
                "Authorization": f"Bearer {api_key}",
                "Content-Type": "application/json"
            }

            body = {
                "model": model,
                "messages": [{"role": "user", "content": prompt}],
                "temperature": 0.7,
                "max_tokens": 200
            }

            response = httpx.post(
                f"{api_url}/chat/completions",
                headers=headers,
                json=body,
                timeout=30.0
            )

            if response.status_code == 401:
                return "Error: Invalid API key. Please check your OpenRouter key."
            elif response.status_code == 429:
                return "Limit: Too many requests. Please wait and try again."
            elif response.status_code != 200:
                return f"Error: AI service unavailable. Status: {response.status_code}"

            result = response.json()
            rate_limiter.record_request()
            return result["choices"][0]["message"]["content"]

        except httpx.TimeoutException:
            return "Error: Request timed out. Please try again."
        except Exception as e:
            return f"Error: {str(e)}"


# --- Main Weather Agent Class ---
class WeatherAgent:
    """Main class that handles all weather questions"""

    def __init__(self):
        """Setup the agent when it starts"""
        self.api_key = os.getenv("OPENROUTER_API_KEY", "")
        self.api_url = "https://openrouter.ai/api/v1"
        self.model = os.getenv("MODEL", "openai/gpt-oss-120b:free")

        if not self.api_key:
            raise Exception("Need OPENROUTER_API_KEY in .env file")

        print("Weather Agent is ready!")

    def get_response(self, question: str, city: str) -> str:
        """Main function to answer weather questions"""

        # Check rate limit first
        can_proceed, message = rate_limiter.can_make_request()
        if not can_proceed:
            return f"⏳ {message}"

        # Validate inputs
        if not question or len(question.strip()) == 0:
            return "Please ask a question about the weather!"

        if len(question) > 500:
            return "Your question is too long. Please keep it under 500 characters."

        # Route to appropriate feature
        question_lower = question.lower()

        if "multilingual" in question_lower or "language" in question_lower:
            languages = ["english", "spanish", "french", "german", "hindi", "chinese", "japanese"]
            found_lang = "english"
            for lang in languages:
                if lang in question_lower:
                    found_lang = lang
                    break
            return AdditionalFeatures.multilingual_weather(city, found_lang)

        elif "nearby" in question_lower or "places" in question_lower:
            coordinates = WeatherTools.get_city_coordinates(city)
            if "error" in coordinates:
                return coordinates["error"]

            return AdditionalFeatures.nearby_places(
                coordinates["lat"],
                coordinates["lon"],
                coordinates.get("name", city)
            )

        elif "travel time" in question_lower or "best time" in question_lower:
            return AdditionalFeatures.suggest_travel_time(city)

        elif "personalized" in question_lower or "my weather" in question_lower:
            return AdditionalFeatures.personalized_weather("user123")

        # Default: Get weather and give travel advice
        weather_info = WeatherTools.get_weather(city)

        # Check if we got an error
        if "Error" in weather_info or "Limit" in weather_info:
            return weather_info

        return self.ask_ai(question, weather_info, city)

    def get_weather_from_api(self, city: str) -> str:
        """Get weather data from OpenWeatherMap"""
        return WeatherTools.get_weather(city)

    def ask_ai(self, question: str, weather_info: str, city: str) -> str:
        """Ask OpenRouter AI to answer the question"""

        prompt = f"""You are a friendly travel advisor.

Current weather in {city}:
{weather_info}

The user is asking: "{question}"

Based on the weather, give helpful travel advice. Keep it short (2-3 sentences). Use 1-2 emojis."""

        try:
            headers = {
                "Authorization": f"Bearer {self.api_key}",
                "Content-Type": "application/json"
            }

            body = {
                "model": self.model,
                "messages": [{"role": "user", "content": prompt}],
                "temperature": 0.7,
                "max_tokens": 200
            }

            response = httpx.post(
                f"{self.api_url}/chat/completions",
                headers=headers,
                json=body,
                timeout=30.0
            )

            rate_limiter.record_request()

            if response.status_code == 200:
                result = response.json()
                return result["choices"][0]["message"]["content"]
            elif response.status_code == 429:
                return "⏳ Too many requests. Please wait a moment and try again."
            else:
                return "Sorry, I'm having trouble answering right now."

        except Exception as e:
            return f"Sorry, error: {str(e)}"

    def get_insights(self, weather, forecast, air_quality, uv_index):
        """Generate simple weather insights"""
        try:
            temp = weather.get("current", {}).get("temp", 20)
        except:
            temp = 20

        insights = []

        if temp > 30:
            insights.append({
                "type": "warning",
                "title": "Hot Weather",
                "description": "Stay hydrated and wear light clothes",
                "icon": "☀️"
            })
        elif temp < 10:
            insights.append({
                "type": "warning",
                "title": "Cold Weather",
                "description": "Dress warmly in layers",
                "icon": "🥶"
            })

        if uv_index >= 6:
            insights.append({
                "type": "warning",
                "title": "High UV",
                "description": "Use sunscreen",
                "icon": "🧴"
            })

        if 15 <= temp <= 25:
            insights.append({
                "type": "tip",
                "title": "Great Weather",
                "description": "Perfect for outdoor activities",
                "icon": "🏃"
            })

        return insights