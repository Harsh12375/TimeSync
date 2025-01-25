import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Calendar } from 'lucide-react';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import CreateMeeting from './pages/CreateMeeting';
import TimeZoneSettings from './pages/TimeZoneSettings';
import CursorLight from './components/CursorLight';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen bg-gray-900 text-gray-100 relative overflow-hidden">
          <CursorLight />
          <Navbar />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/create-meeting" element={<CreateMeeting />} />
            <Route path="/timezone-settings" element={<TimeZoneSettings />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;