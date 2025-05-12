import React from 'react';
import { useWeather } from '../../context/WeatherContext';
import { motion } from 'framer-motion';
import { Card, CardBody, CardHeader } from '../ui/Card';
import { getWeatherIcon, formatDate } from '../../utils/weatherUtils';
import { ThermometerIcon, ArrowDownIcon, ArrowUpIcon, Droplets, Wind } from 'lucide-react';

const DailyForecast: React.FC = () => {
  const { weatherData, isLoading } = useWeather();
  
  if (isLoading || !weatherData) {
    return (
      <Card className="animate-pulse">
        <CardHeader>
          <div className="h-6 bg-gray-200 rounded w-48"></div>
        </CardHeader>
        <CardBody className="p-0">
          <div className="grid grid-cols-1 md:grid-cols-5 divide-y md:divide-y-0 md:divide-x divide-gray-100">
            {[...Array(5)].map((_, index) => (
              <div key={index} className="p-4">
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-3"></div>
                <div className="h-10 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>
    );
  }
  
  const { daily } = weatherData;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Card>
        <CardHeader className="border-b border-gray-100">
          <h2 className="font-semibold text-gray-700">5-Day Forecast</h2>
        </CardHeader>
        <CardBody className="p-0">
          <div className="grid grid-cols-1 md:grid-cols-5 divide-y md:divide-y-0 md:divide-x divide-gray-100">
            {daily.map((day, index) => (
              <motion.div 
                key={day.date}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 * index }}
                className="p-4 hover:bg-gray-50 transition-colors"
              >
                <p className={`text-sm font-medium ${index === 0 ? 'text-blue-600' : 'text-gray-700'}`}>
                  {index === 0 ? 'Today' : formatDate(day.date)}
                </p>
                
                <div className="flex items-center justify-between mt-2 mb-3">
                  <div className="text-3xl md:text-4xl">
                    {getWeatherIcon(day.icon)}
                  </div>
                  <div className="flex flex-col items-end">
                    <div className="flex items-center text-amber-600">
                      <ArrowUpIcon size={14} className="mr-1" />
                      <span className="font-semibold">{Math.round(day.tempMax)}°</span>
                    </div>
                    <div className="flex items-center text-blue-600">
                      <ArrowDownIcon size={14} className="mr-1" />
                      <span className="font-semibold">{Math.round(day.tempMin)}°</span>
                    </div>
                  </div>
                </div>
                
                <p className="text-gray-600 text-sm mb-2">{day.description}</p>
                
                <div className="grid grid-cols-2 gap-1 text-xs text-gray-500">
                  <div className="flex items-center">
                    <Droplets size={12} className="mr-1" />
                    <span>{day.humidity}%</span>
                  </div>
                  <div className="flex items-center">
                    <Wind size={12} className="mr-1" />
                    <span>{day.windSpeed} km/h</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </CardBody>
      </Card>
    </motion.div>
  );
};

export default DailyForecast;