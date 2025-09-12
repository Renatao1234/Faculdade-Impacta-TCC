import { supabase } from "./supabaseClient";

export async function getByEmail<T>(table: string, email: string): Promise<T | null> {
  const { data, error } = await supabase
    .from(table)
    .select("*")
    .eq("email", email)
    .maybeSingle(); 

  if (error) throw error;
  return data as T | null;
}