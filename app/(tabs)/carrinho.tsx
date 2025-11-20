import { useCart } from "@/services/contexts/cartContext";
import { UserContext } from "@/services/contexts/userContext";
import { removeAllItensOfCart } from "@/services/database/cartQueries";
import { insertManyHistory } from "@/services/database/historyQueries";
import { getAll } from "@/services/database/queries";
import { Products } from "@/services/types/products";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useContext, useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import styles from "../../styles/_stylesPadrao";

export default function Carrinho() {
  const user = useContext(UserContext);

  // 🔹 Carrinho vindo do contexto global
  const { cart, increase, decrease, remove, fetchCart } = useCart();

  const [productsAll, setProducts] = useState<Products[]>([]);

  useEffect(() => {
    async function load() {
      const data = await getAll<Products>("products");
      setProducts(data);
    }
    load();
  }, []);

  async function confirmarCompra(userId: number) {
    if (cart.length === 0) {
      alert("Nenhum item no carrinho!");
      return;
    }

    const historicoData = cart.map((item) => ({
      user_id: userId,
      product_id: item.product_id,
      description: item.amount.toString(),
      status_id: 10,
      loan_duration: 7,
      date_loan: null,
      date_return: null,
      date_refused: null,
    }));

    const data = await insertManyHistory(historicoData);

    if (data) {
      await removeAllItensOfCart(userId); 
      await fetchCart();
      alert("Solicitado com sucesso!");
      router.replace("/home");
    } else {
      alert("Erro ao finalizar!");
    }
  }

  return (
    <ScrollView style={styles.containerMain}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Carrinho</Text>
      </View>

      <View style={styles.contentContainerCentered}>
        {cart.length === 0 ? (
          <Text style={{ textAlign: "center", color: "gray", marginTop: 20 }}>
            Nenhum item no carrinho
          </Text>
        ) : (
          cart.map((item) => {
            const product = productsAll.find((p) => p.id === item.product_id);
            return (
              <View key={item.id} style={styles.listItens}>
                <Text style={styles.itemTexto}>
                  {product?.name ?? "Produto desconhecido"} - Qtd: {item.amount}
                </Text>

                <View style={styles.buttonsCarts}>
                  {/* Diminuir */}
                  <TouchableOpacity
                    onPress={() => decrease(item.product_id)}
                    style={styles.buttonsMoreLess}
                  >
                    <Ionicons name="remove-circle" size={22} color="gray" />
                  </TouchableOpacity>

                  {/* Aumentar */}
                  <TouchableOpacity
                    onPress={() => increase(item.product_id)}
                    style={styles.buttonsMoreLess}
                  >
                    <Ionicons name="add-circle" size={22} color="gray" />
                  </TouchableOpacity>

                  {/* Remover */}
                  <TouchableOpacity
                    onPress={() => remove(item.product_id)}
                    style={styles.buttonTrash}
                  >
                    <Ionicons name="trash" size={15} color="white" />
                  </TouchableOpacity>
                </View>
              </View>
            );
          })
        )}

        {cart.length > 0 && (
          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={async () => {
              await confirmarCompra(user.user!.id);
              await fetchCart();
            }}
          >
            <Text style={styles.textButton}>Confirmar</Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
}
