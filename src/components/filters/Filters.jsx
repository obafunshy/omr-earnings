import React from "react";

function Filters({ monthLimit, onMonthLimitChange }) {
  const options = [
    { label: "Last 4 Months", value: 4 },
    { label: "Last 6 Months", value: 6 },
    { label: "Last 12 Months", value: 12 },
    { label: "All", value: "all" },
  ];

  return (
    <div className="flex space-x-4 items-center">
      <label className="font-medium">Show:</label>
      <select
        value={monthLimit}
        onChange={(e) =>
          onMonthLimitChange(e.target.value === "all" ? "all" : parseInt(e.target.value))
        }
        className="border rounded px-3 py-1"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Filters;
