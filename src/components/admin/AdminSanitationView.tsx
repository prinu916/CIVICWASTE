import React from 'react';
import { 
  Sparkles, 
  Droplets, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  ArrowRight, 
  UserPlus, 
  ShieldCheck, 
  Bug,
  Flame,
  Search
} from 'lucide-react';
import { AdminBin, AdminWorker } from '../../types/admin';

interface AdminSanitationViewProps {
  bins: AdminBin[];
  workers: AdminWorker[];
  onAssignTask: (bin: AdminBin) => void;
  onSelectBin: (bin: AdminBin) => void;
}

export const AdminSanitationView: React.FC<AdminSanitationViewProps> = ({
  bins,
  workers,
  onAssignTask,
  onSelectBin,
}) => {
  const priorityHygieneBins = bins.filter((b) => b.status === 'critical' || b.activeComplaintsCount > 0);
  const sanitationWorkers = workers.filter((w) => w.role === 'Sanitation Worker');

  return (
    <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-200/80 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-teal-500"></span>
            <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-500 font-bold">
              Public Hygiene & Disinfection
            </span>
          </div>
          <h1 className="text-2xl font-bold text-neutral-900 tracking-tight mt-0.5">
            Sanitation Operations
          </h1>
          <p className="text-xs text-neutral-500 mt-1">
            High-pressure water washing, chemical disinfection (sodium hypochlorite), bio-enzyme odour neutralizers, and pest treatment.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="px-3 py-1.5 rounded-lg bg-teal-50 border border-teal-200 text-teal-800 font-bold">
            31 / 38 Tasks Complete (82%)
          </span>
        </div>
      </div>

      {/* Sanitation Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-neutral-200/90 shadow-2xs">
          <span className="text-xs text-neutral-500 font-medium">Completed Today</span>
          <div className="text-2xl font-bold font-mono text-neutral-900 mt-1">31 / 38</div>
          <span className="text-[11px] text-teal-700 font-semibold mt-1 block">82% of hygiene schedule</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-neutral-200/90 shadow-2xs">
          <span className="text-xs text-neutral-500 font-medium">Critical Hygiene Tasks</span>
          <div className="text-2xl font-bold font-mono text-rose-600 mt-1">3</div>
          <span className="text-[11px] text-rose-600 font-semibold mt-1 block">Bio-spillage & severe odour</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-neutral-200/90 shadow-2xs">
          <span className="text-xs text-neutral-500 font-medium">Overdue Wash Cycles</span>
          <div className="text-2xl font-bold font-mono text-amber-600 mt-1">2</div>
          <span className="text-[11px] text-amber-600 font-semibold mt-1 block">&gt; 48 hours without wash</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-neutral-200/90 shadow-2xs">
          <span className="text-xs text-neutral-500 font-medium">Citizen Sanitation Complaints</span>
          <div className="text-2xl font-bold font-mono text-neutral-900 mt-1">7</div>
          <span className="text-[11px] text-teal-700 font-semibold mt-1 block">5 assigned · 2 in progress</span>
        </div>
      </div>

      {/* Priority Sanitation Tasks */}
      <div className="bg-white rounded-2xl border border-neutral-200/90 p-5 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-teal-600" />
            <h2 className="text-sm font-bold text-neutral-900 uppercase tracking-wide">
              Priority Sanitation & Disinfection Queue
            </h2>
          </div>
          <span className="text-xs text-neutral-500 font-mono">Ward 14 High-Pressure Teams</span>
        </div>

        <div className="space-y-3">
          {priorityHygieneBins.slice(0, 4).map((bin) => {
            const isCrit = bin.status === 'critical';

            return (
              <div
                key={bin.id}
                onClick={() => onSelectBin(bin)}
                className="p-4 rounded-xl bg-neutral-50/70 border border-neutral-200 hover:border-neutral-300 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-neutral-900 bg-white px-2 py-0.5 rounded border border-neutral-200">
                      {bin.id}
                    </span>
                    <span className="font-bold text-neutral-900 text-sm">{bin.name}</span>
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase ${
                      isCrit ? 'bg-rose-100 text-rose-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {isCrit ? 'Critical Hygiene' : 'High Priority'}
                    </span>
                  </div>

                  <p className="text-xs text-neutral-600">
                    {bin.locationDescription} · <span className="font-semibold text-neutral-900">{bin.activeComplaintsCount} citizen complaints</span> (Odour & Spillage)
                  </p>

                  <div className="flex items-center gap-3 text-xs text-neutral-500 font-mono pt-1">
                    <span>Last Cleaned: {bin.lastSanitationTime}</span>
                    <span>·</span>
                    <span className="text-teal-700 font-semibold">Recommended: Deep Wash + Lime Powder</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0" onClick={(e) => e.stopPropagation()}>
                  <button
                    onClick={() => onAssignTask(bin)}
                    className="px-3.5 py-2 text-xs font-bold text-teal-950 bg-teal-400 hover:bg-teal-300 rounded-lg transition-colors flex items-center gap-1.5 shadow-2xs"
                  >
                    <UserPlus className="w-3.5 h-3.5" />
                    <span>Assign Van PB-65-4109</span>
                  </button>

                  <button
                    onClick={() => onSelectBin(bin)}
                    className="p-2 text-neutral-400 hover:text-neutral-900 rounded-lg hover:bg-neutral-200/60"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
