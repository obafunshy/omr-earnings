// "June 2025" -> Date (1st of that month) for stable sorting
export function monthLabelToDate(label) {
  if (!label) return new Date(0);
  const d = new Date(`${label} 01`); // adds a day to make it parseable
  return isNaN(d) ? new Date(0) : d;
}

// Sort rows: month DESC, then artist ASC
export function sortRows(rows) {
  return [...rows].sort((a, b) => {
    const da = monthLabelToDate(a.month);
    const db = monthLabelToDate(b.month);
    if (db - da !== 0) return db - da;       // newer first
    return (a.artist || "").localeCompare(b.artist || "");
  });
}

// Unique months in DESC order
export function uniqueMonthsDesc(rows) {
  const seen = new Set();
  const out = [];
  for (const r of sortRows(rows)) {
    if (!seen.has(r.month)) { seen.add(r.month); out.push(r.month); }
  }
  return out;
}

// Keep only last N months
export function keepLastNMonths(rows, n) {
  const months = uniqueMonthsDesc(rows).slice(0, n);
  const set = new Set(months);
  return sortRows(rows).filter(r => set.has(r.month));
}

// Generic pagination
export function paginate(rows, page, perPage) {
  const totalPages = Math.max(1, Math.ceil(rows.length / perPage));
  const p = Math.min(Math.max(1, page), totalPages);
  const start = (p - 1) * perPage;
  return { page: p, totalPages, slice: rows.slice(start, start + perPage) };
}
