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

export function formatDateRelative(dateStr) {
  if (!dateStr || dateStr === "Unknown") return "Unknown";

  try {
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return dateStr;

    // Human-friendly format
    const formatted = date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

    // Relative "x days/months ago"
    const now = new Date();
    const diffMs = now - date;
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    let relative = "";

    if (diffDays < 30) {
      relative = `${diffDays} day${diffDays !== 1 ? "s" : ""} ago`;
    } else if (diffDays < 365) {
      const months = Math.floor(diffDays / 30);
      relative = `${months} month${months !== 1 ? "s" : ""} ago`;
    } else {
      const years = Math.floor(diffDays / 365);
      relative = `${years} year${years !== 1 ? "s" : ""} ago`;
    }

    return `${formatted} (${relative})`;
  } catch {
    return dateStr;
  }
}

export function parseCurrency(value) {
  if (!value) return 0;
  return parseFloat(String(value).replace(/[^0-9.-]+/g, "")) || 0;
}
