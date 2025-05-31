import { useEffect, useRef, useState } from 'react';

interface TypingScrollTextProps {
  text: string;
  className?: string;
  scrollThreshold?: number;
}

const TypingScrollText = ({
  text,
  className = '',
  scrollThreshold = 0.3,
}: TypingScrollTextProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const textRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            if (observerRef.current) {
              observerRef.current.disconnect();
            }
          }
        });
      },
      {
        threshold: scrollThreshold,
      }
    );

    if (textRef.current) {
      observerRef.current = observer;
      observer.observe(textRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [scrollThreshold]);

  return (
    <div
      ref={textRef}
      className={`transition-opacity duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'} ${className}`}
    >
      {text}
    </div>
  );
};

export default TypingScrollText; 