import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "Community | Zestay",
  description: "Who you live with matters. Join a vetted community of professionals and explorers.",
};

export default function CommunityPage() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative px-6 py-24 md:py-32 max-w-7xl mx-auto flex flex-col items-center text-center">
        <span className="text-primary font-headline font-bold tracking-widest uppercase text-xs mb-6 inline-block bg-primary-container px-4 py-2 rounded-full">
          The People
        </span>
        <h1 className="text-[#221b08] font-headline text-5xl md:text-7xl font-bold tracking-tighter leading-[1.1] mb-8 max-w-4xl">
          Who you live with <br /> matters most.
        </h1>
        <p className="text-[#42484a] text-xl md:text-2xl leading-relaxed max-w-2xl font-body">
          We curate our properties to ensure you&apos;re sharing your home with respectful, driven, and like-minded professionals from across the globe. No drama, just great company.
        </p>
      </section>

      {/* Community Pillars */}
      <section className="px-6 py-24 bg-[#fff8f1]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-24">
            <div className="order-2 md:order-1 space-y-6">
              <h2 className="text-[#221b08] font-headline text-4xl md:text-5xl font-bold tracking-tighter">
                Carefully Vetted. <br /> Curated Vibes.
              </h2>
              <p className="text-[#42484a] text-lg leading-relaxed font-body">
                A beautiful house is ruined by a bad housemate. We individually screen every applicant to ensure they align with our values of respect, cleanliness, and quiet enjoyment of the space. 
              </p>
              <p className="text-[#42484a] text-lg leading-relaxed font-body">
                Whether you&apos;re an ambitious local professional, or an international relocator establishing roots in Australia, you&apos;ll find yourself among friends who understand personal boundaries.
              </p>
            </div>
            <div className="order-1 md:order-2 bg-primary-container rounded-[3rem] h-[400px] flex items-center justify-center p-12 text-center shadow-sm relative overflow-hidden group">
               <Image 
                 src="/stock/living.jpeg" 
                 alt="Welcoming Zestay community" 
                 fill 
                 className="object-cover transition-transform duration-700 group-hover:scale-105" 
               />
               <div className="absolute inset-0 bg-black/40"></div>
               <h3 className="font-headline font-bold text-3xl text-surface relative z-10 italic">
                 &quot;Having a welcoming group of housemates made the entire relocation effortless.&quot;
               </h3>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-surface p-10 rounded-[2rem] border border-outline-variant/10 shadow-sm text-center">
              <div className="w-16 h-16 rounded-full bg-secondary-container mx-auto flex items-center justify-center mb-6 text-secondary">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="font-headline font-bold text-xl text-[#221b08] mb-4">Instant Network</h3>
              <p className="text-[#42484a] leading-relaxed font-body text-sm">
                Connect with our local network immediately. From recommending the best cafes to introducing you to local sports clubs, we help you integrate into Melbourne life.
              </p>
            </div>

            <div className="bg-surface p-10 rounded-[2rem] border border-outline-variant/10 shadow-sm text-center">
              <div className="w-16 h-16 rounded-full bg-secondary-container mx-auto flex items-center justify-center mb-6 text-secondary">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="font-headline font-bold text-xl text-[#221b08] mb-4">Secure & Private</h3>
              <p className="text-[#42484a] leading-relaxed font-body text-sm">
                While community is great, privacy is essential. Every room is a private sanctuary featuring secure locks, giving you absolute peace of mind.
              </p>
            </div>

            <div className="bg-surface p-10 rounded-[2rem] border border-outline-variant/10 shadow-sm text-center">
              <div className="w-16 h-16 rounded-full bg-secondary-container mx-auto flex items-center justify-center mb-6 text-secondary">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h3 className="font-headline font-bold text-xl text-[#221b08] mb-4">Seamless Comms</h3>
              <p className="text-[#42484a] leading-relaxed font-body text-sm">
                Direct lines of communication to property managers for fast maintenance, and house group chats to coordinate with your fellow residents effortlessly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 flex justify-center text-center">
        <div>
          <h2 className="text-[#221b08] font-headline text-4xl md:text-5xl font-bold tracking-tighter mb-8 max-w-2xl mx-auto">
            Ready to meet your new housemates?
          </h2>
          <Link href="/book" className="bg-[#221b08] text-surface px-8 py-4 rounded-full font-headline font-bold text-lg hover:scale-95 duration-150 ease-in-out inline-block border-none">
            Apply to Join Zestay
          </Link>
        </div>
      </section>
    </div>
  );
}
