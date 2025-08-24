export function formatCurrency(value, currency = "GBP") {
  if (typeof value !== "number" || isNaN(value)) return currency === "USD" ? "$0.00" : "£0.00";

  if (currency === "USD") {
    // Force plain $ with 2 decimals
    return `$${value.toFixed(2)}`;
  }

  if (currency === "GBP") {
    // Force £ with 2 decimals
    return `£${value.toFixed(2)}`;
  }

  // fallback: just return the number
  return value.toFixed(2);
}

export function formatMonth(dateStr) {
  if (!dateStr) return "Unknown";
  try {
    // DistroKid has "2025-06" style
    const [year, month] = dateStr.split("-");
    const d = new Date(year, month - 1);
    return d.toLocaleString("en-GB", { month: "long", year: "numeric" });
  } catch {
    return dateStr;
  }
}
