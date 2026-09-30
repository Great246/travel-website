import { useState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export default function EmailForm({ id, dark = false, glass = false, compact = false }) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [status, setStatus] = useState("idle");

  const submit = (e) => {
    e.preventDefault();
    if (!EMAIL_RE.test(email.trim())) {
      setError("Enter a valid email address, like name@example.com.");
      return;
    }
    setError("");
    setStatus("loading");
    setTimeout(() => setStatus("success"), 900);
  };

  if (status === "success") {
    return (
      <p role="status" className="flex items-center gap-2 rounded-2xl bg-emerald-500/15 px-4 py-3.5 text-sm font-semibold text-emerald-300 ring-1 ring-emerald-400/30">
        <CheckCircle2 className="h-5 w-5 shrink-0" aria-hidden="true" />
        You're subscribed. Check {email} for a welcome note.
      </p>
    );
  }

  return (
    <form onSubmit={submit} noValidate>
      <div
        className={`flex flex-col gap-2 sm:flex-row ${
          glass ? "rounded-3xl border border-white/20 bg-white/10 p-2 backdrop-blur-xl sm:rounded-full" : ""
        }`}
      >
        <label htmlFor={id} className="sr-only">Email address</label>
        <input
          id={id}
          type="email"
          value={email}
          onChange={(e) => { setEmail(e.target.value); if (error) setError(""); }}
          placeholder="Enter your email"
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-err` : undefined}
          className={`min-w-0 flex-1 rounded-full px-5 py-3.5 text-sm font-medium outline-none placeholder:text-slate-400 focus-visible:ring-2 focus-visible:ring-bright ${
            dark || glass ? "bg-white/10 text-white placeholder:text-white/60" : "bg-white text-navy"
          } ${compact ? "py-3" : ""}`}
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-ocean px-7 py-3.5 text-sm font-bold text-white transition-all hover:bg-bright active:scale-95 disabled:opacity-70"
        >
          {status === "loading" && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
          Subscribe
        </button>
      </div>
      {error && <p id={`${id}-err`} role="alert" className="mt-2 pl-3 text-xs font-semibold text-rose-300">{error}</p>}
    </form>
  );
}
