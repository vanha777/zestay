import Link from "next/link";
import Image from "next/image";
import FadeIn from "@/components/animations/FadeIn";
import StaggerContainer from "@/components/animations/StaggerContainer";
import StaggerItem from "@/components/animations/StaggerItem";


export const metadata = {
  title: "Living | Zestay",
  description: "The Zestay Standard: Premium furnished rooms with all bills included.",
};

export default function LivingPage() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <FadeIn className="relative px-6 py-24 md:py-32 max-w-[1440px] mx-auto flex flex-col items-center text-center">
        <span className="text-primary font-headline font-bold tracking-widest uppercase text-xs mb-6 inline-block bg-primary-container px-4 py-2 rounded-full">
          The Premium Experience
        </span>
        <h1 className="text-on-surface font-headline text-5xl md:text-[5rem] font-bold tracking-tighter leading-[1.05] mb-8 max-w-4xl">
          Everything you need. <br /> Nothing you don&apos;t.
        </h1>
        <p className="text-on-surface-variant text-xl md:text-2xl leading-relaxed max-w-2xl font-body">
          We&apos;ve eliminated the friction of renting. No buying furniture, no setting up utilities, no unexpected bills. Just unpack and start living.
        </p>
      </FadeIn>

      {/* The Zestay Standard Grid */}
      <section className="px-6 py-24 bg-surface-container-low rounded-[3rem] mx-4 md:ml-12 md:mr-24 mb-24">
        <div className="max-w-[1440px] mx-auto">
          <FadeIn className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <h2 className="text-on-surface font-headline text-4xl md:text-5xl font-bold tracking-tighter max-w-xl">
              The Zestay Standard
            </h2>
            <p className="text-on-surface-variant text-lg max-w-md font-body">
              Every detail has been curated to provide a hotel-quality experience with the warmth of a real home.
            </p>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <StaggerItem className="bg-surface p-10 rounded-[1.5rem] border-none shadow-[0_12px_40px_rgba(41,58,62,0.04)] hover:shadow-[0_12px_40px_rgba(41,58,62,0.12)] transition-shadow">
              <div className="w-14 h-14 rounded-2xl bg-primary-container flex items-center justify-center mb-6 text-primary">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <h3 className="font-headline font-bold text-2xl text-on-surface mb-4">Fully Furnished</h3>
              <p className="text-on-surface-variant leading-relaxed font-body">
                Designer furniture, premium mattresses, and tasteful decor. Bring your suitcase; we&apos;ve handled the rest.
              </p>
            </StaggerItem>

            {/* Feature 2 */}
            <StaggerItem className="bg-surface p-10 rounded-[1.5rem] border-none shadow-[0_12px_40px_rgba(41,58,62,0.04)] hover:shadow-[0_12px_40px_rgba(41,58,62,0.12)] transition-shadow">
              <div className="w-14 h-14 rounded-2xl bg-primary-container flex items-center justify-center mb-6 text-primary">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="font-headline font-bold text-2xl text-on-surface mb-4">All Bills Included</h3>
              <p className="text-on-surface-variant leading-relaxed font-body">
                Electricity, water, gas, and ultra-fast Wi-Fi are all wrapped into one transparent weekly payment.
              </p>
            </StaggerItem>

            {/* Feature 3 */}
            <StaggerItem className="bg-surface p-10 rounded-[1.5rem] border-none shadow-[0_12px_40px_rgba(41,58,62,0.04)] hover:shadow-[0_12px_40px_rgba(41,58,62,0.12)] transition-shadow">
              <div className="w-14 h-14 rounded-2xl bg-primary-container flex items-center justify-center mb-6 text-primary">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="font-headline font-bold text-2xl text-on-surface mb-4">Ready Essentials</h3>
              <p className="text-on-surface-variant leading-relaxed font-body">
                Kitchens fully stocked with appliances, cookware, and crockery. Bathrooms with initial luxury amenities.
              </p>
            </StaggerItem>
            
            {/* Feature 4 */}
            <StaggerItem className="bg-surface p-10 rounded-[1.5rem] border-none shadow-[0_12px_40px_rgba(41,58,62,0.04)] hover:shadow-[0_12px_40px_rgba(41,58,62,0.12)] transition-shadow lg:col-span-1">
              <div className="w-14 h-14 rounded-2xl bg-primary-container flex items-center justify-center mb-6 text-primary">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <h3 className="font-headline font-bold text-2xl text-on-surface mb-4">Professional Cleaning</h3>
              <p className="text-on-surface-variant leading-relaxed font-body">
                Regular professional cleaning of all shared spaces—kitchens, bathrooms, and living areas—ensuring a pristine environment.
              </p>
            </StaggerItem>

            {/* Flexible Terms Highlight */}
            <StaggerItem className="bg-gradient-to-br from-primary-fixed to-primary p-10 rounded-[1.5rem] shadow-[0_12px_40px_rgba(41,58,62,0.12)] lg:col-span-2 flex flex-col justify-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-surface rounded-full blur-[100px] opacity-20 -translate-y-1/2 translate-x-1/3"></div>
              <h3 className="font-headline font-bold text-3xl text-on-primary-fixed mb-4 relative z-10">Absolute Flexibility</h3>
              <p className="text-on-primary-fixed/90 leading-relaxed font-body max-w-lg mb-8 relative z-10 text-lg">
                We understand that modern professional life holds no certainties. That&apos;s why our agreements are built to adapt. Stay for a month, stay for a year. 
              </p>
              <Link href="/book" className="text-on-surface bg-surface w-fit px-8 py-3 rounded-xl font-headline font-bold hover:scale-95 transition-transform relative z-10">
                View Available Rooms
              </Link>
            </StaggerItem>

          </StaggerContainer>
        </div>
      </section>
    </div>
  );
}
