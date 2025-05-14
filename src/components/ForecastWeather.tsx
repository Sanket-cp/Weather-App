
import React from "react";
import { DailyForecast, ForecastData } from "../types/weather";
import { getWeatherIconUrl } from "../config/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface ForecastWeatherProps {
  forecast: DailyForecast | null;
  isLoading: boolean;
}

const ForecastItem: React.FC<{ data: ForecastData }> = ({ data }) => {
  const { weekday, temp, description, icon } = data;

  return (
    <div className="flex flex-col items-center p-3 bg-white/50 rounded-md">
      <span className="font-medium">{weekday}</span>
      <img 
        src={getWeatherIconUrl(icon)} 
        alt={description}
        className="w-10 h-10 my-1" 
      />
      <span className="text-xs text-muted-foreground capitalize">{description}</span>
      <div className="flex items-center space-x-2 mt-1">
        <span className="text-sm font-medium">{temp.max}°</span>
        <span className="text-xs text-muted-foreground">{temp.min}°</span>
      </div>
    </div>
  );
};

const ForecastWeather: React.FC<ForecastWeatherProps> = ({ forecast, isLoading }) => {
  if (isLoading) {
    return (
      <Card className="bg-white/70 backdrop-blur-sm border-none shadow-md w-full mt-4">
        <CardHeader className="pb-2">
          <CardTitle>
            <Skeleton className="h-6 w-40" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex flex-col items-center p-3 bg-white/30 rounded-md space-y-2">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-10 w-10 rounded-full" />
                <Skeleton className="h-3 w-20" />
                <Skeleton className="h-4 w-12" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!forecast) return null;

  // Get forecast for next 5 days (excluding today)
  const today = new Date().toISOString().split('T')[0];
  const forecastDays = Object.values(forecast)
    .filter(day => {
      const dayDate = new Date(day.date * 1000).toISOString().split('T')[0];
      return dayDate !== today;
    })
    .slice(0, 5);

  return (
    <Card className="bg-white/70 backdrop-blur-sm border-none shadow-md w-full mt-4">
      <CardHeader className="pb-2">
        <CardTitle>5-Day Forecast</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
          {forecastDays.map((day, index) => (
            <ForecastItem key={index} data={day} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ForecastWeather;
