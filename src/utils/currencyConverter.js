// Example static conversion rate
const USD_TO_GBP = 0.79;

export function convertToGBP(usd) {
  return usd * USD_TO_GBP;
}

export function convertToUSD(gbp) {
  return gbp / USD_TO_GBP;
}
