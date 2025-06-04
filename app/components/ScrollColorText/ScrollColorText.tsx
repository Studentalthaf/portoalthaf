import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ScrollColorTextProps {
  text: string;
  className?: string;
}

const ScrollColorText: React.FC<ScrollColorTextProps> = ({ text, className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [words, setWords] = useState<string[]>([]);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Transformasi dasar untuk scroll dengan fokus di tengah
  const progress = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1], // Range untuk efek yang lebih smooth
    [0, 1, 1, 0]     // Membuat efek puncak di tengah
  );

  useEffect(() => {
    // Memisahkan teks menjadi kata-kata
    setWords(text.split(/(\s+)/).filter(word => word.trim() !== ''));
  }, [text]);

  // Fungsi untuk menghitung style berdasarkan progress dan index
  const getWordStyle = useCallback((index: number) => {
    // Menambahkan delay berdasarkan index untuk efek per kata
    const delay = index * 0.05; // Delay yang lebih besar untuk efek per kata
    const startPoint = 0.3 + delay; // Memulai lebih awal
    const endPoint = 0.4 + delay;   // Mengakhiri lebih awal
    
    const wordProgress = useTransform(
      progress,
      [0, startPoint, endPoint, 1],
      [0, 0, 1, 1]
    );

    // Transformasi untuk opacity dan warna di tengah
    const centerProgress = useTransform(
      scrollYProgress,
      [0.45, 0.55], // Range untuk efek di tengah
      [0, 1]        // Range transformasi
    );

    // Menggabungkan progress untuk warna
    const combinedProgress = useTransform(
      [wordProgress, centerProgress],
      ([word, center]: number[]) => Math.max(word, center)
    );

    const color = useTransform(
      combinedProgress,
      [0, 0.5, 1],
      ['#666666', '#ffffff', '#ffffff']
    );

    const opacity = useTransform(
      centerProgress,
      [0, 1],
      [0.3, 1] // Opacity berdasarkan posisi di tengah
    );

    const scale = useTransform(
      wordProgress,
      [0, 1],
      [0.98, 1] // Sedikit efek scale untuk emphasis
    );

    return { color, opacity, scale };
  }, [progress, scrollYProgress]);

  // Buat komponen terpisah untuk setiap kata
  const Word = React.memo(({ word, index }: { word: string; index: number }) => {
    const style = getWordStyle(index);
    
    return (
      <motion.span
        style={{
          ...style,
          transition: 'all 0.3s ease-out', // Transisi lebih halus
          display: 'inline-block',
          marginRight: '0.25em', // Spasi antar kata
        }}
      >
        {word}
      </motion.span>
    );
  });

  Word.displayName = 'Word';

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <div className="flex flex-wrap justify-center">
        {words.map((word, index) => (
          <Word key={index} word={word} index={index} />
        ))}
      </div>
    </div>
  );
};

export default ScrollColorText; 