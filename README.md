
# Weather App

A responsive React-based weather application that provides current weather data and a 5-day forecast. The app uses the OpenWeatherMap API for weather data and integrates with Leaflet for an interactive map.

## Features

- Current weather display including temperature, humidity, wind speed, and more
- 5-day weather forecast
- Interactive map to check weather by clicking on any location
- Location-based weather with browser geolocation
- City search functionality
- Responsive design for all screen sizes

## Project info

**URL**: https://lovable.dev/projects/0113a4b0-e6dd-4566-a2f2-3425b69ab9a7

## Setup Instructions

### Prerequisites

- Node.js & npm installed
- OpenWeatherMap API key (get one for free at [OpenWeatherMap](https://openweathermap.org/api))

### Installation

1. Clone the repository:
```sh
git clone <YOUR_GIT_URL>
cd <YOUR_PROJECT_NAME>
```

2. Install dependencies:
```sh
npm install
```

3. Create a `.env` file in the root directory based on `.env.example`:
```sh
# Add your OpenWeatherMap API key
VITE_WEATHER_API_KEY=your_api_key_here
```

4. Start the development server:
```sh
npm run dev
```

### Usage

- The app will automatically attempt to detect your location for local weather
- Use the search bar to look up weather by city name
- Click anywhere on the map to get weather data for that location
- The "My Location" button will re-fetch weather for your current location

## Technologies Used

- React with TypeScript
- Tailwind CSS for styling
- OpenWeatherMap API for weather data
- Leaflet for interactive mapping
- Axios for API requests
- shadcn/ui for UI components

## Deployment

The app can be deployed to Vercel or Netlify:

### Vercel
1. Connect your GitHub repository to Vercel
2. Add your API key to the environment variables
3. Deploy!

### Netlify
1. Connect your GitHub repository to Netlify
2. Add your API key to the environment variables
3. Set the build command to `npm run build`
4. Set the publish directory to `dist`
5. Deploy!

## API Information

This project uses the OpenWeatherMap API with the following endpoints:

- Current weather: `/weather`
- 5-day forecast: `/forecast`

For API documentation, visit [OpenWeatherMap API Docs](https://openweathermap.org/api).
