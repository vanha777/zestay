"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function HeroInteractiveSlogan() {
  const [hovered, setHovered] = useState<"room" | "people" | "city" | null>(null);

  const wordRevealVariants: any = {
    hidden: { y: "110%" },
    visible: (i: number) => ({
      y: 0,
      transition: {
        delay: 0.15 + i * 0.12,
        duration: 0.9,
        ease: [0.16, 1, 0.3, 1] as any, // easeOutExpo curve
      },
    }),
  };

  return (
    <div className="flex flex-col md:flex-row md:items-start gap-1 md:gap-6 font-headline mb-8 select-none">
      {/* Innovative 'your' design: text-stroke outline that fills in on hover */}
      <div className="relative">
        <motion.span
          className="text-6xl md:text-[8rem] font-extralight tracking-tighter lowercase block cursor-default select-none leading-none"
          style={{
            WebkitTextStroke: "1.5px var(--color-on-surface)",
            color: "rgba(18, 18, 18, 0)",
          } as any}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 0.35, y: 0 }}
          whileHover={{
            opacity: 0.95,
            color: "rgba(18, 18, 18, 1)",
            WebkitTextStroke: "1.5px rgba(18, 18, 18, 0)",
          } as any}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          your
        </motion.span>
      </div>

      {/* Animated Nouns Stack */}
      <h1 className="text-5xl md:text-[6.2rem] font-bold leading-[0.95] tracking-tighter text-on-surface flex flex-col items-start">
        {/* ROOM */}
        <span className="overflow-hidden inline-block h-[1.25em] relative">
          <motion.span
            custom={0}
            initial="hidden"
            animate="visible"
            variants={wordRevealVariants}
            className="inline-flex items-center gap-[0.25em] cursor-pointer"
            onMouseEnter={() => setHovered("room")}
            onMouseLeave={() => setHovered(null)}
            onTouchStart={() => setHovered(hovered === "room" ? null : "room")}
          >
            <span>room</span>
            <motion.span
              initial={{ width: 0, opacity: 0, scale: 0.8 }}
              animate={
                hovered === "room"
                  ? { width: "1.4em", opacity: 1, scale: 1 }
                  : { width: 0, opacity: 0, scale: 0.8 }
              }
              transition={{ type: "spring", stiffness: 220, damping: 22 }}
              className="inline-block h-[0.75em] overflow-hidden rounded-full border border-outline-variant/30 align-middle bg-surface-container-high"
            >
              <img
                src="/stock/living.jpeg"
                alt="Bedroom Preview"
                className="w-full h-full object-cover"
              />
            </motion.span>
            <span>.</span>
          </motion.span>
        </span>

        {/* PEOPLE */}
        <span className="overflow-hidden inline-block h-[1.25em] relative">
          <motion.span
            custom={1}
            initial="hidden"
            animate="visible"
            variants={wordRevealVariants}
            className="inline-flex items-center gap-[0.25em] cursor-pointer"
            onMouseEnter={() => setHovered("people")}
            onMouseLeave={() => setHovered(null)}
            onTouchStart={() => setHovered(hovered === "people" ? null : "people")}
          >
            <span className="text-primary italic font-normal tracking-tight">
              people
            </span>
            <motion.span
              initial={{ width: 0, opacity: 0, scale: 0.8 }}
              animate={
                hovered === "people"
                  ? { width: "1.6em", opacity: 1, scale: 1 }
                  : { width: 0, opacity: 0, scale: 0.8 }
              }
              transition={{ type: "spring", stiffness: 220, damping: 22 }}
              className="inline-flex items-center justify-center -space-x-[0.3em] overflow-hidden align-middle h-[0.75em] px-[0.1em] bg-surface-container-low rounded-full border border-outline-variant/20"
            >
              <img
                src="/stock/founder.JPG"
                alt="Member 1"
                className="h-full aspect-square rounded-full object-cover border border-surface shadow-sm"
              />
              <img
                src="/stock/founder2.png"
                alt="Member 2"
                className="h-full aspect-square rounded-full object-cover border border-surface shadow-sm"
              />
              <img
                src="/stock/founder3.png"
                alt="Member 3"
                className="h-full aspect-square rounded-full object-cover border border-surface shadow-sm"
              />
            </motion.span>
            <span className="italic font-normal">.</span>
          </motion.span>
        </span>

        {/* CITY */}
        <span className="overflow-hidden inline-block h-[1.25em] relative">
          <motion.span
            custom={2}
            initial="hidden"
            animate="visible"
            variants={wordRevealVariants}
            className="inline-flex items-center gap-[0.25em] cursor-pointer"
            onMouseEnter={() => setHovered("city")}
            onMouseLeave={() => setHovered(null)}
            onTouchStart={() => setHovered(hovered === "city" ? null : "city")}
          >
            <span>city</span>
            <motion.span
              initial={{ width: 0, opacity: 0, scale: 0.8 }}
              animate={
                hovered === "city"
                  ? { width: "1.15em", opacity: 1, scale: 1 }
                  : { width: 0, opacity: 0, scale: 0.8 }
              }
              transition={{ type: "spring", stiffness: 220, damping: 22 }}
              className="inline-flex items-center justify-center h-[0.75em] overflow-hidden rounded-full border border-outline-variant/30 bg-secondary align-middle"
            >
              <div className="w-full h-full flex items-center justify-center text-on-secondary">
                <span className="material-symbols-outlined text-[0.45em] leading-none animate-bounce">
                  location_on
                </span>
              </div>
            </motion.span>
            <span>.</span>
          </motion.span>
        </span>
      </h1>
    </div>
  );
}
