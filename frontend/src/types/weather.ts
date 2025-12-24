export interface CurrentWeather {
  condition: string;
  max: number;
  min: number;
  temp: number;
  wind: number;
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
}    