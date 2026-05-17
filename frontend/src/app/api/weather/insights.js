export function generateInsights(weather, forecast, airQuality, uvIndex) {
  const insights = [];

  const temp = weather.main.temp;
  const humidity = weather.main.humidity;
  const windSpeed = weather.wind?.speed || 0;
  const condition = weather.weather[0]?.main?.toLowerCase() || '';
  const precipitation = forecast.list?.[0]?.pop || 0;

  // Temperature-based insights
  if (temp > 35) {
    insights.push({
      id: 'extreme-heat',
      type: 'warning',
      title: 'Extreme Heat Warning',
      description: 'Temperature exceeds 35°C. Stay hydrated, avoid direct sunlight, and keep cool.',
      icon: '🌡️',
      priority: 'high'
    });
  } else if (temp > 30) {
    insights.push({
      id: 'hot-weather',
      type: 'recommendation',
      title: 'Hot Weather Alert',
      description: "It's a hot day. Stay hydrated and wear light clothing.",
      icon: '☀️',
      priority: 'medium'
    });
  } else if (temp < 5) {
    insights.push({
      id: 'cold-weather',
      type: 'warning',
      title: 'Cold Weather Alert',
      description: 'Temperature is below 5°C. Dress warmly and limit time outdoors.',
      icon: '🥶',
      priority: 'high'
    });
  } else if (temp >= 15 && temp <= 25) {
    insights.push({
      id: 'perfect-day',
      type: 'recommendation',
      title: 'Perfect Weather Day',
      description: 'Ideal temperature for outdoor activities and exercise.',
      icon: '🌤️',
      priority: 'low'
    });
  }

  // Feels like vs actual temp
  const feelsLike = weather.main.feels_like;
  const diff = Math.abs(feelsLike - temp);
  if (diff > 5) {
    insights.push({
      id: 'feels-different',
      type: 'tip',
      title: 'Feels Different',
      description: `It feels ${feelsLike > temp ? 'warmer' : 'cooler'} than the actual temperature.`,
      icon: '🌡️',
      priority: 'low'
    });
  }

  // Rain/precipitation insights
  if (condition.includes('rain') || precipitation > 0.6) {
    insights.push({
      id: 'rain-expected',
      type: 'warning',
      title: 'Rain Expected',
      description: 'High chance of rain. Carry an umbrella or raincoat.',
      icon: '🌧️',
      priority: 'high'
    });
  } else if (precipitation > 0.3) {
    insights.push({
      id: 'possible-rain',
      type: 'tip',
      title: 'Possible Rain',
      description: "There's a chance of rain later. Consider carrying a small umbrella.",
      icon: '🌦️',
      priority: 'medium'
    });
  }

  // Wind insights
  if (windSpeed > 10) {
    insights.push({
      id: 'strong-wind',
      type: 'warning',
      title: 'Strong Winds',
      description: 'Wind speeds are high. Secure loose items and be careful outdoors.',
      icon: '💨',
      priority: 'high'
    });
  } else if (windSpeed > 5) {
    insights.push({
      id: 'windy',
      type: 'tip',
      title: 'Windy Conditions',
      description: "It's a bit windy. A light jacket might be useful.",
      icon: '🍃',
      priority: 'low'
    });
  }

  // Humidity insights
  if (humidity > 80) {
    insights.push({
      id: 'high-humidity',
      type: 'tip',
      title: 'High Humidity',
      description: 'High humidity levels. Stay hydrated and avoid strenuous activities.',
      icon: '💧',
      priority: 'medium'
    });
  }

  // UV Index insights
  if (uvIndex >= 8) {
    insights.push({
      id: 'extreme-uv',
      type: 'warning',
      title: 'Extreme UV Levels',
      description: 'Very high UV radiation. Use sunscreen, wear protective clothing, and seek shade.',
      icon: '🧴',
      priority: 'high'
    });
  } else if (uvIndex >= 6) {
    insights.push({
      id: 'high-uv',
      type: 'recommendation',
      title: 'High UV Index',
      description: 'Apply sunscreen if going outside. Seek shade during midday.',
      icon: '☂️',
      priority: 'medium'
    });
  } else if (uvIndex >= 3) {
    insights.push({
      id: 'moderate-uv',
      type: 'tip',
      title: 'Moderate UV',
      description: 'Some sun protection recommended during extended outdoor exposure.',
      icon: '🧉',
      priority: 'low'
    });
  }

  // Air quality insights
  if (airQuality) {
    if (airQuality.aqi >= 4) {
      insights.push({
        id: 'poor-air',
        type: 'warning',
        title: 'Poor Air Quality',
        description: 'Air quality is poor. Limit outdoor activities, especially for sensitive groups.',
        icon: '🌫️',
        priority: 'high'
      });
    } else if (airQuality.aqi === 3) {
      insights.push({
        id: 'moderate-air',
        type: 'tip',
        title: 'Moderate Air Quality',
        description: 'Air quality is moderate. Sensitive individuals should limit prolonged outdoor exposure.',
        icon: '🌿',
        priority: 'medium'
      });
    } else if (airQuality.aqi === 1) {
      insights.push({
        id: 'great-air',
        type: 'fact',
        title: 'Excellent Air Quality',
        description: 'Air quality is great! Perfect for outdoor activities.',
        icon: '✨',
        priority: 'low'
      });
    }
  }

  // Time-based insights
  const now = new Date();
  const hour = now.getHours();
  const sunrise = weather.sys?.sunrise ? new Date(weather.sys.sunrise * 1000) : null;
  const sunset = weather.sys?.sunset ? new Date(weather.sys.sunset * 1000) : null;

  if (sunrise && sunset) {
    const hoursUntilSunset = (sunset.getTime() - now.getTime()) / (1000 * 60 * 60);
    if (hoursUntilSunset > 2 && hoursUntilSunset < 4) {
      insights.push({
        id: 'golden-hour',
        type: 'fact',
        title: 'Golden Hour Approaching',
        description: 'Beautiful sunset lighting in the next few hours. Great for photography!',
        icon: '🌅',
        priority: 'low'
      });
    }
  }

  if (hour >= 5 && hour <= 8) {
    insights.push({
      id: 'morning-cool',
      type: 'recommendation',
      title: 'Great Morning Weather',
      description: 'Perfect time for a morning walk or jog!',
      icon: '🏃',
      priority: 'low'
    });
  }

  // Sort by priority
  const priorityOrder = { high: 0, medium: 1, low: 2 };
  insights.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);

  return insights.slice(0, 6);
}

export function generateAgentResponse(query, weatherData) {
  const queryLower = query.toLowerCase();

  const temp = weatherData.current.temp;
  const condition = weatherData.current.condition;
  const humidity = weatherData.current.humidity;
  const wind = weatherData.current.wind;
  const precipitation = weatherData.hourlyForecast?.[0]?.precipitation || 0;
  const aqi = weatherData.airQuality?.aqi || 0;

  // Simple rule-based responses
  if (queryLower.includes('umbrella') || queryLower.includes('rain')) {
    if (condition.toLowerCase().includes('rain') || precipitation > 40) {
      return "Yes, you should definitely take an umbrella! There's a high chance of rain.";
    } else if (precipitation > 20) {
      return "It might rain later. Consider carrying a small umbrella just in case.";
    }
    return "No umbrella needed right now! The sky looks clear.";
  }

  if (queryLower.includes('coat') || queryLower.includes('jacket') || queryLower.includes('warm')) {
    if (temp < 10) {
      return `Absolutely! It's quite cold at ${temp}°C. Wear a warm coat!`;
    } else if (temp < 18) {
      return `A light jacket would be good. It's ${temp}°C, a bit cool.`;
    }
    return `Not needed! At ${temp}°C, you should be comfortable in lighter clothing.`;
  }

  if (queryLower.includes('exercise') || queryLower.includes('run') || queryLower.includes('workout') || queryLower.includes('outdoor')) {
    if (temp > 35 || temp < 5 || condition.toLowerCase().includes('rain')) {
      return "Not ideal for outdoor exercise. Consider indoor activities today.";
    } else if (aqi >= 4) {
      return "Air quality is poor. Better to exercise indoors.";
    } else if (temp >= 15 && temp <= 25 && aqi <= 2) {
      return "Perfect weather for outdoor exercise! Go for it!";
    }
    return `It's ${temp}°C - doable for exercise, just stay hydrated!`;
  }

  if (queryLower.includes('sunscreen') || queryLower.includes('sunburn') || queryLower.includes('sun')) {
    if (weatherData.current.uvIndex >= 6) {
      return `Yes! UV index is ${weatherData.current.uvIndex} - very high. Apply sunscreen and wear protective clothing!`;
    } else if (weatherData.current.uvIndex >= 3) {
      return `Moderate UV (${weatherData.current.uvIndex}). Some sunscreen is recommended.`;
    }
    return `UV is low (${weatherData.current.uvIndex}). Minimal sun protection needed.`;
  }

  if (queryLower.includes('travel') || queryLower.includes('trip') || queryLower.includes('drive')) {
    if (condition.toLowerCase().includes('rain') || condition.toLowerCase().includes('storm')) {
      return "Not ideal for travel - bad weather conditions. Consider postponing if possible.";
    } else if (wind > 10) {
      return "Travel might be affected by strong winds. Drive carefully!";
    } else if (weatherData.current.visibility < 5) {
      return "Low visibility could affect travel. Drive with caution.";
    }
    return "Good conditions for travel! The weather looks favorable.";
  }

  if (queryLower.includes('air quality') || queryLower.includes('pollution')) {
    if (aqi === 1) return "Air quality is excellent! Perfect for any outdoor activity.";
    if (aqi === 2) return "Air quality is fair. Good for most outdoor activities.";
    if (aqi === 3) return "Air quality is moderate. Sensitive individuals should be cautious.";
    if (aqi >= 4) return "Air quality is poor. Limit outdoor activities.";
    return "Air quality data not available.";
  }

  if (queryLower.includes('best time') || queryLower.includes('when')) {
    return "Best outdoor time: late morning (9-11 AM) or afternoon (2-5 PM) when it's warmest!";
  }

  if (queryLower.includes('temperature') || queryLower.includes('how hot') || queryLower.includes('how cold')) {
    return `Current temperature is ${temp}°C, but feels like ${weatherData.current.feelsLike}°C.`;
  }

  // Fallback response
  return `Based on the current weather in ${weatherData.city}: It's ${temp}°C with ${condition.toLowerCase()}. The forecast shows ${weatherData.forecast?.[0]?.condition || 'similar conditions'} for the coming days.`;
}