import { useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getAlertById } from '../data/sample'
import type { FixProposal, AuditEvent } from '../types'

export default function AlertDetail() {
  const { id } = useParams()
  const alert = useMemo(() => (id ? getAlertById(id) : undefined), [id])
  const [proposals, setProposals] = useState<FixProposal[]>(alert ? [
    { id: 'P-auto', alertId: alert.id, summary: 'AI suggests: temporary override + re-run', action: 'override', createdAt: new Date().toISOString(), status: 'proposed' },
  ] : [])
  const [audit, setAudit] = useState<AuditEvent[]>([])
  const [feedback, setFeedback] = useState<'agree' | 'disagree' | undefined>()

  if (!alert) return <div>Alert not found</div>

  const approve = (pid: string) => {
    setProposals(prev => prev.map(p => p.id === pid ? { ...p, status: 'approved', decidedAt: new Date().toISOString(), decidedBy: 'Data Steward: Alex' } : p))
    pushAudit({ id: `E-${Date.now()}`, alertId: alert.id, type: 'proposal_approved', actor: 'Data Steward: Alex', message: 'Approved auto proposal', createdAt: new Date().toISOString() })
  }
  const reject = (pid: string) => {
    setProposals(prev => prev.map(p => p.id === pid ? { ...p, status: 'rejected', decidedAt: new Date().toISOString(), decidedBy: 'Data Steward: Alex' } : p))
    pushAudit({ id: `E-${Date.now()}`, alertId: alert.id, type: 'proposal_rejected', actor: 'Data Steward: Alex', message: 'Rejected auto proposal', createdAt: new Date().toISOString() })
  }
  const pushAudit = (e: AuditEvent) => setAudit(prev => [e, ...prev])

  return (
    <div style={{ display: 'grid', gap: 16 }}>
      <header>
        <div style={{ color: '#bbb' }}>{alert.id} • {alert.layer} • {alert.severity}</div>
        <h2 style={{ margin: '4px 0 0' }}>{alert.title}</h2>
        <div style={{ color: '#bbb' }}>{alert.description}</div>
      </header>

      <section style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 16 }}>
        <div style={{ display: 'grid', gap: 12 }}>
          <Panel title="Detection Agent">
            <ul style={{ margin: 0, paddingLeft: 18 }}>
              {alert.metrics && Object.entries(alert.metrics).map(([k, v]) => (
                <li key={k}><strong>{k}</strong>: {typeof v === 'number' ? v.toFixed(2) : v as any}</li>
              ))}
              <li><strong>Impacted records</strong>: {alert.impactedRecords ?? 0}</li>
            </ul>
          </Panel>
          <Panel title="Critique Agent (Explain / Diagnose)">
            <p style={{ marginTop: 0 }}>Likely root-cause: {alert.suspectedRootCause}</p>
            <p style={{ color: '#bbb' }}>Trace: L3 Territory → ZIP 606xx → Outlet feed (subcategory change)</p>
          </Panel>
          <Panel title="Learning Agent (Feedback loop)">
            <div style={{ display: 'flex', gap: 8 }}>
              <button onClick={() => { setFeedback('agree'); pushAudit({ id: `E-${Date.now()}`, alertId: alert.id, type: 'model_feedback', actor: 'Analyst: Priya', message: 'Agree with detection', createdAt: new Date().toISOString() }) }}>Agree</button>
              <button onClick={() => { setFeedback('disagree'); pushAudit({ id: `E-${Date.now()}`, alertId: alert.id, type: 'model_feedback', actor: 'Analyst: Priya', message: 'Disagree (benign event)', createdAt: new Date().toISOString() }) }}>Disagree</button>
            </div>
            <div style={{ color: '#bbb', marginTop: 4 }}>Feedback: {feedback ?? '—'}</div>
          </Panel>
        </div>

        <div style={{ display: 'grid', gap: 12 }}>
          <Panel title="Lineage / Traceability">
            <LineageMini />
          </Panel>
          <Panel title="Governance (Propose / Approve / Audit)">
            {proposals.map(p => (
              <div key={p.id} style={{ border: '1px solid #2a2a2a', borderRadius: 8, padding: 8, marginBottom: 8 }}>
                <div style={{ fontWeight: 600 }}>{p.summary}</div>
                <div style={{ color: '#bbb' }}>Action: {p.action} • Status: {p.status}</div>
                {p.status === 'proposed' && (
                  <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
                    <button onClick={() => approve(p.id)}>Approve</button>
                    <button onClick={() => reject(p.id)}>Reject</button>
                  </div>
                )}
              </div>
            ))}
            <div>
              <div style={{ fontWeight: 600, marginTop: 8 }}>Audit Trail</div>
              {audit.length === 0 ? <div style={{ color: '#bbb' }}>No events yet</div> : (
                <ul style={{ margin: 0, paddingLeft: 18 }}>
                  {audit.map(a => (
                    <li key={a.id}>{a.createdAt} — {a.actor}: {a.message}</li>
                  ))}
                </ul>
              )}
            </div>
          </Panel>
        </div>
      </section>
    </div>
  )
}

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: 8, padding: 12 }}>
      <div style={{ fontWeight: 700, marginBottom: 8 }}>{title}</div>
      {children}
    </div>
  )
}

function LineageMini() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 40px 1fr 40px 1fr', alignItems: 'center' }}>
      <Stage label="L1 Raw" detail="Outlet feed" color="#e74c3c" />
      <Arrow />
      <Stage label="L2 Refined" detail="ZIP aggregates" color="#f39c12" />
      <Arrow />
      <Stage label="L3 Semantic" detail="Territory KPI" color="#27ae60" />
    </div>
  )
}

function Stage({ label, detail, color }: { label: string; detail: string; color: string }) {
  return (
    <div style={{ border: `1px solid ${color}88`, background: '#121212', padding: 8, borderRadius: 8 }}>
      <div style={{ color }}>{label}</div>
      <div style={{ color: '#bbb' }}>{detail}</div>
    </div>
  )
}

function Arrow() {
  return <div style={{ textAlign: 'center', color: '#666' }}>➡</div>
}
