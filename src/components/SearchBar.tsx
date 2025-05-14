
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Home, MapPin } from "lucide-react";
import { toast } from "sonner";

interface SearchBarProps {
  onSearch: (city: string) => void;
  onGetCurrentLocation: () => void;
  onResetToDefault: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, onGetCurrentLocation, onResetToDefault }) => {
  const [city, setCity] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (city.trim() === "") {
      toast.error("Please enter a city name");
      return;
    }
    onSearch(city);
  };

  const handleLocationClick = () => {
    onGetCurrentLocation();
  };

  const handleDefaultLocationClick = () => {
    onResetToDefault();
  };

  return (
    <form onSubmit={handleSubmit} className="relative flex flex-wrap w-full max-w-lg items-center gap-2 mb-4">
      <div className="relative flex-1">
        <Input
          type="text"
          placeholder="Enter city name..."
          className="w-full pl-10 bg-white/80 focus-visible:ring-weather-purple"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
      </div>
      <Button 
        type="submit" 
        className="bg-weather-purple hover:bg-weather-stormy text-white"
      >
        Search
      </Button>
      <Button 
        type="button" 
        variant="outline"
        className="border-weather-purple text-weather-purple hover:text-weather-stormy hover:border-weather-stormy"
        onClick={handleLocationClick}
      >
        <MapPin className="mr-1 h-4 w-4" />
        My Location
      </Button>
      <Button 
        type="button" 
        variant="outline" 
        className="border-weather-purple text-weather-purple hover:text-weather-stormy hover:border-weather-stormy"
        onClick={handleDefaultLocationClick}
      >
        <Home className="mr-1 h-4 w-4" />
        Kadambagachi
      </Button>
    </form>
  );
};

export default SearchBar;
