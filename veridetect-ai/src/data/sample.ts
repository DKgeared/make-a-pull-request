import type { Alert, FixProposal, AuditEvent } from '../types'

export const sampleAlerts: Alert[] = [
  {
    id: 'A-1001',
    title: 'Territory TRx drop detected',
    description: 'Significant decline in Territory T-IL-07 TRx vs 13-week baseline',
    layer: 'L3',
    severity: 'high',
    entity: 'Territory T-IL-07',
    status: 'open',
    timestamp: new Date().toISOString(),
    metrics: { deltaPct: -18.4, zScore: -3.1 },
    suspectedRootCause: 'ZIP 606xx contribution drop; upstream outlet exclusion',
    impactedRecords: 1240,
  },
  {
    id: 'A-1002',
    title: 'ZIP sales seasonality break',
    description: 'DTW divergence for ZIP 60614 vs prior season',
    layer: 'L2',
    severity: 'medium',
    entity: 'ZIP 60614',
    status: 'open',
    timestamp: new Date().toISOString(),
    metrics: { dtw: 0.72, zScore: -2.1 },
    suspectedRootCause: 'Reclassification of several outlets',
    impactedRecords: 342,
  },
  {
    id: 'A-1003',
    title: 'Outlet schema drift',
    description: 'Missing/changed subcategory codes in raw outlet feed',
    layer: 'L1',
    severity: 'critical',
    entity: 'Outlet feed (ICD84)',
    status: 'open',
    timestamp: new Date().toISOString(),
    metrics: { missingKeyPct: 5.3 },
    suspectedRootCause: 'Source added new subcategory values',
    impactedRecords: 780,
  },
]

export const sampleProposals: FixProposal[] = [
  {
    id: 'P-1',
    alertId: 'A-1003',
    summary: 'Temporarily whitelist new subcategory codes and re-run mapping',
    action: 'override',
    createdAt: new Date().toISOString(),
    status: 'proposed',
  },
]

export const initialAudit: AuditEvent[] = [
  {
    id: 'E-1',
    alertId: 'A-1001',
    type: 'alert_ack',
    actor: 'Analyst: Priya',
    message: 'Acknowledged alert and started investigation',
    createdAt: new Date().toISOString(),
  },
]

export function getAlertById(id: string): Alert | undefined {
  return sampleAlerts.find(a => a.id === id)
}
