import Image from "next/image";

export default function Home() {
  return (
    <>
      {/* Top Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-[#fff8f1]/80 backdrop-blur-md">
        <div className="flex justify-between items-center px-8 py-4 max-w-7xl mx-auto">
          <div className="text-2xl font-bold tracking-tighter text-[#221b08] font-headline">
            Zestay
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <a
              className="font-headline font-bold text-sm tracking-tight text-[#476369] border-b-2 border-[#476369] pb-1 hover:text-[#221b08] transition-colors duration-300"
              href="#"
            >
              Homes
            </a>
            <a
              className="font-headline font-bold text-sm tracking-tight text-[#42484a] hover:text-[#221b08] transition-colors duration-300"
              href="#"
            >
              Living
            </a>
            <a
              className="font-headline font-bold text-sm tracking-tight text-[#42484a] hover:text-[#221b08] transition-colors duration-300"
              href="#"
            >
              Community
            </a>
            <a
              className="font-headline font-bold text-sm tracking-tight text-[#42484a] hover:text-[#221b08] transition-colors duration-300"
              href="#"
            >
              About
            </a>
          </div>
          <button className="bg-on-background text-surface px-6 py-2.5 rounded-full font-headline font-bold text-sm hover:scale-95 duration-150 ease-in-out">
            Book Now
          </button>
        </div>
      </nav>

      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative px-6 pt-12 pb-24 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7">
            <h1 className="text-6xl md:text-7xl font-headline font-bold text-on-background tracking-tighter leading-[0.95] mb-8">
              Your Home, <br />
              <span className="text-primary italic">Better Together.</span>
            </h1>
            <p className="text-xl text-on-surface-variant max-w-lg mb-12 leading-relaxed">
              Elevated coliving spaces designed for modern nomads, creative souls,
              and community seekers. Experience the perfect balance of private
              sanctuary and shared connection.
            </p>

            {/* Search Bar */}
            <div className="bg-surface-container-high p-4 rounded-xl shadow-sm max-w-2xl flex flex-col md:flex-row gap-4 items-center border border-outline-variant/20">
              <div className="flex-1 w-full space-y-1 px-4 border-r border-outline-variant/30">
                <label className="text-[10px] uppercase font-bold tracking-widest text-primary block">
                  Location
                </label>
                <input
                  className="w-full bg-transparent border-none p-0 focus:ring-0 placeholder:text-on-surface-variant/50 font-medium"
                  placeholder="Where to?"
                  type="text"
                />
              </div>
              <div className="flex-1 w-full space-y-1 px-4 border-r border-outline-variant/30">
                <label className="text-[10px] uppercase font-bold tracking-widest text-primary block">
                  Stay Length
                </label>
                <select className="w-full bg-transparent border-none p-0 focus:ring-0 font-medium">
                  <option>1-3 Months</option>
                  <option>3-6 Months</option>
                  <option>Long term</option>
                </select>
              </div>
              <button className="w-full md:w-auto bg-primary text-on-primary px-8 py-4 rounded-xl font-bold font-headline flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
                <span className="material-symbols-outlined text-sm">
                  search
                </span>
                Find Space
              </button>
            </div>
          </div>
          <div className="lg:col-span-5 relative">
            <div className="aspect-[4/5] rounded-[2rem] overflow-hidden rotate-2 hover:rotate-0 transition-transform duration-700 shadow-2xl">
              <Image
                alt="Stylish coliving interior"
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAR7AQy2b_5z-TFbto4GzAa9WkiOefRJ6KfyXdYNGVJ3TqLOBMp6SfXc1xtCVuEdEZboP_fsyUdXqZhTosJb3l7flnt4bXtpEyc95o3_IbhrIVVJews_aL9V3Jnt1Qlujhzn6IZE7AUDbHBDmOKtFY3xoqEC0SYPl3eOu1BmBFqZ33zonTleUn6wSmTZeL_0V7jRIZ2m1q0FP0oOdRUqfOx_zqhUzGvCBwYBlEWO7Re_soefpSO2i9SS_veSGonTKfRbhOFGk36ioU"
                width={800}
                height={1000}
              />
            </div>
            {/* Floating Decorative Element */}
            <div className="absolute -bottom-8 -left-8 bg-primary-container p-8 rounded-2xl shadow-xl max-w-[200px] hidden md:block">
              <p className="font-headline font-bold text-3xl text-on-primary-container leading-none">
                12+
              </p>
              <p className="text-sm font-medium text-on-primary-container/80 mt-1">
                Global Hubs
              </p>
            </div>
          </div>
        </section>

        {/* Featured Stays: Bento Grid */}
        <section className="bg-surface-container-low py-24 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-end mb-16">
              <div className="max-w-xl">
                <h2 className="text-primary font-headline text-lg font-bold tracking-widest uppercase mb-4">
                  Featured Stays
                </h2>
                <h3 className="text-4xl md:text-5xl font-headline font-bold text-on-background tracking-tight">
                  Spaces that inspire your best work and life.
                </h3>
              </div>
              <a
                className="hidden md:flex items-center gap-2 font-bold text-primary hover:underline underline-offset-8"
                href="#"
              >
                View All Locations
                <span className="material-symbols-outlined">arrow_forward</span>
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Card 1 */}
              <div className="bg-surface-container-highest rounded-xl overflow-hidden group border border-outline-variant/30">
                <div className="aspect-[16/10] overflow-hidden relative">
                  <Image
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCUbEAG7j4ljiuC2jRFcMWhVEb78ZCf0HYErmaJ2YeO8yvp7VIKGLzCXy5Jx2T2NdNYK6P4MkA0BjHhOkzpvmhzQLb7UJrMhoyFC7hqdrM8qTANFzWVaIi_BlwR441EX11PVyDSth7RowmADEX1HDZc8S_v5ios8QEDmLJkbXvCCXYT-dzFMBL_d-AyistV1jFPoD4qtpi_lim4C_1CnAnORvahvjmwYj7vz_kCa8wXcoyLVNwSnOGJLhvqczMvuX1rJ83qIzr4vt8"
                    alt="Chic sunlit bedroom in a minimalist apartment"
                    width={600}
                    height={400}
                  />
                  <div className="absolute top-4 left-4 bg-on-background text-surface text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                    Amsterdam
                  </div>
                </div>
                <div className="p-8">
                  <h4 className="font-headline text-2xl font-bold mb-2">
                    The Jordaan Loft
                  </h4>
                  <p className="text-on-surface-variant text-sm mb-6">
                    Canal-side living with a dedicated creative studio and communal
                    terrace.
                  </p>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-[10px] uppercase font-bold text-outline">
                        From
                      </p>
                      <p className="text-xl font-headline font-bold text-on-background">
                        €1,200
                        <span className="text-sm font-normal text-on-surface-variant">
                          /mo
                        </span>
                      </p>
                    </div>
                    <button className="bg-primary-container text-on-primary-container px-5 py-2 rounded-xl font-bold text-sm hover:opacity-80 transition-opacity">
                      Book
                    </button>
                  </div>
                </div>
              </div>

              {/* Card 2 */}
              <div className="bg-surface-container-highest rounded-xl overflow-hidden group border border-outline-variant/30">
                <div className="aspect-[16/10] overflow-hidden relative">
                  <Image
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCNDT-4UJlKJyqWVkfciu4pCKrXhEy4xgE4vXJBjFRmpvN1iOlj9-ZbBTqNc64nSFMdVQPlkdcd2ThhvovrOVO1iNL2oO99BqkI4vuA1bZITy3hAltPnuCzVvzheLlOwF_FxIhuINOWgqAVY2cRKTR37ktOvOsSTii7wz_8hmgwOmA7NYDNxgp6z_hLHcxHuq1Qca56scwAWughIYs4lThNcD8EmfWr9jK2wY-YZ6lpcWqE3hLzkaNsUgwWrF-cNZsjnFUddU_rgYM"
                    alt="Spacious loft bedroom with industrial windows"
                    width={600}
                    height={400}
                  />
                  <div className="absolute top-4 left-4 bg-on-background text-surface text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                    Berlin
                  </div>
                </div>
                <div className="p-8">
                  <h4 className="font-headline text-2xl font-bold mb-2">
                    Mitte Central
                  </h4>
                  <p className="text-on-surface-variant text-sm mb-6">
                    Industrial charm meets high-speed tech. Featuring the city&apos;s
                    best rooftop coworking.
                  </p>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-[10px] uppercase font-bold text-outline">
                        From
                      </p>
                      <p className="text-xl font-headline font-bold text-on-background">
                        €1,050
                        <span className="text-sm font-normal text-on-surface-variant">
                          /mo
                        </span>
                      </p>
                    </div>
                    <button className="bg-primary-container text-on-primary-container px-5 py-2 rounded-xl font-bold text-sm hover:opacity-80 transition-opacity">
                      Book
                    </button>
                  </div>
                </div>
              </div>

              {/* Card 3 */}
              <div className="bg-surface-container-highest rounded-xl overflow-hidden group border border-outline-variant/30">
                <div className="aspect-[16/10] overflow-hidden relative">
                  <Image
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDIVvS9BDrofnkOcuHo8bJZS77x84bdceQtR6nLLd80SwB5BFb9FP0lWfVnIJK8ZYlHX2O6MwKJtn6CJP7DCVW7Z3fsx4pzI93xInz12u7lbEPTFXN6Gvrr0ARDfQga5U3ySg9PhfZPAIVhuryi_-NQ4t54simvQrD1-B1sSBVl9MlS8U4Nxj_DWl2DhVBEgT4mccJe-uyqajduJTuPX0ALJ4s3AuYqYameGpDjrn5vFr_bWZrCgFzW8_ZX6XxeYzTPoN3MPhk1OUo"
                    alt="Modern high-end apartment room with views of Lisbon rooftops"
                    width={600}
                    height={400}
                  />
                  <div className="absolute top-4 left-4 bg-on-background text-surface text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                    Lisbon
                  </div>
                </div>
                <div className="p-8">
                  <h4 className="font-headline text-2xl font-bold mb-2">
                    Santos Horizon
                  </h4>
                  <p className="text-on-surface-variant text-sm mb-6">
                    Sunset views and surf community. A sanctuary for digital nomads
                    near the coast.
                  </p>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-[10px] uppercase font-bold text-outline">
                        From
                      </p>
                      <p className="text-xl font-headline font-bold text-on-background">
                        €980
                        <span className="text-sm font-normal text-on-surface-variant">
                          /mo
                        </span>
                      </p>
                    </div>
                    <button className="bg-primary-container text-on-primary-container px-5 py-2 rounded-xl font-bold text-sm hover:opacity-80 transition-opacity">
                      Book
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Zestay: Sky Blue Accents */}
        <section className="py-24 px-6 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1 grid grid-cols-2 gap-4">
              <div className="bg-primary-container p-8 rounded-[2rem] aspect-square flex flex-col justify-end">
                <span className="material-symbols-outlined text-4xl mb-4 text-primary">
                  diversity_3
                </span>
                <h5 className="font-headline font-bold text-xl text-on-background">
                  Deep Community
                </h5>
                <p className="text-sm text-on-primary-container/80 mt-2">
                  Curated events that turn neighbors into lifelong friends.
                </p>
              </div>
              <div className="bg-surface-container-highest p-8 rounded-[2rem] aspect-square flex flex-col justify-end translate-y-8">
                <span className="material-symbols-outlined text-4xl mb-4 text-primary">
                  all_inclusive
                </span>
                <h5 className="font-headline font-bold text-xl text-on-background">
                  True Flexibility
                </h5>
                <p className="text-sm text-on-surface-variant mt-2">
                  Stay for a month or a year. Pivot when your life does.
                </p>
              </div>
              <div className="bg-surface-container-high p-8 rounded-[2rem] aspect-square flex flex-col justify-end">
                <span className="material-symbols-outlined text-4xl mb-4 text-primary">
                  check_circle
                </span>
                <h5 className="font-headline font-bold text-xl text-on-background">
                  Fully Furnished
                </h5>
                <p className="text-sm text-on-surface-variant mt-2">
                  Designer spaces that feel like home from minute one.
                </p>
              </div>
              <div className="bg-primary-container/40 p-8 rounded-[2rem] aspect-square flex flex-col justify-end translate-y-8">
                <span className="material-symbols-outlined text-4xl mb-4 text-primary">
                  bolt
                </span>
                <h5 className="font-headline font-bold text-xl text-on-background">
                  Zero Hassle
                </h5>
                <p className="text-sm text-on-primary-container/80 mt-2">
                  One bill covers everything from Wi-Fi to cleaning.
                </p>
              </div>
            </div>

            <div className="order-1 lg:order-2 space-y-8">
              <h2 className="text-primary font-headline text-lg font-bold tracking-widest uppercase">
                Why Zestay?
              </h2>
              <h3 className="text-5xl font-headline font-bold text-on-background tracking-tighter leading-tight">
                Living, redefined for the modern age.
              </h3>
              <p className="text-lg text-on-surface-variant leading-relaxed">
                We believe that where you live should inspire how you live.
                We&apos;ve stripped away the friction of traditional renting—deposits,
                utilities, long-term contracts—and replaced it with a seamless,
                designer experience centered around you.
              </p>
              <div className="pt-4">
                <button className="bg-on-background text-surface px-8 py-4 rounded-xl font-headline font-bold text-lg hover:scale-95 duration-150 ease-in-out">
                  Our Mission
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="bg-surface-container py-24 px-6 overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h3 className="text-4xl font-headline font-bold text-on-background">
                Voices from the Community
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Quote 1 */}
              <div className="bg-surface p-8 rounded-[2rem] border border-outline-variant/20 shadow-sm">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-primary-container relative">
                    <Image
                      alt="Resident portrait"
                      className="w-full h-full object-cover"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuDUwZTLrYWSur-o7bjOZF2z_rk5tt31bu4Wv9whHBsE6OyrHKRD3h18r7cPpTx4NUDWYINVH13jIB03Nb8dRtHrAg_UVMLIEGFFTQZ7gV2cr3DusHEz8nSOys8WS8BLhWSKziee_PbzCjNhHsyEM3sZHRtwP7AWnNDw3D2e6VZ6-zKgapa10BBPHwabPin1uHhIcRA-Ry9kt_e3e9iFXIU32ZA0PaMc8Ue5qUTBlNUGFaDhDToxPNh5d0Vx1yqzAgVGX1iX53Mxwzc"
                      fill
                    />
                  </div>
                  <div>
                    <h6 className="font-bold text-on-background">Sarah J.</h6>
                    <p className="text-xs text-primary font-bold uppercase tracking-widest">
                      Lisbon Resident
                    </p>
                  </div>
                </div>
                <p className="text-on-surface-variant italic leading-relaxed">
                  &quot;I moved to Lisbon knowing no one. Within a week at Zestay, I
                  had a group of friends for surfing and a collaborator for my
                  startup. It&apos;s more than a room.&quot;
                </p>
              </div>

              {/* Quote 2 */}
              <div className="bg-surface p-8 rounded-[2rem] border border-outline-variant/20 shadow-sm">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-primary-container relative">
                    <Image
                      alt="Resident portrait"
                      className="w-full h-full object-cover"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuCmhCle73ZZN6hqxD8hJKr9orDVwj6ky7nky2PKeSkydJ6aiKcW0GK9BE0vNc1MIKwjX501LPHzE-6Xu6KIz6Iqsd3cye4YeSdcbfMPBrPwm0T3sVJmRs22eYeqhmq5287ZbW5qhWqy52oLyyotREYzF6M9m-9chYH-KRscpT9DR7KxFcRFrudfCPn8YXAQAlAeu2rpnvjvp9P2BmB26OU5CpL9VRA1OXorkOrYz8p1VwTNxPq8nuhP-B1FEyP7LpR2gB5hPWaw8oE"
                      fill
                    />
                  </div>
                  <div>
                    <h6 className="font-bold text-on-background">Marc L.</h6>
                    <p className="text-xs text-primary font-bold uppercase tracking-widest">
                      Berlin Resident
                    </p>
                  </div>
                </div>
                <p className="text-on-surface-variant italic leading-relaxed">
                  &quot;The design is what brought me in, but the convenience is why
                  I stay. Having a workspace and a beautiful bedroom under one
                  roof changed my productivity.&quot;
                </p>
              </div>

              {/* Quote 3 */}
              <div className="bg-surface p-8 rounded-[2rem] border border-outline-variant/20 shadow-sm">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-primary-container relative">
                    <Image
                      alt="Resident portrait"
                      className="w-full h-full object-cover"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuCqqYvsBQgB5wySPLSnW5WBcMJe8G6qobhGJREShUBDKjRbdWhHxgK0vYoR6nYoDrVSIq91HTkQX4D_V9JkSZWloHs6DU1oAZKFRpYXPvN55_XxZlk6H1cAUIEVicSpLOlwqc-rd7m8CqA18ihWjUS-teqT2RjTPd9WfQc8mu_FRRleyONu9fhXEqWAcCn2IhkeKESXdbD2VBGyWFzT14DO9m1RiGVG55dJmh7Epp1HNY9gh5cHsVLm7cfZYqTt6Y775xUbpJtUBv8"
                      fill
                    />
                  </div>
                  <div>
                    <h6 className="font-bold text-on-background">Elena R.</h6>
                    <p className="text-xs text-primary font-bold uppercase tracking-widest">
                      Amsterdam Resident
                    </p>
                  </div>
                </div>
                <p className="text-on-surface-variant italic leading-relaxed">
                  &quot;I love the curated events. Last week we had a communal pasta
                  night and a guest lecture from a local designer. It&apos;s truly
                  inspiring living.&quot;
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 px-6">
          <div className="max-w-7xl mx-auto bg-on-background rounded-[3rem] p-12 md:p-24 text-center overflow-hidden relative">
            {/* Abstract Sky Gradient Background Decor */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent opacity-50 pointer-events-none"></div>
            <div className="relative z-10">
              <h2 className="text-surface font-headline text-5xl md:text-7xl font-bold tracking-tighter leading-none mb-8">
                Ready to find <br />
                your tribe?
              </h2>
              <p className="text-surface/70 text-xl max-w-xl mx-auto mb-12">
                Applications for our upcoming Fall cohort are now open in Lisbon,
                Berlin, and London.
              </p>
              <div className="flex flex-col md:flex-row gap-4 justify-center">
                <button className="bg-primary-container text-on-primary-container px-12 py-5 rounded-2xl font-headline font-bold text-xl hover:scale-105 transition-transform">
                  Apply Now
                </button>
                <button className="bg-transparent text-surface border border-surface/20 px-12 py-5 rounded-2xl font-headline font-bold text-xl hover:bg-surface/10 transition-colors">
                  Schedule a Tour
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#fcecce] w-full py-12 px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:flex lg:justify-between items-start gap-8 max-w-7xl mx-auto">
          <div className="max-w-xs">
            <div className="text-xl font-bold text-[#221b08] font-headline mb-6">
              Zestay
            </div>
            <p className="text-[#42484a] text-sm leading-relaxed mb-6 font-['Plus_Jakarta_Sans']">
              Elevating the human experience through intentional living and
              community-first spaces.
            </p>
            <div className="flex gap-4">
              <span className="material-symbols-outlined text-[#476369] cursor-pointer hover:opacity-70">
                language
              </span>
              <span className="material-symbols-outlined text-[#476369] cursor-pointer hover:opacity-70">
                public
              </span>
              <span className="material-symbols-outlined text-[#476369] cursor-pointer hover:opacity-70">
                person_add
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-16">
            <div>
              <h5 className="text-[#221b08] font-bold text-xs uppercase tracking-widest mb-6">
                Explore
              </h5>
              <ul className="space-y-4">
                <li>
                  <a
                    className="text-[#42484a] text-sm hover:underline decoration-[#b6d4dc] underline-offset-4 opacity-80 hover:opacity-100 transition-opacity"
                    href="#"
                  >
                    Homes
                  </a>
                </li>
                <li>
                  <a
                    className="text-[#42484a] text-sm hover:underline decoration-[#b6d4dc] underline-offset-4 opacity-80 hover:opacity-100 transition-opacity"
                    href="#"
                  >
                    Living
                  </a>
                </li>
                <li>
                  <a
                    className="text-[#42484a] text-sm hover:underline decoration-[#b6d4dc] underline-offset-4 opacity-80 hover:opacity-100 transition-opacity"
                    href="#"
                  >
                    Community
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h5 className="text-[#221b08] font-bold text-xs uppercase tracking-widest mb-6">
                Company
              </h5>
              <ul className="space-y-4">
                <li>
                  <a
                    className="text-[#42484a] text-sm hover:underline decoration-[#b6d4dc] underline-offset-4 opacity-80 hover:opacity-100 transition-opacity font-['Plus_Jakarta_Sans']"
                    href="#"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    className="text-[#42484a] text-sm hover:underline decoration-[#b6d4dc] underline-offset-4 opacity-80 hover:opacity-100 transition-opacity font-['Plus_Jakarta_Sans']"
                    href="#"
                  >
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a
                    className="text-[#42484a] text-sm hover:underline decoration-[#b6d4dc] underline-offset-4 opacity-80 hover:opacity-100 transition-opacity font-['Plus_Jakarta_Sans']"
                    href="#"
                  >
                    Contact Us
                  </a>
                </li>
                <li>
                  <a
                    className="text-[#42484a] text-sm hover:underline decoration-[#b6d4dc] underline-offset-4 opacity-80 hover:opacity-100 transition-opacity font-['Plus_Jakarta_Sans']"
                    href="#"
                  >
                    Careers
                  </a>
                </li>
                <li>
                  <a
                    className="text-[#42484a] text-sm hover:underline decoration-[#b6d4dc] underline-offset-4 opacity-80 hover:opacity-100 transition-opacity font-['Plus_Jakarta_Sans']"
                    href="#"
                  >
                    Press
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div>
            <h5 className="text-[#221b08] font-bold text-xs uppercase tracking-widest mb-6">
              Newsletter
            </h5>
            <div className="flex gap-2">
              <input
                className="bg-surface p-3 rounded-xl border-none text-sm w-48 focus:ring-2 focus:ring-primary"
                placeholder="Email address"
                type="email"
              />
              <button className="bg-[#221b08] text-surface p-3 rounded-xl flex items-center justify-center">
                <span className="material-symbols-outlined">send</span>
              </button>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-outline-variant/10 text-center">
          <p className="text-[#42484a] text-xs font-['Plus_Jakarta_Sans'] opacity-60">
            © 2024 Zestay Coliving. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
}
