import { supabase } from "./supabaseClient.js";

module.exports = async function (context, req) {
  if (req.method === 'GET') {
    try {
      const { data, error } = await supabase.from("inmetro_database").select("*");
      if (error) throw error;
      context.res = {
        status: 200,
        body: data
      };
    } catch (err) {
      context.log("Erro ao buscar dados:", err.message);
      context.res = {
        status: 500,
        body: { erro: err.message }
      };
    }
  } else if (req.method === 'POST') {
    try {
      const { nome, email } = req.body;
      const { data, error } = await supabase
        .from("inmetro_database")
        .insert([{ nome, email }])
        .select();
      if (error) throw error;
      context.res = {
        status: 200,
        body: data
      };
    } catch (err) {
      context.log("Erro ao inserir:", err.message);
      context.res = {
        status: 500,
        body: { erro: err.message }
      };
    }
  } else {
    context.res = {
      status: 405,
      body: { erro: "Método não suportado" }
    };
  }
};
