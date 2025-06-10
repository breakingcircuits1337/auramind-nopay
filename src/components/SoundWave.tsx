import React from 'react';
import { motion } from 'framer-motion';

const SoundWave: React.FC = () => {
  const waveVariants = {
    animate: {
      scale: [1, 1.1, 1],
      opacity: [0.6, 0.2, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {[1, 2, 3, 4].map((i) => (
        <motion.div
          key={i}
          className="absolute border-2 border-white/30 rounded-full"
          style={{ 
            width: `${100 + i * 20}%`, 
            height: `${100 + i * 20}%`,
          }}
          initial={{ scale: 0.8, opacity: 0 }}
          animate="animate"
          variants={waveVariants}
          transition={{ delay: i * 0.2 }}
        />
      ))}
    </div>
  );
};

export default SoundWave;