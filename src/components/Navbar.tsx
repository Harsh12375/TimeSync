import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Calendar, Home, Settings, Info, LogOut } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();

  const navItems = [
    { path: '/dashboard', icon: Home, label: 'Dashboard' },
    { path: '/create-meeting', icon: Calendar, label: 'Create Meeting' },
    { path: '/timezone-settings', icon: Settings, label: 'Time Zone' },
    { path: '/about', icon: Info, label: 'About' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 bg-gray-800/50 backdrop-blur-md z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Calendar className="w-8 h-8 text-blue-500" />
            <span className="text-xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
              TimeSync
            </span>
          </Link>
          
          <div className="flex space-x-4">
            {navItems.map(({ path, icon: Icon, label }) => (
              <Link
                key={path}
                to={path}
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium
                  transition-all duration-200 ease-in-out hover:bg-gray-700/50
                  hover:scale-105 hover:text-blue-400 group
                  ${location.pathname === path ? 'text-blue-500' : 'text-gray-300'}`}
              >
                <Icon className="w-5 h-5 mr-1.5" />
                {label}
              </Link>
            ))}
            
            <button className="flex items-center px-3 py-2 rounded-md text-sm font-medium
              text-gray-300 hover:bg-gray-700/50 hover:text-red-400 transition-all
              duration-200 ease-in-out hover:scale-105 group">
              <LogOut className="w-5 h-5 mr-1.5" />
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;