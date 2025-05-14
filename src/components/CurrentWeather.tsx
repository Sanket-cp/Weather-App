
import { WeatherData } from "../types/weather";
import { getWeatherIconUrl } from "../config/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sun, CloudSun, CloudRain } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface CurrentWeatherProps {
  data: WeatherData | null;
  isLoading: boolean;
}

const CurrentWeather: React.FC<CurrentWeatherProps> = ({ data, isLoading }) => {
  if (isLoading) {
    return (
      <Card className="bg-white/70 backdrop-blur-sm border-none shadow-md w-full">
        <CardHeader className="pb-2">
          <CardTitle>
            <Skeleton className="h-8 w-3/4" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <Skeleton className="h-16 w-28" />
              <Skeleton className="h-4 w-40" />
            </div>
            <div>
              <Skeleton className="h-16 w-16 rounded-full" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-6">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!data) return null;

  const {
    city,
    country,
    description,
    temp,
    feels_like,
    humidity,
    wind_speed,
    icon,
  } = data;

  const formattedDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const getWeatherIcon = () => {
    if (description.includes("clear")) {
      return <Sun className="h-10 w-10 text-weather-sunny" />;
    } else if (description.includes("cloud")) {
      return <CloudSun className="h-10 w-10 text-weather-cloud" />;
    } else if (description.includes("rain") || description.includes("drizzle")) {
      return <CloudRain className="h-10 w-10 text-weather-rainy" />;
    } else {
      return <img src={getWeatherIconUrl(icon)} alt={description} className="w-16 h-16" />;
    }
  };

  return (
    <Card className="bg-white/70 backdrop-blur-sm border-none shadow-md w-full">
      <CardHeader className="pb-2">
        <CardTitle className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-weather-dark-gray">{city}, {country}</h2>
            <p className="text-sm text-muted-foreground">{formattedDate}</p>
          </div>
          {getWeatherIcon()}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div>
            <div className="text-5xl font-bold text-weather-purple">{temp}°C</div>
            <div className="text-sm text-muted-foreground capitalize">
              {description} | Feels like {feels_like}°C
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-6">
          <div className="bg-white/50 p-3 rounded-md flex flex-col items-center">
            <span className="text-sm text-muted-foreground">Humidity</span>
            <span className="font-medium">{humidity}%</span>
          </div>
          <div className="bg-white/50 p-3 rounded-md flex flex-col items-center">
            <span className="text-sm text-muted-foreground">Wind</span>
            <span className="font-medium">{wind_speed} m/s</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CurrentWeather;
