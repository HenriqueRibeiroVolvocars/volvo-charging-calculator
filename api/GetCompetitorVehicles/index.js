// api/GetCompetitorVehicles/index.js (corrigido)
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

export default async function (context, req) {
  const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

  const { data, error } = await supabase.from("competitor_vehicles").select("*");

  if (error) {
    context.res = {
      status: 500,
      body: `Erro: ${error.message}`,
    };
    return;
  }

  context.res = {
    status: 200,
    body: data,
  };
}
