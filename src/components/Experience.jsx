import { useEffect, useRef, useState } from "react";
import { animate, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Reveal from "./Reveal.jsx";
import SafeImage from "./SafeImage.jsx";

const stats = [
  { value: 120, suffix: "+", label: "Destinations" },
  { value: 50, suffix: "K+", label: "Travelers" },
  { value: 4.9, suffix: "/5", label: "Average Rating", decimals: 1 },
];

function Counter({ value, suffix, decimals = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration: 1.6,
      ease: "easeOut",
      onUpdate: (v) => setDisplay(v),
    });
    return () => controls.stop();
  }, [inView, value]);

  return (
    <span ref={ref}>
      {display.toFixed(decimals)}
      {suffix}
    </span>
  );
}

export default function Experience() {
  return (
    <section id="about" className="relative overflow-hidden bg-navy px-4 py-20 sm:px-6 lg:px-10 lg:py-28">
      <div className="pointer-events-none absolute -right-32 top-0 h-96 w-96 rounded-full bg-ocean/20 blur-3xl" />
      <div className="mx-auto grid max-w-[1280px] items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <Reveal>
          <div className="relative">
            <SafeImage
              src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1400&q=80"
              alt="A traveler looking out over a mountain valley at sunrise"
              className="aspect-[4/5] w-full rounded-3xl shadow-2xl shadow-black/40 sm:aspect-[5/4] lg:aspect-[4/5]"
            />
            <div className="absolute -bottom-5 right-4 rounded-2xl border border-white/15 bg-white/10 px-5 py-4 backdrop-blur-xl sm:right-8">
              <p className="text-2xl font-extrabold text-white">98%</p>
              <p className="text-xs font-medium text-white/70">would book with us again</p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-amber-soft">The GlobeTrek Experience</p>
          <h2 className="mt-4 text-4xl font-extrabold leading-[1.08] tracking-tight !text-white sm:text-5xl">
            Travel isn't just about the destination.
          </h2>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-slate-300">
            We take the friction out of planning, so you can spend your energy on the moments that matter — a quiet
            breakfast above the caldera, a night market you'd never have found on your own. Smart search, honest
            pricing, and real people behind every trip.
          </p>

          <dl className="mt-9 grid grid-cols-3 gap-4 border-y border-white/10 py-7">
            {stats.map((s) => (
              <div key={s.label}>
                <dt className="order-2 mt-1 text-xs font-medium text-slate-400 sm:text-sm">{s.label}</dt>
                <dd className="text-2xl font-extrabold text-white sm:text-4xl">
                  <Counter {...s} />
                </dd>
              </div>
            ))}
          </dl>

          <a
            href="#destinations"
            className="group mt-9 inline-flex items-center gap-2 rounded-full bg-white px-7 py-4 text-base font-bold text-navy transition-all hover:bg-amber-soft active:scale-95"
          >
            Start Exploring
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
