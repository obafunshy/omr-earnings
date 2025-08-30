// src/utils/zipHandler.js
import JSZip from "jszip";
import { parseCSV } from "./csvParser";

/**
 * Extracts the first CSV in a ZIP and parses it.
 */
export async function handleZipUpload(file, callback) {
  try {
    const zip = new JSZip();
    const contents = await zip.loadAsync(file);

    // find first CSV inside
    const csvFileName = Object.keys(contents.files).find((name) =>
      name.toLowerCase().endsWith(".csv")
    );

    if (!csvFileName) {
      alert("No CSV file found in ZIP.");
      return;
    }

    // extract as Blob
    const csvBlob = await contents.files[csvFileName].async("blob");

    // delegate to existing CSV parser
    parseCSV(csvBlob, callback);
  } catch (err) {
    console.error("ZIP handling error:", err);
  }
}
