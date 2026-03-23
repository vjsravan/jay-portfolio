import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

const ScrollProgress: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] origin-left z-[60]"
      style={{
        scaleX,
        background: 'linear-gradient(90deg, #06b6d4, #8b5cf6, #10b981, #06b6d4)',
        backgroundSize: '200% 100%',
        animation: 'gradient-slide 3s linear infinite',
        boxShadow: '0 0 12px rgba(6,182,212,0.8)',
      }}
    />
  );
};

export default ScrollProgress;

