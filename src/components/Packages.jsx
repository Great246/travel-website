import { Star, Clock, MapPin, Check, ArrowRight } from "lucide-react";
import { packages } from "../data/packages.js";
import { formatPrice } from "../data/currency.js";
import Reveal from "./Reveal.jsx";
import SafeImage from "./SafeImage.jsx";

export default function Packages({ currency }) {
  return (
    <section id="packages" className="bg-white px-4 py-20 sm:px-6 lg:px-10 lg:py-28">
      <div className="mx-auto max-w-[1280px]">
        <Reveal className="max-w-2xl">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">Curated Experiences</h2>
          <p className="mt-3 text-slate-500">Handpicked journeys designed for unforgettable moments.</p>
        </Reveal>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {packages.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.1}>
              <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white transition-all duration-300 hover:-translate-y-2 hover:shadow-lift">
                <div className="relative h-60 overflow-hidden">
                  <SafeImage src={p.image} alt={p.alt} className="h-full w-full transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/50 to-transparent" />
                  <span className="absolute left-4 top-4 rounded-full bg-amber-soft px-3 py-1 text-xs font-bold text-navy shadow-md">
                    {p.category}
                  </span>
                  <span className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 text-xs font-bold text-navy backdrop-blur">
                    <Star className="h-3.5 w-3.5 fill-amber text-amber" aria-hidden="true" />
                    {p.rating.toFixed(1)}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <p className="flex items-center gap-1.5 text-xs font-semibold text-slate-500">
                    <MapPin className="h-3.5 w-3.5 text-ocean" aria-hidden="true" /> {p.location}
                  </p>
                  <h3 className="mt-1.5 text-xl font-extrabold">{p.title}</h3>
                  <ul className="mt-4 space-y-2 text-sm text-slate-600">
                    <li className="flex items-center gap-2"><Clock className="h-4 w-4 text-ocean" aria-hidden="true" /> {p.duration}</li>
                    <li className="flex items-center gap-2"><Check className="h-4 w-4 text-ocean" aria-hidden="true" /> {p.includes}</li>
                  </ul>

                  <div className="mt-auto flex items-end justify-between gap-3 border-t border-slate-100 pt-5">
                    <div className="mt-6">
                      <span className="block text-xs font-semibold text-slate-500">From</span>
                      <span className="text-2xl font-extrabold text-navy">{formatPrice(p.price, currency)}</span>
                    </div>
                    <button
                      type="button"
                      className="group/btn inline-flex items-center gap-1.5 rounded-full bg-ocean px-5 py-3 text-sm font-bold text-white transition-all hover:bg-bright active:scale-95"
                    >
                      Explore Package
                      <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
