import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Sparkles, ShieldCheck } from 'lucide-react';
import SoundWave from './SoundWave';

const Hero: React.FC = () => {
  return (
    <section className="min-h-screen flex items-center pt-24 pb-16 bg-gradient-to-b from-primary-50 to-white dark:from-gray-900 dark:to-gray-800 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col space-y-6"
          >
            <div className="flex items-center gap-2 bg-primary-100 dark:bg-primary-900/50 text-primary-700 dark:text-primary-300 px-4 py-2 rounded-full w-fit">
              <Sparkles size={16} />
              <span className="text-sm font-semibold">The Future of Personal Assistance</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
              Meet <span className="text-primary-600 dark:text-primary-400">AuraMind</span>
              <br />Your Always-On Voice Assistant
            </h1>
            
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-xl">
              A truly intelligent and proactive partner that helps you navigate the complexities of modern life, anticipating your needs and offering timely assistance.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <a 
                href="#features" 
                className="bg-primary-600 hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600 text-white px-8 py-3 rounded-md font-semibold transition-colors text-center"
              >
                Explore Features
              </a>
              <a 
                href="#technology" 
                className="border border-gray-300 dark:border-gray-600 hover:border-primary-300 dark:hover:border-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/50 text-gray-700 dark:text-gray-300 px-8 py-3 rounded-md font-semibold transition-colors text-center"
              >
                How It Works
              </a>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 pt-6">
              <div className="flex items-center gap-2">
                <Brain size={20} className="text-primary-600 dark:text-primary-400" />
                <span className="text-sm text-gray-600 dark:text-gray-300">Intelligent & Context-Aware</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck size={20} className="text-primary-600 dark:text-primary-400" />
                <span className="text-sm text-gray-600 dark:text-gray-300">Privacy-First Design</span>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative flex justify-center"
          >
            <div className="relative w-64 h-64 md:w-80 md:h-80 bg-gradient-to-r from-primary-500 to-secondary-500 dark:from-primary-600 dark:to-secondary-600 rounded-full flex items-center justify-center animate-pulse-slow">
              <div className="absolute inset-0 flex items-center justify-center">
                <SoundWave />
              </div>
              <div className="relative z-10 w-24 h-24 md:w-32 md:h-32 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center shadow-lg">
                <Brain size={48} className="text-primary-600 dark:text-primary-400" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;