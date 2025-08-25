// src/components/table/DspTotalsView.jsx
import React from "react";
import { formatCurrency } from "../../utils/formatters";

export default function DspTotalsView({ rows }) {
  if (!rows || rows.length === 0) {
    return <p className="p-4">No DSP totals available.</p>;
  }

  // Group by month
  const grouped = rows.reduce((acc, row) => {
    if (!acc[row.month]) acc[row.month] = [];
    acc[row.month].push(row);
    return acc;
  }, {});

  // Sort months descending
  const sortedMonths = Object.keys(grouped).sort(
    (a, b) => new Date(b) - new Date(a)
  );

  return (
    <div className="overflow-x-auto p-4">
      <table className="min-w-full border border-gray-300 dark:border-gray-600">
        <thead className="bg-gray-100 dark:bg-gray-700 dark:text-gray-100">
          <tr>
            <th className="border px-4 py-2 text-left">Month</th>
            <th className="border px-4 py-2 text-left">DSP</th>
            <th className="border px-4 py-2 text-right">Earnings (USD)</th>
            <th className="border px-4 py-2 text-right">Earnings (GBP)</th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-800 dark:text-gray-100">
          {sortedMonths.map((month) => {
            const monthRows = grouped[month].filter(
              (r) =>
                Math.round(r.usd * 100) / 100 > 0 ||
                Math.round(r.earnings * 100) / 100 > 0
            )
            .sort((a, b) => b.earnings - a.earnings); 

            const monthTotalUSD = monthRows.reduce((sum, r) => sum + r.usd, 0);
            const monthTotalGBP = monthRows.reduce((sum, r) => sum + r.earnings, 0);

            return (
              <React.Fragment key={month}>
                {monthRows.map((row, idx) => (
                  <tr
                    key={`${month}-${row.dsp}-${idx}`}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    {idx === 0 && (
                      <td
                        rowSpan={monthRows.length + 1}
                        className="border px-4 py-2 font-semibold align-top"
                      >
                        {month}
                      </td>
                    )}
                    <td className="border px-4 py-2">{row.dsp}</td>
                    <td className="border px-4 py-2 text-right">
                      {formatCurrency(row.usd, "USD")}
                    </td>
                    <td className="border px-4 py-2 text-right">
                      {formatCurrency(row.earnings, "GBP")}
                    </td>
                  </tr>
                ))}
                {/* Monthly subtotal */}
                <tr className="bg-gray-100 dark:bg-gray-700 font-semibold">
                    <td className="border px-4 py-2">Total {month}</td>   {/* this actually sits under DSP col */}
                    <td className="border px-4 py-2 text-right">
                        {formatCurrency(monthTotalUSD, "USD")}
                    </td>
                    <td className="border px-4 py-2 text-right">
                        {formatCurrency(monthTotalGBP, "GBP")}
                    </td>
                </tr>
              </React.Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
