// src/components/upload/UploadCSV.jsx
import { parseCSV } from "../../utils/csvParser";
import { handleZipUpload } from "../../utils/zipHandler";

function UploadCSV({ onDataUpload }) {
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.name.toLowerCase().endsWith(".zip")) {
      handleZipUpload(file, onDataUpload); // ✅ unzip + parse
    } else if (file.name.toLowerCase().endsWith(".csv")) {
      parseCSV(file, (rows) => onDataUpload(rows)); // ✅ parse directly
    } else {
      alert("Please upload a CSV or ZIP file.");
    }
  };

  return <input type="file" accept=".csv,.zip" onChange={handleFileUpload} />;
}

export default UploadCSV;
