import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { zonedTimeToUtc, utcToZonedTime } from 'date-fns-tz';
import { MapPin } from 'lucide-react';

const TimezoneSelector = () => {
  const [timezone, setTimezone] = useState('');
  const [currentTime, setCurrentTime] = useState('');
  const [isAutoDetect, setIsAutoDetect] = useState(true);
  const [timezones] = useState(Intl.supportedValuesOf('timeZone'));

  useEffect(() => {
    // Auto-detect timezone
    if (isAutoDetect) {
      const detectedTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      setTimezone(detectedTimezone);
    }
  }, [isAutoDetect]);

  useEffect(() => {
    // Update time every second
    const updateTime = () => {
      if (timezone) {
        const now = new Date();
        const zonedTime = utcToZonedTime(now, timezone);
        setCurrentTime(format(zonedTime, 'PPpp'));
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, [timezone]);

  const handleManualSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTimezone(event.target.value);
    setIsAutoDetect(false);
  };

  const handleAutoDetect = () => {
    setIsAutoDetect(true);
  };

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-lg shadow-lg p-4">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-white">Timezone Settings</h3>
          <button
            onClick={handleAutoDetect}
            className="flex items-center space-x-2 text-sm text-blue-400 hover:text-blue-300"
          >
            <MapPin size={16} />
            <span>Auto-detect</span>
          </button>
        </div>

        <select
          value={timezone}
          onChange={handleManualSelect}
          className="w-full bg-gray-800 border border-gray-700 rounded-md px-3 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          {timezones.map((tz) => (
            <option key={tz} value={tz}>
              {tz.replace(/_/g, ' ')}
            </option>
          ))}
        </select>

        <div className="text-center">
          <div className="text-gray-400 text-sm">Current Time</div>
          <div className="text-xl font-semibold text-white">{currentTime}</div>
        </div>
      </div>
    </div>
  );
};

export default TimezoneSelector;