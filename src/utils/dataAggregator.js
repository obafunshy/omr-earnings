export default class DataAggregator {
  constructor(rows) {
    this.rows = Array.isArray(rows) ? rows : [];
  }

  // --- Normalizers (generic, reusable) ---
  normalizeArtist(name) {
    if (!name || typeof name !== "string") return "Unknown";
    let main = name.replace(/\s+ft\.?.*/i, "").replace(/\s+feat\.?.*/i, "");
    main = main.split(/ x | X /i)[0].trim();
    if (!main) return "Unknown";
    return this.capitalize(main.toLowerCase());
  }
  normalizeSong(title) {
    if (!title || typeof title !== "string") return "Unknown";
    let t = title.replace(/\s+ft\.?.*/i, "").replace(/\s+feat\.?.*/i, "");
    t = t.split(/ x | X /i)[0].trim();
    return this.capitalize(t.toLowerCase());
  }
  capitalize(s) { return s.charAt(0).toUpperCase() + s.slice(1); }

  getArtistWithSongs() {
    const grouped = {};

    for (const r of this.rows) {
        const artist = this.normalizeArtist(r.artist);
        const song = this.normalizeSong(r.song);

        if (!grouped[artist]) grouped[artist] = {};
        if (!grouped[artist][song]) {
        grouped[artist][song] = { usd: 0, gbp: 0 };
        }

        grouped[artist][song].usd += Number(r.usd || 0);
        grouped[artist][song].gbp += Number(r.earnings || 0);
    }

    return grouped;
    }

  // --- Artist+Month aggregation (sums both USD & GBP) ---
  getArtistMonthlyEarnings() {
    const map = {};
    for (const r of this.rows) {
      const month = r.month || "Unknown";
      const artist = this.normalizeArtist(r.artist);
      const usd = Number(r.usd || 0);
      const gbp = Number(r.earnings || 0);

      const key = `${month}__${artist}`;
      if (!map[key]) map[key] = { month, artist, usd: 0, earnings: 0 };
      map[key].usd += usd;
      map[key].earnings += gbp;
    }
    return Object.values(map);
  }

  // --- Optional summary (safe defaults) ---
  getSummary() {
    if (!this.rows.length) {
      return { totalEarnings: 0, artistCount: 0, songCount: 0, topArtist: null, topSong: null };
    }
    const artistMap = {};
    const songMap = {};
    let total = 0;
    for (const r of this.rows) {
      const artist = this.normalizeArtist(r.artist);
      const song = this.normalizeSong(r.song);
      const gbp = Number(r.earnings || 0);
      total += gbp;
      artistMap[artist] = (artistMap[artist] || 0) + gbp;
      songMap[song] = (songMap[song] || 0) + gbp;
    }
    const top = (m) => {
      const e = Object.entries(m).sort((a, b) => b[1] - a[1])[0];
      return e ? { name: e[0], earnings: e[1] } : null;
    };
    return {
      totalEarnings: total,
      artistCount: Object.keys(artistMap).length,
      songCount: Object.keys(songMap).length,
      topArtist: top(artistMap),
      topSong: top(songMap)
    };
  }

  getSongEarnings() {
    const grouped = {};

    this.rows.forEach(r => {
      const key = `${r.artist}-${r.song}`;
      if (!grouped[key]) {
        grouped[key] = {
          title: r.song,
          artist: r.artist,
          releaseDate: r.releaseDate || "Unknown", // ✅ add release date
          monthly: {},
          yearly: {},
          totalUsd: 0,
          totalGbp: 0
        };
      }

      // monthly
      grouped[key].monthly[r.month] = (grouped[key].monthly[r.month] || 0) + r.usd;

      // yearly (extract last word e.g. "June 2025" → "2025")
      const year = r.month.split(" ").pop();
      grouped[key].yearly[year] = (grouped[key].yearly[year] || 0) + r.usd;

      // totals
      grouped[key].totalUsd += r.usd;
      grouped[key].totalGbp += r.earnings;
    });

    return Object.values(grouped);
  }

    getArtistTotals() {
        const grouped = {};

        this.rows.forEach(r => {
            if (!grouped[r.artist]) {
            grouped[r.artist] = {
                artist: r.artist,
                songs: new Set(),
                totalUsd: 0,
                totalGbp: 0,
            };
            }
            grouped[r.artist].songs.add(r.song);
            grouped[r.artist].totalUsd += r.usd;
            grouped[r.artist].totalGbp += r.earnings;
        });

        // convert songs Set to count
        return Object.values(grouped).map(a => ({
            ...a,
            songs: a.songs.size
        }));
    }

    // in src/utils/dataAggregator.js
    getDspEarnings() {
    const map = {};

    for (const r of this.rows) {
      const month = r.month || "Unknown";
      const artist = this.normalizeArtist(r.artist);
      const dsp = r.dsp || r["Store"] || "Unknown DSP";
      const usd = Number(r.usd || 0);
      const gbp = Number(r.earnings || 0);

      // ✅ Skip zero-earning rows
      if (usd <= 0 && gbp <= 0) continue;

      const key = `${month}__${artist}__${dsp}`;
      if (!map[key]) {
        map[key] = { month, artist, dsp, usd: 0, gbp: 0 };
      }
      map[key].usd += usd;
      map[key].gbp += gbp;
    }

    // ✅ Drop any entries that still ended at 0
    return Object.values(map).filter(r => r.usd > 0 || r.gbp > 0);
  }
}

