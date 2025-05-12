import React from 'react';
import { useWeather } from '../../context/WeatherContext';
import { motion } from 'framer-motion';
import { MapPin, Wind, Droplets, EyeIcon, SunIcon, MoonIcon, ThermometerIcon } from 'lucide-react';
import { Card, CardBody } from '../ui/Card';
import { getWeatherIcon, formatTime } from '../../utils/weatherUtils';
import weatherCodeMap from '../../utils/weatherCodeMap';

const CurrentWeather: React.FC = () => {
  const { weatherData, isLoading, error } = useWeather();
  
  if (isLoading) {
    return (
      <Card className="mb-6 animate-pulse">
        <CardBody className="p-6">
          <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="h-12 bg-gray-200 rounded w-1/3 mb-6"></div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="h-20 bg-gray-200 rounded"></div>
            ))}
          </div>
        </CardBody>
      </Card>
    );
  }
  
  if (error || !weatherData) {
    return (
      <Card className="mb-6 text-center p-6">
        <p className="text-red-500">Failed to load weather data</p>
        <p className="text-gray-600 mt-2">Please try again later or search for a different location</p>
      </Card>
    );
  }
  
  const { current, location } = weatherData;
  const weatherIcon = getWeatherIcon(current.icon);
  const weatherInfo = weatherCodeMap[current.icon] || { color: 'blue', bgColor: 'blue-50' };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className={`mb-6 bg-${weatherInfo.bgColor} border border-${weatherInfo.color}-100`}>
        <CardBody className="p-6">
          <div className="flex items-center mb-2">
            <MapPin size={18} className={`text-${weatherInfo.color}-500 mr-2`} />
            <h2 className="text-lg font-semibold text-gray-700">{location.name}</h2>
          </div>
          
          <div className="flex flex-col md:flex-row items-center justify-between mb-6">
            <div className="flex items-center">
              <div 
                className="text-7xl font-bold mr-4"
                style={{ color: `var(--${weatherInfo.color}-600)` }}
              >
                {Math.round(current.temp)}°
              </div>
              <div>
                <p className="text-xl font-medium text-gray-700">{current.description}</p>
                <p className="text-gray-500">Feels like {Math.round(current.feelsLike)}°</p>
              </div>
            </div>
            
            <div className="mt-4 md:mt-0 text-7xl text-center">
              {weatherIcon}
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-700">
            <div className="bg-white bg-opacity-60 p-3 rounded-lg shadow-sm">
              <div className="flex items-center mb-1">
                <Wind size={16} className={`text-${weatherInfo.color}-500 mr-2`} />
                <span className="font-medium">Wind</span>
              </div>
              <p className="text-xl font-semibold">{current.windSpeed} km/h</p>
            </div>
            
            <div className="bg-white bg-opacity-60 p-3 rounded-lg shadow-sm">
              <div className="flex items-center mb-1">
                <Droplets size={16} className={`text-${weatherInfo.color}-500 mr-2`} />
                <span className="font-medium">Humidity</span>
              </div>
              <p className="text-xl font-semibold">{current.humidity}%</p>
            </div>
            
            <div className="bg-white bg-opacity-60 p-3 rounded-lg shadow-sm">
              <div className="flex items-center mb-1">
                <EyeIcon size={16} className={`text-${weatherInfo.color}-500 mr-2`} />
                <span className="font-medium">Visibility</span>
              </div>
              <p className="text-xl font-semibold">{current.visibility} km</p>
            </div>
            
            <div className="bg-white bg-opacity-60 p-3 rounded-lg shadow-sm">
              <div className="flex items-center mb-1">
                <ThermometerIcon size={16} className={`text-${weatherInfo.color}-500 mr-2`} />
                <span className="font-medium">Pressure</span>
              </div>
              <p className="text-xl font-semibold">{current.pressure} hPa</p>
            </div>
          </div>
          
          <div className="mt-4 flex justify-between items-center p-3 bg-white bg-opacity-60 rounded-lg shadow-sm">
            <div className="flex items-center">
              <SunIcon size={18} className="text-amber-500 mr-2" />
              <span className="text-gray-700">Sunrise: {formatTime(current.sunrise)}</span>
            </div>
            <div className="flex items-center">
              <MoonIcon size={18} className="text-indigo-500 mr-2" />
              <span className="text-gray-700">Sunset: {formatTime(current.sunset)}</span>
            </div>
          </div>
        </CardBody>
      </Card>
    </motion.div>
  );
};

export default CurrentWeather;