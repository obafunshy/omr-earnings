import React from "react";
import { formatCurrency } from "../../utils/formatters";

export default function SongRow({ title, usd, gbp }) {
  return (
    <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
      <td className="border px-4 py-2">{title}</td>
      <td className="border px-4 py-2 text-right">{formatCurrency(usd, "USD")}</td>
      <td className="border px-4 py-2 text-right">{formatCurrency(gbp, "GBP")}</td>
    </tr>
  );
}
