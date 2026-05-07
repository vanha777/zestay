import Image from "next/image";
import FadeIn from "@/components/animations/FadeIn";
import StaggerContainer from "@/components/animations/StaggerContainer";
import StaggerItem from "@/components/animations/StaggerItem";

export const metadata = {
  title: "About | Zestay",
  description: "Meet the founders behind Zestay. We created the living experience we wished we had.",
};

export default function AboutPage() {
  return (
    <main className="bg-surface text-on-surface">
      {/* Hero Section */}
      <header className="relative pt-32 pb-20 md:pt-48 md:pb-40 overflow-hidden bg-surface">
        <div className="max-w-[1440px] mx-auto px-6 md:pl-16 md:pr-32 grid md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-7 z-10">
            <FadeIn delay={0.1}>
              <h1 className="text-5xl md:text-[5rem] font-bold leading-[1.05] tracking-tighter mb-8 text-on-surface font-headline">
                Created by renters,<br />
                <span className="text-primary italic font-normal tracking-tight">For renters.</span><br />
                Our Zestay Story.
              </h1>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="text-lg md:text-xl text-on-surface-variant mb-10 max-w-xl leading-relaxed">
                We started Zestay because we were exhausted by the traditional rental market. The endless inspections, hidden bills, and complete gamble of who your housemates would be.
              </p>
            </FadeIn>
          </div>
          <FadeIn delay={0.4} direction="left" className="md:col-span-5 relative">
            <div className="aspect-[4/5] rounded-[2rem] overflow-hidden shadow-[0_12px_40px_rgba(41,58,62,0.08)] rotate-2 md:rotate-3 translate-x-4 md:translate-x-8">
              <Image
                alt="Zestay founders"
                className="w-full h-full object-cover"
                src="/stock/founder.JPG"
                width={800}
                height={1000}
                priority
              />
            </div>
          </FadeIn>
        </div>
        <div className="absolute top-0 right-0 w-1/2 h-full bg-surface-container-low -z-10 rounded-l-[5rem]"></div>
      </header>

      {/* Philosophy Section */}
      <section className="py-32 bg-surface">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <FadeIn className="mb-20 md:mb-32 max-w-2xl md:pl-12">
            <h2 className="text-primary text-sm font-bold uppercase tracking-[0.2em] mb-6 font-headline">Our Philosophy</h2>
            <h3 className="text-4xl md:text-6xl font-bold text-on-surface leading-[1.1] tracking-tighter font-headline">The living experience we wished we had.</h3>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Total Transparency",
                desc: "The price you see is the price you pay. No hidden connection fees or traps.",
                icon: "visibility"
              },
              {
                title: "Rapid Response",
                desc: "We live and breathe Melbourne real estate. If something breaks, we fix it fast.",
                icon: "bolt"
              },
              {
                title: "Design First",
                desc: "We furnish our homes the way we want to live. Premium quality, always.",
                icon: "chair"
              }
            ].map((value, i) => (
              <FadeIn key={i} delay={i * 0.1} className="bg-surface-container-low p-10 rounded-[2.5rem] hover:bg-surface-container transition-colors">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-8">
                  <span className="material-symbols-outlined text-4xl font-light">{value.icon}</span>
                </div>
                <h4 className="text-2xl font-bold font-headline mb-4 tracking-tight">{value.title}</h4>
                <p className="text-on-surface-variant text-lg leading-relaxed font-body">{value.desc}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Personal Guarantee */}
      <section className="py-32 bg-surface-container-low rounded-[3rem] mx-4 md:ml-12 md:mr-24 overflow-hidden relative mb-32">
        <div className="max-w-[1440px] mx-auto px-6 md:px-16 grid lg:grid-cols-2 gap-20 items-center">
          <FadeIn direction="right">
            <h2 className="text-4xl md:text-6xl font-bold mb-10 leading-[1.05] tracking-tighter font-headline text-on-surface">Our Personal <br /><span className="text-primary italic font-normal tracking-tight">Guarantee.</span></h2>
            <p className="text-xl text-on-surface-variant mb-8 leading-relaxed">
              We manage every property personally. When you live with us, you are relying on real people who genuinely care about your experience, not a faceless agency.
            </p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-surface">
                <span className="material-symbols-outlined">verified</span>
              </div>
              <span className="font-bold text-on-surface font-headline text-xl">Patrick & Sofia, Founders</span>
            </div>
          </FadeIn>
          <FadeIn delay={0.2} direction="left" className="relative group">
            <div className="rounded-[2.5rem] overflow-hidden shadow-[0_12px_40px_rgba(41,58,62,0.12)] aspect-[4/3] rotate-1">
              <Image
                alt="Founder work"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070&auto=format&fit=crop"
                width={800}
                height={800}
              />
            </div>
          </FadeIn>
        </div>
      </section>
    </main>
  );
}
