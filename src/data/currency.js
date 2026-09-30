export const currencies = {
  USD: { symbol: "$", rate: 1, locale: "en-US" },
  EUR: { symbol: "€", rate: 0.92, locale: "de-DE" },
  GBP: { symbol: "£", rate: 0.79, locale: "en-GB" },
};

export function formatPrice(usd, code = "USD") {
  const { rate, locale } = currencies[code] ?? currencies.USD;
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: code,
    maximumFractionDigits: 0,
  }).format(Math.round(usd * rate));
}
