import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'

function Activities() {
  const [activities, setActivities] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchCollection('activities').then(setActivities).catch((reason) => setError(reason.message))
  }, [])

  return <ResourcePage title="Activities" eyebrow="MOVEMENT LOG" error={error} loading={!activities}>
    {activities?.map((activity) => <article className="data-card" key={activity._id}>
      <div><span className="card-kicker">{activity.type}</span><h2>{activity.durationMinutes} min session</h2></div>
      <strong className="score">+{activity.points} pts</strong>
    </article>)}
  </ResourcePage>
}

function ResourcePage({ title, eyebrow, error, loading, children }) {
  return <section className="resource-page"><p className="eyebrow">{eyebrow}</p><h1>{title}</h1>{loading && !error && <p className="status">Loading data...</p>}{error && <p className="status error">{error}</p>}{!loading && !error && children}</section>
}

export default Activities