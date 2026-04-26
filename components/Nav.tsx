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
    <nav className="fixed top-0 w-full z-50 bg-[#fff8f1]/80 backdrop-blur-md">
      <div className="flex justify-between items-center px-8 py-4 max-w-7xl mx-auto">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/zestayLogo.png" alt="Zestay Logo" width={150} height={50} className="h-10 w-auto" priority />
          <span className="text-2xl font-bold tracking-tighter text-[#221b08] font-headline">Zestay</span>
        </Link>
        <div className="hidden md:flex items-center space-x-8">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`font-headline font-bold text-sm tracking-tight transition-colors duration-300 pb-1 ${
                  isActive
                    ? "text-[#476369] border-b-2 border-[#476369]"
                    : "text-[#42484a] hover:text-[#221b08] border-b-2 border-transparent"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>
        <Link href="/book" className="bg-on-background text-surface px-6 py-2.5 rounded-full font-headline font-bold text-sm hover:scale-95 duration-150 ease-in-out inline-block border-none">
          Book Now
        </Link>
      </div>
    </nav>
  );
}
