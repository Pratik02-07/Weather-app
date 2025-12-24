import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { WeatherData } from "@/types/weather";
import CurrentWeather from "./CurrentWeather";
import Forecast from "./Forecast";

export default function WeatherCard({ weather }: { weather: WeatherData }) {
  return (
    <div className="w-full space-y-3 mt-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-2xl">{weather.city}</CardTitle>
          <p className="text-gray-500 text-xs">{weather.date}</p>
        </CardHeader>
      </Card>
      <CurrentWeather current={weather.current} />
      <Forecast forecast={weather.forecast} />
    </div>
  );
}
