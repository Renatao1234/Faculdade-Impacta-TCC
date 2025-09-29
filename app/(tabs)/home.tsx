import { useRouter } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import estilos from "../../estilos/_stylesPadrao"; // importa os estilos

export default function Home() {
  const router = useRouter();

  return (
    <View style={estilos.fundo}>
      {/* Topo da página */}
      <View style={estilos.topoPagina}>
        
        {/* Logo no canto esquerdo */}
        <TouchableOpacity 
          onPress={() => router.push("/home")}
        >
          <Image
            source={require("../../assets/images/logo.png")}
            style={estilos.logo}
          />
        </TouchableOpacity>

        {/* Avatar no canto direito */}
        <TouchableOpacity 
          onPress={() => router.push("/usuario")}
        >
          <Image
            source={require("../../assets/images/avatar.png")}
            style={estilos.avatar}
          />
        </TouchableOpacity>
      </View>

      {/* Título */}
      <Text style={estilos.titulo}>Home</Text>

      {/* grade de botões */}
      <View style={estilos.grade}>
        <TouchableOpacity
          style={estilos.categoria_home}
          onPress={() => router.push("/usuario")}
        >
          <Image
            source={require("../../assets/images/usuario.png")}
            style={estilos.icone}
          />
          <Text style={estilos.categoriaTexto_home}>Usuário</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={estilos.categoria_home}
          onPress={() => router.push("/historico")}
        >
          <Image
            source={require("../../assets/images/historico.png")}
            style={estilos.icone}
          />
          <Text style={estilos.categoriaTexto_home}>Histórico</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={estilos.categoria_home}
          onPress={() => router.push("/categorias")}
        >
          <Image
            source={require("../../assets/images/categorias.png")}
            style={estilos.icone}
          />
          <Text style={estilos.categoriaTexto_home}>Categorias</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={estilos.categoria_home}
          onPress={() => router.push("/carrinho")}
        >
          <Image
            source={require("../../assets/images/carrinho.png")}
            style={estilos.icone}
          />
          <Text style={estilos.categoriaTexto_home}>Carrinho</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
