
import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { WeatherData } from '../types/weather';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getWeatherIconUrl } from '../config/api';
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';

// Fix for default marker icon in react-leaflet
const customIcon = new Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Geoapify API Key
const GEOAPIFY_API_KEY = '2924b23669ed4ba79e48cff4729cec65';

interface WeatherMapProps {
  weatherData: WeatherData | null;
  onMapClick: (lat: number, lon: number) => void;
}

// Component to recenter map when coords change
const ChangeMapView: React.FC<{ coords: [number, number] }> = ({ coords }) => {
  const map = useMap();
  
  useEffect(() => {
    if (coords) {
      map.setView(coords, 10); // Set a consistent zoom level for better visibility
    }
  }, [coords, map]);
  
  return null;
};

// Component to handle map click events
const MapClickHandler: React.FC<{ onMapClick: (lat: number, lon: number) => void }> = ({ onMapClick }) => {
  const map = useMap();
  
  useEffect(() => {
    if (!map) return;
    
    const handleClick = (e: any) => {
      const { lat, lng } = e.latlng;
      // Round to 6 decimal places for more accurate location matching
      onMapClick(parseFloat(lat.toFixed(6)), parseFloat(lng.toFixed(6)));
    };
    
    map.on('click', handleClick);
    
    return () => {
      map.off('click', handleClick);
    };
  }, [map, onMapClick]);
  
  return null;
};

const WeatherMap: React.FC<WeatherMapProps> = ({ weatherData, onMapClick }) => {
  if (!weatherData) return (
    <Card className="bg-white/70 backdrop-blur-sm border-none shadow-md w-full mt-4">
      <CardHeader className="pb-2">
        <CardTitle>Weather Map</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80 flex items-center justify-center bg-white/50 rounded-md">
          <p>Select a location to view weather data</p>
        </div>
      </CardContent>
    </Card>
  );

  const { coords, city, temp, description, icon: weatherIcon } = weatherData;
  const position: [number, number] = [coords.lat, coords.lon];

  return (
    <Card className="bg-white/70 backdrop-blur-sm border-none shadow-md w-full mt-4">
      <CardHeader className="pb-2">
        <CardTitle>Weather Map</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80 rounded-md overflow-hidden">
          <MapContainer 
            center={position} 
            zoom={10} 
            style={{ height: '100%', width: '100%' }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | <a href="https://www.geoapify.com/">Geoapify</a>'
              url={`https://maps.geoapify.com/v1/tile/carto/{z}/{x}/{y}.png?&apiKey=${GEOAPIFY_API_KEY}`}
            />
            <Marker position={position} icon={customIcon}>
              <Popup>
                <div className="text-center">
                  <h3 className="font-medium">{city}</h3>
                  <img 
                    src={getWeatherIconUrl(weatherIcon)} 
                    alt={description}
                    className="w-10 h-10 mx-auto" 
                  />
                  <p className="capitalize">{description}</p>
                  <p className="font-bold">{temp}°C</p>
                </div>
              </Popup>
            </Marker>
            <ChangeMapView coords={position} />
            <MapClickHandler onMapClick={onMapClick} />
          </MapContainer>
        </div>
        <p className="text-xs text-muted-foreground mt-2 text-center">Click anywhere on the map to check weather at that location</p>
      </CardContent>
    </Card>
  );
};

export default WeatherMap;
