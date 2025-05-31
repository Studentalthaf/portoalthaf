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

  return (
    <div className="relative min-h-screen overflow-hidden bg-black">
      <SplashCursor />
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 py-4">
        <div className="max-w-7xl mx-auto">
          <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl px-4 sm:px-6 py-3">
            <div className="flex items-center justify-between">
              {/* Logo/Brand */}
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-[#251BF0] to-[#03B3C3] rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">MA</span>
                </div>
                <span className="text-white font-semibold text-base sm:text-lg hidden xs:block">Althaf</span>
              </div>

              {/* Desktop Navigation Links */}
              <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
                <a href="#home" className="text-white/80 hover:text-white transition-colors duration-300 relative group">
                  Home
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#251BF0] to-[#03B3C3] group-hover:w-full transition-all duration-300"></span>
                </a>
                <a href="#about" className="text-white/80 hover:text-white transition-colors duration-300 relative group">
                  About
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#251BF0] to-[#03B3C3] group-hover:w-full transition-all duration-300"></span>
                </a>
                <a href="#projects" className="text-white/80 hover:text-white transition-colors duration-300 relative group">
                  Projects
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#251BF0] to-[#03B3C3] group-hover:w-full transition-all duration-300"></span>
                </a>
                <a href="#contact" className="text-white/80 hover:text-white transition-colors duration-300 relative group">
                  Contact
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#251BF0] to-[#03B3C3] group-hover:w-full transition-all duration-300"></span>
                </a>
              </div>

              {/* Desktop CTA Button */}
              <div className="hidden lg:block">
                <button className="bg-gradient-to-r from-[#251BF0] to-[#03B3C3] text-white px-4 xl:px-6 py-2 rounded-xl font-medium hover:shadow-lg hover:shadow-[#251BF0]/25 transition-all duration-300 hover:scale-105 text-sm xl:text-base">
                  Let's Talk
                </button>
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={toggleMobileMenu}
                className="md:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-colors duration-200"
                aria-label="Toggle mobile menu"
              >
                <svg
                  className={`w-6 h-6 transition-transform duration-300 ${isMobileMenuOpen ? "rotate-90" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  {isMobileMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>

            {/* Mobile Menu Dropdown */}
            <div
              className={`md:hidden transition-all duration-300 ease-in-out ${isMobileMenuOpen
                ? "max-h-80 opacity-100 mt-4 pb-4"
                : "max-h-0 opacity-0 overflow-hidden"
                }`}
            >
              <div className="border-t border-white/10 pt-4 space-y-3">
                <a
                  href="#home"
                  onClick={closeMobileMenu}
                  className="block text-white/80 hover:text-white transition-colors duration-300 py-2 px-4 rounded-lg hover:bg-white/5"
                >
                  Home
                </a>
                <a
                  href="#about"
                  onClick={closeMobileMenu}
                  className="block text-white/80 hover:text-white transition-colors duration-300 py-2 px-4 rounded-lg hover:bg-white/5"
                >
                  About
                </a>
                <a
                  href="#projects"
                  onClick={closeMobileMenu}
                  className="block text-white/80 hover:text-white transition-colors duration-300 py-2 px-4 rounded-lg hover:bg-white/5"
                >
                  Projects
                </a>
                <a
                  href="#contact"
                  onClick={closeMobileMenu}
                  className="block text-white/80 hover:text-white transition-colors duration-300 py-2 px-4 rounded-lg hover:bg-white/5"
                >
                  Contact
                </a>
                <div className="pt-2">
                  <button
                    onClick={closeMobileMenu}
                    className="w-full bg-gradient-to-r from-[#251BF0] to-[#03B3C3] text-white px-6 py-3 rounded-xl font-medium hover:shadow-lg hover:shadow-[#251BF0]/25 transition-all duration-300"
                  >
                    Let's Talk
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

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
      <section id="projects" className="relative z-10 pt-10 pb-2 lg:pb-0 bg-black container mx-auto min-h-screen">
        <div className="container mx-auto px-4 sm:px-6">

          {/* Flex container for layout */} 
          <div className="flex flex-col lg:flex-row items-center lg:items-start justify-center lg:justify-between gap-8">
            
            {/* Left side: PixelTransition */}
            <div className="w-full lg:w-1/2 flex flex-col items-center text-center lg:text-left">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6"> About <span className="line-through text-gray-400">You</span> Me</h2>

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
                      className="w-full h-full"
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

            {/* Right side: FallingText */}
            <div className="w-full lg:w-1/2 flex flex-col text-center lg:text-left">
              <div className="mt-6 mx-auto text-white" style={{ height: '400px', width: '100%' }}>
                <FallingText
                  text="Saya adalah mahasiswa semester akhir yang memiliki ketertarikan besar dalam pengembangan web modern. Fokus utama saya saat ini adalah memperdalam pemahaman dan praktik menggunakan Next.js sebagai framework frontend yang powerful serta Laravel sebagai backend framework yang fleksibel dan efisien. Ketertarikan ini muncul dari keinginan saya untuk membangun aplikasi web yang cepat, aman, dan memiliki pengalaman pengguna yang baik. Saya senang belajar hal-hal baru dan selalu berusaha mengikuti perkembangan teknologi terbaru di dunia pengembangan web."
                  highlightWords={[
                    "mahasiswa semester akhir",
                    "pengembangan web",
                    "Next.js",
                    "Laravel",
                    "frontend",
                    "backend",
                    "aplikasi web",
                    "cepat",
                    "aman",
                    "pengalaman pengguna",
                    "belajar",
                    "teknologi",
                    "modern",
                    "praktik",
                    "fleksibel",
                    "efisien"
                  ]}
                  trigger="click"
                  backgroundColor="transparent"
                  gravity={0.8}
                  fontSize="1.25rem"
                  wireframes={false}
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
            <button className="relative z-10 text-4xl sm:text-5xl font-bold text-white shiney-text appearance-none border-none bg-transparent p-0 cursor-pointer">
              Skills
            </button>
          </div>

          {/* Layout for Skill Icons (Left and Right) */}
          <div className="flex flex-col lg:flex-row justify-center items-start w-full gap-12 relative z-[2]">
            
            {/* Left Column for Icons */}
            <div className="w-full lg:w-1/3 flex flex-col items-center gap-6 relative">
              {/* Ikon Skill Kiri (menggunakan react-icons) */}
              {/* Anda bisa menambahkan elemen visual untuk garis di sini, misalnya dengan SVG atau Canvas */}
              <div className="flex items-center gap-3"><SiNextdotjs size={40} className="text-white" /><span className="text-white text-lg">Next.js</span></div>
              <div className="flex items-center gap-3"><FaReact size={40} className="text-white" /><span className="text-white text-lg">React</span></div>
             
              <div className="flex items-center gap-3"><SiOpenai size={40} className="text-white" /><span className="text-white text-lg">ChatGPT</span></div>
              {/* Tambahkan ikon skill lainnya di sini dari library react-icons */}
            </div>

            {/* Area untuk Garis Penghubung (SVG/Canvas) */}
            {/* Ini adalah area di tengah antara dua kolom ikon dan button Skills. */}
            {/* Anda bisa merender elemen SVG atau Canvas di sini untuk menggambar garis. */}
            <div className="hidden lg:flex w-1/3 justify-center items-center relative" style={{ minHeight: '300px' }}>
                 {/* Placeholder untuk kanvas atau SVG */}
                 {/* Contoh dasar SVG: <svg className="absolute inset-0 w-full h-full"></svg> */}
            </div>

            {/* Right Column for Icons */}
            <div className="w-full lg:w-1/3 flex flex-col items-center gap-6 relative">
              {/* Ikon Skill Kanan (menggunakan react-icons) */}
              {/* Anda bisa menambahkan elemen visual untuk garis di sini, misalnya dengan SVG atau Canvas */}
              <div className="flex items-center gap-3"><SiLaravel size={40} className="text-white" /><span className="text-white text-lg">Laravel</span></div>
              <div className="flex items-center gap-3"><SiPhp size={40} className="text-white" /><span className="text-white text-lg">PHP</span></div>
              
              <div className="flex items-center gap-3"><FaHtml5 size={40} className="text-white" /><span className="text-white text-lg">HTML5</span></div>
          
            </div>
          </div>



        </div>
      </section>

      {/* New Section - My Projects */}
      <section id="my-projects" className="relative z-10 py-16 bg-black">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center text-white mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold">My Projects</h2>
          </div>
          {/* Container utama untuk area scrollable dan indikator */}
          <div className="relative flex items-center">
            {/* Indikator/Tombol Kiri */}
            <button
              onClick={scrollLeft}
              className="absolute left-0 z-20 h-full w-12 flex items-center justify-center bg-gradient-to-r from-black to-transparent text-white opacity-70 hover:opacity-100 transition-opacity duration-300 cursor-pointer"
              aria-label="Scroll Left"
            >
              {/* Anda bisa menambahkan ikon atau teks di sini jika perlu */}
              
            </button>

            {/* Container card proyek yang dapat digulir - Tambahkan event listener untuk drag-to-scroll */}
            <div 
              ref={projectContainerRef} 
              className="flex flex-nowrap justify-start gap-10 overflow-x-auto pb-4 scrollbar-hide w-full cursor-grab"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseLeave}
            >
               {/* Contoh penggunaan AnimatedPinDemo */}
              <div className="flex-none w-80">
                <AnimatedPinDemo 
                  title="github.com/Studentalthaf"
                  href="https://github.com/Studentalthaf"
                />
              </div>
              {/* Tambahkan lebih banyak instance AnimatedPinDemo untuk setiap proyek */}
              <div className="flex-none w-80">
                <AnimatedPinDemo 
                   title="github.com/Studentalthaf"
                   href="https://github.com/Studentalthaf"
                 />
              </div>
              <div className="flex-none w-80">
                <AnimatedPinDemo 
                   title="github.com/Studentalthaf"
                   href="https://github.com/Studentalthaf"
                 />
              </div>
              <div className="flex-none w-80">
                <AnimatedPinDemo 
                   title="github.com/Studentalthaf"
                   href="https://github.com/Studentalthaf"
                 />
              </div>
              {/* Anda bisa menambahkan lebih banyak instance AnimatedPinDemo untuk setiap proyek */}
              {/* <AnimatedPinDemo /> */}
            </div>

            {/* Indikator/Tombol Kanan */}
             <button
              onClick={scrollRight}
              className="absolute right-0 z-20 h-full w-12 flex items-center justify-center bg-gradient-to-l from-black to-transparent text-white opacity-70 hover:opacity-100 transition-opacity duration-300 cursor-pointer"
              aria-label="Scroll Right"
            >
              {/* Anda bisa menambahkan ikon atau teks di sini jika perlu */}
            </button>
          </div>
        </div>
      </section>
      {/* Additional Content - Contact Section */}
      <section id="contact" className="relative z-10 py-16 bg-gray-900">
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
            <div className="text-center">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">Contact Me</h2>
              <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                Silakan hubungi saya melalui email atau media sosial untuk kolaborasi atau pertanyaan lebih lanjut.
                Saya siap untuk mendiskusikan ide-ide baru!
              </p>
              <div className="mt-6">
                <GradientText
                  colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
                  animationSpeed={3}
                  showBorder={false}
                  className="px-5 sm:px-7 py-2 sm:py-3 rounded-lg border text-sm sm:text-base"
                >
                  Email: althaf@example.com
                </GradientText>
              </div>
            </div>
          </AnimatedContent>
        </div>
      </section>


    </div>
  );
}