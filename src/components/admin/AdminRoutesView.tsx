import React from 'react';
import { 
  Route as RouteIcon, 
  TrendingDown, 
  Clock, 
  MapPin, 
  CheckCircle2, 
  AlertTriangle, 
  Truck, 
  Sparkles, 
  ArrowRight,
  ShieldCheck,
  Fuel
} from 'lucide-react';
import { AdminRoute } from '../../types/admin';

interface AdminRoutesViewProps {
  routes: AdminRoute[];
}

export const AdminRoutesView: React.FC<AdminRoutesViewProps> = ({ routes }) => {
  return (
    <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-200/80 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-teal-500"></span>
            <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-500 font-bold">
              Dynamic Dispatch Optimization
            </span>
          </div>
          <h1 className="text-2xl font-bold text-neutral-900 tracking-tight mt-0.5">
            Route Operations & Efficiency Benchmarking
          </h1>
          <p className="text-xs text-neutral-500 mt-1">
            Comparing AI-ordered heuristic waypoint sequence against static legacy municipal collection circuits.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="px-3 py-1.5 rounded-lg bg-teal-50 border border-teal-200 text-teal-800 font-bold">
            13.3 km Total Daily Fuel Saving
          </span>
        </div>
      </div>

      {/* CORE BUSINESS VALUE CARD: Route Efficiency Comparison */}
      <div className="bg-gradient-to-br from-neutral-900 via-neutral-900 to-neutral-950 text-white rounded-2xl p-6 shadow-xl border border-neutral-800 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-800 pb-4">
          <div>
            <span className="text-[11px] font-mono uppercase tracking-wider text-teal-400 font-bold">
              Algorithmic Route Optimization Delta (VC Benchmark)
            </span>
            <h2 className="text-xl font-bold text-white mt-1">
              Optimized Dynamic Dispatch vs. Fixed Circular Route
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono px-2.5 py-1 rounded bg-teal-950 text-teal-300 border border-teal-500/50 font-bold">
              -33.5% Distance Reduced
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-neutral-800/80 border border-neutral-700">
            <span className="text-xs text-neutral-400 font-medium">Recommended Route</span>
            <div className="text-3xl font-extrabold font-mono text-teal-300 mt-1">26.4 km</div>
            <span className="text-[11px] text-neutral-400 mt-1 block">Dynamic bin fill sequence</span>
          </div>

          <div className="p-4 rounded-xl bg-neutral-800/80 border border-neutral-700">
            <span className="text-xs text-neutral-400 font-medium">Legacy Fixed Circuit</span>
            <div className="text-3xl font-extrabold font-mono text-neutral-400 mt-1">39.7 km</div>
            <span className="text-[11px] text-neutral-500 mt-1 block">Standard daily circular sweep</span>
          </div>

          <div className="p-4 rounded-xl bg-emerald-950/70 border border-emerald-500/40">
            <span className="text-xs text-emerald-300 font-medium">Potential Distance Saved</span>
            <div className="text-3xl font-extrabold font-mono text-emerald-400 mt-1">13.3 km</div>
            <span className="text-[11px] text-emerald-300/90 mt-1 block font-mono">~3.8 L diesel saved per truck</span>
          </div>

          <div className="p-4 rounded-xl bg-teal-950/70 border border-teal-500/40">
            <span className="text-xs text-teal-300 font-medium">Estimated Time Saved</span>
            <div className="text-3xl font-extrabold font-mono text-teal-300 mt-1">50 min</div>
            <span className="text-[11px] text-teal-300/90 mt-1 block">Faster citizen spill response</span>
          </div>
        </div>
      </div>

      {/* Route Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {routes.map((route) => (
          <div
            key={route.id}
            className="bg-white p-5 rounded-2xl border border-neutral-200/90 shadow-2xs space-y-4"
          >
            <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
              <div>
                <span className="text-xs font-mono font-bold text-neutral-500">{route.id}</span>
                <h3 className="font-bold text-neutral-900 text-sm mt-0.5">{route.name}</h3>
              </div>
              <span className={`text-[10px] font-mono px-2.5 py-1 rounded-md font-bold uppercase ${
                route.status === 'Delayed'
                  ? 'bg-amber-100 text-amber-800'
                  : 'bg-emerald-100 text-emerald-800'
              }`}>
                {route.status}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200">
                <span className="text-neutral-500 block text-[11px]">Assigned Equipment</span>
                <span className="font-bold text-neutral-900 font-mono mt-0.5 block">{route.assignedTruck}</span>
                <span className="text-[10px] text-neutral-400 font-mono">Driver: {route.workerName}</span>
              </div>

              <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200">
                <span className="text-neutral-500 block text-[11px]">Est. Completion</span>
                <span className="font-bold text-neutral-900 font-mono mt-0.5 block">{route.estimatedCompletion}</span>
                <span className="text-[10px] text-neutral-400 font-mono">Distance: {route.totalDistanceKm} km</span>
              </div>
            </div>

            <div className="space-y-1 text-xs">
              <div className="flex justify-between font-mono text-[11px]">
                <span className="text-neutral-500">Progress ({route.completedBins} / {route.totalBins} bins)</span>
                <span className="font-bold text-neutral-900">{Math.round((route.completedBins / route.totalBins) * 100)}%</span>
              </div>
              <div className="w-full bg-neutral-200 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-teal-500 h-full rounded-full"
                  style={{ width: `${(route.completedBins / route.totalBins) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
