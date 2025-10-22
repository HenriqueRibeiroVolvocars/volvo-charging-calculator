// Teste da API do Supabase
// Execute com: node test-api.js

import { createClient } from '@supabase/supabase-js';

// Configure suas credenciais aqui
const supabaseUrl = 'SUA_URL_DO_SUPABASE_AQUI';
const supabaseKey = 'SUA_CHAVE_ANONIMA_AQUI';

// Criar cliente Supabase
const supabase = createClient(supabaseUrl, supabaseKey);

async function testSupabaseAPI() {
  console.log('🚀 Iniciando teste da API do Supabase...');
  console.log('URL:', supabaseUrl);
  console.log('Chave configurada:', !!supabaseKey);
  console.log('');

  try {
    // Teste 1: Listar todas as tabelas
    console.log('📋 Teste 1: Listando tabelas...');
    const { data: tables, error: tablesError } = await supabase
      .from('information_schema.tables')
      .select('table_name')
      .eq('table_schema', 'public');
    
    if (tablesError) {
      console.log('❌ Erro ao listar tabelas:', tablesError.message);
    } else {
      console.log('✅ Tabelas encontradas:', tables?.map(t => t.table_name));
    }
    console.log('');

    // Teste 2: Buscar dados da tabela inmetro_database
    console.log('🚗 Teste 2: Buscando dados da tabela inmetro_database...');
    const { data: vehicles, error: vehiclesError } = await supabase
      .from('inmetro_database')
      .select('*')
      .limit(5); // Limita a 5 registros para teste
    
    if (vehiclesError) {
      console.log('❌ Erro ao buscar veículos:', vehiclesError.message);
      console.log('💡 Verifique se a tabela "inmetro_database" existe');
    } else {
      console.log('✅ Dados encontrados:', vehicles?.length || 0, 'registros');
      if (vehicles && vehicles.length > 0) {
        console.log('📊 Primeiro registro:', vehicles[0]);
        console.log('🔍 Estrutura dos dados:');
        console.log('   - Colunas disponíveis:', Object.keys(vehicles[0]));
      }
    }
    console.log('');

    // Teste 3: Testar diferentes nomes de tabela
    console.log('🔍 Teste 3: Testando diferentes nomes de tabela...');
    const possibleTableNames = [
      'inmetro_database',
      'competitor_vehicles',
      'competitorVehicles', 
      'vehicles',
      'carros',
      'competitors'
    ];

    for (const tableName of possibleTableNames) {
      console.log(`   Testando tabela: ${tableName}`);
      const { data, error } = await supabase
        .from(tableName)
        .select('*')
        .limit(1);
      
      if (!error && data && data.length > 0) {
        console.log(`   ✅ Tabela "${tableName}" encontrada!`);
        console.log(`   📊 Colunas:`, Object.keys(data[0]));
        break;
      } else {
        console.log(`   ❌ Tabela "${tableName}" não encontrada`);
      }
    }
    console.log('');

    // Teste 4: Verificar estrutura de dados
    if (vehicles && vehicles.length > 0) {
      console.log('🔧 Teste 4: Verificando estrutura de dados...');
      const sample = vehicles[0];
      const requiredFields = ['marca', 'modelo', 'km_l_cidade', 'km_l_estrada', 'tipo_combustivel'];
      
      console.log('   Campos obrigatórios vs disponíveis:');
      requiredFields.forEach(field => {
        const hasField = sample.hasOwnProperty(field);
        console.log(`   ${hasField ? '✅' : '❌'} ${field}: ${hasField ? 'Encontrado' : 'Não encontrado'}`);
        if (hasField) {
          console.log(`      Valor: ${sample[field]}`);
        }
      });
    }

  } catch (error) {
    console.error('💥 Erro geral:', error.message);
  }

  console.log('');
  console.log('🏁 Teste concluído!');
}

// Executar teste
testSupabaseAPI();
