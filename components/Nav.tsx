"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Nav() {
  const pathname = usePathname();

  const links = [
    { name: "Landlords", href: "/" },
    { name: "Tenants", href: "/tenant" },
    { name: "Living", href: "/living" },
    { name: "Community", href: "/community" },
    { name: "About", href: "/about" },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-[20px]">
      <div className="flex justify-between items-center px-8 py-4 max-w-7xl mx-auto">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/zestayLogo.png" alt="Zestay Logo" width={150} height={50} className="h-10 w-auto" priority />
          <span className="text-2xl font-bold tracking-tighter text-on-surface font-headline">Zestay</span>
        </Link>
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
        <div className="flex items-center gap-4">
          <Link href="/login" className="font-headline font-bold text-sm text-on-surface-variant hover:text-on-surface px-4 py-2 transition-all">
            Login
          </Link>
          <Link href="/book" className="bg-on-background text-surface px-6 py-2.5 rounded-[1.5rem] font-headline font-bold text-sm hover:scale-[1.02] active:scale-95 duration-150 ease-in-out inline-block border-none">
            Book Now
          </Link>
        </div>
      </div>
    </nav>
  );
}
