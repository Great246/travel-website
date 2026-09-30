import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Plane, Hotel, Car, Compass, Search, MapPin, CalendarDays, Users, Loader2, CheckCircle2, AlertCircle,
} from "lucide-react";

const tabs = [
  {
    id: "flights", label: "Flights", icon: Plane,
    fields: [
      { id: "from", label: "From", placeholder: "Where from?", icon: MapPin, required: true },
      { id: "to", label: "To", placeholder: "Where to?", icon: MapPin, required: true },
      { id: "depart", label: "Departure", type: "date", icon: CalendarDays, required: true },
      { id: "return", label: "Return", type: "date", icon: CalendarDays },
      { id: "travelers", label: "Travelers", type: "select", icon: Users, options: ["1 Adult", "2 Adults", "2 Adults, 1 Child", "3 Adults", "4 Adults"], initial: "2 Adults" },
    ],
  },
  {
    id: "hotels", label: "Hotels", icon: Hotel,
    fields: [
      { id: "destination", label: "Destination", placeholder: "City or hotel name", icon: MapPin, required: true },
      { id: "checkin", label: "Check-in", type: "date", icon: CalendarDays, required: true },
      { id: "checkout", label: "Check-out", type: "date", icon: CalendarDays, required: true },
      { id: "guests", label: "Guests", type: "select", icon: Users, options: ["1 Guest", "2 Guests", "3 Guests", "4 Guests"], initial: "2 Guests" },
    ],
  },
  {
    id: "cars", label: "Cars", icon: Car,
    fields: [
      { id: "pickup", label: "Pick-up location", placeholder: "Airport, city or address", icon: MapPin, required: true },
      { id: "pickupDate", label: "Pick-up date", type: "date", icon: CalendarDays, required: true },
      { id: "dropoffDate", label: "Drop-off date", type: "date", icon: CalendarDays, required: true },
      { id: "driver", label: "Driver age", type: "select", icon: Users, options: ["25+", "21–24", "18–20"], initial: "25+" },
    ],
  },
  {
    id: "experiences", label: "Experiences", icon: Compass,
    fields: [
      { id: "where", label: "Where", placeholder: "Where do you want to explore?", icon: MapPin, required: true },
      { id: "when", label: "Date", type: "date", icon: CalendarDays, required: true },
      { id: "people", label: "Travelers", type: "select", icon: Users, options: ["1 Traveler", "2 Travelers", "3–5 Travelers", "6+ Travelers"], initial: "2 Travelers" },
    ],
  },
];

const initialValues = Object.fromEntries(
  tabs.map((t) => [t.id, Object.fromEntries(t.fields.map((f) => [f.id, f.initial ?? ""]))])
);

export default function BookingWidget() {
  const [activeId, setActiveId] = useState("flights");
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | loading | success

  const tab = tabs.find((t) => t.id === activeId);
  const current = values[activeId];

  const update = (id, v) => {
    setValues((prev) => ({ ...prev, [activeId]: { ...prev[activeId], [id]: v } }));
    setErrors((prev) => ({ ...prev, [id]: undefined }));
    setStatus("idle");
  };

  const validate = () => {
    const next = {};
    tab.fields.forEach((f) => {
      if (f.required && !current[f.id]?.trim()) next[f.id] = `${f.label} is required`;
    });
    // Flights: return must not be before departure. Hotels/cars: end after start.
    const pairs = { flights: ["depart", "return"], hotels: ["checkin", "checkout"], cars: ["pickupDate", "dropoffDate"] }[activeId];
    if (pairs && current[pairs[0]] && current[pairs[1]] && current[pairs[1]] < current[pairs[0]]) {
      next[pairs[1]] = "Must be on or after the start date";
    }
    if (activeId === "flights" && current.from && current.to && current.from.trim().toLowerCase() === current.to.trim().toLowerCase()) {
      next.to = "Choose a different destination";
    }
    return next;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const found = validate();
    setErrors(found);
    if (Object.keys(found).length) return;
    setStatus("loading");
    setTimeout(() => setStatus("success"), 1400);
  };

  const summary = (() => {
    const c = current;
    if (activeId === "flights") return `${c.from} → ${c.to}`;
    return c.destination || c.pickup || c.where;
  })();

  const today = new Date().toISOString().split("T")[0];

  return (
    <section id="bookings" aria-label="Search trips" className="relative z-20 -mt-32 px-4 sm:-mt-40 sm:px-6 lg:px-10">
      <motion.div
        initial={{ opacity: 0, y: 36 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto max-w-[1180px] rounded-3xl border border-slate-200/70 bg-white/95 p-4 shadow-2xl shadow-navy/25 backdrop-blur-xl sm:p-6"
      >
        <div role="tablist" aria-label="Booking type" className="no-scrollbar -mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
          {tabs.map((t) => {
            const Icon = t.icon;
            const active = t.id === activeId;
            return (
              <button
                key={t.id}
                role="tab"
                type="button"
                aria-selected={active}
                aria-controls="booking-panel"
                id={`tab-${t.id}`}
                onClick={() => { setActiveId(t.id); setErrors({}); setStatus("idle"); }}
                className={`flex shrink-0 items-center gap-2 rounded-full px-4 py-2.5 text-sm font-bold transition-all duration-200 ${
                  active
                    ? "bg-ocean text-white shadow-lg shadow-ocean/30"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200/70 hover:text-navy"
                }`}
              >
                <Icon className="h-4 w-4" aria-hidden="true" />
                {t.label}
              </button>
            );
          })}
        </div>

        <form
          id="booking-panel"
          role="tabpanel"
          aria-labelledby={`tab-${activeId}`}
          onSubmit={handleSubmit}
          noValidate
          className="mt-4"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeId}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:flex lg:items-stretch"
            >
              {tab.fields.map((f) => (
                <Field key={f.id} field={f} value={current[f.id]} error={errors[f.id]} onChange={(v) => update(f.id, v)} min={f.type === "date" ? today : undefined} />
              ))}
              <motion.button
                type="submit"
                disabled={status === "loading"}
                whileHover={{ scale: status === "loading" ? 1 : 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="flex min-h-[64px] items-center justify-center gap-2 rounded-2xl bg-ocean px-8 text-base font-bold text-white shadow-lg shadow-ocean/30 transition-colors hover:bg-bright disabled:cursor-wait disabled:opacity-80 sm:col-span-2 lg:shrink-0"
              >
                {status === "loading" ? (
                  <><Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" /> Searching…</>
                ) : (
                  <><Search className="h-5 w-5" aria-hidden="true" /> Search</>
                )}
              </motion.button>
            </motion.div>
          </AnimatePresence>

          <div aria-live="polite" className="mt-3 min-h-[1.5rem]">
            {Object.keys(errors).some((k) => errors[k]) && (
              <p className="flex items-center gap-2 text-sm font-semibold text-rose-600">
                <AlertCircle className="h-4 w-4" aria-hidden="true" /> Please complete the highlighted fields.
              </p>
            )}
            {status === "success" && (
              <motion.p
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 rounded-xl bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700"
              >
                <CheckCircle2 className="h-5 w-5 shrink-0" aria-hidden="true" />
                We found 24 {tab.label.toLowerCase()} options for {summary}. Full results are coming soon.
              </motion.p>
            )}
          </div>
        </form>
      </motion.div>
    </section>
  );
}

function Field({ field, value, error, onChange, min }) {
  const Icon = field.icon;
  const id = `field-${field.id}`;
  const base = "w-full bg-transparent text-[15px] font-semibold text-navy outline-none placeholder:font-medium placeholder:text-slate-400";
  return (
    <div className="lg:min-w-0 lg:flex-1">
      <label
        htmlFor={id}
        className={`flex h-full min-h-[64px] cursor-text items-center gap-3 rounded-2xl border bg-slate-50 px-4 py-2 transition-colors focus-within:border-bright focus-within:bg-white focus-within:ring-2 focus-within:ring-bright/30 ${
          error ? "border-rose-400 bg-rose-50/50" : "border-slate-200 hover:border-slate-300"
        }`}
      >
        <Icon className="h-5 w-5 shrink-0 text-ocean" aria-hidden="true" />
        <span className="min-w-0 flex-1">
          <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-500">{field.label}</span>
          {field.type === "select" ? (
            <select id={id} value={value} onChange={(e) => onChange(e.target.value)} className={`${base} -ml-0.5`}>
              {field.options.map((o) => <option key={o}>{o}</option>)}
            </select>
          ) : (
            <input
              id={id}
              type={field.type ?? "text"}
              value={value}
              min={min}
              placeholder={field.placeholder}
              onChange={(e) => onChange(e.target.value)}
              aria-invalid={Boolean(error)}
              aria-describedby={error ? `${id}-error` : undefined}
              autoComplete="off"
              className={base}
            />
          )}
        </span>
      </label>
      {error && <p id={`${id}-error`} className="mt-1 pl-2 text-xs font-semibold text-rose-600">{error}</p>}
    </div>
  );
}
