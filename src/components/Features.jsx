import { BadgeCheck, ShieldCheck, Headphones, Sparkles } from "lucide-react";
import Reveal from "./Reveal.jsx";

const features = [
  { icon: BadgeCheck, title: "Best Price Guarantee", text: "Competitive prices with no hidden surprises." },
  { icon: ShieldCheck, title: "Secure Booking", text: "Your payments and information stay protected." },
  { icon: Headphones, title: "24/7 Support", text: "We're here whenever your journey needs us." },
  { icon: Sparkles, title: "Custom Packages", text: "Build a trip around your preferences." },
];

export default function Features() {
  return (
    <section aria-label="Why GlobeTrek" className="bg-white px-4 pb-20 pt-16 sm:px-6 sm:pt-20 lg:px-10 lg:pb-24">
      <div className="mx-auto grid max-w-[1280px] gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
        {features.map(({ icon: Icon, title, text }, i) => (
          <Reveal key={title} delay={i * 0.08}>
            <div className="group flex items-start gap-4">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-blue-50 text-ocean transition-all duration-300 group-hover:-translate-y-0.5 group-hover:bg-ocean group-hover:text-white">
                <Icon className="h-6 w-6" aria-hidden="true" />
              </span>
              <div>
                <h3 className="text-base font-bold">{title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-slate-500">{text}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
