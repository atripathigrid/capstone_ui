// Mock data mirroring the original admin_ui.html content verbatim. In a real
// deployment these payloads are produced by the FastAPI backend (services ->
// tools -> repositories -> Postgres). Here they stand in for that response so
// the ported UI renders identically while staying fully API-driven.

import type {
  DashboardSummary,
  GuardrailConfig,
  SessionUser,
  SkillListItem,
  SkillProfile,
  WorkflowDetail,
  WorkflowRow,
} from '@/types';

export const MOCK_SESSION: SessionUser = {
  id: 'usr-naresh',
  initials: 'NS',
  displayName: 'Naresh Shah',
  role: 'RevOps Lead',
  permissions: ['skill.read', 'skill.approve', 'workflow.read', 'guardrail.write'],
};

export const MOCK_DASHBOARD: DashboardSummary = {
  org: 'Grid Dynamics',
  updatedAgo: 'Last updated 2 min ago',
  stats: [
    {
      key: 'active-skills',
      label: 'Active Skills',
      value: '47',
      caption: '+6 since last month',
      captionTone: 'positive',
      hero: true,
    },
    {
      key: 'candidates',
      label: 'Candidates',
      value: '12',
      captionHtml:
        '<span style="color: rgb(168, 208, 141);">3 approved</span> · <span class="text-error">2 rejected</span>',
      captionTone: 'neutral',
    },
    {
      key: 'avg-improvement',
      label: 'Avg Improvement',
      value: '+18%',
      caption: '+4.2pp vs prior',
      captionTone: 'positive',
    },
    {
      key: 'ab-tests',
      label: 'A/B Tests',
      value: '4',
      caption: '2 shadow . 2 Live',
      captionTone: 'neutral',
    },
    {
      key: 'open-clusters',
      label: 'Open Clusters',
      value: '3',
      caption: '1 Critical',
      captionTone: 'error',
      valueTone: 'error',
    },
    {
      key: 'acceptance-rate',
      label: 'Skill Acceptance Rate',
      value: '56%',
      caption: '+2.4% vs baseline',
      captionTone: 'positive',
    },
  ],
  activity: [
    {
      id: 'a1',
      tone: 'positive',
      html: 'Skill <span class="font-mono" style="color: rgb(168, 208, 141);">lead-routing-geo-industry</span> v3.2.1 approved',
      meta: '2 min ago • RevOps',
    },
    {
      id: 'a2',
      tone: 'neutral',
      html: 'A/B test started: <span class="font-mono">multi-thread-gap-detector</span>',
      meta: '18 min ago • Temporal',
    },
    {
      id: 'a3',
      tone: 'error',
      title: 'Failure Cluster #FC-0934',
      titleTone: 'error',
      html: '6 events in <span class="font-mono">forecast-q2-pipeline</span>',
      meta: '42 min ago',
    },
    {
      id: 'a4',
      tone: 'warning',
      html: 'Guardrail intercept triggered: <span class="font-mono">pii-field-redaction</span>',
      meta: '55 min ago • Security',
    },
    {
      id: 'a5',
      tone: 'neutral',
      html: 'Candidate generated: <span class="font-mono">proposal-handoff-checklist</span>',
      meta: '1h ago • EvoForge',
    },
    {
      id: 'a6',
      tone: 'warning',
      html: 'Shadow tuning cycle completed for <span class="font-mono">opp-dedup-fuzzy-match</span>',
      meta: '2h ago • Temporal',
    },
    {
      id: 'a7',
      tone: 'error',
      title: 'Lineage Rollback Executed',
      titleTone: 'error',
      html: 'Reverted <span class="font-mono">lead-scoring-v4</span> back to baseline v3.5',
      meta: '3h ago • RevOps',
    },
  ],
  recent: [
    {
      id: 'lead-routing-geo-industry',
      name: 'lead-routing-geo-industry',
      meta: 'v3.2.1 • Source #FC-0847 • 2h ago',
      badge: 'Promoted',
      badgeTone: 'promoted',
      metric: '+23.4%',
      metricLabel: 'LIFT SCORE',
      accent: 'positive',
    },
    {
      id: 'multi-thread-gap-detector',
      name: 'multi-thread-gap-detector',
      meta: 'v2.1.0 • Source #FC-0912 • Shadow',
      badge: 'A/B Test',
      badgeTone: 'ab-test',
      metric: '+18.0%*',
      metricLabel: 'PROJECTED',
      accent: 'neutral',
    },
    {
      id: 'proposal-handoff-checklist',
      name: 'proposal-handoff-checklist',
      meta: 'v1.0.0 • Pre-Sales Queue • Pending',
      badge: 'Review',
      badgeTone: 'review',
      metric: 'Qual.',
      metricLabel: 'ANALYSIS',
      accent: 'neutral',
    },
    {
      id: 'opp-dedup-fuzzy-match',
      name: 'opp-dedup-fuzzy-match',
      meta: 'v4.0.2 • Cluster #FC-0899 • Archived',
      badge: 'Rejected',
      badgeTone: 'rejected',
      metric: '-2.1%',
      metricLabel: 'VARIANCE',
      accent: 'error',
      struck: true,
    },
  ],
};

export const MOCK_SKILLS: SkillListItem[] = [
  {
    id: 'lead-routing-geo-industry',
    name: 'lead-routing-geo-industry',
    status: 'active',
    invocations: 1847,
    awaitingApproval: false,
    locked: false,
    nameTone: 'secondary',
  },
  {
    id: 'multi-thread-gap-detector',
    name: 'multi-thread-gap-detector',
    status: 'pending-approval',
    invocations: 942,
    awaitingApproval: true,
    locked: false,
    nameTone: 'default',
  },
  {
    id: 'proposal-handoff-checklist',
    name: 'proposal-handoff-checklist',
    status: 'active',
    invocations: 412,
    awaitingApproval: false,
    locked: true,
    nameTone: 'default',
  },
  {
    id: 'opp-dedup-fuzzy-match',
    name: 'opp-dedup-fuzzy-match',
    status: 'pending-approval',
    invocations: 2140,
    awaitingApproval: true,
    locked: true,
    nameTone: 'error',
  },
];

export const MOCK_SKILL_PROFILES: Record<string, SkillProfile> = {
  'lead-routing-geo-industry': {
    id: 'lead-routing-geo-industry',
    title: 'lead-routing-geo-industry',
    subtitle: 'v3.2.1 • Lineage: 3 ancestors • 1,847 invocations',
    variant: 'summary',
    metadata: {
      triggerPattern: 'lead.convert + geo.mismatch',
      originCluster: '#FC-0847 (14 failures)',
      generatedBy: 'Claude 3.5 + Mistral-7B',
      safetyScore: '98.7% (NeMo + garak)',
      temporalWorkflow: 'wf-evo-0847-v3',
      latency: '142ms p50 • 380ms p99',
    },
    versions: [
      {
        version: 'v3.2.1',
        releaseType: 'EvoForge + review',
        status: 'production',
        created: '2h ago',
        method: 'EvoForge + Human Review',
        performance: 84.6,
        lift: '+84.6%',
        ancestor: 'v3.1.0',
      },
      {
        version: 'v3.1.0',
        releaseType: 'EvoForge + review',
        status: 'archived',
        created: '12d ago',
        method: 'EvoForge Automated Engine',
        performance: 61.2,
        lift: '+61.2%',
        ancestor: 'v2.0.0',
      },
      {
        version: 'v2.0.0',
        releaseType: 'EvoForge + review',
        status: 'archived',
        created: '3mo ago',
        method: 'EvoForge + Delta Tuning',
        performance: 55.0,
        lift: '+55.0%',
        ancestor: 'v1.0.0',
      },
      {
        version: 'v1.0.0',
        releaseType: 'Initial Synthetic Pipeline',
        status: 'archived',
        created: '5mo ago',
        method: 'Initial Synthetic Pipeline',
        performance: 42.1,
        lift: '+42.1%',
        ancestor: 'None (Base)',
      },
    ],
  },
  'multi-thread-gap-detector': {
    id: 'multi-thread-gap-detector',
    title: 'multi-thread-gap-detector',
    subtitle: 'v2.1.0 • Lineage: 1 ancestor • 942 invocations',
    variant: 'ab-test',
    metadata: {
      triggerPattern: 'thread.stall + engagement.gap',
      originCluster: '#FC-0912 (9 failures)',
      generatedBy: 'Claude 3.5 + Mistral-7B',
      safetyScore: '97.2% (NeMo + garak)',
      temporalWorkflow: 'wf-evo-0912-v2',
      latency: '168ms p50 • 410ms p99',
    },
    versions: [
      {
        version: 'v2.1.0',
        releaseType: 'EvoForge + review',
        status: 'production',
        created: '18 min ago',
        method: 'EvoForge + Human Review',
        performance: 84.6,
        lift: '+84.6%',
        ancestor: 'v2.0.0',
      },
      {
        version: 'v2.0.0',
        releaseType: 'EvoForge + review',
        status: 'archived',
        created: '1mo ago',
        method: 'EvoForge Automated Engine',
        performance: 61.2,
        lift: '+61.2%',
        ancestor: 'None (Base)',
      },
    ],
  },
};

export const MOCK_WORKFLOWS: WorkflowRow[] = [
  {
    id: 'wf-evo-0912-v2',
    type: 'Skill Evolution',
    status: 'running',
    duration: '4h 12m',
    skill: 'multi-thread-gap-detector',
    selectable: true,
    idTone: 'secondary',
    accent: true,
  },
  {
    id: 'wf-ab-retail-exp',
    type: 'A/B Test',
    status: 'running',
    duration: '2d 6h',
    skill: 'expansion-retail-to-pers',
    selectable: true,
    idTone: 'default',
    accent: false,
  },
  {
    id: 'wf-evo-0847-v3',
    type: 'Skill Evolution',
    status: 'completed',
    duration: '4h 23m',
    skill: 'lead-routing-geo-industry',
    selectable: true,
    idTone: 'default',
    accent: false,
  },
  {
    id: 'wf-evo-0899-v2',
    type: 'Skill Evolution',
    status: 'failed',
    duration: '1h 45m',
    skill: 'opp-dedup-fuzzy-match',
    selectable: false,
    idTone: 'error',
    accent: false,
  },
];

export const MOCK_WORKFLOW_DETAILS: Record<string, WorkflowDetail> = {
  'wf-evo-0912-v2': {
    id: 'wf-evo-0912-v2',
    code: 'WF-EVO-0912-V2',
    elapsed: '4h 12m elapsed',
    steps: [
      {
        id: 's1',
        title: 'Trace Captured',
        titleTone: 'default',
        segments: [
          { text: 't₀ • 4h 12m ago', tone: 'muted' },
          { text: '847 events', tone: 'primary' },
        ],
      },
      {
        id: 's2',
        title: 'Skill Generated',
        titleTone: 'default',
        segments: [
          { text: 't₁ • 3h 20m ago', tone: 'muted' },
          { text: 'Claude + Mistral-7B', tone: 'secondary' },
        ],
      },
      {
        id: 's3',
        title: 'A/B Test: Shadow Phase',
        titleTone: 'secondary',
        active: true,
        segments: [
          { text: 't₂ • processing', tone: 'secondary-italic' },
          { text: 'n=234 / 500 target', tone: 'muted' },
        ],
      },
    ],
  },
  'wf-ab-retail-exp': {
    id: 'wf-ab-retail-exp',
    code: 'WF-AB-RETAIL-EXP',
    elapsed: '2d 6h elapsed',
    steps: [
      {
        id: 's1',
        title: 'Experiment Initialized',
        titleTone: 'default',
        segments: [{ text: 't₀ • 2d 6h ago', tone: 'muted' }],
      },
      {
        id: 's2',
        title: 'Split Traffic Variant A/B Active',
        titleTone: 'secondary',
        active: true,
        segments: [{ text: 'n=4,192 sessions processed', tone: 'secondary-italic' }],
      },
    ],
  },
  'wf-evo-0847-v3': {
    id: 'wf-evo-0847-v3',
    code: 'WF-EVO-0847-V3',
    elapsed: '4h 23m elapsed',
    steps: [
      {
        id: 's1',
        title: 'Trace Captured',
        titleTone: 'default',
        segments: [
          { text: 't₀ • 1d ago', tone: 'muted' },
          { text: '1,204 events', tone: 'primary' },
        ],
      },
      {
        id: 's2',
        title: 'Skill Generated',
        titleTone: 'default',
        segments: [
          { text: 't₁ • 22h ago', tone: 'muted' },
          { text: 'Claude + Mistral-7B', tone: 'secondary' },
        ],
      },
      {
        id: 's3',
        title: 'Promoted to Production',
        titleTone: 'default',
        segments: [
          { text: 't₂ • 2h ago', tone: 'muted' },
          { text: '+23.4% lift', tone: 'primary' },
        ],
      },
    ],
  },
};

export const MOCK_GUARDRAILS: GuardrailConfig = {
  thresholds: {
    minLift: 15,
    minSamples: 500,
    maxPValue: 0.05,
    minSafety: 95,
  },
  controls: {
    autoApplyHygiene: true,
    autoRetireDegraded: true,
  },
  rails: [
    {
      name: 'no-delete-production-records',
      type: 'Block',
      domain: 'Database Layer',
      active: true,
    },
  ],
};
