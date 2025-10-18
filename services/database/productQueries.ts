import { supabase } from "./supabaseClient";


export async function getAllProductsByCategorie<T>(id: string): Promise<T[] | null> {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("category_id", Number(id));

  if (error) throw error;
  return data as T[] | null;
}
