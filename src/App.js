import React, { useState } from "react";
import Header from "./components/layout/Header";
import Dashboard from "./components/layout/Dashboard";
import Footer from "./components/layout/Footer";

function App() {
  const [data, setData] = useState(null); // parsed CSV data will live here

  return (
    <div>
      <Header onDataUpload={setData} />
      <Dashboard data={data} />
      <Footer />
    </div>
  );
}

export default App;
