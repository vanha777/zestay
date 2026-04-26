"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const features = [
  {
    title: "Above-Market Rent",
    desc: "We consistently offer rental returns above standard market rates, maximizing your yield from day one.",
    icon: "trending_up",
    size: "md:col-span-2",
  },
  {
    title: "Guaranteed",
    desc: "Rent is paid on time, every time. Guaranteed by our corporate structure.",
    icon: "verified_user",
    size: "md:col-span-1",
  },
  {
    title: "Zero Vacancy",
    desc: "We take over the lease immediately. Day 1 lease commencement.",
    icon: "event_available",
    size: "md:col-span-1",
  },
  {
    title: "4% Annual Increase",
    desc: "Fixed, predictable growth built into the lease agreement.",
    icon: "percent",
    size: "md:col-span-1",
  },
  {
    title: "Management & Protection",
    rotatingFeatures: [
      {
        title: "End-to-End Management",
        desc: "Zero occupant contact. We handle all minor maintenance and professional cleaning.",
        icon: "engineering",
      },
      {
        title: "RTA Compliant",
        desc: "Everything done by the book under standard Victorian tenancy laws.",
        icon: "gavel",
      },
      {
        title: "Public Liability",
        desc: "Full insurance coverage specifically tailored for our co-living model.",
        icon: "shield",
      },
      {
        title: "No structural alterations",
        desc: "We never make structural changes. Your property remains exactly as it is.",
        icon: "check_box_outline_blank",
      },
    ],
    size: "md:col-span-2",
  },
  {
    title: "100% Peace of Mind",
    desc: "",
    isHighlight: true,
    size: "md:col-span-1",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

export default function BentoPartnership() {
  const [rotationIndex, setRotationIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setRotationIndex((prev) => (prev + 1) % 4);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-4 gap-6"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      {features.map((feature, i) => (
        <motion.div
          key={i}
          variants={itemVariants}
          className={`relative p-10 rounded-[2.5rem] flex flex-col gap-6 transition-all duration-300 ${
            feature.isHighlight
              ? "bg-primary-container justify-center items-center text-center"
              : "bg-surface-container-low hover:bg-surface-container"
          } ${feature.size}`}
        >
          {feature.isHighlight ? (
            <div className="flex flex-col items-center">
              <span className="text-6xl md:text-8xl font-headline font-bold text-on-primary-container tracking-tighter mb-2">
                100%
              </span>
              <span className="text-on-primary-container font-bold uppercase tracking-widest text-sm">
                Peace of Mind
              </span>
            </div>
          ) : feature.rotatingFeatures ? (
            <AnimatePresence mode="wait">
              <motion.div
                key={rotationIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col gap-6"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-4xl font-light">
                    {feature.rotatingFeatures[rotationIndex].icon}
                  </span>
                </div>
                <div className="space-y-4">
                  <h4 className="font-bold font-headline text-2xl tracking-tight text-on-surface">
                    {feature.rotatingFeatures[rotationIndex].title}
                  </h4>
                  <p className="text-on-surface-variant/90 text-lg leading-relaxed font-body">
                    {feature.rotatingFeatures[rotationIndex].desc}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          ) : (
            <>
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-4xl font-light">
                  {feature.icon}
                </span>
              </div>
              <div className="space-y-4">
                <h4 className="font-bold font-headline text-2xl tracking-tight text-on-surface">
                  {feature.title}
                </h4>
                <p className="text-on-surface-variant/90 text-lg leading-relaxed font-body">
                  {feature.desc}
                </p>
              </div>
            </>
          )}
        </motion.div>
      ))}
    </motion.div>
  );
}
