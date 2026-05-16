import Image from "next/image";
import Link from "next/link";
import FadeIn from "@/components/animations/FadeIn";
import StaggerContainer from "@/components/animations/StaggerContainer";
import StaggerItem from "@/components/animations/StaggerItem";
import BentoTenant from "@/components/BentoTenant";

export default function TenantLandingPage() {
  return (
    <main className="bg-surface text-on-surface">
      {/* Hero Section */}
      <header className="relative pt-32 pb-20 md:pt-48 md:pb-40 overflow-hidden bg-surface">
        <div className="max-w-[1440px] mx-auto px-6 md:pl-16 md:pr-32 grid md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-7 z-10">
            <FadeIn delay={0.1}>
              <h1 className="text-5xl md:text-[5rem] font-bold leading-[1.05] tracking-tighter mb-8 text-on-surface font-headline">
                Live Better.<br />
                <span className="text-primary italic font-normal tracking-tight">Together.</span><br />
                Modern Co-living.
              </h1>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="text-lg md:text-xl text-on-surface-variant mb-6 max-w-xl leading-relaxed">
                Designer co-living for the modern professional. Beautifully furnished rooms in Australia's best neighbourhoods.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10 max-w-xl">
                <div className="flex items-center gap-2 text-sm text-on-surface-variant font-medium">
                  <span className="material-symbols-outlined text-primary text-xl">wifi</span> High-speed Wi-Fi
                </div>
                <div className="flex items-center gap-2 text-sm text-on-surface-variant font-medium">
                  <span className="material-symbols-outlined text-primary text-xl">cleaning_services</span> Prof. Cleaning
                </div>
                <div className="flex items-center gap-2 text-sm text-on-surface-variant font-medium">
                  <span className="material-symbols-outlined text-primary text-xl">power</span> All Utilities
                </div>
                <div className="flex items-center gap-2 text-sm text-on-surface-variant font-medium">
                  <span className="material-symbols-outlined text-primary text-xl">bed</span> Furnished
                </div>
                <div className="flex items-center gap-2 text-sm text-on-surface-variant font-medium">
                  <span className="material-symbols-outlined text-primary text-xl">celebration</span> Community Events
                </div>
              </div>
            </FadeIn>
            <FadeIn delay={0.3}>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link className="bg-primary text-on-primary px-8 py-4 rounded-full font-headline font-bold text-center transition-all hover:scale-[1.02] active:scale-95 shadow-lg" href="/book">
                  Find a Room
                </Link>
                <div className="flex items-center gap-3 px-6 py-4 bg-surface-container-low rounded-full border border-outline-variant/30">
                  <span className="material-symbols-outlined text-primary">bolt</span>
                  <span className="text-sm font-semibold text-primary">Instant Approval & All Bills Included</span>
                </div>
              </div>
            </FadeIn>
          </div>
          <FadeIn delay={0.4} direction="left" className="md:col-span-5 relative">
            <div className="aspect-[9/16] rounded-[2rem] overflow-hidden shadow-2xl border border-outline-variant/20 -rotate-1 translate-x-4 md:translate-x-8 relative bg-surface-container max-w-[420px] mx-auto md:ml-auto">
              <iframe
                src="https://player.vimeo.com/video/1192737083?h=47c53a81fb&autoplay=1&loop=1&background=1&muted=1"
                className="absolute top-0 left-0 w-full h-full pointer-events-none"
                allow="autoplay; fullscreen; picture-in-picture"
                title="vimeo-player"
              ></iframe>
            </div>
            <div className="absolute -bottom-6 -left-10 bg-surface/90 backdrop-blur-md p-8 rounded-2xl shadow-xl hidden md:block border border-outline-variant/30">
              <div className="text-4xl font-headline font-bold text-primary mb-1 tracking-tighter">$0</div>
              <div className="text-xs uppercase tracking-widest font-bold text-on-surface-variant font-body">Setup Fees</div>
            </div>
          </FadeIn>
        </div>
        {/* Abstract Bg Element */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-surface-container-low -z-10 rounded-l-[4rem] border-l border-b border-outline-variant/20"></div>
      </header>

      {/* Featured Stays Section */}
      <section className="py-32 bg-surface" id="featured">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <FadeIn className="mb-20 md:mb-32 max-w-2xl md:pl-12">
            <h2 className="text-primary text-sm font-bold uppercase tracking-[0.2em] mb-6 font-headline">The Spaces</h2>
            <h3 className="text-4xl md:text-6xl font-bold text-on-surface leading-[1.1] tracking-tighter font-headline">Homes designed for how you live.</h3>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8">
            {/* Main Feature - Large Vertical */}
            <StaggerItem className="md:col-span-7 md:row-span-2 relative group cursor-pointer overflow-hidden rounded-3xl aspect-[4/5] md:aspect-auto shadow-sm hover:shadow-2xl transition-all duration-700 border border-outline-variant/20">
              <Image
                src="/house/brunswick.JPG"
                alt="Brunswick"
                width={1200}
                height={1600}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-40 group-hover:opacity-70 transition-opacity duration-700" />
              <div className="absolute bottom-10 left-10 translate-y-2 group-hover:translate-y-0 transition-transform duration-700">
                <p className="text-white/60 text-[10px] uppercase tracking-[0.4em] font-bold mb-2">Location</p>
                <p className="text-white text-3xl font-headline font-bold tracking-tight uppercase">Brunswick</p>
              </div>
            </StaggerItem>

            {/* Top Right - Horizontal */}
            <StaggerItem className="md:col-span-5 relative group cursor-pointer overflow-hidden rounded-3xl aspect-[4/3] md:aspect-auto shadow-sm hover:shadow-2xl transition-all duration-700 border border-outline-variant/20">
              <Image
                src="/house/hawthorn.jpg"
                alt="Hawthorn"
                width={800}
                height={600}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-40 group-hover:opacity-70 transition-opacity duration-700" />
              <div className="absolute bottom-8 left-8 translate-y-2 group-hover:translate-y-0 transition-transform duration-700">
                <p className="text-white/60 text-[10px] uppercase tracking-[0.4em] font-bold mb-2">Location</p>
                <p className="text-white text-2xl font-headline font-bold tracking-tight uppercase">Hawthorn</p>
              </div>
            </StaggerItem>

            {/* Bottom Right - Horizontal */}
            <StaggerItem className="md:col-span-5 relative group cursor-pointer overflow-hidden rounded-3xl aspect-[4/3] md:aspect-auto shadow-sm hover:shadow-2xl transition-all duration-700 border border-outline-variant/20">
              <Image
                src="/house/hawthornEast.jpeg"
                alt="Hawthorn East"
                width={800}
                height={600}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-40 group-hover:opacity-70 transition-opacity duration-700" />
              <div className="absolute bottom-8 left-8 translate-y-2 group-hover:translate-y-0 transition-transform duration-700">
                <p className="text-white/60 text-[10px] uppercase tracking-[0.4em] font-bold mb-2">Location</p>
                <p className="text-white text-2xl font-headline font-bold tracking-tight uppercase">Camberwell</p>
              </div>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      {/* The Lifestyle Section (Bento) */}
      <section className="py-32 bg-surface-container-low border-y border-outline-variant/20 relative">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <FadeIn className="mb-20 md:mb-32 max-w-2xl">
            <h2 className="text-primary text-sm font-bold uppercase tracking-[0.2em] mb-6 font-headline">The Lifestyle</h2>
            <h3 className="text-4xl md:text-6xl font-bold text-on-surface leading-[1.1] tracking-tighter font-headline">Everything you need, nothing you don't.</h3>
          </FadeIn>
          <BentoTenant />
        </div>
      </section>

      {/* Booking Process Section */}
      <section className="py-32 bg-surface" id="how-it-works">
        <div className="max-w-[1440px] mx-auto px-6 md:px-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-32 items-start">
            {/* Left Side: Header and Buttons */}
            <FadeIn>
              <div className="flex items-center gap-4 mb-8">
                <div className="w-1 h-6 bg-primary/30"></div>
                <h2 className="text-on-surface-variant text-sm font-bold uppercase tracking-[0.3em] font-headline">How to live here</h2>
              </div>
              <h3 className="text-5xl md:text-7xl font-bold text-on-surface leading-[1.05] tracking-tighter font-headline mb-12">
                Get ready for the easiest move you'll ever make.
              </h3>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link className="bg-primary text-on-primary px-10 py-5 rounded-full font-headline font-bold text-center transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-3 group shadow-lg" href="/book">
                  Book a tour <span className="material-symbols-outlined transition-transform group-hover:translate-x-1">arrow_forward</span>
                </Link>
                <Link className="border border-outline px-10 py-5 rounded-full font-headline font-bold text-center transition-all hover:bg-surface-container-low flex items-center justify-center gap-3" href="/book">
                  <span className="material-symbols-outlined text-xl">search</span> Search rooms
                </Link>
              </div>
            </FadeIn>

            {/* Right Side: Numbered Steps */}
            <StaggerContainer className="flex flex-col">
              {[
                {
                  num: '01',
                  title: 'Find a room you love',
                  desc: 'With designer rooms in Melbourne\'s best suburbs, you\'re sure to find a home that suits your lifestyle and vibe.'
                },
                {
                  num: '02',
                  title: 'Book a private tour',
                  desc: 'Meet the house and your potential housemates to ensure it\'s a great fit for everyone. Choose a time that works for you and confirm instantly.'
                },
                {
                  num: '03',
                  title: 'Apply online in minutes',
                  desc: 'Complete a simple digital application with your details and references. Our streamlined process gets you approved and ready to move in faster.'
                },
              ].map((step, i) => (
                <StaggerItem key={i} className={`py-12 ${i !== 2 ? 'border-b border-outline-variant/20' : ''} first:pt-0 group`}>
                  <div className="flex gap-10">
                    <span className="text-4xl font-headline font-bold text-primary/40 tracking-tighter">{step.num}</span>
                    <div className="space-y-4">
                      <h4 className="text-2xl font-bold font-headline tracking-tight text-on-surface">{step.title}</h4>
                      <p className="text-on-surface-variant leading-relaxed text-lg max-w-md">{step.desc}</p>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </div>
      </section>

      {/* Trust Block */}
      <section className="py-16 bg-surface-container-high text-on-surface">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <p className="text-on-surface-variant text-sm font-bold uppercase tracking-widest mb-2 font-headline">Melbourne Native</p>
            <p className="text-2xl font-bold font-headline">Zestay</p>
            <p className="text-primary text-sm font-bold mt-1">ABN 41 424 818 899 | RTBA Compliant</p>
          </div>
          <div className="h-16 w-px bg-outline-variant/30 hidden md:block"></div>
          <div className="text-center md:text-left">
            <p className="text-on-surface-variant text-sm font-bold uppercase tracking-widest mb-2 font-headline">Community Size</p>
            <p className="text-xl font-headline font-bold">Join 50+ Professionals</p>
            <p className="text-xs text-on-surface-variant mt-1">Across Melbourne's best suburbs</p>
          </div>
          <div className="h-16 w-px bg-outline-variant/30 hidden md:block"></div>
          <div className="text-center">
            <div className="text-5xl font-bold text-primary font-headline tracking-tighter">4.9/5</div>
            <p className="text-xs uppercase tracking-widest text-on-surface-variant font-bold mt-2 font-headline">Tenant Satisfaction</p>
          </div>
        </div>
      </section>


      {/* Safety & Security Block - Commented out as per request
      <section className="py-32 bg-surface" id="safety">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <FadeIn className="mb-20 text-center">
            <h2 className="text-primary text-sm font-bold uppercase tracking-[0.2em] mb-6 font-headline">Safety First</h2>
            <h3 className="text-4xl md:text-6xl font-bold text-on-surface leading-[1.1] tracking-tighter font-headline">Peace of mind, guaranteed.</h3>
          </FadeIn>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { title: "Member Vetting Process", desc: "Every housemate undergoes comprehensive identity, income, and background checks before moving in.", icon: "verified_user" },
              { title: "Secure Locks", desc: "Deadlocks on all main doors and individual rooms for your security and privacy.", icon: "lock" },
              { title: "24/7 Support", desc: "Our dedicated local team is available around the clock for any maintenance or security emergencies.", icon: "support_agent" }
            ].map((safety, i) => (
              <StaggerItem key={i} className="text-center group">
                <div className="w-24 h-24 mx-auto mb-8 bg-surface-container-low rounded-full flex items-center justify-center border border-outline-variant/20 shadow-sm group-hover:shadow-md transition-all">
                  <span className="material-symbols-outlined text-5xl text-primary font-light">{safety.icon}</span>
                </div>
                <h4 className="text-2xl font-bold font-headline mb-4">{safety.title}</h4>
                <p className="text-on-surface-variant leading-relaxed">{safety.desc}</p>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>
      */}

      {/* FAQ Section */}
      <section className="py-32 bg-surface-container-low border-t border-outline-variant/20" id="faq">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <FadeIn>
            <h2 className="text-4xl md:text-6xl tracking-tighter font-bold font-headline mb-20 text-center text-on-surface">Frequently Asked Questions</h2>
          </FadeIn>
          <StaggerContainer className="grid md:grid-cols-2 gap-x-16 gap-y-10 max-w-5xl mx-auto">
            {[
              { q: "How much is the bond?", a: "Your bond is equal to 4 weeks' rent. It is lodged securely with the Residential Tenancies Bond Authority (RTBA) in Victoria." },
              { q: "What is the notice period?", a: "We require 28 days' written notice before you move out, giving us time to find a great new housemate to take your place." },
              { q: "What happens if a housemate leaves?", a: "That's on us, not you. You are only responsible for your own room's rent. We handle finding and vetting the replacement." },
              { q: "Are all bills really included?", a: "Yes. Electricity, water, gas, and unlimited high-speed internet are fully covered in your weekly payment. No splitting bills, ever." },
            ].map((faq, i) => (
              <StaggerItem key={i} className="bg-surface p-10 rounded-3xl shadow-sm border border-outline-variant/20 transition-all hover:shadow-lg">
                <h5 className="font-bold mb-4 text-primary text-xl font-headline tracking-tight">{faq.q}</h5>
                <p className="text-on-surface-variant text-base leading-relaxed">{faq.a}</p>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 md:px-12 max-w-[1440px] mx-auto">
        <FadeIn className="bg-primary text-on-primary rounded-3xl p-16 md:p-24 text-center overflow-hidden relative shadow-2xl border border-outline/20">
          <div className="absolute top-0 right-0 w-96 h-96 bg-surface-container-lowest rounded-full blur-[120px] opacity-10 -translate-y-1/2 translate-x-1/2"></div>
          <div className="relative z-10">
            <h2 className="font-headline text-5xl md:text-7xl font-bold tracking-tighter leading-[1.05] mb-8">
              Your Melbourne starts <br />
              with a good room.
            </h2>
            <p className="text-on-primary/80 text-xl max-w-xl mx-auto mb-12">
              Connected living in Melbourne’s premier hubs. <br />
              Steps from local culture, one stop from the CBD.
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <Link href="/book" className="bg-surface text-on-surface px-10 py-4 rounded-full font-headline font-bold text-lg hover:scale-105 transition-transform inline-block shadow-lg">
                Browse Rooms
              </Link>
              <button className="bg-transparent text-on-primary border border-on-primary/30 px-10 py-4 rounded-full font-headline font-bold text-lg hover:bg-on-primary/10 transition-colors">
                Get Early Access
              </button>
            </div>
          </div>
        </FadeIn>
      </section>
    </main>
  );
}
