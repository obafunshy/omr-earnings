function SummaryCards({ summary }) {
  if (!summary) return null;

  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="card bg-base-200 p-4">
        <h3>Total Earnings</h3>
        <p>£{summary.totalEarnings.toFixed(2)}</p>
      </div>
      <div className="card bg-base-200 p-4">
        <h3>Total Artists</h3>
        <p>{summary.artistCount}</p>
      </div>
      <div className="card bg-base-200 p-4">
        <h3>Total Songs</h3>
        <p>{summary.songCount}</p>
      </div>
      {summary.topArtist && (
        <div className="card bg-base-200 p-4">
          <h3>Top Artist</h3>
          <p>{summary.topArtist.name} (£{summary.topArtist.earnings.toFixed(2)})</p>
        </div>
      )}
      {summary.topSong && (
        <div className="card bg-base-200 p-4">
          <h3>Top Song</h3>
          <p>{summary.topSong.name} (£{summary.topSong.earnings.toFixed(2)})</p>
        </div>
      )}
    </div>
  );
}

export default SummaryCards;