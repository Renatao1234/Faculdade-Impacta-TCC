import { getAll } from "@/services/database/queries";
import { Categories } from "@/services/types/categories";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import estilos from "../../estilos/_stylesPadrao";

interface Categoria {
  nome: string;
  imagem?: string;
}
{/*Exemplos de categoria*/}
export default function Categorias() {

  const [categoreisAll, setCategories] = useState<Categories[]>([]);

  useEffect(() => {
    async function fetchData() {
      const data = await getAll("categories");
      // console.log("Dados retornados do banco:", data); // <-- Adicione isto

      if (data) setCategories(data as Categories[]);
    }
    fetchData();
  }, []);

  return (
    <ScrollView
      style={estilos.container}
      contentContainerStyle={{ alignItems: "center", paddingBottom: 10 }}
    >
      <Text style={estilos.titulo}>Categorias</Text>

      {categoreisAll.map((categoria, indice) => (
        <TouchableOpacity
          key={indice}
          style={estilos.categoria}
          onPress={() =>
            router.push({
              pathname: "/componentes",
              params: { nome: categoria.name, id: categoria.id.toString() },
            })
          }
        >
          <View style={estilos.categoriaSemImagem}>
              <Text style={estilos.categoriaSemImagemTexto}>
                {categoria.name}
              </Text>
            </View>
          {/* {categoria.description ? (
            <Image
              source={{ uri: categoria.description }}
              style={estilos.imagemCategoria}
              resizeMode="contain"
            />
          ) : (
            
          )} */}
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}
