"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface FadeInProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  duration?: number;
  viewportMargin?: string;
}

export default function FadeIn({
  children,
  className = "",
  delay = 0,
  direction = "up",
  duration = 0.8,
  viewportMargin = "-100px",
}: FadeInProps) {
  const getInitialOffset = () => {
    switch (direction) {
      case "up":
        return { y: 30, x: 0 };
      case "down":
        return { y: -30, x: 0 };
      case "left":
        return { x: 30, y: 0 };
      case "right":
        return { x: -30, y: 0 };
      case "none":
        return { x: 0, y: 0 };
    }
  };

  const offset = getInitialOffset();

  return (
    <motion.div
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: viewportMargin as any }}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1] as any, // Sleek, editorial easing (easeOutExpo-ish)
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
