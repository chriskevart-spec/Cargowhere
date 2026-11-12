import React from 'react';
import { Car, Zap, Clock, ShieldAlert } from 'lucide-react';
import { Carpark, VehicleType } from '../types/carpark';
import { LiveSyncStatus } from '../services/ltaService';

interface QuickStatsStripProps {
  carparks: Carpark[];
  syncStatus: LiveSyncStatus;
  selectedVehicle: VehicleType;
}

export const QuickStatsStrip: React.FC<QuickStatsStripProps> = ({
  carparks,
  syncStatus,
  selectedVehicle
}) => {
  const totalAvailableLots = carparks.reduce((acc, cp) => {
    if (selectedVehicle === 'motorcycle') return acc + cp.lots.motorcycle.available;
    if (selectedVehicle === 'ev') return acc + (cp.lots.ev?.availableLots || 0);
    return acc + cp.lots.car.available;
  }, 0);

  const totalCapacity = carparks.reduce((acc, cp) => {
    if (selectedVehicle === 'motorcycle') return acc + cp.lots.motorcycle.total;
    if (selectedVehicle === 'ev') return acc + (cp.lots.ev?.totalLots || 0);
    return acc + cp.lots.car.total;
  }, 0);

  const totalEVLots = carparks.reduce((acc, cp) => acc + (cp.lots.ev?.availableLots || 0), 0);
  const fpsCount = carparks.filter(cp => cp.freeParkingScheme).length;

  const occupancyPercent = totalCapacity > 0 ? Math.round(((totalCapacity - totalAvailableLots) / totalCapacity) * 100) : 0;

  return (
    <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 py-3 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-y-2 text-xs text-slate-500 dark:text-slate-400">
          {/* Key figures using tabular numbers */}
          <div className="flex flex-wrap items-center gap-x-5 gap-y-1">
            <div className="flex items-center gap-1.5 text-slate-800 dark:text-slate-200 font-medium">
              <Car className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" />
              <span>Available Lots:</span>
              <span className="font-mono tabular-nums font-bold text-slate-950 dark:text-white">
                {totalAvailableLots.toLocaleString()}
              </span>
              <span className="text-slate-400 font-normal">/ {totalCapacity.toLocaleString()}</span>
            </div>

            <span className="hidden sm:inline text-slate-300 dark:text-slate-700">·</span>

            <div className="flex items-center gap-1.5">
              <span>Overall Island Occupancy:</span>
              <span className="font-mono tabular-nums font-semibold text-slate-900 dark:text-slate-200">
                {occupancyPercent}%
              </span>
            </div>

            <span className="hidden sm:inline text-slate-300 dark:text-slate-700">·</span>

            <div className="flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>Active EV Fast Chargers:</span>
              <span className="font-mono tabular-nums font-semibold text-emerald-600 dark:text-emerald-400">
                {totalEVLots} lots
              </span>
            </div>

            <span className="hidden sm:inline text-slate-300 dark:text-slate-700">·</span>

            <div className="flex items-center gap-1.5">
              <ShieldAlert className="w-3.5 h-3.5 text-amber-500" />
              <span>Sunday FPS Venues:</span>
              <span className="font-mono tabular-nums font-semibold text-slate-700 dark:text-slate-300">
                {fpsCount}
              </span>
            </div>
          </div>

          {/* Sync indicator */}
          <div className="flex items-center gap-1.5 text-slate-400 dark:text-slate-500">
            <Clock className="w-3 h-3 text-slate-400" />
            <span>Updated: {syncStatus.lastUpdated.toLocaleTimeString('en-SG', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</span>
            <span className="text-slate-300 dark:text-slate-700">·</span>
            <span className="truncate max-w-[200px] sm:max-w-xs">{syncStatus.isLiveApi ? 'LTA Gov API' : 'Real-time Feed'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
