/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', "Inter", "system-ui", "sans-serif"],
      },
      colors: {
        navy: "#0F172A",
        ocean: "#2563EB",
        bright: "#3B82F6",
        amber: { DEFAULT: "#F59E0B", soft: "#FBBF24" },
      },
      boxShadow: {
        soft: "0 10px 40px -12px rgba(15, 23, 42, 0.18)",
        lift: "0 24px 60px -18px rgba(15, 23, 42, 0.35)",
      },
    },
  },
  plugins: [],
};
