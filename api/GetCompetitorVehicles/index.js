const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") }); // <-- carrega o .env da pasta atual
const { createClient } = require("@supabase/supabase-js");

module.exports = async function (context, req) {
  const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

  try {
    if (req.method === "GET") {
      const { data, error } = await supabase.from("inmetro_database").select("*");
      if (error) throw error;
      context.res = { status: 200, body: data };
    } 
    else if (req.method === "POST") {
      const { nome, valor } = req.body;
      const { data, error } = await supabase
        .from("inmetro_database")
        .insert([{ nome, valor }])
        .select();
      if (error) throw error;
      context.res = { status: 201, body: data };
    } 
    else {
      context.res = { status: 405, body: "Method Not Allowed" };
    }
  } catch (error) {
    context.log("Erro na função:", error.message);
    context.res = { status: 500, body: { error: error.message } };
  }
};
