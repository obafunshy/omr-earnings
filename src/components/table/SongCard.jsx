import React, { useState } from "react";
import { formatCurrency } from "../../utils/formatters";
import ExpandableList from "../shared/ExpandableList";
import { getSortedMonthly } from "../../utils/songMonthlyAggregator";

export default function SongCard({ song }) {
  const [expanded, setExpanded] = useState(false);

  const monthlyArray = getSortedMonthly(song);

  return (
    <div className="p-4 bg-gray-800 rounded-lg shadow">
      <h2 className="text-lg font-semibold">{song.title}</h2>
      <p className="text-gray-400">{song.artist}</p>
      <p className="text-sm text-gray-500">
        Released: {song.releaseDate || "Unknown"}
      </p>

      <h3 className="mt-4 font-semibold">Monthly Earnings</h3>
      <table className="w-full mt-2 text-sm">
        <thead>
          <tr className="bg-gray-100 dark:bg-gray-700 dark:text-gray-100">
            <th className="text-left px-4 py-2">Month</th>
            <th className="text-right px-4 py-2">Earnings (USD)</th>
            <th className="text-right px-4 py-2">Earnings (GBP)</th>
          </tr>
        </thead>
        <tbody>
          <ExpandableList
            items={monthlyArray}
            initial={6}
            expanded={expanded}
            onToggle={() => setExpanded(!expanded)}
            renderItem={(m) => (
              <tr key={m.month} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                <td className="border px-4 py-2">{m.month}</td>
                <td className="border px-4 py-2 text-right">
                  {formatCurrency(m.usd, "USD")}
                </td>
                <td className="border px-4 py-2 text-right">
                  {formatCurrency(m.gbp, "GBP")}
                </td>
              </tr>
            )}
          />

          {/* Totals */}
          <tr className="bg-gray-100 dark:bg-gray-700 font-bold">
            <td className="border px-4 py-2">Total</td>
            <td className="border px-4 py-2 text-right">
              {formatCurrency(song.totalUsd, "USD")}
            </td>
            <td className="border px-4 py-2 text-right">
              {formatCurrency(song.totalGbp, "GBP")}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
