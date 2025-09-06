import { Link, Route, Routes, useLocation } from 'react-router-dom'
import './App.css'
import Landing from './pages/Landing'
import Alerts from './pages/Alerts'
import AlertDetail from './pages/AlertDetail'

function Nav() {
  const location = useLocation()
  return (
    <nav style={{ display: 'flex', gap: 16, alignItems: 'center', padding: '12px 16px', borderBottom: '1px solid #333' }}>
      <div style={{ fontWeight: 700 }}>VeriDetect.AI</div>
      <Link to="/" style={{ color: location.pathname === '/' ? '#8ab4f8' : '#bbb' }}>Home</Link>
      <Link to="/alerts" style={{ color: location.pathname.startsWith('/alerts') ? '#8ab4f8' : '#bbb' }}>Alerts</Link>
    </nav>
  )
}

export default function App() {
  return (
    <div style={{ minHeight: '100vh', background: '#121212', color: '#e6e6e6' }}>
      <Nav />
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: 16 }}>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/alerts" element={<Alerts />} />
          <Route path="/alerts/:id" element={<AlertDetail />} />
        </Routes>
      </div>
    </div>
  )
}
