// Endpoint para Azure Static Web Apps
export default async function handler(req, res) {
  const apiUrl = process.env.VITE_API_URL;
  const apiKey = process.env.VITE_API_KEY;

  if (!apiUrl || !apiKey) {
    return res.status(500).json({ error: 'Variáveis de ambiente não configuradas.' });
  }

  try {
    const response = await fetch(apiUrl, {
      headers: { 'Authorization': `Bearer ${apiKey}` }
    });
    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao buscar dados da API externa.' });
  }
}
