import { supabase } from "./supabaseClient";

export async function getAll<T>(table: string): Promise<T[]> {
  const { data, error } = await supabase.from(table).select("*");
  if (error) throw error;
  return data as T[];
}

export async function getById<T>(table: string, id: number): Promise<T | null> {
  const { data, error } = await supabase.from(table).select("*").eq("id", id).single();
  if (error) throw error;
  return data as T;
}

export async function insert<T>(table: string, values: Partial<T>): Promise<T> {
  const { data, error } = await supabase.from(table).insert(values).select().single();
  if (error) throw error;
  return data as T;
}

export async function update<T>(table: string, id: number, values: Partial<T>): Promise<T> {
  const { data, error } = await supabase.from(table).update(values).eq("id", id).select().single();
  if (error) throw error;
  return data as T;
}

export async function remove(table: string, id: number): Promise<void> {
  const { error } = await supabase.from(table).delete().eq("id", id);
  if (error) throw error;
}