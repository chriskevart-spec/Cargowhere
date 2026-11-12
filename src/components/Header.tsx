import React from 'react';
import { RefreshCw, Moon, Sun, ShieldCheck } from 'lucide-react';
import { LiveSyncStatus } from '../services/ltaService';

interface HeaderProps {
  activeTab: 'map' | 'list' | 'calculator' | 'erp' | 'memo';
  onSelectTab: (tab: 'map' | 'list' | 'calculator' | 'erp' | 'memo') => void;
  syncStatus: LiveSyncStatus;
  isSyncing: boolean;
  onRefresh: () => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  savedMemosCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onSelectTab,
  syncStatus,
  isSyncing,
  onRefresh,
  isDarkMode,
  onToggleDarkMode,
  savedMemosCount
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-16">
          {/* Zone 1: Single text element wordmark */}
          <button
            onClick={() => onSelectTab('map')}
            className="flex items-center gap-2.5 text-left text-lg font-bold tracking-tight text-slate-900 dark:text-white whitespace-nowrap shrink-0 hover:opacity-90 transition-opacity"
          >
            <span className="w-8 h-8 rounded-lg bg-rose-600 text-white flex items-center justify-center font-extrabold text-sm shadow-sm">
              SG
            </span>
            <span>ParkSG Live</span>
          </button>

          {/* Zone 2: 4–5 clean single-line text navigation links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600 dark:text-slate-300">
            <button
              onClick={() => onSelectTab('map')}
              className={`hover:text-rose-600 dark:hover:text-rose-400 transition-colors whitespace-nowrap shrink-0 pb-0.5 border-b-2 ${
                activeTab === 'map'
                  ? 'border-rose-600 text-rose-600 dark:border-rose-400 dark:text-rose-400 font-semibold'
                  : 'border-transparent text-slate-600 dark:text-slate-300'
              }`}
            >
              Live Map
            </button>
            <button
              onClick={() => onSelectTab('list')}
              className={`hover:text-rose-600 dark:hover:text-rose-400 transition-colors whitespace-nowrap shrink-0 pb-0.5 border-b-2 ${
                activeTab === 'list'
                  ? 'border-rose-600 text-rose-600 dark:border-rose-400 dark:text-rose-400 font-semibold'
                  : 'border-transparent text-slate-600 dark:text-slate-300'
              }`}
            >
              Carparks
            </button>
            <button
              onClick={() => onSelectTab('calculator')}
              className={`hover:text-rose-600 dark:hover:text-rose-400 transition-colors whitespace-nowrap shrink-0 pb-0.5 border-b-2 ${
                activeTab === 'calculator'
                  ? 'border-rose-600 text-rose-600 dark:border-rose-400 dark:text-rose-400 font-semibold'
                  : 'border-transparent text-slate-600 dark:text-slate-300'
              }`}
            >
              Rate Calculator
            </button>
            <button
              onClick={() => onSelectTab('erp')}
              className={`hover:text-rose-600 dark:hover:text-rose-400 transition-colors whitespace-nowrap shrink-0 pb-0.5 border-b-2 ${
                activeTab === 'erp'
                  ? 'border-rose-600 text-rose-600 dark:border-rose-400 dark:text-rose-400 font-semibold'
                  : 'border-transparent text-slate-600 dark:text-slate-300'
              }`}
            >
              ERP Radar
            </button>
            <button
              onClick={() => onSelectTab('memo')}
              className={`hover:text-rose-600 dark:hover:text-rose-400 transition-colors whitespace-nowrap shrink-0 pb-0.5 border-b-2 ${
                activeTab === 'memo'
                  ? 'border-rose-600 text-rose-600 dark:border-rose-400 dark:text-rose-400 font-semibold'
                  : 'border-transparent text-slate-600 dark:text-slate-300'
              }`}
            >
              Parked Car {savedMemosCount > 0 ? `(${savedMemosCount})` : ''}
            </button>
          </nav>

          {/* Zone 3: 1 primary action cluster */}
          <div className="flex items-center gap-2.5 shrink-0">
            <button
              onClick={onRefresh}
              disabled={isSyncing}
              title={syncStatus.statusText}
              aria-label="Refresh real-time availability"
              className="p-2 min-h-[40px] min-w-[40px] rounded-lg text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center justify-center disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${isSyncing ? 'animate-spin text-rose-600' : ''}`} />
            </button>

            <button
              onClick={onToggleDarkMode}
              title={isDarkMode ? 'Switch to daylight mode' : 'Switch to night mode'}
              aria-label="Toggle theme"
              className="p-2 min-h-[40px] min-w-[40px] rounded-lg text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center justify-center"
            >
              {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
            </button>

            <button
              onClick={() => onSelectTab('calculator')}
              className="px-3.5 py-2 text-xs font-semibold text-white bg-slate-900 dark:bg-rose-600 rounded-lg hover:bg-slate-800 dark:hover:bg-rose-500 transition-colors whitespace-nowrap shrink-0 shadow-sm flex items-center gap-1.5"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Check Rates</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
