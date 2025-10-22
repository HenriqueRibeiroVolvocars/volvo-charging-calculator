# 🧪 Como Testar a API do Supabase

## Opção 1: Teste no Navegador (Mais Fácil)

1. **Abra o arquivo `test-api.html`** no seu navegador
2. **Configure suas credenciais:**
   - URL do Supabase (ex: `https://xxx.supabase.co`)
   - Chave Anônima do Supabase
3. **Clique em "Testar Conexão"**
4. **Veja os resultados** na tela

## Opção 2: Teste com Node.js

1. **Configure suas credenciais** no arquivo `test-simple.js`:
   ```javascript
   const SUPABASE_URL = 'https://seu-projeto.supabase.co';
   const SUPABASE_KEY = 'sua_chave_anonima_aqui';
   ```

2. **Execute o teste:**
   ```bash
   node test-simple.js
   ```

## Opção 3: Teste Completo (Node.js)

1. **Configure suas credenciais** no arquivo `test-api.js`
2. **Execute:**
   ```bash
   node test-api.js
   ```

## 📋 O que o teste verifica:

- ✅ **Conexão com Supabase**
- ✅ **Tabelas disponíveis**
- ✅ **Dados na tabela `competitor_vehicles`**
- ✅ **Estrutura dos dados**
- ✅ **Nomes das colunas**

## 🔧 Se der erro:

### Erro de conexão:
- Verifique se a URL e chave estão corretas
- Verifique se o projeto Supabase está ativo

### Tabela não encontrada:
- Crie a tabela `competitor_vehicles` no Supabase
- Ou use outro nome de tabela

### Sem dados:
- Insira dados na tabela
- Verifique as permissões da tabela

## 📊 Estrutura da tabela esperada:

```sql
CREATE TABLE competitor_vehicles (
  id SERIAL PRIMARY KEY,
  marca TEXT,
  modelo TEXT,
  km_l_cidade NUMERIC,
  km_l_estrada NUMERIC,
  tipo_combustivel TEXT
);
```

## 🚀 Próximos passos:

1. **Teste a API** com um dos métodos acima
2. **Configure o arquivo `.env`** no projeto principal
3. **Atualize o código** para usar a API real
