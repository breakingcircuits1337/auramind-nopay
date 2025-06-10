import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  Calendar,
  DollarSign,
  Lightbulb,
  MapPin,
  Leaf,
  FolderTree,
  MessageSquare,
  Settings,
  ChevronRight,
  Plus,
  Send,
  Mic,
  X
} from 'lucide-react';
import { format } from 'date-fns';
import { voiceAssistant } from '../lib/voiceAssistant';
import TaskView from './TaskView';
import FinancialView from './FinancialView';
import SettingsView from './SettingsView';
import AIAvatar from './AIAvatar';

interface Message {
  id: string;
  content: string;
  type: 'user' | 'assistant';
  timestamp: Date;
}

interface FeatureCard {
  icon: React.ReactNode;
  title: string;
  description: string;
  action: string;
  view: string;
}

const features: FeatureCard[] = [
  {
    icon: <Calendar size={24} />,
    title: "Task Management",
    description: "Intelligent task organization and scheduling",
    action: "View Tasks",
    view: "tasks"
  },
  {
    icon: <DollarSign size={24} />,
    title: "Financial Assistant",
    description: "Track expenses and optimize spending",
    action: "Manage Finances",
    view: "financial"
  },
  {
    icon: <Lightbulb size={24} />,
    title: "Creative Assistant",
    description: "Brainstorm and develop ideas",
    action: "Start Creating",
    view: "creative"
  },
  {
    icon: <MapPin size={24} />,
    title: "Local Discovery",
    description: "Explore events and community",
    action: "Discover",
    view: "discovery"
  },
  {
    icon: <Leaf size={24} />,
    title: "Sustainability Guide",
    description: "Track and improve eco-friendly habits",
    action: "Go Green",
    view: "sustainability"
  },
  {
    icon: <FolderTree size={24} />,
    title: "Digital Organization",
    description: "Manage and optimize digital assets",
    action: "Organize",
    view: "organization"
  }
];

const MainInteractionPage: React.FC = () => {
  const [activeView, setActiveView] = useState<string>('dashboard');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const handleSpeakingState = (speaking: boolean) => {
      setIsSpeaking(speaking);
    };

    voiceAssistant.addSpeakingStateListener(handleSpeakingState);

    return () => {
      voiceAssistant.removeSpeakingStateListener(handleSpeakingState);
    };
  }, []);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      type: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);
    setInputValue('');

    // Simulate AI response
    setTimeout(() => {
      const response: Message = {
        id: (Date.now() + 1).toString(),
        content: "I understand your request. How can I help you with that?",
        type: 'assistant',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, response]);
    }, 1000);
  };

  const toggleVoice = () => {
    const isActive = voiceAssistant.toggleListening();
    setIsListening(isActive);
  };

  const handleFeatureClick = (view: string) => {
    setActiveView(view);
  };

  const handleNewTask = () => {
    setActiveView('tasks');
  };

  const handleSettings = () => {
    setActiveView('settings');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Header with Avatar */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-6">
            <AIAvatar isSpeaking={isSpeaking} />
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">AuraMind Assistant</h1>
              <p className="text-gray-600 dark:text-gray-300">Your intelligent companion</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsChatOpen(!isChatOpen)}
              className="flex items-center gap-2 px-4 py-2 bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400 rounded-lg hover:bg-primary-200 dark:hover:bg-primary-800 transition-colors"
            >
              <MessageSquare size={20} />
              <span>Chat</span>
            </button>
            <button 
              onClick={handleSettings}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <Settings size={24} className="text-gray-600 dark:text-gray-300" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {activeView === 'dashboard' && (
              <>
                {/* Quick Actions */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 mb-8">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h2>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <button 
                      onClick={handleNewTask}
                      className="flex items-center gap-2 p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-600 transition-colors"
                    >
                      <Plus size={18} className="text-primary-600 dark:text-primary-400" />
                      <span className="text-gray-700 dark:text-gray-300">New Task</span>
                    </button>
                    <button 
                      onClick={() => setIsChatOpen(true)}
                      className="flex items-center gap-2 p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-600 transition-colors"
                    >
                      <MessageSquare size={18} className="text-primary-600 dark:text-primary-400" />
                      <span className="text-gray-700 dark:text-gray-300">Chat</span>
                    </button>
                  </div>
                </div>

                {/* Feature Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {features.map((feature, index) => (
                    <motion.div
                      key={feature.title}
                      ref={ref}
                      initial={{ opacity: 0, y: 20 }}
                      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden"
                    >
                      <div className="p-6">
                        <div className="w-12 h-12 rounded-lg bg-primary-100 dark:bg-primary-900/50 flex items-center justify-center text-primary-600 dark:text-primary-400 mb-4">
                          {feature.icon}
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                          {feature.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 mb-4">
                          {feature.description}
                        </p>
                        <button
                          onClick={() => handleFeatureClick(feature.view)}
                          className="flex items-center justify-between w-full px-4 py-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        >
                          <span className="text-gray-700 dark:text-gray-300">{feature.action}</span>
                          <ChevronRight size={18} className="text-gray-400" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </>
            )}
            
            {activeView === 'tasks' && <TaskView onBack={() => setActiveView('dashboard')} />}
            {activeView === 'financial' && <FinancialView />}
            {activeView === 'settings' && <SettingsView onBack={() => setActiveView('dashboard')} />}
          </div>

          {/* Chat Interface */}
          <AnimatePresence>
            {isChatOpen && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden h-[calc(100vh-8rem)] sticky top-24"
              >
                <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center">
                      <AIAvatar isSpeaking={isSpeaking} />
                    </div>
                    <span className="font-medium text-gray-900 dark:text-white">AuraMind Chat</span>
                  </div>
                  <button
                    onClick={() => setIsChatOpen(false)}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    <X size={20} className="text-gray-500 dark:text-gray-400" />
                  </button>
                </div>

                <div className="flex flex-col h-[calc(100%-8rem)]">
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[80%] rounded-lg p-3 ${
                            message.type === 'user'
                              ? 'bg-primary-100 dark:bg-primary-900 text-primary-900 dark:text-primary-100'
                              : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100'
                          }`}
                        >
                          <p className="text-sm">{message.content}</p>
                          <span className="text-xs text-gray-500 dark:text-gray-400 mt-1 block">
                            {format(message.timestamp, 'HH:mm')}
                          </span>
                        </div>
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>

                  <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        placeholder="Type your message..."
                        className="flex-1 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                      <button
                        onClick={toggleVoice}
                        className={`p-2 rounded-lg transition-colors ${
                          isListening
                            ? 'bg-primary-600 text-white'
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                        }`}
                      >
                        <Mic size={20} />
                      </button>
                      <button
                        onClick={handleSendMessage}
                        className="p-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                      >
                        <Send size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default MainInteractionPage;