/** Fills `{name}` placeholders: format("{n} guests", { n: 4 }) -> "4 guests". */
export function format(template: string, vars: Record<string, string | number>) {
  return template.replace(/\{(\w+)\}/g, (match, key: string) => (key in vars ? String(vars[key]) : match));
}

/**
 * VND price with the dictionary's separator and pattern. Done by hand rather than
 * with Intl.NumberFormat because Node and browsers ship different ICU data, which
 * changes spacing characters and breaks hydration.
 */
export function formatPrice(amount: number, pattern: { thousands: string; currency: string; from: string }, from = false) {
  const digits = Math.round(amount).toString().replace(/\B(?=(\d{3})+(?!\d))/g, pattern.thousands);
  const price = format(pattern.currency, { n: digits });
  return from ? format(pattern.from, { price }) : price;
}
