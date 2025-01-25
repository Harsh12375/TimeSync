import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, ArrowRight } from 'lucide-react';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen pt-16 relative">
      {/* Background particles effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-blue-500/20 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 5}s`
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 pt-20 relative z-10">
        <div className="text-center">
          <Calendar className="w-20 h-20 mx-auto text-blue-500 mb-8" />
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Effortless Meeting Scheduling Across Time Zones
          </h1>
          <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
            Automatically find the perfect meeting time for your global team. No more manual calculations or timezone confusion.
          </p>

          <div className="flex justify-center gap-6">
            <button
              onClick={() => navigate('/create-meeting')}
              className="group relative px-8 py-4 bg-blue-600 rounded-lg font-semibold text-white
                transition-all duration-200 ease-in-out hover:bg-blue-700 hover:scale-105
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
            >
              Create Meeting
              <ArrowRight className="inline-block ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            
            <button
              onClick={() => navigate('/dashboard')}
              className="group px-8 py-4 bg-gray-800 rounded-lg font-semibold text-gray-300
                transition-all duration-200 ease-in-out hover:bg-gray-700 hover:scale-105
                focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-900"
            >
              View Dashboard
            </button>
          </div>
        </div>

        {/* Features section */}
        <div className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: 'Smart Time Prediction',
              description: 'Our AI automatically finds the best meeting time based on participants\' time zones.'
            },
            {
              title: 'Real-time Updates',
              description: 'Get instant notifications when meeting details change or participants respond.'
            },
            {
              title: 'Simple Integration',
              description: 'Seamlessly connects with your favorite calendar apps and tools.'
            }
          ].map((feature, index) => (
            <div
              key={index}
              className="p-6 rounded-lg bg-gray-800/50 backdrop-blur-sm
                transform transition-all duration-200 hover:scale-105 hover:bg-gray-800/70"
            >
              <h3 className="text-xl font-semibold mb-3 text-blue-400">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LandingPage;