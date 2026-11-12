import React, { useState } from 'react';
import { X, Navigation, AlertCircle, Clock, ShieldCheck, MapPin } from 'lucide-react';
import { SINGAPORE_ERP_GANTRIES, ERPGantryInfo } from '../data/erpGantries';

interface ERPGantryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ERPGantryModal: React.FC<ERPGantryModalProps> = ({ isOpen, onClose }) => {
  const [selectedZone, setSelectedZone] = useState<string>('All');

  if (!isOpen) return null;

  const zones = ['All', 'Expressway (CTE/AYE/PIE)', 'CBD / Marina Bay', 'Orchard Cordon', 'Kallang / Bugis'];

  const filtered = selectedZone === 'All'
    ? SINGAPORE_ERP_GANTRIES
    : SINGAPORE_ERP_GANTRIES.filter(g => g.zone === selectedZone);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div
        className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden transition-all text-slate-900 dark:text-white"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3 bg-slate-50/70 dark:bg-slate-800/50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-sky-600 text-white flex items-center justify-center shadow-xs">
              <Navigation className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                Singapore ERP 2.0 Live Radar
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Current Electronic Road Pricing rates & active gantries
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
        <div className="p-4 sm:p-6 space-y-4 overflow-y-auto text-sm">
          {/* Zone Filter Segmented Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
            {zones.map(z => (
              <button
                key={z}
                onClick={() => setSelectedZone(z)}
                className={`px-3 py-1.5 rounded-lg whitespace-nowrap shrink-0 transition-colors min-h-[34px] ${
                  selectedZone === z
                    ? 'bg-slate-900 dark:bg-rose-600 text-white font-semibold'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {z}
              </button>
            ))}
          </div>

          {/* Gantry List */}
          <div className="space-y-2.5">
            {filtered.map(gantry => (
              <div
                key={gantry.id}
                className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50 flex items-center justify-between gap-3"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                    <span className="font-semibold text-slate-700 dark:text-slate-300">{gantry.zone}</span>
                    <span>·</span>
                    <span>{gantry.expresswayRoad}</span>
                  </div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                    {gantry.name}
                  </h4>
                  <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                    <Clock className="w-3 h-3 text-slate-400" />
                    <span>Active Hours: {gantry.timeWindow}</span>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span
                    className={`font-mono tabular-nums text-xl font-bold ${
                      gantry.currentRate > 0
                        ? 'text-rose-600 dark:text-rose-400'
                        : 'text-emerald-600 dark:text-emerald-400'
                    }`}
                  >
                    ${gantry.currentRate.toFixed(2)}
                  </span>
                  <span className="block text-[11px] text-slate-400">
                    {gantry.status}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Driver Tip */}
          <div className="p-3 rounded-xl bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-900/60 text-xs text-sky-800 dark:text-sky-300 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-sky-600 dark:text-sky-400" />
            <p>
              ERP charges are automatically deducted via your in-vehicle CEPAS card / ERP 2.0 On-Board Unit (OBU). Carparks within CBD or Orchard may require passing an active gantry during operating windows.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 border-t border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/50 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold bg-slate-900 hover:bg-slate-800 dark:bg-rose-600 dark:hover:bg-rose-500 text-white rounded-lg transition-colors"
          >
            Close Radar
          </button>
        </div>
      </div>
    </div>
  );
};
