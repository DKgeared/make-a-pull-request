import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { sampleAlerts } from '../data/sample'
import type { LayerType, Severity } from '../types'

const layerOptions: LayerType[] = ['L1', 'L2', 'L3']
const severityOrder: Severity[] = ['low', 'medium', 'high', 'critical']

export default function Alerts() {
  const [layerFilter, setLayerFilter] = useState<LayerType | 'all'>('all')
  const [search, setSearch] = useState('')

  const filtered = useMemo(() => {
    return sampleAlerts
      .filter(a => (layerFilter === 'all' ? true : a.layer === layerFilter))
      .filter(a => a.title.toLowerCase().includes(search.toLowerCase()) || a.id.toLowerCase().includes(search.toLowerCase()))
      .sort((a, b) => severityOrder.indexOf(b.severity) - severityOrder.indexOf(a.severity))
  }, [layerFilter, search])

  return (
    <div style={{ display: 'grid', gap: 16 }}>
      <h2 style={{ margin: 0 }}>Alerts Inbox</h2>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <select value={layerFilter} onChange={e => setLayerFilter(e.target.value as any)}>
          <option value="all">All Layers</option>
          {layerOptions.map(l => (
            <option key={l} value={l}>{l}</option>
          ))}
        </select>
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search alerts" style={{ flex: 1, padding: 8, borderRadius: 6, border: '1px solid #333', background: '#1a1a1a', color: '#fafafa' }} />
      </div>

      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ textAlign: 'left', color: '#bbb' }}>
            <th style={th}>ID</th>
            <th style={th}>Title</th>
            <th style={th}>Layer</th>
            <th style={th}>Severity</th>
            <th style={th}>Entity</th>
            <th style={th}>Status</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map(a => (
            <tr key={a.id} style={{ borderTop: '1px solid #2a2a2a' }}>
              <td style={td}><Link to={`/alerts/${a.id}`}>{a.id}</Link></td>
              <td style={td}>{a.title}</td>
              <td style={td}>{a.layer}</td>
              <td style={td}><SeverityBadge sev={a.severity} /></td>
              <td style={td}>{a.entity}</td>
              <td style={td}>{a.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function SeverityBadge({ sev }: { sev: Severity }) {
  const color = sev === 'critical' ? '#e74c3c' : sev === 'high' ? '#f39c12' : sev === 'medium' ? '#2980b9' : '#27ae60'
  return (
    <span style={{ background: `${color}22`, color, border: `1px solid ${color}66`, padding: '2px 8px', borderRadius: 999 }}>{sev}</span>
  )
}

const th: React.CSSProperties = { padding: '8px 6px', fontWeight: 600 }
const td: React.CSSProperties = { padding: '8px 6px' }
