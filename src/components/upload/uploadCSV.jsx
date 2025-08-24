import { parseCSV } from "../../utils/csvParser";

function UploadCSV({ onDataUpload }) {
  const handleFileUpload = (e) => {
    const file = e.target.files[0];

    if (file) {
      parseCSV(file, (rows) => {
        onDataUpload(rows);
      });
    }
  };

  return <input type="file" accept=".csv" onChange={handleFileUpload} />;
}

export default UploadCSV;
