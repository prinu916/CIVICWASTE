import React from 'react';
import { 
  Truck, 
  AlertTriangle, 
  Clock, 
  MapPin, 
  Navigation, 
  CheckCircle2, 
  ArrowRight, 
  ShieldAlert, 
  Gauge, 
  Activity, 
  Flame,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { RouteStop, WorkerProfile, WorkerTab } from '../../types/worker';

interface WorkerDashboardProps {
  stops: RouteStop[];
  workerProfile: WorkerProfile;
  setCurrentTab: (tab: WorkerTab) => void;
  onSelectStop: (stop: RouteStop) => void;
  onStartCollection: (stop: RouteStop) => void;
  onNavigateToStop: (stop: RouteStop) => void;
  onOpenDetails: (stop: RouteStop) => void;
}

export const WorkerDashboard: React.FC<WorkerDashboardProps> = ({
  stops,
  workerProfile,
  setCurrentTab,
  onSelectStop,
  onStartCollection,
  onNavigateToStop,
  onOpenDetails,
}) => {
  const completedStops = stops.filter((s) => s.status === 'completed');
  const pendingStops = stops.filter((s) => s.status === 'pending' || s.status === 'in_progress');
  const criticalStops = pendingStops.filter((s) => s.urgency === 'critical' || s.estimatedFill >= 85);

  const totalCount = stops.length;
  const completedCount = completedStops.length;
  const progressPercent = Math.round((completedCount / totalCount) * 100);

  // Next immediate stop is the first pending stop
  const nextStop = pendingStops[0] || null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Header with Driver & Operational Details */}
      <section className="bg-white border border-neutral-200/90 rounded-2xl p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-xs font-mono font-bold text-emerald-800 uppercase tracking-wider">
              {workerProfile.status} · Shift 07:00 AM – 03:00 PM
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900 mt-1">
            Good morning, {workerProfile.name}
          </h1>
          <div className="flex flex-wrap items-center gap-2 mt-1 text-xs text-neutral-600">
            <span className="font-semibold text-neutral-800">{workerProfile.zone}</span>
            <span className="text-neutral-300">·</span>
            <span className="font-mono text-neutral-700 bg-neutral-100 px-2 py-0.5 rounded font-medium border border-neutral-200">
              Vehicle {workerProfile.vehicle}
            </span>
            <span className="text-neutral-300">·</span>
            <span className="text-neutral-500">1100L Hydraulic Compactor</span>
          </div>
        </div>

        {/* Quick Route Status CTA */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setCurrentTab('route')}
            className="w-full sm:w-auto px-5 py-2.5 text-xs font-bold text-neutral-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg shadow-sm transition-colors flex items-center justify-center gap-2"
          >
            <Truck className="w-4 h-4 text-neutral-950" />
            <span>Open Today's Route</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </section>

      {/* Main Operational Progress Summary */}
      <section className="bg-white border border-neutral-200/90 rounded-2xl p-5 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-neutral-500">
              Today's Collection Progress
            </div>
            <div className="flex items-baseline gap-2 mt-0.5">
              <span className="font-mono text-3xl font-extrabold text-neutral-900">
                {completedCount}
              </span>
              <span className="text-base font-bold text-neutral-400">/ {totalCount} bins completed</span>
              <span className="ml-2 text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                {progressPercent}%
              </span>
            </div>
          </div>

          <div className="flex items-center gap-6 text-xs text-neutral-600 border-t sm:border-t-0 pt-2 sm:pt-0 border-neutral-100">
            <div>
              <div className="text-[10px] uppercase font-bold text-neutral-400">Estimated Remaining</div>
              <div className="font-mono font-bold text-neutral-900 text-sm mt-0.5">1h 42m</div>
            </div>
            <div>
              <div className="text-[10px] uppercase font-bold text-neutral-400">Distance Remaining</div>
              <div className="font-mono font-bold text-neutral-900 text-sm mt-0.5">14.8 km</div>
            </div>
            <div>
              <div className="text-[10px] uppercase font-bold text-neutral-400">Total Route</div>
              <div className="font-mono font-bold text-neutral-900 text-sm mt-0.5">26.4 km</div>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-neutral-100 rounded-full h-3 overflow-hidden">
          <div
            className="h-full bg-emerald-600 rounded-full transition-all duration-700 ease-out"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>
      </section>

      {/* Critical Operations Alert Section */}
      {criticalStops.length > 0 && (
        <section className="bg-rose-50/70 border border-rose-200/90 rounded-2xl p-5 shadow-xs space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-rose-100 text-rose-700 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-4 h-4 stroke-[2.5]" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-rose-950">
                  {criticalStops.length} community bins require immediate attention
                </h2>
                <p className="text-xs text-rose-800">
                  Sensors indicate critical capacity threshold or citizen overflow complaints in Ward 14.
                </p>
              </div>
            </div>

            <button
              onClick={() => setCurrentTab('priority')}
              className="px-3.5 py-1.5 text-xs font-bold text-rose-950 bg-white hover:bg-rose-100 border border-rose-300 rounded-lg transition-colors flex items-center gap-1.5 self-start sm:self-center shrink-0 shadow-2xs"
            >
              <span>View Priority Bins</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Quick Alert Rows */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 pt-1">
            {criticalStops.map((stop) => (
              <div
                key={stop.id}
                onClick={() => {
                  onSelectStop(stop);
                  setCurrentTab('route');
                }}
                className="bg-white/95 border border-rose-200/80 rounded-xl p-3 flex flex-col justify-between hover:border-rose-400 transition-all cursor-pointer group"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-neutral-900 group-hover:text-rose-700">
                      {stop.binId}
                    </span>
                    <span className="text-[10px] font-mono font-bold text-rose-700 bg-rose-50 px-1.5 py-0.2 rounded border border-rose-200">
                      {stop.estimatedFill}% FILL
                    </span>
                  </div>
                  <div className="text-xs font-semibold text-neutral-800 line-clamp-1 mt-0.5">
                    {stop.name}
                  </div>
                  <div className="text-[11px] text-rose-900 mt-1 font-medium line-clamp-1">
                    {stop.priorityCategory}
                  </div>
                </div>
                <div className="mt-2 text-[10px] text-neutral-500 font-mono">
                  {stop.distance} away · Tap to navigate
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* NEXT IMMEDIATE STOP Card (Hero Action) */}
      {nextStop && (
        <section className="bg-neutral-900 text-white rounded-2xl p-5 sm:p-6 shadow-md relative overflow-hidden">
          <div className="relative z-10 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400">
                  Next Assigned Stop · #{nextStop.order} in Sequence
                </span>
              </div>
              <span className="font-mono text-xs text-neutral-300 bg-neutral-800 px-2.5 py-1 rounded border border-neutral-700 font-bold">
                {nextStop.distance} away
              </span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-lg font-extrabold text-white">{nextStop.binId}</span>
                  <span className="text-neutral-600">·</span>
                  <span className="text-sm font-semibold text-neutral-300">{nextStop.name}</span>
                </div>
                <p className="text-xs text-neutral-400 mt-1 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                  <span>{nextStop.locationDescription}</span>
                </p>
                <div className="mt-2 text-xs text-amber-300 bg-neutral-800/90 px-2.5 py-1 rounded border border-neutral-700 inline-block font-medium">
                  {nextStop.priorityReason}
                </div>
              </div>

              {/* Status & Fill Callout */}
              <div className="bg-neutral-800/90 border border-neutral-700 rounded-xl p-3.5 text-right sm:min-w-[140px] shrink-0">
                <div className="text-[10px] uppercase font-bold text-neutral-400 tracking-wider">
                  Estimated Fill
                </div>
                <div className="font-mono text-2xl font-black text-rose-400">
                  {nextStop.estimatedFill}%
                </div>
                {nextStop.predictedCriticalTime && (
                  <div className="text-[11px] text-amber-300 mt-0.5 font-medium">
                    Critical in {nextStop.predictedCriticalTime}
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons with Large Touch Targets */}
            <div className="pt-2 border-t border-neutral-800 flex flex-wrap gap-2.5">
              <button
                onClick={() => onStartCollection(nextStop)}
                className="flex-1 min-h-[48px] px-5 py-3 text-xs font-bold text-neutral-950 bg-emerald-400 hover:bg-emerald-300 active:scale-[0.99] rounded-xl transition-all shadow-sm flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4 text-neutral-950" />
                <span className="text-sm">START COLLECTION</span>
              </button>

              <button
                onClick={() => onNavigateToStop(nextStop)}
                className="min-h-[48px] px-5 py-3 text-xs font-bold text-white bg-neutral-800 hover:bg-neutral-700 active:scale-[0.99] border border-neutral-700 rounded-xl transition-all flex items-center justify-center gap-2"
              >
                <Navigation className="w-4 h-4 text-emerald-400" />
                <span>Navigate</span>
              </button>

              <button
                onClick={() => onOpenDetails(nextStop)}
                className="min-h-[48px] px-4 py-3 text-xs font-semibold text-neutral-300 hover:text-white bg-neutral-800/60 hover:bg-neutral-800 rounded-xl border border-neutral-700 transition-all flex items-center justify-center"
              >
                View Details
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Operational Performance & Upcoming Queue Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upcoming Route Stops Preview */}
        <div className="lg:col-span-2 bg-white border border-neutral-200/90 rounded-2xl p-5 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-neutral-900">
                Upcoming Assigned Stops
              </h3>
              <p className="text-xs text-neutral-500">
                Next in sequence along recommended route
              </p>
            </div>
            <button
              onClick={() => setCurrentTab('route')}
              className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
            >
              <span>Full Route List</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="divide-y divide-neutral-100">
            {pendingStops.slice(0, 4).map((stop, idx) => (
              <div
                key={stop.id}
                onClick={() => {
                  onSelectStop(stop);
                  setCurrentTab('route');
                }}
                className="py-3 flex items-center justify-between gap-3 hover:bg-neutral-50 rounded-lg px-2 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-lg bg-neutral-100 flex items-center justify-center font-mono text-xs font-bold text-neutral-700">
                    0{idx + 1}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-neutral-900">{stop.binId}</span>
                      <span className="text-neutral-300">·</span>
                      <span className="font-semibold text-xs text-neutral-800 line-clamp-1">{stop.name}</span>
                    </div>
                    <div className="text-[11px] text-neutral-500 mt-0.5">
                      {stop.distance} away · {stop.locationDescription}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <span className={`font-mono text-xs font-bold px-2 py-0.5 rounded border ${
                    stop.estimatedFill >= 85 
                      ? 'bg-rose-50 text-rose-700 border-rose-200' 
                      : stop.estimatedFill >= 65 
                      ? 'bg-amber-50 text-amber-800 border-amber-200' 
                      : 'bg-emerald-50 text-emerald-800 border-emerald-200'
                  }`}>
                    {stop.estimatedFill}%
                  </span>
                  <ChevronRight className="w-4 h-4 text-neutral-400" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Operational Field Performance Metrics */}
        <div className="bg-white border border-neutral-200/90 rounded-2xl p-5 shadow-xs space-y-4">
          <div>
            <h3 className="text-sm font-bold text-neutral-900">
              Shift Operational Metrics
            </h3>
            <p className="text-xs text-neutral-500">
              Field telemetry for Truck PB-65-8821
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200">
              <div className="text-[10px] uppercase font-bold text-neutral-400">On-Time Rate</div>
              <div className="font-mono text-lg font-black text-emerald-700 mt-0.5">94%</div>
              <div className="text-[10px] text-neutral-500 mt-0.5">Within predicted window</div>
            </div>

            <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200">
              <div className="text-[10px] uppercase font-bold text-neutral-400">Avg Collection Time</div>
              <div className="font-mono text-lg font-black text-neutral-900 mt-0.5">8m 42s</div>
              <div className="text-[10px] text-neutral-500 mt-0.5">Hydraulic lift cycle</div>
            </div>

            <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200">
              <div className="text-[10px] uppercase font-bold text-neutral-400">Distance Covered</div>
              <div className="font-mono text-lg font-black text-neutral-900 mt-0.5">21.6 km</div>
              <div className="text-[10px] text-neutral-500 mt-0.5">GPS odometer sync</div>
            </div>

            <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200">
              <div className="text-[10px] uppercase font-bold text-neutral-400">Attention Tasks</div>
              <div className="font-mono text-lg font-black text-amber-700 mt-0.5">1</div>
              <div className="text-[10px] text-neutral-500 mt-0.5">Reported to dispatch</div>
            </div>
          </div>

          <div className="p-3 bg-neutral-100 rounded-xl text-xs text-neutral-600 flex items-center gap-2">
            <Truck className="w-4 h-4 text-neutral-500 shrink-0" />
            <span className="leading-snug">
              Depot return scheduled at 02:40 PM for compactor weighbridge offload.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
