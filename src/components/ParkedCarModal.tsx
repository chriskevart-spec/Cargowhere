import React, { useState, useEffect } from 'react';
import { X, MapPin, Clock, Trash2, Plus, Check, AlertCircle, ShieldCheck } from 'lucide-react';
import { Carpark, ParkedCarMemo } from '../types/carpark';
import { calculateParkingFee, formatSGD, formatDuration } from '../utils/calculator';

interface ParkedCarModalProps {
  isOpen: boolean;
  onClose: () => void;
  carparks: Carpark[];
  savedMemo: ParkedCarMemo | null;
  onSaveMemo: (memo: ParkedCarMemo) => void;
  onClearMemo: () => void;
  preselectedCarpark?: Carpark | null;
}

export const ParkedCarModal: React.FC<ParkedCarModalProps> = ({
  isOpen,
  onClose,
  carparks,
  savedMemo,
  onSaveMemo,
  onClearMemo,
  preselectedCarpark
}) => {
  const [carparkId, setCarparkId] = useState<string>(
    savedMemo?.carparkNo || preselectedCarpark?.carparkNo || carparks[0]?.carparkNo || ''
  );
  const [deckLevel, setDeckLevel] = useState<string>(savedMemo?.deckLevel || 'Level 3B (Zone Red)');
  const [lotNumber, setLotNumber] = useState<string>(savedMemo?.lotNumber || 'Lot 42');
  const [notes, setNotes] = useState<string>(savedMemo?.notes || 'Near Lobby B lift');
  const [elapsedMinutes, setElapsedMinutes] = useState<number>(0);

  // Sync state if savedMemo changes
  useEffect(() => {
    if (savedMemo) {
      setCarparkId(savedMemo.carparkNo);
      setDeckLevel(savedMemo.deckLevel);
      setLotNumber(savedMemo.lotNumber);
      setNotes(savedMemo.notes || '');
    }
  }, [savedMemo]);

  // Parking duration timer
  useEffect(() => {
    if (!savedMemo) return;

    const updateElapsed = () => {
      const start = new Date(savedMemo.parkedTime).getTime();
      const current = Date.now();
      const diffMins = Math.max(0, Math.floor((current - start) / 60000));
      setElapsedMinutes(diffMins);
    };

    updateElapsed();
    const interval = setInterval(updateElapsed, 15000); // update every 15s
    return () => clearInterval(interval);
  }, [savedMemo]);

  if (!isOpen) return null;

  const currentCarpark = carparks.find(c => c.carparkNo === carparkId) || carparks[0];

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const memo: ParkedCarMemo = {
      id: savedMemo?.id || `memo-${Date.now()}`,
      carparkName: currentCarpark?.name || 'Selected Carpark',
      carparkNo: currentCarpark?.carparkNo || carparkId,
      deckLevel,
      lotNumber,
      notes,
      parkedTime: savedMemo?.parkedTime || new Date().toISOString()
    };
    onSaveMemo(memo);
  };

  // Calculate live parking fee so far if parked
  let runningFeeText = '';
  if (savedMemo && currentCarpark) {
    const entryDate = new Date(savedMemo.parkedTime);
    const exitDate = new Date();
    const feeResult = calculateParkingFee({
      carpark: currentCarpark,
      entryDate,
      exitDate,
      vehicleType: 'car'
    });
    runningFeeText = formatSGD(feeResult.totalEstimatedFee);
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div
        className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden transition-all text-slate-900 dark:text-white"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3 bg-slate-50/70 dark:bg-slate-800/50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-rose-600 text-white flex items-center justify-center shadow-xs">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                Find My Parked Car
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Deck level, lot number & live meter tracker
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

        {/* Content */}
        <div className="p-4 sm:p-6 space-y-5 text-sm">
          {savedMemo ? (
            /* Active Parked State Display */
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-900 text-white border border-slate-800 shadow-md space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-xs text-rose-400 font-semibold block uppercase tracking-wider">
                      Currently Parked At
                    </span>
                    <h3 className="text-lg font-bold text-white mt-0.5">{savedMemo.carparkName}</h3>
                    <span className="text-xs text-slate-400 font-mono">{savedMemo.carparkNo}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-slate-400 block">Current Parking Fee</span>
                    <span className="font-mono tabular-nums text-xl font-bold text-emerald-400">
                      {runningFeeText || '$0.00'}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-800 text-xs">
                  <div className="bg-slate-800/80 p-2.5 rounded-lg">
                    <span className="text-slate-400 block text-[11px]">Deck / Level:</span>
                    <span className="font-bold text-white text-sm">{savedMemo.deckLevel}</span>
                  </div>
                  <div className="bg-slate-800/80 p-2.5 rounded-lg">
                    <span className="text-slate-400 block text-[11px]">Lot Number:</span>
                    <span className="font-bold text-white text-sm font-mono">{savedMemo.lotNumber}</span>
                  </div>
                </div>

                {savedMemo.notes && (
                  <div className="text-xs text-slate-300 bg-slate-800/40 p-2 rounded">
                    <span className="text-slate-400 font-medium">Notes: </span>
                    {savedMemo.notes}
                  </div>
                )}

                <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-rose-400" />
                    <span>Elapsed:</span>
                    <span className="font-mono tabular-nums font-semibold text-white">
                      {formatDuration(elapsedMinutes)}
                    </span>
                  </div>
                  <span>Parked at {new Date(savedMemo.parkedTime).toLocaleTimeString('en-SG', { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={onClearMemo}
                  className="flex-1 py-2.5 px-3 text-xs font-semibold bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 hover:bg-rose-100 dark:hover:bg-rose-900/60 rounded-xl border border-rose-200 dark:border-rose-900 transition-colors flex items-center justify-center gap-1.5 min-h-[42px]"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>I Retrieved My Car</span>
                </button>
              </div>
            </div>
          ) : (
            /* Input Form */
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
                  Carpark Location
                </label>
                <select
                  value={carparkId}
                  onChange={e => setCarparkId(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-xs font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500"
                >
                  {carparks.map(c => (
                    <option key={c.carparkNo} value={c.carparkNo}>
                      {c.name} ({c.carparkNo})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
                    Deck / Level / Color
                  </label>
                  <input
                    type="text"
                    value={deckLevel}
                    onChange={e => setDeckLevel(e.target.value)}
                    placeholder="e.g. Level 3B (Red)"
                    required
                    className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
                    Lot Number
                  </label>
                  <input
                    type="text"
                    value={lotNumber}
                    onChange={e => setLotNumber(e.target.value)}
                    placeholder="e.g. Lot 142"
                    required
                    className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white font-mono focus:outline-none focus:ring-2 focus:ring-rose-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
                  Landmarks & Notes
                </label>
                <input
                  type="text"
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  placeholder="e.g. Near Pillar 34, Lobby C lift"
                  className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 px-4 text-xs font-semibold bg-rose-600 hover:bg-rose-500 text-white rounded-xl transition-colors shadow-sm min-h-[42px] flex items-center justify-center gap-1.5"
              >
                <Check className="w-4 h-4" />
                <span>Save Parking Spot & Start Meter</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
