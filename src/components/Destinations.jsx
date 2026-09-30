import { ArrowRight, MapPin } from "lucide-react";
import { destinations } from "../data/destinations.js";
import Reveal from "./Reveal.jsx";
import SafeImage from "./SafeImage.jsx";

export default function Destinations() {
  return (
    <section id="destinations" className="bg-slate-50 px-4 py-20 sm:px-6 lg:px-10 lg:py-28">
      <div className="mx-auto max-w-[1280px]">
        <Reveal className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">Explore Popular Destinations</h2>
            <p className="mt-3 max-w-xl text-slate-500">From iconic cities to hidden escapes, discover places worth remembering.</p>
          </div>
          <a href="#destinations" className="group inline-flex items-center gap-1.5 self-start text-sm font-bold text-ocean sm:self-auto">
            View All
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </a>
        </Reveal>

        {/* Mobile: horizontal snap scroll. md+: grid. */}
        <ul className="no-scrollbar -mx-4 mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 sm:-mx-6 sm:px-6 md:mx-0 md:grid md:grid-cols-2 md:gap-5 md:overflow-visible md:px-0 md:pb-0 lg:grid-cols-3">
          {destinations.map((d, i) => (
            <li key={d.id} className={`w-[78%] shrink-0 snap-center sm:w-[60%] md:w-auto ${i === 0 ? "lg:col-span-2" : ""}`}>
              <a
                href="#packages"
                className="group relative block h-[380px] overflow-hidden rounded-3xl shadow-soft transition-all duration-500 hover:-translate-y-2 hover:shadow-lift sm:h-[420px]"
              >
                <SafeImage
                  src={d.image}
                  alt={d.alt}
                  className="h-full w-full transition-transform duration-700 ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/85 via-navy/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <p className="flex items-center gap-1.5 text-xs font-semibold text-white/80">
                    <MapPin className="h-3.5 w-3.5 text-amber-soft" aria-hidden="true" /> {d.country}
                  </p>
                  <h3 className="mt-1 text-2xl font-extrabold !text-white">{d.city}</h3>
                  <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-bold text-white">
                    Explore
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" aria-hidden="true" />
                  </span>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
