-- Script para verificar a estrutura da tabela inmetro_database
-- Execute este script no SQL Editor do Supabase

-- 1. Verificar se a tabela existe
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name = 'inmetro_database';

-- 2. Verificar a estrutura das colunas
SELECT 
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_name = 'inmetro_database' 
AND table_schema = 'public'
ORDER BY ordinal_position;

-- 3. Contar quantos registros existem
SELECT COUNT(*) as total_registros FROM inmetro_database;

-- 4. Ver alguns exemplos de dados
SELECT * FROM inmetro_database LIMIT 3;

-- 5. Verificar se existem as colunas que precisamos
SELECT 
    CASE WHEN EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'inmetro_database' 
        AND column_name = 'marca'
    ) THEN '✅ marca existe' ELSE '❌ marca NÃO existe' END as marca,
    
    CASE WHEN EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'inmetro_database' 
        AND column_name = 'modelo'
    ) THEN '✅ modelo existe' ELSE '❌ modelo NÃO existe' END as modelo,
    
    CASE WHEN EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'inmetro_database' 
        AND column_name = 'km_l_cidade'
    ) THEN '✅ km_l_cidade existe' ELSE '❌ km_l_cidade NÃO existe' END as km_l_cidade,
    
    CASE WHEN EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'inmetro_database' 
        AND column_name = 'km_l_estrada'
    ) THEN '✅ km_l_estrada existe' ELSE '❌ km_l_estrada NÃO existe' END as km_l_estrada,
    
    CASE WHEN EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'inmetro_database' 
        AND column_name = 'tipo_combustivel'
    ) THEN '✅ tipo_combustivel existe' ELSE '❌ tipo_combustivel NÃO existe' END as tipo_combustivel;
