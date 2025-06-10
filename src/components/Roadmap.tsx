import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Check, Calendar, Clock } from 'lucide-react';

interface RoadmapItemProps {
  phase: string;
  timeline: string;
  title: string;
  description: string;
  features: string[];
  status: 'completed' | 'current' | 'upcoming';
  index: number;
}

const roadmapItems: RoadmapItemProps[] = [
  {
    phase: "Phase 1",
    timeline: "Q3-Q4 2025",
    title: "MVP Launch",
    description: "Core functionality with essential features to establish the platform's value proposition.",
    features: [
      "Basic voice interaction and commands",
      "Daily planning and scheduling assistance",
      "Message handling and notification management",
      "Simple learning resources integration",
      "Foundational well-being features",
      "Basic smart home control"
    ],
    status: 'current',
    index: 0
  },
  {
    phase: "Phase 2",
    timeline: "Q1-Q2 2026",
    title: "Enhanced Intelligence",
    description: "Expanding the AI capabilities and adding more proactive features based on user feedback.",
    features: [
      "Advanced context awareness",
      "Improved personalization engine",
      "Expanded proactive suggestions",
      "Enhanced emotional intelligence",
      "Additional third-party integrations",
      "Beta of relationship nurturing features"
    ],
    status: 'upcoming',
    index: 1
  },
  {
    phase: "Phase 3",
    timeline: "Q3-Q4 2026",
    title: "Premium Features & Expansion",
    description: "Introduction of premium tier with advanced capabilities and expanded platform support.",
    features: [
      "Deep personalization with learning patterns",
      "Advanced goal tracking and achievement",
      "Multi-user household coordination",
      "Enterprise features and integrations",
      "Advanced security and privacy controls",
      "Global language support expansion"
    ],
    status: 'upcoming',
    index: 2
  },
  {
    phase: "Phase 4",
    timeline: "2027 and beyond",
    title: "Ecosystem Development",
    description: "Building a comprehensive ecosystem with additional products and services.",
    features: [
      "Developer API and platform",
      "Specialized industry solutions",
      "Hardware integration products",
      "Advanced health and wellness platform",
      "Community-driven feature marketplace",
      "International market expansion"
    ],
    status: 'upcoming',
    index: 3
  }
];

const RoadmapItem: React.FC<RoadmapItemProps> = ({ 
  phase, 
  timeline, 
  title, 
  description, 
  features, 
  status, 
  index 
}) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const getStatusColor = () => {
    switch(status) {
      case 'completed': return 'bg-success-500 dark:bg-success-600';
      case 'current': return 'bg-primary-500 dark:bg-primary-600';
      case 'upcoming': return 'bg-gray-300 dark:bg-gray-600';
    }
  };

  const getStatusIcon = () => {
    switch(status) {
      case 'completed': return <Check size={16} className="text-white" />;
      case 'current': return <Clock size={16} className="text-white" />;
      case 'upcoming': return <Calendar size={16} className="text-white" />;
    }
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="flex flex-col md:flex-row gap-4 md:gap-8"
    >
      {/* Timeline Connector */}
      <div className="hidden md:flex flex-col items-center">
        <div className={`w-10 h-10 rounded-full ${getStatusColor()} flex items-center justify-center`}>
          {getStatusIcon()}
        </div>
        {index < roadmapItems.length - 1 && (
          <div className="w-1 h-full bg-gray-200 dark:bg-gray-700 my-2"></div>
        )}
      </div>

      {/* Content */}
      <div className={`bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 md:w-4/5 ${
        status === 'current' ? 'ring-2 ring-primary-500/20 dark:ring-primary-400/20' : ''
      }`}>
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <div className="bg-primary-100 dark:bg-primary-900/50 text-primary-700 dark:text-primary-300 px-3 py-1 rounded-full text-sm font-semibold">
            {phase}
          </div>
          <div className="flex md:hidden items-center gap-2">
            <div className={`w-6 h-6 rounded-full ${getStatusColor()} flex items-center justify-center`}>
              {getStatusIcon()}
            </div>
          </div>
          <div className="text-gray-500 dark:text-gray-400 text-sm flex items-center gap-1">
            <Clock size={14} />
            {timeline}
          </div>
        </div>
        
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{title}</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4">{description}</p>
        
        <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Key Deliverables:</h4>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {features.map((feature, idx) => (
            <li key={idx} className="text-gray-600 dark:text-gray-400 text-sm flex items-start">
              <span className="text-primary-500 dark:text-primary-400 mr-2">•</span>
              {feature}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

const Roadmap: React.FC = () => {
  const [titleRef, titleInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="roadmap" className="py-20 dark:bg-gray-900">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 20 }}
          animate={titleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Development Roadmap
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Our strategic plan for bringing AuraMind to life and continuously evolving its capabilities.
          </p>
        </motion.div>

        <div className="space-y-8 md:space-y-0 md:flex md:flex-col">
          {roadmapItems.map((item, index) => (
            <RoadmapItem 
              key={index}
              phase={item.phase}
              timeline={item.timeline}
              title={item.title}
              description={item.description}
              features={item.features}
              status={item.status}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Roadmap;