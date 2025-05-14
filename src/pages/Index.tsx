
import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';

// Components
import SearchBar from '@/components/SearchBar';
import CurrentWeather from '@/components/CurrentWeather';
import ForecastWeather from '@/components/ForecastWeather';
import WeatherMap from '@/components/WeatherMap';

// Types
import { WeatherData, DailyForecast, Coordinates } from '@/types/weather';

// API
import { getWeatherByCoordinates, getWeatherByCity } from '@/utils/weatherApi';

// Default location coordinates for Kadambagachi
const DEFAULT_LOCATION = {
  lat: 22.7267,
  lon: 88.4380
};

const Index = () => {
  const [currentWeather, setCurrentWeather] = useState<WeatherData | null>(null);
  const [forecastWeather, setForecastWeather] = useState<DailyForecast | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch weather data on component mount
  useEffect(() => {
    getCurrentLocationWeather();
  }, []);

  // Get user's location and fetch weather with high accuracy
  const getCurrentLocationWeather = () => {
    setLoading(true);
    
    if (navigator.geolocation) {
      // Request location with high accuracy
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          // Round coordinates to 6 decimal places for consistent accuracy
          const lat = parseFloat(latitude.toFixed(6));
          const lon = parseFloat(longitude.toFixed(6));
          console.log('Detected coordinates:', lat, lon);
          await fetchWeatherByCoords({ lat, lon });
        },
        (error) => {
          console.error('Geolocation error:', error.message);
          toast.error(`Location error: ${error.message}. Using default location (Kadambagachi) instead.`);
          // Use Kadambagachi as default location when geolocation fails
          fetchWeatherByCoords(DEFAULT_LOCATION);
        },
        // Options for higher accuracy
        { 
          enableHighAccuracy: true, 
          timeout: 10000, 
          maximumAge: 0 
        }
      );
    } else {
      toast.error('Geolocation is not supported by your browser. Using default location (Kadambagachi) instead.');
      // Use Kadambagachi as default location when geolocation is not supported
      fetchWeatherByCoords(DEFAULT_LOCATION);
      setLoading(false);
    }
  };

  // Handle city search
  const handleCitySearch = async (city: string) => {
    setLoading(true);
    try {
      const { currentWeather, forecastWeather } = await getWeatherByCity(city);
      setCurrentWeather(currentWeather);
      setForecastWeather(forecastWeather);
      setError(null);
    } catch (err: any) {
      setError('City not found. Please try another location.');
      toast.error('City not found. Please try another location.');
      console.error('Error fetching weather by city:', err);
    } finally {
      setLoading(false);
    }
  };

  // Handle map click
  const handleMapClick = async (lat: number, lon: number) => {
    console.log('Map clicked at coordinates:', lat, lon);
    await fetchWeatherByCoords({ lat, lon });
  };

  // Fetch weather by coordinates
  const fetchWeatherByCoords = async (coords: Coordinates) => {
    setLoading(true);
    try {
      const { currentWeather, forecastWeather } = await getWeatherByCoordinates(coords);
      setCurrentWeather(currentWeather);
      setForecastWeather(forecastWeather);
      setError(null);
    } catch (err: any) {
      setError('Could not fetch weather data for this location.');
      toast.error('Could not fetch weather data for this location.');
      console.error('Error fetching weather by coords:', err);
    } finally {
      setLoading(false);
    }
  };

  // Button to reset to default location (Kadambagachi)
  const resetToDefaultLocation = () => {
    toast.info('Setting location to Kadambagachi');
    fetchWeatherByCoords(DEFAULT_LOCATION);
  };

  return (
    <div className="container mx-auto py-8 px-4 md:px-8">
      <h1 className="text-4xl font-bold text-center mb-2 text-weather-dark-gray">
        Weather App
      </h1>
      <p className="text-center text-muted-foreground mb-8">
        Get current weather and forecast for any location
      </p>

      <div className="flex flex-col items-center mb-8">
        <SearchBar 
          onSearch={handleCitySearch} 
          onGetCurrentLocation={getCurrentLocationWeather} 
          onResetToDefault={resetToDefaultLocation}
        />
      </div>

      {error && (
        <div className="text-center text-red-500 mb-4">{error}</div>
      )}

      <div className="grid md:grid-cols-2 gap-4 mb-4">
        <CurrentWeather data={currentWeather} isLoading={loading} />
        <ForecastWeather forecast={forecastWeather} isLoading={loading} />
      </div>

      <WeatherMap 
        weatherData={currentWeather} 
        onMapClick={handleMapClick}
      />

      {/* Environment file note */}
      <div className="mt-8 p-4 bg-white/70 backdrop-blur-sm rounded-md">
        <h3 className="font-medium mb-2">Note about API Key</h3>
        <p className="text-sm text-muted-foreground">
          This application uses the OpenWeatherMap API. For security reasons, we recommend storing your 
          API key in an environment variable. Create a <code>.env</code> file at the root of your project 
          with the following content:
        </p>
        <pre className="bg-gray-100 p-2 rounded mt-2 overflow-x-auto">
          <code>VITE_WEATHER_API_KEY=your_api_key_here</code>
        </pre>
        <p className="text-sm text-muted-foreground mt-2">
          Then modify the <code>api.ts</code> file to use: <code>import.meta.env.VITE_WEATHER_API_KEY</code>
        </p>
      </div>
    </div>
  );
};

export default Index;
