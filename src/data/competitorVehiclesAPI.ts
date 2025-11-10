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
 * Variáveis de ambiente esperadas:
 *  - VITE_API_URL=https://sua-api.com/inmetro_database
 *  - VITE_API_KEY=sua_chave_aqui
 */
export async function fetchCompetitorVehicles(): Promise<CompetitorVehicle[]> {
  const apiUrl = import.meta.env.VITE_API_URL;
  const apiKey = import.meta.env.VITE_API_KEY;

  if (!apiUrl || !apiKey) {
    console.error('❌ Erro: Variáveis de ambiente ausentes.');
    console.error('Verifique se VITE_API_URL e VITE_API_KEY estão configuradas no .env');
    return [];
  }

  try {
    console.log('🔗 Buscando dados da API...');
    console.log('URL (base):', apiUrl);

    // Supabase REST requer query ?select=*
    const finalUrl = apiUrl.includes('select=')
      ? apiUrl
      : `${apiUrl}${apiUrl.includes('?') ? '&' : '?'}select=*`;

    const response = await fetch(finalUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        apikey: apiKey,
        Authorization: `Bearer ${apiKey}`,
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
      kmLCidade: vehicle.km_l_cidade || vehicle.kmLCidade || vehicle.km_l_city || vehicle.city_km_l || vehicle.cidade || 0,
      kmLEstrada: vehicle.km_l_estrada || vehicle.kmLEstrada || vehicle.km_l_highway || vehicle.highway_km_l || vehicle.estrada || 0,
      tipoCombustivel: vehicle.tipo_combustivel || vehicle.tipoCombustivel || vehicle.fuel_type || vehicle.combustivel || vehicle.tipo,
      kmEletrico: vehicle.km_eletrico || vehicle.kmEletrico || vehicle.electric_range || vehicle.autonomia_eletrica || undefined,
    }));

    console.log('✅ Dados processados:', mappedData);
    return mappedData;
  } catch (error) {
    console.error('❌ Erro ao buscar dados:', error);
    return [];
  }
}

/**
 * Função auxiliar para obter todos os veículos competidores.
 */
export async function getAllCompetitorVehicles(): Promise<CompetitorVehicle[]> {
  return await fetchCompetitorVehicles();
}