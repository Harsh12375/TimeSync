import React, { useEffect, useState } from 'react';
import { Calendar, Edit, Trash2, Eye } from 'lucide-react';

interface Meeting {
  id: string;
  title: string;
  date: string;
  participants: string[];
  notes: string;
  localTimes?: { [timezone: string]: string };
}

const Dashboard = () => {
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [filter, setFilter] = useState('upcoming');

  useEffect(() => {
    // Load meetings from localStorage
    const savedMeetings = JSON.parse(localStorage.getItem('meetings') || '[]');
    setMeetings(savedMeetings);
  }, []);

  const handleDelete = (id: string) => {
    const updatedMeetings = meetings.filter(meeting => meeting.id !== id);
    localStorage.setItem('meetings', JSON.stringify(updatedMeetings));
    setMeetings(updatedMeetings);
  };

  const handleEdit = (id: string) => {
    // Implement edit functionality
    console.log('Edit meeting:', id);
  };

  const handleViewDetails = (id: string) => {
    // Implement view details functionality
    console.log('View meeting:', id);
  };

  const filteredMeetings = meetings.filter(meeting => {
    const meetingDate = new Date(meeting.date);
    const now = new Date();

    switch (filter) {
      case 'upcoming':
        return meetingDate >= now;
      case 'past':
        return meetingDate < now;
      default:
        return true;
    }
  });

  return (
    <div className="min-h-screen pt-24 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            Your Meetings
          </h1>
          <div className="flex gap-4">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="bg-gray-800 text-gray-300 px-4 py-2 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="upcoming">Upcoming</option>
              <option value="past">Past</option>
              <option value="all">All</option>
            </select>
          </div>
        </div>

        {filteredMeetings.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">No meetings found</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {filteredMeetings.map((meeting) => (
              <div
                key={meeting.id}
                className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 transform transition-all duration-200 hover:scale-[1.02] hover:bg-gray-800/70"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-xl font-semibold text-blue-400 mb-2">
                      {meeting.title}
                    </h2>
                    <p className="text-gray-400 flex items-center">
                      <Calendar className="w-4 h-4 mr-2" />
                      {new Date(meeting.date).toLocaleString()}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleViewDetails(meeting.id)}
                      className="p-2 text-gray-400 hover:text-blue-400 transition-colors"
                    >
                      <Eye className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleEdit(meeting.id)}
                      className="p-2 text-gray-400 hover:text-green-400 transition-colors"
                    >
                      <Edit className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(meeting.id)}
                      className="p-2 text-gray-400 hover:text-red-400 transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <div className="mb-4">
                  <h3 className="text-sm font-medium text-gray-400 mb-2">Participants</h3>
                  <div className="flex flex-wrap gap-2">
                    {meeting.participants.map((participant, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-gray-700/50 rounded-full text-sm text-gray-300"
                      >
                        {participant}
                      </span>
                    ))}
                  </div>
                </div>

                {meeting.localTimes && (
                  <div className="mb-4">
                    <h3 className="text-sm font-medium text-gray-400 mb-2">Local Times</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {Object.entries(meeting.localTimes).map(([timezone, time]) => (
                        <div key={timezone} className="text-sm">
                          <span className="text-gray-400">{timezone}:</span>
                          <span className="ml-2 text-gray-100">{time}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <h3 className="text-sm font-medium text-gray-400 mb-2">Notes</h3>
                  <p className="text-gray-300">{meeting.notes}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;