import Reveal from "./Reveal.jsx";
import SafeImage from "./SafeImage.jsx";
import EmailForm from "./EmailForm.jsx";

export default function Newsletter() {
  return (
    <section id="contact" className="px-4 pb-20 sm:px-6 lg:px-10 lg:pb-28">
      <Reveal className="relative isolate mx-auto max-w-[1280px] overflow-hidden rounded-3xl bg-navy px-6 py-16 text-center sm:px-12 sm:py-24">
        <SafeImage
          src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=2000&q=80"
          alt="Lake and mountains under a bright morning sky"
          className="absolute inset-0 -z-20 h-full w-full"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-navy/90 via-ocean/60 to-navy/80" />
        <h2 className="mx-auto max-w-2xl text-3xl font-extrabold tracking-tight !text-white sm:text-5xl">
          Your next adventure is waiting.
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-white/80">
          Get travel inspiration, exclusive deals, and destination guides delivered to your inbox.
        </p>
        <div className="mx-auto mt-8 max-w-lg text-left">
          <EmailForm id="newsletter-email" glass />
        </div>
      </Reveal>
    </section>
  );
}
