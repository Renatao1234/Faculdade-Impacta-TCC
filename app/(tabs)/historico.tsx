import React, { useState } from "react";
import { ScrollView, Text, View } from "react-native";
import estilos from "../../estilos/_stylesPadrao";

interface HistoricoItem {
  nome: string;
  qtd: number;
  data: string;
  status: "D" | "P"; // D = Devolvido, P = Pendente
}

export default function Historico() {
  const [itens] = useState<HistoricoItem[]>([
    { nome: "Item 1", qtd: 1, data: "12/05/2025", status: "D" },
    { nome: "Item 8", qtd: 2, data: "12/05/2025", status: "D" },
    { nome: "Item 6", qtd: 1, data: "-", status: "P" },
    { nome: "Item 3", qtd: 1, data: "-", status: "P" },
    { nome: "Item 11", qtd: 1, data: "-", status: "P" },
    { nome: "Item 78", qtd: 1, data: "12/05/2025", status: "D" },
    { nome: "Item 6", qtd: 6, data: "12/05/2025", status: "D" },
  ]);

  return (
    <ScrollView
      style={estilos.container}
      contentContainerStyle={{ paddingBottom: 20 }}
    >
      <Text style={estilos.titulo}>Histórico</Text>

      {/* Legenda */}
      <View style={estilos.legenda}>
        <Text style={{ marginRight: 10 }}>
          Devolvido(D) - <Text style={{ backgroundColor: "skyblue" }}>Devolvido(D)</Text>
        </Text>
        <Text>
          Pendente(P) - <Text style={{ backgroundColor: "salmon" }}>Pendente(P)</Text>
        </Text>
      </View>

      {/* Lista de Itens */}
      {itens.map((item, indice) => (
        <View
          key={indice}
          style={{
            backgroundColor: item.status === "D" ? "skyblue" : "salmon",
            marginVertical: 5,
            padding: 10,
            borderRadius: 8,
          }}
        >
          <Text>
            {item.nome} - Qtd: {item.qtd} - Data: {item.data} - {item.status}
          </Text>
        </View>
      ))}
    </ScrollView>
  );
}
