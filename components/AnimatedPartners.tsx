"use client";

import { useState, useEffect } from "react";

const partners = [
  "Nelson Alexander",
  "River Edge Real Estate",
  // "Jellis Craig",
  // "Ray White"
];

export default function AnimatedPartners() {
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setIndex((current) => (current + 1) % partners.length);
        setFade(true);
      }, 500);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <span className={`font-bold text-primary-container transition-opacity duration-500 block mt-1 ${fade ? 'opacity-100' : 'opacity-0'}`}>
      {partners[index]}
    </span>
  );
}
