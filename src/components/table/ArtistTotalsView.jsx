// src/components/table/ArtistTotalsView.jsx
import React from "react";
import { formatCurrency } from "../../utils/formatters";
import ArtistBlock from "./ArtistBlock";
import DataAggregator from "../../utils/dataAggregator";

export default function ArtistTotalsView({ rows }) {
  if (!rows || rows.length === 0) {
    return <p className="p-4">No data available.</p>;
  }

  const aggregator = new DataAggregator(rows);
  const grouped = aggregator.getArtistWithSongs();

  // Grand totals
  const grandTotalUsd = rows.reduce((sum, r) => sum + r.usd, 0);
  const grandTotalGbp = rows.reduce((sum, r) => sum + r.earnings, 0);

  return (
    <div className="overflow-x-auto p-4">
      <table className="min-w-full border border-gray-300 dark:border-gray-600">
        <thead className="bg-gray-100 dark:bg-gray-700 dark:text-gray-100">
          <tr>
            <th className="border px-4 py-2 text-left">Artist</th>
            <th className="border px-4 py-2 text-left">Song</th>
            <th className="border px-4 py-2 text-right">Earnings (USD)</th>
            <th className="border px-4 py-2 text-right">Earnings (GBP)</th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-800 dark:text-gray-100">
          {Object.entries(grouped).map(([artist, songs]) => (
            <ArtistBlock key={artist} artist={artist} songs={songs} />
          ))}

          {/* Grand total row */}
          <tr className="bg-blue-100 dark:bg-blue-800 text-black dark:text-white font-bold">
            <td className="border px-4 py-2">Grand Total</td>
            <td className="border px-4 py-2"></td>
            <td className="border px-4 py-2 text-right">
              {formatCurrency(grandTotalUsd, "USD")}
            </td>
            <td className="border px-4 py-2 text-right">
              {formatCurrency(grandTotalGbp, "GBP")}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
