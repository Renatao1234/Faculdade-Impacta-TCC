import { router } from "expo-router";
import React from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import estilos from "../../estilos/_stylesPadrao";

interface Categoria {
  nome: string;
  imagem?: string;
}
{/*Exemplos de categoria*/}
export default function Categorias() {
  const categorias: Categoria[] = [
    { nome: "Eletrônicos", imagem: "https://via.placeholder.com/150/0000FF/FFFFFF?text=Eletrônicos" },
    { nome: "Roupas", imagem: "https://via.placeholder.com/150/FF0000/FFFFFF?text=Roupas" },
    { nome: "Livros" },
    { nome: "Brinquedos", imagem: "https://via.placeholder.com/150/00FF00/FFFFFF?text=Brinquedos" },
    { nome: "Esportes" },
  ];

  return (
    <ScrollView
      style={estilos.container}
      contentContainerStyle={{ alignItems: "center", paddingBottom: 10 }}
    >
      <Text style={estilos.titulo}>Categorias</Text>

      {categorias.map((categoria, indice) => (
        <TouchableOpacity
          key={indice}
          style={estilos.categoria}
          onPress={() =>
            router.push({
              pathname: "/componentes",
              params: { nome: categoria.nome, imagem: categoria.imagem },
            })
          }
        >
          {categoria.imagem ? (
            <Image
              source={{ uri: categoria.imagem }}
              style={estilos.imagemCategoria}
              resizeMode="contain"
            />
          ) : (
            <View style={estilos.categoriaSemImagem}>
              <Text style={estilos.categoriaSemImagemTexto}>
                {categoria.nome}
              </Text>
            </View>
          )}
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}
