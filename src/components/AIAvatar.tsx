import React from 'react';
import { motion } from 'framer-motion';
import { Brain } from 'lucide-react';

interface AIAvatarProps {
  isSpeaking: boolean;
}

const AIAvatar: React.FC<AIAvatarProps> = ({ isSpeaking }) => {
  return (
    <div className="relative">
      {/* Outer Glow */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-primary-400 to-primary-600 rounded-full opacity-20 blur-lg"
        animate={{
          scale: isSpeaking ? [1, 1.2, 1] : 1,
          opacity: isSpeaking ? [0.2, 0.4, 0.2] : 0.2
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Main Circle */}
      <motion.div
        className="relative w-24 h-24 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full flex items-center justify-center"
        animate={{
          scale: isSpeaking ? [1, 1.05, 1] : 1
        }}
        transition={{
          duration: 0.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        {/* Ripple Effects */}
        {isSpeaking && (
          <>
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                className="absolute inset-0 rounded-full border-2 border-primary-400"
                initial={{ scale: 1, opacity: 0.5 }}
                animate={{ scale: 1.5, opacity: 0 }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.3,
                  ease: "easeOut"
                }}
              />
            ))}
          </>
        )}

        {/* Brain Icon */}
        <motion.div
          animate={{
            scale: isSpeaking ? [1, 1.1, 1] : 1,
            rotate: isSpeaking ? [0, 5, -5, 0] : 0
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <Brain size={36} className="text-white" />
        </motion.div>
      </motion.div>

      {/* Sound Wave Visualization */}
      {isSpeaking && (
        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 flex items-center gap-1">
          {[1, 2, 3, 4, 3, 2, 1].map((height, i) => (
            <motion.div
              key={i}
              className="w-1 bg-primary-500 rounded-full"
              initial={{ height: 4 }}
              animate={{ height: height * 8 }}
              transition={{
                duration: 0.4,
                repeat: Infinity,
                repeatType: "reverse",
                delay: i * 0.1,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default AIAvatar;