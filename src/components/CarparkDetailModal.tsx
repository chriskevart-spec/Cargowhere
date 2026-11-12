import React from 'react';
import { X, Navigation, Car, Bike, Zap, Clock, ShieldCheck, MapPin, DollarSign, Bookmark, BookmarkCheck, ExternalLink, Compass } from 'lucide-react';
import { Carpark, VehicleType } from '../types/carpark';

interface CarparkDetailModalProps {
  carpark: Carpark | null;
  onClose: () => void;
  selectedVehicle: VehicleType;
  isBookmarked: boolean;
  onToggleBookmark: (carparkId: string) => void;
  onOpenCalculator: (carpark: Carpark) => void;
  onParkHere: (carpark: Carpark) => void;
}

export const CarparkDetailModal: React.FC<CarparkDetailModalProps> = ({
  carpark,
  onClose,
  selectedVehicle,
  isBookmarked,
  onToggleBookmark,
  onOpenCalculator,
  onParkHere
}) => {
  if (!carpark) return null;

  const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${carpark.coordinates.lat},${carpark.coordinates.lng}`;
  const wazeUrl = `https://waze.com/ul?ll=${carpark.coordinates.lat},${carpark.coordinates.lng}&navigate=yes`;

  const carAvail = carpark.lots.car.available;
  const carTotal = carpark.lots.car.total;
  const motoAvail = carpark.lots.motorcycle.available;
  const motoTotal = carpark.lots.motorcycle.total;
  const evAvail = carpark.lots.ev?.availableLots ?? 0;
  const evTotal = carpark.lots.ev?.totalLots ?? 0;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div
        className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl w-full max-w-2xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden transition-all text-slate-900 dark:text-white"
        onClick={e => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 flex items-start justify-between gap-3 bg-slate-50/70 dark:bg-slate-800/50">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
              <span className="font-semibold text-slate-700 dark:text-slate-300">{carpark.agency}</span>
              <span>·</span>
              <span>{carpark.structure}</span>
              <span>·</span>
              <span>{carpark.region}</span>
              <span>·</span>
              <span className="font-mono">{carpark.carparkNo}</span>
            </div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-1">
              {carpark.name}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span>{carpark.address}</span>
            </p>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={() => onToggleBookmark(carpark.id)}
              className="p-2 min-h-[40px] min-w-[40px] rounded-lg text-slate-500 hover:text-rose-600 dark:text-slate-400 dark:hover:text-rose-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center justify-center"
              title={isBookmarked ? 'Remove bookmark' : 'Bookmark this carpark'}
            >
              {isBookmarked ? (
                <BookmarkCheck className="w-5 h-5 text-rose-600 dark:text-rose-400 fill-rose-600" />
              ) : (
                <Bookmark className="w-5 h-5" />
              )}
            </button>

            <button
              onClick={onClose}
              className="p-2 min-h-[40px] min-w-[40px] rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center justify-center"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 text-sm">
          {/* Real-time Lot Breakdown Grid */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
              Real-time Availability by Vehicle
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Car Lots */}
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-medium">
                    <Car className="w-3.5 h-3.5 text-slate-700 dark:text-slate-300" />
                    <span>Cars</span>
                  </div>
                  <div className="mt-1">
                    <span className="font-mono tabular-nums text-2xl font-bold text-slate-900 dark:text-white">
                      {carAvail}
                    </span>
                    <span className="text-xs text-slate-400 font-mono"> / {carTotal}</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`text-xs font-semibold ${carAvail > 30 ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-500'}`}>
                    {Math.round((carAvail / Math.max(1, carTotal)) * 100)}% free
                  </span>
                </div>
              </div>

              {/* Motorcycle Lots */}
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-medium">
                    <Bike className="w-3.5 h-3.5 text-slate-700 dark:text-slate-300" />
                    <span>Motorcycles</span>
                  </div>
                  <div className="mt-1">
                    <span className="font-mono tabular-nums text-2xl font-bold text-slate-900 dark:text-white">
                      {motoAvail}
                    </span>
                    <span className="text-xs text-slate-400 font-mono"> / {motoTotal}</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs text-slate-500 font-medium">
                    ${carpark.rates.motorcyclePerEntry.toFixed(2)}/entry
                  </span>
                </div>
              </div>

              {/* EV Charging Lots */}
              <div className="p-3.5 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200/80 dark:border-emerald-800/60 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-1.5 text-xs text-emerald-800 dark:text-emerald-300 font-medium">
                    <Zap className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                    <span>EV Chargers</span>
                  </div>
                  <div className="mt-1">
                    <span className="font-mono tabular-nums text-2xl font-bold text-emerald-700 dark:text-emerald-300">
                      {evAvail}
                    </span>
                    <span className="text-xs text-emerald-600/70 dark:text-emerald-400 font-mono"> / {evTotal}</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs text-emerald-700 dark:text-emerald-400 font-medium">
                    {carpark.lots.ev ? `${carpark.lots.ev.powerKw} kW DC` : 'None'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Full Parking Rate Schedule */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
              Official Parking Rates Schedule
            </h4>
            <div className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden divide-y divide-slate-200 dark:divide-slate-800">
              {/* Mon - Fri Day */}
              <div className="p-3.5 bg-white dark:bg-slate-900 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <span className="font-semibold text-slate-900 dark:text-white text-xs sm:w-40 shrink-0">
                  Weekdays (Day)
                </span>
                <span className="text-xs text-slate-700 dark:text-slate-300 flex-1">
                  {carpark.rates.weekdayDay.description}
                </span>
              </div>

              {/* Mon - Fri Evening */}
              <div className="p-3.5 bg-slate-50 dark:bg-slate-850 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <span className="font-semibold text-slate-900 dark:text-white text-xs sm:w-40 shrink-0">
                  Weekdays (Evening)
                </span>
                <span className="text-xs text-slate-700 dark:text-slate-300 flex-1">
                  {carpark.rates.weekdayEvening.description}
                </span>
              </div>

              {/* Saturday */}
              <div className="p-3.5 bg-white dark:bg-slate-900 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <span className="font-semibold text-slate-900 dark:text-white text-xs sm:w-40 shrink-0">
                  Saturday
                </span>
                <span className="text-xs text-slate-700 dark:text-slate-300 flex-1">
                  {carpark.rates.saturday.description}
                </span>
              </div>

              {/* Sunday & Public Holidays */}
              <div className="p-3.5 bg-slate-50 dark:bg-slate-850 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-1.5 sm:w-40 shrink-0">
                  <span className="font-semibold text-slate-900 dark:text-white text-xs">
                    Sunday & PH
                  </span>
                  {carpark.freeParkingScheme && (
                    <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950 px-1.5 py-0.5 rounded">
                      FREE FPS
                    </span>
                  )}
                </div>
                <span className="text-xs text-slate-700 dark:text-slate-300 flex-1">
                  {carpark.rates.sundayPH.description}
                </span>
              </div>
            </div>
          </div>

          {/* Operational specs & Driver Guidance */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="space-y-2 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800">
              <span className="font-semibold text-slate-900 dark:text-white block mb-1">
                Driver Entry Specifications
              </span>
              <div className="flex justify-between">
                <span className="text-slate-500 dark:text-slate-400">Grace Period:</span>
                <span className="font-medium text-slate-900 dark:text-white">
                  {carpark.gracePeriodMin} minutes (Exit free if under)
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 dark:text-slate-400">Height Limit:</span>
                <span className="font-medium text-slate-900 dark:text-white font-mono tabular-nums">
                  {carpark.heightClearanceMeters} meters
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 dark:text-slate-400">Nearest MRT:</span>
                <span className="font-medium text-slate-900 dark:text-white">
                  {carpark.nearestMrt.name} ({carpark.nearestMrt.walkingMinutes} min walk)
                </span>
              </div>
            </div>

            <div className="space-y-2 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800">
              <span className="font-semibold text-slate-900 dark:text-white block mb-1">
                Payment & ERP Notice
              </span>
              <div className="flex justify-between">
                <span className="text-slate-500 dark:text-slate-400">Payment Modes:</span>
                <span className="font-medium text-slate-900 dark:text-white text-right">
                  {carpark.paymentMethods.join(', ')}
                </span>
              </div>
              {carpark.erpHit && (
                <div className="flex justify-between text-amber-600 dark:text-amber-400 pt-1 border-t border-slate-200 dark:border-slate-700">
                  <span>ERP Nearby ({carpark.erpHit.gantryName}):</span>
                  <span className="font-mono font-bold">${carpark.erpHit.currentRate.toFixed(2)}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Modal Bottom Actions */}
        <div className="p-4 sm:p-5 border-t border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/50 flex flex-wrap items-center justify-between gap-3">
          {/* Navigation External Links */}
          <div className="flex items-center gap-2">
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-2 text-xs font-semibold bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-800 dark:text-white transition-colors flex items-center gap-1.5"
            >
              <Navigation className="w-3.5 h-3.5 text-blue-600" />
              <span>Google Maps</span>
            </a>

            <a
              href={wazeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-2 text-xs font-semibold bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-800 dark:text-white transition-colors flex items-center gap-1.5"
            >
              <Compass className="w-3.5 h-3.5 text-cyan-500" />
              <span>Waze</span>
            </a>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onParkHere(carpark)}
              className="px-3.5 py-2 text-xs font-semibold bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white rounded-lg hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
            >
              Park Here (Save Deck)
            </button>

            <button
              onClick={() => onOpenCalculator(carpark)}
              className="px-4 py-2 text-xs font-semibold bg-rose-600 hover:bg-rose-500 text-white rounded-lg transition-colors flex items-center gap-1.5 shadow-sm"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Calculate Exact Fee</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
