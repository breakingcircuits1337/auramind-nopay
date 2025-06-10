import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Users, Briefcase, GraduationCap } from 'lucide-react';

interface UserPersonaProps {
  icon: React.ReactNode;
  name: string;
  role: string;
  painPoints: string[];
  solutions: string[];
  index: number;
}

const userPersonas = [
  {
    icon: <Briefcase size={24} />,
    name: "Sarah Chen",
    role: "Busy Executive",
    painPoints: [
      "Constantly juggling multiple priorities and meetings",
      "Struggles to maintain work-life balance",
      "Often misses important emails or messages",
      "Feels overwhelmed by information overload"
    ],
    solutions: [
      "Dynamic scheduling that adapts to changing priorities",
      "Proactive meeting preparation with relevant documents and context",
      "Smart notification filtering that surfaces truly important messages",
      "End-of-day wind-down reminders and next-day preparation"
    ]
  },
  {
    icon: <Users size={24} />,
    name: "Michael Rodriguez",
    role: "Working Parent",
    painPoints: [
      "Challenging coordination of family schedules and activities",
      "Frequently forgets personal tasks while managing family needs",
      "Difficulty maintaining regular self-care routines",
      "Struggles with meal planning and household management"
    ],
    solutions: [
      "Family calendar synchronization with proactive conflict resolution",
      "Gentle personal task reminders based on availability and energy",
      "Wellness prompts integrated into daily routine",
      "Automated grocery list generation and meal suggestions"
    ]
  },
  {
    icon: <GraduationCap size={24} />,
    name: "Aisha Johnson",
    role: "Graduate Student",
    painPoints: [
      "Balancing research, classes, and teaching responsibilities",
      "Difficulty managing long-term projects alongside daily tasks",
      "Struggles with consistent study habits and focus",
      "Limited time for personal development outside academics"
    ],
    solutions: [
      "Intelligent task prioritization based on deadlines and importance",
      "Project breakdown with milestone tracking and gentle progress nudges",
      "Focus mode activation with distraction management",
      "Micro-learning opportunities integrated into schedule gaps"
    ]
  }
];

const UserPersona: React.FC<UserPersonaProps> = ({ icon, name, role, painPoints, solutions, index }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden"
    >
      <div className="bg-gradient-to-r from-primary-600 to-primary-500 dark:from-primary-800 dark:to-primary-700 p-6 text-white">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
            {icon}
          </div>
          <div>
            <h3 className="text-2xl font-bold">{name}</h3>
            <p className="text-primary-100">{role}</p>
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <div className="mb-6">
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
            <span className="w-2 h-2 bg-error-500 rounded-full mr-2"></span>
            Pain Points
          </h4>
          <ul className="space-y-2">
            {painPoints.map((point, idx) => (
              <li key={idx} className="text-gray-600 dark:text-gray-300 flex items-start">
                <span className="text-error-500 dark:text-error-400 mr-2">•</span>
                {point}
              </li>
            ))}
          </ul>
        </div>
        
        <div>
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
            <span className="w-2 h-2 bg-success-500 rounded-full mr-2"></span>
            How AuraMind Helps
          </h4>
          <ul className="space-y-2">
            {solutions.map((solution, idx) => (
              <li key={idx} className="text-gray-600 dark:text-gray-300 flex items-start">
                <span className="text-success-500 dark:text-success-400 mr-2">•</span>
                {solution}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
};

const UserStories: React.FC = () => {
  const [titleRef, titleInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="user-stories" className="py-20 dark:bg-gray-900">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 20 }}
          animate={titleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Real People, Real Solutions
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            See how AuraMind transforms daily challenges into seamless experiences for different users.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {userPersonas.map((persona, index) => (
            <UserPersona
              key={index}
              icon={persona.icon}
              name={persona.name}
              role={persona.role}
              painPoints={persona.painPoints}
              solutions={persona.solutions}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default UserStories;