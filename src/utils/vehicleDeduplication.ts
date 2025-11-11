import { CompetitorVehicle } from '@/data/competitorVehiclesAPI';

export interface VehicleGroup {
  baseModel: string;
  marca: string;
  versions: CompetitorVehicle[];
}

/**
 * Remove sufixos de versão do nome do modelo
 * Ex: "HAVAL H6 GS EV" -> "HAVAL H6"
 */
export function cleanModelName(modelo: string): string {
  // Remove sufixos comuns de versões
  const suffixes = [
    /\s+GS\s+EV$/i,
    /\s+TEC$/i,
    /\s+Icon$/i,
    /\s+Elite$/i,
    /\s+Premium$/i,
    /\s+Luxury$/i,
    /\s+Sport$/i,
    /\s+\d+\.\d+\s+\d+V$/i, // Ex: "1.6 16V"
    /\s+TFSI\s+e\s+S$/i,
    /\s+TFSI\s+e$/i,
    /\s+Hybrid$/i,
    /\s+Plug-in$/i,
  ];

  let cleaned = modelo.trim();
  suffixes.forEach(suffix => {
    cleaned = cleaned.replace(suffix, '');
  });

  return cleaned.trim();
}

/**
 * Agrupa veículos por nome base do modelo (sem versões)
 */
export function groupByModel(vehicles: CompetitorVehicle[]): VehicleGroup[] {
  const groups = new Map<string, VehicleGroup>();

  vehicles.forEach(vehicle => {
    const baseModel = cleanModelName(vehicle.modelo);
    const key = `${vehicle.marca}::${baseModel}`;

    if (!groups.has(key)) {
      groups.set(key, {
        baseModel,
        marca: vehicle.marca,
        versions: [],
      });
    }

    groups.get(key)!.versions.push(vehicle);
  });

  return Array.from(groups.values());
}

/**
 * Seleciona a melhor versão de um grupo de veículos
 * Prioridade: maior kmEletrico > maior consumo médio > primeiro da lista
 */
export function selectBestVersion(group: VehicleGroup): CompetitorVehicle {
  if (group.versions.length === 1) {
    return { ...group.versions[0], modelo: group.baseModel };
  }

  // Verificar se há diferenças nas especificações
  const firstVersion = group.versions[0];
  const allIdentical = group.versions.every(v =>
    v.kmLCidade === firstVersion.kmLCidade &&
    v.kmLEstrada === firstVersion.kmLEstrada &&
    (v.kmEletrico || 0) === (firstVersion.kmEletrico || 0)
  );

  if (allIdentical) {
    return { ...firstVersion, modelo: group.baseModel };
  }

  // Escolher versão com maior autonomia elétrica
  const withElectric = group.versions.filter(v => v.kmEletrico && v.kmEletrico > 0);
  if (withElectric.length > 0) {
    const best = withElectric.reduce((prev, current) =>
      (current.kmEletrico || 0) > (prev.kmEletrico || 0) ? current : prev
    );
    return { ...best, modelo: group.baseModel };
  }

  // Escolher versão com maior consumo médio
  const best = group.versions.reduce((prev, current) => {
    const prevAvg = (prev.kmLCidade + prev.kmLEstrada) / 2;
    const currentAvg = (current.kmLCidade + current.kmLEstrada) / 2;
    return currentAvg > prevAvg ? current : prev;
  });

  return { ...best, modelo: group.baseModel };
}

/**
 * Remove duplicatas de veículos, mantendo apenas a melhor versão de cada modelo
 */
export function deduplicateVehicles(vehicles: CompetitorVehicle[]): CompetitorVehicle[] {
  const groups = groupByModel(vehicles);
  return groups.map(selectBestVersion);
}
