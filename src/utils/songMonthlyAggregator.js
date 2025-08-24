
// Normalize + sort monthly earnings
export function getSortedMonthly(song) {
  if (!song || !song.monthly) return [];

  const monthlyArray = Object.entries(song.monthly).map(([month, usd]) => ({
    month,
    usd,
    gbp: usd * (song.totalGbp / song.totalUsd || 1),
  }));

  // Sort descending by month
  return monthlyArray.sort((a, b) => new Date(b.month) - new Date(a.month));
}
