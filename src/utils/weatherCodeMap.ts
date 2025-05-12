interface WeatherInfo {
  color: string;
  bgColor: string;
  label: string;
}

const weatherCodeMap: Record<string, WeatherInfo> = {
  // Clear
  '01d': { color: 'amber', bgColor: 'amber-50', label: 'Clear Sky' },
  '01n': { color: 'indigo', bgColor: 'indigo-50', label: 'Clear Night' },
  
  // Few clouds
  '02d': { color: 'blue', bgColor: 'blue-50', label: 'Few Clouds' },
  '02n': { color: 'indigo', bgColor: 'indigo-50', label: 'Few Clouds' },
  
  // Scattered clouds
  '03d': { color: 'gray', bgColor: 'gray-50', label: 'Scattered Clouds' },
  '03n': { color: 'gray', bgColor: 'gray-50', label: 'Scattered Clouds' },
  
  // Broken clouds
  '04d': { color: 'gray', bgColor: 'gray-50', label: 'Broken Clouds' },
  '04n': { color: 'gray', bgColor: 'gray-50', label: 'Broken Clouds' },
  
  // Shower rain
  '09d': { color: 'blue', bgColor: 'blue-50', label: 'Shower Rain' },
  '09n': { color: 'blue', bgColor: 'blue-50', label: 'Shower Rain' },
  
  // Rain
  '10d': { color: 'blue', bgColor: 'blue-50', label: 'Rain' },
  '10n': { color: 'blue', bgColor: 'blue-50', label: 'Rain' },
  
  // Thunderstorm
  '11d': { color: 'purple', bgColor: 'purple-50', label: 'Thunderstorm' },
  '11n': { color: 'purple', bgColor: 'purple-50', label: 'Thunderstorm' },
  
  // Snow
  '13d': { color: 'blue', bgColor: 'blue-50', label: 'Snow' },
  '13n': { color: 'blue', bgColor: 'blue-50', label: 'Snow' },
  
  // Mist
  '50d': { color: 'gray', bgColor: 'gray-50', label: 'Mist' },
  '50n': { color: 'gray', bgColor: 'gray-50', label: 'Mist' },
};

// Default fallback
const defaultWeatherInfo: WeatherInfo = {
  color: 'blue',
  bgColor: 'blue-50',
  label: 'Weather',
};

// Proxy to handle missing codes
export default new Proxy(weatherCodeMap, {
  get(target, prop) {
    if (typeof prop !== 'string') return defaultWeatherInfo;
    return target[prop] || defaultWeatherInfo;
  }
});