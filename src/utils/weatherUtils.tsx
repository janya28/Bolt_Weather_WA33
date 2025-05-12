import React from 'react';
import {
  Sun,
  Cloud,
  CloudDrizzle,
  CloudRain,
  CloudSnow,
  CloudLightning,
  CloudFog,
  CloudSun,
} from 'lucide-react';

export const getWeatherIcon = (iconCode: string) => {
  // Map OpenWeather icon codes to Lucide icons
  switch (iconCode) {
    case '01d':
    case '01n':
      return <Sun className="text-amber-500" />;
    case '02d':
    case '02n':
      return <CloudSun className="text-amber-500" />;
    case '03d':
    case '03n':
    case '04d':
    case '04n':
      return <Cloud className="text-gray-500" />;
    case '09d':
    case '09n':
      return <CloudDrizzle className="text-blue-500" />;
    case '10d':
    case '10n':
      return <CloudRain className="text-blue-600" />;
    case '11d':
    case '11n':
      return <CloudLightning className="text-purple-600" />;
    case '13d':
    case '13n':
      return <CloudSnow className="text-blue-300" />;
    case '50d':
    case '50n':
      return <CloudFog className="text-gray-400" />;
    default:
      return <Sun className="text-amber-500" />;
  }
};

export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
};

export const formatTime = (timeString: string) => {
  // Handle different time formats
  let hours: number;
  let minutes = 0;
  
  if (timeString.includes(':')) {
    [hours, minutes] = timeString.split(':').map(Number);
  } else {
    hours = parseInt(timeString);
  }
  
  // Convert to 12-hour format
  const period = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12;
  
  // Format minutes with leading zero if needed
  const formattedMinutes = minutes.toString().padStart(2, '0');
  
  return `${hours}:${formattedMinutes} ${period}`;
};