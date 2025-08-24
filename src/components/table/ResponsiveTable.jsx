// src/components/shared/ResponsiveTable.jsx
import React from "react";

// children = your <thead> and <tbody>
export default function ResponsiveTable({ headers, rows }) {
  return (
    <div className="w-full">
      {/* Desktop/tablet table */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="min-w-[800px] border border-gray-300 dark:border-gray-600">
          <thead className="bg-gray-100 dark:bg-gray-700 dark:text-gray-100">
            <tr>
              {headers.map((h, idx) => (
                <th key={idx} className="border px-4 py-2 text-left">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 dark:text-gray-100">
            {rows}
          </tbody>
        </table>
      </div>

      {/* Mobile card view */}
      <div className="sm:hidden grid gap-4">
        {rows.map((row, idx) => (
          <div key={idx} className="p-4 bg-gray-800 rounded-lg shadow text-gray-100">
            {headers.map((h, hIdx) => (
              <p key={hIdx}>
                <span className="font-semibold">{h}: </span>
                {row.props.children[hIdx].props.children}
              </p>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
