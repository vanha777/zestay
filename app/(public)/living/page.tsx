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
    <main className="bg-surface text-on-surface">
      {/* Hero Section */}
      <header className="relative pt-32 pb-20 md:pt-48 md:pb-40 overflow-hidden bg-surface text-center">
        <div className="max-w-[1440px] mx-auto px-6">
          <FadeIn delay={0.1}>
            <h1 className="text-5xl md:text-[6rem] font-bold leading-[1] tracking-tighter mb-10 text-on-surface font-headline max-w-5xl mx-auto">
              Everything you need.<br />
              <span className="text-primary italic font-normal tracking-tight">Nothing you don't.</span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-xl md:text-2xl text-on-surface-variant mb-12 max-w-2xl mx-auto leading-relaxed">
              We've eliminated the friction of renting. No buying furniture, no utility setups, no surprise bills. Just unpack and start living.
            </p>
          </FadeIn>
          <FadeIn delay={0.3}>
            <Link className="bg-on-background text-surface px-10 py-5 rounded-[1.5rem] font-headline font-bold text-lg transition-all hover:scale-[1.02] active:scale-95 shadow-[0_12px_40px_rgba(41,58,62,0.08)]" href="/book">
              Explore The Standard
            </Link>
          </FadeIn>
        </div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-surface-container-low/50 to-transparent -z-10"></div>
      </header>

      {/* The Zestay Standard Grid */}
      <section className="py-32 bg-surface-container-low rounded-[3rem] mx-4 md:ml-12 md:mr-24 overflow-hidden mb-32">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <FadeIn className="mb-20 md:mb-32 max-w-2xl">
            <h2 className="text-primary text-sm font-bold uppercase tracking-[0.2em] mb-6 font-headline">The Standard</h2>
            <h3 className="text-4xl md:text-6xl font-bold text-on-surface leading-[1.1] tracking-tighter font-headline">Hotel-quality comfort, <br />home-quality warmth.</h3>
          </FadeIn>
          
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Bento Card 1 */}
            <StaggerItem className="md:col-span-2 bg-surface p-12 rounded-[2.5rem] flex flex-col gap-8 transition-all hover:bg-surface-container shadow-sm">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-4xl font-light">bed</span>
              </div>
              <div>
                <h4 className="font-bold font-headline text-3xl mb-4 tracking-tight">Fully Furnished</h4>
                <p className="text-on-surface-variant text-lg leading-relaxed font-body">
                  Designer furniture, premium mattresses, and tasteful decor. Bring your suitcase; we've handled everything else.
                </p>
              </div>
            </StaggerItem>

            {/* Bento Card 2 */}
            <StaggerItem className="md:col-span-2 bg-surface p-12 rounded-[2.5rem] flex flex-col gap-8 transition-all hover:bg-surface-container shadow-sm">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-4xl font-light">payments</span>
              </div>
              <div>
                <h4 className="font-bold font-headline text-3xl mb-4 tracking-tight">All Bills Included</h4>
                <p className="text-on-surface-variant text-lg leading-relaxed font-body">
                  Electricity, water, gas, and ultra-fast Wi-Fi are all wrapped into one transparent weekly payment. No surprise invoices.
                </p>
              </div>
            </StaggerItem>

            {/* Bento Card 3 */}
            <StaggerItem className="md:col-span-1 bg-surface p-10 rounded-[2.5rem] flex flex-col gap-6 transition-all hover:bg-surface-container shadow-sm">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-3xl font-light">chair</span>
              </div>
              <h4 className="font-bold font-headline text-xl tracking-tight">Ready Essentials</h4>
              <p className="text-on-surface-variant leading-relaxed font-body">
                Kitchens fully stocked with appliances, cookware, and crockery.
              </p>
            </StaggerItem>

            {/* Bento Card 4 */}
            <StaggerItem className="md:col-span-1 bg-surface p-10 rounded-[2.5rem] flex flex-col gap-6 transition-all hover:bg-surface-container shadow-sm">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-3xl font-light">cleaning_services</span>
              </div>
              <h4 className="font-bold font-headline text-xl tracking-tight">Cleaned Weekly</h4>
              <p className="text-on-surface-variant leading-relaxed font-body">
                Regular professional cleaning of all shared spaces and living areas.
              </p>
            </StaggerItem>

            {/* Bento Card 5 Highlight */}
            <StaggerItem className="md:col-span-2 bg-gradient-to-br from-primary-fixed to-primary p-12 rounded-[2.5rem] flex flex-col justify-center relative overflow-hidden shadow-lg group cursor-pointer">
              <div className="absolute top-0 right-0 w-64 h-64 bg-surface rounded-full blur-[100px] opacity-20 -translate-y-1/2 translate-x-1/3 group-hover:scale-125 transition-transform duration-700"></div>
              <h4 className="font-bold font-headline text-4xl text-on-primary-fixed mb-4 relative z-10 tracking-tighter">Absolute Flexibility</h4>
              <p className="text-on-primary-fixed-variant leading-relaxed font-body max-w-lg relative z-10 text-lg">
                Modern life holds no certainties. Our agreements adapt to you. Stay for a month, stay for a year.
              </p>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      {/* CTA Block */}
      <section className="py-32 px-6">
        <FadeIn className="max-w-[1440px] mx-auto bg-on-surface text-surface rounded-[3rem] p-16 md:p-32 text-center overflow-hidden relative shadow-[0_12px_40px_rgba(41,58,62,0.12)]">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary rounded-full blur-[120px] opacity-10 -translate-y-1/2 translate-x-1/2"></div>
          <div className="relative z-10">
            <h2 className="font-headline text-5xl md:text-7xl font-bold tracking-tighter leading-[1.05] mb-8">
              Experience the standard.
            </h2>
            <Link href="/book" className="bg-primary text-on-primary px-12 py-5 rounded-2xl font-headline font-bold text-xl hover:scale-105 transition-transform inline-block">
              Find Your Space
            </Link>
          </div>
        </FadeIn>
      </section>
    </main>
  );
}
