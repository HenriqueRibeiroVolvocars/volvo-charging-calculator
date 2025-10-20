import { VolvoVehicle } from '@/data/volvoVehicles';
import { CompetitorVehicle } from '@/data/competitorVehicles';

export interface CalculationInputs {
  volvoVehicle: VolvoVehicle;
  competitor: CompetitorVehicle;
  dailyKm: number;
  cityPercent: number;
  highwayPercent: number;
  energyPriceKwh: number;
  fuelPricePerLiter: number;
  chargingPowerKw: number;
  chargingWindow: number; // hours per day
  chargingEfficiency?: number;
}

export interface CalculationResults {
  ev: {
    kmPerKwh: number;
    kwhPerKm: number;
    dailyEnergy: number;
    dailyCost: number;
    weeklyCost: number;
    monthlyCost: number;
    yearlyCost: number;
    dailyBatteryPercent: number;
    weeklyBatteryPercent: number;
    dailyChargingTime: number;
    chargesFitsWindow: boolean;
  };
  ice: {
    litersPer100KmCity: number;
    litersPer100KmHighway: number;
    litersPer100KmAvg: number;
    dailyLiters: number;
    dailyCost: number;
    weeklyCost: number;
    monthlyCost: number;
    yearlyCost: number;
  };
  savings: {
    daily: number;
    weekly: number;
    monthly: number;
    yearly: number;
  };
}

export function calculateComparison(inputs: CalculationInputs): CalculationResults {
  const efficiency = inputs.chargingEfficiency || 0.90;
  
  // EV Calculations
  const kmPerKwh = inputs.volvoVehicle.autonomy / inputs.volvoVehicle.batteryCapacity;
  const kwhPerKm = 1 / kmPerKwh;
  const dailyEnergy = (inputs.dailyKm * kwhPerKm) / efficiency;
  const evDailyCost = dailyEnergy * inputs.energyPriceKwh;
  const dailyBatteryPercent = (dailyEnergy / inputs.volvoVehicle.batteryCapacity) * 100;
  const dailyChargingTime = dailyEnergy / inputs.chargingPowerKw;
  const chargesFitsWindow = dailyChargingTime <= inputs.chargingWindow;

  // ICE Calculations
  const litersPer100KmCity = 100 / inputs.competitor.kmLCidade;
  const litersPer100KmHighway = 100 / inputs.competitor.kmLEstrada;
  const litersPer100KmAvg = 
    (inputs.cityPercent / 100 * litersPer100KmCity) + 
    (inputs.highwayPercent / 100 * litersPer100KmHighway);
  
  const dailyLiters = (inputs.dailyKm / 100) * litersPer100KmAvg;
  const iceDailyCost = dailyLiters * inputs.fuelPricePerLiter;

  return {
    ev: {
      kmPerKwh,
      kwhPerKm,
      dailyEnergy,
      dailyCost: evDailyCost,
      weeklyCost: evDailyCost * 7,
      monthlyCost: evDailyCost * 30,
      yearlyCost: evDailyCost * 365,
      dailyBatteryPercent,
      weeklyBatteryPercent: dailyBatteryPercent * 7,
      dailyChargingTime,
      chargesFitsWindow
    },
    ice: {
      litersPer100KmCity,
      litersPer100KmHighway,
      litersPer100KmAvg,
      dailyLiters,
      dailyCost: iceDailyCost,
      weeklyCost: iceDailyCost * 7,
      monthlyCost: iceDailyCost * 30,
      yearlyCost: iceDailyCost * 365
    },
    savings: {
      daily: iceDailyCost - evDailyCost,
      weekly: (iceDailyCost - evDailyCost) * 7,
      monthly: (iceDailyCost - evDailyCost) * 30,
      yearly: (iceDailyCost - evDailyCost) * 365
    }
  };
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value);
}

export function formatNumber(value: number, decimals: number = 1): string {
  return value.toFixed(decimals);
}
