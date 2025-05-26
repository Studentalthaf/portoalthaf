"use client";

import { useState } from "react";
import Image from "next/image";
import Lanyard from "./components/Lanyard/Lanyard";
import RotatingText from "./components/RotatingText/RotatingText";
import SplitText from "./components/SplitText/SplitText";
import BlurText from "./components/BlurText/BlurText";
import Hyperspeed from "./components/Hyperspeed/Hyperspeed";
import AnimatedContent from "./components/AnimatedContent/AnimatedContent";
// import { hyperspeedPresets } from "./components/Hyperspeed/HyperSpeedPresets";
import SplashCursor from "./components/SplashCursor/SplashCursor";
import GradientText from "./components/GradientText/GradientText";
import Particles from "./components/Particles/Particles";
import ScrollVelocity from "./components/ScrollVelocity/ScrollVelocity";
import CircularText from "./components/CircularText/CircularText";
import PixelTransition from "./components/PixelTransition/PixelTransition";
export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-black">
      <SplashCursor />

      {/* Particles Background - Fixed positioning to cover entire screen */}
      <div className="fixed inset-0 z-0">
        <Particles
          particleColors={["#ffffff", "#ffffff"]}
          particleCount={500}
          particleSpread={10}
          speed={2}
          particleBaseSize={200}
          moveParticlesOnHover={true}
          alphaParticles={false}
          disableRotation={false}
        />
      </div>

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
        <div className="grid grid-cols-1 lg:grid-cols-12 w-full gap-8 lg:gap-0">
          <div className="lg:col-span-6 flex items-center justify-center lg:justify-start mb-8 lg:mb-0">
            <div className="flex flex-col gap-4 w-full lg:pl-12">
              <AnimatedContent
                distance={150}
                direction="horizontal"
                reverse={false}
                config={{ tension: 80, friction: 20 }}
                initialOpacity={0.2}
                animateOpacity
                scale={1.1}
                threshold={0.2}
              >
                <div className="flex flex-col sm:flex-row items-center sm:items-center lg:items-start gap-2 text-center sm:text-left">
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">Hai Aku</h1>
                  <RotatingText
                    texts={["Mahasiswa", "UINSA"]}
                    mainClassName="bg-[#251BF0] text-black py-1 px-3 rounded-lg text-2xl sm:text-3xl lg:text-4xl font-bold inline-flex justify-center items-center transition-all"
                    staggerFrom={"last"}
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "-120%" }}
                    staggerDuration={0.025}
                    splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
                    transition={{ type: "spring", damping: 30, stiffness: 400 }}
                    rotationInterval={2000}
                  />
                </div>
              </AnimatedContent>
              <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
                <SplitText
                  text="Perkenalkan Nama Ku"
                  className="text-xl sm:text-2xl lg:text-5xl font-semibold"
                  delay={50}
                  animationFrom={{ opacity: 0, transform: "translate3d(0,50px,0)" }}
                  animationTo={{ opacity: 1, transform: "translate3d(0,0,0)" }}
                  threshold={0.2}
                  rootMargin="-50px"
                />
                <SplitText
                  text="Moch. Althaf Jauhar"
                  className="text-lg sm:text-xl lg:text-4xl font-semibold text-[#251BF0]"
                  delay={70}
                  animationFrom={{ opacity: 0, transform: "translate3d(0,50px,0)" }}
                  animationTo={{ opacity: 1, transform: "translate3d(0,0,0)" }}
                  threshold={0.2}
                  rootMargin="-50px"
                />
              </div>
              <BlurText
                text="Mahasiswa UIN Sunan Ampel Surabaya"
                delay={100}
                animateBy="letters"
                direction="bottom"
                className="text-sm sm:text-base lg:text-xl mb-3 text-center sm:text-left"
              />
              <div className="flex items-center justify-center sm:justify-start gap-4">
                <GradientText
                  colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
                  animationSpeed={3}
                  showBorder={false}
                  className="px-5 sm:px-7 py-2 sm:py-3 rounded-lg border text-sm sm:text-base"
                >
                  Hubungi saya
                </GradientText>
              </div>
            </div>
          </div>
          <div className="lg:col-span-6 flex justify-center items-center">
            <div className="w-full max-w-xs sm:max-w-md lg:max-w-full">
              <Lanyard position={[0, 0, 14]} gravity={[0, -50, 0]} />
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
      <section id="projects" className="relative z-10 py-16 bg-black">
        <div className="container mx-auto px-4 sm:px-6">

          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">About Me</h2>
            <CircularText
              text="MOCH*ALTHAF*JAUHAR*"
              onHover="speedUp"
              spinDuration={20}
              className="custom-class"
            />
<PixelTransition
        firstContent={
          <Image
            src="/assets/althaf.jpg"
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
            <p style={{ fontWeight: 900, fontSize: "3rem", color: "#ffffff" }}>Meow!</p>
          </div>
        }
        gridSize={12}
        pixelColor="#ffffff"
        animationStepDuration={0.4}
        className="custom-pixel-card"
      />
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Berikut adalah beberapa proyek yang telah saya kerjakan, termasuk aplikasi web dengan Laravel dan
              portofolio interaktif menggunakan Next.js. Kunjungi repository saya untuk detail lebih lanjut!
            </p>
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