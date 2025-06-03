import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ScrollColorTextProps {
  text: string;
  className?: string;
}

const ScrollColorText: React.FC<ScrollColorTextProps> = ({ text, className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [letters, setLetters] = useState<string[]>([]);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Transformasi dasar untuk scroll dengan fokus di tengah
  const progress = useTransform(
    scrollYProgress,
    [0, 0.4, 0.6, 1], // Mengatur range untuk efek di tengah
    [0, 1, 1, 0]     // Membuat efek puncak di tengah
  );

  useEffect(() => {
    setLetters(text.split(''));
  }, [text]);

  // Fungsi untuk menghitung style berdasarkan progress dan index
  const getLetterStyle = useCallback((index: number) => {
    // Menyesuaikan timing untuk setiap huruf agar semua berubah di tengah
    const startPoint = 0.35 + (index * 0.001); // Memulai lebih dekat ke tengah
    const endPoint = 0.45 + (index * 0.001);   // Mengakhiri lebih dekat ke tengah
    
    const letterProgress = useTransform(
      progress,
      [0, startPoint, endPoint, 1],
      [0, 0, 1, 1]
    );

    const color = useTransform(
      letterProgress,
      [0, 1],
      ['#222222', '#ffffff'] // Warna awal lebih gelap untuk kontras lebih baik
    );

    const opacity = useTransform(
      letterProgress,
      [0, 1],
      [0.1, 1]
    );

    return { color, opacity };
  }, [progress]);

  // Buat komponen terpisah untuk setiap huruf
  const Letter = React.memo(({ letter, index }: { letter: string; index: number }) => {
    const style = getLetterStyle(index);
    
    return (
      <motion.span
        style={{
          ...style,
          transition: 'all 0.3s ease-out',
        }}
        className="inline-block"
      >
        {letter === ' ' ? '\u00A0' : letter}
      </motion.span>
    );
  });

  Letter.displayName = 'Letter';

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <div className="flex flex-wrap justify-center">
        {letters.map((letter, index) => (
          <Letter key={index} letter={letter} index={index} />
        ))}
      </div>
    </div>
  );
};

export default ScrollColorText; 