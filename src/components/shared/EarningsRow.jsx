// src/components/shared/EarningsRow.jsx
import React from "react";
import { formatCurrency } from "../../utils/formatters";

export default function EarningsRow({ label, usd, gbp }) {
  return (
    <tr className="border-b border-gray-700">
      <td className="py-1">{label}</td>
      <td className="text-right">{formatCurrency(usd, "USD")}</td>
      <td className="text-right">{formatCurrency(gbp, "GBP")}</td>
    </tr>
  );
}
