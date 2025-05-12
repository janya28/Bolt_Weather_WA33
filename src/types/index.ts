export interface User {
  id: string;
  email: string;
  name: string;
}

export interface Location {
  id: string;
  name: string;
  lat: number;
  lon: number;
  isFavorite: boolean;
}

export interface WeatherAlert {
  id: string;
  locationId: string;
  type: string;
  severity: 'minor' | 'moderate' | 'severe' | 'extreme';
  title: string;
  description: string;
  startsAt: string;
  endsAt: string;
}

export interface CurrentWeather {
  temp: number;
  feelsLike: number;
  description: string;
  icon: string;
  humidity: number;
  windSpeed: number;
  windDirection: number;
  pressure: number;
  uvIndex: number;
  visibility: number;
  sunrise: string;
  sunset: string;
}

export interface DailyForecast {
  date: string;
  tempMax: number;
  tempMin: number;
  description: string;
  icon: string;
  precipitation: number;
  humidity: number;
  windSpeed: number;
}

export interface HourlyForecast {
  time: string;
  temp: number;
  feelsLike: number;
  description: string;
  icon: string;
  precipitation: number;
  humidity: number;
  windSpeed: number;
}

export interface WeatherData {
  location: Location;
  current: CurrentWeather;
  hourly: HourlyForecast[];
  daily: DailyForecast[];
  alerts: WeatherAlert[];
}