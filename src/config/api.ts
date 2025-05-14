
// Import API key from environment variables if available
export const WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY || "1dcced640daad681e1fe500b19beeb98";
export const WEATHER_API_URL = "https://api.openweathermap.org/data/2.5";

// Example URLs:
// Current weather: https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}
// 5-day forecast: https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}

export const getWeatherIconUrl = (iconCode: string) => 
  `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
