export type LayerType = 'L1' | 'L2' | 'L3'

export type Severity = 'low' | 'medium' | 'high' | 'critical'

export interface Alert {
  id: string
  title: string
  description: string
  layer: LayerType
  severity: Severity
  entity: string
  status: 'open' | 'in_review' | 'resolved'
  timestamp: string
  metrics?: Record<string, number>
  suspectedRootCause?: string
  impactedRecords?: number
}

export interface FixProposal {
  id: string
  alertId: string
  summary: string
  action: 'override' | 'rule_update' | 'rerun' | 'escalate'
  createdAt: string
  status: 'proposed' | 'approved' | 'rejected'
  decidedBy?: string
  decidedAt?: string
}

export interface AuditEvent {
  id: string
  alertId: string
  type: 'alert_ack' | 'proposal_created' | 'proposal_approved' | 'proposal_rejected' | 'model_feedback'
  actor: string
  message: string
  createdAt: string
}
