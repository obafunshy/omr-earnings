// src/utils/csvParser.js
import Papa from "papaparse";
import { formatMonth } from "./formatters";
import { convertToGBP } from "./currencyConverter";

export function parseCSV(file, callback) {
  console.log("csvParser.js is loaded ✅");

  const reader = new FileReader();

  reader.onload = () => {
    console.log("FileReader finished, size:", reader.result.length);

    Papa.parse(reader.result, {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        console.log("PapaParse finished!");
        console.log("Detected headers:", results.meta.fields);
        console.log("First row:", results.data[0]);

        const rows = results.data.map((row) => {
          const date   = row["Sale Month"];   // e.g. "2025-06"
          const artist = row["Artist"];       // e.g. "JayFred"
          const song   = row["Title"];        // Song title
          const rawUsd = row["Earnings (USD)"] || "0";

          // Clean any "$" or "US$" text and parse number
          const usd = parseFloat(String(rawUsd).replace(/[^0-9.-]+/g, "")) || 0;

          return {
            month: formatMonth(date),   // convert "2025-06" -> "June 2025"
            artist: artist || "Unknown",
            song: song || "Unknown",
            usd,
            earnings: convertToGBP(usd) // always compute GBP too
          };
        });

        console.log("Mapped rows for aggregator:", rows[0]); // sanity check
        callback(rows);
      },
      error: function (err) {
        console.error("PapaParse error:", err);
      }
    });
  };

  reader.onerror = (err) => {
    console.error("FileReader error:", err);
  };

  reader.readAsText(file);
}
