import React, { useState } from 'react';
import { Clock, MapPin } from 'lucide-react';

const TimeZoneSettings = () => {
  const [selectedTimezone, setSelectedTimezone] = useState(
    Intl.DateTimeFormat().resolvedOptions().timeZone
  );
  const [autoDetect, setAutoDetect] = useState(true);

  const handleTimezoneChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTimezone(e.target.value);
  };

  const handleAutoDetectChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAutoDetect(e.target.checked);
    if (e.target.checked) {
      setSelectedTimezone(Intl.DateTimeFormat().resolvedOptions().timeZone);
    }
  };

  return (
    <div className="min-h-screen pt-24 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
          Time Zone Settings
        </h1>

        <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6">
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <Clock className="w-6 h-6 text-blue-500 mr-2" />
              <h2 className="text-xl font-semibold text-gray-100">Current Time</h2>
            </div>
            <div className="text-4xl font-bold text-gray-100">
              {new Date().toLocaleTimeString('en-US', { timeZone: selectedTimezone })}
            </div>
            <div className="text-gray-400 mt-2">
              {new Date().toLocaleDateString('en-US', {
                timeZone: selectedTimezone,
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label className="flex items-center space-x-2 text-gray-300 mb-2">
                <input
                  type="checkbox"
                  checked={autoDetect}
                  onChange={handleAutoDetectChange}
                  className="w-4 h-4 rounded border-gray-700 text-blue-500 focus:ring-blue-500 focus:ring-offset-gray-900"
                />
                <span className="flex items-center">
                  <MapPin className="w-5 h-5 mr-2 text-blue-500" />
                  Auto-detect time zone
                </span>
              </label>
              {autoDetect && (
                <p className="text-sm text-gray-400 ml-6">
                  Using your system time zone: {selectedTimezone}
                </p>
              )}
            </div>

            <div className={autoDetect ? 'opacity-50 pointer-events-none' : ''}>
              <label className="block text-gray-300 mb-2">Manual Selection</label>
              <select
                value={selectedTimezone}
                onChange={handleTimezoneChange}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-gray-100
                  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                  transition-all duration-200"
                disabled={autoDetect}
              >
                {Intl.supportedValuesOf('timeZone').map((timezone) => (
                  <option key={timezone} value={timezone}>
                    {timezone}
                  </option>
                ))}
              </select>
            </div>

            <button
              className="w-full bg-blue-600 text-white rounded-lg px-6 py-3 font-semibold
                transition-all duration-200 hover:bg-blue-700 hover:scale-[1.02]
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
            >
              Save Settings
            </button>
          </div>
        </div>

        <div className="mt-8 bg-gray-800/50 backdrop-blur-sm rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-100 mb-4">Time Zone Preview</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {['America/New_York', 'Europe/London', 'Asia/Tokyo', 'Australia/Sydney'].map((tz) => (
              <div key={tz} className="p-4 bg-gray-800 rounded-lg">
                <div className="text-gray-400 text-sm mb-1">{tz}</div>
                <div className="text-lg font-semibold">
                  {new Date().toLocaleTimeString('en-US', { timeZone: tz })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeZoneSettings;