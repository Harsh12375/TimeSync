import React, { useState } from 'react';
import { format, addDays } from 'date-fns';
import { zonedTimeToUtc, utcToZonedTime } from 'date-fns-tz';
import { Plus, Trash2, Calendar } from 'lucide-react';

interface Participant {
  name: string;
  email: string;
  timezone: string;
}

interface MeetingTime {
  startTime: Date;
  endTime: Date;
  compatibility: number;
}

const CreateMeeting = () => {
  const [meetingName, setMeetingName] = useState('');
  const [dateRange, setDateRange] = useState({
    start: format(new Date(), 'yyyy-MM-dd'),
    end: format(addDays(new Date(), 7), 'yyyy-MM-dd'),
  });
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [includeMe, setIncludeMe] = useState(true);
  const [suggestedTimes, setSuggestedTimes] = useState<MeetingTime[]>([]);
  const [selectedTime, setSelectedTime] = useState<MeetingTime | null>(null);
  const [timezones] = useState(Intl.supportedValuesOf('timeZone'));

  const addParticipant = () => {
    setParticipants([...participants, { name: '', email: '', timezone: Intl.DateTimeFormat().resolvedOptions().timeZone }]);
  };

  const removeParticipant = (index: number) => {
    setParticipants(participants.filter((_, i) => i !== index));
  };

  const updateParticipant = (index: number, field: keyof Participant, value: string) => {
    const newParticipants = [...participants];
    newParticipants[index] = { ...newParticipants[index], [field]: value };
    setParticipants(newParticipants);
  };

  const findSuggestedTimes = () => {
    // This is a simplified version. In a real app, you'd want more sophisticated logic
    const suggestedTimeSlots: MeetingTime[] = [];
    const startDate = new Date(dateRange.start);
    const endDate = new Date(dateRange.end);
    
    for (let date = startDate; date <= endDate; date = addDays(date, 1)) {
      // Suggest times at 9 AM, 2 PM, and 5 PM in the first participant's timezone
      [9, 14, 17].forEach(hour => {
        const baseTime = new Date(date.setHours(hour, 0, 0, 0));
        suggestedTimeSlots.push({
          startTime: baseTime,
          endTime: new Date(baseTime.getTime() + 60 * 60 * 1000), // 1 hour meeting
          compatibility: Math.random() * 100, // In a real app, calculate based on participants' working hours
        });
      });
    }

    setSuggestedTimes(suggestedTimeSlots);
  };

  const createMeeting = () => {
    if (!selectedTime) return;

    const meeting = {
      name: meetingName,
      dateRange,
      participants,
      includeMe,
      selectedTime,
      created: new Date(),
    };

    // In a real app, save to backend
    const meetings = JSON.parse(localStorage.getItem('meetings') || '[]');
    meetings.push(meeting);
    localStorage.setItem('meetings', JSON.stringify(meetings));

    // Reset form
    setMeetingName('');
    setParticipants([]);
    setSelectedTime(null);
    setSuggestedTimes([]);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <h2 className="text-3xl font-bold text-white">Create Meeting</h2>
      
      <div className="space-y-6">
        {/* Meeting Name */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Meeting Name
          </label>
          <input
            type="text"
            value={meetingName}
            onChange={(e) => setMeetingName(e.target.value)}
            className="w-full bg-gray-800 border border-gray-700 rounded-md px-4 py-2 text-white focus:ring-2 focus:ring-blue-500"
            placeholder="Enter meeting name"
          />
        </div>

        {/* Date Range */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Start Date
            </label>
            <input
              type="date"
              value={dateRange.start}
              onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
              className="w-full bg-gray-800 border border-gray-700 rounded-md px-4 py-2 text-white focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              End Date
            </label>
            <input
              type="date"
              value={dateRange.end}
              onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
              className="w-full bg-gray-800 border border-gray-700 rounded-md px-4 py-2 text-white focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Include Me Toggle */}
        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            id="includeMe"
            checked={includeMe}
            onChange={(e) => setIncludeMe(e.target.checked)}
            className="w-4 h-4 text-blue-500 border-gray-700 rounded focus:ring-blue-500"
          />
          <label htmlFor="includeMe" className="text-sm font-medium text-gray-300">
            Include me in the meeting
          </label>
        </div>

        {/* Participants */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold text-white">Participants</h3>
            <button
              onClick={addParticipant}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              <Plus size={16} />
              <span>Add Participant</span>
            </button>
          </div>

          {participants.map((participant, index) => (
            <div key={index} className="grid grid-cols-3 gap-4 items-start">
              <input
                type="text"
                value={participant.name}
                onChange={(e) => updateParticipant(index, 'name', e.target.value)}
                placeholder="Name"
                className="bg-gray-800 border border-gray-700 rounded-md px-4 py-2 text-white focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="email"
                value={participant.email}
                onChange={(e) => updateParticipant(index, 'email', e.target.value)}
                placeholder="Email"
                className="bg-gray-800 border border-gray-700 rounded-md px-4 py-2 text-white focus:ring-2 focus:ring-blue-500"
              />
              <div className="flex space-x-2">
                <select
                  value={participant.timezone}
                  onChange={(e) => updateParticipant(index, 'timezone', e.target.value)}
                  className="flex-1 bg-gray-800 border border-gray-700 rounded-md px-4 py-2 text-white focus:ring-2 focus:ring-blue-500"
                >
                  {timezones.map((tz) => (
                    <option key={tz} value={tz}>
                      {tz.replace(/_/g, ' ')}
                    </option>
                  ))}
                </select>
                <button
                  onClick={() => removeParticipant(index)}
                  className="p-2 text-red-400 hover:text-red-300"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Find Times Button */}
        <button
          onClick={findSuggestedTimes}
          disabled={!meetingName || participants.length === 0}
          className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg font-medium 
                   transition-all duration-300 hover:bg-blue-700 hover:scale-105 
                   hover:shadow-lg hover:shadow-blue-500/50 active:scale-95
                   disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          Find Available Times
        </button>

        {/* Suggested Times */}
        {suggestedTimes.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-white">Suggested Times</h3>
            <div className="grid grid-cols-1 gap-4">
              {suggestedTimes.map((time, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedTime(time)}
                  className={`flex items-center justify-between p-4 rounded-lg border ${
                    selectedTime === time
                      ? 'border-blue-500 bg-blue-500/20'
                      : 'border-gray-700 bg-gray-800'
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <Calendar size={20} className="text-blue-400" />
                    <div>
                      <div className="font-medium text-white">
                        {format(time.startTime, 'PPP')}
                      </div>
                      <div className="text-sm text-gray-400">
                        {format(time.startTime, 'p')} - {format(time.endTime, 'p')}
                      </div>
                    </div>
                  </div>
                  <div className="text-sm font-medium text-blue-400">
                    {Math.round(time.compatibility)}% compatible
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Create Meeting Button */}
        {selectedTime && (
          <button
            onClick={createMeeting}
            className="w-full px-6 py-3 bg-green-600 text-white rounded-lg font-medium 
                     transition-all duration-300 hover:bg-green-700 hover:scale-105 
                     hover:shadow-lg hover:shadow-green-500/50 active:scale-95"
          >
            Create Meeting
          </button>
        )}
      </div>
    </div>
  );
};

export default CreateMeeting;