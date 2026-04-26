import Image from "next/image";

export const metadata = {
  title: "About | Zestay",
  description: "Meet the founders behind Zestay. We created the living experience we wished we had.",
};

export default function AboutPage() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative px-6 md:pl-16 md:pr-32 py-24 md:py-32 max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
        <div>
          <span className="text-primary font-headline font-bold tracking-widest uppercase text-xs mb-6 inline-block bg-primary-container px-4 py-2 rounded-full">
            Our Story
          </span>
          <h1 className="text-on-surface font-headline text-5xl md:text-[5rem] font-bold tracking-tighter leading-[1.05] mb-8">
            Created by renters, <br /> for <span className="text-primary italic font-normal tracking-tight">renters.</span>
          </h1>
          <p className="text-on-surface-variant text-xl leading-relaxed font-body mb-6">
            We started Zestay because we were exhausted by the traditional rental market in Melbourne. The endless inspections, the hidden utility bills, the stress of buying furniture for a 12-month lease, and the complete gamble of who your housemates would be.
          </p>
          <p className="text-on-surface-variant text-xl leading-relaxed font-body">
            We believed there had to be a better way for modern professionals and relocators to land in Australia and immediately feel at home. So, we built it.
          </p>
        </div>
        <div className="relative">
          {/* Founders Image */}
          <div className="w-full h-[550px] rounded-[2.5rem] overflow-hidden relative flex items-center justify-center group shadow-[0_12px_40px_rgba(41,58,62,0.12)] rotate-1">
            <Image
              src="/stock/founders2.png"
              alt="Patrick and Sofia, founders of Zestay"
              fill
              className="object-cover object-center transition-transform duration-1000 group-hover:scale-105"
            />
          </div>
          {/* Decorative Blob */}
          <div className="absolute -z-10 -bottom-10 -left-10 w-64 h-64 bg-primary-fixed rounded-full blur-3xl opacity-60"></div>
        </div>
      </section>

      {/* Values Section */}
      <section className="px-6 py-32 bg-surface-container-low text-on-surface rounded-[3rem] mx-4 md:ml-12 md:mr-24 mb-24 relative overflow-hidden">
        <div className="max-w-[1440px] mx-auto text-center mb-20">
          <h2 className="font-headline text-4xl md:text-6xl font-bold tracking-tighter mb-6 text-on-surface">
            The Zestay Guarantee
          </h2>
          <p className="text-on-surface-variant text-xl max-w-2xl mx-auto font-body leading-relaxed">
            We manage every property personally. When you live with us, you are relying on real people who genuinely care about your experience, not a faceless agency.
          </p>
        </div>

        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center bg-surface p-10 rounded-[1.5rem] shadow-[0_12px_40px_rgba(41,58,62,0.04)] transition-all duration-300 hover:shadow-[0_12px_40px_rgba(41,58,62,0.08)] hover:-translate-y-2">
            <div className="w-16 h-16 bg-primary-container rounded-full flex items-center justify-center text-primary mx-auto mb-6">
              <span className="material-symbols-outlined">visibility</span>
            </div>
            <h3 className="font-headline font-bold text-2xl text-on-surface mb-4">Total Transparency</h3>
            <p className="text-on-surface-variant leading-relaxed font-body text-base">
              The price you see is the price you pay. No hidden connection fees, no end-of-lease cleaning traps.
            </p>
          </div>
          <div className="text-center bg-surface p-10 rounded-[1.5rem] shadow-[0_12px_40px_rgba(41,58,62,0.04)] transition-all duration-300 hover:shadow-[0_12px_40px_rgba(41,58,62,0.08)] hover:-translate-y-2">
            <div className="w-16 h-16 bg-primary-container rounded-full flex items-center justify-center text-primary mx-auto mb-6">
              <span className="material-symbols-outlined">bolt</span>
            </div>
            <h3 className="font-headline font-bold text-2xl text-on-surface mb-4">Rapid Response</h3>
            <p className="text-on-surface-variant leading-relaxed font-body text-base">
              We live and breathe Melbourne real estate. If something breaks, we fix it fast. We have trades on standby.
            </p>
          </div>
          <div className="text-center bg-surface p-10 rounded-[1.5rem] shadow-[0_12px_40px_rgba(41,58,62,0.04)] transition-all duration-300 hover:shadow-[0_12px_40px_rgba(41,58,62,0.08)] hover:-translate-y-2">
            <div className="w-16 h-16 bg-primary-container rounded-full flex items-center justify-center text-primary mx-auto mb-6">
              <span className="material-symbols-outlined">chair</span>
            </div>
            <h3 className="font-headline font-bold text-2xl text-on-surface mb-4">Design First</h3>
            <p className="text-on-surface-variant leading-relaxed font-body text-base">
              We furnish our homes the way we want to live. Premium mattresses, beautiful art, and comfortable spaces.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
