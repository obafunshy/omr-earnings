import React from "react";
import UploadCSV from "../upload/uploadCSV";

function Header({ onDataUpload }) {
  return (
    <header className="p-4 bg-base-200 text-base-content flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <h1 className="text-2xl font-bold">OMR Earnings Dashboard</h1>
      <UploadCSV onDataUpload={onDataUpload} />
    </header>
  );
}

export default Header;
