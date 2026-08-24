import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'

function Activities() {
  const [activities, setActivities] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchCollection('activities').then(setActivities).catch((reason) => setError(reason.message))
  }, [])

  return (
    <section className="resource-page">
      <p className="eyebrow">MOVEMENT LOG</p>
      <h1>Activities</h1>
      {error && <p className="status error">{error}</p>}
      {!activities && !error && <p className="status">Loading data...</p>}
      {activities && !activities.length && <p className="status">No activities yet.</p>}
      <div className="card-grid">
        {activities?.map((activity) => (
          <article className="data-card" key={activity._id}>
            <div>
              <span className="card-kicker">{activity.type}</span>
              <h2>{activity.durationMinutes} min session</h2>
            </div>
            <strong className="score">+{activity.points} pts</strong>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Activities