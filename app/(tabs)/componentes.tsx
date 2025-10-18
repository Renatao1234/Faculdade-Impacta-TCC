import { getAllProductsByCategorie } from "@/services/database/productQueries";
import { Products } from "@/services/types/products";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import estilos from "../../estilos/_stylesPadrao";

interface Item {
  id: number;
  nome: string;
  qtd: number;
}

export default function Componentes() {
  const { nome, id } = useLocalSearchParams<{
    nome?: string;
    id?: string;
  }>();

  const [productsAll, setProducts] = useState<Products[]>([]);

  useEffect(() => {
    async function fetchData() {
      if (id) {
        const data = await getAllProductsByCategorie(id);
        console.log("Dados retornados do banco:", data);

        if (data) setProducts(data as Products[]);
      }
    }

    fetchData();
  }, [id]);

  // const aumentarQtd = (id: number) => {
  //   setItens((lista) =>
  //     lista.map((item) =>
  //       item.id === id ? { ...item, qtd: item.qtd + 1 } : item
  //     )
  //   );
  // };

  // const diminuirQtd = (id: number) => {
  //   setItens((lista) =>
  //     lista.map((item) =>
  //       item.id === id && item.qtd > 0
  //         ? { ...item, qtd: item.qtd - 1 }
  //         : item
  //     )
  //   );
  // };

  // const removerItem = (id: number) => {
  //   setItens((lista) => lista.filter((item) => item.id !== id));
  // };

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
            <Text style={estilos.itemQuantidade}>Qtd: {item.category_id}</Text>

            {/* <TouchableOpacity onPress={() => diminuirQtd(item.id)}>
              <Ionicons name="remove-circle" size={22} color="gray" />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => aumentarQtd(item.id)}>
              <Ionicons name="add-circle" size={22} color="gray" />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => removerItem(item.id)}>
              <Ionicons name="trash" size={22} color="red" />
            </TouchableOpacity> */}
          </View>
        </View>
      ))}

      <TouchableOpacity style={estilos.botaoPrincipal}>
        <Text style={estilos.textoBotao}>Adicionar ao Carrinho</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
