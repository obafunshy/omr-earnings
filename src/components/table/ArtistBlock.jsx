import React, { useState } from "react";
import { formatCurrency } from "../../utils/formatters";
import ExpandableList from "../shared/ExpandableList";

export default function ArtistBlock({ artist, songs }) {
  const [expanded, setExpanded] = useState(false);

  const songArray = Object.entries(songs).map(([title, vals]) => ({
    title,
    usd: vals.usd,
    gbp: vals.gbp,
  }));

  const sortedSongs = songArray.sort((a, b) => b.usd - a.usd);
  const totalUsd = songArray.reduce((sum, s) => sum + s.usd, 0);
  const totalGbp = songArray.reduce((sum, s) => sum + s.gbp, 0);

  return (
    <>
      <tr className="bg-gray-200 dark:bg-gray-700 font-bold">
        <td className="border px-4 py-2" colSpan={4}>{artist}</td>
      </tr>

      <ExpandableList
        items={sortedSongs}
        initial={6}
        expanded={expanded}
        onToggle={() => setExpanded(!expanded)}
        renderItem={(song) => (
          <tr key={song.title} className="hover:bg-gray-50 dark:hover:bg-gray-700">
            <td className="border px-4 py-2"></td>
            <td className="border px-4 py-2">{song.title}</td>
            <td className="border px-4 py-2 text-right">{formatCurrency(song.usd, "USD")}</td>
            <td className="border px-4 py-2 text-right">{formatCurrency(song.gbp, "GBP")}</td>
          </tr>
        )}
      />

      <tr className="bg-gray-100 dark:bg-gray-700 font-bold">
        <td className="border px-4 py-2">Total {artist}</td>
        <td className="border px-4 py-2"></td>
        <td className="border px-4 py-2 text-right">{formatCurrency(totalUsd, "USD")}</td>
        <td className="border px-4 py-2 text-right">{formatCurrency(totalGbp, "GBP")}</td>
      </tr>
    </>
  );
}
