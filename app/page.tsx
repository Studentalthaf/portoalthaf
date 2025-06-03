"use client";

import { useState, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import RotatingText from "./components/RotatingText/RotatingText";
import SplitText from "./components/SplitText/SplitText";
import BlurText from "./components/BlurText/BlurText";
import Hyperspeed from "./components/Hyperspeed/Hyperspeed";
import AnimatedContent from "./components/AnimatedContent/AnimatedContent";
import GradientText from "./components/GradientText/GradientText";
import ScrollReveal from "./components/ScrollReveal/ScrollReveal";
import TiltedCard from "./components/TiltedCard/TiltedCard";
import TypingScrollText from "./components/TypingScrollText/TypingScrollText";
import VariableProximity from "./components/VariableProximity/VariableProximity";
import FallingText from "./components/FallingText/FallingText";
import { SiNextdotjs, SiTypescript, SiJavascript, SiLaravel, SiPhp, SiSass, SiDart, SiGraphql, SiOpenai } from 'react-icons/si';
import { FaReact, FaHtml5, FaCss3Alt } from 'react-icons/fa';
import Dock from './components/Dock/Dock';
import { FaHome, FaUser, FaCode, FaEnvelope } from 'react-icons/fa';
import ScrollColorText from "./components/ScrollColorText/ScrollColorText";
// Import komponen AnimatedPinDemo secara dinamis
const AnimatedPinDemo = dynamic(() => import('./components/ui/3d-pin').then(mod => mod.AnimatedPinDemo), { ssr: false });

const Lanyard = dynamic(() => import("./components/Lanyard/Lanyard"), { ssr: false });
const SplashCursor = dynamic(() => import("./components/SplashCursor/SplashCursor"), { ssr: false });
const Particles = dynamic(() => import("./components/Particles/Particles"), { ssr: false });
const ScrollVelocity = dynamic(() => import("./components/ScrollVelocity/ScrollVelocity"), { ssr: false });
const CircularText = dynamic(() => import("./components/CircularText/CircularText"), { ssr: false });
const PixelTransition = dynamic(() => import("./components/PixelTransition/PixelTransition"), { ssr: false });

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const projectContainerRef = useRef<HTMLDivElement>(null);
  const contactSectionRef = useRef<HTMLElement>(null); // Ref for Contact section

  // State untuk drag-to-scroll
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftBeforeDrag, setScrollLeftBeforeDrag] = useState(0);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Fungsi untuk menggulir ke kiri dengan tombol/tab
  const scrollLeft = () => {
    if (projectContainerRef.current) {
      projectContainerRef.current.scrollBy({ left: -360, behavior: 'smooth' }); // Gulir sejauh lebar card + gap, dengan animasi halus
    }
  };

  // Fungsi untuk menggulir ke kanan dengan tombol/tab
  const scrollRight = () => {
    if (projectContainerRef.current) {
      projectContainerRef.current.scrollBy({ left: 360, behavior: 'smooth' }); // Gulir sejauh lebar card + gap, dengan animasi halus
    }
  };

  // Event handler untuk memulai dragging
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!projectContainerRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - projectContainerRef.current.offsetLeft);
    setScrollLeftBeforeDrag(projectContainerRef.current.scrollLeft);
    // Menghentikan pemilihan teks saat dragging
    projectContainerRef.current.style.cursor = 'grabbing';
    projectContainerRef.current.style.userSelect = 'none';
  };

  // Event handler saat dragging
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !projectContainerRef.current) return;
    e.preventDefault(); // Mencegah default browser drag (misal: memilih teks)
    const x = e.pageX - projectContainerRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Faktor 2 untuk kecepatan scroll
    projectContainerRef.current.scrollLeft = scrollLeftBeforeDrag - walk;
  };

  // Event handler untuk mengakhiri dragging
  const handleMouseUp = () => {
    setIsDragging(false);
    if (!projectContainerRef.current) return;
    projectContainerRef.current.style.cursor = 'grab';
    projectContainerRef.current.style.userSelect = 'auto';
  };

  // Event handler saat mouse keluar dari area
  const handleMouseLeave = () => {
    setIsDragging(false);
    if (!projectContainerRef.current) return;
    projectContainerRef.current.style.cursor = 'grab';
    projectContainerRef.current.style.userSelect = 'auto';
  };

  const dockItems = [
    {
      label: 'Home',
      href: '#home',
      icon: <FaHome />
    },
    {
      label: 'About',
      href: '#about',
      icon: <FaUser />
    },
    {
      label: 'Projects',
      href: '#projects',
      icon: <FaCode />
    },
    {
      label: 'Contact',
      href: '#contact',
      icon: <FaEnvelope />
    }
  ];

  // State untuk mengontrol tampilan Dock (hitam/putih)
  const [isDockDark, setIsDockDark] = useState(false);

  // Observer untuk mendeteksi ketika Contact Section terlihat di viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Jika Contact Section sepenuhnya terlihat (atau sebagian besar, tergantung threshold)
        // set isDockDark menjadi true, jika tidak false.
        // Kita mungkin perlu menyesuaikan threshold agar sesuai dengan posisi Dock di bagian bawah.
        // Entry.isIntersecting mendeteksi apakah elemen masuk viewport sama sekali.
        // Entry.intersectionRatio adalah persentase elemen yang terlihat.
        if (entry.isIntersecting) {
            // Check if a significant portion of the contact section is visible
            // This assumes the dock is at the bottom, so when the contact section enters the bottom part of the viewport,
            // we want the dock to become dark.
            // A threshold of 0.5 means when 50% of the element is visible, trigger the callback.
            // We might need to refine this logic based on where the Dock is fixed.
            setIsDockDark(true);
        } else {
            setIsDockDark(false);
        }
      },
      {
        root: null, // Menggunakan viewport sebagai root
        rootMargin: '0px', // Tanpa margin tambahan
        threshold: 0.1, // Trigger ketika 10% dari elemen terlihat
      }
    );

    if (contactSectionRef.current) {
      observer.observe(contactSectionRef.current);
    }

    return () => {
      if (contactSectionRef.current) {
        observer.unobserve(contactSectionRef.current);
      }
    };
  }, [contactSectionRef]); // Dependency pada ref section kontak

  return (
    <div className="relative min-h-screen overflow-hidden bg-black">
      <SplashCursor />

      {/* Replace navbar with Dock */}
      <Dock
        panelHeight={98}
        baseItemSize={50}
        magnification={90}
        distance={20}
        items={dockItems}
        isDark={isDockDark} // Teruskan state isDark ke komponen Dock
         />

      {/* Content - Landing Page */}
      <div className="relative z-10 container mx-auto min-h-screen flex items-center text-white pt-24 sm:pt-20 px-4 sm:px-6">
        {/* Add Particles only in the top section */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <Particles
            particleColors={["#ffffff", "#ffffff"]}
            particleCount={500}
            particleSpread={10}
            speed={2}
            particleBaseSize={150}
            moveParticlesOnHover={true}
            alphaParticles={true}
            disableRotation={false}
          />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 w-full gap-8 lg:gap-0">
          <div className="lg:col-span-12 flex items-center justify-center relative">
            <div className="flex flex-col gap-4 w-full items-center text-center">
              <h1 className="text-7xl sm:text-8xl lg:text-9xl font-bold uppercase leading-tight tracking-wide">
                <span className="block">MOCH</span>
                <span className="block">ALTHAF</span>
                <span className="block">JAUHAR</span>
              </h1>

              {/* Card melayang di tengah teks */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[80%]">
                <TiltedCard
                  imageSrc="/assets/lanyard/al.png"
                  containerHeight="100px"
                  containerWidth="100px"
                  imageHeight="150px"
                  imageWidth="150px"
                  rotateAmplitude={12}
                  scaleOnHover={1.2}
                  showMobileWarning={false}
                  showTooltip={true}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Content - About Section */}
      <section id="about" className="relative z-10 py-8 bg-black">
        <div className="container mx-auto px-4 sm:px-6">
          <ScrollVelocity
            texts={['Althaf Jauhar', 'Gabut Doang']}
            velocity={100}
            className="custom-scroll-text text-white"
          />
        </div>
      </section>

      {/* Additional Content - Projects Section */}
      <section id="projects" className="relative z-10 pt-10 pb-1 lg:pb-0 bg-black container mx-auto min-h-screen">
        <div className="container mx-auto px-4 sm:px-6">

          {/* Flex container for layout */}
          <div className="flex flex-col items-center justify-center gap-8">
            {/* Photo Section */}
            <div className="w-full max-w-2xl flex flex-col items-center text-center">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">About <span className="line-through text-gray-400">You</span> Me</h2>

              {/* PixelTransition di depan */}
              <div className="flex items-center justify-center py-1 w-full">
                <PixelTransition
                  firstContent={
                    <Image
                      src="/assets/lanyard/althaf.jpg"
                      alt="Foto pribadi saya"
                      width={500}
                      height={500}
                      style={{ objectFit: "cover" }}
                      className="w-full h-full rounded-lg"
                    />
                  }
                  secondContent={
                    <div
                      style={{
                        width: "100%",
                        height: "100%",
                        display: "grid",
                        placeItems: "center",
                        backgroundColor: "#111",
                      }}
                      className="rounded-lg"
                    >
                      <p style={{ fontWeight: 100, fontSize: "2rem", color: "#ffffff" }}>it's Somewhere I Go When I Need To Remember Your Face!</p>
                    </div>
                  }
                  gridSize={12}
                  pixelColor="#ffffff"
                  animationStepDuration={0.4}
                  className="custom-pixel-card"
                />
              </div>
            </div>

            {/* Text Section - Now below the photo */}
            <div className="w-full">
              <div className="mt-8 mx-auto" style={{ minHeight: '200px' }}>
                <ScrollColorText
                  text="Saya memungkinkan pengembangan web modern untuk membuka kemungkinan dalam menciptakan pengalaman digital yang berdampak: cukup dengan @NextJS #Laravel, dan saya akan mewujudkan ide-ide Anda menjadi kenyataan. Sebagai mahasiswa semester akhir yang bersemangat dalam pengembangan web, saya fokus membangun aplikasi yang cepat, aman, dan ramah pengguna. Keahlian saya mencakup framework frontend seperti Next.js hingga solusi backend dengan Laravel, selalu mengikuti perkembangan teknologi web terbaru."
                  className="text-lg sm:text-xl md:text-2xl font-medium text-justify leading-relaxed"
                />
              </div>
            </div>
          </div> {/* End of flex container */}

        </div>
      </section>

      {/* New Section - My Skills */}
      <section id="skills" className="relative z-10 pt-16 pb-16 bg-black flex flex-col items-center justify-center overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 flex flex-col items-center">

          {/* Central Content Area */}
          <div className="relative mb-12 flex justify-center items-center">
            {/* Background/Container for Skills button */}
            <div className="absolute inset-0 backdrop-blur-sm bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center opacity-70" style={{ width: '180px', height: '80px', transform: 'translate(-50%, -50%)', left: '50%', top: '50%' }}>
              {/* Ini placeholder background untuk button Skills */}
            </div>
            <h2 className="relative z-10 text-4xl sm:text-5xl font-bold text-white shiney-text appearance-none border-none bg-transparent p-0 cursor-pointer">
              Skills
            </h2>
          </div>

          {/* Layout for Skill Items */}
          <div className="flex flex-col items-center w-full gap-8 relative z-[2]">
            {/* List of Skills (placeholder) */}
            {/* This will be replaced with a more dynamic list and components */}
            <div className="w-full lg:w-2/3 flex flex-col gap-6">

              {/* Contoh Skill Item dengan Persentase */}
              <div className="flex items-center justify-between w-full p-4 bg-white/5 border border-white/10 rounded-lg">
                <div className="flex items-center gap-4">
                  <SiNextdotjs size={30} className="text-white" />
                  <span className="text-white text-lg font-semibold">Next.js</span>
                </div>
                <div className="text-white text-lg font-bold">30%</div>
              </div>

               <div className="flex items-center justify-between w-full p-4 bg-white/5 border border-white/10 rounded-lg">
                <div className="flex items-center gap-4">
                  <FaReact size={30} className="text-white" />
                  <span className="text-white text-lg font-semibold">React</span>
                </div>
                <div className="text-white text-lg font-bold">35%</div>
              </div>

               {/* New Skill: ChatGPT */}
               <div className="flex items-center justify-between w-full p-4 bg-white/5 border border-white/10 rounded-lg">
                <div className="flex items-center gap-4">
                  <SiOpenai size={30} className="text-white" />
                  <span className="text-white text-lg font-semibold">ChatGPT</span>
                </div>
                <div className="text-white text-lg font-bold">100% hehehe</div>
              </div>

               <div className="flex items-center justify-between w-full p-4 bg-white/5 border border-white/10 rounded-lg">
                <div className="flex items-center gap-4">
                  <SiLaravel size={30} className="text-white" />
                  <span className="text-white text-lg font-semibold">Laravel</span>
                </div>
                <div className="text-white text-lg font-bold">80%</div>
              </div>

               <div className="flex items-center justify-between w-full p-4 bg-white/5 border border-white/10 rounded-lg">
                <div className="flex items-center gap-4">
                  <SiPhp size={30} className="text-white" />
                  <span className="text-white text-lg font-semibold">PHP</span>
                </div>
                <div className="text-white text-lg font-bold">75%</div>
              </div>

              {/* Tambahkan skill lain di sini sesuai kebutuhan */}

            </div>
          </div>

        </div>
      </section>

      {/* New Section - My Projects */}
      <section id="my-projects" className="bg-black">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center text-white mb-4">
            <h2 className="text-3xl sm:text-4xl font-bold">My Projects</h2>
          </div>
          {/* Container utama untuk area scrollable dan indikator */}
          <div className="relative flex items-center px-2 sm:px-4">
            {/* Indikator/Tombol Kiri */}
            <button
              onClick={scrollLeft}
              className="absolute left-0 z-20 h-full w-12 flex items-center justify-center bg-gradient-to-r from-black to-transparent text-white opacity-70 hover:opacity-100 transition-opacity duration-300 cursor-pointer"
              aria-label="Scroll Left"
            >
            </button>

            {/* Container card proyek yang dapat digulir */}
            <div
              ref={projectContainerRef}
              className="flex flex-nowrap justify-start gap-16 overflow-x-auto pb-8 scrollbar-hide w-full cursor-grab px-1 transition-transform duration-300 ease-out"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseLeave}
              style={{ willChange: 'scroll-position' }} // Hint browser untuk optimasi scroll
            >
              {/* Contoh penggunaan AnimatedPinDemo dengan gambar */}
              <div className="flex-none w-80">
                <AnimatedPinDemo
                  title="Project 1"
                  href="https://github.com/Studentalthaf"
                  imageSrc="https://picsum.photos/seed/project1/600/400"
                />
              </div>
              <div className="flex-none w-80">
                <AnimatedPinDemo
                  title="Project 2"
                  href="https://github.com/Studentalthaf"
                  imageSrc="https://picsum.photos/seed/project2/600/400"
                />
              </div>
              <div className="flex-none w-80">
                <AnimatedPinDemo
                  title="Project 3"
                  href="https://github.com/Studentalthaf"
                  imageSrc="https://picsum.photos/seed/project3/600/400"
                />
              </div>
              <div className="flex-none w-80">
                <AnimatedPinDemo
                  title="Project 4"
                  href="https://github.com/Studentalthaf"
                  imageSrc="https://picsum.photos/seed/project4/600/400"
                />
              </div>
            </div>

            {/* Indikator/Tombol Kanan */}
            <button
              onClick={scrollRight}
              className="absolute right-0 z-20 h-full w-12 flex items-center justify-center bg-gradient-to-l from-black to-transparent text-white opacity-70 hover:opacity-100 transition-opacity duration-300 cursor-pointer"
              aria-label="Scroll Right"
            >
            </button>
          </div>
        </div>
      </section>
      {/* Additional Content - Contact Section */}
      <section id="contact" ref={contactSectionRef} className="relative z-10 py-16 bg-gray-100 text-black">
        <div className="container mx-auto px-4 sm:px-6">
          <AnimatedContent
            distance={150}
            direction="vertical"
            reverse={false}
            config={{ tension: 80, friction: 20 }}
            initialOpacity={0.2}
            animateOpacity
            scale={1.1}
            threshold={0.2}
          >
            {/* Grid Container */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
              {/* Left Side: Lanyard */}
              <div className="lg:col-span-6 flex justify-center items-center">
                {/* Placeholder for Lanyard component */}
                {/* Replace with actual Lanyard component when ready */}
                <Lanyard position={[0, 0, 20]} gravity={[0, -40, 0]} />
              </div>

              {/* Right Side: Contact Form */}
              <div className="lg:col-span-6">
                <div className="text-center lg:text-left mb-8">
                  <h2 className="text-3xl sm:text-4xl font-bold">Contact Me</h2>
                  <p className="text-gray-700 text-lg mt-4">
                   Form ini masih ga guna cuman tampilan doang so sorry 
                  </p>
                </div>
                <form className="flex flex-col gap-4">
                  {/* Field untuk nama/email pengirim */}
                  <input
                    type="text" // Atau type="email" jika diinginkan
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100 text-black"
                    placeholder="Nama atau Email Anda..."
                  />
                  {/* Textarea for message */}
                  <textarea
                    rows={6}
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100 text-black"
                    placeholder="Pesan Anda..."
                  ></textarea>
                  {/* Submit button */}
                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-md hover:bg-blue-700 transition-colors duration-300"
                  >
                    Kirim Pesan
                  </button>
                </form>
              </div>
            </div>
          </AnimatedContent>
        </div>
      </section>


    </div>
  );
}