import { Carpark, CalculationResult, VehicleType } from '../types/carpark';

export interface RateCalculationOptions {
  carpark: Carpark;
  entryDate: Date;
  exitDate: Date;
  vehicleType: VehicleType;
  includeEVCharging?: boolean;
}

export function calculateParkingFee(options: RateCalculationOptions): CalculationResult {
  const { carpark, entryDate, exitDate, vehicleType, includeEVCharging } = options;

  const durationMs = Math.max(0, exitDate.getTime() - entryDate.getTime());
  const durationMinutes = Math.ceil(durationMs / (1000 * 60));

  // 1. Grace Period Check
  if (durationMinutes <= carpark.gracePeriodMin) {
    return {
      durationMinutes,
      gracePeriodApplied: true,
      baseCharge: 0,
      eveningSurchargeOrFlat: 0,
      totalEstimatedFee: 0,
      rateBreakdown: [
        `Parked for ${durationMinutes} mins (under ${carpark.gracePeriodMin} mins grace period)`,
        `Grace Period Applied: $0.00`
      ],
      isFreePeriod: true
    };
  }

  // 2. Motorcycle flat rate
  if (vehicleType === 'motorcycle') {
    const motoFee = carpark.rates.motorcyclePerEntry;
    return {
      durationMinutes,
      gracePeriodApplied: false,
      baseCharge: motoFee,
      eveningSurchargeOrFlat: 0,
      totalEstimatedFee: motoFee,
      rateBreakdown: [
        `Motorcycle Per-Entry Rate: $${motoFee.toFixed(2)}`,
        `Duration: ${Math.floor(durationMinutes / 60)}h ${durationMinutes % 60}m`
      ],
      isFreePeriod: false
    };
  }

  const dayOfWeek = entryDate.getDay(); // 0 is Sunday, 6 is Saturday
  const entryHour = entryDate.getHours();
  const isSunday = dayOfWeek === 0;
  const isSaturday = dayOfWeek === 6;

  // 3. Sunday Free Parking Scheme (FPS) check
  if (isSunday && carpark.freeParkingScheme) {
    // Standard HDB FPS is 7:30am to 10:30pm
    if (entryHour >= 7 && entryHour < 22) {
      return {
        durationMinutes,
        gracePeriodApplied: false,
        baseCharge: 0,
        eveningSurchargeOrFlat: 0,
        totalEstimatedFee: 0,
        rateBreakdown: [
          `Sunday HDB Free Parking Scheme (FPS) Active (7:30am - 10:30pm)`,
          `Free for Cars & Goods Vehicles: $0.00`
        ],
        isFreePeriod: true
      };
    }
  }

  // Select applicable rate rule
  let rule = carpark.rates.weekdayDay;
  let ruleName = 'Weekday Standard';

  if (isSunday) {
    rule = carpark.rates.sundayPH;
    ruleName = 'Sunday & Public Holiday';
  } else if (isSaturday) {
    rule = carpark.rates.saturday;
    ruleName = 'Saturday';
  } else {
    // Weekday: check if arrival is in evening flat rate window
    if (rule.eveningFlatCutoffHour && entryHour >= rule.eveningFlatCutoffHour && rule.eveningFlatRate) {
      rule = carpark.rates.weekdayEvening;
      ruleName = 'Weekday Evening Per-Entry';
    }
  }

  // Check if evening per-entry flat rate applies directly
  if (rule.eveningFlatRate && rule.eveningFlatRate > 0 && rule.baseRate === rule.eveningFlatRate) {
    let total = rule.eveningFlatRate;
    const breakdown = [
      `${ruleName} Flat Rate Applied: $${rule.eveningFlatRate.toFixed(2)} per entry`
    ];

    if (includeEVCharging && carpark.lots.ev && vehicleType === 'ev') {
      const chargeHours = Math.min(2.5, durationMinutes / 60);
      const kwh = chargeHours * Math.min(50, carpark.lots.ev.powerKw);
      const evCost = kwh * carpark.lots.ev.chargingRatePerKwh;
      total += evCost;
      breakdown.push(`EV Charging (~${kwh.toFixed(1)} kWh @ $${carpark.lots.ev.chargingRatePerKwh.toFixed(2)}/kWh): +$${evCost.toFixed(2)}`);
    }

    return {
      durationMinutes,
      gracePeriodApplied: false,
      baseCharge: rule.eveningFlatRate,
      eveningSurchargeOrFlat: 0,
      totalEstimatedFee: total,
      rateBreakdown: breakdown,
      isFreePeriod: false
    };
  }

  // Calculate tiered / interval rates
  let baseCharge = 0;
  const breakdown: string[] = [];

  // First block
  baseCharge += rule.baseRate;
  breakdown.push(`1st block (${rule.baseMinutes} mins): $${rule.baseRate.toFixed(2)}`);

  let remainingMinutes = Math.max(0, durationMinutes - rule.baseMinutes);

  if (remainingMinutes > 0 && rule.subsequentMinutes > 0) {
    const subseqBlocks = Math.ceil(remainingMinutes / rule.subsequentMinutes);
    const subseqCost = subseqBlocks * rule.subsequentRate;
    baseCharge += subseqCost;
    breakdown.push(`Subsequent ${subseqBlocks} x ${rule.subsequentMinutes} mins (@ $${rule.subsequentRate.toFixed(2)}): $${subseqCost.toFixed(2)}`);
  }

  // Check night cap if present (e.g. HDB $5.00 night parking)
  if (rule.nightCap && baseCharge > rule.nightCap && (entryHour >= 22 || entryHour < 7)) {
    breakdown.push(`Capped at HDB Maximum Night Parking: $${rule.nightCap.toFixed(2)}`);
    baseCharge = rule.nightCap;
  }

  let totalEstimated = baseCharge;

  // Add EV charging if requested
  if (includeEVCharging && carpark.lots.ev && vehicleType === 'ev') {
    const chargeHours = Math.min(2.5, durationMinutes / 60);
    const kwh = chargeHours * Math.min(50, carpark.lots.ev.powerKw);
    const evCost = kwh * carpark.lots.ev.chargingRatePerKwh;
    totalEstimated += evCost;
    breakdown.push(`EV Charging (~${kwh.toFixed(1)} kWh @ $${carpark.lots.ev.chargingRatePerKwh.toFixed(2)}/kWh): +$${evCost.toFixed(2)}`);
  }

  return {
    durationMinutes,
    gracePeriodApplied: false,
    baseCharge,
    eveningSurchargeOrFlat: 0,
    totalEstimatedFee: Number(totalEstimated.toFixed(2)),
    rateBreakdown: breakdown,
    isFreePeriod: false
  };
}

/**
 * Format currency in Singapore Dollars
 */
export function formatSGD(amount: number): string {
  return `$${amount.toFixed(2)}`;
}

/**
 * Human-readable duration
 */
export function formatDuration(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (hours === 0) return `${mins} mins`;
  if (mins === 0) return `${hours} hr${hours > 1 ? 's' : ''}`;
  return `${hours} hr${hours > 1 ? 's' : ''} ${mins} mins`;
}
