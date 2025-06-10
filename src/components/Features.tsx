import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  Calendar, 
  BrainCircuit, 
  MessageSquare, 
  Sparkles, 
  Heart, 
  Home, 
  Shield, 
  Target, 
  Zap, 
  Smile, 
  Phone, 
  AlertOctagon 
} from 'lucide-react';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
}

const features = [
  {
    icon: <Calendar size={24} />,
    title: "Intelligent Task Management",
    description: "Dynamic daily planning based on your energy levels, priorities, and context with intelligent reminders that understand when you need them most."
  },
  {
    icon: <MessageSquare size={24} />,
    title: "Contextual Communication Hub",
    description: "Smart message filtering, summarization, and proactive information retrieval for upcoming events, with customized daily briefings."
  },
  {
    icon: <BrainCircuit size={24} />,
    title: "Personalized Learning",
    description: "Contextual micro-learning opportunities that fit into your schedule, with skill-building suggestions based on your goals and interests."
  },
  {
    icon: <Heart size={24} />,
    title: "Well-being Support",
    description: "Subtle mood detection and gentle intervention suggestions, including break reminders, hydration prompts, and guided mindfulness sessions."
  },
  {
    icon: <Home size={24} />,
    title: "Environment Control",
    description: "Seamless smart home integration with learned routines and proactive environmental adjustments based on your preferences and activities."
  },
  {
    icon: <Shield size={24} />,
    title: "Privacy & Security",
    description: "On-device processing for sensitive data, transparent policies, granular controls, and robust encryption to keep your information safe."
  },
  {
    icon: <Target size={24} />,
    title: "Goal Achievement",
    description: "Long-term goal tracking that breaks objectives into manageable steps and intelligently integrates them into your daily planning."
  },
  {
    icon: <Zap size={24} />,
    title: "Mental Load Reduction",
    description: "Proactively manages routine cognitive tasks, anticipating needs like grocery planning or bill payments before they become urgent."
  },
  {
    icon: <Sparkles size={24} />,
    title: "Deep Personalization",
    description: "Goes beyond simple preferences to understand your habits, rhythms, and cognitive patterns for truly tailored assistance."
  },
  {
    icon: <Smile size={24} />,
    title: "Relationship Nurturing",
    description: "Gentle reminders for important connections, birthdays, and follow-ups to help maintain your personal and professional relationships."
  },
  {
    icon: <Phone size={24} />,
    title: "Multi-device Synchronization",
    description: "Seamlessly works across your devices, ensuring consistent experience and continuous assistance wherever you are."
  },
  {
    icon: <AlertOctagon size={24} />,
    title: "Emergency Assistance",
    description: "Optional safety features like fall detection or distress call activation based on voice cues or connected sensor data."
  }
];

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, index }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow p-6 border border-gray-100 dark:border-gray-700"
    >
      <div className="w-12 h-12 rounded-lg bg-primary-100 dark:bg-primary-900/50 flex items-center justify-center text-primary-600 dark:text-primary-400 mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300">{description}</p>
    </motion.div>
  );
};

const Features: React.FC = () => {
  const [titleRef, titleInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="features" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 20 }}
          animate={titleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Intelligent Features That Adapt To Your Life
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            AuraMind combines cutting-edge AI with intuitive design to offer features that genuinely enhance your daily experience.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <FeatureCard 
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;