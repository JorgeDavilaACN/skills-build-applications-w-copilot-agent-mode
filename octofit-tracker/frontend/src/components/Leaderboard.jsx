import { useEffect, useState } from 'react'
const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
const apiBaseUrl = codespaceName ? `https://${codespaceName}-8000.app.github.dev` : 'http://localhost:8000'
const leaderboardEndpoint = `${apiBaseUrl}/api/leaderboard/`

async function fetchLeaderboard() {
  const response = await fetch(leaderboardEndpoint)
  if (!response.ok) throw new Error(`Could not load leaderboard (${response.status})`)
  const payload = await response.json()
  return Array.isArray(payload) ? payload : payload.data ?? payload.results ?? payload.items ?? []
}

function Leaderboard() {
  const [entries, setEntries] = useState(null)
  const [error, setError] = useState('')
  useEffect(() => {
    fetchLeaderboard().then(setEntries).catch((reason) => setError(reason.message))
  }, [])

  const sortedEntries = entries ? [...entries].sort((first, second) => (first.rank ?? 999) - (second.rank ?? 999)) : []

  return (
    <section className="resource-page">
      <p className="eyebrow">WEEKLY RANKINGS</p>
      <h1>Leaderboard</h1>
      {error && <p className="status error">{error}</p>}
      {!entries && !error && <p className="status">Loading data...</p>}
      {entries && !entries.length && <p className="status">No rankings yet.</p>}
      <div className="leaderboard-list">
        {sortedEntries.map((entry) => (
          <article className="rank-row" key={entry._id}>
            <span className="rank-number">{String(entry.rank ?? '-').padStart(2, '0')}</span>
            <span className="rank-name">
              {entry.userId?.displayName ?? entry.username ?? `Athlete ${String(entry.userId).slice(-4)}`}
            </span>
            <strong>{entry.points} pts</strong>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Leaderboard