import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mic, 
  X, 
  Brain, 
  MessageSquare, 
  Calendar, 
  Clock,
  Settings,
  Volume2,
  VolumeX
} from 'lucide-react';
import { voiceAssistant } from '../lib/voiceAssistant';

interface Message {
  id: string;
  text: string;
  type: 'user' | 'assistant';
  timestamp: Date;
}

const AIAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isListening, setIsListening] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    const handleTranscript = (event: CustomEvent) => {
      const newMessage: Message = {
        id: Date.now().toString(),
        text: event.detail,
        type: 'user',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, newMessage]);
    };

    const handleResponse = (event: CustomEvent) => {
      const newMessage: Message = {
        id: Date.now().toString(),
        text: event.detail,
        type: 'assistant',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, newMessage]);
    };

    window.addEventListener('transcript-update', handleTranscript as EventListener);
    window.addEventListener('assistant-response', handleResponse as EventListener);

    return () => {
      window.removeEventListener('transcript-update', handleTranscript as EventListener);
      window.removeEventListener('assistant-response', handleResponse as EventListener);
    };
  }, []);

  const toggleAssistant = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setMessages([{
        id: Date.now().toString(),
        text: "Hello! I'm AuraMind, your AI assistant. How can I help you today?",
        type: 'assistant',
        timestamp: new Date()
      }]);
    }
  };

  const toggleListening = () => {
    const isActive = voiceAssistant.toggleListening();
    setIsListening(isActive);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    // Implementation for muting voice responses
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  return (
    <>
      <button
        onClick={toggleAssistant}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-primary-600 hover:bg-primary-700 text-white rounded-full flex items-center justify-center shadow-lg transition-colors"
      >
        {isOpen ? <X size={24} /> : <Mic size={24} />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 w-96 max-w-[calc(100vw-2rem)] bg-white dark:bg-gray-800 rounded-xl shadow-xl z-40 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-primary-600 dark:bg-primary-700 p-4 text-white">
              <div className="flex items-center gap-3">
                <Brain size={24} />
                <div>
                  <h2 className="font-semibold">AuraMind Assistant</h2>
                  <p className="text-sm text-primary-100">Always ready to help</p>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="h-96 overflow-y-auto p-4 space-y-4">
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
                    <p className="text-sm">{message.text}</p>
                    <span className="text-xs text-gray-500 dark:text-gray-400 mt-1 block">
                      {formatTime(message.timestamp)}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Controls */}
            <div className="border-t border-gray-200 dark:border-gray-700 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <button
                    onClick={toggleListening}
                    className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
                      isListening
                        ? 'bg-primary-600 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    {isListening ? <Volume2 size={24} /> : <Mic size={24} />}
                  </button>
                  <button
                    onClick={toggleMute}
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                      isMuted
                        ? 'bg-gray-100 dark:bg-gray-700 text-error-500'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                    } hover:bg-gray-200 dark:hover:bg-gray-600`}
                  >
                    {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  <button className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                    <Settings size={20} />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIAssistant;