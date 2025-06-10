import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Brain, Sparkles, MessageSquare } from 'lucide-react';

const CTA: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="cta" className="py-20 bg-gradient-to-br from-primary-600 to-primary-800 dark:from-primary-900 dark:to-primary-950 text-white">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Start Using AuraMind Now
          </h2>
          <p className="text-lg text-primary-100 mb-8">
            Experience the power of AI-driven personal assistance instantly.
            No signup required.
          </p>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-10">
            <div className="flex items-center justify-center gap-3 mb-4">
              <MessageSquare size={24} className="text-primary-300" />
              <h3 className="text-xl font-semibold">Try Voice Commands</h3>
            </div>
            <p className="text-primary-100 mb-4">
              Click the microphone icon in the bottom right corner to start interacting with AuraMind
            </p>
            <div className="text-sm text-primary-200">
              Example commands:
              <ul className="mt-2 space-y-2">
                <li>"What's on my schedule today?"</li>
                <li>"Set a reminder for tomorrow at 2 PM"</li>
                <li>"Tell me about your features"</li>
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-5">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Brain size={20} />
                <h3 className="font-semibold">AI-Powered</h3>
              </div>
              <p className="text-sm text-primary-100">
                Powered by Google's Gemini AI
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-5">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Sparkles size={20} />
                <h3 className="font-semibold">Instant Access</h3>
              </div>
              <p className="text-sm text-primary-100">
                No registration needed
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-5">
              <div className="flex items-center justify-center gap-2 mb-2">
                <MessageSquare size={20} />
                <h3 className="font-semibold">Voice Ready</h3>
              </div>
              <p className="text-sm text-primary-100">
                Just click and speak
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;