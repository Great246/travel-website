import { useState } from "react";
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import BookingWidget from "./components/BookingWidget.jsx";
import Features from "./components/Features.jsx";
import Destinations from "./components/Destinations.jsx";
import Packages from "./components/Packages.jsx";
import Experience from "./components/Experience.jsx";
import Pricing from "./components/Pricing.jsx";
import Testimonials from "./components/Testimonials.jsx";
import Newsletter from "./components/Newsletter.jsx";
import Footer from "./components/Footer.jsx";

export default function App() {
  const [currency, setCurrency] = useState("USD");

  return (
    <div className="min-h-screen overflow-x-clip">
      <Navbar currency={currency} onCurrencyChange={setCurrency} />
      <main>
        <Hero />
        <BookingWidget />
        <Features />
        <Destinations />
        <Packages currency={currency} />
        <Experience />
        <Pricing currency={currency} />
        <Testimonials />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
}
