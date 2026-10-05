import React, { useState } from 'react';
import { 
  Search, 
  Bell, 
  MapPin, 
  Calendar, 
  ArrowLeftRight, 
  CheckCircle2, 
  ChevronDown, 
  ShieldCheck, 
  AlertTriangle,
  Menu,
  LogOut
} from 'lucide-react';
import { ADMIN_PROFILE } from '../../data/mockAdminData';
import { AdminKPIs } from '../../types/admin';
import { AuthSession } from '../../types/auth';

interface AdminTopBarProps {
  kpis: AdminKPIs;
  unreadNotificationsCount: number;
  onOpenSearch: () => void;
  onOpenNotifications: () => void;
  onSwitchRole: (role: 'citizen' | 'worker' | 'sanitation' | 'admin') => void;
  onToggleMobileSidebar: () => void;
  session?: AuthSession | null;
  onSignOut?: () => void;
}

export const AdminTopBar: React.FC<AdminTopBarProps> = ({
  kpis,
  unreadNotificationsCount,
  onOpenSearch,
  onOpenNotifications,
  onSwitchRole,
  onToggleMobileSidebar,
  session,
  onSignOut,
}) => {
  const [roleMenuOpen, setRoleMenuOpen] = useState<boolean>(false);

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-neutral-200/90 h-16 flex items-center justify-between px-4 sm:px-6">
      {/* Left: Mobile Toggle & Jurisdiction Info */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleMobileSidebar}
          className="lg:hidden p-2 text-neutral-600 hover:text-neutral-900 rounded-lg hover:bg-neutral-100"
          aria-label="Open Navigation"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 text-xs">
          <div className="flex items-center gap-1.5 font-medium text-neutral-800 bg-neutral-100 px-2.5 py-1 rounded-md border border-neutral-200/60">
            <MapPin className="w-3.5 h-3.5 text-teal-600 shrink-0" />
            <span className="font-semibold text-neutral-900">{ADMIN_PROFILE.jurisdiction}</span>
          </div>

          <div className="hidden sm:flex items-center gap-1.5 text-neutral-500 bg-neutral-50 px-2.5 py-1 rounded-md border border-neutral-200/40">
            <Calendar className="w-3.5 h-3.5 text-neutral-400" />
            <span>Today · Shift {ADMIN_PROFILE.shift}</span>
          </div>

          {/* Operational Status Indicator */}
          <div className={`hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold border ${
            kpis.criticalBins > 0
              ? 'bg-rose-50 text-rose-700 border-rose-200'
              : 'bg-emerald-50 text-emerald-700 border-emerald-200'
          }`}>
            <span className={`w-2 h-2 rounded-full ${kpis.criticalBins > 0 ? 'bg-rose-500 animate-ping' : 'bg-emerald-500'}`}></span>
            <span>{kpis.criticalBins > 0 ? '● Attention required' : '● Operations normal'}</span>
          </div>
        </div>
      </div>

      {/* Right: Search, Notifications, Role Switcher, Profile */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Global Search Shortcut */}
        <button
          onClick={onOpenSearch}
          className="flex items-center gap-2 px-3 py-1.5 text-xs text-neutral-500 hover:text-neutral-900 bg-neutral-100 hover:bg-neutral-200/80 rounded-lg border border-neutral-200 transition-colors"
        >
          <Search className="w-3.5 h-3.5 text-neutral-500" />
          <span className="hidden sm:inline">Search bins, complaints, workers...</span>
          <span className="hidden md:inline-block text-[10px] bg-white text-neutral-400 px-1 py-0.5 rounded border border-neutral-200 font-mono">
            ⌘K
          </span>
        </button>

        {/* 4-ROLE SWITCHER DROPDOWN */}
        <div className="relative">
          <button
            onClick={() => setRoleMenuOpen(!roleMenuOpen)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-teal-900 bg-teal-50 hover:bg-teal-100/90 border border-teal-300 rounded-lg transition-colors shadow-2xs"
            title="Switch Civic Role"
          >
            <ArrowLeftRight className="w-3.5 h-3.5 text-teal-700" />
            <span className="hidden sm:inline text-neutral-500 font-medium">Role:</span>
            <span className="font-bold underline underline-offset-2">Admin Command</span>
            <ChevronDown className="w-3 h-3 text-teal-700" />
          </button>

          {roleMenuOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-white border border-neutral-200 rounded-xl shadow-2xl p-1.5 z-50 text-xs animate-in fade-in zoom-in-95 duration-100">
              <div className="px-3 py-1.5 text-[10px] font-mono font-bold uppercase tracking-wider text-neutral-400 border-b border-neutral-100">
                Switch Civic Role (VC Demo)
              </div>
              <button
                onClick={() => {
                  onSwitchRole('citizen');
                  setRoleMenuOpen(false);
                }}
                className="w-full text-left p-2 rounded-lg hover:bg-neutral-50 text-neutral-700 hover:text-neutral-900 flex items-center justify-between"
              >
                <div>
                  <div className="font-bold text-neutral-900">1. Citizen View</div>
                  <div className="text-[10px] text-neutral-500">Waste scanner, complaints, request bins</div>
                </div>
              </button>
              <button
                onClick={() => {
                  onSwitchRole('worker');
                  setRoleMenuOpen(false);
                }}
                className="w-full text-left p-2 rounded-lg hover:bg-neutral-50 text-neutral-700 hover:text-neutral-900 flex items-center justify-between"
              >
                <div>
                  <div className="font-bold text-neutral-900">2. Waste Collection Worker</div>
                  <div className="text-[10px] text-neutral-500">Truck PB-65-8821 compactor route</div>
                </div>
              </button>
              <button
                onClick={() => {
                  onSwitchRole('sanitation');
                  setRoleMenuOpen(false);
                }}
                className="w-full text-left p-2 rounded-lg hover:bg-neutral-50 text-neutral-700 hover:text-neutral-900 flex items-center justify-between"
              >
                <div>
                  <div className="font-bold text-neutral-900">3. Sanitation Worker</div>
                  <div className="text-[10px] text-neutral-500">Disinfection, spillage & odour cleanup</div>
                </div>
              </button>
              <button
                onClick={() => {
                  onSwitchRole('admin');
                  setRoleMenuOpen(false);
                }}
                className="w-full text-left p-2 rounded-lg bg-teal-50 border border-teal-200 text-teal-950 font-bold flex items-center justify-between"
              >
                <div>
                  <div>4. Municipality Admin</div>
                  <div className="text-[10px] text-teal-700 font-normal">Command Center · Ward 14 Control</div>
                </div>
                <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
              </button>
              {onSignOut && (
                <div className="pt-1.5 mt-1.5 border-t border-neutral-100">
                  <button
                    onClick={() => {
                      setRoleMenuOpen(false);
                      onSignOut();
                    }}
                    className="w-full text-left p-2 rounded-lg hover:bg-rose-50 text-rose-700 font-semibold flex items-center justify-between transition-colors"
                  >
                    <span>Sign Out (Auth Gateway)</span>
                    <LogOut className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Notifications Button */}
        <button
          onClick={onOpenNotifications}
          className="relative p-2 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg transition-colors"
          title="Admin Operational Notifications"
        >
          <Bell className="w-4 h-4" />
          {unreadNotificationsCount > 0 && (
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-600 rounded-full ring-2 ring-white"></span>
          )}
        </button>

        {/* Admin Avatar */}
        <div className="hidden sm:flex items-center gap-2 pl-2 border-l border-neutral-200">
          <div className="w-7 h-7 rounded-full bg-teal-700 text-white flex items-center justify-center text-xs font-bold">
            {session ? session.name.split(' ').map(n => n[0]).join('').slice(0, 2) : 'PM'}
          </div>
          <div className="text-left hidden xl:block">
            <div className="text-xs font-semibold text-neutral-900 leading-tight">{session?.name || ADMIN_PROFILE.name}</div>
            <div className="text-[10px] text-neutral-500 leading-none">{session?.identifier || 'ADM-0014'} · MC SAS Nagar</div>
          </div>
          {onSignOut && (
            <button
              onClick={onSignOut}
              title="Sign Out to Login Gateway"
              className="p-1.5 text-neutral-400 hover:text-rose-600 hover:bg-neutral-100 rounded-md transition-colors ml-1"
            >
              <LogOut className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
