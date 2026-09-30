import { Globe2, Instagram, Facebook, Twitter, Youtube } from "lucide-react";
import EmailForm from "./EmailForm.jsx";

const TikTok = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M16.6 5.8A4.3 4.3 0 0 1 15.5 3h-3.1v12.4a2.6 2.6 0 1 1-1.9-2.5V9.7a5.7 5.7 0 1 0 5 5.7V9a7.4 7.4 0 0 0 4.3 1.4V7.3a4.3 4.3 0 0 1-3.2-1.5Z" />
  </svg>
);

const socials = [
  { label: "Instagram", icon: Instagram },
  { label: "Facebook", icon: Facebook },
  { label: "Twitter / X", icon: Twitter },
  { label: "YouTube", icon: Youtube },
  { label: "TikTok", icon: TikTok },
];

const columns = [
  { title: "Explore", links: ["Destinations", "Packages", "Flights", "Hotels", "Experiences"] },
  { title: "Company", links: ["About Us", "Careers", "Blog", "Contact"] },
  { title: "Support", links: ["Help Center", "Booking Help", "Cancellation", "Privacy", "Terms"] },
];

export default function Footer() {
  return (
    <footer className="bg-navy px-4 pb-8 pt-16 text-slate-400 sm:px-6 lg:px-10">
      <div className="mx-auto grid max-w-[1280px] gap-12 lg:grid-cols-[1.4fr_2fr_1.4fr]">
        <div>
          <a href="#home" className="flex items-center gap-2" aria-label="GlobeTrek home">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-bright to-ocean text-white">
              <Globe2 className="h-5 w-5" aria-hidden="true" />
            </span>
            <span className="text-lg font-extrabold text-white">GlobeTrek</span>
          </a>
          <p className="mt-4 max-w-xs text-sm leading-relaxed">Making unforgettable journeys easier to discover.</p>
          <ul className="mt-6 flex gap-2">
            {socials.map(({ label, icon: Icon }) => (
              <li key={label}>
                <a
                  href="#"
                  aria-label={label}
                  className="grid h-10 w-10 place-items-center rounded-full bg-white/5 text-slate-300 transition-all hover:-translate-y-0.5 hover:bg-ocean hover:text-white"
                >
                  <Icon className="h-[18px] w-[18px]" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
          {columns.map((c) => (
            <nav key={c.title} aria-label={c.title}>
              <h3 className="text-sm font-bold text-white">{c.title}</h3>
              <ul className="mt-4 space-y-3 text-sm">
                {c.links.map((l) => (
                  <li key={l}>
                    <a href="#" className="transition-colors hover:text-white">{l}</a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div>
          <h3 className="text-sm font-bold text-white">Get travel inspiration</h3>
          <p className="mb-4 mt-4 text-sm">Deals and destination guides, once a month.</p>
          <EmailForm id="footer-email" dark compact />
        </div>
      </div>

      <div className="mx-auto mt-14 max-w-[1280px] border-t border-white/10 pt-6 text-sm">
        © 2026 GlobeTrek. All rights reserved.
      </div>
    </footer>
  );
}
