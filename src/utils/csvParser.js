// src/utils/csvParser.js
import Papa from "papaparse";
import { formatMonth } from "./formatters";
import { convertToGBP } from "./currencyConverter";

export function parseCSV(file, callback) {
  const reader = new FileReader();

  reader.onload = () => {
    Papa.parse(reader.result, {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        const rows = results.data.map((row) => {
          const date   = row["Sale Month"];   // e.g. "2025-06"
          const artist = row["Artist"];
          const song   = row["Title"];
          const rawUsd = row["Earnings (USD)"] || "0";
          const releaseDate = row["Release Date"]; // ✅ new

          const usd = parseFloat(String(rawUsd).replace(/[^0-9.-]+/g, "")) || 0;

          return {
            month: formatMonth(date),
            artist: artist || "Unknown",
            song: song || "Unknown",
            releaseDate: releaseDate || "Unknown", // ✅ store it here
            usd,
            earnings: convertToGBP(usd)
          };
        });

        callback(rows);
      }
    });
  };

  reader.readAsText(file);
}
