import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, ArrowRight } from 'lucide-react';

const Hero = () => {
  const navigate = (path: string) => {
    window.location.hash = path;
  };

  return (
    <div className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center">
      {/* Animated particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="hero-particle"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            scale: 0
          }}
          animate={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            scale: Math.random() * 2 + 1
          }}
          transition={{
            duration: Math.random() * 10 + 20,
            repeat: Infinity,
            repeatType: "reverse"
          }}
          style={{
            width: Math.random() * 10 + 5,
            height: Math.random() * 10 + 5,
          }}
        />
      ))}

      <div className="relative z-10 text-center space-y-8">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500"
        >
          Effortless Meeting Scheduling
          <br />
          Across Time Zones
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl text-gray-400 max-w-2xl mx-auto"
        >
          Schedule meetings with team members around the globe without the hassle of time zone calculations.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button 
            onClick={() => navigate('create')}
            className="button-primary flex items-center space-x-2"
          >
            <Calendar className="w-5 h-5" />
            <span>Create Meeting</span>
          </button>
          
          <button 
            onClick={() => navigate('dashboard')}
            className="px-6 py-3 text-gray-300 rounded-lg font-medium 
                     transition-all duration-300 hover:text-white
                     flex items-center space-x-2"
          >
            <span>View Dashboard</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;