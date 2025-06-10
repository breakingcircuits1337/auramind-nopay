import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mic, Volume2 } from 'lucide-react';
import { voiceAssistant } from '../lib/voiceAssistant';

const VoiceRecognition: React.FC = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');

  useEffect(() => {
    const updateTranscript = (text: string) => {
      setTranscript(text);
    };

    // Add event listener for transcript updates
    window.addEventListener('transcript-update', (e: any) => updateTranscript(e.detail));

    return () => {
      window.removeEventListener('transcript-update', (e: any) => updateTranscript(e.detail));
    };
  }, []);

  const toggleListening = () => {
    const isActive = voiceAssistant.toggleListening();
    setIsListening(isActive);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4"
      >
        <div className="flex items-center gap-4">
          <button
            onClick={toggleListening}
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
              isListening
                ? 'bg-primary-600 dark:bg-primary-500 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            {isListening ? <Volume2 size={24} /> : <Mic size={24} />}
          </button>
          
          {transcript && (
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 max-w-xs">
              <p className="text-sm text-gray-600 dark:text-gray-300">{transcript}</p>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default VoiceRecognition