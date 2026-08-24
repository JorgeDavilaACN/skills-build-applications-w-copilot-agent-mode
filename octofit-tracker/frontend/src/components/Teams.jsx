import { useEffect, useState } from 'react'
const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
const apiBaseUrl = codespaceName ? `https://${codespaceName}-8000.app.github.dev` : 'http://localhost:8000'
const teamsEndpoint = `${apiBaseUrl}/api/teams/`

async function fetchTeams() {
  const response = await fetch(teamsEndpoint)
  if (!response.ok) throw new Error(`Could not load teams (${response.status})`)
  const payload = await response.json()
  return Array.isArray(payload) ? payload : payload.data ?? payload.results ?? payload.items ?? []
}

function Teams() {
  const [teams, setTeams] = useState(null)
  const [error, setError] = useState('')
  useEffect(() => {
    fetchTeams().then(setTeams).catch((reason) => setError(reason.message))
  }, [])

  return (
    <section className="resource-page">
      <p className="eyebrow">TRAIN TOGETHER</p>
      <h1>Teams</h1>
      {error && <p className="status error">{error}</p>}
      {!teams && !error && <p className="status">Loading data...</p>}
      {teams && !teams.length && <p className="status">No teams yet.</p>}
      <div className="card-grid">
        {teams?.map((team) => (
          <article className="data-card team-card" key={team._id}>
            <span className="card-kicker">{team.memberIds?.length ?? 0} members</span>
            <h2>{team.name}</h2>
            <p>{team.description}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Teams