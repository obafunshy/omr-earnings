import React from "react";
import SummaryCards from "../summary/SummaryCards";
import EarningsTable from "../table/EarningsTable";
import DataAggregator from "../../utils/dataAggregator";

function Dashboard({ data }) {
  if (!data) return <p className="p-4">Please upload a CSV file to see insights.</p>;

  const aggregator = new DataAggregator(data);
  const summary = aggregator.getSummary();
  const artistMonthlyRows = aggregator.getArtistMonthlyEarnings();

  return (
    <main className="p-4 space-y-6">
      <h2 className="text-xl font-bold mb-4">Dashboard</h2>
      <SummaryCards summary={summary} />
      <EarningsTable rows={artistMonthlyRows} />
    </main>
  );
}

export default Dashboard;
