import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, MeshWobbleMaterial, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

const AboutSection = () => {
  const containerRef = useRef(null);
  const timelineRef = useRef(null);
  const isInView = useInView(timelineRef, { once: true, amount: 0.3 });
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  // Parallax effects
  const parallaxY = useTransform(scrollYProgress, [0, 1], [-50, 50]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.3, 1, 1, 0.3]);

  const [activeStat, setActiveStat] = useState(0);
  
  // Interactive stats
  const stats = [
    { value: '150+', label: 'Projects Delivered', suffix: '', color: '#3b82f6' },
    { value: '99.7', label: 'Client Satisfaction', suffix: '%', color: '#8b5cf6' },
    { value: '40', label: 'Engineering Experts', suffix: '+', color: '#06b6d4' },
    { value: '5', label: 'Years Excellence', suffix: '+', color: '#10b981' },
  ];

  // Timeline data
  const milestones = [
    { year: '2019', title: 'Founded with Vision', description: 'Started with a mission to revolutionize enterprise software development.' },
    { year: '2020', title: 'First Major Client', description: 'Delivered a transformative platform for a Fortune 500 company.' },
    { year: '2021', title: 'AI Division Launch', description: 'Established specialized AI/ML division to serve growing demand.' },
    { year: '2022', title: 'Global Expansion', description: 'Opened offices in New York, London, and Singapore.' },
    { year: '2023', title: 'Innovation Awards', description: 'Recognized as "Most Innovative Tech Company" by TechReview.' },
    { year: '2024', title: 'Future Ready', description: 'Pioneering quantum computing applications in enterprise solutions.' },
  ];

  // Rotate active stat
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStat((prev) => (prev + 1) % stats.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="about" ref={containerRef} className="py-20 md:py-40 relative overflow-hidden">
      {/* 3D Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-full blur-3xl"></div>
        
        {/* Animated 3D Spheres */}
        <div className="absolute top-1/3 left-10 w-64 h-64 opacity-30">
          <Canvas camera={{ position: [0, 0, 3] }}>
            <FloatingSphere position={[0, 0, 0]} color="#3b82f6" size={1.2} />
            <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
          </Canvas>
        </div>
        
        <div className="absolute bottom-1/3 right-10 w-64 h-64 opacity-30">
          <Canvas camera={{ position: [0, 0, 3] }}>
            <FloatingSphere position={[0, 0, 0]} color="#8b5cf6" size={1} reverse />
            <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.8} />
          </Canvas>
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Main Heading with Parallax */}
        <motion.div style={{ y: parallaxY }} className="text-center mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="inline-block mb-6"
          >
            <span className="text-sm font-semibold text-blue-400 bg-blue-500/10 px-4 py-2 rounded-full border border-blue-500/20">
              SINCE 2019
            </span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8"
          >
            <span className="block">Redefining</span>
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
              Digital Excellence
            </span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed"
          >
            We architect intelligent digital ecosystems that transform businesses, 
            powered by cutting-edge technology and visionary thinking.
          </motion.p>
        </motion.div>

        {/* Interactive Stats */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              onHoverStart={() => setActiveStat(index)}
              className={`relative bg-gradient-to-br from-gray-900/50 to-gray-950/50 backdrop-blur-sm border rounded-2xl p-6 text-center transition-all duration-300 cursor-pointer ${
                activeStat === index 
                  ? 'border-blue-500/50 shadow-2xl shadow-blue-500/20' 
                  : 'border-gray-800 hover:border-gray-700'
              }`}
            >
              <div className="text-3xl md:text-4xl font-bold mb-2" style={{ color: stat.color }}>
                {stat.value}
                <span className="text-2xl">{stat.suffix}</span>
              </div>
              <div className="text-gray-400 text-sm md:text-base">{stat.label}</div>
              
              {/* Animated Indicator */}
              {activeStat === index && (
                <motion.div
                  layoutId="activeStat"
                  className="absolute inset-0 rounded-2xl border-2"
                  style={{ borderColor: stat.color }}
                  initial={false}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Core Philosophy */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl md:text-3xl font-bold mb-6">
                  <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                    Our Philosophy
                  </span>
                </h3>
                <p className="text-gray-300 mb-6 text-lg leading-relaxed">
                  We believe that exceptional software begins with understanding the human 
                  elements behind every business challenge. Our approach combines technical 
                  mastery with deep empathy to create solutions that not only work flawlessly 
                  but also feel intuitive and empowering.
                </p>
                <p className="text-gray-400 leading-relaxed">
                  Through our proprietary <span className="text-blue-400 font-semibold">"Architect-First" methodology</span>, 
                  we ensure every solution is scalable, maintainable, and future-proof. 
                  We don't just build software; we engineer digital foundations that 
                  enable businesses to thrive in an ever-evolving technological landscape.
                </p>
              </div>
              
              <div className="relative">
                {/* 3D Tech Stack Visualization */}
                <div className="w-full h-64 md:h-80">
                  <Canvas camera={{ position: [0, 0, 5] }}>
                    <TechStackVisualization />
                    <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={1} />
                    <ambientLight intensity={0.5} />
                    <pointLight position={[10, 10, 10]} intensity={1} />
                  </Canvas>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Timeline */}
        <div ref={timelineRef} className="mb-20">
          <h3 className="text-2xl md:text-3xl font-bold text-center mb-12">
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Our Journey
            </span>
          </h3>
          
          <div className="relative max-w-6xl mx-auto">
            {/* Timeline Line */}
            <div className="absolute hidden md:block left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-500 via-purple-500 to-cyan-500"></div>
            
            {/* Timeline Items */}
            <div className="relative">
              {milestones.map((milestone, index) => (
                <TimelineItem 
                  key={index}
                  milestone={milestone}
                  index={index}
                  isInView={isInView}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Core Capabilities */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl md:text-3xl font-bold text-center mb-12">
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Core Capabilities
            </span>
          </h3>
          
          <div className="grid md:grid-cols-3 gap-8">
            <CapabilityCard 
              title="Strategic Technology Consulting"
              description="We architect comprehensive digital roadmaps that align technology investments with business objectives, ensuring maximum ROI and competitive advantage."
              icon="🎯"
              features={['Digital Transformation', 'Technology Audits', 'Cloud Migration', 'CIO Advisory']}
              color="blue"
            />
            
            <CapabilityCard 
              title="Enterprise Software Development"
              description="Full-stack development of scalable, secure applications that drive operational efficiency and enable innovation across your organization."
              icon="🚀"
              features={['Microservices Architecture', 'Real-time Applications', 'Legacy Modernization', 'API Ecosystems']}
              color="purple"
            />
            
            <CapabilityCard 
              title="AI & Data Intelligence"
              description="Transform raw data into actionable insights with our cutting-edge AI/ML solutions that predict trends, automate processes, and unlock new opportunities."
              icon="🧠"
              features={['Predictive Analytics', 'Computer Vision', 'NLP Solutions', 'Automation Bots']}
              color="cyan"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Floating Sphere Component
function FloatingSphere({ position, color, size = 1, reverse = false }) {
  const meshRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * (reverse ? -0.3 : 0.3);
      meshRef.current.position.y = Math.sin(state.clock.getElapsedTime()) * 0.2;
    }
  });

  return (
    <Sphere ref={meshRef} position={position} args={[size, 32, 32]}>
      <MeshWobbleMaterial
        color={color}
        speed={0.5}
        factor={0.2}
        transparent
        opacity={0.3}
      />
    </Sphere>
  );
}

// Tech Stack Visualization
function TechStackVisualization() {
  const groupRef = useRef();
  
  const techStack = [
    { position: [0, 0, 0], size: 0.4, color: '#61DAFB', name: 'React' },
    { position: [1.5, 0.5, 0], size: 0.3, color: '#000000', name: 'Node.js' },
    { position: [-1.5, -0.5, 0], size: 0.35, color: '#4479A1', name: 'Python' },
    { position: [0, 1.5, -1], size: 0.25, color: '#F24E1E', name: 'Figma' },
    { position: [1, -1.5, 1], size: 0.3, color: '#FF9900', name: 'AWS' },
    { position: [-1, 1, 1.5], size: 0.25, color: '#2496ED', name: 'Docker' },
  ];

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {techStack.map((tech, index) => (
        <Sphere key={index} position={tech.position} args={[tech.size, 16, 16]}>
          <meshStandardMaterial color={tech.color} emissive={tech.color} emissiveIntensity={0.2} />
        </Sphere>
      ))}
      
      {/* Connecting Lines */}
      {techStack.slice(0, -1).map((tech, index) => (
        <line key={`line-${index}`}>
          <bufferGeometry attach="geometry">
            <bufferAttribute
              attach="attributes-position"
              count={2}
              array={new Float32Array([
                ...tech.position,
                ...techStack[(index + 1) % techStack.length].position
              ])}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial color="#3b82f6" transparent opacity={0.3} linewidth={1} />
        </line>
      ))}
    </group>
  );
}

// Timeline Item Component
function TimelineItem({ milestone, index, isInView }) {
  const isLeft = index % 2 === 0;
  
  return (
    <motion.div
      initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className={`flex items-center justify-center mb-12 ${
        isLeft ? 'md:justify-start' : 'md:justify-end'
      }`}
    >
      <div className={`w-full md:w-1/2 ${isLeft ? 'md:pr-16' : 'md:pl-16'}`}>
        <div className="relative bg-gradient-to-br from-gray-900/50 to-gray-950/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 hover:border-blue-500/50 transition-all duration-300">
          {/* Year Indicator */}
          <div className={`absolute top-4 ${
            isLeft ? 'md:right-4' : 'md:left-4'
          }`}>
            <div className="text-sm font-bold text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full">
              {milestone.year}
            </div>
          </div>
          
          {/* Content */}
          <div className={`flex flex-col ${isLeft ? "pl-16 md:pl-0" : "text-left pl-16"}`}>
  <h4 className="text-xl font-bold mb-3 text-gray-200">
    {milestone.title}
  </h4>
  <p className="text-gray-400">
    {milestone.description}
  </p>
</div>
          
          {/* Timeline Dot */}
          <div className={`absolute top-1/2 transform -translate-y-1/2 ${
            isLeft ? 'md:right-[-28px]' : 'md:left-[-28px]'
          } hidden md:block`}>
            <div className="w-4 h-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full border-4 border-gray-900"></div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// Capability Card Component
function CapabilityCard({ title, description, icon, features, color }) {
  const colorClasses = {
    blue: 'border-blue-500/20 hover:border-blue-500/50',
    purple: 'border-purple-500/20 hover:border-purple-500/50',
    cyan: 'border-cyan-500/20 hover:border-cyan-500/50',
  };

  const textColors = {
    blue: 'text-blue-400',
    purple: 'text-purple-400',
    cyan: 'text-cyan-400',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      className={`relative bg-gradient-to-br from-gray-900/50 to-gray-950/50 backdrop-blur-sm border rounded-2xl p-8 transition-all duration-300 group ${colorClasses[color]}`}
    >
      {/* Icon */}
      <div className="text-4xl mb-6">{icon}</div>
      
      {/* Title */}
      <h4 className={`text-xl font-bold mb-4 ${textColors[color]}`}>{title}</h4>
      
      {/* Description */}
      <p className="text-gray-400 mb-6">{description}</p>
      
      {/* Features */}
      <ul className="space-y-2">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center gap-2 text-sm text-gray-500">
            <div className={`w-1.5 h-1.5 rounded-full ${textColors[color]}`}></div>
            {feature}
          </li>
        ))}
      </ul>
      
      {/* Hover Glow Effect */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-transparent to-transparent group-hover:via-blue-500/5 group-hover:to-purple-500/5 transition-all duration-500"></div>
    </motion.div>
  );
}

export default AboutSection;