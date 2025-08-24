import React from "react";
import { formatCurrency } from "../../utils/formatters";
import { convertToUSD } from "../../utils/currencyConverter";

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

  // Sort months in descending chronological order
  const sortedMonths = Object.keys(grouped).sort(
    (a, b) => new Date(b) - new Date(a)
  );

  // Grand totals
  const grandTotalGBP = rows.reduce((sum, r) => sum + r.earnings, 0);
  const grandTotalUSD = rows.reduce((sum, r) => sum + convertToUSD(r.earnings), 0);

  return (
    <div className="overflow-x-auto">
      <table className="table w-full">
        <thead>
          <tr className="bg-base-300">
            <th>Month</th>
            <th>Artist</th>
            <th>Earnings (USD)</th>
            <th>Earnings (GBP)</th>
          </tr>
        </thead>
        <tbody>
          {sortedMonths.map((month) => {
            const monthRows = grouped[month];
            const monthlyTotalGBP = monthRows.reduce(
              (sum, r) => sum + r.earnings,
              0
            );
            const monthlyTotalUSD = monthRows.reduce(
              (sum, r) => sum + convertToUSD(r.earnings),
              0
            );

            return (
              <React.Fragment key={month}>
                {monthRows.map((row, idx) => (
                  <tr key={`${month}-${idx}`} className="hover">
                    {/* Show month name only on first row */}
                    {idx === 0 ? (
                      <td rowSpan={monthRows.length} className="font-bold align-top">
                        {month}
                      </td>
                    ) : null}
                    <td>{row.artist}</td>
                    <td>{formatCurrency(convertToUSD(row.earnings), "USD")}</td>
                    <td>{formatCurrency(row.earnings)}</td>
                  </tr>
                ))}

                {/* Monthly subtotal row */}
                <tr className="bg-base-200 font-bold">
                  <td>Total {month}</td>
                  <td></td>
                  <td>{formatCurrency(monthlyTotalUSD, "USD")}</td>
                  <td>{formatCurrency(monthlyTotalGBP)}</td>
                </tr>
              </React.Fragment>
            );
          })}

          {/* Grand total row */}
          <tr className="bg-primary text-primary-content font-bold">
            <td>Grand Total</td>
            <td></td>
            <td>{formatCurrency(grandTotalUSD, "USD")}</td>
            <td>{formatCurrency(grandTotalGBP)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default EarningsTable;
