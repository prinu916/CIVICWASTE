import React from 'react';
import { 
  Truck, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  TrendingUp, 
  ArrowRight, 
  MapPin, 
  ShieldCheck, 
  Route as RouteIcon,
  Compass
} from 'lucide-react';
import { AdminRoute, AdminWorker } from '../../types/admin';

interface AdminCollectionViewProps {
  routes: AdminRoute[];
  workers: AdminWorker[];
  onViewRoute: (route: AdminRoute) => void;
}

export const AdminCollectionView: React.FC<AdminCollectionViewProps> = ({
  routes,
  workers,
  onViewRoute,
}) => {
  const collectionRoutes = routes.filter((r) => r.type === 'Collection');
  const collectionWorkers = workers.filter((w) => w.role === 'Collection Worker');

  return (
    <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-200/80 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-500 font-bold">
              Waste Logistics Operations
            </span>
          </div>
          <h1 className="text-2xl font-bold text-neutral-900 tracking-tight mt-0.5">
            Collection Operations
          </h1>
          <p className="text-xs text-neutral-500 mt-1">
            Real-time compactor fleet monitoring, collection progress, on-time performance, and route efficiency.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="px-3 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 font-bold">
            84 / 96 Bins Cleared (88%)
          </span>
        </div>
      </div>

      {/* Top Operational Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-neutral-200/90 shadow-2xs">
          <span className="text-xs text-neutral-500 font-medium">Completed Collections</span>
          <div className="text-2xl font-bold font-mono text-neutral-900 mt-1">84 / 96</div>
          <span className="text-[11px] text-emerald-700 font-semibold mt-1 block">88% of daily target</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-neutral-200/90 shadow-2xs">
          <span className="text-xs text-neutral-500 font-medium">Critical Bins Pending</span>
          <div className="text-2xl font-bold font-mono text-rose-600 mt-1">4</div>
          <span className="text-[11px] text-rose-600 font-semibold mt-1 block">Assigned on active routes</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-neutral-200/90 shadow-2xs">
          <span className="text-xs text-neutral-500 font-medium">Average Collection Time</span>
          <div className="text-2xl font-bold font-mono text-neutral-900 mt-1">9m 18s</div>
          <span className="text-[11px] text-neutral-400 font-mono mt-1 block">Per 1100L container</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-neutral-200/90 shadow-2xs">
          <span className="text-xs text-neutral-500 font-medium">Fleet Route Efficiency</span>
          <div className="text-2xl font-bold font-mono text-teal-700 mt-1">91%</div>
          <span className="text-[11px] text-teal-700 font-semibold mt-1 block">+14% vs unoptimized baseline</span>
        </div>
      </div>

      {/* Active Collection Routes */}
      <div className="bg-white rounded-2xl border border-neutral-200/90 p-5 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
          <div className="flex items-center gap-2">
            <RouteIcon className="w-4 h-4 text-emerald-700" />
            <h2 className="text-sm font-bold text-neutral-900 uppercase tracking-wide">
              Active Compactor Routes
            </h2>
          </div>
          <span className="text-xs text-neutral-500 font-mono">3 Active Fleets</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {collectionRoutes.map((route) => {
            const progress = Math.round((route.completedBins / route.totalBins) * 100);
            const isDelayed = route.status === 'Delayed';

            return (
              <div
                key={route.id}
                className="p-4 rounded-xl bg-neutral-50/70 border border-neutral-200 hover:border-neutral-300 transition-all flex flex-col justify-between space-y-4"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-neutral-900 bg-white px-2 py-0.5 rounded border border-neutral-200">
                      {route.id}
                    </span>
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase ${
                      isDelayed
                        ? 'bg-amber-100 text-amber-800 border border-amber-300'
                        : 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                    }`}>
                      {route.status}
                    </span>
                  </div>

                  <h3 className="font-bold text-neutral-900 text-sm mt-2">{route.name}</h3>

                  <div className="space-y-1.5 mt-3 text-xs text-neutral-600">
                    <div className="flex justify-between">
                      <span className="text-neutral-400">Assigned Truck:</span>
                      <span className="font-mono font-medium text-neutral-900">{route.assignedTruck}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-400">Operator:</span>
                      <span className="font-medium text-neutral-900">{route.workerName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-400">Critical Bins:</span>
                      <span className={`font-bold font-mono ${route.criticalBins > 0 ? 'text-rose-600' : 'text-neutral-900'}`}>
                        {route.criticalBins}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-400">Est. Completion:</span>
                      <span className="font-mono font-medium text-neutral-900">{route.estimatedCompletion}</span>
                    </div>
                  </div>

                  <div className="mt-4 space-y-1">
                    <div className="flex justify-between text-[11px] font-mono">
                      <span className="text-neutral-500">Progress: {route.completedBins}/{route.totalBins} bins</span>
                      <span className="font-bold text-neutral-900">{progress}%</span>
                    </div>
                    <div className="w-full bg-neutral-200 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-emerald-500 h-full rounded-full transition-all"
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => onViewRoute(route)}
                  className="w-full py-2 px-3 text-xs font-semibold text-neutral-800 bg-white hover:bg-neutral-100 rounded-lg border border-neutral-200 transition-colors flex items-center justify-center gap-1.5 shadow-2xs"
                >
                  <Compass className="w-3.5 h-3.5 text-neutral-500" />
                  <span>Inspect Route Map</span>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
