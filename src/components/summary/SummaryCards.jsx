import React from "react";

function SummaryCards({ summary }) {
  if (!summary) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4 p-4">
      <div className="card bg-base-200 p-4 shadow-md rounded">
        <h3 className="text-lg font-semibold mb-1">Total Earnings</h3>
        <p className="text-xl font-bold">£{summary.totalEarnings.toFixed(2)}</p>
      </div>
      <div className="card bg-base-200 p-4 shadow-md rounded">
        <h3 className="text-lg font-semibold mb-1">Total Artists</h3>
        <p className="text-xl font-bold">{summary.artistCount}</p>
      </div>
      <div className="card bg-base-200 p-4 shadow-md rounded">
        <h3 className="text-lg font-semibold mb-1">Total Songs</h3>
        <p className="text-xl font-bold">{summary.songCount}</p>
      </div>
      {summary.topArtist && (
        <div className="card bg-base-200 p-4 shadow-md rounded">
          <h3 className="text-lg font-semibold mb-1">Top Artist</h3>
          <p className="text-xl font-bold">
            {summary.topArtist.name} (£{summary.topArtist.earnings.toFixed(2)})
          </p>
        </div>
      )}
      {summary.topSong && (
        <div className="card bg-base-200 p-4 shadow-md rounded">
          <h3 className="text-lg font-semibold mb-1">Top Song</h3>
          <p className="text-xl font-bold">
            {summary.topSong.name} (£{summary.topSong.earnings.toFixed(2)})
          </p>
        </div>
      )}
    </div>
  );
}

export default SummaryCards;
