"use client";

import { useState, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";

import TiltedCard from "./components/TiltedCard/TiltedCard";
import TextType from "./components/TextType/TextType";
import { SiNextdotjs, SiTypescript, SiJavascript, SiLaravel, SiPhp, SiPython, SiGooglecolab, SiFigma } from 'react-icons/si';
import { FaReact, FaHtml5, FaCss3Alt, FaInstagram, FaWhatsapp, FaEnvelope, FaGithub, FaMicrosoft, FaHome, FaUser, FaCode } from 'react-icons/fa';
import Dock from './components/Dock/Dock';
import ScrollColorText from "./components/ScrollColorText/ScrollColorText";
import SectionReveal from "./components/SectionReveal/SectionReveal";
// Import komponen AnimatedPinDemo secara dinamis
const AnimatedPinDemo = dynamic(() => import('./components/ui/3d-pin').then(mod => mod.AnimatedPinDemo), { ssr: false });

const Lanyard = dynamic(() => import("./components/Lanyard/Lanyard"), { ssr: false });

const ScrollVelocity = dynamic(() => import("./components/ScrollVelocity/ScrollVelocity"), { ssr: false });

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
      href: '#my-projects',
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

        if (entry.isIntersecting) {

          setIsDockDark(true);
        } else {
          setIsDockDark(false);
        }
      },
      {
        root: null,
        rootMargin: '10px',
        threshold: 0.1,
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
        <div className="grid grid-cols-1 lg:grid-cols-12 w-full gap-8 lg:gap-0">
          <div className="lg:col-span-12 flex items-center justify-center relative">
            <div className="flex flex-col gap-4 w-full items-center text-center">
              <h1 className="text-7xl sm:text-8xl lg:text-9xl font-bold uppercase leading-tight tracking-wide">
                <span className="block">MOCH</span>
                <span className="block">ALT ....HAF</span>
                <span className="block">JAUHAR</span>
              </h1>

              {/* Card melayang di tengah teks */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[80%]">
                <TiltedCard
                  imageSrc="/assets/lanyard/al.webp"
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
      <SectionReveal as="section" id="about" className="relative z-10 py-8 bg-black">
        <div className="container mx-auto px-4 sm:px-6">
          <ScrollVelocity
            texts={['MOCH ALTHAF JAUHAR', 'SISTEM INFORMASI']}
            velocity={100}
            className="custom-scroll-text text-white"
          />
        </div>
      </SectionReveal>

      {/* Additional Content - Projects Section */}
      <SectionReveal as="section" id="projects" className="relative z-10 pt-10 pb-1 lg:pb-0 bg-black container mx-auto min-h-screen" amount={0.15}>
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
                      src="/assets/lanyard/alll.webp"
                      alt="Foto pribadi saya"
                      width={500}
                      height={500}
                      style={{ objectFit: "cover" }}
                      className="w-full h-full rounded-lg"
                      loading="lazy"
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
                      <p style={{ fontWeight: 100, fontSize: "2rem", color: "#ffffff" }}>MOCH ALTHAF JAUHAR</p>
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
              <TextType
                className="text-white text-lg sm:text-xl md:text-2xl font-medium text-justify leading-relaxed mt-8 mx-auto"
                text={[
                  "Saya Moch Althaf Jauhar, lulusan Sistem Informasi yang memiliki minat besar di bidang pengembangan web dan teknologi digital. Berpengalaman dalam membangun aplikasi web modern dengan pendekatan kreatif, kolaboratif, dan berorientasi pada solusi. Saya memiliki pengalaman menggunakan framework Laravel dan sangat suka mencoba hal-hal baru di dunia teknologi. Saya selalu antusias untuk belajar hal baru dan siap berkontribusi dalam tim maupun proyek individu."
                ]}
                typingSpeed={30}
                pauseDuration={2000}
                showCursor={true}
                cursorCharacter="|"
                variableSpeed={false}   // tambahkan ini
                onSentenceComplete={() => { }} // tambahkan ini (callback opsional)
              />

            </div>
          </div>
        </div>
      </SectionReveal>
      {/* Section: Education & License */}
      <SectionReveal as="section" id="education-license" className="relative z-10 py-12 bg-black" amount={0.2}>
        <div className="container mx-auto px-4 sm:px-6 flex flex-col md:flex-row gap-12">
          {/* Kiri: Education Timeline */}
          <div className="md:w-1/2 w-full">
            <div className="relative px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-600 bg-clip-text text-transparent">
                  Education Journey
                </h2>
              </div>

              <div className="relative max-w-3xl mx-auto">
                {/* Timeline Line */}
                <div className="absolute left-4 h-full w-1 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 glow"></div>

                {/* SD */}
                <div className="group relative mb-12">
                  <div className="flex items-center">
                    <div className="absolute left-0 flex items-center justify-center">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full border-4 border-black flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <span className="text-white text-sm font-bold">1</span>
                      </div>
                    </div>
                    <div className="flex-1 ml-16">
                      <div className="relative p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 shadow-xl transition-all duration-300 hover:shadow-2xl hover:bg-white/10">
                        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div className="relative">
                          <span className="inline-block px-3 py-1 text-sm font-semibold bg-blue-500/20 text-blue-400 rounded-full mb-2">2009 - 2015</span>
                          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">SDN Penambangan</h3>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* SMP */}
                <div className="group relative mb-12">
                  <div className="flex items-center">
                    <div className="absolute left-0 flex items-center justify-center">
                      <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full border-4 border-black flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <span className="text-white text-sm font-bold">2</span>
                      </div>
                    </div>
                    <div className="flex-1 ml-16">
                      <div className="relative p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 shadow-xl transition-all duration-300 hover:shadow-2xl hover:bg-white/10">
                        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div className="relative">
                          <span className="inline-block px-3 py-1 text-sm font-semibold bg-purple-500/20 text-purple-400 rounded-full mb-2">2015 - 2018</span>
                          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">SMPN 1 Balongbendo</h3>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* SMA */}
                <div className="group relative mb-12">
                  <div className="flex items-center">
                    <div className="absolute left-0 flex items-center justify-center">
                      <div className="w-8 h-8 bg-gradient-to-br from-pink-500 to-red-600 rounded-full border-4 border-black flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <span className="text-white text-sm font-bold">3</span>
                      </div>
                    </div>
                    <div className="flex-1 ml-16">
                      <div className="relative p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 shadow-xl transition-all duration-300 hover:shadow-2xl hover:bg-white/10">
                        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-pink-500/10 to-red-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div className="relative">
                          <span className="inline-block px-3 py-1 text-sm font-semibold bg-pink-500/20 text-pink-400 rounded-full mb-2">2018 - 2021</span>
                          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-pink-400 transition-colors">SMA UBP Amanatul Ummah</h3>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Kuliah */}
                <div className="group relative">
                  <div className="flex items-center">
                    <div className="absolute left-0 flex items-center justify-center">
                      <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-orange-600 rounded-full border-4 border-black flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <span className="text-white text-sm font-bold">4</span>
                      </div>
                    </div>
                    <div className="flex-1 ml-16">
                      <div className="relative p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 shadow-xl transition-all duration-300 hover:shadow-2xl hover:bg-white/10">
                        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-red-500/10 to-orange-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div className="relative">
                          <span className="inline-block px-3 py-1 text-sm font-semibold bg-red-500/20 text-red-400 rounded-full mb-2">2021 - 2025</span>
                          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-red-400 transition-colors">Sistem Informasi - UINSA</h3>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Kanan: License Card Grid */}
          <div className="md:w-1/2 w-full flex flex-col">
            <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent mb-8">
              Licenses & Certifications
            </h2>
            <div className="space-y-6">
              {/* System Analyst Card */}
              <div className="group relative overflow-hidden rounded-2xl transition-all duration-500 hover:scale-[1.02]">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <div className="flex-shrink-0 w-16 h-16 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <h3 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">System Analyst</h3>
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                          BNSP
                        </span>
                      </div>
                      <p className="text-gray-400 mt-2">Certified System Analyst by BNSP</p>
                      <div className="mt-4 flex gap-2">
                        <span className="px-2 py-1 rounded-md bg-blue-500/10 text-blue-400 text-xs">Professional</span>
                        <span className="px-2 py-1 rounded-md bg-purple-500/10 text-purple-400 text-xs">2023</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Junior Computer Operator Card */}
              <div className="group relative overflow-hidden rounded-2xl transition-all duration-500 hover:scale-[1.02]">
                <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-teal-500/20 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <div className="flex-shrink-0 w-16 h-16 rounded-xl bg-gradient-to-br from-green-500 to-teal-600 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <h3 className="text-xl font-bold bg-gradient-to-r from-green-400 to-teal-500 bg-clip-text text-transparent">Junior Computer Operator</h3>
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-green-500 to-teal-600 text-white">
                          Certification
                        </span>
                      </div>
                      <p className="text-gray-400 mt-2">Junior Computer Operator & Scientific Writing</p>
                      <div className="mt-4 flex gap-2">
                        <span className="px-2 py-1 rounded-md bg-green-500/10 text-green-400 text-xs">Technical</span>
                        <span className="px-2 py-1 rounded-md bg-teal-500/10 text-teal-400 text-xs">2022</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SectionReveal>

      {/* New Section - My Skills */}
      <SectionReveal as="section" id="skills" className="relative z-10 py-16 bg-black" amount={0.2}>
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="text-4xl font-bold text-white mb-8 text-center">Skills</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* React Pemula */}
            <div className="bg-white/5 border border-white/10 rounded-lg p-6 flex flex-col items-center hover:shadow-lg transition-shadow">
              <FaReact size={40} className="text-[#61dafb] mb-2" />
              <span className="text-white text-lg font-semibold mb-1">React</span>
              <span className="text-gray-400 text-sm">Basic</span>
            </div>
            {/* Next.js Basic */}
            <div className="bg-white/5 border border-white/10 rounded-lg p-6 flex flex-col items-center hover:shadow-lg transition-shadow">
              <span className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-white/80 mb-2">
                <SiNextdotjs size={32} className="text-black" />
              </span>
              <span className="text-white text-lg font-semibold mb-1">Next.js</span>
              <span className="text-gray-400 text-sm">Basic</span>
            </div>
            {/* Laravel Menengah */}
            <div className="bg-white/5 border border-white/10 rounded-lg p-6 flex flex-col items-center hover:shadow-lg transition-shadow">
              <SiLaravel size={40} className="text-[#ff2d20] mb-2" />
              <span className="text-white text-lg font-semibold mb-1">Laravel</span>
              <span className="text-gray-400 text-sm">Intermediate</span>
            </div>
            {/* PHP Intermediate */}
            <div className="bg-white/5 border border-white/10 rounded-lg p-6 flex flex-col items-center hover:shadow-lg transition-shadow">
              <SiPhp size={40} className="text-[#777bb4] mb-2" />
              <span className="text-white text-lg font-semibold mb-1">PHP</span>
              <span className="text-gray-400 text-sm">Intermediate</span>
            </div>
            {/* Microsoft Mahir */}
            <div className="bg-white/5 border border-white/10 rounded-lg p-6 flex flex-col items-center hover:shadow-lg transition-shadow">
              <FaMicrosoft size={40} className="text-[#0078D4] mb-2" />
              <span className="text-white text-lg font-semibold mb-1">Microsoft</span>
              <span className="text-gray-400 text-sm">Advance</span>
            </div>
            {/* Figma Menengah */}
            <div className="bg-white/5 border border-white/10 rounded-lg p-6 flex flex-col items-center hover:shadow-lg transition-shadow">
              <SiFigma size={40} className="text-[#a259ff] mb-2" />
              <span className="text-white text-lg font-semibold mb-1">Figma</span>
              <span className="text-gray-400 text-sm">Intermediate</span>
            </div>
          </div>
        </div>
      </SectionReveal>

      {/* New Section - My Projects */}
      <SectionReveal as="section" id="my-projects" className="bg-black py-16" amount={0.15}>
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent tracking-wide mb-4">
              My Projects
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Card 1: Website Company */}
            <div className="group relative bg-neutral-900/50 rounded-xl overflow-hidden backdrop-blur-sm border border-white/10 transition-all duration-300 hover:border-purple-500/50">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative flex flex-col h-full">
                <div className="w-full h-48 overflow-hidden">
                  <div className="relative w-full h-full transform group-hover:scale-110 transition-transform duration-500">
                    <Image
                      src="/assets/lanyard/mp1.webp"
                      alt="Website Company"
                      width={400}
                      height={192}
                      className="object-cover w-full h-full"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300"></div>
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between backdrop-blur-sm">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">
                      WEBSITE COMPANY
                    </h3>
                    <p className="text-gray-400 text-sm">SEBUAH WEBSITE PERUSAHAAN COFFEETIME (CAFE)</p>
                  </div>
                  <div className="mt-4 pt-4 border-t border-white/10">
                    <div className="flex gap-3 items-center">
                      <FaHtml5 size={20} className="text-[#e34c26] transition-transform hover:scale-110" />
                      <FaCss3Alt size={20} className="text-[#1572b6] transition-transform hover:scale-110" />
                      <SiJavascript size={20} className="text-[#f7df1e] transition-transform hover:scale-110" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/20 text-purple-400 backdrop-blur-md">
                  Web Development
                </span>
              </div>
            </div>

            {/* Card 2: Data Analysis */}
            <div className="group relative bg-neutral-900/50 rounded-xl overflow-hidden backdrop-blur-sm border border-white/10 transition-all duration-300 hover:border-blue-500/50">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-cyan-500/10 to-teal-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative flex flex-col h-full">
                <div className="w-full h-48 overflow-hidden">
                  <div className="relative w-full h-full transform group-hover:scale-110 transition-transform duration-500">
                    <Image
                      src="/assets/lanyard/mp2.webp"
                      alt="Analis dan Visualisasi Data"
                      width={400}
                      height={192}
                      className="object-cover w-full h-full"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300"></div>
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between backdrop-blur-sm">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                      Analis dan Visualisasi Data
                    </h3>
                    <p className="text-gray-400 text-sm">Visualisasi data passing grade UTBK jurusan IPA perguruan tinggi negeri pada tahun 2019</p>
                  </div>
                  <div className="mt-4 pt-4 border-t border-white/10">
                    <div className="flex gap-3 items-center">
                      <SiPython size={20} className="text-[#3776ab] transition-transform hover:scale-110" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-400 backdrop-blur-md">
                  Data Analysis
                </span>
              </div>
            </div>

            {/* Card 3: AI/ML */}
            <div className="group relative bg-neutral-900/50 rounded-xl overflow-hidden backdrop-blur-sm border border-white/10 transition-all duration-300 hover:border-yellow-500/50">
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 via-orange-500/10 to-red-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative flex flex-col h-full">
                <div className="w-full h-48 overflow-hidden">
                  <div className="relative w-full h-full transform group-hover:scale-110 transition-transform duration-500">
                    <Image
                      src="/assets/lanyard/mp3.webp"
                      alt="Klasifikasi Makanan Indonesia"
                      width={400}
                      height={192}
                      className="object-cover w-full h-full"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300"></div>
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between backdrop-blur-sm">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-yellow-400 transition-colors">
                      Klasifikasi Makanan Indonesia
                    </h3>
                    <p className="text-gray-400 text-sm">Training Data Gambar Makanan Indonesia menggunakan Machine Learning</p>
                  </div>
                  <div className="mt-4 pt-4 border-t border-white/10">
                    <div className="flex gap-3 items-center">
                      <SiGooglecolab size={20} className="text-[#F9AB00] transition-transform hover:scale-110" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-yellow-500/20 text-yellow-400 backdrop-blur-md">
                  Machine Learning
                </span>
              </div>
            </div>

            {/* Card 4: Full Stack */}
            <div className="group relative bg-neutral-900/50 rounded-xl overflow-hidden backdrop-blur-sm border border-white/10 transition-all duration-300 hover:border-red-500/50">
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 via-pink-500/10 to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative flex flex-col h-full">
                <div className="w-full h-48 overflow-hidden">
                  <div className="relative w-full h-full transform group-hover:scale-110 transition-transform duration-500">
                    <Image
                      src="/assets/lanyard/mp5.webp"
                      alt="UINSAFOOD"
                      width={400}
                      height={192}
                      className="object-cover w-full h-full"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300"></div>
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between backdrop-blur-sm">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-red-400 transition-colors">
                      UINSAFOOD
                    </h3>
                    <p className="text-gray-400 text-sm">Website Catering yang dikembangan oleh PUSBIS yang akan digunakan oleh internal kampus</p>
                  </div>
                  <div className="mt-4 pt-4 border-t border-white/10">
                    <div className="flex flex-wrap gap-3 items-center">
                      <SiLaravel size={20} className="text-[#ff2d20] transition-transform hover:scale-110" />
                      <SiPhp size={20} className="text-[#777bb4] transition-transform hover:scale-110" />
                      <FaHtml5 size={20} className="text-[#e34c26] transition-transform hover:scale-110" />
                      <SiJavascript size={20} className="text-[#f7df1e] transition-transform hover:scale-110" />
                      <FaCss3Alt size={20} className="text-[#1572b6] transition-transform hover:scale-110" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-red-500/20 text-red-400 backdrop-blur-md">
                  Full Stack
                </span>
              </div>
            </div>
            {/* Card 5: Web Development */}
            <div className="group relative bg-neutral-900/50 rounded-xl overflow-hidden backdrop-blur-sm border border-white/10 transition-all duration-300 hover:border-green-500/50">
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-emerald-500/10 to-teal-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative flex flex-col h-full">
                <div className="w-full h-48 overflow-hidden">
                  <div className="relative w-full h-full transform group-hover:scale-110 transition-transform duration-500">
                    <Image
                      src="/assets/lanyard/mp4.webp"
                      alt="WEB QRCODE GENERATOR"
                      width={400}
                      height={192}
                      className="object-cover w-full h-full"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300"></div>
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between backdrop-blur-sm">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-green-400 transition-colors">
                      WEB QRCODE GENERATOR
                    </h3>
                    <p className="text-gray-400 text-sm">Website pembuatan QRcode yang berisikan data mahasiswa yang digunakan untuk validasi keaslian</p>
                  </div>
                  <div className="mt-4 pt-4 border-t border-white/10">
                    <div className="flex flex-wrap gap-3 items-center">
                      <SiLaravel size={20} className="text-[#ff2d20] transition-transform hover:scale-110" />
                      <SiPhp size={20} className="text-[#777bb4] transition-transform hover:scale-110" />
                      <FaHtml5 size={20} className="text-[#e34c26] transition-transform hover:scale-110" />
                      <FaCss3Alt size={20} className="text-[#1572b6] transition-transform hover:scale-110" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-green-500/20 text-green-400 backdrop-blur-md">
                  Web Development
                </span>
              </div>
            </div>

            {/* Card 6: Full Stack + Security */}
            <div className="group relative bg-neutral-900/50 rounded-xl overflow-hidden backdrop-blur-sm border border-white/10 transition-all duration-300 hover:border-indigo-500/50">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-violet-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative flex flex-col h-full">
                <div className="w-full h-48 overflow-hidden">
                  <div className="relative w-full h-full transform group-hover:scale-110 transition-transform duration-500">
                    <Image
                      src="/assets/lanyard/mp6.webp"
                      alt="QR Code Website with Data Encryption"
                      width={400}
                      height={192}
                      className="object-cover w-full h-full"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300"></div>
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between backdrop-blur-sm">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-indigo-400 transition-colors">
                      QR Code with Data Encryption
                    </h3>
                    <p className="text-gray-400 text-sm">Web aplikasi pembuatan sertifikat dengan QRcode yang mengimplementasikan algoritma kriptografi ChaCha20 Poly-1305</p>
                  </div>
                  <div className="mt-4 pt-4 border-t border-white/10">
                    <div className="flex flex-wrap gap-3 items-center">
                      <SiLaravel size={20} className="text-[#ff2d20] transition-transform hover:scale-110" />
                      <SiPhp size={20} className="text-[#777bb4] transition-transform hover:scale-110" />
                      <FaHtml5 size={20} className="text-[#e34c26] transition-transform hover:scale-110" />
                      <FaCss3Alt size={20} className="text-[#1572b6] transition-transform hover:scale-110" />
                      <SiJavascript size={20} className="text-[#f7df1e] transition-transform hover:scale-110" />
                      <FaReact size={20} className="text-[#61dafb] transition-transform hover:scale-110" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-400 backdrop-blur-md">
                  Full Stack + Security
                </span>
              </div>
            </div>

            {/* Card 7: UI/UX Design */}
            <div className="group relative bg-neutral-900/50 rounded-xl overflow-hidden backdrop-blur-sm border border-white/10 transition-all duration-300 hover:border-pink-500/50">
              <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 via-rose-500/10 to-red-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative flex flex-col h-full">
                <div className="w-full h-48 overflow-hidden">
                  <div className="relative w-full h-full transform group-hover:scale-110 transition-transform duration-500">
                    <Image
                      src="/assets/lanyard/mp7.webp"
                      alt="UI DESIGN & REDESAIN WEB"
                      width={400}
                      height={192}
                      className="object-cover w-full h-full"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300"></div>
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between backdrop-blur-sm">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-pink-400 transition-colors">
                      UI DESIGN & REDESAIN WEB
                    </h3>
                    <p className="text-gray-400 text-sm">UI Design Water Tracker dan Redesain Website SI dengan fokus pada pengalaman pengguna</p>
                  </div>
                  <div className="mt-4 pt-4 border-t border-white/10">
                    <div className="flex gap-3 items-center">
                      <SiFigma size={20} className="text-[#a259ff] transition-transform hover:scale-110" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-pink-500/20 text-pink-400 backdrop-blur-md">
                  UI/UX Design
                </span>
              </div>
            </div>


          </div>
        </div>
      </SectionReveal>

      {/* Contact Section */}
      <SectionReveal as="section" id="contact" ref={contactSectionRef as any} className="relative z-10 py-16 bg-gradient-to-br from-gray-100 via-white to-gray-200 text-black" amount={0.2}>
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Left: Lanyard 3D */}
            <div className="flex justify-center items-center">
              <Lanyard
                position={[0, 0, 20]}
                gravity={[0, -40, 0]}
                onVisibilityChange={(isVisible) => {

                }}
              />
            </div>
            {/* Right: Modern Contact Card */}
            <div className="flex flex-col gap-8 items-center md:items-start">
              <div className="bg-white/60 backdrop-blur-lg rounded-2xl shadow-xl p-8 border border-white/20 w-full max-w-md">
                <h2 className="text-3xl sm:text-4xl font-bold mb-2 text-gray-900">Let's Connect!</h2>
                <p className="text-gray-700 text-base mb-6">Feel free to reach out through any of these platforms or send me an email. I'm open for collaboration and new opportunities!</p>
                <div className="flex flex-col gap-4">
                  {/* Instagram */}
                  <a href="https://www.instagram.com/_alauhar/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-3 rounded-xl bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 text-white font-semibold text-lg shadow-md hover:scale-105 transition-transform">
                    <FaInstagram className="w-7 h-7" /> @_alauhar
                  </a>
                  {/* WhatsApp */}
                  <a href="https://wa.me/081556442718" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-3 rounded-xl bg-gradient-to-r from-green-400 to-green-600 text-white font-semibold text-lg shadow-md hover:scale-105 transition-transform">
                    <FaWhatsapp className="w-7 h-7" /> 081556442718
                  </a>
                  {/* Email */}
                  <a href="mailto:jauharalthaf@gmail.com" className="flex items-center gap-4 p-3 rounded-xl bg-gradient-to-r from-blue-400 to-blue-600 text-white font-semibold text-lg shadow-md hover:scale-105 transition-transform">
                    <FaEnvelope className="w-7 h-7" /> jauharalthaf@gmail.com
                  </a>
                  {/* GitHub */}
                  <a href="https://github.com/Studentalthaf" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-3 rounded-xl bg-gradient-to-r from-gray-700 to-gray-900 text-white font-semibold text-lg shadow-md hover:scale-105 transition-transform">
                    <FaGithub className="w-7 h-7" /> GitHub
                  </a>
                </div>
                <div className="mt-8">
                  <a href="mailto:jauharalthaf@gmail.com" className="inline-block px-6 py-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold text-lg shadow-lg hover:scale-105 transition-transform">Email Me</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SectionReveal>

      {/* Footer Section */}
      <footer className="relative z-10 bg-black text-white py-12 border-t border-white/10">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Brand Section */}
            <div className="flex flex-col items-center md:items-start">
              <h3 className="text-2xl font-bold mb-2 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
                Moch Althaf Jauhar
              </h3>
              <p className="text-gray-400 text-base mb-2">Web Developer & Data Enthusiast</p>
              <p className="text-gray-500 text-sm">Sistem Informasi Graduate</p>
            </div>
            {/* Quick Links */}
            <div className="flex flex-col items-center md:items-start">
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-center md:text-left">
                <li>
                  <a href="#home" className="text-gray-400 hover:text-white transition-colors">Home</a>
                </li>
                <li>
                  <a href="#about" className="text-gray-400 hover:text-white transition-colors">About</a>
                </li>
                <li>
                  <a href="#my-projects" className="text-gray-400 hover:text-white transition-colors">Projects</a>
                </li>
                <li>
                  <a href="#contact" className="text-gray-400 hover:text-white transition-colors">Contact</a>
                </li>
              </ul>
            </div>
            {/* Tech Stack & Social */}
            <div className="flex flex-col items-center md:items-start gap-4">
              <div>
                <h4 className="text-lg font-semibold mb-4">Tech Stack</h4>
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
                    <FaCss3Alt className="text-blue-400" />
                    <span>Tailwind</span>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-4 mt-4 md:mt-0">Find Me</h4>
                <div className="flex gap-4">
                  <a href="https://www.instagram.com/violetitumerah_/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                    <FaInstagram className="w-5 h-5" />
                  </a>
                  <a href="https://github.com/Studentalthaf" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                    <FaGithub className="w-5 h-5" />
                  </a>
                  <a href="mailto:jauharalthaf@gmail.com" className="text-gray-400 hover:text-white transition-colors">
                    <FaEnvelope className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
          {/* Bottom Bar */}
          <div className="mt-12 pt-8 border-t border-white/10 text-center">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} Moch Althaf Jauhar. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}