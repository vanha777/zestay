import Script from "next/script";
import Link from "next/link";
import Image from "next/image";

export default function BookPage() {
  return (
    <div className="min-h-screen bg-[#fff8f1] flex flex-col">
      {/* Top Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-[#fff8f1]/90 backdrop-blur-md border-b border-[#221b08]/5">
        <div className="flex justify-between items-center px-8 py-4 max-w-7xl mx-auto">
          <Link href="/" className="text-xl font-bold tracking-tighter text-[#221b08] font-headline flex items-center gap-2 hover:opacity-70 transition-opacity">
            <span className="material-symbols-outlined text-base">arrow_back</span>
            Back
          </Link>
          <div className="flex items-center gap-3">
            <Image src="/zestayLogo.png" alt="Zestay Logo" width={150} height={50} className="h-10 w-auto" priority />
            <span className="text-2xl font-bold tracking-tighter text-[#221b08] font-headline">Zestay</span>
          </div>
          <div className="w-[66px]"></div> {/* Spacer for center alignment */}
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 w-full flex items-center justify-center p-4 pt-28 pb-12">
        <div className="w-full max-w-3xl bg-white p-8 md:p-12 rounded-[2rem] shadow-xl border border-[#221b08]/10">
          <div className="mb-8 text-center">
            <h1 className="text-4xl md:text-5xl font-headline font-bold text-[#221b08] mb-4 tracking-tight">Complete Your Booking</h1>
            <p className="text-[#42484a] max-w-lg mx-auto leading-relaxed">
              Tell us a bit about yourself and your ideal stay. Our community team will get back to you within 24 hours.
            </p>
          </div>
          
          <div className="min-h-[500px] w-full">
            {/* HubSpot Embed Script & Target Container */}
            <Script src="https://js-ap1.hsforms.net/forms/embed/443026822.js" strategy="afterInteractive" />
            <div 
              className="hs-form-frame" 
              data-region="ap1" 
              data-form-id="295e1cc5-e75f-422a-a41d-933636980619" 
              data-portal-id="443026822"
            ></div>
          </div>
        </div>
      </main>
    </div>
  );
}
