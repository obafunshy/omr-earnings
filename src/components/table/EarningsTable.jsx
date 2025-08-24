// src/components/table/EarningsTable.jsx
import React from "react";
import { formatCurrency } from "../../utils/formatters";

// Reusable table row
function EarningsRow({ month, artist, usd, gbp, rowSpan }) {
  return (
    <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
      {month && (
        <td
          rowSpan={rowSpan}
          className="border px-4 py-2 font-semibold align-top"
        >
          {month}
        </td>
      )}
      <td className="border px-4 py-2">{artist}</td>
      <td className="border px-4 py-2">{formatCurrency(usd, "USD")}</td>
      <td className="border px-4 py-2">{formatCurrency(gbp, "GBP")}</td>
    </tr>
  );
}

// Reusable subtotal row
function SubtotalRow({ label, usd, gbp }) {
  return (
    <tr className="bg-gray-100 dark:bg-gray-700 font-semibold">
      <td className="border px-4 py-2">{label}</td>
      <td className="border px-4 py-2"></td>
      <td className="border px-4 py-2">{formatCurrency(usd, "USD")}</td>
      <td className="border px-4 py-2">{formatCurrency(gbp, "GBP")}</td>
    </tr>
  );
}

// Reusable grand total row
function GrandTotalRow({ usd, gbp }) {
  return (
    <tr className="bg-blue-100 dark:bg-blue-800 text-black dark:text-white font-bold">
      <td className="border px-4 py-2">Grand Total</td>
      <td className="border px-4 py-2"></td>
      <td className="border px-4 py-2">{formatCurrency(usd, "USD")}</td>
      <td className="border px-4 py-2">{formatCurrency(gbp, "GBP")}</td>
    </tr>
  );
}

function EarningsTable({ rows }) {
  if (!rows || rows.length === 0) {
    return <p className="p-4">No data available.</p>;
  }

  // Group rows by month
  const grouped = rows.reduce((acc, row) => {
    if (!acc[row.month]) acc[row.month] = [];
    acc[row.month].push(row);
    return acc;
  }, {});

  // Sort months descending
  const sortedMonths = Object.keys(grouped).sort(
    (a, b) => new Date(b) - new Date(a)
  );

  const grandTotalUSD = rows.reduce((sum, r) => sum + r.usd, 0);
  const grandTotalGBP = rows.reduce((sum, r) => sum + r.earnings, 0);

  return (
    <div className="overflow-x-auto p-4">
      <table className="min-w-full border border-gray-300 dark:border-gray-600">
        <thead className="bg-gray-100 dark:bg-gray-700 dark:text-gray-100">
          <tr>
            <th className="border px-4 py-2 text-left">Month</th>
            <th className="border px-4 py-2 text-left">Artist</th>
            <th className="border px-4 py-2 text-left">Earnings (USD)</th>
            <th className="border px-4 py-2 text-left">Earnings (GBP)</th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-800 dark:text-gray-100">
          {sortedMonths.map((month) => {
            const monthRows = grouped[month];
            const monthTotalUSD = monthRows.reduce((s, r) => s + r.usd, 0);
            const monthTotalGBP = monthRows.reduce((s, r) => s + r.earnings, 0);

            return (
              <React.Fragment key={month}>
                {monthRows.map((row, idx) => (
                  <EarningsRow
                    key={`${month}-${idx}`}
                    month={idx === 0 ? month : null}
                    artist={row.artist}
                    usd={row.usd}
                    gbp={row.earnings}
                    rowSpan={idx === 0 ? monthRows.length : undefined}
                  />
                ))}
                <SubtotalRow
                  label={`Total ${month}`}
                  usd={monthTotalUSD}
                  gbp={monthTotalGBP}
                />
              </React.Fragment>
            );
          })}

          <GrandTotalRow usd={grandTotalUSD} gbp={grandTotalGBP} />
        </tbody>
      </table>
    </div>
  );
}

export default EarningsTable;
