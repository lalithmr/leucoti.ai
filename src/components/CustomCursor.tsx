import { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'motion/react';

export default function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 250 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const moveMouse = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      
      if (!isVisible) setIsVisible(true);
    };

    const handleHoverStart = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'BUTTON' || 
        target.tagName === 'A' || 
        target.closest('button') || 
        target.closest('a') ||
        target.classList.contains('cursor-pointer')
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener('mousemove', moveMouse);
    window.addEventListener('mouseover', handleHoverStart);

    return () => {
      window.removeEventListener('mousemove', moveMouse);
      window.removeEventListener('mouseover', handleHoverStart);
    };
  }, [mouseX, mouseY, isVisible]);

  if (typeof window === 'undefined') return null;

  return (
    <>
      {/* Silicon Chip Outer Frame */}
      <motion.div
        className="fixed top-0 left-0 w-10 h-10 border border-brand-accent/30 pointer-events-none z-[9999] hidden md:block bg-brand-light/20 backdrop-blur-[4px]"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
          opacity: isVisible ? 1 : 0,
          borderRadius: '4px',
        }}
        animate={{
          scale: isHovered ? 1.4 : 1,
          rotate: isHovered ? 90 : 0,
          borderColor: isHovered ? 'rgba(37, 99, 235, 0.6)' : 'rgba(37, 99, 235, 0.3)',
        }}
        transition={{ type: 'spring', damping: 30, stiffness: 200, mass: 0.6 }}
      >
        {/* Connection Pins - Refined */}
        {[...Array(4)].map((_, side) => (
          <div 
            key={side}
            className={`absolute flex gap-1 ${
              side === 0 ? '-top-1 left-1.5 right-1.5' : 
              side === 1 ? '-bottom-1 left-1.5 right-1.5' :
              side === 2 ? '-left-1 top-1.5 bottom-1.5 flex-col' :
              '-right-1 top-1.5 bottom-1.5 flex-col'
            }`}
          >
            {[...Array(3)].map((_, i) => (
              <div key={i} className="w-1 h-1 bg-brand-accent/40 rounded-full" />
            ))}
          </div>
        ))}

        {/* Internal Circuitry Pattern */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
          <div className="w-full h-[0.5px] bg-brand-accent/10 absolute top-1/2 -translate-y-1/2" />
          <div className="h-full w-[0.5px] bg-brand-accent/10 absolute left-1/2 -translate-x-1/2" />
          <motion.div 
            animate={{ opacity: isHovered ? 0.8 : 0.2 }}
            className="w-2 h-2 border-[0.5px] border-brand-accent/40 rounded-sm" 
          />
        </div>

        {/* Small Corner Accents */}
        <div className="absolute top-0.5 left-0.5 w-1 h-1 border-t border-l border-brand-accent/40" />
        <div className="absolute bottom-0.5 right-0.5 w-1 h-1 border-b border-r border-brand-accent/40" />
      </motion.div>

      {/* Core Micro-Processor Dot */}
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-brand-accent pointer-events-none z-[9999] hidden md:block shadow-[0_0_10px_rgba(37,99,235,0.5)]"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
          opacity: isVisible ? 1 : 0,
          borderRadius: '1px',
        }}
        animate={{
          scale: isHovered ? 0.5 : 1,
        }}
        transition={{ type: 'spring', damping: 40, stiffness: 400 }}
      />
    </>
  );
}
