import React from 'react';
import { Car, Zap, Bookmark, BookmarkCheck, ArrowRight, ShieldCheck, Clock, MapPin } from 'lucide-react';
import { Carpark, VehicleType } from '../types/carpark';

interface CarparkCardProps {
  carpark: Carpark;
  selectedVehicle: VehicleType;
  isBookmarked: boolean;
  onToggleBookmark: (carparkId: string) => void;
  onSelect: (carpark: Carpark) => void;
  onCalculate: (carpark: Carpark) => void;
}

export const CarparkCard: React.FC<CarparkCardProps> = ({
  carpark,
  selectedVehicle,
  isBookmarked,
  onToggleBookmark,
  onSelect,
  onCalculate
}) => {
  const getLotsAvailable = () => {
    if (selectedVehicle === 'motorcycle') return carpark.lots.motorcycle.available;
    if (selectedVehicle === 'ev') return carpark.lots.ev?.availableLots ?? 0;
    return carpark.lots.car.available;
  };

  const getTotalLots = () => {
    if (selectedVehicle === 'motorcycle') return carpark.lots.motorcycle.total;
    if (selectedVehicle === 'ev') return carpark.lots.ev?.totalLots ?? 0;
    return carpark.lots.car.total;
  };

  const avail = getLotsAvailable();
  const total = getTotalLots();
  const ratio = total > 0 ? avail / total : 0;
  const occupancyPct = total > 0 ? Math.round(((total - avail) / total) * 100) : 0;

  // Semantic color and status
  const getStatusStyles = () => {
    if (ratio >= 0.3) {
      return {
        text: 'text-emerald-700 dark:text-emerald-400',
        bar: 'bg-emerald-500',
        badge: 'Available',
        textColor: 'text-emerald-600 dark:text-emerald-400'
      };
    }
    if (ratio >= 0.1) {
      return {
        text: 'text-amber-700 dark:text-amber-400',
        bar: 'bg-amber-500',
        badge: 'Filling Up',
        textColor: 'text-amber-600 dark:text-amber-400'
      };
    }
    return {
      text: 'text-rose-700 dark:text-rose-400',
      bar: 'bg-rose-500',
      badge: 'Almost Full',
      textColor: 'text-rose-600 dark:text-rose-400'
    };
  };

  const status = getStatusStyles();

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 sm:p-5 hover:border-slate-300 dark:hover:border-slate-700 transition-all shadow-xs hover:shadow-md flex flex-col justify-between group">
      <div>
        {/* Top unboxed metadata line */}
        <div className="flex items-center justify-between gap-2 text-xs text-slate-500 dark:text-slate-400 mb-2">
          <div className="flex items-center gap-1.5 truncate">
            <span className="font-semibold text-slate-700 dark:text-slate-300">{carpark.agency}</span>
            <span>·</span>
            <span>{carpark.structure}</span>
            <span>·</span>
            <span>{carpark.region}</span>
          </div>

          <button
            onClick={() => onToggleBookmark(carpark.id)}
            title={isBookmarked ? 'Remove bookmark' : 'Bookmark this carpark'}
            aria-label="Bookmark"
            className="p-1 min-h-[36px] min-w-[36px] flex items-center justify-center text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 transition-colors"
          >
            {isBookmarked ? (
              <BookmarkCheck className="w-4 h-4 text-rose-600 dark:text-rose-400 fill-rose-600 dark:fill-rose-400" />
            ) : (
              <Bookmark className="w-4 h-4" />
            )}
          </button>
        </div>

        {/* Title and Code */}
        <div className="flex items-start justify-between gap-3">
          <h3
            onClick={() => onSelect(carpark)}
            className="text-base font-bold text-slate-900 dark:text-white cursor-pointer hover:text-rose-600 dark:hover:text-rose-400 transition-colors leading-snug"
          >
            {carpark.name}
          </h3>
          <span className="shrink-0 font-mono text-xs font-semibold text-slate-500 dark:text-slate-400 px-2 py-0.5 bg-slate-100 dark:bg-slate-800 rounded">
            {carpark.carparkNo}
          </span>
        </div>

        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-1 flex items-center gap-1">
          <MapPin className="w-3 h-3 shrink-0 text-slate-400" />
          <span>{carpark.address}</span>
        </p>

        {/* Real-time Occupancy Bar & Figure */}
        <div className="mt-4 p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
          <div className="flex items-baseline justify-between mb-1.5">
            <div className="flex items-center gap-1.5">
              <span className={`text-xs font-semibold ${status.textColor}`}>{status.badge}</span>
              <span className="text-[11px] text-slate-400">({occupancyPct}% occupied)</span>
            </div>
            <div className="text-right">
              <span className="font-mono tabular-nums text-lg font-bold text-slate-900 dark:text-white">
                {avail}
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-mono tabular-nums">
                {' '}/ {total} lots
              </span>
            </div>
          </div>

          {/* Progress gauge */}
          <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
            <div
              className={`h-full ${status.bar} transition-all duration-500`}
              style={{ width: `${Math.min(100, Math.max(4, (avail / Math.max(1, total)) * 100))}%` }}
            />
          </div>
        </div>

        {/* Key Features & Rate Summary */}
        <div className="mt-3.5 space-y-2 text-xs">
          <div className="flex items-start justify-between gap-2 text-slate-700 dark:text-slate-300">
            <span className="text-slate-400 shrink-0">Day Rate:</span>
            <span className="font-medium text-right text-slate-900 dark:text-slate-200 line-clamp-1">
              {carpark.rates.weekdayDay.description}
            </span>
          </div>

          {carpark.rates.weekdayEvening.eveningFlatRate && (
            <div className="flex items-center justify-between text-slate-700 dark:text-slate-300">
              <span className="text-slate-400">Evening Flat:</span>
              <span className="font-medium font-mono tabular-nums text-slate-900 dark:text-slate-200">
                ${carpark.rates.weekdayEvening.eveningFlatRate.toFixed(2)} / entry
              </span>
            </div>
          )}

          {/* Unboxed amenity tags with separators */}
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 pt-1 text-[11px] text-slate-500 dark:text-slate-400">
            <span>Grace: {carpark.gracePeriodMin}m</span>
            <span>·</span>
            <span>Max Height: {carpark.heightClearanceMeters}m</span>
            {carpark.freeParkingScheme && (
              <>
                <span>·</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Sun Free FPS</span>
              </>
            )}
            {carpark.lots.ev && (
              <>
                <span>·</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                  {carpark.lots.ev.availableLots} EV Lots ({carpark.lots.ev.powerKw}kW)
                </span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Card Action Buttons */}
      <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2">
        <button
          onClick={() => onSelect(carpark)}
          className="flex-1 py-2 px-3 text-xs font-semibold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-white rounded-lg transition-colors flex items-center justify-center gap-1 min-h-[38px]"
        >
          <span>Rate Breakdown</span>
          <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
        </button>

        <button
          onClick={() => onCalculate(carpark)}
          className="py-2 px-3 text-xs font-semibold bg-rose-50 dark:bg-rose-950/40 hover:bg-rose-100 dark:hover:bg-rose-900/60 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-900 rounded-lg transition-colors flex items-center gap-1 min-h-[38px]"
        >
          <ShieldCheck className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" />
          <span>Calc Fee</span>
        </button>
      </div>
    </div>
  );
};
