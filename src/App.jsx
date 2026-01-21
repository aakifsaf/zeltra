import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshWobbleMaterial, OrbitControls, Float } from '@react-three/drei';
import * as THREE from 'three';
import BackgroundAnimation from './components/BackgroundAnimation';
import OurEcosystem from './components/OurEcosystem';
import FAQSection from './components/FAQSection';
import AboutSection from './components/AboutSection';

// Main App Component
export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ container: containerRef });
  
  // Parallax values for different sections
  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, 100]);
  const aboutY = useTransform(scrollYProgress, [0.1, 0.4], [0, -50]);
  
  // Section observer for active nav
  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, { rootMargin: '-40% 0px -55% 0px', threshold: 0});
    
    sections.forEach(section => observer.observe(section));
    
    return () => sections.forEach(section => observer.unobserve(section));
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="scroll-smooth bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 text-white overflow-x-hidden"
    >
      {/* Navigation */}
      <Navigation 
        isMenuOpen={isMenuOpen} 
        setIsMenuOpen={setIsMenuOpen}
        activeSection={activeSection}
      />
      
      {/* Hero Section */}
      <section id="hero" className="relative min-h-[600px] md:min-h-screen overflow-hidden">
        <BackgroundAnimation />
        <div className="container mx-auto px-4 pt-24 md:pt-32 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              <span className="block">Building The Future</span>
              <span className="block bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                With Exceptional Software
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-3xl">
              We craft enterprise-grade digital solutions that drive innovation, 
              streamline operations, and deliver measurable ROI for forward-thinking companies.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Start Your Project
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gray-800 border border-gray-700 text-white font-semibold py-4 px-8 rounded-xl shadow-lg hover:bg-gray-700 transition-all duration-300"
              >
                View Case Studies
              </motion.button>
            </div>
          </motion.div>
          
          
          {/* Scroll Indicator */}
          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 hidden md:block"
          >
            <div className="w-6 h-10 border-2 border-gray-500 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-blue-500 rounded-full mt-2"></div>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* About Section */}
        <AboutSection/>

      <section id="ecosystem" className="py-20 md:py-32 bg-gradient-to-b from-gray-950 to-black">
      <OurEcosystem/>
      </section>
      {/* Testimonials/Work Section */}
      <section id="testimonials" className="py-20 md:py-32 bg-gradient-to-b from-gray-900 to-gray-950">
  <div className="container mx-auto px-4">
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-bold mb-6">
          <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Impactful Projects
          </span>
        </h2>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          We've delivered transformative solutions for companies ranging from startups to Fortune 500.
        </p>
      </div>
      
      {/* Previous Works Section */}
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <ProjectCard 
            title="Enterprise AI Platform"
            company="Global Finance Corp"
            description="Built a comprehensive AI platform for fraud detection and risk analysis processing over 1M transactions daily."
            category="AI/ML"
            technologies={['Python', 'TensorFlow', 'Kubernetes', 'React']}
            results={['99.8% accuracy', '40% faster processing', '$2.8M annual savings']}
            index={0}
          />
          
          <ProjectCard 
            title="Healthcare Analytics Suite"
            company="HealthInnovate"
            description="Developed a real-time patient monitoring system with predictive analytics for early intervention."
            category="Healthcare"
            technologies={['Node.js', 'WebSockets', 'PostgreSQL', 'D3.js']}
            results={['30% faster diagnosis', '45% reduced readmissions', 'HIPAA compliant']}
            index={1}
          />
          
          <ProjectCard 
            title="E-commerce Scaling Solution"
            company="TechVision Inc."
            description="Scaled their e-commerce platform to handle 10x traffic during peak seasons with zero downtime."
            category="E-commerce"
            technologies={['AWS', 'Microservices', 'Redis', 'GraphQL']}
            results={['99.99% uptime', '10x scalability', '2s load time']}
            index={2}
          />
        </div>
        
        {/* Additional Projects Carousel */}
        <div className="mt-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ProjectCard 
              title="Supply Chain Optimization"
              company="LogiTech Solutions"
              description="Implemented an IoT-enabled supply chain management system with real-time tracking and predictive logistics."
              category="Logistics"
              technologies={['IoT', 'Blockchain', 'React Native', 'MongoDB']}
              results={['35% cost reduction', '60% faster delivery', 'Real-time tracking']}
              index={3}
              compact
            />
            
            <ProjectCard 
              title="FinTech Mobile App"
              company="WealthFront Digital"
              description="Created a mobile banking app with biometric security, investment tracking, and automated portfolio management."
              category="FinTech"
              technologies={['Flutter', 'Firebase', 'Machine Learning', 'Stripe API']}
              results={['1M+ downloads', '4.9 App Store rating', 'Zero security breaches']}
              index={4}
              compact
            />
          </div>
        </div>
        
        {/* View More Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group inline-flex items-center gap-3 bg-gradient-to-r from-gray-800 to-gray-900 border border-gray-700 text-white font-semibold py-4 px-8 rounded-xl shadow-lg hover:border-blue-500 transition-all duration-300"
          >
            <span>View All Case Studies</span>
            <svg 
              className="w-5 h-5 group-hover:translate-x-1 transition-transform" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </motion.button>
        </motion.div>
    </motion.div>
  </div>
</section>

    <FAQSection/>
      
      {/* Contact/CTA Section */}
      <section id="contact" className="py-20 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-5xl mx-auto bg-gray-900/70 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-2xl border border-gray-800"
          >
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Ready to Transform Your Business?
                </h2>
                <p className="text-gray-300 mb-8">
                  Let's discuss how our software solutions can drive innovation, 
                  efficiency, and growth for your organization.
                </p>
                <div className="space-y-6">
                  <ContactInfo 
                    icon="📧"
                    title="Email"
                    detail="contact@nexussoftware.com"
                  />
                  <ContactInfo 
                    icon="📞"
                    title="Phone"
                    detail="+1 (555) 123-4567"
                  />
                  <ContactInfo 
                    icon="📍"
                    title="Office"
                    detail="San Francisco, CA | New York, NY | Austin, TX"
                  />
                </div>
              </div>
              
              <div>
                <form className="space-y-6">
                  <div>
                    <label className="block text-gray-300 mb-2">Full Name</label>
                    <input 
                      type="text" 
                      className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="John Smith"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 mb-2">Email Address</label>
                    <input 
                      type="email" 
                      className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="john@company.com"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 mb-2">Project Details</label>
                    <textarea 
                      rows="4"
                      className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Tell us about your project needs..."
                    />
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    Schedule a Consultation
                  </motion.button>
                </form>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}

// Navigation Component
function Navigation({ isMenuOpen, setIsMenuOpen, activeSection }) {
  const navItems = [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'ecosystem', label: 'Ecosystem' },
    { id: 'testimonials', label: 'Work' },
    { id: 'faq', label: 'FAQs' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <nav className="fixed top-0 w-full z-50 bg-gray-950/90 backdrop-blur-md border-b border-gray-800">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
              Zeltra
            </div>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a 
                key={item.id}
                href={`#${item.id}`}
                className={`relative py-2 transition-colors duration-300 ${activeSection === item.id ? 'text-blue-400' : 'text-gray-300 hover:text-white'}`}
              >
                {item.label}
                {activeSection === item.id && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 to-cyan-400"
                  />
                )}
              </a>
            ))}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold py-2 px-6 rounded-xl"
            >
              Get Started
            </motion.button>
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-gray-300"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <div className="w-6 h-6 flex flex-col justify-center">
              <span className={`block h-0.5 w-6 bg-current transform transition duration-300 ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
              <span className={`block h-0.5 w-6 bg-current transition duration-300 mt-1 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`block h-0.5 w-6 bg-current transform transition duration-300 mt-1 ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
            </div>
          </button>
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ duration: 0.3 }}
            className="md:hidden mt-4 pb-4"
          >
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <a 
                  key={item.id}
                  href={`#${item.id}`}
                  className={`py-2 px-4 rounded-lg ${activeSection === item.id ? 'bg-gray-800 text-blue-400' : 'text-gray-300 hover:bg-gray-800'}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <button className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold py-3 px-6 rounded-xl mt-2">
                Get Started
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  );
}

// Project Card Component
function ProjectCard({ title, company, description, category, technologies, results, index, compact = false }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ y: -5, transition: { duration: 0.3 } }}
      className={`group bg-gradient-to-br from-gray-900/80 to-gray-950/80 backdrop-blur-sm border border-gray-800 rounded-2xl overflow-hidden hover:border-blue-500/50 transition-all duration-300 ${compact ? 'p-6' : 'p-8'}`}
    >
      {/* Category Badge */}
      <div className="inline-flex items-center gap-2 mb-6">
        <div className={`w-2 h-2 rounded-full ${
          category === 'AI/ML' ? 'bg-cyan-500' : 
          category === 'Healthcare' ? 'bg-green-500' : 
          category === 'E-commerce' ? 'bg-purple-500' :
          category === 'Logistics' ? 'bg-orange-500' : 
          'bg-blue-500'
        }`}></div>
        <span className="text-sm font-medium text-gray-400">{category}</span>
      </div>
      
      {/* Title & Company */}
      <h4 className="text-xl font-bold mb-2 group-hover:text-blue-400 transition-colors">
        {title}
      </h4>
      <p className="text-blue-300 font-medium mb-4">{company}</p>
      
      {/* Description */}
      <p className="text-gray-400 mb-6">{description}</p>
      
      {/* Technologies */}
      <div className="mb-6">
        <p className="text-sm text-gray-500 mb-3">Technologies Used:</p>
        <div className="flex flex-wrap gap-2">
          {technologies.map((tech, i) => (
            <span 
              key={i}
              className="px-3 py-1 bg-gray-800/50 text-gray-300 text-xs rounded-full border border-gray-700"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
      
      {/* Results */}
      <div>
        <p className="text-sm text-gray-500 mb-3">Key Results:</p>
        <ul className="space-y-2">
          {results.map((result, i) => (
            <li key={i} className="flex items-center gap-2">
              <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-gray-300 text-sm">{result}</span>
            </li>
          ))}
        </ul>
      </div>
      
      {/* Hover Effect Indicator */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-cyan-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
    </motion.div>
  );
}


// Feature Card Component
function FeatureCard({ title, description, icon, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true }}
      whileHover={{ y: -10, transition: { duration: 0.3 } }}
      className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 hover:border-blue-500/50 transition-all duration-300"
    >
      <div className="text-4xl mb-6">{icon}</div>
      <h3 className="text-2xl font-bold mb-4">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </motion.div>
  );
}

// Testimonial Card Component
function TestimonialCard({ company, quote, person, index }) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ y: -5, transition: { duration: 0.3 } }}
      className="group bg-gradient-to-br from-gray-900/60 to-gray-950/60 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 hover:border-blue-500/30 transition-all duration-300 relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute -right-10 -top-10 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-xl group-hover:scale-150 transition-transform duration-700"></div>
      
      {/* Quote Icon */}
      <div className="text-5xl text-blue-500/20 mb-4">"</div>
      
      {/* Quote */}
      <p className={`text-gray-300 mb-8 relative z-10 ${isExpanded ? '' : 'line-clamp-4'}`}>
        {quote}
      </p>
      
      {/* Read More Button */}
      {quote.length > 150 && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-sm text-blue-400 hover:text-blue-300 mb-6 transition-colors"
        >
          {isExpanded ? 'Read less' : 'Read more'}
        </button>
      )}
      
      {/* Client Info */}
      <div className="border-t border-gray-800 pt-6 relative z-10">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold">
            {person.charAt(0)}
          </div>
          <div>
            <div className="font-bold text-lg">{person}</div>
            <div className="text-blue-400">{company}</div>
          </div>
        </div>
      </div>
      
      {/* Hover Effect Line */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-cyan-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
    </motion.div>
  );
}

// Contact Info Component
function ContactInfo({ icon, title, detail }) {
  return (
    <div className="flex items-center">
      <div className="text-2xl mr-4">{icon}</div>
      <div>
        <div className="font-semibold">{title}</div>
        <div className="text-gray-300">{detail}</div>
      </div>
    </div>
  );
}

// Footer Component
function Footer() {
  return (
    <footer className="bg-gray-950 border-t border-gray-800 py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-8 md:mb-0">
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent mb-4">
              Zeltra<span className="text-white"> Software Solutions</span>
            </div>
            <p className="text-gray-400 max-w-md">
              Building the future of enterprise software with innovative solutions and cutting-edge technology.
            </p>
          </div>
          
          <div className="flex space-x-6">
            {['Twitter', 'LinkedIn', 'GitHub', 'Dribbble'].map((social) => (
              <a 
                key={social}
                href="#" 
                className="text-gray-400 hover:text-white transition-colors duration-300"
              >
                {social}
              </a>
            ))}
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-10 pt-8 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Zeltra Software Solutions. All rights reserved.</p>
          <p className="mt-2">San Francisco • New York • Austin • London</p>
        </div>
      </div>
    </footer>
  );
}