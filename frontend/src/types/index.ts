// Shared TS types / API DTO models for the EvoForge Admin Console.

export type SkillStatus = 'active' | 'pending-approval' | 'archived' | 'rejected';

export interface DashboardStat {
  key: string;
  label: string;
  value: string;
  caption?: string;
  /** Pre-rendered caption fragment for mixed-color captions (verbatim port). */
  captionHtml?: string;
  captionTone?: 'positive' | 'negative' | 'neutral' | 'error';
  valueTone?: 'default' | 'error';
  /** The Active Skills card uses the larger display size + nested layout. */
  hero?: boolean;
}

export interface ActivityEvent {
  id: string;
  tone: 'positive' | 'neutral' | 'error' | 'warning';
  html: string; // pre-rendered safe fragment description
  meta: string;
  title?: string;
  titleTone?: 'error';
}

export interface RecentEvolution {
  id: string;
  name: string;
  meta: string;
  badge: string;
  badgeTone: 'promoted' | 'ab-test' | 'review' | 'rejected';
  metric: string;
  metricLabel: string;
  accent?: 'positive' | 'error' | 'neutral';
  struck?: boolean;
}

export interface DashboardSummary {
  stats: DashboardStat[];
  activity: ActivityEvent[];
  recent: RecentEvolution[];
  org: string;
  updatedAgo: string;
}

export interface SkillListItem {
  id: string;
  name: string;
  status: SkillStatus;
  invocations: number;
  awaitingApproval: boolean;
  locked: boolean;
  nameTone: 'secondary' | 'default' | 'error';
}

export interface SkillVersion {
  version: string;
  releaseType: string;
  status: 'production' | 'archived';
  created: string;
  method: string;
  performance: number;
  lift: string;
  ancestor: string;
}

export interface SkillMetadata {
  triggerPattern: string;
  originCluster: string;
  generatedBy: string;
  safetyScore: string;
  temporalWorkflow: string;
  latency: string;
}

export interface SkillProfile {
  id: string;
  title: string;
  subtitle: string;
  variant: 'summary' | 'ab-test';
  metadata: SkillMetadata;
  versions: SkillVersion[];
}

export type StepSegmentTone = 'muted' | 'primary' | 'secondary' | 'secondary-italic';

export interface StepSegment {
  text: string;
  tone: StepSegmentTone;
}

export interface WorkflowStep {
  id: string;
  title: string;
  titleTone: 'default' | 'secondary';
  segments: StepSegment[];
  active?: boolean;
}

export interface WorkflowRow {
  id: string;
  type: string;
  status: 'running' | 'completed' | 'failed';
  duration: string;
  skill: string;
  selectable: boolean;
  idTone: 'secondary' | 'default' | 'error';
  accent: boolean;
}

export interface WorkflowDetail {
  id: string;
  code: string;
  elapsed: string;
  steps: WorkflowStep[];
}

export interface NemoRail {
  name: string;
  type: 'Block' | 'Warn' | 'Audit';
  domain: string;
  active: boolean;
}

export interface GuardrailConfig {
  thresholds: {
    minLift: number;
    minSamples: number;
    maxPValue: number;
    minSafety: number;
  };
  controls: {
    autoApplyHygiene: boolean;
    autoRetireDegraded: boolean;
  };
  rails: NemoRail[];
}

/** RBAC: the authenticated session that scopes every query. */
export interface SessionUser {
  id: string;
  initials: string;
  displayName: string;
  role: string;
  permissions: string[];
}
