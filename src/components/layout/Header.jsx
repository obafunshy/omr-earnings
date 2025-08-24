import React from "react";
import UploadCSV from "../upload/uploadCSV";

function Header({ onDataUpload }) {
  return (
    <header>
      <h1>OMR Earnings Dashboard</h1>
      <UploadCSV onDataUpload={onDataUpload} />
    </header>
  );
}

export default Header;