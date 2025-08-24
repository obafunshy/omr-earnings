// src/utils/aggregator.js
export function aggregateEarnings(rows) {
  const songs = {};

  rows.forEach(({ month, artist, song, usd, earnings }) => {
    const key = `${artist}-${song}`;
    if (!songs[key]) {
      songs[key] = {
        title: song,
        artist,
        monthly: {},
        yearly: {},
        totalUsd: 0,
        totalGbp: 0,
      };
    }

    // Add monthly
    songs[key].monthly[month] = (songs[key].monthly[month] || 0) + usd;

    // Extract year
    const year = month.split(" ")[1]; // e.g. "2025"
    songs[key].yearly[year] = (songs[key].yearly[year] || 0) + usd;

    // Totals
    songs[key].totalUsd += usd;
    songs[key].totalGbp += earnings;
  });

  return Object.values(songs);
}
