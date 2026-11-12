/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { Header } from './components/Header';
import { QuickStatsStrip } from './components/QuickStatsStrip';
import { FilterToolbar } from './components/FilterToolbar';
import { CarparkMap } from './components/CarparkMap';
import { CarparkCard } from './components/CarparkCard';
import { CarparkDetailModal } from './components/CarparkDetailModal';
import { RateCalculatorModal } from './components/RateCalculatorModal';
import { ParkedCarModal } from './components/ParkedCarModal';
import { ERPGantryModal } from './components/ERPGantryModal';
import { SINGAPORE_CARPARKS } from './data/mockCarparks';
import { Carpark, FilterState, ParkedCarMemo, VehicleType } from './types/carpark';
import { syncRealtimeCarparks, LiveSyncStatus } from './services/ltaService';
import { MapPin, Navigation, Zap, ShieldCheck, Bookmark, ArrowRight, Layers, SlidersHorizontal, RefreshCw } from 'lucide-react';

export default function App() {
  const [carparks, setCarparks] = useState<Carpark[]>(SINGAPORE_CARPARKS);
  const [selectedCarpark, setSelectedCarpark] = useState<Carpark | null>(null);
  const [calculatorCarpark, setCalculatorCarpark] = useState<Carpark | null>(null);

  // View state: 'map' | 'list' | 'calculator' | 'erp' | 'memo'
  const [activeTab, setActiveTab] = useState<'map' | 'list' | 'calculator' | 'erp' | 'memo'>('map');
  const [layoutMode, setLayoutMode] = useState<'split' | 'map_only' | 'list_only'>('split');

  // Modals state
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const [isERPOpen, setIsERPOpen] = useState(false);
  const [isMemoOpen, setIsMemoOpen] = useState(false);

  // Dark mode
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  // Bookmarks & Saved Parked Car
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('sg_carpark_bookmarks');
      return stored ? JSON.parse(stored) : ['ion-orchard', 'albert-centre', 'imm-building'];
    } catch {
      return ['ion-orchard', 'albert-centre', 'imm-building'];
    }
  });

  const [savedMemo, setSavedMemo] = useState<ParkedCarMemo | null>(() => {
    try {
      const stored = localStorage.getItem('sg_parked_car_memo');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const [showBookmarksOnly, setShowBookmarksOnly] = useState(false);

  // Filters State
  const [filters, setFilters] = useState<FilterState>({
    searchQuery: '',
    region: 'All',
    agency: 'ALL',
    vehicleType: 'car',
    minAvailableLots: 0,
    maxRatePerHour: 50,
    hasEVCharging: false,
    hasFreeParkingScheme: false,
    minClearanceHeight: 0,
    gracePeriodOnly: false,
    sortBy: 'lots_desc'
  });

  // LTA Real-time sync status
  const [syncStatus, setSyncStatus] = useState<LiveSyncStatus>({
    isLiveApi: false,
    lastUpdated: new Date(),
    statusText: 'Connecting to Singapore carpark telemetry...',
    matchedCount: 0
  });
  const [isSyncing, setIsSyncing] = useState(false);

  // Sync dark class on document element
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Initial & Auto refresh of real-time lot counts
  const fetchLiveLots = async () => {
    setIsSyncing(true);
    try {
      const res = await syncRealtimeCarparks(carparks);
      setCarparks(res.updatedCarparks);
      setSyncStatus(res.syncStatus);
    } catch (err) {
      console.error('Error fetching live lots:', err);
    } finally {
      setIsSyncing(false);
    }
  };

  useEffect(() => {
    fetchLiveLots();
    const interval = setInterval(fetchLiveLots, 60000); // Poll every 60s
    return () => clearInterval(interval);
  }, []);

  // Save Bookmarks to localStorage
  const handleToggleBookmark = (id: string) => {
    setBookmarkedIds(prev => {
      const next = prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id];
      try {
        localStorage.setItem('sg_carpark_bookmarks', JSON.stringify(next));
      } catch (e) {
        console.error(e);
      }
      return next;
    });
  };

  // Save Memo to localStorage
  const handleSaveMemo = (memo: ParkedCarMemo) => {
    setSavedMemo(memo);
    try {
      localStorage.setItem('sg_parked_car_memo', JSON.stringify(memo));
    } catch (e) {
      console.error(e);
    }
    setIsMemoOpen(false);
  };

  const handleClearMemo = () => {
    setSavedMemo(null);
    try {
      localStorage.removeItem('sg_parked_car_memo');
    } catch (e) {
      console.error(e);
    }
  };

  // Filter and Sort Pipeline
  const filteredCarparks = useMemo(() => {
    return carparks
      .filter(cp => {
        // Bookmarks only filter
        if (showBookmarksOnly && !bookmarkedIds.includes(cp.id)) {
          return false;
        }

        // Search
        if (filters.searchQuery) {
          const q = filters.searchQuery.toLowerCase().trim();
          const matchName = cp.name.toLowerCase().includes(q);
          const matchNo = cp.carparkNo.toLowerCase().includes(q);
          const matchAddress = cp.address.toLowerCase().includes(q);
          const matchRegion = cp.region.toLowerCase().includes(q);
          if (!matchName && !matchNo && !matchAddress && !matchRegion) return false;
        }

        // Region
        if (filters.region !== 'All' && cp.region !== filters.region) {
          return false;
        }

        // Agency
        if (filters.agency !== 'ALL' && cp.agency !== filters.agency) {
          return false;
        }

        // EV Charging
        if (filters.hasEVCharging && (!cp.lots.ev || cp.lots.ev.availableLots === 0)) {
          return false;
        }

        // Free Parking Scheme (FPS)
        if (filters.hasFreeParkingScheme && !cp.freeParkingScheme) {
          return false;
        }

        // Height clearance
        if (filters.minClearanceHeight > 0 && cp.heightClearanceMeters < filters.minClearanceHeight) {
          return false;
        }

        // Grace period
        if (filters.gracePeriodOnly && cp.gracePeriodMin < 15) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (filters.sortBy === 'lots_desc') {
          const lotsA = filters.vehicleType === 'motorcycle'
            ? a.lots.motorcycle.available
            : filters.vehicleType === 'ev'
            ? (a.lots.ev?.availableLots ?? 0)
            : a.lots.car.available;
          const lotsB = filters.vehicleType === 'motorcycle'
            ? b.lots.motorcycle.available
            : filters.vehicleType === 'ev'
            ? (b.lots.ev?.availableLots ?? 0)
            : b.lots.car.available;
          return lotsB - lotsA;
        }

        if (filters.sortBy === 'rate_asc') {
          return a.rates.weekdayDay.baseRate - b.rates.weekdayDay.baseRate;
        }

        if (filters.sortBy === 'name_asc') {
          return a.name.localeCompare(b.name);
        }

        return 0;
      });
  }, [carparks, filters, showBookmarksOnly, bookmarkedIds]);

  const handleSelectCarpark = (cp: Carpark) => {
    setSelectedCarpark(cp);
    setIsDetailOpen(true);
  };

  const handleOpenCalculator = (cp: Carpark) => {
    setCalculatorCarpark(cp);
    setIsCalculatorOpen(true);
  };

  const handleParkHere = (cp: Carpark) => {
    setIsDetailOpen(false);
    setSelectedCarpark(cp);
    setIsMemoOpen(true);
  };

  const handleNavTab = (tab: 'map' | 'list' | 'calculator' | 'erp' | 'memo') => {
    setActiveTab(tab);
    if (tab === 'calculator') {
      setCalculatorCarpark(selectedCarpark || carparks[0]);
      setIsCalculatorOpen(true);
    } else if (tab === 'erp') {
      setIsERPOpen(true);
    } else if (tab === 'memo') {
      setIsMemoOpen(true);
    } else if (tab === 'map') {
      setLayoutMode('split');
    } else if (tab === 'list') {
      setLayoutMode('list_only');
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors">
      {/* Top Bar Contract Compliant Header */}
      <Header
        activeTab={activeTab}
        onSelectTab={handleNavTab}
        syncStatus={syncStatus}
        isSyncing={isSyncing}
        onRefresh={fetchLiveLots}
        isDarkMode={isDarkMode}
        onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
        savedMemosCount={savedMemo ? 1 : 0}
      />

      {/* Islandwide Real-Time Telemetry Bar */}
      <QuickStatsStrip
        carparks={carparks}
        syncStatus={syncStatus}
        selectedVehicle={filters.vehicleType}
      />

      {/* Filter and Control Toolbar */}
      <FilterToolbar
        filters={filters}
        onChangeFilters={setFilters}
        totalResults={filteredCarparks.length}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-5 space-y-5">
        {/* Editorial Sub-bar & View Switcher */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">
              Singapore Real-Time Availability & Parking Rates
            </h1>
            <span className="text-xs text-slate-400 dark:text-slate-500 font-normal hidden sm:inline">
              · {filteredCarparks.length} locations
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs">
            {/* Bookmarks toggle */}
            <button
              onClick={() => setShowBookmarksOnly(!showBookmarksOnly)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-colors min-h-[36px] ${
                showBookmarksOnly
                  ? 'bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 border-rose-200 dark:border-rose-900 font-semibold'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:text-slate-900'
              }`}
            >
              <Bookmark className={`w-3.5 h-3.5 ${showBookmarksOnly ? 'fill-rose-600' : ''}`} />
              <span>Saved ({bookmarkedIds.length})</span>
            </button>

            {/* Layout switch: Split vs Map Only vs List Only */}
            <div className="hidden lg:flex items-center gap-1 p-1 bg-slate-200/80 dark:bg-slate-800 rounded-lg">
              <button
                onClick={() => setLayoutMode('split')}
                className={`px-3 py-1 font-medium rounded-md transition-colors ${
                  layoutMode === 'split'
                    ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs font-semibold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                }`}
              >
                Split View
              </button>
              <button
                onClick={() => setLayoutMode('map_only')}
                className={`px-3 py-1 font-medium rounded-md transition-colors ${
                  layoutMode === 'map_only'
                    ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs font-semibold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                }`}
              >
                Map Only
              </button>
              <button
                onClick={() => setLayoutMode('list_only')}
                className={`px-3 py-1 font-medium rounded-md transition-colors ${
                  layoutMode === 'list_only'
                    ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs font-semibold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                }`}
              >
                Cards Grid
              </button>
            </div>
          </div>
        </div>

        {/* Display Views */}
        {layoutMode === 'map_only' && (
          <CarparkMap
            carparks={filteredCarparks}
            selectedCarpark={selectedCarpark}
            onSelectCarpark={handleSelectCarpark}
            selectedVehicle={filters.vehicleType}
            onOpenCalculator={handleOpenCalculator}
          />
        )}

        {layoutMode === 'list_only' && (
          <div className="space-y-4">
            {filteredCarparks.length === 0 ? (
              <div className="p-12 text-center bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
                <MapPin className="w-8 h-8 text-slate-400 mx-auto mb-3" />
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  No carparks match current filters
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Try clearing your search query or selecting a different region.
                </p>
                <button
                  onClick={() => {
                    setFilters(prev => ({
                      ...prev,
                      searchQuery: '',
                      region: 'All',
                      agency: 'ALL',
                      hasEVCharging: false,
                      hasFreeParkingScheme: false,
                      minClearanceHeight: 0
                    }));
                    setShowBookmarksOnly(false);
                  }}
                  className="mt-4 px-4 py-2 text-xs font-semibold bg-rose-600 text-white rounded-lg hover:bg-rose-500 transition-colors"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredCarparks.map(cp => (
                  <CarparkCard
                    key={cp.id}
                    carpark={cp}
                    selectedVehicle={filters.vehicleType}
                    isBookmarked={bookmarkedIds.includes(cp.id)}
                    onToggleBookmark={handleToggleBookmark}
                    onSelect={handleSelectCarpark}
                    onCalculate={handleOpenCalculator}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {layoutMode === 'split' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
            {/* Left 7 cols: Interactive Singapore Map */}
            <div className="lg:col-span-7 space-y-4">
              <CarparkMap
                carparks={filteredCarparks}
                selectedCarpark={selectedCarpark}
                onSelectCarpark={handleSelectCarpark}
                selectedVehicle={filters.vehicleType}
                onOpenCalculator={handleOpenCalculator}
              />

              {/* Singapore Mobility Atmosphere Strip */}
              <div className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 h-36 flex items-center justify-between p-6 shadow-sm">
                <img
                  src="/src/assets/images/singapore_mobility_expressway_1794474744502.jpg"
                  alt="Singapore Expressway Mobility"
                  className="absolute inset-0 w-full h-full object-cover brightness-[0.4] contrast-110"
                  referrerPolicy="no-referrer"
                />
                <div className="relative z-10 max-w-sm text-white">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-rose-400 block mb-0.5">
                    Singapore Driver Assist
                  </span>
                  <h4 className="text-base font-bold leading-tight">
                    Never overpay for CBD parking again
                  </h4>
                  <p className="text-xs text-slate-300 mt-1 line-clamp-1">
                    Compare shopping mall vs HDB/URA rates with real-time lots.
                  </p>
                </div>

                <div className="relative z-10 flex flex-col sm:flex-row gap-2 shrink-0">
                  <button
                    onClick={() => {
                      setCalculatorCarpark(selectedCarpark || carparks[0]);
                      setIsCalculatorOpen(true);
                    }}
                    className="px-3.5 py-2 text-xs font-semibold bg-rose-600 hover:bg-rose-500 text-white rounded-lg transition-colors shadow-sm flex items-center gap-1.5"
                  >
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Calculate Rates</span>
                  </button>

                  <button
                    onClick={() => setIsERPOpen(true)}
                    className="px-3 py-2 text-xs font-semibold bg-slate-900/90 hover:bg-slate-900 text-white border border-white/20 rounded-lg transition-colors flex items-center gap-1"
                  >
                    <span>ERP Radar</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Right 5 cols: Live Feed & Carpark Cards */}
            <div className="lg:col-span-5 space-y-3.5 max-h-[820px] overflow-y-auto pr-1">
              <div className="flex items-center justify-between px-1 text-xs text-slate-500 dark:text-slate-400">
                <span>Showing {filteredCarparks.length} matching carparks</span>
                <span>Sorted by {filters.sortBy === 'lots_desc' ? 'Lots Available' : 'Price'}</span>
              </div>

              {filteredCarparks.length === 0 ? (
                <div className="p-8 text-center bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    No carparks found matching your criteria.
                  </p>
                </div>
              ) : (
                filteredCarparks.map(cp => (
                  <CarparkCard
                    key={cp.id}
                    carpark={cp}
                    selectedVehicle={filters.vehicleType}
                    isBookmarked={bookmarkedIds.includes(cp.id)}
                    onToggleBookmark={handleToggleBookmark}
                    onSelect={handleSelectCarpark}
                    onCalculate={handleOpenCalculator}
                  />
                ))
              )}
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-12 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-6 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-900 dark:text-white">ParkSG Live</span>
            <span>·</span>
            <span>Singapore Real-Time Carpark Availability & Rates</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsERPOpen(true)}
              className="hover:text-rose-600 dark:hover:text-rose-400 transition-colors"
            >
              ERP 2.0 Gantries
            </button>
            <span>·</span>
            <button
              onClick={() => {
                setCalculatorCarpark(carparks[0]);
                setIsCalculatorOpen(true);
              }}
              className="hover:text-rose-600 dark:hover:text-rose-400 transition-colors"
            >
              Rate Calculator
            </button>
            <span>·</span>
            <button
              onClick={() => setIsMemoOpen(true)}
              className="hover:text-rose-600 dark:hover:text-rose-400 transition-colors"
            >
              Parked Car Memo
            </button>
          </div>
        </div>
      </footer>

      {/* Detailed Inspection Modal */}
      {isDetailOpen && selectedCarpark && (
        <CarparkDetailModal
          carpark={selectedCarpark}
          onClose={() => setIsDetailOpen(false)}
          selectedVehicle={filters.vehicleType}
          isBookmarked={bookmarkedIds.includes(selectedCarpark.id)}
          onToggleBookmark={handleToggleBookmark}
          onOpenCalculator={handleOpenCalculator}
          onParkHere={handleParkHere}
        />
      )}

      {/* Rate Calculator Modal */}
      {isCalculatorOpen && (
        <RateCalculatorModal
          carpark={calculatorCarpark || selectedCarpark}
          allCarparks={carparks}
          onClose={() => setIsCalculatorOpen(false)}
          onSelectCarpark={setSelectedCarpark}
          defaultVehicle={filters.vehicleType}
        />
      )}

      {/* ERP Radar Modal */}
      {isERPOpen && (
        <ERPGantryModal
          isOpen={isERPOpen}
          onClose={() => setIsERPOpen(false)}
        />
      )}

      {/* Find My Parked Car Modal */}
      {isMemoOpen && (
        <ParkedCarModal
          isOpen={isMemoOpen}
          onClose={() => setIsMemoOpen(false)}
          carparks={carparks}
          savedMemo={savedMemo}
          onSaveMemo={handleSaveMemo}
          onClearMemo={handleClearMemo}
          preselectedCarpark={selectedCarpark}
        />
      )}
    </div>
  );
}
