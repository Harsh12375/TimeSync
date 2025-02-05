import React, { useState } from 'react';
import { User, Mail, Globe, MapPin } from 'lucide-react';
import TimezoneSelector from './TimezoneSelector';

const Profile = () => {
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  });

  const handleSave = () => {
    // In a real app, save to backend
    localStorage.setItem('userProfile', JSON.stringify(profile));
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-8">
      <h2 className="text-3xl font-bold text-white">My Profile</h2>

      <div className="bg-gray-800 rounded-lg p-6 space-y-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              <div className="flex items-center space-x-2">
                <User size={16} className="text-blue-400" />
                <span>Name</span>
              </div>
            </label>
            <input
              type="text"
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              className="w-full bg-gray-900 border border-gray-700 rounded-md px-4 py-2 text-white focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              <div className="flex items-center space-x-2">
                <Mail size={16} className="text-blue-400" />
                <span>Email</span>
              </div>
            </label>
            <input
              type="email"
              value={profile.email}
              onChange={(e) => setProfile({ ...profile, email: e.target.value })}
              className="w-full bg-gray-900 border border-gray-700 rounded-md px-4 py-2 text-white focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              <div className="flex items-center space-x-2">
                <Globe size={16} className="text-blue-400" />
                <span>Time Zone</span>
              </div>
            </label>
            <TimezoneSelector />
          </div>
        </div>

        <button
          onClick={handleSave}
          className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg font-medium 
                   transition-all duration-300 hover:bg-blue-700 hover:scale-105 
                   hover:shadow-lg hover:shadow-blue-500/50 active:scale-95"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default Profile;