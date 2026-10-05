import React, { useState } from 'react';
import { 
  User, 
  Truck, 
  MapPin, 
  Clock, 
  PhoneCall, 
  ShieldCheck, 
  Wrench, 
  Check, 
  Bell, 
  FileText,
  AlertCircle
} from 'lucide-react';
import { WorkerProfile } from '../../types/worker';

interface WorkerProfileViewProps {
  workerProfile: WorkerProfile;
  setWorkerProfile: React.Dispatch<React.SetStateAction<WorkerProfile>>;
}

export const WorkerProfileView: React.FC<WorkerProfileViewProps> = ({
  workerProfile,
  setWorkerProfile,
}) => {
  const [showToast, setShowToast] = useState<boolean>(false);

  const handleStatusChange = (status: WorkerProfile['status']) => {
    setWorkerProfile((prev) => ({ ...prev, status }));
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      <div className="border-b border-neutral-200/70 pb-4">
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900">
          Field Operator Profile
        </h1>
        <p className="text-xs sm:text-sm text-neutral-500 mt-0.5">
          Municipal credentials, vehicle telemetry, and shift management
        </p>
      </div>

      {/* Operator Card */}
      <div className="bg-white border border-neutral-200/90 rounded-2xl p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-neutral-900 text-white font-bold text-lg flex items-center justify-center shadow-xs">
            RK
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-neutral-900">{workerProfile.name}</h2>
              <span className="text-[11px] font-mono font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200/60">
                OFFICIAL WORKER
              </span>
            </div>
            <div className="text-xs text-neutral-500 mt-0.5">
              {workerProfile.role} · {workerProfile.zone}
            </div>
            <div className="text-xs text-neutral-600 font-mono mt-1">
              Badge: MC-OPS-8841 · Lic: {workerProfile.driverLicense}
            </div>
          </div>
        </div>

        {/* Duty Status Selector */}
        <div className="space-y-1 self-start sm:self-center">
          <label className="text-[10px] font-bold uppercase text-neutral-400 block">Duty Status</label>
          <div className="flex items-center gap-1 bg-neutral-100 p-1 rounded-lg border border-neutral-200 text-xs">
            {(['On Duty', 'On Break', 'Off Duty'] as const).map((s) => (
              <button
                key={s}
                onClick={() => handleStatusChange(s)}
                className={`px-2.5 py-1 rounded-md font-semibold transition-colors ${
                  workerProfile.status === s
                    ? 'bg-neutral-900 text-white shadow-xs'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Assigned Vehicle Specifications */}
      <div className="bg-white border border-neutral-200/90 rounded-2xl p-5 shadow-xs space-y-4">
        <div className="flex items-center gap-2">
          <Truck className="w-4 h-4 text-emerald-700" />
          <h3 className="text-sm font-bold text-neutral-900">
            Assigned Vehicle Specifications
          </h3>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200">
            <div className="text-[10px] uppercase font-bold text-neutral-400">Registration</div>
            <div className="font-mono text-sm font-bold text-neutral-900 mt-0.5">{workerProfile.vehicle}</div>
          </div>

          <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200">
            <div className="text-[10px] uppercase font-bold text-neutral-400">Body Type</div>
            <div className="font-semibold text-neutral-800 mt-0.5">Hydraulic Compactor</div>
          </div>

          <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200">
            <div className="text-[10px] uppercase font-bold text-neutral-400">Payload Limit</div>
            <div className="font-mono text-sm font-bold text-neutral-900 mt-0.5">4,500 kg</div>
          </div>

          <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200">
            <div className="text-[10px] uppercase font-bold text-neutral-400">Pre-Trip Inspection</div>
            <div className="font-bold text-emerald-700 mt-0.5 flex items-center gap-1">
              <Check className="w-3.5 h-3.5" />
              Passed (06:45 AM)
            </div>
          </div>
        </div>

        <div className="p-3 bg-neutral-100 rounded-xl text-xs text-neutral-600 flex items-center gap-2">
          <Wrench className="w-4 h-4 text-neutral-500 shrink-0" />
          <span>Next scheduled fleet hydraulic service: October 18, 2026 at Central Depot Workshop.</span>
        </div>
      </div>

      {/* Control Room & Field Helplines */}
      <div className="bg-neutral-900 text-white rounded-2xl p-5 shadow-xs space-y-3">
        <div className="flex items-center gap-2">
          <PhoneCall className="w-4 h-4 text-emerald-400" />
          <h3 className="text-sm font-bold text-white">
            Ward 14 Dispatch & Breakdown Assistance
          </h3>
        </div>
        <p className="text-xs text-neutral-400">
          In case of hydraulic hose leakage, flat tire, or severe route obstruction:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          <div className="p-3 bg-neutral-800 rounded-xl border border-neutral-700">
            <div className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider">
              Control Room Dispatch (24x7)
            </div>
            <div className="font-mono text-sm font-bold text-white mt-0.5">0172-5044912 / Ext 4</div>
            <div className="text-[11px] text-neutral-400 mt-0.5">Senior Sanitary Inspector Rajesh Kumar</div>
          </div>

          <div className="p-3 bg-neutral-800 rounded-xl border border-neutral-700">
            <div className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider">
              Mobile Fleet Workshop Van
            </div>
            <div className="font-mono text-sm font-bold text-white mt-0.5">+91 98140 33201</div>
            <div className="text-[11px] text-neutral-400 mt-0.5">Rapid hydraulic recovery crew</div>
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-20 sm:bottom-6 right-6 z-50 bg-neutral-900 text-white px-4 py-2.5 rounded-lg shadow-xl text-xs font-semibold flex items-center gap-2 animate-in fade-in duration-150">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>Duty status updated: {workerProfile.status}</span>
        </div>
      )}
    </div>
  );
};
