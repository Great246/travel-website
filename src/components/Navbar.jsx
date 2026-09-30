import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Globe2, Menu, X, ChevronDown } from "lucide-react";
import { currencies } from "../data/currency.js";

const links = [
  { label: "Home", href: "#home" },
  { label: "Packages", href: "#packages" },
  { label: "Destinations", href: "#destinations" },
  { label: "Bookings", href: "#bookings" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar({ currency, onCurrencyChange }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const solid = scrolled || open;
  const textColor = solid ? "text-slate-700" : "text-white/90";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-300 ${
        solid
          ? "border-slate-200/80 bg-white/90 shadow-soft backdrop-blur-xl"
          : "border-white/10 bg-white/5 backdrop-blur-md"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-[1360px] items-center justify-between px-4 sm:px-6 lg:h-[72px] lg:px-10" aria-label="Main">
        <a href="#home" className="flex items-center gap-2" aria-label="GlobeTrek home">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-bright to-ocean text-white shadow-lg shadow-ocean/30">
            <Globe2 className="h-5 w-5" aria-hidden="true" />
          </span>
          <span className={`text-lg font-extrabold tracking-tight ${solid ? "text-navy" : "text-white"}`}>GlobeTrek</span>
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className={`rounded-full px-3.5 py-2 text-sm font-semibold transition-colors hover:bg-slate-500/10 ${textColor} ${
                  solid ? "hover:text-ocean" : "hover:text-white"
                }`}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 lg:flex">
          <CurrencySelect solid={solid} value={currency} onChange={onCurrencyChange} />
          <button className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${textColor} hover:text-ocean`}>
            Sign In
          </button>
          <motion.a
            href="#bookings"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="rounded-full bg-ocean px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-ocean/30 transition-colors hover:bg-bright"
          >
            Book Now
          </motion.a>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className={`grid h-11 w-11 place-items-center rounded-xl lg:hidden ${solid ? "text-navy" : "text-white"}`}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="overflow-hidden lg:hidden"
          >
            <ul className="flex flex-col gap-1 px-4 pb-4 pt-1">
              {links.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-xl px-4 py-3 text-base font-semibold text-slate-700 hover:bg-slate-100"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
              <li className="mt-2 flex items-center gap-3">
                <CurrencySelect solid value={currency} onChange={onCurrencyChange} />
                <button className="flex-1 rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-navy">Sign In</button>
              </li>
              <li>
                <a
                  href="#bookings"
                  onClick={() => setOpen(false)}
                  className="mt-1 block rounded-xl bg-ocean px-4 py-3.5 text-center text-sm font-bold text-white"
                >
                  Book Now
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function CurrencySelect({ value, onChange, solid }) {
  return (
    <label className="relative block">
      <span className="sr-only">Currency</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`appearance-none rounded-full border py-2 pl-3.5 pr-8 text-sm font-semibold outline-none transition-colors focus-visible:ring-2 focus-visible:ring-bright ${
          solid ? "border-slate-200 bg-white text-navy" : "border-white/25 bg-white/10 text-white"
        }`}
      >
        {Object.entries(currencies).map(([code, c]) => (
          <option key={code} value={code} className="text-navy">
            {c.symbol} {code}
          </option>
        ))}
      </select>
      <ChevronDown className={`pointer-events-none absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 ${solid ? "text-slate-500" : "text-white/80"}`} aria-hidden="true" />
    </label>
  );
}
