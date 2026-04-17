import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#fcecce] w-full py-12 px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:flex lg:justify-between items-start gap-8 max-w-7xl mx-auto">
        <div className="max-w-xs">
          <div className="mb-6 flex items-center gap-3">
            <Image src="/zestayLogo.png" alt="Zestay Logo" width={150} height={50} className="h-10 w-auto" />
            <span className="text-xl font-bold text-[#221b08] font-headline">Zestay</span>
          </div>
          <p className="text-[#42484a] text-sm leading-relaxed mb-6 font-body">
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
          </div>
        </div>

        <div className="grid grid-cols-1 gap-16">
          <div>
            <h5 className="text-[#221b08] font-bold text-xs uppercase tracking-widest mb-6">
              Explore
            </h5>
            <ul className="space-y-4">
              <li>
                <Link
                  className="text-[#42484a] text-sm hover:underline decoration-[#b6d4dc] underline-offset-4 opacity-80 hover:opacity-100 transition-opacity"
                  href="/"
                >
                  Rooms (Melbourne)
                </Link>
              </li>
              <li>
                <Link
                  className="text-[#42484a] text-sm hover:underline decoration-[#b6d4dc] underline-offset-4 opacity-80 hover:opacity-100 transition-opacity"
                  href="/living"
                >
                  Living
                </Link>
              </li>
              <li>
                <Link
                  className="text-[#42484a] text-sm hover:underline decoration-[#b6d4dc] underline-offset-4 opacity-80 hover:opacity-100 transition-opacity"
                  href="/community"
                >
                  Community
                </Link>
              </li>
              <li>
                <Link
                  className="text-[#42484a] text-sm hover:underline decoration-[#b6d4dc] underline-offset-4 opacity-80 hover:opacity-100 transition-opacity"
                  href="/about"
                >
                  About / Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div>
          <h5 className="text-[#221b08] font-bold text-xs uppercase tracking-widest mb-6">
            Newsletter
          </h5>
          <p className="text-[#42484a] text-sm mb-4 font-body">
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
        <p className="text-[#42484a] text-xs font-body opacity-60">
          © 2024 Zestay Coliving. All rights reserved.
        </p>
        <div className="flex gap-4">
          <a href="https://www.instagram.com/zestayau/" className="text-[#42484a] opacity-60 hover:opacity-100 text-xs font-body hover:underline">Instagram</a>
          <a href="https://www.facebook.com/profile.php?id=61579994953333" className="text-[#42484a] opacity-60 hover:opacity-100 text-xs font-body hover:underline">Facebook</a>
        </div>
      </div>
    </footer>
  );
}
