import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import estilos from "../../estilos/_stylesPadrao";

interface Item {
  id: number;
  nome: string;
  qtd: number;
}

export default function Componentes() {
  const [itens, setItens] = useState<Item[]>([
    { id: 1, nome: "Item 1", qtd: 1 },
    { id: 2, nome: "Item 2", qtd: 1 },
    { id: 3, nome: "Item 3", qtd: 2 },
    { id: 4, nome: "Item 4", qtd: 1 },
  ]);

  const aumentarQtd = (id: number) => {
    setItens((lista) =>
      lista.map((item) =>
        item.id === id ? { ...item, qtd: item.qtd + 1 } : item
      )
    );
  };

  const diminuirQtd = (id: number) => {
    setItens((lista) =>
      lista.map((item) =>
        item.id === id && item.qtd > 0
          ? { ...item, qtd: item.qtd - 1 }
          : item
      )
    );
  };

  const removerItem = (id: number) => {
    setItens((lista) => lista.filter((item) => item.id !== id));
  };

  return (
    <ScrollView
      style={estilos.container}
      contentContainerStyle={{ paddingBottom: 20 }}
    >
      <Text style={estilos.titulo}>Componentes</Text>

      {itens.map((item) => (
        <View key={item.id} style={estilos.itemLista}>
          <View style={estilos.itemEsquerda}>
            <Text style={estilos.itemTexto}>{item.nome}</Text>
          </View>

          <View style={estilos.botoesMaisMenosLixeira}>
            <Text style={estilos.itemQuantidade}>Qtd: {item.qtd}</Text>

            {/* Botão - */}
            <TouchableOpacity onPress={() => diminuirQtd(item.id)}>
              <Ionicons name="remove-circle" size={22} color="gray" />
            </TouchableOpacity>

            {/* Botão + */}
            <TouchableOpacity onPress={() => aumentarQtd(item.id)}>
              <Ionicons name="add-circle" size={22} color="gray" />
            </TouchableOpacity>

            {/* Botão Lixeira */}
            <TouchableOpacity onPress={() => removerItem(item.id)}>
              <Ionicons name="trash" size={22} color="red" />
            </TouchableOpacity>
          </View>
        </View>
      ))}

      <TouchableOpacity style={estilos.botaoPrincipal}>
        <Text style={estilos.textoBotao}>Adicionar ao Carrinho</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
