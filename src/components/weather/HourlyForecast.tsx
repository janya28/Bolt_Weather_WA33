import React, { useRef } from 'react';
import { useWeather } from '../../context/WeatherContext';
import { motion } from 'framer-motion';
import { Card, CardBody, CardHeader } from '../ui/Card';
import { getWeatherIcon, formatTime } from '../../utils/weatherUtils';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const HourlyForecast: React.FC = () => {
  const { weatherData, isLoading } = useWeather();
  const scrollRef = useRef<HTMLDivElement>(null);
  
  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = direction === 'left' ? -200 : 200;
      current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };
  
  if (isLoading || !weatherData) {
    return (
      <Card className="mt-6 animate-pulse">
        <CardHeader>
          <div className="h-6 bg-gray-200 rounded w-48"></div>
        </CardHeader>
        <CardBody>
          <div className="flex space-x-6 overflow-x-auto pb-2">
            {[...Array(8)].map((_, index) => (
              <div key={index} className="min-w-24 flex-shrink-0">
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
  
  const { hourly } = weatherData;
  // Only show the next 24 hours
  const hourlyData = hourly.slice(0, 24);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="mt-6"
    >
      <Card>
        <CardHeader className="border-b border-gray-100 flex justify-between items-center">
          <h2 className="font-semibold text-gray-700">Hourly Forecast</h2>
          <div className="flex space-x-2">
            <button 
              onClick={() => scroll('left')}
              className="p-1 rounded-full hover:bg-gray-100"
              aria-label="Scroll left"
            >
              <ChevronLeft size={20} />
            </button>
            <button 
              onClick={() => scroll('right')}
              className="p-1 rounded-full hover:bg-gray-100"
              aria-label="Scroll right"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </CardHeader>
        <CardBody>
          <div 
            className="flex space-x-6 overflow-x-auto pb-2 scrollbar-hide" 
            ref={scrollRef}
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {hourlyData.map((hour, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.05 * index }}
                className="min-w-20 flex-shrink-0 flex flex-col items-center"
              >
                <p className={`text-sm font-medium ${index === 0 ? 'text-blue-600' : 'text-gray-700'}`}>
                  {index === 0 ? 'Now' : formatTime(hour.time)}
                </p>
                <div className="my-2 text-2xl">
                  {getWeatherIcon(hour.icon)}
                </div>
                <p className="text-base font-semibold">{Math.round(hour.temp)}°</p>
                <p className="text-xs text-gray-500">{hour.description}</p>
              </motion.div>
            ))}
          </div>
        </CardBody>
      </Card>
    </motion.div>
  );
};

export default HourlyForecast;