import Link from "next/link";
import Image from "next/image";
import FadeIn from "@/components/animations/FadeIn";
import StaggerContainer from "@/components/animations/StaggerContainer";
import StaggerItem from "@/components/animations/StaggerItem";

export const metadata = {
  title: "Community | Zestay",
  description: "Who you live with matters. Join a vetted community of professionals and explorers.",
};

export default function CommunityPage() {
  return (
    <main className="bg-surface text-on-surface">
      {/* Hero Section */}
      <header className="relative pt-32 pb-20 md:pt-48 md:pb-40 overflow-hidden bg-surface">
        <div className="max-w-[1440px] mx-auto px-6 md:pl-16 md:pr-32 grid md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-7 z-10">
            <FadeIn delay={0.1}>
              <h1 className="text-5xl md:text-[5rem] font-bold leading-[1.05] tracking-tighter mb-8 text-on-surface font-headline">
                Who you live with <br />
                <span className="text-primary italic font-normal tracking-tight">Matters most.</span><br />
                No drama, just home.
              </h1>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="text-lg md:text-xl text-on-surface-variant mb-10 max-w-xl leading-relaxed">
                We curate our properties to ensure you're sharing with respectful, driven, and like-minded professionals. Vetted for compatibility, curated for community.
              </p>
            </FadeIn>
          </div>
          <FadeIn delay={0.4} direction="left" className="md:col-span-5 relative">
            <div className="aspect-[4/5] rounded-[2rem] overflow-hidden shadow-[0_12px_40px_rgba(41,58,62,0.08)] rotate-2 md:rotate-3 translate-x-4 md:translate-x-8">
              <Image
                alt="Community living"
                className="w-full h-full object-cover"
                src="/stock/living.jpeg"
                width={800}
                height={1000}
                priority
              />
            </div>
            <div className="absolute -bottom-10 -left-10 bg-primary-container p-8 rounded-[1.5rem] shadow-[0_12px_40px_rgba(41,58,62,0.08)] hidden md:block border border-surface/50 backdrop-blur-md">
              <div className="text-4xl font-headline font-bold text-on-primary-container mb-1 tracking-tighter">50+</div>
              <div className="text-xs uppercase tracking-widest font-bold text-primary font-body">Global Professionals</div>
            </div>
          </FadeIn>
        </div>
        <div className="absolute top-0 right-0 w-1/2 h-full bg-surface-container-low -z-10 rounded-l-[5rem]"></div>
      </header>

      {/* Community Pillars */}
      <section className="py-32 bg-surface">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <FadeIn className="mb-20 md:mb-32 max-w-2xl md:pl-12">
            <h2 className="text-primary text-sm font-bold uppercase tracking-[0.2em] mb-6 font-headline">The People</h2>
            <h3 className="text-4xl md:text-6xl font-bold text-on-surface leading-[1.1] tracking-tighter font-headline">Carefully vetted, <br />individually curated.</h3>
          </FadeIn>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-32">
            <FadeIn direction="right" className="space-y-8">
              <div className="space-y-4">
                <h4 className="text-3xl font-bold font-headline tracking-tight">Instant Network</h4>
                <p className="text-on-surface-variant text-lg leading-relaxed">
                  Connect with our local network immediately. From recommending the best cafes to introducing you to local sports clubs, we help you integrate into Melbourne life.
                </p>
              </div>
              <div className="space-y-4">
                <h4 className="text-3xl font-bold font-headline tracking-tight">Secure & Private</h4>
                <p className="text-on-surface-variant text-lg leading-relaxed">
                  While community is great, privacy is essential. Every room is a private sanctuary featuring secure locks, giving you absolute peace of mind.
                </p>
              </div>
            </FadeIn>
            <FadeIn direction="left" className="bg-surface-container-low p-12 rounded-[3rem] relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
               <p className="text-2xl font-headline font-bold italic text-on-surface relative z-10 leading-relaxed mb-8">
                 &quot;Having a welcoming group of housemates made the entire relocation effortless. I felt at home from day one.&quot;
               </p>
               <div className="flex items-center gap-4 relative z-10">
                 <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="material-symbols-outlined text-primary">person</span>
                 </div>
                 <div>
                   <p className="font-bold">Jason</p>
                   <p className="text-xs text-on-surface-variant uppercase tracking-widest">Sydney &rarr; Melbourne</p>
                 </div>
               </div>
            </FadeIn>
          </div>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Vetted Professionals", desc: "Every housemate is background checked and verified for professional standing.", icon: "verified" },
              { title: "Quiet Enjoyment", desc: "Our homes are designed for rest and focus, with strict rules on noise and guests.", icon: "notifications_off" },
              { title: "Global Community", desc: "Meet people from all over the world establishing their lives in Melbourne.", icon: "public" }
            ].map((pillar, i) => (
              <StaggerItem key={i} className="bg-surface-container-low p-10 rounded-[2.5rem] hover:bg-surface-container transition-colors text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary mx-auto mb-8">
                  <span className="material-symbols-outlined text-4xl font-light">{pillar.icon}</span>
                </div>
                <h4 className="text-2xl font-bold font-headline mb-4 tracking-tight">{pillar.title}</h4>
                <p className="text-on-surface-variant text-base leading-relaxed">{pillar.desc}</p>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* CTA Block */}
      <section className="py-32 px-6">
        <FadeIn className="max-w-[1440px] mx-auto bg-primary text-on-primary rounded-[3rem] p-16 md:p-32 text-center overflow-hidden relative shadow-[0_12px_40px_rgba(41,58,62,0.12)]">
          <div className="absolute top-0 right-0 w-96 h-96 bg-surface rounded-full blur-[120px] opacity-20 -translate-y-1/2 translate-x-1/2"></div>
          <div className="relative z-10">
            <h2 className="font-headline text-5xl md:text-7xl font-bold tracking-tighter leading-[1.05] mb-8">
              Join the community.
            </h2>
            <Link href="/book" className="bg-on-primary text-primary px-12 py-5 rounded-2xl font-headline font-bold text-xl hover:scale-105 transition-transform inline-block">
              Apply to Join
            </Link>
          </div>
        </FadeIn>
      </section>
    </main>
  );
}
