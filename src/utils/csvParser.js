// src/utils/csvParser.js
import Papa from "papaparse";
import { formatMonth, parseCurrency } from "./formatters";
import { convertToGBP } from "./currencyConverter";

export function parseCSV(file, callback) {
  console.log("csvParser.js is loaded ✅");

  const reader = new FileReader();

  reader.onload = () => {
    console.log("FileReader finished, size:", reader.result.length);

    // ✅ define parsedRows here
    const parsedRows = [];

    Papa.parse(reader.result, {
      header: true,
      skipEmptyLines: true,

      // process row by row
      step: function (row) {
        const r = row.data;

        const date   = r["Sale Month"];
        const artist = r["Artist"];
        const song   = r["Title"];
        const dsp    = r["Store"];

        const usd = parseCurrency(r["Earnings (USD)"]);
        const gbp = convertToGBP(usd);

        const parsed = {
          month: formatMonth(date),
          artist: artist || "Unknown",
          song: song || "Unknown",
          dsp: dsp || "Unknown DSP",
          usd,
          earnings: gbp,
        };

        // ✅ filter out rows that round to 0.00
        if ((Math.round(usd * 100) / 100) > 0 || (Math.round(gbp * 100) / 100) > 0) {
          parsedRows.push(parsed);
        }
      },

      complete: function () {
        console.log("✅ Done parsing. Parsed rows:", parsedRows.length);
        console.log("✅ First parsed row:", parsedRows[0]);
        callback(parsedRows);
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
