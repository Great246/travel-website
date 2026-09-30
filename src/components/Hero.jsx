import { motion } from "framer-motion";
import { Play, Plane, ArrowRight } from "lucide-react";
import SafeImage from "./SafeImage.jsx";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};

export default function Hero() {
  return (
    <section id="home" className="relative isolate flex min-h-[92vh] items-center overflow-hidden bg-navy pb-44 pt-28 sm:pb-52">
      <SafeImage
        src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2400&q=80"
        alt="Turquoise tropical lagoon and white sand beach seen from above"
        className="absolute inset-0 -z-20 h-full w-full"
        loading="eager"
        fetchpriority="high"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-navy/70 via-navy/40 to-navy/90" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-navy/70 via-transparent to-transparent" />
      <div className="pointer-events-none absolute -left-24 top-1/3 -z-10 h-80 w-80 rounded-full bg-ocean/30 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-1/4 -z-10 h-72 w-72 rounded-full bg-amber/20 blur-3xl" />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="mx-auto w-full max-w-[1360px] px-4 sm:px-6 lg:px-10"
      >
        <motion.span
          variants={item}
          className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur-md"
        >
          <Plane className="h-4 w-4 text-amber-soft" aria-hidden="true" />
          Explore the world with confidence
        </motion.span>

        <motion.h1
          variants={item}
          className="mt-6 max-w-4xl text-5xl font-extrabold leading-[1.02] tracking-[-0.03em] !text-white md:text-6xl lg:text-7xl"
        >
          Travel Further.
          <br />
          <span className="text-gradient">Live More.</span>
        </motion.h1>

        <motion.p variants={item} className="mt-6 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">
          Find unforgettable destinations, flexible stays, and seamless travel experiences — all in one place.
        </motion.p>

        <motion.div variants={item} className="mt-9 flex flex-col gap-3 sm:flex-row">
          <motion.a
            href="#destinations"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="group inline-flex items-center justify-center gap-2 rounded-full bg-ocean px-7 py-4 text-base font-bold text-white shadow-xl shadow-ocean/40 transition-colors hover:bg-bright"
          >
            Explore Destinations
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </motion.a>
          <motion.a
            href="#about"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 bg-white/10 px-7 py-4 text-base font-bold text-white backdrop-blur-md transition-colors hover:bg-white/20"
          >
            <span className="grid h-7 w-7 place-items-center rounded-full bg-white text-navy">
              <Play className="ml-0.5 h-3.5 w-3.5 fill-current" aria-hidden="true" />
            </span>
            Watch Experience
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
}
