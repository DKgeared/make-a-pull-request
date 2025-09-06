import { Link } from 'react-router-dom'

export default function Landing() {
  return (
    <div style={{ display: 'grid', gap: 24 }}>
      <section>
        <h1 style={{ margin: 0 }}>VeriDetect.AI — Detect anomalies. Enforce trust.</h1>
        <p style={{ color: '#bbb', marginTop: 8 }}>
          Merged strengths: Detective.AI agentic alerts + VeritasDQ enterprise governance across L1→L3 layers.
        </p>
      </section>

      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
        <div style={{ background: '#1e1e1e', padding: 16, borderRadius: 8 }}>
          <div style={{ fontWeight: 700 }}>System Health</div>
          <div style={{ display: 'flex', gap: 16, marginTop: 12 }}>
            <HealthCard title="Open Alerts" value="3" accent="#f39c12" />
            <HealthCard title="MTTD" value="42m" accent="#8e44ad" />
            <HealthCard title="MTTR" value="7.5h" accent="#27ae60" />
          </div>
        </div>

        <div style={{ background: '#1e1e1e', padding: 16, borderRadius: 8 }}>
          <div style={{ fontWeight: 700 }}>Coverage</div>
          <ul style={{ marginTop: 12, color: '#bbb' }}>
            <li>L1: Schema/volume drift, key loss</li>
            <li>L2: Seasonality breaks, mapping issues</li>
            <li>L3: KPI regime shifts with explainability</li>
          </ul>
        </div>

        <div style={{ background: '#1e1e1e', padding: 16, borderRadius: 8 }}>
          <div style={{ fontWeight: 700 }}>Quick Actions</div>
          <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
            <Link to="/alerts" style={ctaStyle}>View Alerts</Link>
            <a href="#personas" style={ctaStyle}>Personas</a>
          </div>
        </div>
      </section>

      <section id="personas" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
        <PersonaCard role="Analyst" needs="Explainable alerts, fast root-cause" action="Open Alerts Inbox" link="/alerts" />
        <PersonaCard role="Data Steward" needs="Governed fixes, auditability" action="Review Proposals" link="/alerts/A-1003" />
        <PersonaCard role="Business Leader" needs="Trust & timelines" action="See KPI Impact" link="/alerts/A-1001" />
      </section>
    </div>
  )
}

function HealthCard({ title, value, accent }: { title: string; value: string; accent: string }) {
  return (
    <div style={{ flex: 1, background: '#121212', borderRadius: 8, padding: 12, border: `1px solid ${accent}33` }}>
      <div style={{ color: '#bbb' }}>{title}</div>
      <div style={{ fontSize: 28, fontWeight: 700, color: accent }}>{value}</div>
    </div>
  )
}

function PersonaCard({ role, needs, action, link }: { role: string; needs: string; action: string; link: string }) {
  return (
    <div style={{ background: '#1e1e1e', borderRadius: 8, padding: 16, border: '1px solid #2a2a2a' }}>
      <div style={{ fontWeight: 700 }}>{role}</div>
      <div style={{ color: '#bbb', marginTop: 8 }}>Needs: {needs}</div>
      <Link to={link} style={ctaStyle}>
        {action}
      </Link>
    </div>
  )
}

const ctaStyle: React.CSSProperties = {
  display: 'inline-block',
  background: '#2b5acd',
  color: '#fff',
  padding: '8px 12px',
  borderRadius: 6,
  textDecoration: 'none',
}
