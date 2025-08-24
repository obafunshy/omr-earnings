import React, { useMemo, useState, useEffect } from "react";
import SummaryCards from "../summary/SummaryCards";
import Filters from "../filters/Filters";
import EarningsTable from "../table/EarningsTable";
import Pagination from "../shared/Pagination";
import SongEarningsView from "../table/SongEarningsView";
import ArtistTotalsView from "../table/ArtistTotalsView";
import DataAggregator from "../../utils/dataAggregator";
import { keepLastNMonths, paginate } from "../../utils/dataHelpers";

function Dashboard({ data }) {
  // Always call hooks unconditionally
  const [view, setView] = useState("artist");
  const [monthLimit, setMonthLimit] = useState(4);
  const [page, setPage] = useState(1);
  const rowsPerPage = 25;

  const aggregator = useMemo(() => new DataAggregator(data || []), [data]);

  const artistMonthly = useMemo(() => aggregator.getArtistMonthlyEarnings(), [aggregator]);
  const songEarnings = useMemo(() => aggregator.getSongEarnings(), [aggregator]);

  const filteredArtist = useMemo(
    () => keepLastNMonths(artistMonthly, monthLimit),
    [artistMonthly, monthLimit]
  );

  useEffect(() => {
    setPage(1);
  }, [monthLimit, data]);

  const paginated = useMemo(() => {
    const source = view === "artist" ? filteredArtist : songEarnings;
    return paginate(source, page, rowsPerPage);
  }, [view, filteredArtist, songEarnings, page]);

  // Now handle the conditional render (after hooks)
  if (!data) {
    return <p className="p-4">Please upload a CSV file to see insights.</p>;
  }

  return (
    <main className="p-4 space-y-6">
      {/* View toggle */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Dashboard</h2>
        <select value={view} onChange={(e) => setView(e.target.value)} className="border rounded px-2 py-1">
          <option value="artist">Artist View</option>
          <option value="song">Song View</option>
          <option value="artistTotals">Artist Totals View</option>
        </select>
      </div>

      <SummaryCards summary={aggregator.getSummary()} />

      {view === "artist" && (
        <>
          <Filters monthLimit={monthLimit} onMonthLimitChange={setMonthLimit} />
          <EarningsTable rows={paginated.slice} />
        </>
      )}

      {view === "song" && (
        <>
          <SongEarningsView rows={paginated.slice} />
        </>
      )}
      {view === "artistTotals" && (
        <ArtistTotalsView rows={data} />
      )}

      {paginated.totalPages > 1 && (
        <Pagination page={paginated.page} totalPages={paginated.totalPages} onPageChange={setPage} />
      )}
    </main>
  );
}


export default Dashboard;
