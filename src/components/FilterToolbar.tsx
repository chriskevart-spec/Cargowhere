import React from 'react';
import { Search, Car, Bike, Zap, SlidersHorizontal, ArrowUpDown, X } from 'lucide-react';
import { FilterState, VehicleType, AgencyType, SingaporeRegion } from '../types/carpark';

interface FilterToolbarProps {
  filters: FilterState;
  onChangeFilters: (updater: (prev: FilterState) => FilterState) => void;
  totalResults: number;
}

const REGIONS: SingaporeRegion[] = [
  'All',
  'Central / CBD',
  'Orchard',
  'Marina Bay',
  'East',
  'West',
  'North',
  'North-East'
];

const AGENCIES: { label: string; value: 'ALL' | AgencyType }[] = [
  { label: 'All Operators', value: 'ALL' },
  { label: 'HDB Estate', value: 'HDB' },
  { label: 'URA Public', value: 'URA' },
  { label: 'Shopping Malls', value: 'MALL' },
  { label: 'Commercial / CBD', value: 'COMMERCIAL' }
];

export const FilterToolbar: React.FC<FilterToolbarProps> = ({
  filters,
  onChangeFilters,
  totalResults
}) => {
  const [showAdvanced, setShowAdvanced] = React.useState(false);

  const handleVehicleChange = (v: VehicleType) => {
    onChangeFilters(prev => ({ ...prev, vehicleType: v }));
  };

  const handleRegionChange = (r: SingaporeRegion) => {
    onChangeFilters(prev => ({ ...prev, region: r }));
  };

  const handleClearFilters = () => {
    onChangeFilters(prev => ({
      ...prev,
      searchQuery: '',
      region: 'All',
      agency: 'ALL',
      hasEVCharging: false,
      hasFreeParkingScheme: false,
      minClearanceHeight: 0,
      gracePeriodOnly: false,
      sortBy: 'lots_desc'
    }));
  };

  const hasActiveFilterModifiers =
    filters.searchQuery !== '' ||
    filters.region !== 'All' ||
    filters.agency !== 'ALL' ||
    filters.hasEVCharging ||
    filters.hasFreeParkingScheme ||
    filters.minClearanceHeight > 0 ||
    filters.gracePeriodOnly;

  return (
    <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 space-y-3">
        {/* Main Row: Search + Vehicle Segmented Control + Advanced Toggle */}
        <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
          {/* Search Box */}
          <div className="relative flex-1 min-w-[240px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={filters.searchQuery}
              onChange={e => onChangeFilters(prev => ({ ...prev, searchQuery: e.target.value }))}
              placeholder="Search by carpark name, road, or mall (e.g., ION, Albert Centre, Bugis, Jurong)..."
              className="w-full pl-10 pr-9 py-2 text-sm bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition-all"
            />
            {filters.searchQuery && (
              <button
                onClick={() => onChangeFilters(prev => ({ ...prev, searchQuery: '' }))}
                aria-label="Clear search"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Vehicle Type Segmented Control (Interactive Filter Buttons) */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg shrink-0">
            <button
              onClick={() => handleVehicleChange('car')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap min-h-[36px] ${
                filters.vehicleType === 'car'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Car className="w-3.5 h-3.5" />
              <span>Car</span>
            </button>
            <button
              onClick={() => handleVehicleChange('motorcycle')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap min-h-[36px] ${
                filters.vehicleType === 'motorcycle'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Bike className="w-3.5 h-3.5" />
              <span>Motorcycle</span>
            </button>
            <button
              onClick={() => handleVehicleChange('ev')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap min-h-[36px] ${
                filters.vehicleType === 'ev'
                  ? 'bg-white dark:bg-slate-700 text-emerald-600 dark:text-emerald-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Electric (EV)</span>
            </button>
          </div>

          {/* Sort By & Advanced Toggle */}
          <div className="flex items-center gap-2 shrink-0">
            <div className="relative flex items-center">
              <ArrowUpDown className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 pointer-events-none" />
              <select
                value={filters.sortBy}
                onChange={e =>
                  onChangeFilters(prev => ({
                    ...prev,
                    sortBy: e.target.value as FilterState['sortBy']
                  }))
                }
                className="pl-8 pr-7 py-2 text-xs font-medium bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-rose-500"
              >
                <option value="lots_desc">Most Available Lots</option>
                <option value="rate_asc">Lowest Day Rate</option>
                <option value="name_asc">Name (A-Z)</option>
              </select>
            </div>

            <button
              onClick={() => setShowAdvanced(!showAdvanced)}
              className={`flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg border transition-colors ${
                showAdvanced || hasActiveFilterModifiers
                  ? 'bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 border-rose-200 dark:border-rose-900'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-50'
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Filters</span>
            </button>

            {hasActiveFilterModifiers && (
              <button
                onClick={handleClearFilters}
                className="px-2.5 py-2 text-xs text-slate-500 hover:text-rose-600 dark:text-slate-400 dark:hover:text-rose-400 transition-colors"
                title="Reset all filters"
              >
                Reset
              </button>
            )}
          </div>
        </div>

        {/* Region Segment Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
          {REGIONS.map(region => (
            <button
              key={region}
              onClick={() => handleRegionChange(region)}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap shrink-0 transition-colors min-h-[34px] ${
                filters.region === region
                  ? 'bg-slate-900 text-white dark:bg-rose-600 dark:text-white font-semibold'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {region}
            </button>
          ))}
          <div className="ml-auto text-xs text-slate-400 dark:text-slate-500 whitespace-nowrap pl-2">
            <span className="font-mono tabular-nums font-semibold text-slate-700 dark:text-slate-300">
              {totalResults}
            </span>{' '}
            carparks
          </div>
        </div>

        {/* Advanced Filters Expandable Drawer */}
        {showAdvanced && (
          <div className="pt-3 border-t border-slate-200 dark:border-slate-800 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
            {/* Operator / Agency */}
            <div>
              <label className="block text-slate-500 dark:text-slate-400 mb-1 font-medium">
                Operator / Scheme
              </label>
              <select
                value={filters.agency}
                onChange={e =>
                  onChangeFilters(prev => ({
                    ...prev,
                    agency: e.target.value as FilterState['agency']
                  }))
                }
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-slate-200 focus:outline-none"
              >
                {AGENCIES.map(a => (
                  <option key={a.value} value={a.value}>
                    {a.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Minimum Clearance Height */}
            <div>
              <label className="block text-slate-500 dark:text-slate-400 mb-1 font-medium">
                Vehicle Height Clearance
              </label>
              <select
                value={filters.minClearanceHeight}
                onChange={e =>
                  onChangeFilters(prev => ({
                    ...prev,
                    minClearanceHeight: parseFloat(e.target.value)
                  }))
                }
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-slate-200 focus:outline-none"
              >
                <option value={0}>Any Height</option>
                <option value={1.9}>Min 1.9m (Compact)</option>
                <option value={2.0}>Min 2.0m (Standard SUV)</option>
                <option value={2.1}>Min 2.1m (High Roof / Van)</option>
              </select>
            </div>

            {/* Quick check options */}
            <div className="sm:col-span-2 flex flex-wrap items-center gap-2 pt-2">
              <label className="flex items-center gap-2 px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-750 transition-colors">
                <input
                  type="checkbox"
                  checked={filters.hasEVCharging}
                  onChange={e =>
                    onChangeFilters(prev => ({ ...prev, hasEVCharging: e.target.checked }))
                  }
                  className="rounded text-rose-600 focus:ring-rose-500"
                />
                <span className="text-slate-700 dark:text-slate-200">Has EV Charging Lots</span>
              </label>

              <label className="flex items-center gap-2 px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-750 transition-colors">
                <input
                  type="checkbox"
                  checked={filters.hasFreeParkingScheme}
                  onChange={e =>
                    onChangeFilters(prev => ({
                      ...prev,
                      hasFreeParkingScheme: e.target.checked
                    }))
                  }
                  className="rounded text-rose-600 focus:ring-rose-500"
                />
                <span className="text-slate-700 dark:text-slate-200">Sunday Free Parking (FPS)</span>
              </label>

              <label className="flex items-center gap-2 px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-750 transition-colors">
                <input
                  type="checkbox"
                  checked={filters.gracePeriodOnly}
                  onChange={e =>
                    onChangeFilters(prev => ({ ...prev, gracePeriodOnly: e.target.checked }))
                  }
                  className="rounded text-rose-600 focus:ring-rose-500"
                />
                <span className="text-slate-700 dark:text-slate-200">$\ge 15$ min Grace Period</span>
              </label>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
