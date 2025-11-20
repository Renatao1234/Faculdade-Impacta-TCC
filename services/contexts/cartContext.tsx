import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { decrementOrRemoveCart, getAllProductOfUser, removeItemOfCart, upsertCart } from "../database/cartQueries";
import { Carts } from "../types/carts";
import { UserContext } from "./userContext";

type CartContextType = {
    cart: Carts[];
    fetchCart: () => void;
    increase: (productId: number) => Promise<void>;
    decrease: (productId: number) => Promise<void>;
    remove: (productId: number) => Promise<void>;
};

const CartContext = createContext<CartContextType | null>(null);

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const user = useContext(UserContext);
    const [cart, setCart] = useState<Carts[]>([]);

    const fetchCart = async () => {
        if (!user.user?.id) return;
        const data = await getAllProductOfUser<Carts>(user.user.id);
        setCart(data || []);
    };

    useEffect(() => {
        fetchCart();
    }, [user.user?.id]);

    async function increase(productId: number) {
        if (!user.user?.id) return;
        await upsertCart(user.user.id, productId, 1);
        fetchCart();
    }

    async function decrease(productId: number) {
        if (!user.user?.id) return;
        await decrementOrRemoveCart(user.user.id, productId);
        fetchCart();
    }

    async function remove(productId: number) {
        if (!user.user?.id) return;
        await removeItemOfCart(user.user.id, productId);
        fetchCart();
    }

    return (
        <CartContext.Provider value={{ cart, fetchCart, increase, decrease, remove }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const ctx = useContext(CartContext);
    if (!ctx) throw new Error("useCart must be inside CartProvider");
    return ctx;
};
