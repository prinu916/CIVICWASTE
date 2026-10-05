import React, { useState } from 'react';
import { 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  ArrowRight, 
  Sparkles, 
  Truck, 
  TrendingUp, 
  Users, 
  MessageSquare, 
  PlusCircle, 
  Layers, 
  ShieldAlert,
  ChevronRight,
  UserPlus,
  Compass,
  FileText,
  Activity
} from 'lucide-react';
import { 
  AdminBin, 
  AdminWorker, 
  AdminComplaint, 
  AdminNewBinRequest, 
  AdminKPIs, 
  AdminTab 
} from '../../types/admin';
import { AREA_RISKS, PREDICTION_TIMELINE_SUMMARY } from '../../data/mockAdminData';
import { AdminLiveMap } from './AdminLiveMap';
import { AdminBinDetailPanel } from './AdminBinDetailPanel';

interface AdminOverviewProps {
  bins: AdminBin[];
  workers: AdminWorker[];
  complaints: AdminComplaint[];
  newBinRequests: AdminNewBinRequest[];
  kpis: AdminKPIs;
  setCurrentTab: (tab: AdminTab) => void;
  onOpenAssignModal: (bin: AdminBin) => void;
  onSelectBinForDetail: (bin: AdminBin | null) => void;
  selectedBin: AdminBin | null;
}

export const AdminOverview: React.FC<AdminOverviewProps> = ({
  bins,
  workers,
  complaints,
  newBinRequests,
  kpis,
  setCurrentTab,
  onOpenAssignModal,
  onSelectBinForDetail,
  selectedBin,
}) => {
  const [selectedAreaFilter, setSelectedAreaFilter] = useState<string | null>(null);

  // Critical bins queue
  const criticalBins = bins.filter((b) => b.status === 'critical');

  const filteredBins = selectedAreaFilter
    ? bins.filter((b) => b.sector === selectedAreaFilter)
    : bins;

  return (
    <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* 1. HERO TITLE & OPERATIONAL STATUS */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-200/80 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-teal-500 animate-pulse"></span>
            <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-500 font-bold">
              Municipal Operations Command Center
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight mt-0.5">
            Municipal Operations
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 mt-1">
            Ward 14 · Community Waste Management · Real-time operational situational awareness.
          </p>
        </div>

        {/* Executive Status Badge */}
        <div className="flex items-center gap-3 self-start sm:self-auto">
          <div className={`px-3.5 py-1.5 rounded-xl border text-xs font-semibold flex items-center gap-2 shadow-2xs ${
            kpis.criticalBins > 0
              ? 'bg-rose-50 border-rose-200 text-rose-800'
              : 'bg-emerald-50 border-emerald-200 text-emerald-800'
          }`}>
            <span className={`w-2 h-2 rounded-full ${kpis.criticalBins > 0 ? 'bg-rose-600 animate-ping' : 'bg-emerald-600'}`}></span>
            <div>
              <span className="font-bold">{kpis.criticalBins > 0 ? 'Attention Required' : 'Operations Normal'}</span>
              <span className="text-[11px] text-neutral-500 block font-normal">
                {kpis.criticalBins} urgent bins requiring collection/cleaning
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. TOP KPI STRIP (Fast situational awareness in 10 seconds) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {/* KPI 1: Community Bins */}
        <button
          onClick={() => setCurrentTab('bins')}
          className="p-3.5 rounded-xl bg-white border border-neutral-200/80 hover:border-neutral-300 text-left transition-all hover:shadow-xs group"
        >
          <span className="text-[11px] font-medium text-neutral-500 block">Community Bins</span>
          <div className="text-2xl font-bold font-mono text-neutral-900 mt-0.5 group-hover:text-teal-700">
            {kpis.totalBins}
          </div>
          <span className="text-[10px] text-neutral-400 font-mono mt-1 block">105 normal · 16 filling</span>
        </button>

        {/* KPI 2: Critical Bins */}
        <button
          onClick={() => setCurrentTab('bins')}
          className="p-3.5 rounded-xl bg-rose-50/50 border border-rose-200 hover:border-rose-300 text-left transition-all hover:shadow-xs group"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-rose-700">Critical Bins</span>
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping"></span>
          </div>
          <div className="text-2xl font-bold font-mono text-rose-700 mt-0.5">
            {kpis.criticalBins}
          </div>
          <span className="text-[10px] text-rose-600/90 font-mono mt-1 block">Immediate lift required</span>
        </button>

        {/* KPI 3: Pending Requests */}
        <button
          onClick={() => setCurrentTab('complaints')}
          className="p-3.5 rounded-xl bg-white border border-neutral-200/80 hover:border-neutral-300 text-left transition-all hover:shadow-xs group"
        >
          <span className="text-[11px] font-medium text-neutral-500 block">Pending Requests</span>
          <div className="text-2xl font-bold font-mono text-neutral-900 mt-0.5 group-hover:text-amber-600">
            {kpis.pendingRequests}
          </div>
          <span className="text-[10px] text-amber-600 font-mono mt-1 block">2 overdue SLAs</span>
        </button>

        {/* KPI 4: Active Workers */}
        <button
          onClick={() => setCurrentTab('workers')}
          className="p-3.5 rounded-xl bg-white border border-neutral-200/80 hover:border-neutral-300 text-left transition-all hover:shadow-xs group"
        >
          <span className="text-[11px] font-medium text-neutral-500 block">Active Workers</span>
          <div className="text-2xl font-bold font-mono text-neutral-900 mt-0.5 group-hover:text-blue-600">
            {kpis.activeWorkers} <span className="text-sm font-normal text-neutral-400">/ {kpis.totalWorkers}</span>
          </div>
          <span className="text-[10px] text-neutral-400 font-mono mt-1 block">12 Trucks · 6 Vans</span>
        </button>

        {/* KPI 5: Today's Collections */}
        <button
          onClick={() => setCurrentTab('collection')}
          className="p-3.5 rounded-xl bg-white border border-neutral-200/80 hover:border-neutral-300 text-left transition-all hover:shadow-xs group"
        >
          <span className="text-[11px] font-medium text-neutral-500 block">Today's Collections</span>
          <div className="text-2xl font-bold font-mono text-neutral-900 mt-0.5 group-hover:text-teal-700">
            {kpis.todayCollectionsDone} <span className="text-sm font-normal text-neutral-400">/ {kpis.todayCollectionsTotal}</span>
          </div>
          <span className="text-[10px] text-emerald-700 font-mono mt-1 block">88% completed on schedule</span>
        </button>

        {/* KPI 6: Sanitation Tasks */}
        <button
          onClick={() => setCurrentTab('sanitation')}
          className="p-3.5 rounded-xl bg-white border border-neutral-200/80 hover:border-neutral-300 text-left transition-all hover:shadow-xs group"
        >
          <span className="text-[11px] font-medium text-neutral-500 block">Sanitation Tasks</span>
          <div className="text-2xl font-bold font-mono text-neutral-900 mt-0.5 group-hover:text-teal-700">
            {kpis.todaySanitationDone} <span className="text-sm font-normal text-neutral-400">/ {kpis.todaySanitationTotal}</span>
          </div>
          <span className="text-[10px] text-teal-700 font-mono mt-1 block">31 washed & disinfected</span>
        </button>
      </div>

      {/* 3. DOMINANT LIVE OPERATIONS MAP + SLIDE-OVER PANEL */}
      <div className="relative">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 min-w-0">
            <AdminLiveMap
              bins={filteredBins}
              workers={workers}
              newBinRequests={newBinRequests}
              selectedBin={selectedBin}
              onSelectBin={(bin) => onSelectBinForDetail(bin)}
              onSelectNewBinRequest={() => setCurrentTab('new_bins')}
              heightClass="h-[460px] lg:h-[540px]"
            />
          </div>

          {selectedBin && (
            <div className="w-full lg:w-96 shrink-0">
              <AdminBinDetailPanel
                bin={selectedBin}
                onClose={() => onSelectBinForDetail(null)}
                onAssignTask={(bin) => onOpenAssignModal(bin)}
                onViewRoute={() => setCurrentTab('routes')}
              />
            </div>
          )}
        </div>
      </div>

      {/* 4. ACTION REQUIRED OPERATIONAL QUEUE (WHAT, WHY, WHEN, ACTION) */}
      <div className="bg-white rounded-2xl border border-neutral-200/90 p-5 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-neutral-100 pb-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-rose-600"></span>
              <h2 className="text-base font-bold text-neutral-900 uppercase tracking-tight">
                Action Required · Priority Dispatch Queue
              </h2>
            </div>
            <p className="text-xs text-neutral-500 mt-0.5">
              Urgent municipal interventions required to prevent citizen spillage, odour nuisance and route delays.
            </p>
          </div>

          <button
            onClick={() => setCurrentTab('bins')}
            className="text-xs font-semibold text-teal-700 hover:text-teal-900 flex items-center gap-1 self-start sm:self-auto"
          >
            <span>View all 7 critical locations</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {/* Action 01: BIN-023 */}
          <div className="p-4 rounded-xl bg-rose-50/40 border border-rose-200/80 hover:border-rose-300 transition-all flex flex-col justify-between space-y-3">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold text-neutral-500">PRIORITY 01</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-100 text-rose-800 font-bold border border-rose-300 uppercase">
                  Critical
                </span>
              </div>
              <div className="font-bold text-neutral-900 text-sm mt-1">BIN-023 · Park Road</div>
              <div className="text-xs text-rose-700 font-semibold mt-1">
                Predicted overflow: ~45 min
              </div>
              <p className="text-xs text-neutral-600 mt-1 leading-relaxed">
                Collection not yet completed. Morning organic waste dumping from food stalls reaching 94% fill.
              </p>
            </div>

            <button
              onClick={() => {
                const target = bins.find((b) => b.id === 'BIN-023') || bins[0];
                onOpenAssignModal(target);
              }}
              className="w-full py-2 px-3 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow-xs"
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>Assign Urgent Lift</span>
            </button>
          </div>

          {/* Action 02: BIN-041 */}
          <div className="p-4 rounded-xl bg-amber-50/40 border border-amber-200/80 hover:border-amber-300 transition-all flex flex-col justify-between space-y-3">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold text-neutral-500">PRIORITY 02</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-100 text-amber-800 font-bold border border-amber-300 uppercase">
                  High Risk
                </span>
              </div>
              <div className="font-bold text-neutral-900 text-sm mt-1">BIN-041 · Market Square South</div>
              <div className="text-xs text-amber-700 font-semibold mt-1">
                Odour complaint + 88% fill
              </div>
              <p className="text-xs text-neutral-600 mt-1 leading-relaxed">
                Sticky oil spillage behind market booths. Assigned to Truck PB-65-8821; pending sanitation wash.
              </p>
            </div>

            <button
              onClick={() => {
                const target = bins.find((b) => b.id === 'BIN-041') || bins[0];
                onSelectBinForDetail(target);
              }}
              className="w-full py-2 px-3 text-xs font-bold text-neutral-900 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow-xs"
            >
              <span>Review Details</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Action 03: BIN-052 */}
          <div className="p-4 rounded-xl bg-amber-50/40 border border-amber-200/80 hover:border-amber-300 transition-all flex flex-col justify-between space-y-3">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold text-neutral-500">PRIORITY 03</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-100 text-amber-800 font-bold border border-amber-300 uppercase">
                  High Risk
                </span>
              </div>
              <div className="font-bold text-neutral-900 text-sm mt-1">BIN-052 · Gurdwara Lane</div>
              <div className="text-xs text-amber-700 font-semibold mt-1">
                Sanitation overdue & pest cluster
              </div>
              <p className="text-xs text-neutral-600 mt-1 leading-relaxed">
                Citizen complaint regarding fly infestation around base. Disinfectant pressure wash required.
              </p>
            </div>

            <button
              onClick={() => {
                const target = bins.find((b) => b.id === 'BIN-052') || bins[0];
                onOpenAssignModal(target);
              }}
              className="w-full py-2 px-3 text-xs font-bold text-neutral-900 bg-neutral-100 hover:bg-neutral-200 rounded-lg border border-neutral-300 transition-colors flex items-center justify-center gap-1.5"
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>Assign Sanitation Unit</span>
            </button>
          </div>
        </div>
      </div>

      {/* 5. PREDICTED RISKS (CORE DIFFERENTIATOR) & AREA RISK HEATMAP */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* PREDICTED RISKS FORECAST */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-neutral-200/90 p-5 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-neutral-100 pb-3">
            <div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-teal-600" />
                <h2 className="text-sm font-bold text-neutral-900 uppercase tracking-wide">
                  Predicted Risks · Machine Forecast
                </h2>
              </div>
              <p className="text-xs text-neutral-500 mt-0.5">
                Locations expected to require attention based on historical fill cycles and citizen reporting patterns.
              </p>
            </div>

            <button
              onClick={() => setCurrentTab('predictions')}
              className="text-xs font-semibold text-teal-700 hover:text-teal-900 flex items-center gap-1 self-start sm:self-auto"
            >
              <span>Full Predictive Analysis</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Time Forecast Bars */}
          <div className="grid grid-cols-3 gap-3">
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-center">
              <span className="text-[10px] font-mono text-rose-700 font-bold block uppercase">Next 6 Hours</span>
              <div className="text-xl sm:text-2xl font-bold font-mono text-rose-700 mt-0.5">
                {PREDICTION_TIMELINE_SUMMARY.next6HoursCount} bins
              </div>
              <span className="text-[10px] text-neutral-500 mt-1 block truncate">
                BIN-023, 078, 041
              </span>
            </div>

            <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-center">
              <span className="text-[10px] font-mono text-amber-700 font-bold block uppercase">Next 12 Hours</span>
              <div className="text-xl sm:text-2xl font-bold font-mono text-amber-700 mt-0.5">
                {PREDICTION_TIMELINE_SUMMARY.next12HoursCount} bins
              </div>
              <span className="text-[10px] text-neutral-500 mt-1 block truncate">
                BIN-052, 112, 094...
              </span>
            </div>

            <div className="p-3 rounded-xl bg-neutral-50 border border-neutral-200 text-center">
              <span className="text-[10px] font-mono text-neutral-600 font-bold block uppercase">Next 24 Hours</span>
              <div className="text-xl sm:text-2xl font-bold font-mono text-neutral-900 mt-0.5">
                {PREDICTION_TIMELINE_SUMMARY.next24HoursCount} bins
              </div>
              <span className="text-[10px] text-neutral-500 mt-1 block truncate">
                12 total forecasted
              </span>
            </div>
          </div>

          {/* Detailed Highlight Prediction Card */}
          <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-neutral-900 bg-white px-2 py-0.5 rounded border border-neutral-200">
                    BIN-023
                  </span>
                  <span className="text-xs font-bold text-neutral-900">Park Road Community Bin</span>
                  <span className="text-[10px] font-mono text-teal-800 bg-teal-100 px-1.5 py-0.2 rounded border border-teal-200 font-semibold">
                    High Confidence
                  </span>
                </div>
                <div className="flex items-center gap-3 text-xs text-neutral-500 mt-1 font-mono">
                  <span>Current: 94%</span>
                  <span>·</span>
                  <span className="text-rose-600 font-semibold">Predicted Critical: ~45 min</span>
                </div>
              </div>

              <button
                onClick={() => {
                  const target = bins.find((b) => b.id === 'BIN-023') || bins[0];
                  onOpenAssignModal(target);
                }}
                className="px-3 py-1.5 text-xs font-bold text-teal-900 bg-teal-200 hover:bg-teal-300 rounded-lg transition-colors flex items-center gap-1.5 shrink-0 self-start sm:self-auto"
              >
                <span>Add to Collection Route</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="text-xs text-neutral-600 bg-white p-2.5 rounded-lg border border-neutral-200/80 leading-relaxed font-sans">
              <span className="font-semibold text-neutral-700">Predictive Rationale:</span> "Fast historical fill rate during morning market hours + 3 resident reports regarding overflowing organic bags near community center entrance."
            </div>
          </div>
        </div>

        {/* 6. AREA RISK HEATMAP (Sector 68, 69, 70, 71) */}
        <div className="bg-white rounded-2xl border border-neutral-200/90 p-5 shadow-xs space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-teal-600" />
                <h2 className="text-sm font-bold text-neutral-900 uppercase tracking-wide">
                  Waste Risk by Area
                </h2>
              </div>
              {selectedAreaFilter && (
                <button
                  onClick={() => setSelectedAreaFilter(null)}
                  className="text-[11px] text-teal-700 hover:underline"
                >
                  Clear filter
                </button>
              )}
            </div>

            <p className="text-xs text-neutral-500 mt-2">
              Composite risk calculated from fill velocity, complaint volume, and overdue intervals.
            </p>

            <div className="space-y-2.5 mt-4">
              {AREA_RISKS.map((area) => (
                <div
                  key={area.sector}
                  onClick={() => setSelectedAreaFilter(selectedAreaFilter === area.sector ? null : area.sector)}
                  className={`p-3 rounded-xl border transition-all cursor-pointer ${
                    selectedAreaFilter === area.sector
                      ? 'bg-neutral-900 text-white border-neutral-900 shadow-md'
                      : 'bg-neutral-50 hover:bg-neutral-100/80 border-neutral-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold">{area.sector}</span>
                    <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                      area.risk === 'High'
                        ? 'bg-rose-100 text-rose-800'
                        : area.risk === 'Medium'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-emerald-100 text-emerald-800'
                    }`}>
                      {area.risk} Risk
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-[11px] mt-2 opacity-80 font-mono">
                    <span>Avg Fill: {area.fillAvg}%</span>
                    <span>{area.activeCriticals} Critical</span>
                    <span>{area.complaints} Complaints</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-[11px] text-neutral-500 bg-neutral-50 p-2.5 rounded-xl border border-neutral-200">
            💡 Tip: Click any area sector to focus the live map and filter operational metrics.
          </div>
        </div>
      </div>

      {/* 7. QUICK SERVICE OVERVIEW: COLLECTION & SANITATION */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Collection Snapshot */}
        <div className="bg-white rounded-2xl border border-neutral-200/90 p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-emerald-700" />
              <h3 className="text-sm font-bold text-neutral-900">Collection Fleet · Today</h3>
            </div>
            <button
              onClick={() => setCurrentTab('collection')}
              className="text-xs font-semibold text-teal-700 hover:text-teal-900 flex items-center gap-1"
            >
              <span>Monitor Routes</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            <div className="bg-neutral-50 p-2.5 rounded-xl border border-neutral-200">
              <span className="text-[10px] text-neutral-400 block font-mono">COMPLETED</span>
              <span className="text-lg font-bold font-mono text-neutral-900">84 / 96</span>
            </div>
            <div className="bg-neutral-50 p-2.5 rounded-xl border border-neutral-200">
              <span className="text-[10px] text-neutral-400 block font-mono">AVG TIME</span>
              <span className="text-lg font-bold font-mono text-neutral-900">9m 18s</span>
            </div>
            <div className="bg-neutral-50 p-2.5 rounded-xl border border-neutral-200">
              <span className="text-[10px] text-neutral-400 block font-mono">EFFICIENCY</span>
              <span className="text-lg font-bold font-mono text-emerald-700">91%</span>
            </div>
          </div>
        </div>

        {/* Sanitation Snapshot */}
        <div className="bg-white rounded-2xl border border-neutral-200/90 p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-teal-700" />
              <h3 className="text-sm font-bold text-neutral-900">Sanitation Units · Today</h3>
            </div>
            <button
              onClick={() => setCurrentTab('sanitation')}
              className="text-xs font-semibold text-teal-700 hover:text-teal-900 flex items-center gap-1"
            >
              <span>View Hygiene Tasks</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            <div className="bg-neutral-50 p-2.5 rounded-xl border border-neutral-200">
              <span className="text-[10px] text-neutral-400 block font-mono">COMPLETED</span>
              <span className="text-lg font-bold font-mono text-neutral-900">31 / 38</span>
            </div>
            <div className="bg-neutral-50 p-2.5 rounded-xl border border-neutral-200">
              <span className="text-[10px] text-neutral-400 block font-mono">HIGH RISK</span>
              <span className="text-lg font-bold font-mono text-rose-600">3 Tasks</span>
            </div>
            <div className="bg-neutral-50 p-2.5 rounded-xl border border-neutral-200">
              <span className="text-[10px] text-neutral-400 block font-mono">COMPLAINTS</span>
              <span className="text-lg font-bold font-mono text-amber-600">7 Active</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
