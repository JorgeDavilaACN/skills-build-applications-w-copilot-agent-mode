import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'

function Leaderboard() {
  const [entries, setEntries] = useState(null)
  const [error, setError] = useState('')
  useEffect(() => { fetchCollection('leaderboard').then(setEntries).catch((reason) => setError(reason.message)) }, [])
  return <section className="resource-page"><p className="eyebrow">WEEKLY RANKINGS</p><h1>Leaderboard</h1>{!entries && !error && <p className="status">Loading data...</p>}{error && <p className="status error">{error}</p>}<div className="leaderboard-list">{entries?.sort((a, b) => (a.rank ?? 999) - (b.rank ?? 999)).map((entry) => <article className="rank-row" key={entry._id}><span className="rank-number">{String(entry.rank).padStart(2, '0')}</span><span className="rank-name">{entry.userId?.displayName ?? entry.username ?? `Athlete ${String(entry.userId).slice(-4)}`}</span><strong>{entry.points} pts</strong></article>)}</div></section>
}

export default Leaderboard