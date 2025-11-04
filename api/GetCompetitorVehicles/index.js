// backend/index.js
import express from "express";
import cors from "cors";
import { supabase } from "./supabaseClient.js";

const app = express();
app.use(cors());
app.use(express.json());

// Exemplo de rota GET para buscar dados do Supabase
app.get("/api/clientes", async (req, res) => {
  try {
    const { data, error } = await supabase.from("inmetro_database").select("*");
    if (error) throw error;
    res.json(data);
  } catch (err) {
    console.error("Erro ao buscar dados:", err.message);
    res.status(500).json({ erro: err.message });
  }
});

// Exemplo de rota POST para inserir dados
app.post("/api/clientes", async (req, res) => {
  try {
    const { nome, email } = req.body;
    const { data, error } = await supabase
      .from("inmetro_database")
      .insert([{ nome, email }])
      .select();
    if (error) throw error;
    res.json(data);
  } catch (err) {
    console.error("Erro ao inserir:", err.message);
    res.status(500).json({ erro: err.message });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`🚀 Servidor rodando na porta ${PORT}`));
