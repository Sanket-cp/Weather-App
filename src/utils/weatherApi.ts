
import axios from "axios";
import { WEATHER_API_KEY, WEATHER_API_URL } from "../config/api";
import { Coordinates, WeatherData, DailyForecast } from "../types/weather";

// Helper function to get day name
export const getDayName = (timestamp: number): string => {
  return new Date(timestamp * 1000).toLocaleDateString("en-US", { weekday: "short" });
};

// Convert Kelvin to Celsius
export const kelvinToCelsius = (kelvin: number): number => {
  return Math.round(kelvin - 273.15);
};

// Format current weather data
export const formatCurrentWeather = (data: any): WeatherData => {
  const {
    coord,
    main,
    name,
    dt,
    sys,
    weather,
    wind,
    timezone
  } = data;

  return {
    city: name,
    country: sys.country,
    date: dt,
    description: weather[0].description,
    icon: weather[0].icon,
    temp: kelvinToCelsius(main.temp),
    feels_like: kelvinToCelsius(main.feels_like),
    temp_min: kelvinToCelsius(main.temp_min),
    temp_max: kelvinToCelsius(main.temp_max),
    humidity: main.humidity,
    wind_speed: Math.round(wind.speed),
    sunrise: sys.sunrise,
    sunset: sys.sunset,
    timezone,
    coords: {
      lat: coord.lat,
      lon: coord.lon,
    },
  };
};

// Format forecast data
export const formatForecastWeather = (data: any): DailyForecast => {
  const { list } = data;
  
  const dailyForecast: DailyForecast = {};
  
  list.forEach((item: any) => {
    const date = new Date(item.dt * 1000);
    const dateString = date.toISOString().split('T')[0];
    
    if (!dailyForecast[dateString]) {
      dailyForecast[dateString] = {
        date: item.dt,
        weekday: getDayName(item.dt),
        temp: {
          min: kelvinToCelsius(item.main.temp_min),
          max: kelvinToCelsius(item.main.temp_max),
        },
        description: item.weather[0].description,
        icon: item.weather[0].icon,
        wind_speed: Math.round(item.wind.speed),
        humidity: item.main.humidity,
      };
    } else {
      // Update min/max temperatures if needed
      dailyForecast[dateString].temp.min = Math.min(
        dailyForecast[dateString].temp.min,
        kelvinToCelsius(item.main.temp_min)
      );
      dailyForecast[dateString].temp.max = Math.max(
        dailyForecast[dateString].temp.max,
        kelvinToCelsius(item.main.temp_max)
      );
    }
  });
  
  return dailyForecast;
};

// Get weather data by coordinates
export const getWeatherByCoordinates = async (coordinates: Coordinates) => {
  try {
    const { lat, lon } = coordinates;
    
    const [currentResponse, forecastResponse] = await Promise.all([
      axios.get(`${WEATHER_API_URL}/weather`, {
        params: {
          lat,
          lon,
          appid: WEATHER_API_KEY,
        },
      }),
      axios.get(`${WEATHER_API_URL}/forecast`, {
        params: {
          lat,
          lon,
          appid: WEATHER_API_KEY,
        },
      }),
    ]);

    const currentWeather = formatCurrentWeather(currentResponse.data);
    const forecastWeather = formatForecastWeather(forecastResponse.data);

    return { currentWeather, forecastWeather };
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw error;
  }
};

// Get weather data by city name
export const getWeatherByCity = async (city: string) => {
  try {
    // First get coordinates for the city
    const coordResponse = await axios.get(`${WEATHER_API_URL}/weather`, {
      params: {
        q: city,
        appid: WEATHER_API_KEY,
      },
    });

    const { coord } = coordResponse.data;
    
    // Then use those coordinates to get weather data
    return getWeatherByCoordinates({ lat: coord.lat, lon: coord.lon });
  } catch (error) {
    console.error("Error fetching weather data for city:", error);
    throw error;
  }
};
