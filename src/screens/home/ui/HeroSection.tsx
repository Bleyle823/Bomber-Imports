"use client";
import { type FC, useRef } from "react";
import { motion } from "framer-motion";

import Button from "@/shared/ui/Button";

const HeroSection: FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[calc(100svh-56px)] mt-14 flex-col items-center justify-center overflow-hidden bg-black py-12 md:py-20"
    >
      {/* Background Title */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none z-0 overflow-hidden">
        <motion.h1
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.08, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="text-[15vw] md:text-[12vw] font-black leading-none tracking-tighter text-white whitespace-nowrap"
          style={{
            backgroundImage: "linear-gradient(to bottom, #ffffff, #888888)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            filter: "drop-shadow(0 0 40px rgba(255,255,255,0.2))",
          }}
        >
          BOMBER
        </motion.h1>
        <motion.h1
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.08, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
          className="text-[15vw] md:text-[12vw] font-black leading-none tracking-tighter text-white whitespace-nowrap"
          style={{
            backgroundImage: "linear-gradient(to top, #ffffff, #888888)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            filter: "drop-shadow(0 0 40px rgba(255,255,255,0.2))",
          }}
        >
          IMPORTS
        </motion.h1>
      </div>

      {/* Decorative Gradients for background */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 -translate-x-1/2 w-64 md:w-96 h-64 md:h-96 bg-purple-600/20 blur-[100px] md:blur-[120px] rounded-full z-0" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 translate-x-1/2 w-64 md:w-96 h-64 md:h-96 bg-blue-600/20 blur-[100px] md:blur-[120px] rounded-full z-0" />

      {/* iPhone Representation */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full px-4 mb-8 md:mb-12">
        <motion.div
          initial={{ y: 0, opacity: 0 }}
          animate={{
            y: [-15, 15, -15],
            opacity: 1,
          }}
          transition={{
            y: { duration: 6, repeat: Infinity, ease: "easeInOut" },
            opacity: { duration: 1 },
          }}
          className="relative group "
          style={{ perspective: "1000px" }}
        >
          {/* Outer glow */}
          <div className="absolute -inset-1 rounded-[3.2rem] bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 opacity-30 blur-xl transition duration-1000 group-hover:opacity-60" />

          {/* Phone Frame */}
          <motion.div
            initial={{ rotateX: 10, rotateY: -10 }}
            animate={{ rotateX: [10, 5, 10], rotateY: [-10, 10, -10] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="relative h-[420px] w-[200px] sm:h-[480px] sm:w-[230px] md:h-[550px] md:w-[260px] rounded-[2.5rem] sm:rounded-[3rem] p-[3px] bg-gradient-to-br from-zinc-400 via-zinc-800 to-zinc-500 shadow-2xl"
          >
            {/* Phone Screen/Content */}
            <div className="relative w-full h-full rounded-[2.3rem] sm:rounded-[2.8rem] bg-black overflow-hidden border-[3px] sm:border-4 border-black">
              {/* Screen Wallpaper */}
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 overflow-hidden">
                {/* Abstract shapes in wallpaper */}
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 90, 0],
                  }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute -top-10 -left-10 w-48 h-48 md:w-64 md:h-64 bg-cyan-400/40 rounded-full blur-3xl mix-blend-screen"
                />
                <motion.div
                  animate={{
                    scale: [1, 1.5, 1],
                    rotate: [0, -90, 0],
                  }}
                  transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                  className="absolute -bottom-10 -right-10 w-48 h-48 md:w-64 md:h-64 bg-yellow-400/40 rounded-full blur-3xl mix-blend-screen"
                />
              </div>

              {/* Dynamic Island */}
              <div className="absolute top-2 md:top-3 left-1/2 -translate-x-1/2 flex items-center h-[20px] w-[70px] md:h-[26px] md:w-[85px] rounded-full bg-black shrink-0 transition-all duration-300 hover:w-[100px] hover:h-[28px] md:hover:w-[120px] md:hover:h-[32px] z-20">
                <div className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-zinc-800 ml-1.5 md:ml-2" />
                <div className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-blue-900/50 absolute right-2 md:right-3" />
              </div>

              {/* Content on Screen */}
              <div className="absolute inset-x-0 bottom-0 p-4 md:p-6 flex flex-col items-center z-20">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1, duration: 0.8 }}
                  className="w-full flex justify-between items-center bg-white/10 backdrop-blur-md rounded-xl md:rounded-2xl p-3 md:p-4 border border-white/20 shadow-lg"
                >
                  <div className="flex flex-col">
                    <span className="text-white/80 text-[10px] md:text-xs font-medium uppercase tracking-wider">Concept</span>
                    <span className="text-white font-bold text-sm md:text-lg">iPhone 17 Pro</span>
                  </div>
                  <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-white flex items-center justify-center shadow-lg">
                    <svg className="w-3 h-3 md:w-4 md:h-4 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                </motion.div>
              </div>

              {/* Time */}
              <div className="absolute top-2.5 left-5 md:top-3.5 md:left-6 text-white text-[10px] md:text-xs font-medium z-20">
                9:41
              </div>

              {/* Status Bar Icons */}
              <div className="absolute top-2.5 right-4 md:top-3.5 md:right-5 flex items-center gap-1 z-20">
                <div className="w-3 h-2.5 md:w-4 md:h-3 border border-white rounded-[2px] relative flex justify-end p-[1px]">
                  <div className="w-0.5 h-1/2 bg-white absolute -right-1 top-1/4 rounded-r-[1px]" />
                  <div className="w-full h-full bg-white rounded-sm" />
                </div>
              </div>

              {/* Screen Reflection Overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/20 pointer-events-none z-10" />
            </div>

            {/* Hardware Buttons */}
            <div className="absolute top-[80px] md:top-[120px] -left-[3px] md:-left-[4px] w-[3px] h-[20px] md:h-[26px] bg-zinc-600 rounded-l-sm" /> {/* Action button */}
            <div className="absolute top-[120px] md:top-[160px] -left-[3px] md:-left-[4px] w-[3px] h-[40px] md:h-[50px] bg-zinc-600 rounded-l-sm" /> {/* Volume up */}
            <div className="absolute top-[170px] md:top-[220px] -left-[3px] md:-left-[4px] w-[3px] h-[40px] md:h-[50px] bg-zinc-600 rounded-l-sm" /> {/* Volume down */}
            <div className="absolute top-[140px] md:top-[180px] -right-[3px] md:-right-[4px] w-[3px] h-[55px] md:h-[70px] bg-zinc-600 rounded-r-sm" /> {/* Power */}
          </motion.div>
        </motion.div>
      </div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0, translateY: 30 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{
          type: "spring",
          duration: 0.8,
          delay: 0.5,
        }}
        className="relative z-20 flex flex-col items-center mt-4 px-4 text-center max-w-4xl"
      >
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tight text-white mb-4 drop-shadow-lg">
          The Future is Here
        </h2>
        <p className="text-zinc-300 max-w-lg mb-8 text-sm md:text-base leading-relaxed">
          Premium Tech. Unbeatable Prices. Delivery across Kenya. Experience the next generation of smartphones with Bomber Imports.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto items-center justify-center">
          <Button 
            onClick={() => window.location.href = '/phones'}
            className="w-full sm:w-auto px-8 py-3.5 bg-white text-black hover:bg-zinc-200 transition-colors rounded-full font-bold shadow-[0_0_20px_rgba(255,255,255,0.3)] text-sm md:text-base border-0"
          >
            Explore Phones
          </Button>
          <Button 
            onClick={() => window.location.href = '#categories'}
            className="w-full sm:w-auto px-8 py-3.5 bg-transparent border-2 border-zinc-700 text-white hover:bg-zinc-800 transition-colors rounded-full font-bold text-sm md:text-base"
          >
            Browse Categories
          </Button>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;

