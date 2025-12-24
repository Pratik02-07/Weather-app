import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CurrentWeather as CurrentWeatherType } from "@/types/weather";
import { getWeatherIcon } from "@/assets/WeatherIcons";

export default function CurrentWeather({
  current,
}: {
  current: CurrentWeatherType;
}) {
  return (
    <Card className="bg-gradient-to-br from-blue-50 to-blue-100">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Current Weather</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 scale-75">{getWeatherIcon(current.condition)}</div>
          <div className="grid grid-cols-2 gap-3 flex-1 text-sm">
            <div>
              <p className="text-gray-500 text-xs">Temperature</p>
              <p className="text-2xl font-bold text-blue-900">{current.temp}°C</p>
            </div>
            <div>
              <p className="text-gray-500 text-xs">Condition</p>
              <p className="text-base font-semibold text-blue-800">{current.condition}</p>
            </div>
            <div>
              <p className="text-gray-500 text-xs">Max Temp</p>
              <p className="text-base font-semibold text-red-600">{current.max}°C</p>
            </div>
            <div>
              <p className="text-gray-500 text-xs">Min Temp</p>
              <p className="text-base font-semibold text-blue-600">{current.min}°C</p>
            </div>
            <div className="col-span-2">
              <p className="text-gray-500 text-xs">Wind Speed</p>
              <p className="text-base font-semibold text-gray-800">{current.wind.toFixed(2)} m/s</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}