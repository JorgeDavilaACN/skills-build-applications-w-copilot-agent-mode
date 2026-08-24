import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'

function Workouts() {
  const [workouts, setWorkouts] = useState(null)
  const [error, setError] = useState('')
  useEffect(() => {
    fetchCollection('workouts').then(setWorkouts).catch((reason) => setError(reason.message))
  }, [])

  return (
    <section className="resource-page">
      <p className="eyebrow">CURATED SESSIONS</p>
      <h1>Workouts</h1>
      {error && <p className="status error">{error}</p>}
      {!workouts && !error && <p className="status">Loading data...</p>}
      {workouts && !workouts.length && <p className="status">No workouts yet.</p>}
      <div className="card-grid">
        {workouts?.map((workout) => (
          <article className="data-card workout-card" key={workout._id}>
            <span className="difficulty">{workout.difficulty}</span>
            <h2>{workout.name}</h2>
            <p>{workout.description}</p>
            <footer>
              {workout.durationMinutes} min
              <span>{workout.exercises?.length ?? 0} exercises</span>
            </footer>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Workouts