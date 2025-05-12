import { Location, WeatherData, CurrentWeather, DailyForecast, HourlyForecast, WeatherAlert } from '../types';

// In a real app, these would be API calls to a weather service like OpenWeather API
// For now, we'll simulate API responses

export const fetchWeatherData = async (location: Location): Promise<WeatherData> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Generate weather data based on location
  const current: CurrentWeather = {
    temp: Math.floor(Math.random() * 30) + 5, // 5-35°C
    feelsLike: Math.floor(Math.random() * 30) + 5,
    description: getRandomWeatherDescription(),
    icon: getRandomWeatherIcon(),
    humidity: Math.floor(Math.random() * 60) + 40, // 40-100%
    windSpeed: Math.floor(Math.random() * 20) + 1, // 1-20 km/h
    windDirection: Math.floor(Math.random() * 360), // 0-359°
    pressure: Math.floor(Math.random() * 30) + 985, // 985-1015 hPa
    uvIndex: Math.floor(Math.random() * 10) + 1, // 1-10
    visibility: Math.floor(Math.random() * 5) + 5, // 5-10 km
    sunrise: '06:30',
    sunset: '18:30',
  };
  
  // Generate 5 days of daily forecasts
  const daily: DailyForecast[] = Array.from({ length: 5 }, (_, index) => {
    const date = new Date();
    date.setDate(date.getDate() + index);
    
    return {
      date: date.toISOString().split('T')[0],
      tempMax: Math.floor(Math.random() * 10) + current.temp,
      tempMin: current.temp - Math.floor(Math.random() * 10),
      description: getRandomWeatherDescription(),
      icon: getRandomWeatherIcon(),
      precipitation: Math.random() * 100,
      humidity: Math.floor(Math.random() * 30) + 60,
      windSpeed: Math.floor(Math.random() * 20) + 1,
    };
  });
  
  // Generate 24 hours of hourly forecasts
  const hourly: HourlyForecast[] = Array.from({ length: 24 }, (_, index) => {
    const hours = new Date().getHours() + index;
    const time = `${hours % 24}:00`;
    
    return {
      time,
      temp: Math.floor(Math.random() * 10) + current.temp - 5,
      feelsLike: Math.floor(Math.random() * 10) + current.temp - 5,
      description: getRandomWeatherDescription(),
      icon: getRandomWeatherIcon(),
      precipitation: Math.random() * 100,
      humidity: Math.floor(Math.random() * 30) + 60,
      windSpeed: Math.floor(Math.random() * 20) + 1,
    };
  });
  
  // Generate random weather alerts (20% chance to have an alert)
  const alerts: WeatherAlert[] = Math.random() > 0.8 ? [{
    id: '1',
    locationId: location.id,
    type: getRandomAlertType(),
    severity: getRandomSeverity(),
    title: getRandomAlertTitle(),
    description: 'Weather authorities have issued an alert for this region. Take necessary precautions.',
    startsAt: new Date().toISOString(),
    endsAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
  }] : [];
  
  return {
    location,
    current,
    daily,
    hourly,
    alerts,
  };
};

// Helper functions for generating random weather data
function getRandomWeatherDescription(): string {
  const descriptions = [
    'Clear sky',
    'Few clouds',
    'Scattered clouds',
    'Broken clouds',
    'Shower rain',
    'Rain',
    'Thunderstorm',
    'Snow',
    'Mist'
  ];
  
  return descriptions[Math.floor(Math.random() * descriptions.length)];
}

function getRandomWeatherIcon(): string {
  const icons = [
    '01d', // clear sky
    '02d', // few clouds
    '03d', // scattered clouds
    '04d', // broken clouds
    '09d', // shower rain
    '10d', // rain
    '11d', // thunderstorm
    '13d', // snow
    '50d', // mist
  ];
  
  return icons[Math.floor(Math.random() * icons.length)];
}

function getRandomAlertType(): string {
  const types = [
    'Thunderstorm',
    'Flood',
    'Extreme Temperature',
    'High Wind',
    'Dense Fog',
    'Hail',
    'Hurricane',
    'Tornado',
  ];
  
  return types[Math.floor(Math.random() * types.length)];
}

function getRandomSeverity(): 'minor' | 'moderate' | 'severe' | 'extreme' {
  const severities: ('minor' | 'moderate' | 'severe' | 'extreme')[] = [
    'minor',
    'moderate',
    'severe',
    'extreme',
  ];
  
  return severities[Math.floor(Math.random() * severities.length)];
}

function getRandomAlertTitle(): string {
  const titles = [
    'Severe Weather Warning',
    'Flash Flood Watch',
    'Extreme Heat Advisory',
    'Wind Advisory',
    'Dense Fog Advisory',
    'Severe Thunderstorm Warning',
    'Hurricane Watch',
    'Tornado Warning',
  ];
  
  return titles[Math.floor(Math.random() * titles.length)];
}