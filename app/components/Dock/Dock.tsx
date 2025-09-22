"use client";

import { motion, MotionValue, useMotionValue, useSpring, useTransform, type SpringOptions, AnimatePresence } from "framer-motion";
import React, { Children, cloneElement, useEffect, useMemo, useRef, useState } from "react";
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// Definisi tipe untuk item dock
export type DockItemData = {
  icon: React.ReactNode;
  label: string;
  href: string;
  className?: string;
};

// Definisi tipe untuk props komponen Dock utama
export type DockProps = {
  items: DockItemData[];
  className?: string;
  panelHeight?: number; // Tinggi panel saat item membesar
  baseItemSize?: number; // Ukuran dasar item saat tidak aktif
  magnification?: number; // Ukuran maksimum saat aktif/di-hover
  spring?: SpringOptions; // Konfigurasi animasi spring
  distance?: number; // Menambahkan kembali distance untuk mengontrol area pengaruh mouse
  isDark?: boolean; // Tambahkan prop untuk mode gelap/terang
};

// Komponen untuk setiap item dock (mengelola ukuran berdasarkan mouse/active position)
type DockItemProps = {
  className?: string;
  children: React.ReactNode; // Biasanya ikon
  label: string; // Label untuk tooltip
  href: string; // Link item
  mouseX: MotionValue<number>; // Menggunakan MotionValue<number> untuk tipe mouseX
  mouseY: MotionValue<number>; // Tambahkan prop mouseY
  spring: SpringOptions;
  distance: number; // Jarak pengaruh mouse/active item
  baseItemSize: number; // Ukuran dasar dari props Dock
  magnification: number; // Ukuran maksimum dari props Dock
  isDark: boolean; // Teruskan prop isDark ke DockItem
};

// Wrap Link dengan motion
const MotionLink = motion(Link) as any;

function DockItem({
  children,
  className = "",
  label,
  href,
  mouseX,
  mouseY,
  spring,
  distance,
  magnification,
  baseItemSize,
  isDark,
}: DockItemProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [isVisibleLabel, setIsVisibleLabel] = useState(false);
  const pathname = usePathname();
  const isActive = pathname === href;

  const itemX = useMotionValue(0);

  // Hitung posisi X pusat item dan perbarui itemX saat mount dan saat ukuran berubah
  useEffect(() => {
    const updatePosition = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        itemX.set(rect.left + rect.width / 2); // Menggunakan rect.left (posisi absolut) + setengah lebar
      }
    };

    updatePosition();
    // Observer untuk memantau perubahan ukuran atau layout yang bisa mempengaruhi posisi
    const observer = new ResizeObserver(updatePosition);
    if (ref.current) {
      observer.observe(ref.current);
    }

    // Tambahkan observer pada container Dock utama jika memungkinkan
    // Ini memerlukan ref container Dock diakses di sini, yang sedikit kompleks.
    // Untuk saat ini, mengamati item itu sendiri dan resize window sudah cukup baik.
    window.addEventListener('resize', updatePosition);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', updatePosition);
    };
  }, [itemX, ref]); // Dependensi ref dan itemX

  // Hitung jarak mouse dari pusat item ini (menggunakan posisi absolut mouseX)
  // Modifikasi ini untuk mempertimbangkan jarak vertikal juga
  const mouseDistance = useTransform(
    [mouseX, mouseY],
    (latest: number[]) => {
      if (!ref.current) return distance; // Jika ref belum siap, anggap jarak jauh

      const rect = ref.current.getBoundingClientRect();
      const itemCenterX = rect.left + rect.width / 2;
      const itemCenterY = rect.top + rect.height / 2;

      const deltaX = latest[0] - itemCenterX;
      const deltaY = latest[1] - itemCenterY;

      // Gunakan jarak Euclidean
      return Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    }
  );

  // Hitung ukuran target berdasarkan jarak
  const targetSize = useTransform(
    mouseDistance,
    [0, distance], // Jarak dari pusat sampai batas pengaruh
    [magnification, baseItemSize], // Ukuran dari maksimum sampai dasar
    { clamp: true } // Pastikan ukuran tidak melebihi baseItemSize atau magnification
  );

  // Gunakan useSpring untuk animasi ukuran
  const size = useSpring(targetSize, spring);

  // Tampilkan label saat jarak mouse sangat dekat atau item aktif
  useEffect(() => {
    const unsubscribe = mouseDistance.on("change", (latest) => {
      // Tampilkan label jika jarak sangat dekat atau item aktif
       setIsVisibleLabel(latest < baseItemSize * 1.5 || isActive); // Increased threshold for label visibility
    });

    // Initial check
    setIsVisibleLabel(mouseDistance.get() < baseItemSize * 1.5 || isActive);

    return () => unsubscribe();
  }, [mouseDistance, baseItemSize, isActive]);

  return (
    <MotionLink
      href={href}
      ref={ref}
      style={{ width: size, height: size }}
      className={cn(
        "relative inline-flex items-center justify-center rounded-xl",
        isDark ? "bg-gray-800/[0.8] border-gray-700/[0.8]" : "bg-white/[0.1] border-white/[0.2]",
        "shadow-md",
        "transition-colors duration-100 ease-out",
        className,
        isActive && (isDark ? "border-white/40 bg-white/[0.2]" : "border-white/40 bg-white/[0.2]"),
      )}
    >
      {/* Ikon - Pastikan ikon berukuran sesuai dengan ukuran item */}
      {/* Ukuran ikon akan diskalakan secara otomatis oleh ukuran parent (MotionLink) */}
      {/* Mengubah warna ikon berdasarkan isDark */}
      <div className={cn("flex items-center justify-center text-xl", isDark ? "text-white" : "text-white")} style={{ width: '100%', height: '100%' }}>{children}</div>

      {/* Label muncul di atas ikon */}
      <AnimatePresence>
        {isVisibleLabel && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: -10 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.1 }}
            className={cn("absolute bottom-full mb-2 transform -translate-x-[50%] w-max whitespace-pre rounded-md bg-zinc-900/80 px-2 py-1 text-xs text-white shadow-sm text-center", isDark ? "bg-zinc-700/80" : "bg-zinc-900/80")}
          >
            {label}
          </motion.div>
        )}
      </AnimatePresence>
    </MotionLink>
  );
}

// Komponen Dock utama
const Dock: React.FC<DockProps> = ({
  items,
  className = "",
  spring = { mass: 0.1, stiffness: 150, damping: 12 },
  magnification = 70,
  baseItemSize = 50,
  panelHeight = 68,
  distance = 150,
  isDark = false,
}) => {
  // mouseX akan melacak posisi X mouse secara global di halaman
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  // Update mouseX saat mouse bergerak di manapun di halaman
  // Menggunakan event listener di window agar lebih reliable
  useEffect(() => {
    const handleGlobalMouseMove = (event: MouseEvent) => {
      mouseX.set(event.clientX); // Menggunakan clientX (posisi mouse global)
      mouseY.set(event.clientY); // Menggunakan clientY (posisi mouse global)
    };

    window.addEventListener('mousemove', handleGlobalMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleGlobalMouseMove);
    };
  }, [mouseX, mouseY]);

  // Set mouseX ke posisi aktif item saat tidak ada hover
  // Ini memastikan satu item tetap diperbesar/aktif saat mouse tidak di atas dock
  useEffect(() => {
     if (containerRef.current) {
       const activeItemIndex = items.findIndex(item => item.href === pathname);
       if(activeItemIndex !== -1) {
          const activeItemElement = containerRef.current.children[activeItemIndex];
           if(activeItemElement instanceof HTMLElement) {
              const rect = activeItemElement.getBoundingClientRect();
              // Set mouseX ke pusat elemen aktif (posisi absolut)
              mouseX.set(rect.left + rect.width / 2);
              mouseY.set(rect.top + rect.height / 2);
           }
       } else {
         // Jika tidak ada item aktif, set mouseX ke nilai di luar layar untuk efek dasar
          // mouseX.set(-1000); // Contoh nilai di luar layar
          // Biarkan mouseX apa adanya jika tidak ada item aktif dan mouse tidak hover
       }
    }
     // Tidak perlu trigger effect saat mouseX berubah, hanya saat pathname/items berubah
  }, [pathname, items]); // Hapus mouseX dari dependencies agar tidak loop

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null; // atau render versi statis/placeholder
  }

  return (
    <motion.div
      ref={containerRef}
      className={cn(
        "fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50",
        isDark ? "backdrop-blur-md bg-gray-800/80 border-gray-700/80" : "backdrop-blur-md bg-white/10 border-white/20",
        "rounded-full px-7 py-4",
        "flex items-end justify-center gap-4", // Jarak antar item
        "transition-all duration-300 ease-out",
        className
      )}
    >
      {items.map((item, index) => (
        <DockItem
          key={item.href}
          label={item.label}
          href={item.href}
          className={item.className}
          mouseX={mouseX}
          mouseY={mouseY}
          spring={spring}
          distance={distance}
          baseItemSize={baseItemSize}
          magnification={magnification}
          isDark={isDark}
        >
          {item.icon}
        </DockItem>
      ))}
    </motion.div>
  );
};

export default Dock;
