import { Check, Plane, Star, Crown, Gem } from "lucide-react";
import { formatPrice } from "../data/currency.js";
import Reveal from "./Reveal.jsx";

const tiers = [
  { name: "Economy", icon: Plane, tagline: "Simple, well-priced journeys", from: 799, features: ["1 checked bag", "Standard hotel", "Basic support", "Standard seating"] },
  { name: "Premium", icon: Star, tagline: "The sweet spot for most trips", from: 1499, popular: true, features: ["2 checked bags", "4-star hotel", "Priority support", "Preferred seating"] },
  { name: "Business", icon: Crown, tagline: "Room to work, rest and arrive fresh", from: 2899, features: ["3 checked bags", "5-star hotel", "Lounge access", "Priority boarding"] },
  { name: "Luxury", icon: Gem, tagline: "Every detail handled for you", from: 5499, features: ["Unlimited baggage", "Luxury resort", "Private transfers", "Concierge service"] },
];

export default function Pricing({ currency }) {
  return (
    <section id="pricing" className="bg-slate-50 px-4 py-20 sm:px-6 lg:px-10 lg:py-28">
      <div className="mx-auto max-w-[1280px]">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">Choose Your Way to Travel</h2>
          <p className="mt-3 text-slate-500">Four ways to fly and stay — pick the level of comfort that fits your journey.</p>
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {tiers.map((t, i) => {
            const Icon = t.icon;
            return (
              <Reveal key={t.name} delay={i * 0.08}>
                <article
                  className={`relative flex h-full flex-col rounded-3xl p-7 transition-all duration-300 hover:-translate-y-2 ${
                    t.popular
                      ? "bg-navy text-white shadow-lift ring-1 ring-amber/40"
                      : "border border-slate-200 bg-white hover:shadow-lift"
                  }`}
                >
                  {t.popular && (
                    <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-gradient-to-r from-amber to-amber-soft px-4 py-1.5 text-[11px] font-extrabold tracking-wider text-navy shadow-lg">
                      MOST POPULAR
                    </span>
                  )}
                  <span className={`grid h-12 w-12 place-items-center rounded-2xl ${t.popular ? "bg-white/10 text-amber-soft" : "bg-blue-50 text-ocean"}`}>
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <h3 className={`mt-5 text-xl font-extrabold ${t.popular ? "!text-white" : ""}`}>{t.name}</h3>
                  <p className={`mt-1 text-sm ${t.popular ? "text-slate-300" : "text-slate-500"}`}>{t.tagline}</p>

                  <p className="mt-5">
                    <span className={`block text-xs font-semibold ${t.popular ? "text-slate-400" : "text-slate-500"}`}>Journeys from</span>
                    <span className={`text-3xl font-extrabold ${t.popular ? "text-white" : "text-navy"}`}>{formatPrice(t.from, currency)}</span>
                  </p>

                  <ul className="mt-6 space-y-3 text-sm">
                    {t.features.map((f) => (
                      <li key={f} className="flex items-center gap-2.5">
                        <Check className={`h-4 w-4 shrink-0 ${t.popular ? "text-amber-soft" : "text-ocean"}`} aria-hidden="true" />
                        <span className={t.popular ? "text-slate-200" : "text-slate-700"}>{f}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    type="button"
                    className={`mt-8 w-full rounded-full py-3.5 text-sm font-bold transition-all active:scale-95 ${
                      t.popular ? "bg-amber-soft text-navy hover:bg-amber" : "bg-ocean/10 text-ocean hover:bg-ocean hover:text-white"
                    }`}
                  >
                    Choose {t.name}
                  </button>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
