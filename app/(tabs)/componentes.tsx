import { useCart } from "@/services/contexts/cartContext";
import { UserContext } from "@/services/contexts/userContext";
import { getAllProductsByCategorie } from "@/services/database/productQueries";
import { Products } from "@/services/types/products";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import React, { useContext, useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import styles from "../../styles/_stylesPadrao";

export default function Componentes() {
  const user = useContext(UserContext);
  const { cart, increase, decrease, remove, fetchCart } = useCart();

  const { nome, id } = useLocalSearchParams<{
    nome?: string;
    id?: string;
  }>();

  const [productsAll, setProducts] = useState<Products[]>([]);

  // 🔹 Buscar produtos da categoria
  useEffect(() => {
    async function fetchData() {
      if (id) {
        const data = await getAllProductsByCategorie(id);
        if (data) {
          setProducts(data as Products[]);
        }
      }
    }
    fetchData();
  }, [id]);

  // 🔹 Atualiza `available_amount` com base no carrinho global
  const getAmountInCart = (productId: number) => {
    const item = cart.find((c) => c.product_id === productId);
    return item ? item.amount : 0;
  };

  return (
    <ScrollView
      style={styles.containerMain}
      contentContainerStyle={styles.contentContainerCentered}
    >
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Componentes</Text>
      </View>

      {productsAll.map((item) => {
        const amount = getAmountInCart(item.id);
        return (
          <View key={item.id} style={styles.listItens}>
            <View>
              <Text style={styles.itemTexto}>{item.name}</Text>
            </View>

            <View style={styles.containerButtonsQuantity}>
              <Text style={styles.itemTexto}>Qtd: {amount}</Text>

              <View style={styles.buttonsCarts}>
                <TouchableOpacity onPress={() => decrease(item.id)}>
                  <Ionicons name="remove-circle" size={22} color="gray" />
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => increase(item.id)}
                >
                  <Ionicons name="add-circle" size={22} color="gray" />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => remove(item.id)}>
                  <Ionicons name="trash" size={22} color="red" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        );
      })}
    </ScrollView>
  );
}
