import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const OurEcosystem = () => {
  const [activeConnection, setActiveConnection] = useState(null);
  const [pulseKey, setPulseKey] = useState(0);
  const svgRef = useRef(null);
  
  // Ecosystem partners with their positions around the circle
  const ecosystemPartners = [
    { 
      id: 'aws', 
      name: 'AWS', 
      icon: '☁️', 
      color: '#FF9900',
      description: 'Cloud Infrastructure Partner',
      angle: 0
    },
    { 
      id: 'github', 
      name: 'GitHub', 
      icon: '💻', 
      color: '#181717',
      description: 'Development Platform',
      angle: 60
    },
    { 
      id: 'slack', 
      name: 'Slack', 
      icon: '💬', 
      color: '#4A154B',
      description: 'Communication Hub',
      angle: 120
    },
    { 
      id: 'figma', 
      name: 'Figma', 
      icon: '🎨', 
      color: '#F24E1E',
      description: 'Design Collaboration',
      angle: 180
    },
    { 
      id: 'docker', 
      name: 'Docker', 
      icon: '🐳', 
      color: '#2496ED',
      description: 'Container Platform',
      angle: 240
    },
    { 
      id: 'react', 
      name: 'React', 
      icon: '⚛️', 
      color: '#61DAFB',
      description: 'Frontend Framework',
      angle: 300
    }
  ];

  // Calculate positions for partners in a circle
  const radius = 200;
  const centerX = 300;
  const centerY = 300;
  
  const getPartnerPosition = (angle) => {
    const radian = (angle * Math.PI) / 180;
    return {
      x: centerX + radius * Math.cos(radian),
      y: centerY + radius * Math.sin(radian)
    };
  };

  // Trigger pulses periodically
  useEffect(() => {
    const interval = setInterval(() => {
      const randomPartner = ecosystemPartners[Math.floor(Math.random() * ecosystemPartners.length)];
      setActiveConnection(randomPartner.id);
      setPulseKey(prev => prev + 1);
      
      // Reset after animation completes
      setTimeout(() => {
        setActiveConnection(null);
      }, 2000);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
              Our Ecosystem
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Seamlessly integrated with the tools and platforms that power modern software development.
          </p>
        </motion.div>

        <div className="relative h-[600px] md:h-[700px]">
          {/* SVG Canvas for Connections */}
          <div className="absolute inset-0 flex items-center justify-center">
            <svg
              ref={svgRef}
              width="600"
              height="600"
              viewBox="0 0 600 600"
              className="w-full h-full max-w-3xl mx-auto"
            >
              {/* Background Circle */}
              <circle
                cx={centerX}
                cy={centerY}
                r={radius + 40}
                fill="none"
                stroke="url(#gradientCircle)"
                strokeWidth="1"
                strokeOpacity="0.2"
              />
              
              {/* Gradient Definition */}
              <defs>
                <linearGradient id="gradientCircle" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
                  <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.3" />
                </linearGradient>
                
                <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#8b5cf6" />
                </linearGradient>
              </defs>

              {/* Connection Lines */}
              {ecosystemPartners.map((partner) => {
                const pos = getPartnerPosition(partner.angle);
                return (
                  <g key={`line-${partner.id}`}>
                    {/* Static Line */}
                    <line
                      x1={pos.x}
                      y1={pos.y}
                      x2={centerX}
                      y2={centerY}
                      stroke="url(#lineGradient)"
                      strokeWidth="2"
                      strokeOpacity="0.3"
                      strokeDasharray="5,5"
                    />
                    
                    {/* Animated Pulse */}
                    <AnimatePresence>
                      {activeConnection === partner.id && (
                        <motion.line
                          key={`pulse-${partner.id}-${pulseKey}`}
                          x1={pos.x}
                          y1={pos.y}
                          x2={centerX}
                          y2={centerY}
                          stroke={partner.color}
                          strokeWidth="4"
                          strokeLinecap="round"
                          initial={{ pathLength: 0, opacity: 0 }}
                          animate={{ 
                            pathLength: 1,
                            opacity: [0, 1, 0]
                          }}
                          exit={{ opacity: 0 }}
                          transition={{ 
                            duration: 2,
                            ease: "easeInOut"
                          }}
                        />
                      )}
                    </AnimatePresence>
                    
                    {/* Data Dot Animation */}
                    <AnimatePresence>
                      {activeConnection === partner.id && (
                        <motion.circle
                          key={`dot-${partner.id}-${pulseKey}`}
                          cx={pos.x}
                          cy={pos.y}
                          r="4"
                          fill={partner.color}
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ 
                            scale: [0, 1.5, 0],
                            opacity: [0, 1, 0]
                          }}
                          transition={{ 
                            duration: 2,
                            ease: "easeInOut"
                          }}
                        />
                      )}
                    </AnimatePresence>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Center Hub - Your Company */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
            <motion.div
              animate={{ 
                scale: [1, 1.05, 1],
                boxShadow: [
                  "0 0 20px rgba(59, 130, 246, 0.3)",
                  "0 0 40px rgba(59, 130, 246, 0.6)",
                  "0 0 20px rgba(59, 130, 246, 0.3)"
                ]
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="relative"
            >
              {/* Pulsing Rings */}
              <motion.div
                animate={{ 
                  scale: [1, 1.5, 2],
                  opacity: [0.5, 0.2, 0]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear"
                }}
                className="absolute inset-0 rounded-full border-2 border-blue-500"
              />
              <motion.div
                animate={{ 
                  scale: [1, 1.8, 2.5],
                  opacity: [0.3, 0.1, 0]
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear",
                  delay: 0.5
                }}
                className="absolute inset-0 rounded-full border-2 border-cyan-500"
              />
              
              {/* Main Hub */}
              <div className="relative w-32 h-32 md:w-40 md:h-40 bg-gradient-to-br from-gray-900 to-gray-950 rounded-2xl border-2 border-gray-800 flex flex-col items-center justify-center p-6 backdrop-blur-sm">
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent mb-2">
                  Zeltra
                </div>
                <div className="text-xs md:text-sm text-gray-400 text-center">
                  Solutions Hub
                </div>
                
                {/* Live Connection Indicator */}
                <div className="absolute -top-2 -right-2 flex items-center gap-1">
                  <motion.div
                    animate={{ opacity: [0.2, 1, 0.2] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="w-2 h-2 rounded-full bg-green-500"
                  />
                  <span className="text-xs text-gray-400">Live</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Partner Nodes */}
          {ecosystemPartners.map((partner) => {
            const pos = getPartnerPosition(partner.angle);
            const isActive = activeConnection === partner.id;
            
            return (
              <motion.div
                key={partner.id}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: partner.angle / 180 * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.1 }}
                onHoverStart={() => setActiveConnection(partner.id)}
                onHoverEnd={() => setActiveConnection(null)}
                className="absolute z-10 cursor-pointer"
                style={{
                  left: `calc(50% + ${(pos.x - centerX)}px)`,
                  top: `calc(50% + ${(pos.y - centerY)}px)`,
                  transform: 'translate(-50%, -50%)'
                }}
              >
                <div className="relative group">
                  {/* Connection Glow Effect */}
                  {isActive && (
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1.2, opacity: 1 }}
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/30 to-purple-500/30 blur-xl"
                    />
                  )}
                  
                  {/* Partner Node */}
                  <div
                    className={`relative w-20 h-20 md:w-24 md:h-24 rounded-2xl flex flex-col items-center justify-center p-4 transition-all duration-300 ${
                      isActive 
                        ? 'bg-gray-900 border-2 shadow-2xl' 
                        : 'bg-gray-900/70 border border-gray-800'
                    }`}
                    style={{
                      borderColor: isActive ? partner.color : '',
                      boxShadow: isActive ? `0 0 30px ${partner.color}40` : ''
                    }}
                  >
                    {/* Partner Icon */}
                    <div className="text-2xl md:text-3xl mb-2">{partner.icon}</div>
                    
                    {/* Partner Name */}
                    <div 
                      className="text-sm font-bold truncate"
                      style={{ color: isActive ? partner.color : '#e5e7eb' }}
                    >
                      {partner.name}
                    </div>
                    
                    {/* Tooltip */}
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 rounded-lg border border-gray-800 text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                      {partner.description}
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-gray-900"></div>
                    </div>
                  </div>
                  
                  {/* Active Pulse Ring */}
                  {isActive && (
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1.2, opacity: 1 }}
                      transition={{ duration: 0.5 }}
                      className="absolute inset-0 rounded-full border-2"
                      style={{ borderColor: partner.color }}
                    />
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          <StatCard 
            value="99.9%"
            label="Uptime"
            description="Across all integrated platforms"
            delay={0}
          />
          <StatCard 
            value="< 50ms"
            label="Latency"
            description="Average response time"
            delay={0.1}
          />
          <StatCard 
            value="100M+"
            label="API Calls"
            description="Processed daily"
            delay={0.2}
          />
          <StatCard 
            value="24/7"
            label="Sync"
            description="Real-time data synchronization"
            delay={0.3}
          />
        </motion.div>

        {/* Integration Description */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-16 max-w-3xl mx-auto text-center"
        >
          <p className="text-gray-400 text-lg">
            Our platform acts as a central nervous system, continuously exchanging data and insights 
            with your existing toolchain. Every integration is built with security, reliability, 
            and performance as first-class citizens.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-8 bg-gradient-to-r from-gray-800 to-gray-900 border border-gray-700 text-white font-semibold py-3 px-8 rounded-xl hover:border-blue-500 transition-all duration-300"
          >
            View Integration Documentation
          </motion.button>
        </motion.div>
      </div>
  );
};

// Stat Card Component
function StatCard({ value, label, description, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      className="text-center"
    >
      <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-2">
        {value}
      </div>
      <div className="text-lg font-semibold text-gray-300 mb-1">{label}</div>
      <div className="text-sm text-gray-500">{description}</div>
    </motion.div>
  );
}

export default OurEcosystem;