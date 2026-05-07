import Image from "next/image";
import Link from "next/link";
import AnimatedPartners from "@/components/AnimatedPartners";
import BentoPartnership from "@/components/BentoPartnership";
import FadeIn from "@/components/animations/FadeIn";
import StaggerContainer from "@/components/animations/StaggerContainer";
import StaggerItem from "@/components/animations/StaggerItem";


export default function B2BLandingPage() {
  return (
    <main className="bg-surface text-on-surface">
      {/* Hero Section */}
      <header className="relative pt-32 pb-20 md:pt-48 md:pb-40 overflow-hidden bg-surface">
        <div className="max-w-[1440px] mx-auto px-6 md:pl-16 md:pr-32 grid md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-7 z-10">
            <FadeIn delay={0.1}>
              <h1 className="text-5xl md:text-[5rem] font-bold leading-[1.05] tracking-tighter mb-8 text-on-surface font-headline">
                Above-Market Rent.<br />
                <span className="text-primary italic font-normal tracking-tight">Guaranteed.</span><br />
                Zero Vacancy.
              </h1>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="text-lg md:text-xl text-on-surface-variant mb-10 max-w-xl leading-relaxed">
                We know this sounds different — here’s exactly how it works. Zestay provides stable, long-term corporate tenancies with pre-agreed annual increases and zero management fees.
              </p>
            </FadeIn>
            <FadeIn delay={0.3}>
              <div className="flex flex-col sm:flex-row gap-4">
                <a className="bg-on-background text-surface px-8 py-4 rounded-[1.5rem] font-headline font-bold text-center transition-all hover:scale-[1.02] active:scale-95 shadow-[0_12px_40px_rgba(41,58,62,0.08)]" href="#submit">
                  Submit Your Property
                </a>
                <div className="flex items-center gap-3 px-6 py-4">
                  <span className="material-symbols-outlined text-primary">verified</span>
                  <span className="text-sm font-semibold text-secondary">Melbourne-based &amp; RTA Compliant</span>
                </div>
              </div>
            </FadeIn>
          </div>
          <FadeIn delay={0.4} direction="left" className="md:col-span-5 relative">
            <div className="aspect-[4/5] rounded-[2rem] overflow-hidden shadow-[0_12px_40px_rgba(41,58,62,0.08)] rotate-2 md:rotate-3 translate-x-4 md:translate-x-8">
              <Image
                alt="Premium Melbourne property interior"
                className="w-full h-full object-cover"
                src="/b2b/hero1.png"
                width={800}
                height={1000}
                priority
              />
            </div>
            <div className="absolute -bottom-10 -left-10 bg-primary-container p-8 rounded-[1.5rem] shadow-[0_12px_40px_rgba(41,58,62,0.08)] hidden md:block border border-surface/50 backdrop-blur-md">
              <div className="text-4xl font-headline font-bold text-on-primary-container mb-1 tracking-tighter">10+</div>
              <div className="text-xs uppercase tracking-widest font-bold text-primary font-body">Properties Managed</div>
            </div>
          </FadeIn>
        </div>
        {/* Abstract Bg Element */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-surface-container-low -z-10 rounded-l-[5rem]"></div>
      </header>

      {/* The Deal Section */}
      <section className="py-32 bg-surface" id="the-deal">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <FadeIn className="mb-20 md:mb-32 max-w-2xl md:pl-12">
            <h2 className="text-primary text-sm font-bold uppercase tracking-[0.2em] mb-6 font-headline">The Partnership</h2>
            <h3 className="text-4xl md:text-6xl font-bold text-on-surface leading-[1.1] tracking-tighter font-headline">The ultimate hands-off landlord experience.</h3>
          </FadeIn>
          <BentoPartnership />
        </div>
      </section>

      {/* Co-living Section */}
      <section className="py-32 bg-surface-container-low rounded-[3rem] mx-4 md:ml-12 md:mr-24 overflow-hidden relative">
        <div className="max-w-[1440px] mx-auto px-6 md:px-16 grid lg:grid-cols-2 gap-20 items-center">
          <FadeIn direction="right">
            <h2 className="text-4xl md:text-6xl font-bold mb-10 leading-[1.05] tracking-tighter font-headline text-on-surface">Quiet, Quality Co-living — <br /><span className="text-primary italic font-normal tracking-tight">Not a Rooming House.</span></h2>
            <p className="text-lg text-on-surface-variant mb-8 leading-relaxed">
              Zestay operates small, quiet, quality co-living spaces. We are not a boarding house. Each property houses a <span className="font-bold text-on-surface">maximum of 3 carefully vetted tenants</span> at any one time. Think of it as a well-managed share house with a professional operator responsible for everything.
            </p>
            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <span className="material-symbols-outlined text-primary mt-1">groups</span>
                <div>
                  <span className="font-bold block">Max 3 occupants</span>
                  <span className="text-sm text-on-surface-variant">Strict limits to ensure low-impact living and property longevity.</span>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className="material-symbols-outlined text-primary mt-1">work</span>
                <div>
                  <span className="font-bold block">Working professionals only</span>
                  <span className="text-sm text-on-surface-variant">We target high-income earners who value peace and quiet.</span>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className="material-symbols-outlined text-primary mt-1">fact_check</span>
                <div>
                  <span className="font-bold block">Rigorous 100-point vetting</span>
                  <span className="text-sm text-on-surface-variant">Employment, identity, and behavioral screening for every tenant.</span>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className="material-symbols-outlined text-primary mt-1">assignment_ind</span>
                <div>
                  <span className="font-bold block">Zestay as sole named tenant</span>
                  <span className="text-sm text-on-surface-variant">We take full legal and financial accountability for the property.</span>
                </div>
              </li>
            </ul>
          </FadeIn>
          <FadeIn delay={0.2} direction="left" className="relative group">
            <div className="rounded-[2.5rem] overflow-hidden shadow-[0_12px_40px_rgba(41,58,62,0.12)] aspect-[4/3] md:aspect-auto md:h-[650px] rotate-1">
              <Image
                alt="Shared kitchen area"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                src="/b2b/photo-1522771739844-6a9f6d5f14af.avif"
                width={800}
                height={800}
              />
            </div>
            <div className="absolute -top-12 -right-12 w-40 h-40 bg-primary-fixed rounded-full flex items-center justify-center p-6 text-center text-on-primary-fixed font-bold text-sm tracking-widest leading-tight border-[12px] border-surface-container-low shadow-lg">
              MELBOURNE<br />LOCAL
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-32" id="how-it-works">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <FadeIn>
            <h2 className="text-4xl md:text-6xl tracking-tighter font-bold font-headline text-center mb-24 text-on-surface">The Onboarding Flow</h2>
          </FadeIn>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-5 gap-8 relative">
            <div className="hidden md:block absolute top-12 left-0 w-full h-[1px] bg-primary-container -z-10"></div>
            {[
              { num: 1, title: 'Submit Property', desc: 'Tell us about your asset.' },
              { num: 2, title: 'Offer in 48hrs', desc: 'A fixed-price rental offer.' },
              { num: 3, title: 'Standard Lease', desc: 'Terms agreed via RTA.' },
              { num: 4, title: 'Sign & Bond', desc: 'Security and agreement locked.' },
              { num: 5, title: 'Hands-off Management', desc: 'We take it from here.' },
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

      {/* Legitimacy Block */}
      <section className="py-16 bg-surface-container-high text-on-surface">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <p className="text-on-surface-variant text-sm font-bold uppercase tracking-widest mb-2 font-headline">Registered Operator</p>
            <p className="text-2xl font-bold font-headline">Zestay</p>
            <p className="text-primary text-sm font-bold mt-1">ABN 41 424 818 899 | Melbourne-based</p>
          </div>
          <div className="h-16 w-px bg-outline-variant/30 hidden md:block"></div>
          <div className="text-center md:text-left">
            <p className="text-on-surface-variant text-sm font-bold uppercase tracking-widest mb-2 font-headline">Reference Assets</p>
            <p className="text-xl font-headline font-bold">Managing agent references from <AnimatedPartners /></p>
            <p className="text-xs text-on-surface-variant mt-1">Available on request for property managers</p>
          </div>
          <div className="h-16 w-px bg-outline-variant/30 hidden md:block"></div>
          <div className="text-center">
            <div className="text-5xl font-bold text-primary font-headline tracking-tighter">10+</div>
            <p className="text-xs uppercase tracking-widest text-on-surface-variant font-bold mt-2 font-headline">Properties Operating</p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-32 bg-surface" id="faq">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <FadeIn>
            <h2 className="text-4xl md:text-6xl tracking-tighter font-bold font-headline mb-20 text-center text-on-surface">Agent &amp; Landlord FAQ</h2>
          </FadeIn>
          <StaggerContainer className="grid md:grid-cols-2 gap-x-16 gap-y-10">
            {[
              { q: "What kind of people live there?", a: "Strictly working professionals. Our average tenant is 28-35 years old, earning $85k+, who values a clean, quiet environment over a standard party house." },
              { q: "Is this a rooming house?", a: "No. We host a maximum of 3 tenants per property. We operate under standard Residential Tenancies Act (RTA) leases, not rooming house regulations." },
              { q: "What happens if there's damage?", a: "Zestay is the sole tenant. We are contractually liable for the property's condition and maintain a 24/7 maintenance response team for any issues." },
              { q: "Can you make alterations?", a: "No structural changes are made. We may add high-quality furniture, but the property's bones remain exactly as they were when we signed." },
              { q: "Is this legal?", a: "Absolutely. We use standard Victorian RTA leases with specific head-lease provisions that permit our sub-tenancy model for vetted professionals." },
              { q: "Do I still work with my PM?", a: "Yes. We act as the 'Perfect Tenant'. Your PM still manages the property, collects rent from us, and conducts routine inspections. We just make their job easier." },
            ].map((faq, i) => (
              <StaggerItem key={i} className="bg-surface-container p-10 rounded-[1.5rem] shadow-[0_12px_40px_rgba(41,58,62,0.04)] border-none transition-all hover:shadow-[0_12px_40px_rgba(41,58,62,0.08)]">
                <h5 className="font-bold mb-4 text-primary text-xl font-headline tracking-tight">{faq.q}</h5>
                <p className="text-on-surface-variant text-base leading-relaxed">{faq.a}</p>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Lead Capture Form */}
      <section className="py-32 bg-surface" id="submit">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <FadeIn className="bg-gradient-to-br from-primary-fixed to-primary rounded-[3rem] p-8 md:p-24 text-on-surface grid lg:grid-cols-2 gap-20 overflow-hidden relative shadow-[0_12px_40px_rgba(41,58,62,0.12)]">
            <div className="absolute top-0 right-0 w-96 h-96 bg-surface rounded-full blur-[120px] opacity-20 -translate-y-1/2 translate-x-1/2"></div>
            <div className="z-10">
              <h2 className="text-4xl md:text-6xl font-headline font-bold mb-8 leading-[1.05] tracking-tighter text-on-primary-fixed">Secure your<br />guaranteed income.</h2>
              <p className="text-on-primary-fixed-variant text-xl mb-16 leading-relaxed">Submit your property details and our Melbourne team will provide a rental appraisal and offer within 48 hours.</p>
              <div className="space-y-8">
                <div className="flex items-center gap-5">
                  <div className="w-12 h-12 rounded-[1rem] bg-surface/20 flex items-center justify-center backdrop-blur-md">
                    <span className="material-symbols-outlined text-on-primary-fixed">check</span>
                  </div>
                  <span className="font-bold font-headline text-xl text-on-primary-fixed">No management fees</span>
                </div>
                <div className="flex items-center gap-5">
                  <div className="w-12 h-12 rounded-[1rem] bg-surface/20 flex items-center justify-center backdrop-blur-md">
                    <span className="material-symbols-outlined text-on-primary-fixed">check</span>
                  </div>
                  <span className="font-bold font-headline text-xl text-on-primary-fixed">Long-term 2-5 year leases</span>
                </div>
                <div className="flex items-center gap-5">
                  <div className="w-12 h-12 rounded-[1rem] bg-surface/20 flex items-center justify-center backdrop-blur-md">
                    <span className="material-symbols-outlined text-on-primary-fixed">check</span>
                  </div>
                  <span className="font-bold font-headline text-xl text-on-primary-fixed">Professional tenant vetting</span>
                </div>
              </div>
            </div>
            <div className="bg-surface text-on-surface p-10 md:p-14 rounded-[2rem] shadow-[0_12px_40px_rgba(41,58,62,0.12)] z-10">
              <form className="grid grid-cols-1 gap-8">
                <div className="space-y-3">
                  <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant font-headline">Property Address</label>
                  <input className="w-full bg-surface-container-high border-b-2 border-transparent focus:border-primary rounded-t-xl rounded-b-none px-5 py-4 transition-all focus:outline-none focus:bg-surface-container" placeholder="123 Example St, Richmond" type="text" />
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant font-headline">Bedrooms</label>
                    <select className="w-full bg-surface-container-high border-b-2 border-transparent focus:border-primary rounded-t-xl rounded-b-none px-5 py-4 transition-all focus:outline-none focus:bg-surface-container">
                      <option>2 Bedrooms</option>
                      <option>3 Bedrooms</option>
                      <option>4+ Bedrooms</option>
                    </select>
                  </div>
                  <div className="space-y-3">
                    <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant font-headline">Current Rent</label>
                    <input className="w-full bg-surface-container-high border-b-2 border-transparent focus:border-primary rounded-t-xl rounded-b-none px-5 py-4 transition-all focus:outline-none focus:bg-surface-container" placeholder="$750/pw" type="text" />
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant font-headline">Are you the owner or PM?</label>
                  <select className="w-full bg-surface-container-high border-b-2 border-transparent focus:border-primary rounded-t-xl rounded-b-none px-5 py-4 transition-all focus:outline-none focus:bg-surface-container">
                    <option>Owner</option>
                    <option>Property Manager</option>
                  </select>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant font-headline">Full Name</label>
                    <input className="w-full bg-surface-container-high border-b-2 border-transparent focus:border-primary rounded-t-xl rounded-b-none px-5 py-4 transition-all focus:outline-none focus:bg-surface-container" placeholder="Jane Doe" type="text" />
                  </div>
                  <div className="space-y-3">
                    <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant font-headline">Contact Number</label>
                    <input className="w-full bg-surface-container-high border-b-2 border-transparent focus:border-primary rounded-t-xl rounded-b-none px-5 py-4 transition-all focus:outline-none focus:bg-surface-container" placeholder="0400 000 000" type="tel" />
                  </div>
                </div>
                <button className="w-full bg-on-surface text-surface font-headline font-bold py-6 rounded-[1.5rem] mt-6 hover:scale-[1.01] active:scale-95 transition-all shadow-[0_12px_40px_rgba(41,58,62,0.12)] text-lg" type="submit">Submit Your Property</button>
              </form>
            </div>
          </FadeIn>
        </div>
      </section>
    </main>
  );
}
