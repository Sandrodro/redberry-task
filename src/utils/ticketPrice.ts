/** Rounds to 2 decimals, so 14.399999999999999 shows as 14.4. */
export function roundPrice(value: number) {
  return Math.round(value * 100) / 100
}

/** Child and student prices are the session price times the ratio from `/filter-options`. */
export function getTicketPrice(sessionPrice: number, priceRatio: number) {
  return roundPrice(sessionPrice * priceRatio)
}
