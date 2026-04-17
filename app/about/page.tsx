import Image from "next/image";

export const metadata = {
  title: "About | Zestay",
  description: "Meet the founders behind Zestay. We created the living experience we wished we had.",
};

export default function AboutPage() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative px-6 py-24 md:py-32 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <div>
          <span className="text-[#476369] font-headline font-bold tracking-widest uppercase text-xs mb-6 inline-block bg-[#476369]/10 px-4 py-2 rounded-full">
            Our Story
          </span>
          <h1 className="text-[#221b08] font-headline text-5xl md:text-7xl font-bold tracking-tighter leading-[1.1] mb-8">
            Created by renters, <br /> for renters.
          </h1>
          <p className="text-[#42484a] text-xl leading-relaxed font-body mb-6">
            We started Zestay because we were exhausted by the traditional rental market in Melbourne. The endless inspections, the hidden utility bills, the stress of buying furniture for a 12-month lease, and the complete gamble of who your housemates would be.
          </p>
          <p className="text-[#42484a] text-xl leading-relaxed font-body">
            We believed there had to be a better way for modern professionals and relocators to land in Australia and immediately feel at home. So, we built it.
          </p>
        </div>
        <div className="relative">
          {/* Placeholder for Founders Image - Use an organic, wide shape */}
          <div className="w-full h-[500px] bg-secondary-container rounded-[3rem] overflow-hidden relative flex items-center justify-center">
            {/* When the user has a real image of Patrick & Sofia, they can uncomment the Image tag below */}
            {/* <Image 
              src="/founders.jpeg" 
              alt="Patrick and Sofia, founders of Zestay" 
              fill 
              className="object-cover"
            /> */}
            <div className="text-center p-8">
              <svg className="w-16 h-16 mx-auto text-secondary mb-4 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="text-secondary font-headline font-bold text-lg">Patrick & Sofia</p>
              <p className="text-secondary/70 text-sm font-body">Founders Placeholder (Add Photo)</p>
            </div>
          </div>
          {/* Decorative Blob */}
          <div className="absolute -z-10 -bottom-10 -left-10 w-64 h-64 bg-primary/20 rounded-full blur-3xl"></div>
        </div>
      </section>

      {/* Values Section */}
      <section className="px-6 py-24 bg-[#221b08] text-surface">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <h2 className="font-headline text-4xl md:text-5xl font-bold tracking-tighter mb-6">
            The Zestay Guarantee
          </h2>
          <p className="text-surface/70 text-lg max-w-2xl mx-auto font-body">
            We manage every property personally. When you live with us, you are relying on real people who genuinely care about your experience, not a faceless agency.
          </p>
        </div>

        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="text-center">
            <h3 className="font-headline font-bold text-2xl text-primary mb-4">Total Transparency</h3>
            <p className="text-surface/80 leading-relaxed font-body text-sm">
              The price you see is the price you pay. No hidden connection fees, no end-of-lease cleaning traps. 
            </p>
          </div>
          <div className="text-center">
            <h3 className="font-headline font-bold text-2xl text-primary mb-4">Rapid Response</h3>
            <p className="text-surface/80 leading-relaxed font-body text-sm">
              We live and breathe Melbourne real estate. If something breaks, we fix it fast. We have trades on standby.
            </p>
          </div>
          <div className="text-center">
            <h3 className="font-headline font-bold text-2xl text-primary mb-4">Design First</h3>
            <p className="text-surface/80 leading-relaxed font-body text-sm">
              We furnish our homes the way we want to live. Premium mattresses, beautiful art, and comfortable spaces.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
