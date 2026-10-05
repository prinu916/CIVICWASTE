import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  Eye, 
  CheckCircle2, 
  Calendar, 
  ArrowRight,
  Printer,
  X
} from 'lucide-react';

interface ReportItem {
  id: string;
  title: string;
  period: string;
  category: string;
  generatedDate: string;
  size: string;
  summary: string;
}

const REPORTS_LIST: ReportItem[] = [
  {
    id: 'REP-DLY-2026-10-05',
    title: 'Daily Municipal Operations Executive Brief',
    period: 'Today (05 Oct 2026)',
    category: 'Executive Operations',
    generatedDate: '11:00 AM',
    size: '1.4 MB',
    summary: '84/96 bins collected, 31 sanitation cycles executed, 2 SLA breaches escalated to Ward Director.',
  },
  {
    id: 'REP-COL-WK-40',
    title: 'Compactor Fleet Collection Efficiency Audit',
    period: 'Week 40 (Sep 29 - Oct 05)',
    category: 'Logistics',
    generatedDate: 'Yesterday',
    size: '2.8 MB',
    summary: 'Dynamic waypoint routing yielded 89.2 km fuel reduction across 3 compactor trucks.',
  },
  {
    id: 'REP-SAN-MO-SEP',
    title: 'Public Sanitation & Chemical Disinfection Audit',
    period: 'September 2026',
    category: 'Public Health',
    generatedDate: '01 Oct 2026',
    size: '4.1 MB',
    summary: 'Sodium hypochlorite application adherence 98.4%; zero fly infestation outbreaks recorded.',
  },
  {
    id: 'REP-CMP-Q3-2026',
    title: 'Quarterly Citizen Grievance & SLA Analysis',
    period: 'Q3 2026 (Jul - Sep)',
    category: 'Citizen Services',
    generatedDate: '01 Oct 2026',
    size: '3.6 MB',
    summary: 'Average citizen complaint resolution latency improved from 58 minutes to 38 minutes.',
  },
];

export const AdminReportsView: React.FC = () => {
  const [activeReportPreview, setActiveReportPreview] = useState<ReportItem | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const triggerExport = (title: string) => {
    setToastMessage(`Export prepared: ${title}. Download started.`);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  return (
    <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-neutral-900 text-white px-4 py-3 rounded-xl shadow-2xl border border-neutral-700 flex items-center gap-2 text-xs animate-in fade-in duration-150">
          <CheckCircle2 className="w-4 h-4 text-teal-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-200/80 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-teal-500"></span>
            <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-500 font-bold">
              Audits & Compliance
            </span>
          </div>
          <h1 className="text-2xl font-bold text-neutral-900 tracking-tight mt-0.5">
            Operational Reports & Municipal Logs
          </h1>
          <p className="text-xs text-neutral-500 mt-1">
            Generate and export verified daily dispatch logs, citizen redressal audits, and environmental health compliance proofs.
          </p>
        </div>
      </div>

      {/* Reports Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {REPORTS_LIST.map((report) => (
          <div
            key={report.id}
            className="bg-white p-5 rounded-2xl border border-neutral-200/90 hover:border-neutral-300 shadow-2xs space-y-3 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-teal-800 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                  {report.category}
                </span>
                <span className="text-[11px] font-mono text-neutral-400">{report.size}</span>
              </div>

              <h3 className="font-bold text-neutral-900 text-base mt-2">{report.title}</h3>
              <div className="text-xs text-neutral-500 font-mono mt-0.5">
                Period: {report.period} · Generated: {report.generatedDate}
              </div>

              <p className="text-xs text-neutral-600 mt-2 leading-relaxed bg-neutral-50 p-3 rounded-xl border border-neutral-200">
                {report.summary}
              </p>
            </div>

            <div className="flex items-center gap-2 pt-2 border-t border-neutral-100">
              <button
                onClick={() => setActiveReportPreview(report)}
                className="flex-1 py-2 px-3 text-xs font-semibold text-neutral-800 bg-neutral-100 hover:bg-neutral-200 rounded-lg transition-colors flex items-center justify-center gap-1.5"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>View Report</span>
              </button>

              <button
                onClick={() => triggerExport(report.title)}
                className="flex-1 py-2 px-3 text-xs font-bold text-neutral-950 bg-teal-400 hover:bg-teal-300 rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow-2xs"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export PDF</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Preview Modal */}
      {activeReportPreview && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 space-y-4 border border-neutral-200 shadow-2xl max-h-[85vh] overflow-y-auto">
            <div className="flex items-start justify-between border-b border-neutral-100 pb-3">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase text-teal-800 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                  {activeReportPreview.category}
                </span>
                <h2 className="text-lg font-bold text-neutral-900 mt-1">{activeReportPreview.title}</h2>
                <div className="text-xs text-neutral-500 font-mono mt-0.5">MC SAS Nagar · {activeReportPreview.id}</div>
              </div>

              <button
                onClick={() => setActiveReportPreview(null)}
                className="p-1.5 text-neutral-400 hover:text-neutral-700 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-neutral-700 leading-relaxed font-sans">
              <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200 space-y-1 font-mono">
                <div>Jurisdiction: Ward 14 (Sectors 68, 69, 70, 71)</div>
                <div>Authorizing Administrator: Priya Mehta (MC-ADM-14)</div>
                <div>Timestamp: Today, 11:30 AM · Verified Hash: sha256:7f8a91c0e</div>
              </div>

              <h4 className="font-bold text-neutral-900 text-sm">Executive Findings</h4>
              <p>
                During the 07:00 AM – 11:00 AM operational window, 84 out of 96 scheduled community dustbins were cleared across Sectors 68–71. Rapid collection routing averted 4 projected overflow events along the Sector 68 Commercial Market corridor.
              </p>

              <h4 className="font-bold text-neutral-900 text-sm">Hygiene & Public Health</h4>
              <p>
                31 high-pressure wash treatments and sodium hypochlorite disinfections completed. 2 overdue citizen odour complaints at BIN-023 Park Road were resolved following emergency bio-enzyme spray intervention.
              </p>
            </div>

            <div className="pt-3 border-t border-neutral-100 flex items-center justify-end gap-2">
              <button
                onClick={() => setActiveReportPreview(null)}
                className="px-4 py-2 text-xs font-semibold text-neutral-600 hover:bg-neutral-100 rounded-xl"
              >
                Close
              </button>
              <button
                onClick={() => {
                  triggerExport(activeReportPreview.title);
                  setActiveReportPreview(null);
                }}
                className="px-4 py-2 text-xs font-bold text-neutral-950 bg-teal-400 hover:bg-teal-300 rounded-xl shadow-xs flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Confirm Export</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
