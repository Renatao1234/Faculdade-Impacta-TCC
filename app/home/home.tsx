import { useRouter } from "expo-router";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

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
            style={styles.icon}
          />
          <Text style={styles.categoriaTexto}>Usuário</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.categoria}
          onPress={() => router.push("/historico")}
        >
          <Image
            source={require("../../assets/images/historico.png")}
            style={styles.icon}
          />
          <Text style={styles.categoriaTexto}>Histórico</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.categoria}
          onPress={() => router.push("/categorias")}
        >
          <Image
            source={require("../../assets/images/categorias.png")}
            style={styles.icon}
          />
          <Text style={styles.categoriaTexto}>Categorias</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.categoria}
          onPress={() => router.push("/carrinho")}
        >
          <Image
            source={require("../../assets/images/carrinho.png")}
            style={styles.icon}
          />
          <Text style={styles.categoriaTexto}>Carrinho</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  fundo: {
    flex: 1,
    backgroundColor: "#0b1030", // fundo azul escuro
    padding: 20,
  },
  topoPagina: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
  },
  logo: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  titulo: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginVertical: 20,
  },
  grade: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 20,
  },
  categoria: {
    backgroundColor: "#fff",
    borderRadius: 10,
    width: "47%",
    aspectRatio: 1, // quadrado
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    elevation: 3, // sombra Android
    shadowColor: "#000", // sombra iOS
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
  },
  categoriaTexto: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: "500",
    color: "#000",
  },
  icon: {
    width: 150,
    height: 140,
    resizeMode: "contain",
    borderRadius: 10,
  },
});
