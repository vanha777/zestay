"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const tenantFeatures = [
  {
    title: "All Bills Included",
    desc: "Rent, power, water, and high-speed internet — all bundled into one simple weekly payment. No surprise bills.",
    icon: "payments",
    size: "md:col-span-2",
  },
  {
    title: "Move-in Ready",
    desc: "Fully furnished rooms with designer touches. Just bring your suitcase.",
    icon: "bed",
    size: "md:col-span-1",
  },
  {
    title: "Actually Flexible",
    desc: "Stay as long as you need. Perfect for relocators and professionals.",
    icon: "calendar_month",
    size: "md:col-span-1",
  },
  {
    title: "Inner-City Living",
    desc: "The best locations in Melbourne. Brunswick, Fitzroy, St Kilda, and more.",
    icon: "location_on",
    size: "md:col-span-1",
  },
  {
    title: "Lifestyle & Community",
    rotatingFeatures: [
      {
        title: "Curated Housemates",
        desc: "Live with like-minded professionals who value a quiet, clean home.",
        icon: "group",
      },
      {
        title: "Weekly Cleaning",
        desc: "Communal areas are professionally cleaned weekly to maintain high standards.",
        icon: "cleaning_services",
      },
      {
        title: "24/7 Support",
        desc: "Maintenance and support whenever you need it. We're just a message away.",
        icon: "support_agent",
      },
      {
        title: "Work From Home",
        desc: "Every room features a dedicated workspace and premium Wi-Fi.",
        icon: "laptop_mac",
      },
    ],
    size: "md:col-span-2",
  },
  {
    title: "Book Online",
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
} as any;

export default function BentoTenant() {
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
      {tenantFeatures.map((feature, i) => (
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
              <span className="text-4xl md:text-5xl font-headline font-bold text-on-primary-container tracking-tighter mb-2">
                Simple.
              </span>
              <span className="text-on-primary-container font-bold uppercase tracking-widest text-sm">
                Book in Minutes
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
