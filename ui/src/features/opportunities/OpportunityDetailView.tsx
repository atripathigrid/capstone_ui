import { useParams } from "react-router-dom";
import { ElementState } from "@/components/ElementState";
import { ReloadButton } from "@/components/ReloadButton";
import { Icon } from "@/components/Icon";
import { ActionCard } from "./ActionCard";
import { useOpportunityDetail } from "./hooks";

export function OpportunityDetailView() {
  const { opportunityId = "" } = useParams();
  const query = useOpportunityDetail(opportunityId);

  return (
    <>
      {/* Header — bound to the per-opportunity detail query (Requirement 6:
          full payload only loads when a specific opportunity route opens). */}
      <section className="flex justify-between items-end mb-6">
        <ElementState
          isLoading={query.isLoading}
          isError={query.isError}
          error={query.error}
          data={query.data}
          onRetry={() => query.refetch()}
          loadingClassName="h-16"
        >
          {(detail) => (
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold text-secondary uppercase tracking-widest">
                  DEAL DETAIL
                </span>
                <ReloadButton onReload={() => query.refetch()} busy={query.isFetching} />
              </div>
              <div className="flex items-baseline gap-3">
                <h1 className="text-3xl font-bold tracking-tight text-on-surface">
                  {detail.opportunityId}
                </h1>
                <span className="px-3 py-0.5 bg-surface-container border border-white/5 text-on-surface-variant rounded-full text-xs font-semibold tracking-wide">
                  {detail.valueLabel}
                </span>
              </div>
              <div className="flex items-center gap-2 text-on-surface-variant/60 text-xs mt-0.5">
                <Icon name="apartment" className="text-sm" />
                <span>{detail.account}</span>
                <span className="text-white/20">•</span>
                <span>Owner: {detail.owner}</span>
              </div>
            </div>
          )}
        </ElementState>
        <div className="flex gap-2">
          <button className="px-4 py-1.5 bg-surface-container text-on-surface-variant hover:text-white hover:bg-surface-bright text-xs font-semibold flex items-center gap-2 rounded transition-all">
            <Icon name="file_download" className="text-sm" />
            <span>Export</span>
          </button>
          <button className="px-4 py-1.5 bg-surface-container border border-white/5 text-secondary hover:bg-secondary hover:text-on-secondary text-xs font-bold flex items-center gap-2 rounded transition-all">
            <Icon name="edit" className="text-sm" />
            <span>Edit Deal</span>
          </button>
        </div>
      </section>

      <div className="space-y-6">
        {/* AI Summary Hero Card */}
        <div className="intelligence-card p-6 rounded-lg relative overflow-hidden border-l-4 border-secondary ai-glow bg-gradient-to-r from-surface to-background">
          <div className="flex items-center gap-3 mb-4">
            <div className="pulse-dot"></div>
            <h3 className="text-sm font-bold text-secondary tracking-wide">AI Intelligence Summary</h3>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-7">
              <p className="text-sm text-on-surface/90 leading-relaxed mb-4">
                The SPG-VISA deal has strong executive sponsorship from the CFO, but momentum is currently
                threatened by a{" "}
                <span className="text-error font-semibold underline decoration-error/30 underline-offset-4">
                  technical bottleneck
                </span>
                . Engineering Lead, Michael Chen, has gone <span className="text-error font-medium">"cold"</span>{" "}
                in the last 7 days.
              </p>
              <div className="p-3 bg-secondary/[0.02] border border-secondary/10 rounded flex gap-3 items-start">
                <Icon name="bolt" className="text-secondary text-lg mt-0.5" />
                <div>
                  <p className="text-xs font-bold text-on-surface mb-0.5">Recommendation</p>
                  <p className="text-on-surface-variant text-xs leading-normal">
                    Schedule a <span className="text-secondary font-medium">Security Architecture Deep Dive</span>{" "}
                    with Michael Chen by Friday to resolve architecture review stalls.
                  </p>
                </div>
              </div>
            </div>
            <div className="lg:col-span-5 flex flex-col gap-2">
              <div className="p-3 rounded bg-error/5 border border-error/10">
                <span className="text-[9px] text-error font-bold uppercase tracking-wider block">
                  Primary Risk
                </span>
                <p className="text-xs text-on-surface font-semibold mt-0.5">Engineering Cold Shoulder</p>
              </div>
              <div className="p-3 rounded bg-secondary/5 border border-secondary/10">
                <span className="text-[9px] text-secondary font-bold uppercase tracking-wider block">
                  Strong Signal
                </span>
                <p className="text-xs text-on-surface font-semibold mt-0.5">Q3 Budget Surplus Identified</p>
              </div>
              <div className="p-3 rounded bg-surface-container">
                <span className="text-[9px] text-on-surface-variant/50 font-bold uppercase tracking-wider block">
                  Status Update
                </span>
                <p className="text-xs text-on-surface/90 mt-0.5">
                  Procurement alignment is <span className="text-secondary font-medium">80% complete</span>.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Metrics strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="intelligence-card p-4 rounded-lg flex items-center justify-between border-primary/20 bg-primary/[0.01]">
            <div>
              <span className="text-[9px] font-bold text-primary uppercase tracking-widest block">
                Legal SLA Health
              </span>
              <span className="text-xl font-bold mt-1 block text-primary">48h Breach Limit</span>
            </div>
            <div className="w-8 h-8 rounded-full border border-primary/20 bg-primary/5 flex items-center justify-center text-primary">
              <Icon name="gavel" className="text-base" />
            </div>
          </div>

          <div className="intelligence-card p-4 rounded-lg flex items-center justify-between">
            <div>
              <span className="text-[9px] font-bold text-on-surface-variant/40 uppercase tracking-widest block">
                Win Probability
              </span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-xl font-bold text-secondary">74%</span>
              </div>
            </div>
            <Icon name="trending_up" className="text-secondary text-lg" />
          </div>

          <div className="intelligence-card p-4 rounded-lg flex items-center justify-between bg-error/[0.01] border-error/10">
            <div>
              <span className="text-[9px] font-bold text-error uppercase tracking-widest block">
                Closing Pipeline
              </span>
              <span className="text-xl font-bold mt-1 block text-error">18d left</span>
            </div>
            <Icon name="timer" className="text-error text-lg" />
          </div>

          <div className="intelligence-card p-4 rounded-lg flex items-center justify-between">
            <div>
              <span className="text-[9px] font-bold text-on-surface-variant/40 uppercase tracking-widest block">
                Velocity Stream
              </span>
              <span className="text-xl font-bold mt-1 block text-secondary">Accelerating</span>
            </div>
            <div className="flex gap-0.5 items-end h-5">
              <div className="w-1 bg-secondary/20 h-1.5 rounded-t"></div>
              <div className="w-1 bg-secondary/40 h-3 rounded-t"></div>
              <div className="w-1 bg-secondary h-4 rounded-t"></div>
            </div>
          </div>
        </div>

        {/* Journey Path Stepper */}
        <div className="intelligence-card p-5 rounded-lg">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xs font-bold flex items-center gap-2 uppercase tracking-wider text-on-surface">
              <Icon name="alt_route" className="text-secondary text-base" />
              Deal Journey Progression
            </h3>
            <div className="flex gap-4 text-[10px] font-bold uppercase tracking-wider">
              <span className="text-on-surface-variant/40">Elapsed: 42 days</span>
              <span className="text-secondary">Status: Healthy</span>
            </div>
          </div>
          <div className="relative px-6">
            <div className="absolute h-0.5 w-[calc(100%-48px)] bg-surface-container-highest top-[16px] left-[24px] z-0"></div>
            <div className="flex justify-between relative z-10">
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-secondary text-on-secondary flex items-center justify-center font-bold text-xs">
                  <Icon name="check" className="text-sm font-bold" />
                </div>
                <span className="mt-2 text-[11px] font-bold text-on-surface">Discovery</span>
                <span className="text-[9px] text-on-surface-variant/40 font-medium">8 days</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-secondary text-on-secondary flex items-center justify-center font-bold text-xs">
                  <Icon name="check" className="text-sm font-bold" />
                </div>
                <span className="mt-2 text-[11px] font-bold text-on-surface">Qualification</span>
                <span className="text-[9px] text-on-surface-variant/40 font-medium">14 days</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-9 h-9 -mt-0.5 rounded-full bg-surface-container border-2 border-secondary flex items-center justify-center text-secondary font-bold text-xs shadow-md shadow-secondary/10">
                  3
                </div>
                <span className="mt-1.5 text-[11px] font-black text-secondary uppercase tracking-wider">
                  Proposal
                </span>
                <span className="text-[9px] font-bold text-secondary">Active: 12d</span>
              </div>
              <div className="flex flex-col items-center opacity-40">
                <div className="w-8 h-8 rounded-full bg-surface-container-highest flex items-center justify-center text-xs text-on-surface font-semibold">
                  4
                </div>
                <span className="mt-2 text-[11px] font-medium">Negotiation</span>
              </div>
              <div className="flex flex-col items-center opacity-40">
                <div className="w-8 h-8 rounded-full bg-surface-container-highest flex items-center justify-center text-xs text-on-surface font-semibold">
                  5
                </div>
                <span className="mt-2 text-[11px] font-medium">Closing</span>
              </div>
            </div>
          </div>
        </div>

        {/* Actions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <ActionCard
            badge="High Impact"
            badgeTone="secondary"
            delta="+12%"
            title="Security Deep Dive"
            body={
              <>
                Re-engage Michael Chen with the new <span className="text-secondary font-medium">compliance framework</span>.
              </>
            }
            buttonLabel="Take Action"
            buttonIcon="calendar_today"
            buttonTone="primary"
          />
          <ActionCard
            badge="Medium Impact"
            badgeTone="muted"
            delta="+8%"
            title="Procurement Prep"
            body="Draft the final T&C exception summary for corporate legal review."
            buttonLabel="Draft Email"
            buttonIcon="description"
            buttonTone="muted"
          />
          <ActionCard
            badge="Velocity Lock"
            badgeTone="muted"
            delta="+5%"
            title="Reference Call"
            body="Connect SPG Lead with Mastercard compliance reference contact."
            buttonLabel="Book Call"
            buttonIcon="phone_in_talk"
            buttonTone="muted"
          />
        </div>
      </div>
    </>
  );
}
