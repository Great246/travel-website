import { Star, BadgeCheck } from "lucide-react";
import { testimonials } from "../data/testimonials.js";
import Reveal from "./Reveal.jsx";

const initials = (name) => name.split(" ").map((n) => n[0]).join("");

export default function Testimonials() {
  return (
    <section id="reviews" className="bg-slate-100 px-4 py-20 sm:px-6 lg:px-10 lg:py-28">
      <div className="mx-auto max-w-[1280px]">
        <Reveal className="max-w-2xl">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">Loved by Travelers</h2>
          <p className="mt-3 text-slate-500">Real stories from people who trusted us with their trips.</p>
        </Reveal>

        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.id} delay={(i % 3) * 0.08}>
              <figure className="flex h-full flex-col rounded-3xl border border-slate-200/70 bg-white p-6 transition-shadow duration-300 hover:shadow-soft">
                <div className="flex gap-0.5" role="img" aria-label={`${t.rating} out of 5 stars`}>
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star key={s} className={`h-4 w-4 ${s < t.rating ? "fill-amber text-amber" : "fill-slate-200 text-slate-200"}`} aria-hidden="true" />
                  ))}
                </div>
                <blockquote className="mt-4 flex-1 text-[15px] leading-relaxed text-slate-700">“{t.review}”</blockquote>
                <figcaption className="mt-6 flex items-center gap-3">
                  <span aria-hidden="true" className={`grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br ${t.tone} text-sm font-bold text-white`}>
                    {initials(t.name)}
                  </span>
                  <span>
                    <span className="block text-sm font-bold text-navy">{t.name}</span>
                    <span className="block text-xs text-slate-500">{t.location}</span>
                  </span>
                  <span className="ml-auto inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600">
                    <BadgeCheck className="h-4 w-4" aria-hidden="true" />
                    <span className="hidden sm:inline">Verified</span>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
