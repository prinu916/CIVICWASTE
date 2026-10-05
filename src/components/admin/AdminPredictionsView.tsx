import React from 'react';
import { 
  BrainCircuit, 
  Sparkles, 
  Clock, 
  AlertTriangle, 
  TrendingUp, 
  CheckCircle2, 
  ShieldAlert, 
  ArrowRight,
  Info,
  Droplets,
  Layers
} from 'lucide-react';
import { AdminBin } from '../../types/admin';
import { PREDICTION_TIMELINE_SUMMARY } from '../../data/mockAdminData';

interface AdminPredictionsViewProps {
  bins: AdminBin[];
  onAssignBin: (bin: AdminBin) => void;
}

export const AdminPredictionsView: React.FC<AdminPredictionsViewProps> = ({
  bins,
  onAssignBin,
}) => {
  const highRiskPredicted = bins.filter((b) => b.predictedFillNext12h >= 90);

  return (
    <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-200/80 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse"></span>
            <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-500 font-bold">
              Machine Learning Telemetry
            </span>
          </div>
          <h1 className="text-2xl font-bold text-neutral-900 tracking-tight mt-0.5">
            Predictive Operations & Capacity Forecasts
          </h1>
          <p className="text-xs text-neutral-500 mt-1">
            Sensor telemetry and diurnal fill velocity patterns used to anticipate overflow before citizens experience spillage.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="px-3 py-1.5 rounded-lg bg-teal-50 border border-teal-200 text-teal-800 font-bold">
            12 Bins Predicted Critical in 24h
          </span>
        </div>
      </div>

      {/* Distinction Banner: CURRENT vs PREDICTED */}
      <div className="p-3.5 bg-neutral-100 rounded-xl border border-neutral-200 text-xs text-neutral-600 flex items-center gap-2.5">
        <Info className="w-4 h-4 text-teal-700 shrink-0" />
        <span>
          <strong className="text-neutral-900 uppercase font-mono mr-1">Classification Notice:</strong>
          Metrics labelled <span className="font-mono text-emerald-800 font-bold bg-white px-1.5 py-0.2 rounded border border-neutral-200">CURRENT</span> represent real-time physical sensor readings. Values labelled <span className="font-mono text-teal-800 font-bold bg-teal-100 px-1.5 py-0.2 rounded border border-teal-300">PREDICTED</span> or <span className="font-mono text-amber-800 font-bold bg-amber-100 px-1.5 py-0.2 rounded border border-amber-300">ESTIMATED</span> represent algorithmic projections subject to ±8% variance.
        </span>
      </div>

      {/* Overflow Forecast Strips */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-rose-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase font-mono text-rose-700">NEXT 6 HOURS</span>
            <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-rose-100 text-rose-800">
              URGENT INTERVENTION
            </span>
          </div>
          <div className="text-3xl font-extrabold font-mono text-rose-700">
            {PREDICTION_TIMELINE_SUMMARY.next6HoursCount} Bins
          </div>
          <p className="text-xs text-neutral-500">
            Expected to exceed 95% capacity before 05:00 PM shift handoff.
          </p>
          <div className="space-y-1.5 pt-2 border-t border-neutral-100 font-mono text-xs">
            {PREDICTION_TIMELINE_SUMMARY.next6HoursBins.map((binStr, idx) => (
              <div key={idx} className="flex justify-between text-neutral-700">
                <span>{binStr.split(' ')[0]}</span>
                <span className="text-rose-600 font-bold">{binStr.split(' ')[1]}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-amber-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase font-mono text-amber-700">NEXT 12 HOURS</span>
            <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-800">
              PRE-EMPTIVE ROUTE
            </span>
          </div>
          <div className="text-3xl font-extrabold font-mono text-amber-700">
            {PREDICTION_TIMELINE_SUMMARY.next12HoursCount} Bins
          </div>
          <p className="text-xs text-neutral-500">
            Evening residential waste peak will push these to critical threshold.
          </p>
          <div className="space-y-1.5 pt-2 border-t border-neutral-100 font-mono text-xs">
            {PREDICTION_TIMELINE_SUMMARY.next12HoursBins.slice(0, 3).map((binStr, idx) => (
              <div key={idx} className="flex justify-between text-neutral-700">
                <span>{binStr.split(' ')[0]}</span>
                <span className="text-amber-600 font-bold">{binStr.split(' ')[1]}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-neutral-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase font-mono text-neutral-500">NEXT 24 HOURS</span>
            <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-neutral-100 text-neutral-700">
              TOMORROW DISPATCH
            </span>
          </div>
          <div className="text-3xl font-extrabold font-mono text-neutral-900">
            {PREDICTION_TIMELINE_SUMMARY.next24HoursCount} Bins
          </div>
          <p className="text-xs text-neutral-500">
            Total capacity forecast to queue into tomorrow morning compactor manifest.
          </p>
          <div className="space-y-1.5 pt-2 border-t border-neutral-100 font-mono text-xs">
            {PREDICTION_TIMELINE_SUMMARY.next24HoursBins.slice(0, 3).map((binStr, idx) => (
              <div key={idx} className="flex justify-between text-neutral-700">
                <span>{binStr.split(' ')[0]}</span>
                <span className="text-neutral-600 font-bold">{binStr.split(' ')[1]}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Detailed Forecast Cards */}
      <div className="bg-white rounded-2xl border border-neutral-200/90 p-5 shadow-xs space-y-4">
        <div className="border-b border-neutral-100 pb-3">
          <h2 className="text-sm font-bold text-neutral-900 uppercase tracking-wide">
            Predictive Forecast Breakdown by Location
          </h2>
        </div>

        <div className="space-y-3">
          {highRiskPredicted.map((bin) => (
            <div
              key={bin.id}
              className="p-4 rounded-xl bg-neutral-50/70 border border-neutral-200 hover:border-neutral-300 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-neutral-900 bg-white px-2 py-0.5 rounded border border-neutral-200">
                    {bin.id}
                  </span>
                  <span className="font-bold text-neutral-900 text-sm">{bin.name}</span>
                  <span className="text-xs font-mono text-teal-800 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                    Confidence: {bin.confidence}
                  </span>
                </div>

                <div className="flex items-center gap-4 text-xs font-mono text-neutral-600 pt-1">
                  <span>CURRENT FILL: <strong className="text-neutral-900">{bin.currentFill}%</strong></span>
                  <span>·</span>
                  <span>EST. IN 6H: <strong className="text-rose-600">{bin.predictedFillNext6h}%</strong></span>
                  <span>·</span>
                  <span>EST. IN 12H: <strong className="text-rose-700">{bin.predictedFillNext12h}%</strong></span>
                </div>

                <p className="text-xs text-neutral-600 leading-relaxed font-sans mt-1">
                  <strong className="text-neutral-700">Predictive Rationale:</strong> {bin.predictionReason}
                </p>
              </div>

              <button
                onClick={() => onAssignBin(bin)}
                className="px-3.5 py-2 text-xs font-bold text-neutral-950 bg-teal-400 hover:bg-teal-300 rounded-xl transition-colors shadow-2xs shrink-0"
              >
                Add to Compactor Manifest
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
