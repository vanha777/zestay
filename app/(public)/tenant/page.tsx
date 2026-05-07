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
              <p className="text-lg md:text-xl text-on-surface-variant mb-10 max-w-xl leading-relaxed">
                Designer co-living for the modern professional. Beautifully furnished rooms in Australia's best neighbourhoods. All bills included, zero stress.
              </p>
            </FadeIn>
            <FadeIn delay={0.3}>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link className="bg-on-background text-surface px-8 py-4 rounded-[1.5rem] font-headline font-bold text-center transition-all hover:scale-[1.02] active:scale-95 shadow-[0_12px_40px_rgba(41,58,62,0.08)]" href="/book">
                  Find a Room
                </Link>
                <div className="flex items-center gap-3 px-6 py-4">
                  <span className="material-symbols-outlined text-primary">bolt</span>
                  <span className="text-sm font-semibold text-secondary">Instant Approval & All Bills Included</span>
                </div>
              </div>
            </FadeIn>
          </div>
          <FadeIn delay={0.4} direction="left" className="md:col-span-5 relative">
            <div className="aspect-[4/5] rounded-[2rem] overflow-hidden shadow-[0_12px_40px_rgba(41,58,62,0.08)] rotate-2 md:rotate-3 translate-x-4 md:translate-x-8">
              <Image
                alt="Stylish coliving interior"
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAR7AQy2b_5z-TFbto4GzAa9WkiOefRJ6KfyXdYNGVJ3TqLOBMp6SfXc1xtCVuEdEZboP_fsyUdXqZhTosJb3l7flnt4bXtpEyc95o3_IbhrIVVJews_aL9V3Jnt1Qlujhzn6IZE7AUDbHBDmOKtFY3xoqEC0SYPl3eOu1BmBFqZ33zonTleUn6wSmTZeL_0V7jRIZ2m1q0FP0oOdRUqfOx_zqhUzGvCBwYBlEWO7Re_soefpSO2i9SS_veSGonTKfRbhOFGk36ioU"
                width={800}
                height={1000}
                priority
              />
            </div>
            <div className="absolute -bottom-10 -left-10 bg-primary-container p-8 rounded-[1.5rem] shadow-[0_12px_40px_rgba(41,58,62,0.08)] hidden md:block border border-surface/50 backdrop-blur-md">
              <div className="text-4xl font-headline font-bold text-on-primary-container mb-1 tracking-tighter">$0</div>
              <div className="text-xs uppercase tracking-widest font-bold text-primary font-body">Setup Fees</div>
            </div>
          </FadeIn>
        </div>
        {/* Abstract Bg Element */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-surface-container-low -z-10 rounded-l-[5rem]"></div>
      </header>

      {/* Featured Stays Section */}
      <section className="py-32 bg-surface" id="featured">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <FadeIn className="mb-20 md:mb-32 max-w-2xl md:pl-12">
            <h2 className="text-primary text-sm font-bold uppercase tracking-[0.2em] mb-6 font-headline">The Spaces</h2>
            <h3 className="text-4xl md:text-6xl font-bold text-on-surface leading-[1.1] tracking-tighter font-headline">Homes designed for how you live.</h3>
          </FadeIn>
          
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                title: "Brunswick Street House", 
                location: "Brunswick, Melbourne", 
                price: "$380", 
                img: "/house/brunswick.jpeg",
                desc: "Melbourne's creative heart. Trams and coffee at your door."
              },
              { 
                title: "Hawthorn East Residence", 
                location: "Hawthorn East, Melbourne", 
                price: "$320", 
                img: "/house/hawthorn.png",
                desc: "Leafy streets and quiet luxury. Perfect for focused work."
              },
              { 
                title: "Hawthorn Heritage House", 
                location: "Hawthorn, Melbourne", 
                price: "$350", 
                img: "/house/hawthornEast.png",
                desc: "Classic charm meets modern convenience. High ceilings."
              }
            ].map((stay, i) => (
              <StaggerItem key={i} className="group cursor-pointer">
                <div className="aspect-[4/5] rounded-[2rem] overflow-hidden mb-6 shadow-sm group-hover:shadow-xl transition-all duration-500">
                  <Image 
                    src={stay.img} 
                    alt={stay.title} 
                    width={600} 
                    height={800} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="px-2">
                  <p className="text-primary font-bold text-xs uppercase tracking-widest mb-2">{stay.location}</p>
                  <h4 className="text-2xl font-bold font-headline mb-2 tracking-tight">{stay.title}</h4>
                  <p className="text-on-surface-variant text-sm mb-4 leading-relaxed">{stay.desc}</p>
                  <p className="text-xl font-bold">From {stay.price}<span className="text-sm font-normal text-on-surface-variant">/pw — bills included</span></p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* The Lifestyle Section (Bento) */}
      <section className="py-32 bg-surface-container-low rounded-[3rem] mx-4 md:ml-12 md:mr-24 overflow-hidden relative">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <FadeIn className="mb-20 md:mb-32 max-w-2xl">
            <h2 className="text-primary text-sm font-bold uppercase tracking-[0.2em] mb-6 font-headline">The Lifestyle</h2>
            <h3 className="text-4xl md:text-6xl font-bold text-on-surface leading-[1.1] tracking-tighter font-headline">Everything you need, nothing you don't.</h3>
          </FadeIn>
          <BentoTenant />
        </div>
      </section>

      {/* Booking Process Section */}
      <section className="py-32" id="how-it-works">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <FadeIn>
            <h2 className="text-4xl md:text-6xl tracking-tighter font-bold font-headline text-center mb-24 text-on-surface">How to Join</h2>
          </FadeIn>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-5 gap-8 relative">
            <div className="hidden md:block absolute top-12 left-0 w-full h-[1px] bg-primary-container -z-10"></div>
            {[
              { num: 1, title: 'Find Your Room', desc: 'Browse our curated collection.' },
              { num: 2, title: 'Apply Online', desc: 'Fast, simple digital application.' },
              { num: 3, title: 'Quick Vetting', desc: 'Identity and income verification.' },
              { num: 4, title: 'Sign & Pay', desc: 'Secure your spot instantly.' },
              { num: 5, title: 'Move In', desc: 'Suitcase in hand. You\'re home.' },
            ].map((step, i) => (
              <StaggerItem key={i} className="flex flex-col items-center text-center gap-8 group">
                <div className="w-24 h-24 bg-surface-container rounded-[1.5rem] flex items-center justify-center font-headline text-4xl font-bold text-primary group-hover:bg-primary group-hover:text-surface transition-all duration-300 shadow-sm group-hover:shadow-[0_12px_40px_rgba(41,58,62,0.08)] group-hover:-translate-y-2">{step.num}</div>
                <div>
                  <h5 className="font-bold font-headline text-xl mb-2 text-on-surface">{step.title}</h5>
                  <p className="text-sm text-on-surface-variant leading-relaxed">{step.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Trust Block */}
      <section className="py-16 bg-surface-container-high text-on-surface">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <p className="text-on-surface-variant text-sm font-bold uppercase tracking-widest mb-2 font-headline">Melbourne Native</p>
            <p className="text-2xl font-bold font-headline">Zestay</p>
            <p className="text-primary text-sm font-bold mt-1">ABN 41 424 818 899 | RTA Compliant</p>
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


      {/* CTA Section */}
      <section className="py-32 px-6">
        <FadeIn className="max-w-[1440px] mx-auto bg-gradient-to-br from-primary-fixed to-primary rounded-[3rem] p-16 md:p-32 text-center overflow-hidden relative shadow-[0_12px_40px_rgba(41,58,62,0.12)]">
          <div className="absolute top-0 right-0 w-96 h-96 bg-surface rounded-full blur-[120px] opacity-30 -translate-y-1/2 translate-x-1/2"></div>
          <div className="relative z-10">
            <h2 className="text-on-primary-fixed font-headline text-5xl md:text-7xl font-bold tracking-tighter leading-[1.05] mb-8">
              Your Melbourne starts <br />
              with a good room.
            </h2>
            <p className="text-surface/70 text-xl max-w-xl mx-auto mb-12">
              Rooms open now in Hawthorn, Brunswick, and Fitzroy. <br />
              Book online today, move in this week.
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <Link href="/book" className="bg-primary-container text-on-primary-container px-12 py-5 rounded-2xl font-headline font-bold text-xl hover:scale-105 transition-transform inline-block">
                Browse Rooms
              </Link>
              <button className="bg-transparent text-surface border border-surface/20 px-12 py-5 rounded-2xl font-headline font-bold text-xl hover:bg-surface/10 transition-colors">
                Get Early Access
              </button>
            </div>
          </div>
        </FadeIn>
      </section>
    </main>
  );
}
