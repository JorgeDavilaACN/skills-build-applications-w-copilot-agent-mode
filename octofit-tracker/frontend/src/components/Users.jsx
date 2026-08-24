import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'

function Users() {
  const [users, setUsers] = useState(null)
  const [error, setError] = useState('')
  useEffect(() => {
    fetchCollection('users').then(setUsers).catch((reason) => setError(reason.message))
  }, [])

  return (
    <section className="resource-page">
      <p className="eyebrow">YOUR COMMUNITY</p>
      <h1>Users</h1>
      {error && <p className="status error">{error}</p>}
      {!users && !error && <p className="status">Loading data...</p>}
      {users && !users.length && <p className="status">No users yet.</p>}
      <div className="card-grid">
        {users?.map((user) => (
          <article className="data-card user-card" key={user._id}>
            <span className="avatar">{user.displayName?.slice(0, 1) ?? '?'}</span>
            <div>
              <h2>{user.displayName}</h2>
              <p>@{user.username}</p>
              <span className="card-kicker">{user.email}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Users