import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ForecastItem } from "@/types/weather";
import { getWeatherIcon } from "@/assets/WeatherIcons";

export default function Forecast({ forecast }: { forecast: ForecastItem[] }) {
  return (
    <Card className="bg-gradient-to-br from-purple-50 to-pink-50">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">5-Day Forecast</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-5 gap-2">
          {forecast.map((item, index) => (
            <div key={index} className="text-center p-2 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow text-xs">
              <p className="font-semibold text-gray-700">{item.day}</p>
              <div className="flex justify-center my-1 scale-50">
                {getWeatherIcon(item.condition)}
              </div>
              <p className="text-base font-bold text-gray-900 mt-1">{item.temp}°C</p>
              <p className="text-xs text-gray-600">{item.condition}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}