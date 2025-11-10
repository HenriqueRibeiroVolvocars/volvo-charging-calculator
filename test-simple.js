// Teste Simples da API Supabase
// Execute com: node test-simple.js

// IMPORTANTE: Configure suas credenciais aqui
const SUPABASE_URL = 'SUA_URL_DO_SUPABASE_AQUI';
const SUPABASE_KEY = 'SUA_CHAVE_ANONIMA_AQUI';

async function testSupabase() {
  console.log('🚀 Testando API do Supabase...');
  console.log('URL:', SUPABASE_URL);
  console.log('Chave configurada:', !!SUPABASE_KEY);
  console.log('');

  // Verificar se as credenciais foram configuradas
  if (SUPABASE_URL === 'SUA_URL_DO_SUPABASE_AQUI' || SUPABASE_KEY === 'SUA_CHAVE_ANONIMA_AQUI') {
    console.log('❌ Configure suas credenciais no arquivo test-simple.js');
    console.log('   Edite as variáveis SUPABASE_URL e SUPABASE_KEY');
    return;
  }

  try {
    // Importar Supabase dinamicamente
    const { createClient } = await import('@supabase/supabase-js');
    const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

    console.log('✅ Cliente Supabase criado');

    // Teste básico: buscar dados
    console.log('🔍 Buscando dados da tabela inmetro_database...');
    const { data, error } = await supabase
      .from('inmetro_database')
      .select('*')
      .limit(3);

    if (error) {
      console.log('❌ Erro:', error.message);
      console.log('💡 Verifique se:');
      console.log('   - A tabela "inmetro_database" existe');
      console.log('   - Você tem permissão para acessar a tabela');
      console.log('   - A tabela tem dados');
    } else {
      console.log('✅ Sucesso!');
      console.log('📊 Registros encontrados:', data?.length || 0);
      
      if (data && data.length > 0) {
        console.log('🔍 Estrutura dos dados:');
        console.log('   Colunas:', Object.keys(data[0]).join(', '));
        console.log('   Primeiro registro:', JSON.stringify(data[0], null, 2));
      }
    }

  } catch (error) {
    console.log('💥 Erro:', error.message);
  }
}

testSupabase();
