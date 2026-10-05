import React, { useState } from 'react';
import { 
  User, 
  ShieldCheck, 
  Droplets, 
  Truck, 
  Clock, 
  MapPin, 
  PhoneCall, 
  CheckCircle2, 
  AlertTriangle,
  Award,
  Sparkles,
  Layers,
  Settings
} from 'lucide-react';
import { SanitationWorkerProfile } from '../../types/sanitation';

interface SanitationProfileViewProps {
  workerProfile: SanitationWorkerProfile;
  setWorkerProfile: React.Dispatch<React.SetStateAction<SanitationWorkerProfile>>;
}

export const SanitationProfileView: React.FC<SanitationProfileViewProps> = ({
  workerProfile,
  setWorkerProfile,
}) => {
  const [activeStatus, setActiveStatus] = useState<SanitationWorkerProfile['status']>(workerProfile.status);

  const handleStatusChange = (newStatus: SanitationWorkerProfile['status']) => {
    setActiveStatus(newStatus);
    setWorkerProfile((prev) => ({ ...prev, status: newStatus }));
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Header Profile Card */}
      <div className="bg-white rounded-2xl border border-neutral-200/80 p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-2xl bg-teal-500 text-neutral-950 font-bold text-2xl flex items-center justify-center shrink-0 shadow-sm border border-teal-400">
              NV
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl font-bold text-neutral-900">{workerProfile.name}</h1>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-teal-100 text-teal-800 font-bold border border-teal-200">
                  {workerProfile.badgeNumber}
                </span>
              </div>
              <p className="text-xs text-neutral-500 mt-0.5">
                {workerProfile.role} · {workerProfile.team}
              </p>
              <div className="flex items-center gap-3 mt-2 text-xs text-neutral-600 flex-wrap">
                <span className="flex items-center gap-1 font-mono">
                  <Truck className="w-3.5 h-3.5 text-neutral-400" />
                  Van: {workerProfile.vehicle}
                </span>
                <span>·</span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-neutral-400" />
                  {workerProfile.zone}
                </span>
                <span>·</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-neutral-400" />
                  {workerProfile.shift}
                </span>
              </div>
            </div>
          </div>

          {/* Duty Status Control */}
          <div className="flex flex-col gap-2">
            <span className="text-[11px] font-mono uppercase font-bold text-neutral-400">Duty Status</span>
            <div className="inline-flex p-1 bg-neutral-100 rounded-xl border border-neutral-200">
              {(['On Duty', 'On Break', 'Off Duty'] as const).map((status) => (
                <button
                  key={status}
                  onClick={() => handleStatusChange(status)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                    activeStatus === status
                      ? 'bg-neutral-900 text-white shadow-xs'
                      : 'text-neutral-600 hover:text-neutral-900'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Equipment & Chemical Inventory Verification */}
      <div className="bg-white rounded-2xl border border-neutral-200/80 p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
          <div className="flex items-center gap-2">
            <Droplets className="w-4 h-4 text-teal-600" />
            <h2 className="text-sm font-bold text-neutral-900 uppercase tracking-wide">
              Van Chemical & Sanitation Inventory (PB-65-4109)
            </h2>
          </div>
          <span className="text-[11px] font-mono text-teal-700 bg-teal-50 px-2 py-0.5 rounded border border-teal-200 font-semibold">
            Depot Verified 07:45 AM
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-3.5 rounded-xl bg-neutral-50 border border-neutral-200">
            <div className="text-[11px] text-neutral-500 font-medium">Sodium Hypochlorite</div>
            <div className="text-lg font-bold text-neutral-900 mt-1">65% <span className="text-xs font-normal text-neutral-500">(130L / 200L)</span></div>
            <div className="w-full bg-neutral-200 h-1.5 rounded-full mt-2 overflow-hidden">
              <div className="bg-teal-500 h-full rounded-full" style={{ width: '65%' }}></div>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-neutral-50 border border-neutral-200">
            <div className="text-[11px] text-neutral-500 font-medium">Bio-Enzyme Deodorizer</div>
            <div className="text-lg font-bold text-neutral-900 mt-1">80% <span className="text-xs font-normal text-neutral-500">(40L / 50L)</span></div>
            <div className="w-full bg-neutral-200 h-1.5 rounded-full mt-2 overflow-hidden">
              <div className="bg-emerald-500 h-full rounded-full" style={{ width: '80%' }}></div>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-neutral-50 border border-neutral-200">
            <div className="text-[11px] text-neutral-500 font-medium">Lime Powder Supply</div>
            <div className="text-lg font-bold text-neutral-900 mt-1">40 kg <span className="text-xs font-normal text-neutral-500">(2 Sacks)</span></div>
            <div className="w-full bg-neutral-200 h-1.5 rounded-full mt-2 overflow-hidden">
              <div className="bg-teal-500 h-full rounded-full" style={{ width: '80%' }}></div>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-neutral-50 border border-neutral-200">
            <div className="text-[11px] text-neutral-500 font-medium">High Pressure Jet System</div>
            <div className="text-lg font-bold text-emerald-700 mt-1">140 Bar <span className="text-xs font-normal text-neutral-500">Active</span></div>
            <div className="text-[10px] text-emerald-600 font-medium mt-1 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> Pump operating normal
            </div>
          </div>
        </div>
      </div>

      {/* Today's Operational Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-neutral-200 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-neutral-500">Bins Sanitized Today</span>
            <Sparkles className="w-4 h-4 text-teal-600" />
          </div>
          <div className="text-2xl font-bold text-neutral-900 mt-2">8 / 12</div>
          <div className="text-[11px] text-neutral-500 mt-1">67% of scheduled hygiene route complete</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-neutral-200 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-neutral-500">Odour Complaints Solved</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-bold text-neutral-900 mt-2">3 / 3</div>
          <div className="text-[11px] text-emerald-700 mt-1">100% resolved under 45 mins</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-neutral-200 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-neutral-500">Hygiene Compliance Score</span>
            <Award className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-bold text-neutral-900 mt-2">98.4%</div>
          <div className="text-[11px] text-neutral-500 mt-1">Top rated sanitation unit in Ward 14</div>
        </div>
      </div>

      {/* Control Room & Emergency Contacts */}
      <div className="bg-white rounded-2xl border border-neutral-200/80 p-6 shadow-xs space-y-3">
        <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-500">
          Emergency Dispatch & Contacts
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-3 rounded-xl bg-neutral-50 border border-neutral-200 flex items-center justify-between">
            <div>
              <div className="font-bold text-neutral-900">Ward 14 Sanitation Control</div>
              <div className="text-neutral-500 font-mono text-[11px]">+91 172 2219500</div>
            </div>
            <a
              href="tel:+911722219500"
              className="p-2 bg-neutral-200 hover:bg-neutral-300 rounded-lg text-neutral-800 transition-colors"
            >
              <PhoneCall className="w-4 h-4" />
            </a>
          </div>

          <div className="p-3 rounded-xl bg-neutral-50 border border-neutral-200 flex items-center justify-between">
            <div>
              <div className="font-bold text-neutral-900">Chemical Refill Depot (Phase 8B)</div>
              <div className="text-neutral-500 font-mono text-[11px]">+91 172 2219544</div>
            </div>
            <a
              href="tel:+911722219544"
              className="p-2 bg-neutral-200 hover:bg-neutral-300 rounded-lg text-neutral-800 transition-colors"
            >
              <PhoneCall className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
