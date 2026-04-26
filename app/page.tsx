import Image from "next/image";
import Link from "next/link";
import AnimatedPartners from "@/components/AnimatedPartners";

export default function B2BLandingPage() {
  return (
    <main className="bg-surface text-on-surface">
      {/* Hero Section */}
      <header className="relative pt-32 pb-20 md:pt-48 md:pb-40 overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 grid md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-7 z-10">
            <h1 className="text-5xl md:text-7xl font-bold leading-[1.1] tracking-tighter mb-8 text-on-background font-headline">
              Above-Market Rent.<br />
              <span className="text-primary italic">Guaranteed.</span><br />
              Zero Vacancy.
            </h1>
            <p className="text-lg md:text-xl text-on-surface-variant mb-10 max-w-xl leading-relaxed">
              We know this sounds different — here’s exactly how it works. Zestay provides stable, long-term corporate tenancies with pre-agreed annual increases and zero management fees.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a className="bg-on-background text-surface px-8 py-4 rounded-full font-bold text-center transition-all hover:scale-[1.02] active:scale-95 shadow-xl shadow-primary/10" href="#submit">
                Submit Your Property
              </a>
              <div className="flex items-center gap-3 px-6 py-4">
                <span className="material-symbols-outlined text-primary">verified</span>
                <span className="text-sm font-semibold text-secondary">Melbourne-based &amp; RTA Compliant</span>
              </div>
            </div>
          </div>
          <div className="md:col-span-5 relative">
            <div className="aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl rotate-2 md:rotate-3 translate-x-4 md:translate-x-8">
              <Image
                alt="Premium Melbourne property interior"
                className="w-full h-full object-cover"
                src="/b2b/hero.jpeg"
                width={800}
                height={1000}
                priority
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-primary-container p-8 rounded-2xl shadow-xl hidden md:block">
              <div className="text-4xl font-bold text-on-primary-container mb-1">10+</div>
              <div className="text-xs uppercase tracking-widest font-bold text-on-primary-container/70">Properties Managed</div>
            </div>
          </div>
        </div>
        {/* Abstract Bg Element */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-surface-container-low -z-10 rounded-l-[5rem]"></div>
      </header>

      {/* The Deal Section */}
      <section className="py-24 bg-surface" id="the-deal">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <div className="mb-16 md:mb-24 max-w-2xl">
            <h2 className="text-primary text-sm font-bold uppercase tracking-[0.2em] mb-4 font-headline">The Partnership</h2>
            <h3 className="text-4xl md:text-5xl font-bold text-on-background leading-tight font-headline">The ultimate hands-off landlord experience.</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
            {[
              { icon: 'trending_up', title: 'Above-market rent', desc: 'Consistently above current asking prices, reflective of our corporate model.' },
              { icon: 'payments', title: 'Guaranteed rent', desc: 'Paid automatically every month. No chasing arrears, no tenant excuses.' },
              { icon: 'event_available', title: 'Zero vacancy', desc: 'Lease starts Day 1. We assume all vacancy risk for the entire term.' },
              { icon: 'show_chart', title: '4% Fixed annual increases', desc: 'Predictable growth built into the contract from the start.' },
              { icon: 'engineering', title: 'End-to-end management', desc: 'Zero occupant contact. We handle all minor maintenance and cleaning.' },
              { icon: 'gavel', title: 'RTA Compliant', desc: 'Everything done by the book under standard Victorian tenancy laws.' },
              { icon: 'shield', title: 'Public Liability', desc: 'Full insurance coverage specifically tailored for our co-living model.' },
              { icon: 'check_box_outline_blank', title: 'No alterations', desc: 'We never make structural changes. Your property remains exactly as it is.' },
            ].map((feature, i) => (
              <div key={i} className="flex flex-col gap-4">
                <div className="w-12 h-12 bg-primary-container rounded-xl flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined">{feature.icon}</span>
                </div>
                <h4 className="font-bold font-headline text-xl">{feature.title}</h4>
                <p className="text-on-surface-variant text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Co-living Section */}
      <section className="py-24 bg-surface-container-low rounded-[3rem] mx-4 md:mx-12 overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold mb-8 leading-tight font-headline">Quiet, Quality Co-living — <br /><span className="text-primary italic">Not a Rooming House.</span></h2>
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
          </div>
          <div className="relative group">
            <div className="rounded-[2.5rem] overflow-hidden shadow-2xl aspect-[4/3] md:aspect-auto md:h-[600px]">
              <Image
                alt="Shared kitchen area"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                src="/b2b/kitchen.jpeg"
                width={800}
                height={800}
              />
            </div>
            <div className="absolute -top-8 -right-8 w-32 h-32 bg-primary-container rounded-full flex items-center justify-center p-4 text-center text-on-primary-container font-bold text-xs leading-tight border-8 border-surface-container-low">
              MELBOURNE LOCAL
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24" id="how-it-works">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <h2 className="text-4xl md:text-5xl font-bold font-headline text-center mb-20">The Onboarding Flow</h2>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
            <div className="hidden md:block absolute top-10 left-0 w-full h-[2px] bg-primary-container -z-10"></div>
            {[
              { num: 1, title: 'Submit Property', desc: 'Tell us about your asset.' },
              { num: 2, title: 'Offer in 48hrs', desc: 'A fixed-price rental offer.' },
              { num: 3, title: 'Standard Lease', desc: 'Terms agreed via RTA.' },
              { num: 4, title: 'Sign & Bond', desc: 'Security and agreement locked.' },
              { num: 5, title: 'Hands-off Management', desc: 'We take it from here.' },
            ].map((step, i) => (
              <div key={i} className="flex flex-col items-center text-center gap-6 group">
                <div className="w-20 h-20 bg-surface-container-high rounded-full flex items-center justify-center font-headline text-3xl font-bold text-primary group-hover:bg-primary group-hover:text-surface transition-all duration-300">{step.num}</div>
                <div>
                  <h5 className="font-bold text-lg mb-2">{step.title}</h5>
                  <p className="text-xs text-on-surface-variant">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Legitimacy Block */}
      <section className="py-12 bg-on-background text-surface">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <p className="text-surface/60 text-sm font-medium mb-1">Registered Operator</p>
            <p className="text-xl font-bold">Zestay</p>
            <p className="text-primary-container text-sm">ABN 41 424 818 899 | Melbourne-based</p>
          </div>
          <div className="h-12 w-px bg-surface/20 hidden md:block"></div>
          <div className="text-center md:text-left">
            <p className="text-surface/60 text-sm font-medium mb-1">Reference Assets</p>
            <p className="text-lg">Managing agent references from <AnimatedPartners /></p>
            <p className="text-xs opacity-60">Available on request for property managers</p>
          </div>
          <div className="h-12 w-px bg-surface/20 hidden md:block"></div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary-container">10+</div>
            <p className="text-xs uppercase tracking-widest opacity-60">Properties Operating</p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-surface-container" id="faq">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <h2 className="text-4xl font-bold font-headline mb-16 text-center">Agent &amp; Landlord FAQ</h2>
          <div className="grid md:grid-cols-2 gap-x-12 gap-y-8">
            {[
              { q: "What kind of people live there?", a: "Strictly working professionals. Our average tenant is 28-35 years old, earning $85k+, who values a clean, quiet environment over a standard party house." },
              { q: "Is this a rooming house?", a: "No. We host a maximum of 3 tenants per property. We operate under standard Residential Tenancies Act (RTA) leases, not rooming house regulations." },
              { q: "What happens if there's damage?", a: "Zestay is the sole tenant. We are contractually liable for the property's condition and maintain a 24/7 maintenance response team for any issues." },
              { q: "Can you make alterations?", a: "No structural changes are made. We may add high-quality furniture, but the property's bones remain exactly as they were when we signed." },
              { q: "Is this legal?", a: "Absolutely. We use standard Victorian RTA leases with specific head-lease provisions that permit our sub-tenancy model for vetted professionals." },
              { q: "Do I still work with my PM?", a: "Yes. We act as the 'Perfect Tenant'. Your PM still manages the property, collects rent from us, and conducts routine inspections. We just make their job easier." },
            ].map((faq, i) => (
              <div key={i} className="bg-surface p-8 rounded-2xl shadow-sm border border-outline-variant/20">
                <h5 className="font-bold mb-3 text-primary">{faq.q}</h5>
                <p className="text-on-surface-variant text-sm">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lead Capture Form */}
      <section className="py-24" id="submit">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <div className="bg-on-background rounded-[3rem] p-8 md:p-20 text-surface grid lg:grid-cols-2 gap-16 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary rounded-full blur-[100px] opacity-20 -translate-y-1/2 translate-x-1/2"></div>
            <div>
              <h2 className="text-4xl md:text-5xl font-headline font-bold mb-8 leading-tight">Secure your<br />guaranteed income.</h2>
              <p className="text-surface/70 text-lg mb-12">Submit your property details and our Melbourne team will provide a rental appraisal and offer within 48 hours.</p>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full border border-surface/20 flex items-center justify-center">
                    <span className="material-symbols-outlined text-sm">check</span>
                  </div>
                  <span>No management fees</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full border border-surface/20 flex items-center justify-center">
                    <span className="material-symbols-outlined text-sm">check</span>
                  </div>
                  <span>Long-term 2-5 year leases</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full border border-surface/20 flex items-center justify-center">
                    <span className="material-symbols-outlined text-sm">check</span>
                  </div>
                  <span>Professional tenant vetting</span>
                </div>
              </div>
            </div>
            <div className="bg-surface text-on-surface p-8 md:p-12 rounded-[2rem] shadow-2xl z-10">
              <form className="grid grid-cols-1 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">Property Address</label>
                  <input className="w-full bg-surface-container-high border-none rounded-xl p-4 focus:ring-2 focus:ring-primary transition-all" placeholder="123 Example St, Richmond" type="text" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">Bedrooms</label>
                    <select className="w-full bg-surface-container-high border-none rounded-xl p-4 focus:ring-2 focus:ring-primary">
                      <option>2 Bedrooms</option>
                      <option>3 Bedrooms</option>
                      <option>4+ Bedrooms</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">Current Rent</label>
                    <input className="w-full bg-surface-container-high border-none rounded-xl p-4 focus:ring-2 focus:ring-primary" placeholder="$750/pw" type="text" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">Are you the owner or PM?</label>
                  <select className="w-full bg-surface-container-high border-none rounded-xl p-4 focus:ring-2 focus:ring-primary">
                    <option>Owner</option>
                    <option>Property Manager</option>
                  </select>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">Full Name</label>
                    <input className="w-full bg-surface-container-high border-none rounded-xl p-4 focus:ring-2 focus:ring-primary" placeholder="Jane Doe" type="text" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">Contact Number</label>
                    <input className="w-full bg-surface-container-high border-none rounded-xl p-4 focus:ring-2 focus:ring-primary" placeholder="0400 000 000" type="tel" />
                  </div>
                </div>
                <button className="w-full bg-on-background text-surface font-bold py-5 rounded-full mt-4 hover:scale-[1.01] active:scale-95 transition-all shadow-xl shadow-on-background/10" type="submit">Submit Your Property</button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
