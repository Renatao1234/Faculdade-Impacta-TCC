import { Carts } from "../types/carts";
import { insert, remove, update } from "./queries";
import { supabase } from "./supabaseClient";


export async function getAllProductOfUser<Carts>(userId: number): Promise<Carts[] | null> {
    const { data, error } = await supabase
        .from("carts")
        .select("*")
        .eq("user_id", userId);

    if (error) throw error;
    return data as Carts[] | null;
}

export async function getProductOfUser<Carts>(userId: number, productId: number): Promise<Carts | null> {
    const { data, error } = await supabase
        .from("carts")
        .select("*")
        .eq("user_id", userId)
        .eq("product_id", productId)
        .maybeSingle();

    if (error) throw error;
    return data as Carts | null;
}

export async function upsertCart(userId: number, productId: number, quantity = 1) {
    try {
        const existingItem = await getProductOfUser<Carts>(userId, productId);

        if (existingItem) {
            try {
                const data = await update<Carts>("carts", existingItem.id, { amount: existingItem.amount + quantity });

                if (!data) {
                    console.warn(`Erro ao atualizar (+) quantidade do carrinho ID ${existingItem.id}.`);
                    return null;
                }
                return data;
            } catch (error) {
                console.error("Erro ao atualizar (+) carrinho:", error);
                return null;
            }
        } else {
            try {
                const insertCart = await insert<Carts>("carts", { user_id: userId, product_id: productId, amount: quantity });
                return insertCart;
            } catch (error) {
                console.error("Erro em inserir um registro do carrinho:", error);
                return null;
            }
        }
    } catch (err) {
        console.error("Erro em getProductOfUser (+):", err);
        return null;
    }
}

export async function decrementOrRemoveCart(userId: number, productId: number) {
    try {
        const existingItem = await getProductOfUser<Carts>(userId, productId);

        if (existingItem) {
            if (existingItem.amount > 1) {
                try {
                    const data = await update<Carts>("carts", existingItem.id, { amount: existingItem.amount - 1 });
                    if (!data) {
                        console.warn(`Erro ao atualizar (-) quantidade do carrinho ID ${existingItem.id}.`);
                        return null;
                    }
                    return data;
                } catch (error) {
                    console.error("Erro ao atualizar (-) carrinho:", error);
                    return null;
                }
            } else {
                try {
                    return await remove("carts", existingItem.id);
                } catch (error) {
                    console.error("Erro em deletar um registro do carrinho:", error);
                    return null;
                }
            }
        }
    } catch (err) {
        console.error("Erro em getProductOfUser (-):", err);
        return null;
    }
}
