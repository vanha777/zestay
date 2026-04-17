import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      {/* Top Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-[#fff8f1]/80 backdrop-blur-md">
        <div className="flex justify-between items-center px-8 py-4 max-w-7xl mx-auto">
          <div className="flex items-center gap-3">
            <Image src="/zestayLogo.png" alt="Zestay Logo" width={150} height={50} className="h-10 w-auto" priority />
            <span className="text-2xl font-bold tracking-tighter text-[#221b08] font-headline">Zestay</span>
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
          <Link href="/book" className="bg-on-background text-surface px-6 py-2.5 rounded-full font-headline font-bold text-sm hover:scale-95 duration-150 ease-in-out inline-block border-none">
            Book Now
          </Link>
        </div>
      </nav>

      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative px-6 pt-12 pb-24 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7">
            <h1 className="text-6xl md:text-7xl font-headline font-bold text-on-background tracking-tighter leading-[0.95] mb-8">
              Modern co-living. <br />
              <span className="text-primary italic">Live better, together.</span>
            </h1>
            <p className="text-xl text-on-surface-variant max-w-lg mb-12 leading-relaxed">
              Designer co-living for the modern professional.
              Beautifully furnished rooms in Australia's best neighbourhoods.
              Flexible terms, all bills included, and a seamless booking process.
            </p>

            {/* Search Bar */}
            <div className="bg-surface-container-high p-4 rounded-xl shadow-sm max-w-2xl flex flex-col md:flex-row gap-4 items-center border border-outline-variant/20">
              <div className="flex-1 w-full space-y-1 px-4 border-r border-outline-variant/30">
                <label className="text-[10px] uppercase font-bold tracking-widest text-primary block">
                  Location
                </label>
                <select
                  className="w-full bg-transparent border-none p-0 focus:ring-0 font-medium text-on-surface-variant/80"
                  defaultValue=""
                >
                  <option value="" disabled>Where to?</option>
                  <option value="melbourne">Melbourne (available now)</option>
                  <option value="sydney">Sydney (coming soon)</option>
                  <option value="brisbane">Brisbane (coming soon)</option>
                </select>
              </div>
              <div className="flex-1 w-full space-y-1 px-4 border-r border-outline-variant/30">
                <label className="text-[10px] uppercase font-bold tracking-widest text-primary block">
                  Stay Length
                </label>
                <select className="w-full bg-transparent border-none p-0 focus:ring-0 font-medium">
                  <option>4 weeks</option>
                  <option>1-3 months</option>
                  <option>3+ months</option>
                </select>
              </div>
              <Link href="/book" className="w-full md:w-auto bg-primary text-on-primary px-8 py-4 rounded-xl font-bold font-headline flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
                <span className="material-symbols-outlined text-sm">
                  search
                </span>
                Find a Room
              </Link>
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
            <div className="absolute -bottom-8 -left-8 bg-primary-container p-6 rounded-2xl shadow-xl max-w-[240px] hidden md:block">
              <div className="font-headline font-bold text-lg text-on-primary-container leading-tight mb-2">
                Inner-city locations <br />
                Bills included
              </div>
              <div className="text-sm font-medium text-on-primary-container/80 space-y-1">
                Book before you arrive <br />
                Like-minded housemates
              </div>
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
                    src="/house/brunswick.jpeg"
                    alt="Chic sunlit bedroom in a minimalist apartment"
                    width={600}
                    height={400}
                  />
                  <div className="absolute top-4 left-4 bg-on-background text-surface text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                    Brunswick, Melbourne
                  </div>
                </div>
                <div className="p-8">
                  <h4 className="font-headline text-2xl font-bold mb-2">
                    Brunswick Street House
                  </h4>
                  <p className="text-on-surface-variant text-sm mb-6">
                    Brunswick Street vibes. Trams, coffee, nightlife — all on your doorstep.
                  </p>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-[10px] uppercase font-bold text-outline">
                        From
                      </p>
                      <p className="text-xl font-headline font-bold text-on-background">
                        $380
                        <span className="text-sm font-normal text-on-surface-variant">
                          /week — bills included
                        </span>
                      </p>
                    </div>
                    <Link href="/book" className="bg-primary-container text-on-primary-container px-5 py-2 rounded-xl font-bold text-sm hover:opacity-80 transition-opacity inline-block">
                      See Rooms
                    </Link>
                  </div>
                </div>
              </div>

              {/* Card 2 */}
              <div className="bg-surface-container-highest rounded-xl overflow-hidden group border border-outline-variant/30">
                <div className="aspect-[16/10] overflow-hidden relative">
                  <Image
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    src="/house/hawthorn.png"
                    alt="Spacious loft bedroom with industrial windows"
                    width={600}
                    height={400}
                  />
                  <div className="absolute top-4 left-4 bg-on-background text-surface text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                    Hawthorn East, Melbourne
                  </div>
                </div>
                <div className="p-8">
                  <h4 className="font-headline text-2xl font-bold mb-2">
                    Hawthorn East Residence
                  </h4>
                  <p className="text-on-surface-variant text-sm mb-6">
                    Classic brick veneer comfort on leafy streets. Spacious living with easy access to local cafes and city trains.
                  </p>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-[10px] uppercase font-bold text-outline">
                        From
                      </p>
                      <p className="text-xl font-headline font-bold text-on-background">
                        $320
                        <span className="text-sm font-normal text-on-surface-variant">
                          /week — bills included
                        </span>
                      </p>
                    </div>
                    <Link href="/book" className="bg-primary-container text-on-primary-container px-5 py-2 rounded-xl font-bold text-sm hover:opacity-80 transition-opacity inline-block">
                      See Rooms
                    </Link>
                  </div>
                </div>
              </div>

              {/* Card 3 */}
              <div className="bg-surface-container-highest rounded-xl overflow-hidden group border border-outline-variant/30">
                <div className="aspect-[16/10] overflow-hidden relative">
                  <Image
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    src="/house/hawthornEast.png"
                    alt="Modern high-end apartment room with views of Lisbon rooftops"
                    width={600}
                    height={400}
                  />
                  <div className="absolute top-4 left-4 bg-on-background text-surface text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                    Hawthorn, Melbourne
                  </div>
                </div>
                <div className="p-8">
                  <h4 className="font-headline text-2xl font-bold mb-2">
                    Hawthorn Heritage House
                  </h4>
                  <p className="text-on-surface-variant text-sm mb-6">
                    A beautifully restored classic weatherboard home. Enjoy high ceilings, period charm, and a short stroll to the bustling Glenferrie Road precinct.
                  </p>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-[10px] uppercase font-bold text-outline">
                        From
                      </p>
                      <p className="text-xl font-headline font-bold text-on-background">
                        $350
                        <span className="text-sm font-normal text-on-surface-variant">
                          /week — bills included
                        </span>
                      </p>
                    </div>
                    <Link href="/book" className="bg-primary-container text-on-primary-container px-5 py-2 rounded-xl font-bold text-sm hover:opacity-80 transition-opacity inline-block">
                      See Rooms
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 px-6 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1 grid grid-cols-2 gap-4">
              <div className="bg-primary-container p-8 rounded-[2rem] aspect-square flex flex-col justify-end">
                <span className="material-symbols-outlined text-4xl mb-4 text-primary">
                  group
                </span>
                <h5 className="font-headline font-bold text-xl text-on-background">
                  A community of peers
                </h5>
                <p className="text-sm text-on-primary-container/80 mt-2">
                  Share your living space with professionals, relocators, and explorers. Build meaningful connections with like-minded people.
                </p>
              </div>
              <div className="bg-surface-container-highest p-8 rounded-[2rem] aspect-square flex flex-col justify-end translate-y-8">
                <span className="material-symbols-outlined text-4xl mb-4 text-primary">
                  calendar_month
                </span>
                <h5 className="font-headline font-bold text-xl text-on-background">
                  Actually flexible
                </h5>
                <p className="text-sm text-on-surface-variant mt-2">
                  Stay as long as you need. Whether it's a few months or a longer relocation, your housing adapts seamlessly to your timeline.
                </p>
              </div>
              <div className="bg-surface-container-high p-8 rounded-[2rem] aspect-square flex flex-col justify-end">
                <span className="material-symbols-outlined text-4xl mb-4 text-primary">
                  bed
                </span>
                <h5 className="font-headline font-bold text-xl text-on-background">
                  Move-in ready
                </h5>
                <p className="text-sm text-on-surface-variant mt-2">
                  Bed, desk, wardrobe, WiFi. Everything you need, nothing you don't. Show up with your suitcase, that's it.
                </p>
              </div>
              <div className="bg-primary-container/40 p-8 rounded-[2rem] aspect-square flex flex-col justify-end translate-y-8">
                <span className="material-symbols-outlined text-4xl mb-4 text-primary">
                  payments
                </span>
                <h5 className="font-headline font-bold text-xl text-on-background">
                  All bills, all included
                </h5>
                <p className="text-sm text-on-primary-container/80 mt-2">
                  Rent, power, water, internet — one price, done. No utility accounts to set up. No surprise invoices.
                </p>
              </div>
              <div className="col-span-2 bg-surface-container-highest p-8 rounded-[2rem] flex flex-col justify-end mt-4">
                <span className="material-symbols-outlined text-4xl mb-4 text-primary">
                  public
                </span>
                <h5 className="font-headline font-bold text-xl text-on-background">
                  Book from anywhere
                </h5>
                <p className="text-sm text-on-surface-variant mt-2">
                  Sort your room before you even get on the plane. No inspections. No awkward group chats. Just confirm and go.
                </p>
              </div>
            </div>

            <div className="order-1 lg:order-2 space-y-8">
              <h2 className="text-primary font-headline text-5xl font-bold tracking-tighter leading-tight">
                Quality housing, simplified.
              </h2>
              <div className="text-lg text-on-surface-variant leading-relaxed space-y-4">
                <p>
                  Securing a great place to stay shouldn't require long-term commitments or endless paperwork.
                  Traditional leases trap you into 12-month contracts, while short-term options are often costly or lack community.
                </p>
                <p>
                  Zestay bridges that gap. We provide a seamless housing experience tailored for those who value both freedom and comfort.
                </p>
                <p>
                  Whether you're relocating for work, looking for a medium-term base, or just exploring a new city, our thoughtfully furnished spaces offer flexible terms and a community ready to welcome you.
                </p>
              </div>
              <div className="pt-4">
                <Link href="/book" className="bg-on-background text-surface px-8 py-4 rounded-xl font-headline font-bold text-lg hover:scale-95 duration-150 ease-in-out inline-block">
                  See what's available
                </Link>
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
                  <div className="flex flex-col justify-center">
                    <h6 className="font-bold text-on-background">Pranav, UK &rarr; Melbourne</h6>
                  </div>
                </div>
                <p className="text-on-surface-variant italic leading-relaxed">
                  &quot;Getting off a 24-hour flight and walking straight into a beautifully furnished home was a lifesaver. The space was exactly as advertised, the utilities were already sorted, and having a welcoming from Patrick & Sofia made the entire relocation effortless.&quot;
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
                  <div className="flex flex-col justify-center">
                    <h6 className="font-bold text-on-background">Jason, Sydney &rarr; Melbourne</h6>
                  </div>
                </div>
                <p className="text-on-surface-variant italic leading-relaxed">
                  &quot;I wanted to spend some time in Melbourne before my holiday to Taiwan. The hosts were incredibly flexible and reasonable to deal with from day one. The location is fantastic too—with all the amenities practically on your doorstep, you really don't need a car. An absolutely stress-free stay.&quot;
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
                  <div className="flex flex-col justify-center">
                    <h6 className="font-bold text-on-background">Sia, Fiji &rarr; Melbourne</h6>
                  </div>
                </div>
                <p className="text-on-surface-variant italic leading-relaxed">
                  &quot;Relocating from Fiji for a job placement, I didn't want to risk signing a long-term lease right away. Finding Sofia and Zestay on Flatmates was the perfect solution. It was incredibly convenient—just a 10-minute walk to work! It gave me a flexible, stress-free base until my role was secure and I was ready to find my own home. Highly recommended.&quot;
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
                Your Australia starts <br />
                with a good room.
              </h2>
              <p className="text-surface/70 text-xl max-w-xl mx-auto mb-12">
                Hawthorn. Camberwell. Fitzroy. Collingwood. St Kilda. Richmond. <br />
                Rooms open now — book online, move in this week.
              </p>
              <div className="flex flex-col md:flex-row gap-4 justify-center">
                <Link href="/book" className="bg-primary-container text-on-primary-container px-12 py-5 rounded-2xl font-headline font-bold text-xl hover:scale-105 transition-transform inline-block">
                  Browse Rooms
                </Link>
                <button className="bg-transparent text-surface border border-surface/20 px-12 py-5 rounded-2xl font-headline font-bold text-xl hover:bg-surface/10 transition-colors">
                  Get notified about new spots
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
            <div className="mb-6 flex items-center gap-3">
              <Image src="/zestayLogo.png" alt="Zestay Logo" width={150} height={50} className="h-10 w-auto" />
              <span className="text-xl font-bold text-[#221b08] font-headline">Zestay</span>
            </div>
            <p className="text-[#42484a] text-sm leading-relaxed mb-6 font-['Plus_Jakarta_Sans']">
              Premium private rooms for professionals, relocators, and explorers in Australia.
              Your space. Your terms. Your journey.
            </p>
            <div className="flex gap-4">
              <a href="https://www.facebook.com/profile.php?id=61579994953333" target="_blank" rel="noreferrer" className="text-[#476369] hover:opacity-70 transition-opacity">
                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                </svg>
              </a>
              <a href="https://www.instagram.com/zestayau/" target="_blank" rel="noreferrer" className="text-[#476369] hover:opacity-70 transition-opacity">
                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12.026 2.001c3.275 0 3.664.013 4.954.072 1.192.055 1.839.255 2.271.423.574.223.984.49 1.414.92.43.43.697.84.92 1.414.168.432.368 1.079.423 2.271.059 1.29.072 1.679.072 4.954s-.013 3.664-.072 4.954c-.055 1.192-.255 1.839-.423 2.271-.223.574-.49.984-.92 1.414-.43.43-.84.697-1.414.92-.432.168-1.079.368-2.271.423-1.29.059-1.679.072-4.954.072s-3.664-.013-4.954-.072c-1.192-.055-1.839-.255-2.271-.423-.574-.223-.984-.49-1.414-.92-.43-.43-.697-.84-.92-1.414-.168-.432-.368-1.079-.423-2.271-.059-1.29-.072-1.679-.072-4.954s.013-3.664.072-4.954c.055-1.192.255-1.839.423-2.271.223-.574.49-.984.92-1.414.43-.43.84-.697 1.414-.92.432-.168 1.079-.368 2.271-.423 1.29-.059 1.679-.072 4.954-.072zm0 1.802c-3.221 0-3.606.012-4.876.07-1.066.049-1.646.228-2.031.378-.512.199-.877.438-1.26.82-.382.383-.621.748-.82 1.26-.15.385-.329.965-.378 2.031-.058 1.27-.07 1.655-.07 4.876s.012 3.606.07 4.876c.049 1.066.228 1.646.378 2.031.199.512.438.877.82 1.26.383.382.748.621 1.26.82.385.15.965.329 2.031.378 1.27.058 1.655.07 4.876.07s3.606-.012 4.876-.07c1.066-.049 1.646-.228 2.031-.378.512-.199.877-.438 1.26-.82.382-.383.621-.748.82-1.26.15-.385.329-.965.378-2.031.058-1.27.07-1.655.07-4.876s-.012-3.606-.07-4.876c-.049-1.066-.228-1.646-.378-2.031-.199-.512-.438-.877-.82-1.26-.383-.382-.748-.621-1.26-.82-.385-.15-.965-.329-2.031-.378-1.27-.058-1.655-.07-4.876-.07zm0 3.064c-2.836 0-5.134 2.298-5.134 5.134s2.298 5.134 5.134 5.134 5.134-2.298 5.134-5.134-2.298-5.134-5.134-5.134zm0 8.466c-1.84 0-3.332-1.492-3.332-3.332s1.492-3.332 3.332-3.332 3.332 1.492 3.332 3.332-1.492 3.332-3.332 3.332zm4.18-7.903c-.664 0-1.202.538-1.202 1.202s.538 1.202 1.202 1.202 1.202-.538 1.202-1.202-.538-1.202-1.202-1.202z" />
                </svg>
              </a>
              {/* <span className="material-symbols-outlined text-[#476369] cursor-pointer hover:opacity-70">
                person_add
              </span> */}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-16">
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
                    Rooms (Melbourne, Sydney, Brisbane)
                  </a>
                </li>
                <li>
                  <a
                    className="text-[#42484a] text-sm hover:underline decoration-[#b6d4dc] underline-offset-4 opacity-80 hover:opacity-100 transition-opacity"
                    href="#"
                  >
                    How It Works
                  </a>
                </li>
                <li>
                  <a
                    className="text-[#42484a] text-sm hover:underline decoration-[#b6d4dc] underline-offset-4 opacity-80 hover:opacity-100 transition-opacity"
                    href="#"
                  >
                    For Landlords
                  </a>
                </li>
                <li>
                  <a
                    className="text-[#42484a] text-sm hover:underline decoration-[#b6d4dc] underline-offset-4 opacity-80 hover:opacity-100 transition-opacity"
                    href="#"
                  >
                    About / Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div>
            <h5 className="text-[#221b08] font-bold text-xs uppercase tracking-widest mb-6">
              Newsletter
            </h5>
            <p className="text-[#42484a] text-sm mb-4 font-['Plus_Jakarta_Sans']">
              Get notified when new rooms open
            </p>
            <div className="flex gap-2">
              <input
                className="bg-surface p-3 rounded-xl border-none text-sm w-48 focus:ring-2 focus:ring-primary"
                placeholder="Email address"
                type="email"
              />
              <button className="bg-[#221b08] text-surface p-3 rounded-xl flex items-center justify-center font-bold text-sm px-4">
                Notify Me
              </button>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-outline-variant/10 text-center flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[#42484a] text-xs font-['Plus_Jakarta_Sans'] opacity-60">
            © 2024 Zestay Coliving. All rights reserved.
          </p>
          <div className="flex gap-4">
            <a href="https://www.instagram.com/zestayau/" className="text-[#42484a] opacity-60 hover:opacity-100 text-xs font-['Plus_Jakarta_Sans'] hover:underline">Instagram</a>
            {/* <a href="#" className="text-[#42484a] opacity-60 hover:opacity-100 text-xs font-['Plus_Jakarta_Sans'] hover:underline">TikTok</a> */}
            <a href="https://www.facebook.com/profile.php?id=61579994953333" className="text-[#42484a] opacity-60 hover:opacity-100 text-xs font-['Plus_Jakarta_Sans'] hover:underline">Facebook</a>
          </div>
        </div>
      </footer>
    </>
  );
}
