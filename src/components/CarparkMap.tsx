import React, { useState } from 'react';
import { ZoomIn, ZoomOut, RotateCcw, MapPin, Zap, ShieldCheck, ChevronRight, Navigation } from 'lucide-react';
import { Carpark, VehicleType } from '../types/carpark';

interface CarparkMapProps {
  carparks: Carpark[];
  selectedCarpark: Carpark | null;
  onSelectCarpark: (carpark: Carpark) => void;
  selectedVehicle: VehicleType;
  onOpenCalculator: (carpark: Carpark) => void;
}

export const CarparkMap: React.FC<CarparkMapProps> = ({
  carparks,
  selectedCarpark,
  onSelectCarpark,
  selectedVehicle,
  onOpenCalculator
}) => {
  const [zoomLevel, setZoomLevel] = useState(1);
  const [hoveredCarpark, setHoveredCarpark] = useState<Carpark | null>(null);

  const handleZoom = (delta: number) => {
    setZoomLevel(prev => Math.min(2.2, Math.max(0.85, Number((prev + delta).toFixed(1)))));
  };

  const handleResetZoom = () => {
    setZoomLevel(1);
  };

  const getLotsAvailable = (cp: Carpark) => {
    if (selectedVehicle === 'motorcycle') return cp.lots.motorcycle.available;
    if (selectedVehicle === 'ev') return cp.lots.ev?.availableLots ?? 0;
    return cp.lots.car.available;
  };

  const getTotalLots = (cp: Carpark) => {
    if (selectedVehicle === 'motorcycle') return cp.lots.motorcycle.total;
    if (selectedVehicle === 'ev') return cp.lots.ev?.totalLots ?? 0;
    return cp.lots.car.total;
  };

  const getOccupancyColor = (cp: Carpark) => {
    const avail = getLotsAvailable(cp);
    const total = getTotalLots(cp);
    if (total === 0) return { bg: 'bg-slate-400', text: 'text-slate-400', border: 'border-slate-400', label: 'N/A' };
    const ratio = avail / total;
    if (ratio >= 0.3) {
      return { bg: 'bg-emerald-500', text: 'text-emerald-700 dark:text-emerald-400', border: 'border-emerald-500', label: 'Available' };
    }
    if (ratio >= 0.1) {
      return { bg: 'bg-amber-500', text: 'text-amber-700 dark:text-amber-400', border: 'border-amber-500', label: 'Filling Up' };
    }
    return { bg: 'bg-rose-500', text: 'text-rose-700 dark:text-rose-400', border: 'border-rose-500', label: 'Nearly Full' };
  };

  return (
    <div className="relative w-full h-[620px] bg-slate-950 rounded-2xl overflow-hidden border border-slate-800 shadow-xl select-none">
      {/* Map Control Buttons */}
      <div className="absolute top-4 right-4 z-20 flex flex-col gap-1.5 bg-slate-900/90 backdrop-blur-md p-1.5 rounded-xl border border-slate-700/80 shadow-md">
        <button
          onClick={() => handleZoom(0.2)}
          aria-label="Zoom In"
          className="p-2 min-h-[40px] min-w-[40px] rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors flex items-center justify-center"
        >
          <ZoomIn className="w-4 h-4" />
        </button>
        <button
          onClick={() => handleZoom(-0.2)}
          aria-label="Zoom Out"
          className="p-2 min-h-[40px] min-w-[40px] rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors flex items-center justify-center"
        >
          <ZoomOut className="w-4 h-4" />
        </button>
        <button
          onClick={handleResetZoom}
          aria-label="Reset Map"
          className="p-2 min-h-[40px] min-w-[40px] rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors flex items-center justify-center"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {/* Legend & Vehicle context overlay */}
      <div className="absolute top-4 left-4 z-20 bg-slate-900/90 backdrop-blur-md px-3.5 py-2.5 rounded-xl border border-slate-800 text-xs text-slate-300 shadow-lg space-y-1.5 max-w-xs">
        <div className="flex items-center justify-between gap-4 font-semibold text-white">
          <span>Singapore Carpark Radar</span>
          <span className="capitalize text-rose-400 font-mono text-[11px]">{selectedVehicle} mode</span>
        </div>
        <div className="flex items-center gap-3 text-[11px]">
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
            <span>&gt; 30% lots</span>
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
            <span>10 - 30%</span>
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" />
            <span>&lt; 10%</span>
          </span>
        </div>
      </div>

      {/* SVG Canvas Container */}
      <div
        className="w-full h-full flex items-center justify-center transition-transform duration-300 ease-out"
        style={{ transform: `scale(${zoomLevel})` }}
      >
        <div className="relative w-full max-w-[980px] h-[540px]">
          {/* Authentic Vector Singapore Island Map Outline & Expressways */}
          <svg
            viewBox="0 0 1000 600"
            className="w-full h-full drop-shadow-[0_10px_25px_rgba(0,0,0,0.5)]"
          >
            <defs>
              <linearGradient id="sgIslandGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1e293b" />
                <stop offset="50%" stopColor="#0f172a" />
                <stop offset="100%" stopColor="#1e293b" />
              </linearGradient>

              <pattern id="gridPattern" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
              </pattern>
            </defs>

            {/* Subtle Coordinate Grid */}
            <rect width="1000" height="600" fill="url(#gridPattern)" />

            {/* Singapore Main Island Geographic Vector Path */}
            <path
              d="M 120 280 
                 C 150 250, 220 210, 320 200 
                 C 380 195, 430 170, 480 170 
                 C 540 170, 590 190, 640 210 
                 C 700 230, 780 250, 840 290 
                 C 900 330, 930 380, 910 420 
                 C 880 470, 810 500, 740 510 
                 C 680 520, 600 525, 540 535 
                 C 490 545, 460 550, 420 540 
                 C 360 530, 310 515, 260 500 
                 C 200 480, 150 440, 110 390 
                 C 80 350, 90 310, 120 280 Z"
              fill="url(#sgIslandGrad)"
              stroke="#334155"
              strokeWidth="2.5"
            />

            {/* Sentosa Island */}
            <path
              d="M 430 555 C 450 550, 480 552, 495 565 C 480 575, 440 575, 430 555 Z"
              fill="#1e293b"
              stroke="#334155"
              strokeWidth="1.5"
            />

            {/* Pulau Ubin & Tekong Northeast */}
            <path
              d="M 740 180 C 770 175, 800 185, 810 195 C 790 205, 750 200, 740 180 Z"
              fill="#1e293b"
              stroke="#334155"
              strokeWidth="1.5"
            />

            {/* Expressways (Authentic PIE, CTE, AYE, ECP, KPE corridor trails) */}
            {/* PIE (East-West spine) */}
            <path
              d="M 190 380 Q 350 350, 520 360 T 850 330"
              fill="none"
              stroke="rgba(244, 63, 94, 0.25)"
              strokeWidth="2.5"
              strokeDasharray="6 3"
            />
            {/* CTE (North-South spine) */}
            <path
              d="M 520 200 Q 520 290, 520 450"
              fill="none"
              stroke="rgba(56, 189, 248, 0.25)"
              strokeWidth="2"
              strokeDasharray="5 3"
            />
            {/* AYE (Southwest coastal) */}
            <path
              d="M 180 430 Q 320 440, 480 470"
              fill="none"
              stroke="rgba(148, 163, 184, 0.2)"
              strokeWidth="2"
            />
            {/* ECP (East Coast Parkway to Marina Bay) */}
            <path
              d="M 870 360 Q 720 440, 540 480"
              fill="none"
              stroke="rgba(148, 163, 184, 0.2)"
              strokeWidth="2"
            />

            {/* Region Label Annotations */}
            <text x="515" y="195" fill="#64748b" fontSize="11" fontWeight="600" textAnchor="middle" letterSpacing="1">
              WOODLANDS / NORTH
            </text>
            <text x="520" y="330" fill="#64748b" fontSize="11" fontWeight="600" textAnchor="middle" letterSpacing="1">
              BISHAN / ANG MO KIO
            </text>
            <text x="240" y="370" fill="#64748b" fontSize="11" fontWeight="600" textAnchor="middle" letterSpacing="1">
              JURONG WEST
            </text>
            <text x="780" y="340" fill="#64748b" fontSize="11" fontWeight="600" textAnchor="middle" letterSpacing="1">
              TAMPINES / EAST
            </text>
            <text x="890" y="315" fill="#64748b" fontSize="10" fontWeight="600" textAnchor="middle" letterSpacing="1">
              CHANGI
            </text>
            <text x="525" y="495" fill="#f43f5e" fontSize="11" fontWeight="700" textAnchor="middle" letterSpacing="1">
              ORCHARD & MARINA BAY
            </text>
          </svg>

          {/* Interactive Carpark Pins on Top of Vector */}
          {carparks.map(cp => {
            const avail = getLotsAvailable(cp);
            const status = getOccupancyColor(cp);
            const isSelected = selectedCarpark?.id === cp.id;

            return (
              <div
                key={cp.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10 transition-transform duration-150 hover:scale-125"
                style={{
                  left: `${cp.coordinates.mapX}%`,
                  top: `${cp.coordinates.mapY}%`
                }}
                onClick={() => onSelectCarpark(cp)}
                onMouseEnter={() => setHoveredCarpark(cp)}
                onMouseLeave={() => setHoveredCarpark(null)}
              >
                {/* Pin element */}
                <div
                  className={`relative flex items-center justify-center transition-all ${
                    isSelected
                      ? 'scale-125 ring-4 ring-rose-500/50 shadow-lg'
                      : 'hover:ring-2 hover:ring-white/40'
                  }`}
                >
                  <div
                    className={`h-7 px-2 rounded-full ${status.bg} text-white font-mono tabular-nums text-xs font-bold flex items-center gap-1 shadow-md border border-white/20`}
                  >
                    <span>{avail}</span>
                    {cp.lots.ev && <Zap className="w-2.5 h-2.5 text-white/90" />}
                  </div>
                </div>

                {/* Micro Carpark Code Label */}
                <span className="block text-[9px] font-mono text-center text-slate-300 font-semibold tracking-tight whitespace-nowrap mt-0.5 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                  {cp.carparkNo}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Floating Active Selection Popover (Bottom Left) */}
      {(hoveredCarpark || selectedCarpark) && (
        <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:max-w-md z-30 bg-slate-900/95 backdrop-blur-md p-4 rounded-xl border border-slate-700 text-white shadow-2xl transition-all">
          {(() => {
            const active = hoveredCarpark || selectedCarpark!;
            const avail = getLotsAvailable(active);
            const total = getTotalLots(active);
            const status = getOccupancyColor(active);

            return (
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <span>{active.agency}</span>
                      <span>·</span>
                      <span>{active.structure}</span>
                      <span>·</span>
                      <span>{active.region}</span>
                    </div>
                    <h4 className="text-base font-bold text-white mt-0.5">{active.name}</h4>
                    <p className="text-xs text-slate-400 line-clamp-1">{active.address}</p>
                  </div>

                  <div className="text-right shrink-0">
                    <span className={`inline-block font-mono tabular-nums text-xl font-bold ${status.text}`}>
                      {avail}
                    </span>
                    <span className="text-xs text-slate-400 block">/ {total} lots</span>
                  </div>
                </div>

                {/* Rate Snapshot */}
                <div className="p-2.5 rounded-lg bg-slate-800/80 border border-slate-700/60 text-xs flex items-center justify-between gap-2">
                  <div className="truncate">
                    <span className="text-slate-400 block text-[11px]">Standard Day Rate:</span>
                    <span className="font-medium text-slate-200 truncate block">
                      {active.rates.weekdayDay.description}
                    </span>
                  </div>
                  {active.freeParkingScheme && (
                    <span className="shrink-0 text-emerald-400 text-[11px] font-semibold bg-emerald-950/60 border border-emerald-800/80 px-2 py-0.5 rounded">
                      Sun FPS Free
                    </span>
                  )}
                </div>

                {/* Action buttons */}
                <div className="flex items-center gap-2 pt-1">
                  <button
                    onClick={() => onSelectCarpark(active)}
                    className="flex-1 py-2 px-3 text-xs font-semibold bg-rose-600 hover:bg-rose-500 text-white rounded-lg transition-colors flex items-center justify-center gap-1.5"
                  >
                    <span>View Rates & Details</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => onOpenCalculator(active)}
                    className="py-2 px-3 text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg border border-slate-700 transition-colors flex items-center gap-1"
                  >
                    <ShieldCheck className="w-3.5 h-3.5 text-rose-400" />
                    <span>Calculate</span>
                  </button>
                </div>
              </div>
            );
          })()}
        </div>
      )}
    </div>
  );
};
