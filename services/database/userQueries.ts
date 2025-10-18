import type { User } from "@/services/types/users";
import bcrypt from "bcryptjs";
import { update } from "./queries";
import { supabase } from "./supabaseClient";

export async function insertUser(values: Omit<User, "id">): Promise<User> {
  // Gera hash da senha
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(values.password, salt);

  values.password = hashedPassword;

  const { data, error } = await supabase
    .from("users")
    .insert(values)
    .select()
    .single();
  if (error) throw error;
  return data as User;
}

export async function getByEmail<T>(email: string): Promise<T | null> {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .maybeSingle();

  if (error) throw error;
  return data as T | null;
}

export async function existingUser<T>(
  email: string,
  password: string
): Promise<T | null> {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .maybeSingle();
  if (error) throw error;
  if (!data) return null;

  const senhaCorreta = bcrypt.compareSync(password, data.password);

  if (!senhaCorreta) {
    return null;
  }
  return data as T | null;
}

export async function updatePassword<T>(
  id: number,
  newPassword: string
): Promise<T | null> {
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(newPassword, salt);

  const data = await update("users", id, {password: hashedPassword});

  if (!data) {
    console.warn("Nenhum usuário encontrado com esse ID:", id);
    return null;
  }

  return data as T | null;
}
