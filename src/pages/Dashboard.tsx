import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useWeather } from '../context/WeatherContext';
import WeatherSearch from '../components/weather/WeatherSearch';
import CurrentWeather from '../components/weather/CurrentWeather';
import DailyForecast from '../components/weather/DailyForecast';
import HourlyForecast from '../components/weather/HourlyForecast';
import WeatherAlerts from '../components/weather/WeatherAlerts';
import SavedLocations from '../components/weather/SavedLocations';
import { Star, StarOff } from 'lucide-react';
import Button from '../components/ui/Button';

const Dashboard: React.FC = () => {
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const { currentLocation, weatherData, addToFavorites, removeFromFavorites } = useWeather();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Redirect unauthenticated users after auth is checked
    if (!authLoading && !isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, authLoading, navigate]);
  
  if (authLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }
  
  const toggleFavorite = () => {
    if (!currentLocation) return;
    
    if (currentLocation.isFavorite) {
      removeFromFavorites(currentLocation.id);
    } else {
      addToFavorites(currentLocation);
    }
  };
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-4 md:mb-0">Weather Dashboard</h1>
        <WeatherSearch />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-1">
          <SavedLocations />
          
          {weatherData && currentLocation && (
            <div className="flex justify-center mb-6">
              <Button
                onClick={toggleFavorite}
                variant={currentLocation.isFavorite ? "outline" : "primary"}
                className="w-full"
              >
                {currentLocation.isFavorite ? (
                  <>
                    <StarOff size={18} className="mr-2" />
                    Remove from Favorites
                  </>
                ) : (
                  <>
                    <Star size={18} className="mr-2" />
                    Add to Favorites
                  </>
                )}
              </Button>
            </div>
          )}
        </div>
        
        <div className="md:col-span-3">
          <WeatherAlerts />
          
          {weatherData ? (
            <>
              <CurrentWeather />
              <DailyForecast />
              <HourlyForecast />
            </>
          ) : (
            <div className="bg-white rounded-xl shadow-md p-8 text-center">
              <div className="text-gray-500 mb-4">
                Search for a location to see weather information
              </div>
              <WeatherSearch />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;