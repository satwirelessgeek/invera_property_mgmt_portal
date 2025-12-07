"use client";

import Image from "next/image";
import { Download } from "lucide-react";
import { useState } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

export default function Page() {
  const [isFullscreen, setIsFullscreen] = useState(false);

  return (
    <div className="min-h-screen bg-[#020617] text-white">
      {/* HERO SECTION */}
      <section className="relative px-6 py-20 md:py-28 max-w-6xl mx-auto text-center">
        <div className="absolute inset-0 -z-10 opacity-40 bg-gradient-to-br from-[#00eaff]/20 to-[#7f00ff]/20 blur-[120px]" />

        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight drop-shadow-[0_0_20px_#00eaff]">
          SANJAY DRISHTI
        </h1>

        <p className="mt-4 text-xl text-gray-300 max-w-3xl mx-auto drop-shadow-[0_0_8px_#00eaff]">
          AI Vision Companion — Giving Vision a Voice
        </p>

        {/* Download Button */}
        <div className="mt-8 flex justify-center gap-4">
          <button className="px-6 py-3 rounded-xl bg-[#00eaff] text-black text-lg font-semibold shadow-[0_0_20px_#00eaff] hover:shadow-[0_0_35px_#00eaff] transition">
            <Download className="w-5 h-5 inline-block mr-2" /> Download App
          </button>
        </div>
        </section>
   {/* WHAT IS SANJAY DRISHTI WITH IMAGE SIDE BY SIDE */}
<section className="px-6 py-12 max-w-5xl mx-auto">
  <div className="flex flex-col md:flex-row items-start gap-8">
    {/* TEXT SECTION */}
    <div className="neon-card p-8 rounded-2xl border border-white/10 bg-white/5 shadow-[0_0_25px_#00eaff] flex-1">
      <h2 className="text-3xl font-bold mb-3 drop-shadow-[0_0_15px_#00eaff]">
        What is Sanjay Drishti?
      </h2>
      <p className="text-gray-300 leading-relaxed">
        Sanjay Drishti is an AI-powered mobile application designed to empower visually impaired
        individuals by converting the world around them into{' '}
        <strong>clear, natural English voice descriptions</strong>. It works as a digital guide,
        enabling confidence, safety, and independence.
      </p>
    </div>

    {/* CLICKABLE IMAGE SECTION */}
    <div
      className="neon-card p-4 rounded-2xl border border-white/10 bg-white/5 shadow-[0_0_25px_#00eaff] flex-shrink-0 cursor-zoom-in"
      onClick={() => setIsFullscreen(true)}
    >
      <Image
        src="/eye.png"
        alt="Drishti Thumbnail"
        width={150}
        height={250}
        className="object-contain select-none"
      />
      <p className="text-center text-gray-400 mt-3 text-sm">Click image to view fullscreen</p>
    </div>
  </div>
</section>


  {/* FULLSCREEN ZOOM VIEW */}
  {isFullscreen && (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center">
      <button
        onClick={() => setIsFullscreen(false)}
        className="absolute top-4 right-4 z-50 px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg"
      >
        Close
      </button>

      <TransformWrapper
        doubleClick={{ mode: "zoomIn" }}
        pinch={{ disabled: false }}
        wheel={{ step: 40 }}
        minScale={1}
        maxScale={6}
        centerOnInit={true}
      >
        <TransformComponent>
          <div className="relative w-[90vw] h-[70vh] md:w-[70vw] md:h-[60vh] cursor-zoom-in">
            <Image
              src="/DRISHTI.png"
              alt="Drishti Diagram Fullscreen"
              fill
              className="object-contain select-none pointer-events-none"
              sizes="(max-width: 768px) 90vw, 70vw"
            />
          </div>
        </TransformComponent>
      </TransformWrapper>
    </div>
  )}


      {/* FEATURES WITH IMAGES */}
      <section className="px-6 py-12 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-10 drop-shadow-[0_0_15px_#00eaff]">
          Key Features
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="neon-card p-6 rounded-xl border border-white/10 bg-white/5 shadow-[0_0_20px_#00eaff]">
            <div className="relative h-40 w-full rounded-lg overflow-hidden mb-4">
              <Image src="/vision.jpg" alt="AI Vision" fill className="object-cover" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Smart Vision AI</h3>
            <p className="text-gray-300 text-sm">
              Instantly describes surroundings — people, objects, scenes, signs, and actions.
            </p>
          </div>

          {/* Card 2 */}
          <div className="neon-card p-6 rounded-xl border border-white/10 bg-white/5 shadow-[0_0_20px_#00eaff]">
            <div className="relative h-40 w-full rounded-lg overflow-hidden mb-4">
              <Image src="/nav.jpg" alt="AI Navigation" fill className="object-cover" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Navigation Intelligence</h3>
            <p className="text-gray-300 text-sm">
              Helps users move safely through roads, markets, buildings, and public spaces.
            </p>
          </div>

          {/* Card 3 */}
          <div className="neon-card p-6 rounded-xl border border-white/10 bg-white/5 shadow-[0_0_20px_#00eaff]">
            <div className="relative h-40 w-full rounded-lg overflow-hidden mb-4">
              <Image src="/assist.jpg" alt="Daily Assistance" fill className="object-cover" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Daily Assistance</h3>
            <p className="text-gray-300 text-sm">
              Reads labels, detects objects, identifies products, and supports daily tasks.
            </p>
          </div>
        </div>
      </section>

      {/* SAFETY + OCR + COMMANDS */}
      <section className="px-6 py-12 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="neon-small-card">
            <h3 className="text-xl font-semibold mb-2">Smart Safety Alerts</h3>
            <p className="text-gray-300 text-sm">
              Warns about obstacles, fast vehicles, sharp edges, or dangerous items.
            </p>
          </div>

          <div className="neon-small-card">
            <h3 className="text-xl font-semibold mb-2">Reads Anything Aloud</h3>
            <p className="text-gray-300 text-sm">
              Signboards, handwritten notes, books, menus—just point and listen.
            </p>
          </div>

          <div className="neon-small-card">
            <h3 className="text-xl font-semibold mb-2">Voice Command Ready</h3>
            <p className="text-gray-300 text-sm">
              Fully hands-free usage with simple voice commands.
            </p>
          </div>
        </div>
      </section>

      {/* DOWNLOAD SECTION */}
      <section className="px-6 py-16 max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold drop-shadow-[0_0_25px_#00eaff]">
          Download Sanjay Drishti
        </h2>
        <p className="text-gray-400 mt-2 max-w-2xl mx-auto">
          Available on Android. iOS version coming soon.
        </p>

        <button className="mt-6 px-8 py-4 text-lg bg-[#00eaff] text-black rounded-xl font-semibold shadow-[0_0_25px_#00eaff] hover:shadow-[0_0_35px_#00eaff] transition">
          <Download className="w-5 h-5 inline-block mr-2" />
          Download Android App
        </button>
      </section>

      {/* FOOTER */}
      <footer className="px-6 py-10 text-center border-t border-white/10">
        <p className="text-gray-400">📧 support@sanjaydrishti.ai</p>
        <p className="text-gray-500 mt-1">🌐 www.sanjaydrishti.ai</p>

        <p className="text-gray-600 mt-4 text-sm">
          Sanjay Drishti — Because everyone deserves to see the world in their own way.
        </p>
      </footer>

      {/* CARD STYLES */}
      <style jsx>{`
        .neon-card {
          transition: all 0.3s ease;
        }
        .neon-card:hover {
          box-shadow: 0 0 35px #00eaff;
          transform: translateY(-4px);
        }
        .neon-small-card {
          padding: 20px;
          border-radius: 14px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 0 0 20px #00eaff40;
          transition: all 0.3s ease;
        }
        .neon-small-card:hover {
          box-shadow: 0 0 35px #00eaff;
          transform: translateY(-4px);
        }
      `}</style>
    </div>
  );
}
