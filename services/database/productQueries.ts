import { Products } from "../types/products";
import { ProductWithCategory } from "../types/productWithCategory";
import { getAll, getById, update } from "./queries";
import { supabase } from "./supabaseClient";

export async function getAllProducts<T>(): Promise<ProductWithCategory[] | null> {
  const { data, error } = await supabase
    .from("products")
    .select(`
      *,
      categories (
        name
      )
    `)
    .eq("status_id", 4)
    .order("category_id", { ascending: true });

  if (error) throw error;
  return data;
}

export async function getAllProductsByCategorie<T>(id: string): Promise<T[] | null> {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("category_id", Number(id))
    .eq("status_id", 4)
    .gt("available_amount", 0);

  if (error) throw error;
  return data as T[] | null;
}

export async function updateQuantityProduct<T>(
  id: number,
  quantity: number,
  columnQuantity: string,
): Promise<T | null> {

  let product: Products | null = null;

  try {
    product = await getById<Products>("products", id);
  } catch (error) {
    console.error("Erro ao buscar produto:", error);
    return null;
  }

  if (!product) {
    console.warn(`Produto com ID ${id} não encontrado.`);
    return null;
  }

  if ((product.available_amount - quantity) < 0) {
    console.warn(`Quantidade insuficiente para o produto ID ${id}.`);
    return null;
  }

  try {
    const data = await update("products", id, {
      available_amount: product.available_amount - quantity,
    });

    if (!data) {
      console.warn(`Erro ao atualizar quantidade do produto ID ${id}.`);
      return null;
    }

    return data as T;
  } catch (error) {
    console.error("Erro ao atualizar produto:", error);
    return null;
  }
}


export async function randomizeProductQuantities() {
  try {
    const products = await getAll<Products>("products");
    if (!products || products.length === 0) {
      console.warn("Nenhum produto encontrado para atualizar.");
      return;
    }

    for (const product of products) {
      const randomQuantity = Math.floor(Math.random() * 300) + 1;
      const randomPosition = Math.floor(Math.random() * 36) + 1;
      await update("products", product.id, { available_amount: randomQuantity, status_id: 4, position_id: randomPosition});
      console.log(`Produto ${product.id} atualizado para ${randomQuantity}`);
    }

    console.log("✅ Quantidades atualizadas com sucesso!");
  } catch (error) {
    console.error("Erro ao atualizar quantidades:", error);
  }
}
