import { UserContext } from "@/services/contexts/userContext";
import { decrementOrRemoveCart, getAllProductOfUser, upsertCart } from "@/services/database/cartQueries";
import { getAllProductsByCategorie } from "@/services/database/productQueries";
import { Carts } from "@/services/types/carts";
import { Products } from "@/services/types/products";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import React, { useContext, useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import estilos from "../../estilos/_stylesPadrao";

interface Item {
  id: number;
  nome: string;
  qtd: number;
}

export default function Componentes() {
  const user = useContext(UserContext);

  const { nome, id } = useLocalSearchParams<{
    nome?: string;
    id?: string;
  }>();

  const [productsAll, setProducts] = useState<Products[]>([]);
  const [carts, setCarts] = useState<Carts[]>([]);

  // Fila de atualizações para garantir que nenhuma requisição seja perdida
  const [updateQueue, setUpdateQueue] = useState<(() => Promise<any>)[]>([]);

  // Executa a primeira função da fila sempre que a fila muda
  useEffect(() => {
    if (updateQueue.length > 0) {
      const fn = updateQueue[0];
      fn().finally(() => setUpdateQueue((q) => q.slice(1)));
    }
  }, [updateQueue]);

  useEffect(() => {
    async function fetchCart() {
      if (user.user?.id) {
        const data = await getAllProductOfUser<Carts>(user.user.id);
        setCarts(data || []);
      }
    }
    fetchCart();
  }, [user.user?.id]);

  useEffect(() => {
    async function fetchData() {
      if (id) {
        const data = await getAllProductsByCategorie(id);
        if (data) {
          const produtosComQtd = (data as Products[]).map(produto => {
            const itemNoCarrinho = carts.find(c => c.product_id === produto.id);
            return {
              ...produto,
              available_amount: itemNoCarrinho ? itemNoCarrinho.amount : 0,
            };
          });
          setProducts(produtosComQtd);
        }
      }
    }
    fetchData();
  }, [id, carts]);

  // Função para adicionar à fila
  const queueUpdate = (fn: () => Promise<any>) => {
    setUpdateQueue((q) => [...q, fn]);
  };

  const aumentarQtd = (productId: number) => {
    if (!user.user?.id) return;

    // Atualiza localmente para UI imediata
    setProducts((lista) =>
      lista.map((item) =>
        item.id === productId
          ? { ...item, available_amount: item.available_amount + 1 }
          : item
      )
    );

    // Adiciona a requisição à fila
    queueUpdate(() => upsertCart(user.user!.id, productId, 1));
  };

  // Diminuir quantidade (-)
  const diminuirQtd = (productId: number) => {
    if (!user.user?.id) return;

    setProducts((lista) =>
      lista.map((item) =>
        item.id === productId && item.available_amount > 0
          ? { ...item, available_amount: item.available_amount - 1 }
          : item
      )
    );

    queueUpdate(() => decrementOrRemoveCart(user.user!.id, productId));
  };

  const removerItem = (id: number) => {
    setProducts((lista) =>
      lista.map((item) =>
        item.id === id ? { ...item, available_amount: 0 } : item
      )
    );
  };

  return (
    <ScrollView
      style={estilos.container}
      contentContainerStyle={{ paddingBottom: 20 }}
    >
      <Text style={estilos.titulo}>Componentes</Text>

      {productsAll.map((item) => (
        <View key={item.id} style={estilos.itemLista}>
          <View style={estilos.itemEsquerda}>
            <Text style={estilos.itemTexto}>{item.name}</Text>
          </View>

          <View style={estilos.botoesMaisMenosLixeira}>
            <Text style={estilos.itemQuantidade}>Qtd: {item.available_amount}</Text>

            <TouchableOpacity onPress={() => diminuirQtd(item.id)}>
              <Ionicons name="remove-circle" size={22} color="gray" />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => aumentarQtd(item.id)}>
              <Ionicons name="add-circle" size={22} color="gray" />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => removerItem(item.id)}>
              <Ionicons name="trash" size={22} color="red" />
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}
