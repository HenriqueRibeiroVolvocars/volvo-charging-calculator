export interface CompetitorVehicle {
  marca: string;
  modelo: string;
  kmLCidade: number;
  kmLEstrada: number;
  tipoCombustivel: string;
  kmEletrico?: number; // Autonomia elétrica em km (para híbridos e elétricos)
}

/**
 * Função para buscar dados de veículos competidores
 * Variável de ambiente esperada:
 *  - VITE_API_URL=https://sua-api.com/inmetro_database
 */
export async function fetchCompetitorVehicles(): Promise<CompetitorVehicle[]> {
  const apiUrl = import.meta.env.VITE_API_URL;

  if (!apiUrl) {
    console.error('❌ VITE_API_URL não configurada');
    return [];
  }

  try {
    const response = await fetch(apiUrl); // 🔑 chave já vem na URL

    if (!response.ok) {
      throw new Error(`Erro ao buscar dados (${response.status})`);
    }

    const json = await response.json();

    const data = json?.ResultSets?.Table1;
    if (!Array.isArray(data)) return [];

    return data.map((vehicle: any) => ({
      marca: vehicle.Marca,
      modelo: `${vehicle.Modelo} ${vehicle.Versao ?? ''}`.trim(),
      kmLCidade: Number(vehicle.cidade) || 0,
      kmLEstrada: Number(vehicle.estrada) || 0,
      tipoCombustivel: vehicle.tipo,
      kmEletrico: vehicle.km_eletrico ?? undefined,
    }));
  } catch (error) {
    console.error('❌ Erro ao buscar dados:', error);
    return [];
  }
}

/**
 * Função auxiliar para obter todos os veículos competidores.
 */
export async function getAllCompetitorVehicles(): Promise<CompetitorVehicle[]> {
  return fetchCompetitorVehicles();
}
