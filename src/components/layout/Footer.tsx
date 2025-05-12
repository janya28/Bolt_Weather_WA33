import React from 'react';
import { Link } from 'react-router-dom';
import { Cloud, Github as GitHub, Twitter, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center text-blue-600 mb-4">
              <Cloud size={24} className="mr-2" />
              <span className="font-bold text-xl">SkyView</span>
            </Link>
            <p className="text-gray-600 mb-4">
              Real-time weather forecasts and alerts for locations around the world.
              Stay informed about weather conditions wherever you go.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-gray-700">
                <GitHub size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-700">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-700">
                <Mail size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-800 mb-3">Navigation</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 hover:text-blue-600">Home</Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-gray-600 hover:text-blue-600">Dashboard</Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-600 hover:text-blue-600">About</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-600 hover:text-blue-600">Contact</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-800 mb-3">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/terms" className="text-gray-600 hover:text-blue-600">Terms of Service</Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-600 hover:text-blue-600">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/cookies" className="text-gray-600 hover:text-blue-600">Cookie Policy</Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-200 text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} SkyView. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;