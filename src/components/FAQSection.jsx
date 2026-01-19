import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [activeCategory, setActiveCategory] = useState('all');

  const faqCategories = [
    { id: 'all', label: 'All Questions', count: 10 },
    { id: 'services', label: 'Services', count: 4 },
    { id: 'pricing', label: 'Pricing', count: 3 },
    { id: 'technical', label: 'Technical', count: 3 },
  ];

  const faqItems = [
    {
      id: 1,
      question: 'What makes your software development approach different?',
      answer: 'We follow a proprietary methodology called "Agile Prime" that combines the best practices of Agile, DevOps, and Design Thinking. This approach emphasizes rapid prototyping, continuous feedback loops, and automated testing to ensure we deliver high-quality software 40% faster than industry standards. Each project has a dedicated Success Manager who ensures alignment with your business objectives.',
      category: 'services',
      featured: true
    },
    {
      id: 2,
      question: 'How do you handle project security and confidentiality?',
      answer: 'Security is integrated into every layer of our development process. We implement end-to-end encryption for all communications, conduct regular penetration testing, and maintain SOC 2 Type II compliance. All team members sign comprehensive NDAs, and we can set up isolated development environments for sensitive projects. We also offer custom security audits and compliance consulting for regulated industries.',
      category: 'technical',
      featured: true
    },
    {
      id: 3,
      question: 'What is your typical project timeline and delivery process?',
      answer: 'Our delivery process follows a phased approach: Discovery (1-2 weeks), Design Sprint (2-3 weeks), Development Sprints (2-4 weeks each), and Launch & Support. Most MVP projects take 8-12 weeks, while enterprise solutions range from 16-24 weeks. We deliver working software every 2 weeks and provide real-time progress dashboards for complete transparency.',
      category: 'services'
    },
    {
      id: 4,
      question: 'Do you offer ongoing maintenance and support?',
      answer: 'Yes, we provide three tiers of support packages: Essential (24/7 monitoring & bug fixes), Growth (regular updates & feature enhancements), and Enterprise (dedicated support team & SLA guarantees). All packages include security updates, performance optimization, and monthly health reports. Our average response time for critical issues is under 15 minutes.',
      category: 'services'
    },
    {
      id: 5,
      question: 'What technologies and frameworks do you specialize in?',
      answer: 'Our core stack includes React/Next.js for frontend, Node.js/Python for backend, PostgreSQL/MongoDB for databases, and AWS/Kubernetes for infrastructure. We\'re also proficient in React Native, Flutter, TensorFlow, and blockchain technologies. We choose technology based on your specific needs rather than a one-size-fits-all approach, ensuring optimal performance and scalability.',
      category: 'technical'
    },
    {
      id: 6,
      question: 'How do you handle project pricing and billing?',
      answer: 'We offer flexible pricing models: Fixed Price (for well-defined projects), Time & Materials (for agile development), and Retainer (for ongoing partnerships). Most clients prefer our hybrid model combining fixed-price milestones with flexible scope adjustments. We provide detailed quarterly ROI analysis to demonstrate the business value of our work.',
      category: 'pricing'
    },
    {
      id: 7,
      question: 'Can you work with our existing development team?',
      answer: 'Absolutely. We excel at augmenting existing teams with specialized expertise. Our integration process includes knowledge transfer sessions, pair programming, and establishing shared development standards. We\'ve successfully collaborated with over 50 in-house teams across different industries, often acting as technical leaders or specialized problem-solvers.',
      category: 'services'
    },
    {
      id: 8,
      question: 'What industries have you worked with?',
      answer: 'We have extensive experience across FinTech, Healthcare, E-commerce, SaaS, and Enterprise Software. Our portfolio includes compliance platforms for financial institutions, HIPAA-compliant healthcare systems, high-traffic e-commerce solutions, and custom enterprise resource planning tools. Each industry comes with its own regulatory and technical challenges that we\'re equipped to handle.',
      category: 'technical'
    },
    {
      id: 9,
      question: 'Do you provide post-launch analytics and optimization?',
      answer: 'Yes, we implement comprehensive analytics from day one. Our post-launch package includes user behavior tracking, performance monitoring, A/B testing frameworks, and conversion optimization. We provide monthly insights reports with actionable recommendations to improve user engagement and business outcomes.',
      category: 'pricing'
    },
    {
      id: 10,
      question: 'How do you ensure code quality and scalability?',
      answer: 'We implement rigorous quality gates including automated testing (unit, integration, E2E), code reviews, static analysis, and performance benchmarking. Our architecture reviews ensure solutions can scale to millions of users. We maintain 95%+ test coverage and conduct regular load testing to identify bottlenecks before they impact users.',
      category: 'pricing'
    }
  ];

  const filteredFaqs = activeCategory === 'all' 
    ? faqItems 
    : faqItems.filter(item => item.category === activeCategory);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 md:py-32 bg-gradient-to-b from-gray-900 to-gray-950">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Frequently Asked Questions
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Get answers to common questions about our services, process, and partnership.
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto mb-12"
        >
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
            <div className="relative">
              <div className="flex items-center bg-gray-900 border border-gray-800 rounded-2xl pl-4 pr-2 py-2">
                <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Search questions..."
                  className="w-full bg-transparent border-none outline-none text-gray-300 placeholder-gray-500"
                />
                <button className="ml-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-xl hover:opacity-90 transition-opacity">
                  Search
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {faqCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`relative px-6 py-3 rounded-xl font-medium transition-all duration-300 group ${
                activeCategory === category.id
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                  : 'bg-gray-900 border border-gray-800 text-gray-400 hover:text-white hover:border-gray-700'
              }`}
            >
              <span className="relative z-10 flex items-center gap-2">
                {category.label}
                <span className={`text-xs px-2 py-1 rounded-full ${
                  activeCategory === category.id
                    ? 'bg-white/20'
                    : 'bg-gray-800'
                }`}>
                  {category.count}
                </span>
              </span>
              
              {activeCategory === category.id && (
                <motion.div
                  layoutId="faq-category-indicator"
                  className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </button>
          ))}
        </motion.div>

        {/* FAQ List */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className="space-y-4">
            {filteredFaqs
              .filter(item => !item.featured)
              .map((item) => (
                <FAQItem
                  key={item.id}
                  item={item}
                  isOpen={openIndex === item.id}
                  onClick={() => toggleFAQ(item.id)}
                />
              ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// FAQ Item Component
const FAQItem = ({ item, isOpen, onClick }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`relative group cursor-pointer ${
        item.featured ? 'bg-gradient-to-br from-gray-900/80 to-gray-950/80' : 'bg-gray-900/50'
      } backdrop-blur-sm border border-gray-800 rounded-2xl overflow-hidden hover:border-gray-700 transition-all duration-300`}
      onClick={onClick}
    >
      {/* Background Hover Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      {/* Category Badge */}
      <div className="absolute top-4 right-4">
        <span className={`text-xs font-medium px-3 py-1 rounded-full ${
          item.category === 'services' 
            ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
            : item.category === 'pricing'
            ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
            : 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
        }`}>
          {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
        </span>
      </div>
      
      <div className="p-6 md:p-8">
        <div className="flex items-start justify-between gap-6">
          <div className="flex-1">
            <h4 className="text-lg md:text-xl font-bold text-gray-200 mb-2 group-hover:text-white transition-colors">
              {item.question}
            </h4>
            
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <p className="text-gray-400 mt-4 leading-relaxed">
                    {item.answer}
                  </p>
                  
                  {/* Additional Info for Featured Items */}
                  {item.featured && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                      className="mt-6 pt-6 border-t border-gray-800"
                    >
                      <div className="flex flex-wrap gap-3">
                        <span className="flex items-center gap-2 text-sm text-gray-500">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          Updated recently
                        </span>
                        <span className="flex items-center gap-2 text-sm text-gray-500">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          Verified answer
                        </span>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          {/* Toggle Button */}
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className={`flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full ${
              isOpen 
                ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white' 
                : 'bg-gray-800 text-gray-400 group-hover:text-white group-hover:bg-gray-700'
            } transition-all duration-300`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </motion.div>
        </div>
      </div>
      
      {/* Bottom Border Animation */}
      <motion.div
        animate={{ scaleX: isOpen ? 1 : 0 }}
        className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500 origin-left"
        transition={{ duration: 0.5 }}
      />
    </motion.div>
  );
};

export default FAQSection;