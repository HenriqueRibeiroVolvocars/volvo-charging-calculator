# 🗄️ Como Criar a Tabela no Supabase

## 📋 Passo a Passo:

### 1. **Acesse o Supabase Dashboard**
- Vá para [supabase.com](https://supabase.com)
- Faça login na sua conta
- Selecione seu projeto

### 2. **Abra o SQL Editor**
- No menu lateral, clique em **"SQL Editor"**
- Clique em **"New query"**

### 3. **Execute o Script SQL**
- Copie todo o conteúdo do arquivo `criar-tabela-supabase.sql`
- Cole no SQL Editor
- Clique em **"Run"** ou pressione **Ctrl+Enter**

### 4. **Verifique se Funcionou**
- Você deve ver mensagens de sucesso
- A última consulta deve mostrar os dados inseridos

## 🔍 **O que o script faz:**

1. **Cria a tabela** `competitor_vehicles` com as colunas:
   - `id` (chave primária)
   - `marca` (texto)
   - `modelo` (texto)
   - `km_l_cidade` (número)
   - `km_l_estrada` (número)
   - `tipo_combustivel` (texto)
   - `created_at` e `updated_at` (timestamps)

2. **Insere 45 veículos** de exemplo com dados reais

3. **Verifica** se os dados foram inseridos corretamente

## ✅ **Após executar o script:**

1. **Teste novamente** com o arquivo `test-api.html`
2. **Configure o arquivo `.env`** no projeto principal:
   ```env
   VITE_SUPABASE_URL=sua_url_aqui
   VITE_SUPABASE_ANON_KEY=sua_chave_aqui
   ```
3. **Teste a aplicação** - agora deve funcionar com dados reais!

## 🚨 **Se der erro:**

- **Erro de permissão:** Verifique se você tem acesso de administrador ao projeto
- **Erro de sintaxe:** Copie o script novamente, pode ter havido problema na cópia
- **Tabela já existe:** O script usa `CREATE TABLE IF NOT EXISTS`, então é seguro executar novamente

## 🎯 **Próximo passo:**

Após criar a tabela, teste novamente com o `test-api.html` - agora deve funcionar! 🚀
