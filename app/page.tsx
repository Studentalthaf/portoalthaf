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
import { FaReact, FaHtml5, FaCss3Alt, FaInstagram, FaWhatsapp, FaEnvelope, FaGithub, FaLinkedin } from 'react-icons/fa';
import Dock from './components/Dock/Dock';
import { FaHome, FaUser, FaCode } from 'react-icons/fa';
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
                  text={`Halo semua! Jadi, cerita di balik portofolio ini sebenarnya berawal dari momen saya lagi gabut banget, haha. Di tengah kebosanan, saya pikir, "Daripada bengong, mending bikin sesuatu yang bisa ngegambarin apa yang saya suka dan bisa lakuin." Akhirnya, dengan semangat iseng tapi penuh harap, saya mulai merangkai portofolio ini dari nol. Saya coba tuangin ide-ide, keterampilan, dan sedikit kreativitas yang saya punya, meski jujur, prosesnya kadang bikin garuk-garuk kepala, hehe.

Tapi, kalau boleh jujur lagi, saya sadar portofolio ini mungkin masih jauh dari kata "wow" atau malah bisa dibilang agak jelek di beberapa bagian. Maklum, saya masih belajar dan kadang masih suka trial-error. Jadi, kalau ada kekurangan atau bagian yang kurang enak dilihat, mohon banget dimaafkan, ya! 😅 Saya bener-bener terbuka buat masukan, kritik, atau bahkan kalau ada yang berkenan ngajarin biar portofolio ini bisa lebih rapi dan kece, saya bakal super senang dan antusias belajar. Makasih banyak atas pengertiannya, dan semoga portofolio sederhana ini bisa sedikit menghibur atau menginspirasi!`}
                  className="text-lg sm:text-xl md:text-2xl font-medium text-justify leading-relaxed"
                />
              </div>
            </div>
          </div>
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
            {/* List of Skills */}
            <div className="w-full lg:w-2/3 flex flex-col gap-6">
              {/* Skill Items */}
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
              style={{ willChange: 'scroll-position' }}
            >
              {/* Project Cards */}
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

      {/* Contact Section */}
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
                <Lanyard 
                  position={[0, 0, 20]} 
                  gravity={[0, -40, 0]} 
                  onVisibilityChange={(isVisible) => {
                    // Optional: bisa ditambahkan efek tambahan saat lanyard terlihat/tidak
                    console.log('Lanyard visibility:', isVisible);
                  }}
                />
              </div>

              {/* Right Side: Social Media Links */}
              <div className="lg:col-span-6">
                <div className="text-center lg:text-left mb-12">
                  <h2 className="text-4xl sm:text-5xl font-bold mb-4">Let's Connect!</h2>
                  <p className="text-gray-700 text-lg">
                    Feel free to reach out through any of these platforms
                  </p>
                </div>

                {/* Social Media Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Instagram */}
                  <a 
                    href="https://www.instagram.com/violetitumerah_/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 p-0.5 transition-all hover:scale-105"
                  >
                    <div className="relative flex items-center gap-4 rounded-xl bg-white p-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 text-white">
                        <FaInstagram className="h-6 w-6" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-gray-600">Instagram</span>
                        <span className="text-lg font-semibold text-gray-900">@violetitumerah_</span>
                      </div>
                    </div>
                  </a>

                  {/* WhatsApp */}
                  <a 
                    href="https://wa.me/your_whatsapp_number" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-green-400 to-green-600 p-0.5 transition-all hover:scale-105"
                  >
                    <div className="relative flex items-center gap-4 rounded-xl bg-white p-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-green-400 to-green-600 text-white">
                        <FaWhatsapp className="h-6 w-6" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-gray-600">WhatsApp</span>
                        <span className="text-lg font-semibold text-gray-900">+62 xxx-xxxx-xxxx</span>
                      </div>
                    </div>
                  </a>

                  {/* Email */}
                  <a 
                    href="mailto:jauharalthaf@gmail.com" 
                    className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-400 to-blue-600 p-0.5 transition-all hover:scale-105"
                  >
                    <div className="relative flex items-center gap-4 rounded-xl bg-white p-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-blue-400 to-blue-600 text-white">
                        <FaEnvelope className="h-6 w-6" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-gray-600">Email</span>
                        <span className="text-lg font-semibold text-gray-900">jauharalthaf@gmail.com</span>
                      </div>
                    </div>
                  </a>

                  {/* GitHub */}
                  <a 
                    href="https://github.com/Studentalthaf" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-700 to-gray-900 p-0.5 transition-all hover:scale-105"
                  >
                    <div className="relative flex items-center gap-4 rounded-xl bg-white p-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-gray-700 to-gray-900 text-white">
                        <FaGithub className="h-6 w-6" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-gray-600">GitHub</span>
                        <span className="text-lg font-semibold text-gray-900">@Studentalthaf</span>
                      </div>
                    </div>
                  </a>
                </div>

                {/* Additional Info */}
                <div className="mt-8 text-center lg:text-left">
                  <p className="text-gray-600">
                    I'm always open to discussing new projects, creative ideas or opportunities to be part of your visions.
                  </p>
                </div>
              </div>
            </div>
          </AnimatedContent>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="relative z-10 bg-black text-white py-12 border-t border-white/10">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Brand Section */}
            <div className="flex flex-col items-center md:items-start">
              <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
                Moch Althaf Jauhar
              </h3>
              <p className="text-gray-400 text-sm text-center md:text-left">
                Ngopi dulu, coding kemudian. 
                Info ngopi? Kabari aja, gasss! ☕
                info mendaki kabari saja, asal jangan 
                info mountain date BAHAYA
              </p>
            </div>

            {/* Quick Links */}
            <div className="flex flex-col items-center md:items-start">
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-center md:text-left">
                <li>
                  <a href="#home" className="text-gray-400 hover:text-white transition-colors">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#about" className="text-gray-400 hover:text-white transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#projects" className="text-gray-400 hover:text-white transition-colors">
                    Projects
                  </a>
                </li>
                <li>
                  <a href="#contact" className="text-gray-400 hover:text-white transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            {/* Tech Stack */}
            <div className="flex flex-col items-center md:items-start">
              <h4 className="text-lg font-semibold mb-4">Built With</h4>
              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                <div className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                  <FaReact className="text-blue-400" />
                  <span>React</span>
                </div>
                <div className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                  <SiNextdotjs className="text-white" />
                  <span>Next.js</span>
                </div>
                <div className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                  <SiTypescript className="text-blue-500" />
                  <span>TypeScript</span>
                </div>
                <div className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                  <FaCss3Alt className="text-blue-400" />
                  <span>Tailwind</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-12 pt-8 border-t border-white/10">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-gray-400 text-sm text-center md:text-left">
                © {new Date().getFullYear()} Moch Althaf Jauhar. All rights reserved.
              </p>
              <div className="flex gap-4">
                <a 
                  href="https://www.instagram.com/violetitumerah_/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <FaInstagram className="w-5 h-5" />
                </a>
                <a 
                  href="https://github.com/Studentalthaf" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <FaGithub className="w-5 h-5" />
                </a>
                <a 
                  href="mailto:jauharalthaf@gmail.com"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <FaEnvelope className="w-5 h-5" />
                </a>
              </div>
            </div>
            <p className="text-center text-gray-500 text-sm mt-4">
              Made with ❤️ and lots of ☕
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}