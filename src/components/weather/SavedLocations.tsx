import React from 'react';
import { useWeather } from '../../context/WeatherContext';
import { motion } from 'framer-motion';
import { Card, CardBody, CardHeader } from '../ui/Card';
import { MapPin, Star, XCircle } from 'lucide-react';

const SavedLocations: React.FC = () => {
  const { favoriteLocations, loadWeatherData, removeFromFavorites } = useWeather();
  
  if (favoriteLocations.length === 0) {
    return null;
  }
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-6"
    >
      <Card>
        <CardHeader className="border-b border-gray-100">
          <div className="flex items-center">
            <Star size={18} className="text-amber-400 mr-2" />
            <h2 className="font-semibold text-gray-700">Saved Locations</h2>
          </div>
        </CardHeader>
        <CardBody>
          <div className="divide-y divide-gray-100">
            {favoriteLocations.map((location, index) => (
              <motion.div
                key={location.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="py-2 first:pt-0 last:pb-0 group"
              >
                <div className="flex justify-between items-center">
                  <button
                    onClick={() => loadWeatherData(location)}
                    className="flex items-center px-2 py-1 rounded-md hover:bg-gray-100 transition-colors"
                  >
                    <MapPin size={16} className="text-gray-500 mr-2" />
                    <span className="text-gray-700">{location.name}</span>
                  </button>
                  
                  <button
                    onClick={() => removeFromFavorites(location.id)}
                    className="text-gray-400 hover:text-red-500 transition-colors p-1 opacity-0 group-hover:opacity-100"
                    aria-label="Remove from favorites"
                  >
                    <XCircle size={16} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </CardBody>
      </Card>
    </motion.div>
  );
};

export default SavedLocations;