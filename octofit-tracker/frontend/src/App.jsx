import { NavLink, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'
import './App.css'

function App() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <NavLink className="brand" to="/">
          <span className="brand-mark">O</span>
          <span>Octofit</span>
        </NavLink>
        <nav className="main-nav" aria-label="Main navigation">
          <NavLink end to="/">Overview</NavLink>
          <NavLink to="/activities">Activities</NavLink>
          <NavLink to="/leaderboard">Leaderboard</NavLink>
          <NavLink to="/teams">Teams</NavLink>
          <NavLink to="/users">Users</NavLink>
          <NavLink to="/workouts">Workouts</NavLink>
        </nav>
      </header>

      <main className="app-main">
        <Routes>
          <Route path="/" element={<Overview />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/users" element={<Users />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </main>
    </div>
  )
}

function Overview() {
  return (
    <section className="overview-page">
      <p className="eyebrow">PERSONAL FITNESS HQ</p>
      <h1>Make your next<br /><span>move count.</span></h1>
      <p className="overview-copy">Track momentum, rally your team, and turn everyday movement into a shared win.</p>
      <div className="overview-grid">
        <NavLink to="/activities" className="overview-tile tile-green"><strong>Activities</strong><span>Log and review movement</span><b>{'->'}</b></NavLink>
        <NavLink to="/leaderboard" className="overview-tile tile-yellow"><strong>Leaderboard</strong><span>See who is on top</span><b>{'->'}</b></NavLink>
        <NavLink to="/workouts" className="overview-tile tile-coral"><strong>Workouts</strong><span>Find your next session</span><b>{'->'}</b></NavLink>
      </div>
    </section>
  )
}

export default App
