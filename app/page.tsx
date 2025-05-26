"use client"; // Tetap gunakan di file utama untuk memastikan seluruh halaman dirender di klien

import { useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import RotatingText from "./components/RotatingText/RotatingText";
import SplitText from "./components/SplitText/SplitText";
import BlurText from "./components/BlurText/BlurText";
import Hyperspeed from "./components/Hyperspeed/Hyperspeed";
import AnimatedContent from "./components/AnimatedContent/AnimatedContent";
import GradientText from "./components/GradientText/GradientText";

const Lanyard = dynamic(() => import("./components/Lanyard/Lanyard"), { ssr: false });
const SplashCursor = dynamic(() => import("./components/SplashCursor/SplashCursor"), { ssr: false });
const Particles = dynamic(() => import("./components/Particles/Particles"), { ssr: false });
const ScrollVelocity = dynamic(() => import("./components/ScrollVelocity/ScrollVelocity"), { ssr: false });
const CircularText = dynamic(() => import("./components/CircularText/CircularText"), { ssr: false });
const PixelTransition = dynamic(() => import("./components/PixelTransition/PixelTransition"), { ssr: false });

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
      {/* ... (navbar dan konten lainnya tetap sama) ... */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 py-4">
        {/* ... navbar ... */}
      </nav>
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
      <section id="about" className="relative z-10 py-8 bg-black">
        <div className="container mx-auto px-4 sm:px-6">
          <ScrollVelocity
            texts={["Althaf Jauhar", "Gabut Doang"]}
            velocity={100}
            className="custom-scroll-text text-white"
          />
        </div>
      </section>
      <section id="projects" className="relative z-10 py-16 bg-black">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">About <span className="line-through">You</span> Me</h2>
            <div className="flex items-center justify-center py-1">
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
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Berikut adalah beberapa proyek yang telah saya kerjakan, termasuk aplikasi web dengan Laravel dan
              portofolio interaktif menggunakan Next.js. Kunjungi repository saya untuk detail lebih lanjut!
            </p>
          </div>
        </div>
      </section>
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