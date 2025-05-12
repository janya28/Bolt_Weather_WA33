import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Cloud, MapPin, Bell, UserCircle } from 'lucide-react';
import Button from '../components/ui/Button';
import WeatherSearch from '../components/weather/WeatherSearch';
import { useWeather } from '../context/WeatherContext';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { loadWeatherData } = useWeather();
  
  const handleExampleSearch = () => {
    // Load an example location
    loadWeatherData({
      id: '1',
      name: 'New York City, USA',
      lat: 40.7128,
      lon: -74.0060,
      isFavorite: false,
    });
    
    navigate('/dashboard');
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow">
        <section className="bg-gradient-to-b from-blue-600 to-blue-400 text-white py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  Weather Forecasts Made Simple
                </h1>
                <p className="text-xl mb-8 opacity-90">
                  Get real-time weather updates and forecasts for any location. Stay prepared with accurate weather data.
                </p>
                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                  <Button
                    onClick={() => navigate('/register')}
                    size="lg"
                    variant="primary"
                    className="bg-white text-blue-600 hover:bg-blue-50"
                  >
                    Sign Up - It's Free
                  </Button>
                  <Button
                    onClick={handleExampleSearch}
                    size="lg"
                    variant="outline"
                    className="border-white text-white hover:bg-blue-700"
                  >
                    Try a Demo
                  </Button>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="hidden md:block"
              >
                <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-xl p-8 shadow-lg">
                  <div className="text-center mb-6">
                    <Cloud size={64} className="mx-auto mb-4" />
                    <h2 className="text-2xl font-semibold">Search Any Location</h2>
                  </div>
                  <div className="mb-6">
                    <WeatherSearch />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
        
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Key Features</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Everything you need to stay informed about weather conditions
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-white rounded-xl shadow-md p-6"
              >
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-100 text-blue-600 mb-4">
                  <MapPin size={24} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Save Locations
                </h3>
                <p className="text-gray-600">
                  Save your favorite locations and quickly access weather information for places that matter to you.
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-white rounded-xl shadow-md p-6"
              >
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-100 text-blue-600 mb-4">
                  <Bell size={24} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Weather Alerts
                </h3>
                <p className="text-gray-600">
                  Receive timely alerts about severe weather conditions in your saved locations to stay safe.
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-white rounded-xl shadow-md p-6"
              >
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-100 text-blue-600 mb-4">
                  <UserCircle size={24} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Personalized Experience
                </h3>
                <p className="text-gray-600">
                  Create an account to personalize your weather experience and access your data from any device.
                </p>
              </motion.div>
            </div>
          </div>
        </section>
        
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Accurate Weather Data
                </h2>
                <p className="text-gray-600 mb-6">
                  Our service provides real-time weather data from reliable sources. Get detailed information about:
                </p>
                <ul className="space-y-3">
                  {['Current conditions', 'Hourly forecasts', '5-day outlook', 'Precipitation probability', 'Wind speed and direction'].map((item, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 * index }}
                      className="flex items-start"
                    >
                      <span className="h-6 w-6 rounded-full bg-green-100 text-green-800 flex items-center justify-center mr-2 flex-shrink-0">✓</span>
                      <span className="text-gray-700">{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="rounded-xl overflow-hidden shadow-lg"
              >
                <img
                  src="https://images.pexels.com/photos/2448749/pexels-photo-2448749.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750"
                  alt="Weather dashboard screenshot"
                  className="w-full h-auto"
                />
              </motion.div>
            </div>
          </div>
        </section>
        
        <section className="py-16 bg-blue-700 text-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
            <p className="text-xl mb-8 opacity-90">
              Sign up today for free and start tracking weather in your favorite locations.
            </p>
            <Button
              onClick={() => navigate('/register')}
              size="lg"
              variant="primary"
              className="bg-white text-blue-700 hover:bg-blue-50"
            >
              Create Free Account
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;