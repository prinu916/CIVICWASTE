import React, { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  Calendar, 
  Filter,
  Sparkles,
  PieChart
} from 'lucide-react';

export const AdminAnalyticsView: React.FC = () => {
  const [timeRange, setTimeRange] = useState<'Today' | '7 days' | '30 days' | '90 days'>('7 days');

  return (
    <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-200/80 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-teal-500"></span>
            <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-500 font-bold">
              Municipal Performance Metrics
            </span>
          </div>
          <h1 className="text-2xl font-bold text-neutral-900 tracking-tight mt-0.5">
            Operations Analytics & SLA Trends
          </h1>
          <p className="text-xs text-neutral-500 mt-1">
            Historical overflow rate reductions, response latencies, and cross-sector waste production trends.
          </p>
        </div>

        {/* Time Filter Buttons */}
        <div className="inline-flex p-1 bg-neutral-100 rounded-xl border border-neutral-200 self-start sm:self-auto">
          {(['Today', '7 days', '30 days', '90 days'] as const).map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                timeRange === range
                  ? 'bg-white text-neutral-900 shadow-2xs font-bold'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      {/* Analytics KPI Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-neutral-200/90 shadow-2xs">
          <span className="text-xs text-neutral-500 font-medium">Overflow Prevention Rate</span>
          <div className="text-2xl font-bold font-mono text-emerald-700 mt-1">94.8%</div>
          <span className="text-[11px] text-emerald-700 font-medium mt-1 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> +6.2% vs previous period
          </span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-neutral-200/90 shadow-2xs">
          <span className="text-xs text-neutral-500 font-medium">Avg Complaint Redressal</span>
          <div className="text-2xl font-bold font-mono text-neutral-900 mt-1">38 mins</div>
          <span className="text-[11px] text-teal-700 font-medium mt-1 flex items-center gap-1">
            <TrendingDown className="w-3 h-3" /> -18 mins vs legacy workflow
          </span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-neutral-200/90 shadow-2xs">
          <span className="text-xs text-neutral-500 font-medium">Daily Waste Collected</span>
          <div className="text-2xl font-bold font-mono text-neutral-900 mt-1">42.6 Tons</div>
          <span className="text-[11px] text-neutral-400 font-mono mt-1 block">Across 128 community bins</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-neutral-200/90 shadow-2xs">
          <span className="text-xs text-neutral-500 font-medium">Sanitation Compliance</span>
          <div className="text-2xl font-bold font-mono text-teal-700 mt-1">98.2%</div>
          <span className="text-[11px] text-neutral-400 font-mono mt-1 block">Bio-enzyme spray verification</span>
        </div>
      </div>

      {/* Clean Analytics Charts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Chart 1: Daily Collection Completion */}
        <div className="bg-white p-5 rounded-2xl border border-neutral-200/90 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
            <div>
              <h3 className="text-sm font-bold text-neutral-900">Collection On-Time Performance (%)</h3>
              <p className="text-xs text-neutral-500 mt-0.5">Last 7 operational days across Ward 14</p>
            </div>
            <span className="text-xs font-mono font-bold text-emerald-700">Avg 92.4%</span>
          </div>

          <div className="h-44 flex items-end justify-between gap-3 pt-4 px-2">
            {[
              { day: 'Mon', val: 94 },
              { day: 'Tue', val: 91 },
              { day: 'Wed', val: 95 },
              { day: 'Thu', val: 89 },
              { day: 'Fri', val: 93 },
              { day: 'Sat', val: 96 },
              { day: 'Sun', val: 92 },
            ].map((bar) => (
              <div key={bar.day} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                <span className="text-[10px] font-mono text-neutral-600 font-bold">{bar.val}%</span>
                <div
                  className="w-full bg-teal-500 rounded-t transition-all hover:bg-teal-600"
                  style={{ height: `${(bar.val / 100) * 110}px` }}
                ></div>
                <span className="text-[10px] font-mono text-neutral-400">{bar.day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Chart 2: Citizen Complaints by Category */}
        <div className="bg-white p-5 rounded-2xl border border-neutral-200/90 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
            <div>
              <h3 className="text-sm font-bold text-neutral-900">Complaint Distribution by Type</h3>
              <p className="text-xs text-neutral-500 mt-0.5">Primary issues reported through Citizen mobile app</p>
            </div>
            <span className="text-xs font-mono font-bold text-neutral-900">Total: 48 reports</span>
          </div>

          <div className="space-y-3 pt-1">
            {[
              { label: 'Overflowing Bins', pct: 45, count: 22, color: 'bg-rose-500' },
              { label: 'Foul Odour', pct: 28, count: 14, color: 'bg-amber-500' },
              { label: 'Spillage around Pavement', pct: 16, count: 8, color: 'bg-teal-500' },
              { label: 'Pest Infestation', pct: 11, count: 4, color: 'bg-indigo-500' },
            ].map((cat) => (
              <div key={cat.label} className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="font-medium text-neutral-700">{cat.label}</span>
                  <span className="font-mono text-neutral-500">{cat.count} ({cat.pct}%)</span>
                </div>
                <div className="w-full bg-neutral-100 h-2 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${cat.color}`} style={{ width: `${cat.pct}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
