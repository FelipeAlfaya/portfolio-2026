'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import './true-focus.css';

interface TrueFocusProps {
  sentence?: string;
  separator?: string;
  manualMode?: boolean;
  blurAmount?: number;
  borderColor?: string;
  glowColor?: string;
  animationDuration?: number;
  pauseBetweenAnimations?: number;
  className?: string;
}

const TrueFocus = ({
  sentence = 'True Focus',
  separator = ' ',
  manualMode = false,
  blurAmount = 5,
  borderColor = '#5227FF',
  glowColor = 'rgba(82, 39, 255, 0.6)',
  animationDuration = 0.5,
  pauseBetweenAnimations = 1,
  className = ''
}: TrueFocusProps) => {
  const words = sentence.split(separator);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lastActiveIndex, setLastActiveIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [focusRect, setFocusRect] = useState({ x: 0, y: 0, width: 0, height: 0 });

  useEffect(() => {
    if (manualMode) return;

    let timeoutId: NodeJS.Timeout;

    const runAnimation = () => {
      const isFullFocus = currentIndex === words.length;
      const delay = isFullFocus 
        ? (animationDuration + pauseBetweenAnimations * 3) * 1000 
        : (animationDuration + pauseBetweenAnimations) * 1000;

      timeoutId = setTimeout(() => {
        setCurrentIndex(prev => (prev + 1) % (words.length + 1));
      }, delay);
    };

    runAnimation();
    return () => clearTimeout(timeoutId);
  }, [manualMode, animationDuration, pauseBetweenAnimations, words.length, currentIndex]);

  useEffect(() => {
    if (currentIndex === null || currentIndex === -1 || !containerRef.current) return;

    const parentRect = containerRef.current.getBoundingClientRect();

    if (currentIndex === words.length) {
      // Full Focus: cover everything
      let minLeft = Infinity;
      let minTop = Infinity;
      let maxRight = -Infinity;
      let maxBottom = -Infinity;

      wordRefs.current.forEach(el => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        minLeft = Math.min(minLeft, rect.left);
        minTop = Math.min(minTop, rect.top);
        maxRight = Math.max(maxRight, rect.right);
        maxBottom = Math.max(maxBottom, rect.bottom);
      });

      if (minLeft !== Infinity) {
        setFocusRect({
          x: minLeft - parentRect.left,
          y: minTop - parentRect.top,
          width: maxRight - minLeft,
          height: maxBottom - minTop
        });
      }
    } else {
      const currentWordElement = wordRefs.current[currentIndex];
      if (!currentWordElement) return;

      const activeRect = currentWordElement.getBoundingClientRect();
      setFocusRect({
        x: activeRect.left - parentRect.left,
        y: activeRect.top - parentRect.top,
        width: activeRect.width,
        height: activeRect.height
      });
    }
  }, [currentIndex, words.length]);

  const handleMouseEnter = (index: number) => {
    if (manualMode) {
      setLastActiveIndex(index);
      setCurrentIndex(index);
    }
  };

  const handleMouseLeave = () => {
    if (manualMode) {
      if (lastActiveIndex !== null) {
        setCurrentIndex(lastActiveIndex);
      }
    }
  };

  return (
    <div className={`focus-container ${className}`} ref={containerRef}>
      {words.map((word, index) => {
        const isActive = index === currentIndex || currentIndex === words.length;
        return (
          <span
            key={index}
            ref={el => { wordRefs.current[index] = el; }}
            className={`focus-word ${manualMode ? 'manual' : ''} ${isActive && !manualMode ? 'active' : ''}`}
            style={{
              filter: isActive ? 'blur(0px)' : `blur(${blurAmount}px)`,
              // @ts-ignore
              '--border-color': borderColor,
              '--glow-color': glowColor,
              transition: `filter ${animationDuration}s ease`
            }}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
          >
            {word}
          </span>
        );
      })}

      <motion.div
        className="focus-frame"
        animate={{
          x: focusRect.x,
          y: focusRect.y,
          width: focusRect.width,
          height: focusRect.height,
          opacity: currentIndex >= 0 ? 1 : 0
        }}
        transition={{
          duration: animationDuration
        }}
        style={{
          // @ts-ignore
          '--border-color': borderColor,
          '--glow-color': glowColor
        }}
      >
        <span className="corner top-left"></span>
        <span className="corner top-right"></span>
        <span className="corner bottom-left"></span>
        <span className="corner bottom-right"></span>
      </motion.div>
    </div>
  );
};

export default TrueFocus;
