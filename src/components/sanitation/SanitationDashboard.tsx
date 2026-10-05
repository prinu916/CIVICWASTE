import React from 'react';
import { 
  Sparkles, 
  AlertTriangle, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  Navigation, 
  ArrowRight, 
  Activity, 
  Droplets,
  ShieldCheck,
  ChevronRight,
  Flame,
  Bug
} from 'lucide-react';
import { SanitationTask, SanitationWorkerProfile, SanitationTab } from '../../types/sanitation';

interface SanitationDashboardProps {
  tasks: SanitationTask[];
  workerProfile: SanitationWorkerProfile;
  setCurrentTab: (tab: SanitationTab) => void;
  onSelectTask: (task: SanitationTask) => void;
  onStartTask: (task: SanitationTask) => void;
  onOpenDetails: (task: SanitationTask) => void;
}

export const SanitationDashboard: React.FC<SanitationDashboardProps> = ({
  tasks,
  workerProfile,
  setCurrentTab,
  onSelectTask,
  onStartTask,
  onOpenDetails,
}) => {
  const completedTasks = tasks.filter((t) => t.status === 'completed');
  const pendingTasks = tasks.filter((t) => t.status === 'pending' || t.status === 'in_progress');
  const criticalTasks = pendingTasks.filter((t) => t.urgency === 'critical');
  const highRiskTasks = pendingTasks.filter((t) => t.urgency === 'high');
  const routineTasks = pendingTasks.filter((t) => t.urgency === 'normal');

  const totalCount = tasks.length;
  const completedCount = completedTasks.length;
  const progressPercent = Math.round((completedCount / totalCount) * 100);

  const nextTask = pendingTasks[0] || null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Header with Sanitation Worker Details */}
      <section className="bg-white border border-neutral-200/90 rounded-2xl p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-teal-500 animate-pulse"></span>
            <span className="text-xs font-mono font-bold text-teal-800 uppercase tracking-wider">
              {workerProfile.status} · Shift {workerProfile.shift}
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900 mt-1">
            Good morning, {workerProfile.name}
          </h1>
          <div className="flex flex-wrap items-center gap-2 mt-1 text-xs text-neutral-600">
            <span className="font-semibold text-neutral-800">{workerProfile.zone}</span>
            <span className="text-neutral-300">·</span>
            <span className="font-mono text-neutral-700 bg-neutral-100 px-2 py-0.5 rounded font-medium border border-neutral-200">
              {workerProfile.team} · Van {workerProfile.vehicle}
            </span>
            <span className="text-neutral-300">·</span>
            <span className="text-neutral-500">Pressure Wash & Bio-Disinfection</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setCurrentTab('route')}
            className="w-full sm:w-auto px-5 py-2.5 text-xs font-bold text-neutral-950 bg-teal-400 hover:bg-teal-300 rounded-lg shadow-sm transition-colors flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-neutral-950" />
            <span>Open Today's Route</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </section>

      {/* Main Summary: Today's Sanitation Progress & Hygiene Risk Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Progress Card (7 Cols) */}
        <section className="lg:col-span-7 bg-white border border-neutral-200/90 rounded-2xl p-5 shadow-xs space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-neutral-500">
                  Today's Sanitation
                </div>
                <div className="flex items-baseline gap-2 mt-0.5">
                  <span className="font-mono text-3xl font-extrabold text-neutral-900">
                    {completedCount}
                  </span>
                  <span className="text-base font-bold text-neutral-400">/ {totalCount} tasks completed</span>
                  <span className="ml-2 text-xs font-mono font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                    {progressPercent}%
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-4 text-xs text-neutral-600 border-t sm:border-t-0 pt-2 sm:pt-0 border-neutral-100">
                <div>
                  <div className="text-[10px] uppercase font-bold text-neutral-400">Remaining Tasks</div>
                  <div className="font-mono font-bold text-neutral-900 text-sm mt-0.5">{pendingTasks.length} tasks</div>
                </div>
                <div>
                  <div className="text-[10px] uppercase font-bold text-neutral-400">Estimated Time</div>
                  <div className="font-mono font-bold text-neutral-900 text-sm mt-0.5">1h 35m</div>
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-neutral-100 rounded-full h-3 overflow-hidden mt-4">
              <div
                className="h-full bg-teal-600 rounded-full transition-all duration-700 ease-out"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
          </div>

          <div className="pt-2 text-[11px] text-neutral-500 flex items-center justify-between">
            <span>Shift Target: 12 Community Bins Sanitized</span>
            <span className="font-mono font-semibold text-neutral-700">8 completed with verified photos</span>
          </div>
        </section>

        {/* Hygiene Risk Breakdown (5 Cols) */}
        <section className="lg:col-span-5 bg-neutral-900 text-white rounded-2xl p-5 shadow-xs flex flex-col justify-between space-y-3">
          <div>
            <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-teal-400">
              Hygiene Risk Breakdown
            </div>
            <div className="text-sm font-bold text-white mt-1">
              {criticalTasks.length} locations require urgent sanitation
            </div>
            <p className="text-xs text-neutral-400 mt-0.5">
              Active citizen odour complaints & heavy spillage in Ward 14.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-2.5 pt-1 text-center">
            <div className="p-2.5 bg-neutral-800 rounded-xl border border-rose-500/30">
              <div className="text-[10px] uppercase font-bold text-rose-400">Critical</div>
              <div className="font-mono text-xl font-black text-rose-400 mt-0.5">2</div>
            </div>

            <div className="p-2.5 bg-neutral-800 rounded-xl border border-amber-500/30">
              <div className="text-[10px] uppercase font-bold text-amber-400">High Risk</div>
              <div className="font-mono text-xl font-bold text-amber-400 mt-0.5">3</div>
            </div>

            <div className="p-2.5 bg-neutral-800 rounded-xl border border-neutral-700">
              <div className="text-[10px] uppercase font-bold text-neutral-400">Routine</div>
              <div className="font-mono text-xl font-bold text-neutral-300 mt-0.5">3</div>
            </div>
          </div>

          <button
            onClick={() => setCurrentTab('priority')}
            className="w-full py-2 text-xs font-bold text-neutral-950 bg-teal-400 hover:bg-teal-300 rounded-lg transition-colors flex items-center justify-center gap-1.5"
          >
            <span>View Priority Tasks</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </section>
      </div>

      {/* NEXT SANITATION TASK (Hero Operational Card) */}
      {nextTask && (
        <section className="bg-white border-2 border-rose-500/70 rounded-2xl p-5 sm:p-6 shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-600 animate-ping"></span>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-rose-700">
                Next Sanitation Task · Stop #{nextTask.order}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                CRITICAL HYGIENE RISK
              </span>
              <span className="font-mono text-xs text-neutral-600 bg-neutral-100 px-2 py-0.5 rounded">
                {nextTask.distance} away
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xl font-black text-neutral-900">{nextTask.binId}</span>
                <span className="text-neutral-400">·</span>
                <span className="text-base font-bold text-neutral-900">{nextTask.name}</span>
              </div>
              <p className="text-xs text-neutral-600 mt-1 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                <span>{nextTask.locationDescription}</span>
              </p>
              <div className="mt-2 text-xs text-rose-900 bg-rose-50/80 p-2.5 rounded-xl border border-rose-200 inline-block font-medium">
                <strong>Reported Issue:</strong> {nextTask.priorityReason}
              </div>
            </div>

            <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-3.5 text-right sm:min-w-[170px] shrink-0 space-y-1">
              <div className="text-[10px] uppercase font-bold text-neutral-400">Last Sanitation</div>
              <div className="text-xs font-semibold text-neutral-800">{nextTask.lastCleaned}</div>
              <div className="text-[11px] text-rose-700 font-bold pt-1 border-t border-neutral-200">
                {nextTask.citizenReportCount} Citizen Complaints
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 mt-4 border-t border-neutral-100 flex flex-wrap gap-3">
            <button
              onClick={() => onStartTask(nextTask)}
              className="flex-1 min-h-[48px] px-6 py-3 text-xs font-bold text-neutral-950 bg-teal-400 hover:bg-teal-300 rounded-xl shadow-sm transition-all flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-neutral-950" />
              <span className="text-sm">START TASK & OPEN CHECKLIST</span>
            </button>

            <button
              onClick={() => {
                onSelectTask(nextTask);
                setCurrentTab('route');
              }}
              className="min-h-[48px] px-5 py-3 text-xs font-bold text-neutral-800 bg-neutral-100 hover:bg-neutral-200 border border-neutral-300 rounded-xl transition-all flex items-center justify-center gap-2"
            >
              <Navigation className="w-4 h-4 text-neutral-700" />
              <span>Navigate</span>
            </button>

            <button
              onClick={() => onOpenDetails(nextTask)}
              className="min-h-[48px] px-4 py-3 text-xs font-semibold text-neutral-600 hover:text-neutral-900 bg-white hover:bg-neutral-50 rounded-xl border border-neutral-200 flex items-center justify-center"
            >
              View Details
            </button>
          </div>
        </section>
      )}

      {/* Upcoming Tasks Queue & Field Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Upcoming Tasks Queue (7 Cols) */}
        <div className="lg:col-span-7 bg-white border border-neutral-200/90 rounded-2xl p-5 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-neutral-900">
                Upcoming Assigned Locations
              </h3>
              <p className="text-xs text-neutral-500">
                Next in sequence along recommended sanitization route
              </p>
            </div>
            <button
              onClick={() => setCurrentTab('route')}
              className="text-xs font-bold text-teal-700 hover:text-teal-800 flex items-center gap-1"
            >
              <span>Full Route</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="divide-y divide-neutral-100">
            {pendingStopsPreview(tasks).map((task, idx) => (
              <div
                key={task.id}
                onClick={() => {
                  onSelectTask(task);
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
                      <span className="font-mono text-xs font-bold text-neutral-900">{task.binId}</span>
                      <span className="text-neutral-300">·</span>
                      <span className="font-semibold text-xs text-neutral-800 line-clamp-1">{task.name}</span>
                    </div>
                    <div className="text-[11px] text-neutral-500 mt-0.5 line-clamp-1">
                      {task.distance} away · {task.primaryIssue}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 shrink-0">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                    task.urgency === 'critical'
                      ? 'bg-rose-50 text-rose-700 border-rose-200'
                      : task.urgency === 'high'
                      ? 'bg-amber-50 text-amber-800 border-amber-200'
                      : 'bg-neutral-100 text-neutral-700 border-neutral-200'
                  }`}>
                    {task.urgency.toUpperCase()}
                  </span>
                  <ChevronRight className="w-4 h-4 text-neutral-400" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sanitation Field Performance (5 Cols) */}
        <div className="lg:col-span-5 bg-white border border-neutral-200/90 rounded-2xl p-5 shadow-xs space-y-4">
          <div>
            <h3 className="text-sm font-bold text-neutral-900">
              Shift Sanitation Metrics
            </h3>
            <p className="text-xs text-neutral-500">
              Field operational metrics for Sanitation Unit B
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200">
              <div className="text-[10px] uppercase font-bold text-neutral-400">On-Time Completion</div>
              <div className="font-mono text-lg font-black text-teal-700 mt-0.5">96%</div>
              <div className="text-[10px] text-neutral-500 mt-0.5">Within SLA window</div>
            </div>

            <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200">
              <div className="text-[10px] uppercase font-bold text-neutral-400">Average Task Time</div>
              <div className="font-mono text-lg font-black text-neutral-900 mt-0.5">14m</div>
              <div className="text-[10px] text-neutral-500 mt-0.5">Jet wash & bleaching</div>
            </div>

            <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200">
              <div className="text-[10px] uppercase font-bold text-neutral-400">Critical Resolved</div>
              <div className="font-mono text-lg font-black text-emerald-700 mt-0.5">5</div>
              <div className="text-[10px] text-neutral-500 mt-0.5">Odour/pest closed</div>
            </div>

            <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200">
              <div className="text-[10px] uppercase font-bold text-neutral-400">Areas Sanitized</div>
              <div className="font-mono text-lg font-black text-neutral-900 mt-0.5">8</div>
              <div className="text-[10px] text-neutral-500 mt-0.5">Concrete aprons</div>
            </div>
          </div>

          <div className="p-3 bg-neutral-100 rounded-xl text-xs text-neutral-600 flex items-center gap-2">
            <Droplets className="w-4 h-4 text-teal-600 shrink-0" />
            <span>Water jet tank PB-65-4109 at 68% capacity. Sufficient for remaining 4 tasks.</span>
          </div>
        </div>
      </div>
    </div>
  );
};

function pendingStopsPreview(tasks: SanitationTask[]) {
  return tasks.filter((t) => t.status === 'pending' || t.status === 'in_progress').slice(0, 4);
}
