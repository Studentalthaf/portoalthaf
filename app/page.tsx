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
import { SiNextdotjs, SiTypescript, SiJavascript, SiLaravel, SiPhp, SiPython, SiGooglecolab, SiFigma } from 'react-icons/si';
import { FaReact, FaHtml5, FaCss3Alt, FaInstagram, FaWhatsapp, FaEnvelope, FaGithub, FaMicrosoft, FaHome, FaUser, FaCode } from 'react-icons/fa';
import Dock from './components/Dock/Dock';
import ScrollColorText from "./components/ScrollColorText/ScrollColorText";
// Import komponen AnimatedPinDemo secara dinamis
const AnimatedPinDemo = dynamic(() => import('./components/ui/3d-pin').then(mod => mod.AnimatedPinDemo), { ssr: false });

const Lanyard = dynamic(() => import("./components/Lanyard/Lanyard"), { ssr: false });
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
      <section id="about" className="relative z-10 py-8 bg-black">
        <div className="container mx-auto px-4 sm:px-6">
          <ScrollVelocity
            texts={['MOCH ALTHAF JAUHAR', 'SISTEM INFORMASI']}
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
              <p className="text-white text-lg sm:text-xl md:text-2xl font-medium text-justify leading-relaxed mt-8 mx-auto" style={{ minHeight: '200px' }}>
                Saya Moch Althaf Jauhar, lulusan Sistem Informasi yang memiliki minat besar di bidang pengembangan web dan teknologi digital. Berpengalaman dalam membangun aplikasi web modern dengan pendekatan kreatif, kolaboratif, dan berorientasi pada solusi. Saya memiliki pengalaman menggunakan framework Laravel dan sangat suka mencoba hal-hal baru di dunia teknologi. Saya selalu antusias untuk belajar hal baru dan siap berkontribusi dalam tim maupun proyek individu.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Section: Education & License */}
      <section id="education-license" className="relative z-10 py-12 bg-black">
        <div className="container mx-auto px-4 sm:px-6 flex flex-col md:flex-row gap-12">
          {/* Kiri: Education Timeline */}
          <div className="md:w-1/2 w-full">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-8">Education</h2>
            <div className="relative border-l-4 border-blue-500 ml-4">
              {/* SD */}
              <div className="mb-10 ml-8 flex items-center group relative">
                <div className="absolute -left-10 top-1/2 -translate-y-1/2 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center border-4 border-black group-hover:bg-blue-600 transition-colors z-10">
                  <span className="text-white font-bold">1</span>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-lg p-6 shadow-lg w-full">
                  <h3 className="text-xl font-semibold text-white mb-1">SDN Penambangan</h3>
                  <p className="text-gray-300 text-sm">Sekolah Dasar</p>
                </div>
              </div>
              {/* SMP */}
              <div className="mb-10 ml-8 flex items-center group relative">
                <div className="absolute -left-10 top-1/2 -translate-y-1/2 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center border-4 border-black group-hover:bg-blue-600 transition-colors z-10">
                  <span className="text-white font-bold">2</span>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-lg p-6 shadow-lg w-full">
                  <h3 className="text-xl font-semibold text-white mb-1">SMPN 1 Balongbendo</h3>
                  <p className="text-gray-300 text-sm">Sekolah Menengah Pertama</p>
                </div>
              </div>
              {/* SMA */}
              <div className="mb-10 ml-8 flex items-center group relative">
                <div className="absolute -left-10 top-1/2 -translate-y-1/2 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center border-4 border-black group-hover:bg-blue-600 transition-colors z-10">
                  <span className="text-white font-bold">3</span>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-lg p-6 shadow-lg w-full">
                  <h3 className="text-xl font-semibold text-white mb-1">SMA UBP Amanatul Ummah</h3>
                  <p className="text-gray-300 text-sm">Sekolah Menengah Atas</p>
                </div>
              </div>
              {/* Kuliah */}
              <div className="ml-8 flex items-center group relative">
                <div className="absolute -left-10 top-1/2 -translate-y-1/2 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center border-4 border-black group-hover:bg-blue-600 transition-colors z-10">
                  <span className="text-white font-bold">4</span>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-lg p-6 shadow-lg w-full">
                  <h3 className="text-xl font-semibold text-white mb-1">Sistem Informasi - UINSA</h3>
                  <p className="text-gray-300 text-sm">Universitas Islam Negeri Sunan Ampel Surabaya</p>
                </div>
              </div>
            </div>
          </div>
          {/* Kanan: License Card Grid */}
          <div className="md:w-1/2 w-full flex flex-col">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-8">Licenses & Certifications</h2>
            <div className="grid grid-cols-1 gap-6">
              <div className="bg-white/5 border border-white/10 rounded-lg p-6 shadow-lg flex flex-col items-start">
                <h3 className="text-xl font-semibold text-white mb-2">System Analyst</h3>
                <span className="inline-block bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full mb-2">BNSP</span>
                <p className="text-gray-300 text-sm">Certified System Analyst by BNSP</p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-lg p-6 shadow-lg flex flex-col items-start">
                <h3 className="text-xl font-semibold text-white mb-2">Junior Computer Operator & Scientific Writing</h3>
                <span className="inline-block bg-green-600 text-white text-xs font-semibold px-3 py-1 rounded-full mb-2">Certification</span>
                <p className="text-gray-300 text-sm">Junior Computer Operator & Scientific Writing</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* New Section - My Skills */}
      <section id="skills" className="relative z-10 py-16 bg-black">
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
      </section>

      {/* New Section - My Projects */}
      <section id="my-projects" className="bg-black py-16">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-wide">My Projects</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {/* Card 1: Gambar di atas, judul & deskripsi di bawah */}
            <div className="bg-neutral-900 rounded-xl overflow-hidden flex flex-col shadow-lg hover:scale-[1.03] transition-transform">
              <div className="w-full h-48 overflow-hidden flex-shrink-0">
                <Image src="/assets/lanyard/mp1.webp" alt="Website Company" width={400} height={192} className="object-cover w-full h-full" loading="lazy" />
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between">
                <h3 className="text-xl font-bold text-white mb-2">WEBSITE COMPANY</h3>
                <p className="text-gray-400 text-sm mb-4">SEBUAH WEBSITE PERUSAHAAN COFFEETIME (CAFE)</p>
                <div className="flex gap-3 mt-2">
                  <FaHtml5 size={24} className="text-[#e34c26]" />
                  <FaCss3Alt size={24} className="text-[#1572b6]" />
                  <SiJavascript size={24} className="text-[#f7df1e]" />
                </div>
              </div>
            </div>

            {/* Card 2: Gambar di atas, judul & deskripsi di bawah */}
            <div className="bg-neutral-900 rounded-xl overflow-hidden flex flex-col shadow-lg hover:scale-[1.03] transition-transform">
              <div className="w-full h-48 overflow-hidden flex-shrink-0">
                <Image src="/assets/lanyard/mp2.webp" alt="Analis dan Visualisasi Data" width={400} height={192} className="object-cover w-full h-full" loading="lazy" />
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between">
                <h3 className="text-xl font-bold text-white mb-2">Analis dan Visualisasi Data</h3>
                <p className="text-gray-400 text-sm mb-4">merupakan visualisasi data passing grade UTBK jurusan IPA perguruan tinggi negeri pada tahun 2019</p>
                <div className="flex gap-3 mt-2">
                  <SiPython size={24} className="text-[#3776ab]" />
                </div>
              </div>
            </div>
            {/* Card 3: Gambar di atas, judul & deskripsi di bawah */}
            <div className="bg-neutral-900 rounded-xl overflow-hidden flex flex-col shadow-lg hover:scale-[1.03] transition-transform">
              <div className="w-full h-48 overflow-hidden flex-shrink-0">
                <Image src="/assets/lanyard/mp3.webp" alt="Klasifikasi Makanan Indonesia" width={400} height={192} className="object-cover w-full h-full" loading="lazy" />
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between">
                <h3 className="text-xl font-bold text-white mb-2">Klasifikasi Makanan Indonesia</h3>
                <p className="text-gray-400 text-sm mb-4">Training Data Gambar Makanan Indonesia</p>
                <div className="flex gap-3 mt-2">
                  <SiGooglecolab size={24} className="text-[#F9AB00]" />
                </div>
              </div>
            </div>
            {/* Card 4: Gambar di atas, judul & deskripsi di bawah */}
            <div className="bg-neutral-900 rounded-xl overflow-hidden flex flex-col shadow-lg hover:scale-[1.03] transition-transform">
              <div className="w-full h-48 overflow-hidden flex-shrink-0">
                <Image src="/assets/lanyard/mp5.webp" alt="UINSAFOOD" width={400} height={192} className="object-cover w-full h-full" loading="lazy" />
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between">
                <h3 className="text-xl font-bold text-white mb-2">UINSAFOOD</h3>
                <p className="text-gray-400 text-sm mb-4">Website Catering yang dikembangan oleh PUSBIS yang akan digunakan oleh internal kampus</p>
                <div className="flex gap-3 mt-2">
                  <SiLaravel size={24} className="text-[#ff2d20]" />
                  <SiPhp size={24} className="text-[#777bb4]" />
                  <FaHtml5 size={24} className="text-[#e34c26]" />
                  <SiJavascript size={24} className="text-[#f7df1e]" />
                  <FaCss3Alt size={24} className="text-[#1572b6]" />
                </div>
              </div>
            </div>
            {/* Card 5: Gambar di atas, judul & deskripsi di bawah */}
            <div className="bg-neutral-900 rounded-xl overflow-hidden flex flex-col shadow-lg hover:scale-[1.03] transition-transform">
              <div className="w-full h-48 overflow-hidden flex-shrink-0">
                <Image src="/assets/lanyard/mp4.webp" alt="WEB QRCODE GENERATOR" width={400} height={192} className="object-cover w-full h-full" loading="lazy" />
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between">
                <h3 className="text-xl font-bold text-white mb-2"> WEB QRCODE GENERATOR</h3>
                <p className="text-gray-400 text-sm mb-4">Website pembuatan QRcode yang berisikan data mahasiswa yang digunakan untuk validasi keaslian</p>
                <div className="flex gap-3 mt-2">
                  <SiLaravel size={24} className="text-[#ff2d20]" />
                  <SiPhp size={24} className="text-[#777bb4]" />
                  <FaHtml5 size={24} className="text-[#e34c26]" />
                  <FaCss3Alt size={24} className="text-[#1572b6]" />
                </div>
              </div>
            </div>
            {/* Card 6: Gambar di atas, judul & deskripsi di bawah */}
            <div className="bg-neutral-900 rounded-xl overflow-hidden flex flex-col shadow-lg hover:scale-[1.03] transition-transform">
              <div className="w-full h-48 overflow-hidden flex-shrink-0">
                <Image src="/assets/lanyard/mp6.webp" alt="QR Code Website with Data Encryption" width={400} height={192} className="object-cover w-full h-full" loading="lazy" />
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between">
                <h3 className="text-xl font-bold text-white mb-2">QR Code Website with Data Encryption</h3>
                <p className="text-gray-400 text-sm mb-4">Web aplikasi pembuatan sertifikat dengan pemanfaatan QRcoode yang menginplementasikan algoritma kriptografi ChaCha20 Poly-1305</p>
                <div className="flex gap-3 mt-2">
                  <SiLaravel size={24} className="text-[#ff2d20]" />
                  <SiPhp size={24} className="text-[#777bb4]" />
                  <FaHtml5 size={24} className="text-[#e34c26]" />
                  <FaCss3Alt size={24} className="text-[#1572b6]" />
                  <SiJavascript size={24} className="text-[#f7df1e]" />
                  <FaReact size={24} className="text-[#61dafb]" />
                </div>
              </div>
            </div>
            {/* Card 7: Gambar di atas, judul & deskripsi di bawah */}
            <div className="bg-neutral-900 rounded-xl overflow-hidden flex flex-col shadow-lg hover:scale-[1.03] transition-transform">
              <div className="w-full h-48 overflow-hidden flex-shrink-0">
                <Image src="/assets/lanyard/mp7.webp" alt="UI DESIGN & REDESAIN WEB" width={400} height={192} className="object-cover w-full h-full" loading="lazy" />
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between">
                <h3 className="text-xl font-bold text-white mb-2">UI DESIGN & REDESAIN WEB</h3>
                <p className="text-gray-400 text-sm mb-4">UI Design Watre Tracker dan Redesain Website SI</p>
                <div className="flex gap-3 mt-2">
                  <SiFigma size={24} className="text-[#a259ff]" />
                </div>
              </div>
            </div>

   
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" ref={contactSectionRef} className="relative z-10 py-16 bg-gradient-to-br from-gray-100 via-white to-gray-200 text-black">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Left: Lanyard 3D */}
            <div className="flex justify-center items-center">
              <Lanyard 
                position={[0, 0, 20]} 
                gravity={[0, -40, 0]} 
                onVisibilityChange={(isVisible) => {
                  // Optional: efek tambahan saat lanyard terlihat/tidak
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
      </section>

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