import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  Brain, 
  Server, 
  Shield, 
  Smartphone, 
  Cloud, 
  Cpu,
  CircuitBoard
} from 'lucide-react';

const Technology: React.FC = () => {
  const [titleRef, titleInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [diagramRef, diagramInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [stackRef, stackInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="technology" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 20 }}
          animate={titleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Cutting-Edge Technology
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            A powerful, secure architecture designed for privacy and performance.
          </p>
        </motion.div>

        {/* Architecture Diagram */}
        <motion.div
          ref={diagramRef}
          initial={{ opacity: 0, y: 30 }}
          animate={diagramInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Technical Architecture
          </h3>
          
          <div className="relative max-w-4xl mx-auto">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8 overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* User Device Layer */}
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-5 border border-gray-100 dark:border-gray-600">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900/50 rounded-lg flex items-center justify-center text-primary-600 dark:text-primary-400">
                      <Smartphone size={20} />
                    </div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">User Device Layer</h4>
                  </div>
                  <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                    <li className="flex items-start">
                      <span className="text-primary-600 dark:text-primary-400 mr-2">•</span>
                      Voice interface & processing
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary-600 dark:text-primary-400 mr-2">•</span>
                      On-device NLP for sensitive data
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary-600 dark:text-primary-400 mr-2">•</span>
                      Local context caching
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary-600 dark:text-primary-400 mr-2">•</span>
                      Privacy-first data filtering
                    </li>
                  </ul>
                </div>

                {/* Core AI Layer */}
                <div className="bg-primary-50 dark:bg-primary-900/30 rounded-lg p-5 border border-primary-100 dark:border-primary-800">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900/50 rounded-lg flex items-center justify-center text-primary-600 dark:text-primary-400">
                      <Brain size={20} />
                    </div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">Core AI Layer</h4>
                  </div>
                  <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                    <li className="flex items-start">
                      <span className="text-primary-600 dark:text-primary-400 mr-2">•</span>
                      Advanced NLP/NLU processing
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary-600 dark:text-primary-400 mr-2">•</span>
                      Personalization engine
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary-600 dark:text-primary-400 mr-2">•</span>
                      Predictive analytics
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary-600 dark:text-primary-400 mr-2">•</span>
                      Context-aware decision making
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary-600 dark:text-primary-400 mr-2">•</span>
                      Emotional intelligence analysis
                    </li>
                  </ul>
                </div>

                {/* Infrastructure Layer */}
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-5 border border-gray-100 dark:border-gray-600">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900/50 rounded-lg flex items-center justify-center text-primary-600 dark:text-primary-400">
                      <Server size={20} />
                    </div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">Infrastructure Layer</h4>
                  </div>
                  <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                    <li className="flex items-start">
                      <span className="text-primary-600 dark:text-primary-400 mr-2">•</span>
                      Secure cloud services
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary-600 dark:text-primary-400 mr-2">•</span>
                      Encrypted data storage
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary-600 dark:text-primary-400 mr-2">•</span>
                      3rd party API integrations
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary-600 dark:text-primary-400 mr-2">•</span>
                      Global redundancy
                    </li>
                  </ul>
                </div>
              </div>

              {/* Connection Lines */}
              <div className="flex justify-center mt-8 mb-4">
                <div className="flex items-center gap-6">
                  <div className="w-3 h-3 rounded-full bg-primary-500 dark:bg-primary-400"></div>
                  <div className="w-24 h-1 bg-primary-200 dark:bg-primary-700"></div>
                  <div className="w-3 h-3 rounded-full bg-primary-500 dark:bg-primary-400"></div>
                  <div className="w-24 h-1 bg-primary-200 dark:bg-primary-700"></div>
                  <div className="w-3 h-3 rounded-full bg-primary-500 dark:bg-primary-400"></div>
                </div>
              </div>

              {/* Security Layer */}
              <div className="bg-secondary-50 dark:bg-secondary-900/30 rounded-lg p-4 border border-secondary-100 dark:border-secondary-800 max-w-xl mx-auto">
                <div className="flex items-center gap-3 justify-center">
                  <div className="w-8 h-8 bg-secondary-100 dark:bg-secondary-900/50 rounded-lg flex items-center justify-center text-secondary-600 dark:text-secondary-400">
                    <Shield size={16} />
                  </div>
                  <h4 className="font-semibold text-sm text-gray-900 dark:text-white">End-to-End Security & Privacy Layer</h4>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Tech Stack */}
        <motion.div
          ref={stackRef}
          initial={{ opacity: 0, y: 30 }}
          animate={stackInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Proposed Technology Stack
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700">
              <div className="w-12 h-12 rounded-lg bg-primary-100 dark:bg-primary-900/50 flex items-center justify-center text-primary-600 dark:text-primary-400 mb-4">
                <Brain size={24} />
              </div>
              <h4 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">AI/ML Stack</h4>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li>• TensorFlow & PyTorch</li>
                <li>• OpenAI API Integration</li>
                <li>• Custom NLP/NLU Models</li>
                <li>• On-device ML Frameworks</li>
                <li>• Voice Recognition & Synthesis</li>
              </ul>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700">
              <div className="w-12 h-12 rounded-lg bg-primary-100 dark:bg-primary-900/50 flex items-center justify-center text-primary-600 dark:text-primary-400 mb-4">
                <Cloud size={24} />
              </div>
              <h4 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">Cloud Infrastructure</h4>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li>• AWS/Azure Hybrid Solution</li>
                <li>• Kubernetes Orchestration</li>
                <li>• Serverless Functions</li>
                <li>• Global CDN</li>
                <li>• Distributed Database Systems</li>
              </ul>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700">
              <div className="w-12 h-12 rounded-lg bg-primary-100 dark:bg-primary-900/50 flex items-center justify-center text-primary-600 dark:text-primary-400 mb-4">
                <Cpu size={24} />
              </div>
              <h4 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">Device Technologies</h4>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li>• iOS & Android SDKs</li>
                <li>• React Native Core</li>
                <li>• On-device ML Acceleration</li>
                <li>• Bluetooth/IoT Protocols</li>
                <li>• Background Processing</li>
              </ul>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700">
              <div className="w-12 h-12 rounded-lg bg-primary-100 dark:bg-primary-900/50 flex items-center justify-center text-primary-600 dark:text-primary-400 mb-4">
                <CircuitBoard size={24} />
              </div>
              <h4 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">Integration Platform</h4>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li>• RESTful & GraphQL APIs</li>
                <li>• Calendar & Email Connectors</li>
                <li>• Smart Home Integration</li>
                <li>• Health Data Access</li>
                <li>• Enterprise SSO Support</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Technology;