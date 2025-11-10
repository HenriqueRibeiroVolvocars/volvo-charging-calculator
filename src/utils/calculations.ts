import { VolvoVehicle } from '@/data/volvoVehicles';
import { CompetitorVehicle } from '@/data/competitorVehiclesAPI';

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
    exceededElectricRange: boolean;
    extraKm: number;
    fuelLitersUsed: number;
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
  cumulativeCosts: {
    year1: { ev: number; ice: number; };
    year2: { ev: number; ice: number; };
    year3: { ev: number; ice: number; };
    year4: { ev: number; ice: number; };
    year5: { ev: number; ice: number; };
  };
}

export function calculateComparison(inputs: CalculationInputs): CalculationResults {
  const efficiency = inputs.chargingEfficiency || 0.90;
  
  // === CÁLCULO VOLVO (EV ou PHEV) ===
  const volvoElectricRange = inputs.volvoVehicle.autonomy; // km elétricos
  const kmPerKwh = volvoElectricRange / inputs.volvoVehicle.batteryCapacity;
  const kwhPerKm = 1 / kmPerKwh;
  
  let evDailyCost = 0;
  let dailyEnergy = 0;
  let dailyBatteryPercent = 0;
  let dailyChargingTime = 0;
  let exceededElectricRange = false;
  let extraKm = 0;
  let fuelLitersUsed = 0;
  
  // Se é híbrido plug-in E roda mais que a autonomia elétrica
  if (inputs.volvoVehicle.isPlugInHybrid && inputs.dailyKm > volvoElectricRange) {
    exceededElectricRange = true;
    extraKm = inputs.dailyKm - volvoElectricRange;
    
    // Parte elétrica
    const electricKm = volvoElectricRange;
    const electricEnergy = (electricKm * kwhPerKm) / efficiency;
    const electricCost = electricEnergy * inputs.energyPriceKwh;
    
    // Parte combustão
    const combustionKm = inputs.dailyKm - volvoElectricRange;
    const litersPer100KmCity = inputs.volvoVehicle.kmLCidade ? 100 / inputs.volvoVehicle.kmLCidade : 0;
    const litersPer100KmHighway = inputs.volvoVehicle.kmLEstrada ? 100 / inputs.volvoVehicle.kmLEstrada : 0;
    const litersPer100KmAvg = 
      (inputs.cityPercent / 100 * litersPer100KmCity) + 
      (inputs.highwayPercent / 100 * litersPer100KmHighway);
    const combustionLiters = (combustionKm / 100) * litersPer100KmAvg;
    const combustionCost = combustionLiters * inputs.fuelPricePerLiter;
    
    fuelLitersUsed = combustionLiters;
    evDailyCost = electricCost + combustionCost;
    dailyEnergy = electricEnergy;
    dailyBatteryPercent = 100; // Limita a 100%
    dailyChargingTime = electricEnergy / inputs.chargingPowerKw;
  } else {
    // 100% elétrico ou híbrido rodando apenas no elétrico
    dailyEnergy = (inputs.dailyKm * kwhPerKm) / efficiency;
    evDailyCost = dailyEnergy * inputs.energyPriceKwh;
    dailyBatteryPercent = (dailyEnergy / inputs.volvoVehicle.batteryCapacity) * 100;
    dailyChargingTime = dailyEnergy / inputs.chargingPowerKw;
  }
  
  const chargesFitsWindow = dailyChargingTime <= inputs.chargingWindow;

  // === CÁLCULO COMPETIDOR (ICE, PHEV ou EV) ===
  let iceDailyCost = 0;
  let dailyLiters = 0;
  let litersPer100KmCity = 0;
  let litersPer100KmHighway = 0;
  let litersPer100KmAvg = 0;
  
  const competitorElectricRange = inputs.competitor.kmEletrico || 0;
  
  // Se o competidor tem autonomia elétrica E roda mais que ela
  if (competitorElectricRange > 0 && inputs.dailyKm > competitorElectricRange) {
    // Parte elétrica do competidor
    const electricKm = competitorElectricRange;
    // Estimativa: assumimos eficiência similar (ajustar se houver dados reais)
    const competitorKwhPerKm = kwhPerKm; // simplificação
    const electricEnergy = (electricKm * competitorKwhPerKm) / efficiency;
    const electricCost = electricEnergy * inputs.energyPriceKwh;
    
    // Parte combustão do competidor
    const combustionKm = inputs.dailyKm - competitorElectricRange;
    litersPer100KmCity = inputs.competitor.kmLCidade > 0 ? 100 / inputs.competitor.kmLCidade : 0;
    litersPer100KmHighway = inputs.competitor.kmLEstrada > 0 ? 100 / inputs.competitor.kmLEstrada : 0;
    litersPer100KmAvg = 
      (inputs.cityPercent / 100 * litersPer100KmCity) + 
      (inputs.highwayPercent / 100 * litersPer100KmHighway);
    dailyLiters = (combustionKm / 100) * litersPer100KmAvg;
    const combustionCost = dailyLiters * inputs.fuelPricePerLiter;
    
    iceDailyCost = electricCost + combustionCost;
  } else if (competitorElectricRange > 0 && inputs.dailyKm <= competitorElectricRange) {
    // Competidor roda 100% elétrico
    const electricEnergy = (inputs.dailyKm * kwhPerKm) / efficiency;
    iceDailyCost = electricEnergy * inputs.energyPriceKwh;
    dailyLiters = 0;
  } else {
    // Competidor 100% combustão
    litersPer100KmCity = inputs.competitor.kmLCidade > 0 ? 100 / inputs.competitor.kmLCidade : 0;
    litersPer100KmHighway = inputs.competitor.kmLEstrada > 0 ? 100 / inputs.competitor.kmLEstrada : 0;
    litersPer100KmAvg = 
      (inputs.cityPercent / 100 * litersPer100KmCity) + 
      (inputs.highwayPercent / 100 * litersPer100KmHighway);
    dailyLiters = (inputs.dailyKm / 100) * litersPer100KmAvg;
    iceDailyCost = dailyLiters * inputs.fuelPricePerLiter;
  }

  const yearlySavings = (iceDailyCost - evDailyCost) * 365;
  const evYearlyCost = evDailyCost * 365;
  const iceYearlyCost = iceDailyCost * 365;

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
      chargesFitsWindow,
      exceededElectricRange,
      extraKm,
      fuelLitersUsed
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
      yearly: yearlySavings
    },
    cumulativeCosts: {
      year1: { ev: evYearlyCost, ice: iceYearlyCost },
      year2: { ev: evYearlyCost * 2, ice: iceYearlyCost * 2 },
      year3: { ev: evYearlyCost * 3, ice: iceYearlyCost * 3 },
      year4: { ev: evYearlyCost * 4, ice: iceYearlyCost * 4 },
      year5: { ev: evYearlyCost * 5, ice: iceYearlyCost * 5 }
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
