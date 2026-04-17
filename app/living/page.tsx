import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "Living | Zestay",
  description: "The Zestay Standard: Premium furnished rooms with all bills included.",
};

export default function LivingPage() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative px-6 py-24 md:py-32 max-w-7xl mx-auto flex flex-col items-center text-center">
        <span className="text-secondary font-headline font-bold tracking-widest uppercase text-xs mb-6 inline-block bg-secondary-container px-4 py-2 rounded-full">
          The Premium Experience
        </span>
        <h1 className="text-[#221b08] font-headline text-5xl md:text-7xl font-bold tracking-tighter leading-[1.1] mb-8 max-w-4xl">
          Everything you need. <br /> Nothing you don&apos;t.
        </h1>
        <p className="text-[#42484a] text-xl md:text-2xl leading-relaxed max-w-2xl font-body">
          We&apos;ve eliminated the friction of renting. No buying furniture, no setting up utilities, no unexpected bills. Just unpack and start living.
        </p>
      </section>

      {/* The Zestay Standard Grid */}
      <section className="px-6 py-24 bg-[#fff8f1]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <h2 className="text-[#221b08] font-headline text-4xl md:text-5xl font-bold tracking-tighter max-w-xl">
              The Zestay Standard
            </h2>
            <p className="text-[#42484a] text-lg max-w-md font-body">
              Every detail has been curated to provide a hotel-quality experience with the warmth of a real home.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-surface p-10 rounded-[2rem] border border-outline-variant/10 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-14 h-14 rounded-2xl bg-secondary-container flex items-center justify-center mb-6 text-secondary">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <h3 className="font-headline font-bold text-2xl text-[#221b08] mb-4">Fully Furnished</h3>
              <p className="text-[#42484a] leading-relaxed font-body">
                Designer furniture, premium mattresses, and tasteful decor. Bring your suitcase; we&apos;ve handled the rest.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-surface p-10 rounded-[2rem] border border-outline-variant/10 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-14 h-14 rounded-2xl bg-secondary-container flex items-center justify-center mb-6 text-secondary">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="font-headline font-bold text-2xl text-[#221b08] mb-4">All Bills Included</h3>
              <p className="text-[#42484a] leading-relaxed font-body">
                Electricity, water, gas, and ultra-fast Wi-Fi are all wrapped into one transparent weekly payment.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-surface p-10 rounded-[2rem] border border-outline-variant/10 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-14 h-14 rounded-2xl bg-secondary-container flex items-center justify-center mb-6 text-secondary">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="font-headline font-bold text-2xl text-[#221b08] mb-4">Ready Essentials</h3>
              <p className="text-[#42484a] leading-relaxed font-body">
                Kitchens fully stocked with appliances, cookware, and crockery. Bathrooms with initial luxury amenities.
              </p>
            </div>
            
            {/* Feature 4 */}
            <div className="bg-surface p-10 rounded-[2rem] border border-outline-variant/10 shadow-sm hover:shadow-md transition-shadow lg:col-span-1">
              <div className="w-14 h-14 rounded-2xl bg-secondary-container flex items-center justify-center mb-6 text-secondary">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <h3 className="font-headline font-bold text-2xl text-[#221b08] mb-4">Professional Cleaning</h3>
              <p className="text-[#42484a] leading-relaxed font-body">
                Regular professional cleaning of all shared spaces—kitchens, bathrooms, and living areas—ensuring a pristine environment.
              </p>
            </div>

            {/* Flexible Terms Highlight */}
            <div className="bg-[#221b08] p-10 rounded-[2rem] shadow-sm lg:col-span-2 flex flex-col justify-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
              <h3 className="font-headline font-bold text-3xl text-surface mb-4 relative z-10">Absolute Flexibility</h3>
              <p className="text-surface/80 leading-relaxed font-body max-w-lg mb-8 relative z-10 text-lg">
                We understand that modern professional life holds no certainties. That&apos;s why our agreements are built to adapt. Stay for a month, stay for a year. 
              </p>
              <Link href="/book" className="text-[#221b08] bg-surface w-fit px-8 py-3 rounded-full font-headline font-bold hover:scale-95 transition-transform relative z-10">
                View Available Rooms
              </Link>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
