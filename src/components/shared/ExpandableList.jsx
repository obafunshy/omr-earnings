// src/components/shared/ExpandableList.jsx
import React from "react";

export default function ExpandableList({
  items,
  initial = 6,
  expanded,
  onToggle,
  renderItem,
}) {
  // ✅ Show top N (first 6) when collapsed
  const shown = expanded ? items : items.slice(0, initial);

  return (
    <>
      {shown.map(renderItem)}

      {items.length > initial && (
        <tr>
          <td colSpan={4} className="px-4 py-2 text-center">
            <button
              onClick={onToggle}
              className="text-blue-400 hover:underline text-sm"
            >
              {expanded
                ? "Show Less"
                : `Show More (${items.length - initial} more)`}
            </button>
          </td>
        </tr>
      )}
    </>
  );
}
