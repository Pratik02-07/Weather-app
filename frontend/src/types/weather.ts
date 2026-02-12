export interface CurrentWeather {
  condition: string;
  max: number;
  min: number;
  temp: number;
  wind: number;
  sunrise?: number;
  sunset?: number;
  humidity?: number;
}

export interface AirQuality {
  aqi: number; // 1=Good, 2=Fair, 3=Moderate, 4=Poor, 5=Very Poor
  pm2_5?: number;
  pm10?: number;
}

export interface ForecastItem {
  condition: string;
  day: string;
  temp: number;
}

export interface WeatherData {
  city: string;
  current: CurrentWeather;
  date: string;
  forecast: ForecastItem[];
  airQuality?: AirQuality;
  coordinates?: {
    lat: number;
    lon: number;
  };
}    