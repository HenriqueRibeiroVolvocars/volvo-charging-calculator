export interface CompetitorVehicle {
  marca: string;
  modelo: string;
  kmLCidade: number;
  kmLEstrada: number;
  tipoCombustivel: string;
}

/**
 * Função para buscar dados de veículos competidores via backend Azure
 *
 * Esta função consome a API Azure que atua como proxy seguro,
 * protegendo as credenciais do Supabase no backend.
 */
export async function fetchCompetitorVehicles(): Promise<CompetitorVehicle[]> {
  // URL do backend Azure Function
  const backendUrl = 'https://api-volvo-homecharging-dweqdpaecqc5e6f9.centralus-01.azurewebsites.net';
  const apiUrl = `${backendUrl}/api/clientes`;

  try {
    console.log('🔗 Buscando dados da API backend...');
    console.log('URL:', apiUrl);

    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      console.error('Erro na resposta da API:', response.status, response.statusText);
      throw new Error(`Erro ao buscar dados (${response.status})`);
    }

    const data = await response.json();
    console.log('📦 Dados recebidos da API:', data);

    if (!Array.isArray(data)) {
      console.warn('⚠️ A resposta da API não é um array:', data);
      return [];
    }

    // Mapeia os dados retornados para o formato padrão
    const mappedData: CompetitorVehicle[] = data.map((vehicle: any) => ({
      marca: vehicle.marca || vehicle.Marca || vehicle.brand,
      modelo: vehicle.modelo || vehicle.Modelo || vehicle.model,
      kmLCidade: parseFloat(vehicle.kmLCidade || vehicle['Km/L Cidade'] || vehicle.cityKmL || 0),
      kmLEstrada: parseFloat(vehicle.kmLEstrada || vehicle['Km/L Estrada'] || vehicle.highwayKmL || 0),
      tipoCombustivel: vehicle.tipoCombustivel || vehicle['Tipo Combustível'] || vehicle.fuelType || 'Gasolina',
    }));

    console.log('✅ Dados mapeados com sucesso:', mappedData.length, 'veículos');
    return mappedData;
  } catch (error) {
    console.error('❌ Erro ao buscar dados da API:', error);
    return [];
  }
}

// Função auxiliar para obter um veículo específico
export function getCompetitorVehicle(marca: string, modelo: string, vehicles: CompetitorVehicle[]): CompetitorVehicle | undefined {
  return vehicles.find(v => v.marca === marca && v.modelo === modelo);
}
