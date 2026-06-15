import type { SkillProfile } from '@/types';

/** Master version journal — all iterations of the active skill. */
export function HistoryPanel({ profile }: { profile: SkillProfile }) {
  const { versions } = profile;
  return (
    <div className="space-y-6">
      <div className="glass-card rounded-lg overflow-hidden">
        <div className="p-card-stat-p flex items-center justify-between border-b border-white/5">
          <span className="font-badge text-badge uppercase text-on-surface-variant">
            MASTER VERSION JOURNAL — ALL ITERATIONS
          </span>
          <span className="text-xs font-mono text-secondary">Total: {versions.length} Archive Sets</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5 bg-[#0d0f10] text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">
                <th className="px-6 py-4">Version String</th>
                <th className="px-6 py-4">Release Type</th>
                <th className="px-6 py-4">Timestamp</th>
                <th className="px-6 py-4">Generation Core</th>
                <th className="px-6 py-4">Lift Variance</th>
                <th className="px-6 py-4">Direct Parent</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 font-body-md text-body-md text-on-surface">
              {versions.map((v) => {
                const production = v.status === 'production';
                return (
                  <tr key={v.version} className="hover:bg-white/[0.02] transition-colors">
                    <td className={`px-6 py-4 font-bold font-mono ${production ? 'text-secondary' : ''}`}>
                      {v.version}
                    </td>
                    <td className="px-6 py-4">
                      {production ? (
                        <span className="bg-[#1a2324] text-[#5ce0d0] px-2 py-0.5 rounded text-[10px] uppercase border border-[#5ce0d0]/20">
                          Production
                        </span>
                      ) : (
                        <span className="bg-[#222425] text-on-surface-variant px-2 py-0.5 rounded text-[10px] uppercase border border-white/5">
                          Archived
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-on-surface-variant">{v.created}</td>
                    <td className="px-6 py-4">{v.method}</td>
                    <td
                      className={`px-6 py-4 ${
                        production ? 'font-bold text-secondary' : 'font-medium text-on-surface-variant'
                      }`}
                    >
                      {v.lift}
                    </td>
                    <td className="px-6 py-4 font-mono text-on-surface-variant">{v.ancestor}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
