
export interface Coordinates {
  lat: number;
  lon: number;
}

export interface WeatherData {
  city: string;
  country: string;
  date: number;
  description: string;
  icon: string;
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  humidity: number;
  wind_speed: number;
  sunrise: number;
  sunset: number;
  timezone: number;
  coords: Coordinates;
}

export interface ForecastData {
  date: number;
  weekday: string;
  temp: {
    min: number;
    max: number;
  };
  description: string;
  icon: string;
  wind_speed: number;
  humidity: number;
}

export interface DailyForecast {
  [date: string]: ForecastData;
}

export interface WeatherError {
  message: string;
}
