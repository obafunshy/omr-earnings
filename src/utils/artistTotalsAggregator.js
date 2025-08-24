export function aggregateByArtist(rows) {
  const grouped = {};

  rows.forEach((r) => {
    const artist = r.artist || "Unknown Artist";
    const song = r.song || "Unknown Song";

    if (!grouped[artist]) grouped[artist] = {};
    if (!grouped[artist][song]) {
      grouped[artist][song] = { usd: 0, gbp: 0 };
    }
    grouped[artist][song].usd += r.usd;
    grouped[artist][song].gbp += r.earnings;
  });

  return Object.entries(grouped).map(([artist, songs]) => {
    const songArray = Object.entries(songs).map(([title, vals]) => ({
      title,
      usd: vals.usd,
      gbp: vals.gbp,
    }));

    return {
      artist,
      songs: songArray,
      totalUsd: songArray.reduce((sum, s) => sum + s.usd, 0),
      totalGbp: songArray.reduce((sum, s) => sum + s.gbp, 0),
    };
  });
}
