import { useRouter } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import styles from "../../estilos/_stylesPadrao"; // importa os estilos

export default function Home() {
  const router = useRouter();

  return (
    <View style={styles.fundo}>
      {/* Topo da página */}
      <View style={styles.topoPagina}>
        {/* Logo no canto esquerdo */}
        <Image
          source={require("../../assets/images/logo.png")}
          style={styles.logo}
        />

        {/* Avatar no canto direito */}
        <TouchableOpacity onPress={() => router.push("/avatar")}>
          <Image
            source={require("../../assets/images/avatar.png")}
            style={styles.avatar}
          />
        </TouchableOpacity>
      </View>

      {/* Título */}
      <Text style={styles.titulo}>Home</Text>

      {/* grade de botões */}
      <View style={styles.grade}>
        <TouchableOpacity
          style={styles.categoria}
          onPress={() => router.push("/usuario")}
        >
          <Image
            source={require("../../assets/images/usuario.png")}
            style={styles.icone}
          />
          <Text style={styles.categoriaTexto}>Usuário</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.categoria}
          onPress={() => router.push("/historico")}
        >
          <Image
            source={require("../../assets/images/historico.png")}
            style={styles.icone}
          />
          <Text style={styles.categoriaTexto}>Histórico</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.categoria}
          onPress={() => router.push("/categorias")}
        >
          <Image
            source={require("../../assets/images/categorias.png")}
            style={styles.icone}
          />
          <Text style={styles.categoriaTexto}>Categorias</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.categoria}
          onPress={() => router.push("/carrinho")}
        >
          <Image
            source={require("../../assets/images/carrinho.png")}
            style={styles.icone}
          />
          <Text style={styles.categoriaTexto}>Carrinho</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
