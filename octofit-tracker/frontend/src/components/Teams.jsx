import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'

function Teams() {
  const [teams, setTeams] = useState(null)
  const [error, setError] = useState('')
  useEffect(() => { fetchCollection('teams').then(setTeams).catch((reason) => setError(reason.message)) }, [])
  return <section className="resource-page"><p className="eyebrow">TRAIN TOGETHER</p><h1>Teams</h1>{!teams && !error && <p className="status">Loading data...</p>}{error && <p className="status error">{error}</p>}<div className="card-grid">{teams?.map((team) => <article className="data-card team-card" key={team._id}><span className="card-kicker">{team.memberIds?.length ?? 0} members</span><h2>{team.name}</h2><p>{team.description}</p></article>)}</div></section>
}

export default Teams