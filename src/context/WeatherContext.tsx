import React, { createContext, useContext, useState } from 'react';
import { Location, WeatherData } from '../types';
import { fetchWeatherData } from '../services/weatherService';

interface WeatherContextType {
  currentLocation: Location | null;
  weatherData: WeatherData | null;
  favoriteLocations: Location[];
  isLoading: boolean;
  error: string | null;
  searchLocation: (query: string) => Promise<Location[]>;
  setCurrentLocation: (location: Location) => void;
  addToFavorites: (location: Location) => void;
  removeFromFavorites: (locationId: string) => void;
  loadWeatherData: (location: Location) => Promise<void>;
}

const WeatherContext = createContext<WeatherContextType>({
  currentLocation: null,
  weatherData: null,
  favoriteLocations: [],
  isLoading: false,
  error: null,
  searchLocation: async () => [],
  setCurrentLocation: () => {},
  addToFavorites: () => {},
  removeFromFavorites: () => {},
  loadWeatherData: async () => {},
});

export const useWeather = () => useContext(WeatherContext);

export const WeatherProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentLocation, setCurrentLocation] = useState<Location | null>(null);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [favoriteLocations, setFavoriteLocations] = useState<Location[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load favorite locations from localStorage on component mount
  React.useEffect(() => {
    const storedLocations = localStorage.getItem('favoriteLocations');
    if (storedLocations) {
      setFavoriteLocations(JSON.parse(storedLocations));
    }
  }, []);

  const searchLocation = async (query: string): Promise<Location[]> => {
    // In a real app, this would be an API call to a geocoding service
    // For now, we'll simulate a search result
    
    if (!query.trim()) return [];
    
    // Mock locations based on query
    const mockLocations: Location[] = [
      {
        id: '1',
        name: `${query} City, Country`,
        lat: 40.7128,
        lon: -74.0060,
        isFavorite: favoriteLocations.some(loc => loc.id === '1'),
      },
      {
        id: '2',
        name: `${query} Town, Country`,
        lat: 34.0522,
        lon: -118.2437,
        isFavorite: favoriteLocations.some(loc => loc.id === '2'),
      },
    ];
    
    return mockLocations;
  };

  const addToFavorites = (location: Location) => {
    const updatedLocation = { ...location, isFavorite: true };
    
    // Update the location in the list or add it if it doesn't exist
    const updatedFavorites = favoriteLocations.some(loc => loc.id === location.id)
      ? favoriteLocations.map(loc => loc.id === location.id ? updatedLocation : loc)
      : [...favoriteLocations, updatedLocation];
    
    setFavoriteLocations(updatedFavorites);
    
    // If this is the current location, update it too
    if (currentLocation?.id === location.id) {
      setCurrentLocation(updatedLocation);
    }
    
    // Save to localStorage
    localStorage.setItem('favoriteLocations', JSON.stringify(updatedFavorites));
  };

  const removeFromFavorites = (locationId: string) => {
    const updatedFavorites = favoriteLocations.filter(loc => loc.id !== locationId);
    setFavoriteLocations(updatedFavorites);
    
    // If this is the current location, update its favorite status
    if (currentLocation?.id === locationId) {
      setCurrentLocation({
        ...currentLocation,
        isFavorite: false,
      });
    }
    
    // Save to localStorage
    localStorage.setItem('favoriteLocations', JSON.stringify(updatedFavorites));
  };

  const loadWeatherData = async (location: Location) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const data = await fetchWeatherData(location);
      setWeatherData(data);
      setCurrentLocation(location);
    } catch (err) {
      setError('Failed to load weather data. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <WeatherContext.Provider
      value={{
        currentLocation,
        weatherData,
        favoriteLocations,
        isLoading,
        error,
        searchLocation,
        setCurrentLocation,
        addToFavorites,
        removeFromFavorites,
        loadWeatherData,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};