import React, { useState } from 'react';
import { Calendar, Clock, Settings, Home, LogOut, Info, MapPin, LayoutDashboard, User } from 'lucide-react';
import TimezoneSelector from './TimezoneSelector';

const Navbar = () => {
  const [showTimezone, setShowTimezone] = useState(false);

  const navigate = (path: string) => {
    window.location.hash = path;
  };

  return (
    <nav className="bg-gray-900/50 backdrop-blur-sm fixed w-full z-50 border-b border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigate('')}>
            <Calendar className="w-6 h-6 text-blue-500" />
            <span className="text-xl font-bold text-white">TimeSync</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            <NavItem icon={<Home size={18} />} text="Home" onClick={() => navigate('')} />
            <NavItem icon={<LayoutDashboard size={18} />} text="Dashboard" onClick={() => navigate('dashboard')} />
            <div className="relative">
              <NavItem 
                icon={<Clock size={18} />} 
                text="Time Zones" 
                onClick={() => setShowTimezone(!showTimezone)}
              />
              {showTimezone && (
                <div className="absolute right-0 mt-2 w-80">
                  <TimezoneSelector />
                </div>
              )}
            </div>
            <NavItem icon={<User size={18} />} text="Profile" onClick={() => navigate('profile')} />
            <NavItem icon={<LogOut size={18} />} text="Logout" onClick={() => navigate('logout')} />
          </div>
        </div>
      </div>
    </nav>
  );
};

const NavItem = ({ 
  icon, 
  text, 
  onClick
}: { 
  icon: React.ReactNode; 
  text: string; 
  onClick: () => void;
}) => {
  return (
    <button 
      onClick={onClick}
      className="nav-item flex items-center space-x-2 group"
    >
      <span className="text-blue-500 group-hover:text-blue-400">{icon}</span>
      <span>{text}</span>
    </button>
  );
};

export default Navbar;