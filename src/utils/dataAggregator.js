// utils/dataAggregator.js
export default class DataAggregator {
  constructor(rows) {
    this.rows = rows;
  }

normalizeArtist(name) {
  if (!name || typeof name !== "string") return "Unknown";

  // Handle collabs like "Artist x Someone" or "Artist X Someone"
  const parts = name.split(/ x | X /i);
  let main = parts[0].trim();

  // Clean "ft." or "feat." just in case
  main = main.replace(/\s+ft\.?.*/i, "").replace(/\s+feat\.?.*/i, "");

  if (!main) return "Unknown";

  return this.capitalize(main.toLowerCase());
}

  // Normalize song titles
  normalizeSong(title) {
    if (!title) return "Unknown";

    let normalized = title.trim();

    // Remove "ft." or "feat." from song titles
    normalized = normalized.replace(/\s+ft\.?.*/i, "").replace(/\s+feat\.?.*/i, "");

    // Handle "x" collaborations in titles
    const parts = normalized.split(/ x | X /i);
    normalized = parts[0].trim();

    return this.capitalize(normalized.toLowerCase());
  }

  // Capitalize helper (only first letter uppercase)
  capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  // Group by artist & month
  getArtistMonthlyEarnings() {
    const grouped = {};

    this.rows.forEach((row) => {
      const artist = this.normalizeArtist(row.artist);
      const month = row.month;
      const earnings = row.earnings;

      if (!grouped[month]) grouped[month] = {};
      if (!grouped[month][artist]) grouped[month][artist] = 0;

      grouped[month][artist] += earnings;
    });

    // Flatten to array
    const flattened = [];
    Object.keys(grouped).forEach((month) => {
      Object.keys(grouped[month]).forEach((artist) => {
        flattened.push({
          month,
          artist,
          earnings: grouped[month][artist],
        });
      });
    });

    return flattened;
  }

  // Group by song & month
  getSongMonthlyEarnings() {
    const grouped = {};

    this.rows.forEach((row) => {
      const song = this.normalizeSong(row.song);
      const month = row.month;
      const earnings = row.earnings;

      if (!grouped[month]) grouped[month] = {};
      if (!grouped[month][song]) grouped[month][song] = 0;

      grouped[month][song] += earnings;
    });

    // Flatten
    const flattened = [];
    Object.keys(grouped).forEach((month) => {
      Object.keys(grouped[month]).forEach((song) => {
        flattened.push({
          month,
          song,
          earnings: grouped[month][song],
        });
      });
    });

    return flattened;
  }

  getSummary() {
    if (!this.rows || this.rows.length === 0) {
        return {
        totalEarnings: 0,
        artistCount: 0,
        songCount: 0,
        topArtist: null,
        topSong: null,
        };
    }

    const totalEarnings = this.rows.reduce((sum, r) => sum + r.earnings, 0);
    const artistMap = {};
    const songMap = {};

    this.rows.forEach(r => {
        const artist = this.normalizeArtist(r.artist);
        const song = this.normalizeSong(r.song);

        artistMap[artist] = (artistMap[artist] || 0) + r.earnings;
        songMap[song] = (songMap[song] || 0) + r.earnings;
    });

    const topArtist = Object.entries(artistMap).sort((a, b) => b[1] - a[1])[0];
    const topSong = Object.entries(songMap).sort((a, b) => b[1] - a[1])[0];

    return {
        totalEarnings,
        artistCount: Object.keys(artistMap).length,
        songCount: Object.keys(songMap).length,
        topArtist: topArtist ? { name: topArtist[0], earnings: topArtist[1] } : null,
        topSong: topSong ? { name: topSong[0], earnings: topSong[1] } : null,
    };
    }

}
