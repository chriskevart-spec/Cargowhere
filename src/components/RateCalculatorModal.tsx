import React, { useState } from 'react';
import { X, Calculator, Clock, Calendar, Car, Bike, Zap, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { Carpark, VehicleType } from '../types/carpark';
import { calculateParkingFee, formatSGD, formatDuration } from '../utils/calculator';

interface RateCalculatorModalProps {
  carpark: Carpark | null;
  allCarparks: Carpark[];
  onClose: () => void;
  onSelectCarpark: (cp: Carpark) => void;
  defaultVehicle: VehicleType;
}

export const RateCalculatorModal: React.FC<RateCalculatorModalProps> = ({
  carpark,
  allCarparks,
  onClose,
  onSelectCarpark,
  defaultVehicle
}) => {
  const [selectedCp, setSelectedCp] = useState<Carpark>(carpark || allCarparks[0]);
  const [vehicleType, setVehicleType] = useState<VehicleType>(defaultVehicle);
  const [includeEVCharging, setIncludeEVCharging] = useState(false);

  // Time state
  const now = new Date();
  const [entryTimeStr, setEntryTimeStr] = useState<string>(
    new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString().slice(0, 16)
  );

  // Default duration in minutes (e.g. 120 = 2 hours)
  const [durationMins, setDurationMins] = useState<number>(120);

  // Compute departure time based on duration
  const entryDate = new Date(entryTimeStr);
  const exitDate = new Date(entryDate.getTime() + durationMins * 60000);

  // Run calculation
  const result = calculateParkingFee({
    carpark: selectedCp,
    entryDate,
    exitDate,
    vehicleType,
    includeEVCharging
  });

  // Calculate comparison with other carparks in the same region
  const nearbyCarparks = allCarparks
    .filter(cp => cp.region === selectedCp.region && cp.id !== selectedCp.id)
    .slice(0, 4)
    .map(alt => {
      const altResult = calculateParkingFee({
        carpark: alt,
        entryDate,
        exitDate,
        vehicleType,
        includeEVCharging: false
      });
      return {
        carpark: alt,
        fee: altResult.totalEstimatedFee,
        diff: altResult.totalEstimatedFee - result.totalEstimatedFee
      };
    })
    .sort((a, b) => a.fee - b.fee);

  const setPresetDuration = (mins: number) => {
    setDurationMins(mins);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div
        className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl w-full max-w-3xl max-h-[94vh] flex flex-col shadow-2xl overflow-hidden transition-all text-slate-900 dark:text-white"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3 bg-slate-50/70 dark:bg-slate-800/50">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-rose-600 text-white flex items-center justify-center shadow-xs">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                Singapore Parking Fee Calculator
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Accurate calculations for HDB, URA, and shopping malls
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 min-h-[40px] min-w-[40px] rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center justify-center"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 text-sm">
          {/* Carpark Picker + Vehicle Type */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5 uppercase tracking-wider">
                Select Destination Carpark
              </label>
              <select
                value={selectedCp.id}
                onChange={e => {
                  const found = allCarparks.find(c => c.id === e.target.value);
                  if (found) setSelectedCp(found);
                }}
                className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-sm font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500"
              >
                {allCarparks.map(cp => (
                  <option key={cp.id} value={cp.id}>
                    {cp.name} ({cp.agency} · {cp.region})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5 uppercase tracking-wider">
                Vehicle Type
              </label>
              <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
                <button
                  type="button"
                  onClick={() => setVehicleType('car')}
                  className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1 min-h-[36px] ${
                    vehicleType === 'car'
                      ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                      : 'text-slate-600 dark:text-slate-400'
                  }`}
                >
                  <Car className="w-3.5 h-3.5" />
                  <span>Car</span>
                </button>
                <button
                  type="button"
                  onClick={() => setVehicleType('motorcycle')}
                  className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1 min-h-[36px] ${
                    vehicleType === 'motorcycle'
                      ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                      : 'text-slate-600 dark:text-slate-400'
                  }`}
                >
                  <Bike className="w-3.5 h-3.5" />
                  <span>Motorcycle</span>
                </button>
                <button
                  type="button"
                  onClick={() => setVehicleType('ev')}
                  className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1 min-h-[36px] ${
                    vehicleType === 'ev'
                      ? 'bg-white dark:bg-slate-700 text-emerald-600 dark:text-emerald-400 shadow-xs'
                      : 'text-slate-600 dark:text-slate-400'
                  }`}
                >
                  <Zap className="w-3.5 h-3.5" />
                  <span>EV</span>
                </button>
              </div>
            </div>
          </div>

          {/* Timing & Duration Selection */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 space-y-3.5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
                  Entry Date & Time
                </label>
                <input
                  type="datetime-local"
                  value={entryTimeStr}
                  onChange={e => setEntryTimeStr(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
                  Estimated Exit Time
                </label>
                <div className="w-full px-3 py-2 text-xs bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-300 font-mono">
                  {exitDate.toLocaleTimeString('en-SG', { hour: '2-digit', minute: '2-digit' })},{' '}
                  {exitDate.toLocaleDateString('en-SG', { weekday: 'short', day: 'numeric', month: 'short' })}
                </div>
              </div>
            </div>

            {/* Quick Duration Preset Buttons */}
            <div>
              <span className="text-xs text-slate-500 dark:text-slate-400 block mb-1.5 font-medium">
                Quick Duration Presets:
              </span>
              <div className="flex flex-wrap items-center gap-1.5">
                {[
                  { label: '10m (Grace)', mins: 10 },
                  { label: '30m', mins: 30 },
                  { label: '1 Hour', mins: 60 },
                  { label: '2 Hours', mins: 120 },
                  { label: '3.5 Hours', mins: 210 },
                  { label: 'Full Evening (5h)', mins: 300 },
                  { label: 'Full Day (8h)', mins: 480 }
                ].map(preset => (
                  <button
                    key={preset.mins}
                    type="button"
                    onClick={() => setPresetDuration(preset.mins)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors min-h-[34px] ${
                      durationMins === preset.mins
                        ? 'bg-slate-900 dark:bg-rose-600 text-white font-semibold shadow-xs'
                        : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>

            {/* EV charging option if vehicle is EV */}
            {vehicleType === 'ev' && selectedCp.lots.ev && (
              <label className="flex items-center gap-2 pt-1 text-xs cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeEVCharging}
                  onChange={e => setIncludeEVCharging(e.target.checked)}
                  className="rounded text-emerald-600 focus:ring-emerald-500"
                />
                <span className="text-emerald-700 dark:text-emerald-300 font-medium">
                  Include EV fast charging session (~{selectedCp.lots.ev.powerKw}kW @ ${selectedCp.lots.ev.chargingRatePerKwh.toFixed(2)}/kWh)
                </span>
              </label>
            )}
          </div>

          {/* Calculation Outcome Display Box */}
          <div className="p-5 rounded-2xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/60 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
              <div>
                <span className="text-xs uppercase font-bold tracking-wider text-rose-700 dark:text-rose-400">
                  Estimated Total Parking Fee
                </span>
                <div className="text-3xl font-extrabold font-mono tabular-nums text-slate-900 dark:text-white mt-1">
                  {formatSGD(result.totalEstimatedFee)}
                </div>
              </div>

              <div className="text-xs text-slate-600 dark:text-slate-300 sm:text-right">
                <span className="font-semibold block">{formatDuration(result.durationMinutes)}</span>
                <span className="text-slate-400">
                  {entryDate.toLocaleDateString('en-SG', { weekday: 'long' })}{' '}
                  {entryDate.toLocaleTimeString('en-SG', { hour: '2-digit', minute: '2-digit' })} →{' '}
                  {exitDate.toLocaleTimeString('en-SG', { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>

            {/* Detailed line-by-line itemization */}
            <div className="pt-3 border-t border-rose-200/80 dark:border-rose-900/80 space-y-1.5 text-xs">
              <span className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                Fee Calculation Breakdown:
              </span>
              {result.rateBreakdown.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Singapore Nearby Carparks Comparison (Save Money!) */}
          {nearbyCarparks.length > 0 && (
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2.5">
                Nearby Comparison in {selectedCp.region} for this {formatDuration(durationMins)} duration
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                {nearbyCarparks.map(({ carpark: alt, fee, diff }) => {
                  const isCheaper = diff < 0;
                  return (
                    <div
                      key={alt.id}
                      onClick={() => setSelectedCp(alt)}
                      className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/80 hover:border-rose-300 cursor-pointer transition-all flex items-center justify-between"
                    >
                      <div className="truncate pr-2">
                        <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                          <span>{alt.agency}</span>
                          <span>·</span>
                          <span className="font-mono">{alt.carparkNo}</span>
                        </div>
                        <span className="font-bold text-slate-900 dark:text-white truncate block">
                          {alt.name}
                        </span>
                      </div>

                      <div className="text-right shrink-0">
                        <span className="font-mono tabular-nums text-sm font-bold text-slate-900 dark:text-white">
                          {formatSGD(fee)}
                        </span>
                        {diff !== 0 && (
                          <span
                            className={`block text-[11px] font-semibold ${
                              isCheaper ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400'
                            }`}
                          >
                            {isCheaper ? `Save ${formatSGD(Math.abs(diff))}` : `+${formatSGD(diff)}`}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 border-t border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/50 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-semibold bg-slate-900 hover:bg-slate-800 dark:bg-rose-600 dark:hover:bg-rose-500 text-white rounded-lg transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
