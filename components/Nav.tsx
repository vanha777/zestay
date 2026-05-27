"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function Nav() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { name: "Tenants", href: "/" },
    { name: "Landlords", href: "/landlord" },
    { name: "Living", href: "/living" },
    { name: "Community", href: "/community" },
    { name: "About", href: "/about" },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-[20px] border-b border-outline-variant/10">
      <div className="flex justify-between items-center px-6 md:px-8 py-4 max-w-7xl mx-auto relative">
        {/* Logo and Brand */}
        <Link href="/" className="flex items-center gap-3 z-50">
          <Image
            src="/zestayLogo.png"
            alt="Zestay Logo"
            width={150}
            height={50}
            className="h-10 w-auto"
            priority
          />
          <span className="text-2xl font-bold tracking-tighter text-on-surface font-headline">
            Zestay
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-2">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`font-headline font-bold text-sm tracking-tight transition-all duration-300 px-4 py-2 rounded-xl ${
                  isActive
                    ? "text-primary bg-primary-container/40"
                    : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>

        {/* Desktop CTA & Mobile Toggle */}
        <div className="flex items-center gap-3 md:gap-4 z-50">
          <Link
            href="/login"
            className="hidden sm:inline-block font-headline font-bold text-sm text-on-surface-variant hover:text-on-surface px-4 py-2 transition-all"
          >
            Login
          </Link>
          <Link
            href="/book"
            className="bg-on-background text-surface px-5 py-2.5 rounded-[1.5rem] font-headline font-bold text-xs md:text-sm hover:scale-[1.02] active:scale-95 duration-150 ease-in-out inline-block border-none"
          >
            Book Now
          </Link>

          {/* Mobile Hamburger toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex md:hidden items-center justify-center p-2 text-on-surface hover:bg-surface-container-low rounded-xl transition-colors focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            <span className="material-symbols-outlined text-2xl font-light">
              {isOpen ? "close" : "menu"}
            </span>
          </button>
        </div>

        {/* Mobile Fullscreen Menu Dropdown */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="absolute top-full left-0 w-full bg-surface/95 backdrop-blur-xl border-b border-outline-variant/20 shadow-2xl px-8 py-10 flex flex-col gap-6 md:hidden z-40"
            >
              <div className="flex flex-col gap-4">
                {links.map((link, i) => {
                  const isActive = pathname === link.href;
                  return (
                    <motion.div
                      key={link.name}
                      initial={{ opacity: 0, x: -15 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05, duration: 0.4 }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className={`block font-headline font-bold text-3xl tracking-tight py-2 transition-all ${
                          isActive
                            ? "text-primary italic translate-x-2"
                            : "text-on-surface-variant hover:text-on-surface"
                        }`}
                      >
                        {link.name}
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
              
              <hr className="border-outline-variant/20" />
              
              <div className="flex flex-col gap-4">
                <Link
                  href="/login"
                  onClick={() => setIsOpen(false)}
                  className="font-headline font-bold text-xl text-on-surface-variant hover:text-on-surface py-2"
                >
                  Login
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
