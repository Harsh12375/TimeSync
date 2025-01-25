import React, { useState } from 'react';
import { Calendar, Users, Clock, FileText, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Participant {
  email: string;
  timezone: string;
}

interface TimeSlot {
  startTime: string;
  localTimes: { [timezone: string]: string };
  score: number;
}

const CreateMeeting = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [participants, setParticipants] = useState<Participant[]>([
    { email: '', timezone: Intl.DateTimeFormat().resolvedOptions().timeZone }
  ]);
  const [notes, setNotes] = useState('');
  const [showTimeSuggestions, setShowTimeSuggestions] = useState(false);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<TimeSlot | null>(null);

  // Function to generate time suggestions based on participants' time zones
  const generateTimeSuggestions = (): TimeSlot[] => {
    const workingHours = { start: 9, end: 17 }; // 9 AM to 5 PM
    const suggestions: TimeSlot[] = [];
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);

    // Generate suggestions for the next 5 days
    for (let day = 0; day < 5; day++) {
      const date = new Date(tomorrow);
      date.setDate(date.getDate() + day);

      // Generate time slots for each day
      for (let hour = workingHours.start; hour <= workingHours.end; hour++) {
        const startTime = new Date(date);
        startTime.setHours(hour);

        const localTimes: { [key: string]: string } = {};
        let score = 0;

        // Calculate local times for each participant
        participants.forEach(participant => {
          const localTime = startTime.toLocaleTimeString('en-US', {
            timeZone: participant.timezone,
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
          });
          localTimes[participant.timezone] = localTime;

          // Score the time slot based on working hours in each time zone
          const localHour = new Date(startTime.toLocaleString('en-US', { timeZone: participant.timezone })).getHours();
          if (localHour >= workingHours.start && localHour <= workingHours.end) {
            score++;
          }
        });

        suggestions.push({
          startTime: startTime.toISOString(),
          localTimes,
          score: score / participants.length // Normalize score between 0 and 1
        });
      }
    }

    // Sort suggestions by score (best times first)
    return suggestions.sort((a, b) => b.score - a.score).slice(0, 5);
  };

  const handleAddParticipant = () => {
    setParticipants([
      ...participants,
      { email: '', timezone: Intl.DateTimeFormat().resolvedOptions().timeZone }
    ]);
  };

  const handleParticipantChange = (index: number, field: keyof Participant, value: string) => {
    const newParticipants = [...participants];
    newParticipants[index] = { ...newParticipants[index], [field]: value };
    setParticipants(newParticipants);
  };

  const handleRemoveParticipant = (index: number) => {
    setParticipants(participants.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowTimeSuggestions(true);
  };

  const handleSelectTimeSlot = (timeSlot: TimeSlot) => {
    setSelectedTimeSlot(timeSlot);
  };

  const handleConfirmMeeting = () => {
    if (!selectedTimeSlot) return;

    // In a real application, you would save this to your backend
    const meeting = {
      id: Date.now().toString(),
      title,
      date: selectedTimeSlot.startTime,
      participants: participants.map(p => p.email),
      notes,
      localTimes: selectedTimeSlot.localTimes
    };

    // Save to localStorage for demonstration
    const existingMeetings = JSON.parse(localStorage.getItem('meetings') || '[]');
    localStorage.setItem('meetings', JSON.stringify([...existingMeetings, meeting]));

    // Navigate to dashboard
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen pt-24 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
          Create New Meeting
        </h1>

        {!showTimeSuggestions ? (
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-4">
              <label className="block">
                <span className="text-gray-300 flex items-center mb-2">
                  <Calendar className="w-5 h-5 mr-2 text-blue-500" />
                  Meeting Title
                </span>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-2 text-gray-100 
                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                    transition-all duration-200"
                  placeholder="Enter meeting title"
                  required
                />
              </label>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-300 flex items-center">
                    <Users className="w-5 h-5 mr-2 text-blue-500" />
                    Participants
                  </span>
                  <button
                    type="button"
                    onClick={handleAddParticipant}
                    className="text-blue-500 hover:text-blue-400 text-sm font-medium transition-colors"
                  >
                    + Add Participant
                  </button>
                </div>

                <div className="space-y-4">
                  {participants.map((participant, index) => (
                    <div key={index} className="flex gap-4">
                      <input
                        type="email"
                        value={participant.email}
                        onChange={(e) => handleParticipantChange(index, 'email', e.target.value)}
                        className="flex-1 bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-2 text-gray-100
                          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                          transition-all duration-200"
                        placeholder="Enter email address"
                        required
                      />
                      <select
                        value={participant.timezone}
                        onChange={(e) => handleParticipantChange(index, 'timezone', e.target.value)}
                        className="w-48 bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-2 text-gray-100
                          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                          transition-all duration-200"
                      >
                        {Intl.supportedValuesOf('timeZone').map((tz) => (
                          <option key={tz} value={tz}>
                            {tz}
                          </option>
                        ))}
                      </select>
                      {participants.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveParticipant(index)}
                          className="text-red-500 hover:text-red-400 transition-colors px-2"
                        >
                          ×
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <label className="block">
                <span className="text-gray-300 flex items-center mb-2">
                  <FileText className="w-5 h-5 mr-2 text-blue-500" />
                  Meeting Notes
                </span>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-2 text-gray-100
                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                    transition-all duration-200 min-h-[100px]"
                  placeholder="Enter meeting notes or agenda"
                />
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white rounded-lg px-6 py-3 font-semibold
                transition-all duration-200 hover:bg-blue-700 hover:scale-[1.02]
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
            >
              Find Best Times
            </button>
          </form>
        ) : (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-100 flex items-center">
              <Clock className="w-6 h-6 mr-2 text-blue-500" />
              Suggested Meeting Times
            </h2>
            <div className="space-y-4">
              {generateTimeSuggestions().map((timeSlot, index) => (
                <div
                  key={index}
                  onClick={() => handleSelectTimeSlot(timeSlot)}
                  className={`p-4 rounded-lg border-2 transition-all duration-200 cursor-pointer
                    ${
                      selectedTimeSlot === timeSlot
                        ? 'border-blue-500 bg-blue-500/10'
                        : 'border-gray-700 bg-gray-800/50 hover:border-blue-500/50'
                    }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <div className="text-lg font-semibold text-gray-100">
                        {new Date(timeSlot.startTime).toLocaleDateString('en-US', {
                          weekday: 'long',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </div>
                      {selectedTimeSlot === timeSlot && (
                        <Check className="w-5 h-5 text-blue-500 ml-2" />
                      )}
                    </div>
                    <div className="text-sm text-gray-400">
                      Score: {Math.round(timeSlot.score * 100)}% match
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    {Object.entries(timeSlot.localTimes).map(([timezone, time]) => (
                      <div key={timezone} className="text-sm">
                        <span className="text-gray-400">{timezone}:</span>
                        <span className="ml-2 text-gray-100">{time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => setShowTimeSuggestions(false)}
                className="flex-1 bg-gray-700 text-white rounded-lg px-6 py-3 font-semibold
                  transition-all duration-200 hover:bg-gray-600 hover:scale-[1.02]
                  focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-900"
              >
                Back
              </button>
              <button
                onClick={handleConfirmMeeting}
                disabled={!selectedTimeSlot}
                className="flex-1 bg-blue-600 text-white rounded-lg px-6 py-3 font-semibold
                  transition-all duration-200 hover:bg-blue-700 hover:scale-[1.02]
                  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900
                  disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                Confirm Meeting
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateMeeting;