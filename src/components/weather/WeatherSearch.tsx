import React, { useState, useEffect, useRef } from 'react';
import { Search, MapPin, Clock, X } from 'lucide-react';
import { useWeather } from '../../context/WeatherContext';
import { Location } from '../../types';
import { motion, AnimatePresence } from 'framer-motion';

const WeatherSearch: React.FC = () => {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Location[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [recentSearches, setRecentSearches] = useState<Location[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);
  
  const { searchLocation, loadWeatherData } = useWeather();
  
  // Load recent searches from localStorage on mount
  useEffect(() => {
    const storedSearches = localStorage.getItem('recentSearches');
    if (storedSearches) {
      setRecentSearches(JSON.parse(storedSearches));
    }
  }, []);
  
  // Close the search results dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [searchRef]);
  
  const handleSearch = async () => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }
    
    try {
      const results = await searchLocation(query);
      setSearchResults(results);
      setShowResults(true);
    } catch (error) {
      console.error('Search error:', error);
    }
  };
  
  // Debounce the search to avoid making too many API calls
  useEffect(() => {
    const timer = setTimeout(() => {
      if (query.trim()) {
        handleSearch();
      }
    }, 300);
    
    return () => clearTimeout(timer);
  }, [query]);
  
  const handleSelectLocation = (location: Location) => {
    loadWeatherData(location);
    setQuery('');
    setShowResults(false);
    
    // Add to recent searches if not already present
    const exists = recentSearches.some(item => item.id === location.id);
    
    if (!exists) {
      const updatedSearches = [location, ...recentSearches].slice(0, 5);
      setRecentSearches(updatedSearches);
      localStorage.setItem('recentSearches', JSON.stringify(updatedSearches));
    }
  };
  
  const handleClearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem('recentSearches');
  };
  
  return (
    <div className="relative w-full max-w-md mx-auto" ref={searchRef}>
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setShowResults(true)}
          placeholder="Search for a city..."
          className="pl-10 pr-4 py-2.5 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
          <Search size={18} className="text-gray-400" />
        </div>
      </div>
      
      <AnimatePresence>
        {showResults && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-lg overflow-hidden"
          >
            {/* Search results */}
            {searchResults.length > 0 && (
              <div className="p-2">
                <div className="flex items-center px-2 py-1.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  <MapPin size={14} className="mr-1" />
                  Search Results
                </div>
                {searchResults.map((location) => (
                  <button
                    key={location.id}
                    onClick={() => handleSelectLocation(location)}
                    className="w-full px-4 py-2 text-left hover:bg-gray-100 rounded-md flex items-center"
                  >
                    <MapPin size={16} className="text-blue-500 mr-2" />
                    <span>{location.name}</span>
                  </button>
                ))}
              </div>
            )}
            
            {/* Recent searches */}
            {recentSearches.length > 0 && (
              <div className="p-2 border-t border-gray-100">
                <div className="flex justify-between items-center px-2 py-1.5">
                  <div className="flex items-center text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    <Clock size={14} className="mr-1" />
                    Recent Searches
                  </div>
                  <button
                    onClick={handleClearRecentSearches}
                    className="text-xs text-gray-500 hover:text-gray-700"
                  >
                    Clear
                  </button>
                </div>
                {recentSearches.map((location) => (
                  <button
                    key={location.id}
                    onClick={() => handleSelectLocation(location)}
                    className="w-full px-4 py-2 text-left hover:bg-gray-100 rounded-md flex items-center"
                  >
                    <Clock size={16} className="text-gray-400 mr-2" />
                    <span>{location.name}</span>
                  </button>
                ))}
              </div>
            )}
            
            {/* No results */}
            {query.trim() && searchResults.length === 0 && (
              <div className="p-6 text-center text-gray-500">
                <X size={24} className="mx-auto mb-2" />
                <p>No locations found</p>
                <p className="text-sm text-gray-400 mt-1">Try a different search term</p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default WeatherSearch;