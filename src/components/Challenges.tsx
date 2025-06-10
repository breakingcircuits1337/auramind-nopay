import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  ShieldAlert, 
  Brain, 
  Zap, 
  Users,
  Lock
} from 'lucide-react';

interface ChallengeProps {
  icon: React.ReactNode;
  title: string;
  challenge: string;
  solution: string;
  index: number;
}

const challenges: ChallengeProps[] = [
  {
    icon: <ShieldAlert size={24} />,
    title: "Privacy & Security",
    challenge: "Balancing always-on functionality with robust privacy protections and data security.",
    solution: "Implementing on-device processing for sensitive data, transparent opt-in policies, granular user controls, and industry-leading encryption standards.",
    index: 0
  },
  {
    icon: <Brain size={24} />,
    title: "Technical Complexity",
    challenge: "Developing sophisticated AI that can understand context, nuance, and user preferences accurately.",
    solution: "Investing in cutting-edge NLP/NLU research, hybrid on-device/cloud processing, and incremental learning from user feedback and corrections.",
    index: 1
  },
  {
    icon: <Zap size={24} />,
    title: "Battery & Performance",
    challenge: "Ensuring the always-on assistant doesn't drain device batteries or impact system performance.",
    solution: "Optimizing code efficiency, using low-power listening modes, smart activation patterns, and adaptive resource usage based on device state.",
    index: 2
  },
  {
    icon: <Users size={24} />,
    title: "User Adoption",
    challenge: "Overcoming skepticism and building trust in an always-on assistant's value and privacy safeguards.",
    solution: "Transparent communication, gradual feature introduction, early user champions program, and demonstrating tangible benefits through real-world use cases.",
    index: 3
  }
];

const Challenge: React.FC<ChallengeProps> = ({ icon, title, challenge, solution, index }) => {
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
      className="bg-white rounded-xl shadow-sm p-6 border border-gray-100"
    >
      <div className="w-12 h-12 rounded-lg bg-primary-100 flex items-center justify-center text-primary-600 mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-3">{title}</h3>
      
      <div className="mb-4">
        <h4 className="text-sm font-semibold text-gray-700 mb-1">Challenge:</h4>
        <p className="text-gray-600">{challenge}</p>
      </div>
      
      <div>
        <h4 className="text-sm font-semibold text-gray-700 mb-1">Our Approach:</h4>
        <p className="text-gray-600">{solution}</p>
      </div>
    </motion.div>
  );
};

const PrivacyCommitment: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
      className="bg-primary-50 rounded-xl p-6 border border-primary-100 mt-12"
    >
      <div className="flex flex-col md:flex-row items-center gap-6">
        <div className="w-16 h-16 rounded-full bg-primary-100 flex-shrink-0 flex items-center justify-center text-primary-600">
          <Lock size={32} />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Our Privacy Commitment</h3>
          <p className="text-gray-600 mb-4">
            At AuraMind, we believe that an always-on assistant must be built on a foundation of trust. 
            We're committed to giving users complete control over their data, with transparency about what's 
            collected and how it's used. Your data belongs to you, and our business model is built around 
            providing value through our service—not through monetizing your information.
          </p>
          <div className="flex flex-wrap gap-3">
            <div className="bg-white px-3 py-1.5 rounded-full text-sm font-medium text-gray-700 shadow-sm">
              On-device processing first
            </div>
            <div className="bg-white px-3 py-1.5 rounded-full text-sm font-medium text-gray-700 shadow-sm">
              Transparent data policies
            </div>
            <div className="bg-white px-3 py-1.5 rounded-full text-sm font-medium text-gray-700 shadow-sm">
              Granular user controls
            </div>
            <div className="bg-white px-3 py-1.5 rounded-full text-sm font-medium text-gray-700 shadow-sm">
              No third-party data selling
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Challenges: React.FC = () => {
  const [titleRef, titleInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="challenges" className="py-20">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 20 }}
          animate={titleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Challenges & Solutions
          </h2>
          <p className="text-lg text-gray-600">
            We're tackling complex problems with innovative approaches to deliver an exceptional experience.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {challenges.map((challenge, index) => (
            <Challenge 
              key={index}
              icon={challenge.icon}
              title={challenge.title}
              challenge={challenge.challenge}
              solution={challenge.solution}
              index={index}
            />
          ))}
        </div>
        
        <PrivacyCommitment />
      </div>
    </section>
  );
};

export default Challenges;