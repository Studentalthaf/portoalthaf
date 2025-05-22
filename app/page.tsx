'use client';

import Image from "next/image";
import Lanyard from "./components/Lanyard/Lanyard";
import RotatingText from "./components/RotatingText/RotatingText";
import SplitText from "./components/SplitText/SplitText";
import BlurText from "./components/BlurText/BlurText";
import Hyperspeed from "./components/Hyperspeed/Hyperspeed";
import AnimatedContent from "./components/AnimatedContent/AnimatedContent";
import { hyperspeedPresets } from "./components/Hyperspeed/HyperSpeedPresets";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-black">

      {/* Background Hyperspeed */}
      <div className="absolute inset-0 z-0">
        <Hyperspeed
          effectOptions={{
            onSpeedUp: () => { },
            onSlowDown: () => { },
            distortion: 'turbulentDistortion',
            length: 150,
            roadWidth: 10,
            islandWidth: 4,
            lanesPerRoad: 5,
            fov: 90,
            fovSpeedUp: 150,
            speedUp: 2,
            carLightsFade: 0.4,
            totalSideLightSticks: 20,
            lightPairsPerRoadWay: 40,
            shoulderLinesWidthPercentage: 0.05,
            brokenLinesWidthPercentage: 0.1,
            brokenLinesLengthPercentage: 0.5,
            lightStickWidth: [0.12, 0.5],
            lightStickHeight: [1.3, 1.7],
            movingAwaySpeed: [60, 80],
            movingCloserSpeed: [-120, -160],
            carLightsLength: [400 * 0.03, 400 * 0.2],
            carLightsRadius: [0.05, 0.14],
            carWidthPercentage: [0.3, 0.5],
            carShiftX: [-0.8, 0.8],
            carFloorSeparation: [0, 5],
            colors: {
              roadColor: 0x080808,
              islandColor: 0x0a0a0a,
              background: 0x000000,
              shoulderLines: 0xFFFFFF,
              brokenLines: 0xFFFFFF,
              leftCars: [0xD856BF, 0x6750A2, 0xC247AC],
              rightCars: [0x03B3C3, 0x0E5EA5, 0x324555],
              sticks: 0x03B3C3,
            }
          }}
        />
      </div>

      {/* Content */}
      <div className="container mx-auto h-screen flex items-center text-white">
        <div className="grid grid-cols-12 w-full">
          <div className="col-span-6 flex items-center">
            <div className="flex flex-col gap-2">
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
                <div className="flex items-center gap-2">


                  <h1 className="text-4xl font-bold">Skripsi</h1>
                  <RotatingText
                    texts={['Pengembaangan', 'Keamanan', 'Data', 'Sertifikat']}
                    mainClassName="bg-[#251BF0] text-black py-1 px-3 rounded-lg text-4xl font-bold inline-flex justify-center items-center transition-all"
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
              <div className="flex flex-col items-start ">
                <SplitText
                  text="Moch. Althaf Jauhar"
                  className="text-5xl font-semibold text-start"
                  delay={50}
                  animationFrom={{ opacity: 0, transform: 'translate3d(0,50px,0)' }}
                  animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
                  threshold={0.2}
                  rootMargin="-50px"
                />
                <SplitText
                  text="Mahasiswa Sistem Informasi"
                  className="text-4xl font-semibold text-[#251BF0]"
                  delay={70}
                  animationFrom={{ opacity: 0, transform: 'translate3d(0,50px,0)' }}
                  animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
                  threshold={0.2}
                  rootMargin="-50px"
                />
              </div>

              <BlurText
                text="Pengembangan Keamanan Data Sertifikat Menggunakan Algoritma Kriptografi ChaCha20 Poly1305"
                delay={100}
                animateBy="letters"
                direction="bottom"
                className="text-xl mb-3 text-start"
              />
            </div>
          </div>

          <div className="col-span-3">
            <Lanyard position={[0, 0, 14]} gravity={[0, -50, 0]} />
          </div>
          <div className="col-span-3">
            <Lanyard position={[0, 0, 14]} gravity={[0, -50, 0]} />
          </div>
        </div>
      </div>
    </div>
  );
}
