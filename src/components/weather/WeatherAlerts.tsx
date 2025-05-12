import React from 'react';
import { useWeather } from '../../context/WeatherContext';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, X } from 'lucide-react';

const WeatherAlerts: React.FC = () => {
  const { weatherData } = useWeather();
  const [dismissedAlerts, setDismissedAlerts] = React.useState<string[]>([]);
  
  if (!weatherData || !weatherData.alerts || weatherData.alerts.length === 0) {
    return null;
  }
  
  const { alerts } = weatherData;
  const activeAlerts = alerts.filter(alert => !dismissedAlerts.includes(alert.id));
  
  if (activeAlerts.length === 0) {
    return null;
  }
  
  const dismissAlert = (id: string) => {
    setDismissedAlerts([...dismissedAlerts, id]);
  };
  
  const getSeverityClass = (severity: string) => {
    switch (severity) {
      case 'minor':
        return 'bg-yellow-50 border-yellow-300 text-yellow-800';
      case 'moderate':
        return 'bg-orange-50 border-orange-300 text-orange-800';
      case 'severe':
        return 'bg-red-50 border-red-300 text-red-800';
      case 'extreme':
        return 'bg-purple-50 border-purple-300 text-purple-800';
      default:
        return 'bg-yellow-50 border-yellow-300 text-yellow-800';
    }
  };
  
  return (
    <div className="mb-6 space-y-2">
      <AnimatePresence>
        {activeAlerts.map((alert) => (
          <motion.div
            key={alert.id}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className={`rounded-lg border p-4 ${getSeverityClass(alert.severity)}`}
          >
            <div className="flex justify-between items-start">
              <div className="flex items-start">
                <AlertTriangle className="mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold">{alert.title}</h3>
                  <p className="text-sm mt-1">{alert.description}</p>
                </div>
              </div>
              <button
                onClick={() => dismissAlert(alert.id)}
                className="ml-4 rounded-full p-1 hover:bg-black hover:bg-opacity-10 transition-colors"
                aria-label="Dismiss alert"
              >
                <X size={18} />
              </button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default WeatherAlerts;