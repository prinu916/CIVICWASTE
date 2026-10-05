import React, { useState } from 'react';
import { 
  Sparkles, 
  Map, 
  AlertTriangle, 
  History, 
  Bell, 
  User, 
  MessageSquare, 
  ArrowLeftRight,
  Gauge,
  CheckCircle2,
  ChevronDown,
  LogOut
} from 'lucide-react';
import { SanitationTab, SanitationWorkerProfile } from '../../types/sanitation';
import { AuthSession } from '../../types/auth';

interface SanitationNavbarProps {
  currentTab: SanitationTab;
  setCurrentTab: (tab: SanitationTab) => void;
  workerProfile: SanitationWorkerProfile;
  setWorkerProfile: React.Dispatch<React.SetStateAction<SanitationWorkerProfile>>;
  unreadCount: number;
  onSwitchRole: (role: 'citizen' | 'worker' | 'sanitation' | 'admin') => void;
  session?: AuthSession | null;
  onSignOut?: () => void;
}

export const SanitationNavbar: React.FC<SanitationNavbarProps> = ({
  currentTab,
  setCurrentTab,
  workerProfile,
  setWorkerProfile,
  unreadCount,
  onSwitchRole,
  session,
  onSignOut,
}) => {
  const [roleMenuOpen, setRoleMenuOpen] = useState<boolean>(false);

  const navItems = [
    { id: 'dashboard' as SanitationTab, label: 'Dashboard', icon: Gauge },
    { id: 'route' as SanitationTab, label: "Today's Route", icon: Sparkles, highlight: true },
    { id: 'priority' as SanitationTab, label: 'Priority Tasks', icon: AlertTriangle },
    { id: 'map' as SanitationTab, label: 'Sanitation Map', icon: Map },
    { id: 'complaints' as SanitationTab, label: 'Complaints', icon: MessageSquare },
    { id: 'history' as SanitationTab, label: 'Task History', icon: History },
    { id: 'notifications' as SanitationTab, label: 'Notifications', icon: Bell, badge: unreadCount },
    { id: 'profile' as SanitationTab, label: 'Profile', icon: User },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 bg-neutral-900 text-white border-b border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo & Operational Badge */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setCurrentTab('dashboard')}
              className="flex items-center gap-2.5 text-left group"
            >
              <div className="w-9 h-9 rounded-lg bg-teal-500 text-neutral-950 flex items-center justify-center font-bold text-base shadow-sm">
                <Sparkles className="w-5 h-5 text-neutral-950" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-semibold text-white tracking-tight text-base">CivicWaste</span>
                  <span className="text-[11px] font-mono text-teal-300 bg-teal-950/90 px-1.5 py-0.5 rounded text-xs border border-teal-500/40 font-bold tracking-wider">
                    SANITATION
                  </span>
                </div>
                <div className="text-[11px] text-neutral-400 font-normal leading-none hidden sm:block">
                  MC SAS Nagar · {workerProfile.team} ({workerProfile.vehicle})
                </div>
              </div>
            </button>

            {/* Duty Status Badge */}
            <div className="hidden md:flex items-center ml-4 pl-4 border-l border-neutral-800">
              <div className="flex items-center gap-2 bg-neutral-800/80 border border-neutral-700 px-2.5 py-1 rounded-md text-xs font-medium">
                <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse"></span>
                <span className="text-neutral-300 font-semibold">{workerProfile.status}</span>
                <span className="text-neutral-500">·</span>
                <span className="text-neutral-400 font-mono">{workerProfile.zone}</span>
              </div>
            </div>
          </div>

          {/* Right Header Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* TRI-ROLE SWITCHER DROPDOWN */}
            <div className="relative">
              <button
                onClick={() => setRoleMenuOpen(!roleMenuOpen)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-teal-300 bg-teal-950/90 hover:bg-teal-900 border border-teal-500/50 rounded-lg transition-colors shadow-xs"
              >
                <ArrowLeftRight className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Role:</span>
                <span className="font-bold underline underline-offset-2">Sanitation Worker</span>
                <ChevronDown className="w-3 h-3 text-teal-400" />
              </button>

              {roleMenuOpen && (
                <div className="absolute right-0 mt-2 w-60 bg-neutral-900 border border-neutral-700 rounded-xl shadow-2xl p-1.5 z-50 text-xs animate-in fade-in zoom-in-95 duration-100">
                  <div className="px-3 py-1.5 text-[10px] font-mono font-bold uppercase tracking-wider text-neutral-400 border-b border-neutral-800">
                    Switch Civic Role (VC Demo)
                  </div>
                  <button
                    onClick={() => {
                      onSwitchRole('citizen');
                      setRoleMenuOpen(false);
                    }}
                    className="w-full text-left p-2 rounded-lg hover:bg-neutral-800 text-neutral-300 hover:text-white flex items-center justify-between"
                  >
                    <div>
                      <div className="font-bold text-white">1. Citizen View</div>
                      <div className="text-[10px] text-neutral-400">Waste scanner, complaints, request bins</div>
                    </div>
                  </button>
                  <button
                    onClick={() => {
                      onSwitchRole('worker');
                      setRoleMenuOpen(false);
                    }}
                    className="w-full text-left p-2 rounded-lg hover:bg-neutral-800 text-neutral-300 hover:text-white flex items-center justify-between"
                  >
                    <div>
                      <div className="font-bold text-white">2. Waste Collection Worker</div>
                      <div className="text-[10px] text-neutral-400">Truck PB-65-8821 compactor route</div>
                    </div>
                  </button>
                  <button
                    onClick={() => {
                      onSwitchRole('sanitation');
                      setRoleMenuOpen(false);
                    }}
                    className="w-full text-left p-2 rounded-lg bg-teal-950/80 border border-teal-500/40 text-teal-300 font-bold flex items-center justify-between"
                  >
                    <div>
                      <div>3. Sanitation Worker</div>
                      <div className="text-[10px] text-teal-400 font-normal">Disinfection, spillage & odour cleanup</div>
                    </div>
                    <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                  </button>
                  <button
                    onClick={() => {
                      onSwitchRole('admin');
                      setRoleMenuOpen(false);
                    }}
                    className="w-full text-left p-2 rounded-lg hover:bg-neutral-800 text-neutral-300 hover:text-white flex items-center justify-between"
                  >
                    <div>
                      <div className="font-bold text-white">4. Municipality Admin</div>
                      <div className="text-[10px] text-neutral-400">Executive Command Center · Ward 14</div>
                    </div>
                  </button>

                  {onSignOut && (
                    <div className="pt-1.5 mt-1.5 border-t border-neutral-800">
                      <button
                        onClick={() => {
                          setRoleMenuOpen(false);
                          onSignOut();
                        }}
                        className="w-full text-left p-2 rounded-lg hover:bg-rose-950/80 text-rose-300 font-semibold flex items-center justify-between transition-colors"
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
              onClick={() => setCurrentTab('notifications')}
              className="relative p-2 text-neutral-300 hover:text-white hover:bg-neutral-800 rounded-md transition-colors"
              title="Sanitation Notifications"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-neutral-900"></span>
              )}
            </button>

            {/* Avatar */}
            <button
              onClick={() => setCurrentTab('profile')}
              className="flex items-center gap-2 pl-2 pr-2.5 py-1 rounded-md hover:bg-neutral-800 transition-colors"
            >
              <div className="w-7 h-7 rounded-full bg-teal-500 text-neutral-950 flex items-center justify-center text-xs font-bold">
                {session ? session.name.split(' ').map(n => n[0]).join('').slice(0, 2) : 'NV'}
              </div>
              <div className="text-left hidden lg:block">
                <div className="text-xs font-semibold text-white leading-tight">{session?.name || workerProfile.name}</div>
                <div className="text-[10px] text-neutral-400 leading-none font-mono">{session?.identifier || 'SW-2031'} · Unit B</div>
              </div>
            </button>

            {onSignOut && (
              <button
                onClick={onSignOut}
                title="Sign Out to Login Gateway"
                className="p-1.5 text-neutral-400 hover:text-rose-400 hover:bg-neutral-800 rounded-md transition-colors"
              >
                <LogOut className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Desktop Horizontal Navigation */}
      <nav className="hidden lg:block bg-neutral-950 border-b border-neutral-800 text-neutral-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-1 py-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentTab(item.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 text-xs font-medium rounded-md whitespace-nowrap transition-colors relative ${
                    isActive
                      ? 'bg-teal-500 text-neutral-950 font-bold shadow-xs'
                      : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-neutral-950' : item.highlight ? 'text-teal-400' : 'text-neutral-400'}`} />
                  <span>{item.label}</span>
                  {item.badge && item.badge > 0 ? (
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                      isActive ? 'bg-neutral-900 text-white' : 'bg-rose-500 text-white'
                    }`}>
                      {item.badge}
                    </span>
                  ) : null}
                </button>
              );
            })}
          </div>
        </div>
      </nav>
    </>
  );
};
