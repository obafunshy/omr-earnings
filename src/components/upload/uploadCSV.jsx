import { parseCSV } from "../../utils/csvParser";

function UploadCSV({ onDataUpload }) {
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    console.log("UploadCSV.handleFileUpload called ✅", file);

    if (file) {
      parseCSV(file, (rows) => {
        console.log("parseCSV callback ✅", rows.length, "rows");
        onDataUpload(rows);
      });
    }
  };

  return <input type="file" accept=".csv" onChange={handleFileUpload} />;
}

export default UploadCSV;
