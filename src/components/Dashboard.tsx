import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Users, Trash2 } from 'lucide-react';
import { format } from 'date-fns';

interface Meeting {
  name: string;
  dateRange: {
    start: string;
    end: string;
  };
  participants: {
    name: string;
    email: string;
    timezone: string;
  }[];
  selectedTime: {
    startTime: Date;
    endTime: Date;
    compatibility: number;
  };
  created: string;
}

const Dashboard = () => {
  const [meetings, setMeetings] = useState<Meeting[]>([]);

  useEffect(() => {
    const storedMeetings = localStorage.getItem('meetings');
    if (storedMeetings) {
      setMeetings(JSON.parse(storedMeetings));
    }
  }, []);

  const deleteMeeting = (index: number) => {
    const newMeetings = meetings.filter((_, i) => i !== index);
    setMeetings(newMeetings);
    localStorage.setItem('meetings', JSON.stringify(newMeetings));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <h2 className="text-3xl font-bold text-white">My Meetings</h2>

      {meetings.length === 0 ? (
        <div className="text-center py-12">
          <Calendar className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <p className="text-gray-400 text-lg">No meetings scheduled yet</p>
          <button
            onClick={() => window.location.hash = 'create'}
            className="mt-4 button-primary"
          >
            Schedule a Meeting
          </button>
        </div>
      ) : (
        <div className="grid gap-6">
          {meetings.map((meeting, index) => (
            <div key={index} className="bg-gray-800 rounded-lg p-6 space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {meeting.name}
                  </h3>
                  <div className="flex items-center space-x-4 text-gray-400">
                    <div className="flex items-center space-x-2">
                      <Clock size={16} />
                      <span>
                        {format(new Date(meeting.selectedTime.startTime), 'PPp')} - {format(new Date(meeting.selectedTime.endTime), 'p')}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users size={16} />
                      <span>{meeting.participants.length} participants</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => deleteMeeting(index)}
                  className="p-2 text-gray-400 hover:text-red-400 transition-colors"
                >
                  <Trash2 size={20} />
                </button>
              </div>

              <div className="border-t border-gray-700 pt-4">
                <h4 className="text-sm font-medium text-gray-400 mb-2">Participants</h4>
                <div className="grid gap-2">
                  {meeting.participants.map((participant, pIndex) => (
                    <div key={pIndex} className="flex items-center justify-between text-sm">
                      <span className="text-gray-300">{participant.name}</span>
                      <span className="text-gray-500">{participant.timezone}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;