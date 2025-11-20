import { UserContext } from "@/services/contexts/userContext";
import styles from "@/styles/_stylesPadrao";
import { useRouter } from "expo-router";
import React, { useContext } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

export default function Home() {
  const router = useRouter();
  const { user } = useContext(UserContext);

  const cards = [
    { title: "Usuário", icon: require("../../assets/images/usuario.png"), route: "/usuario", type: "" },
    { title: "Histórico", icon: require("../../assets/images/relatorio.png"), route: "/historico", type: "user" },
    { title: "Categorias", icon: require("../../assets/images/componente.png"), route: "/categorias", type: "" },
    { title: "Carrinho", icon: require("../../assets/images/carrinho.png"), route: "/carrinho", type: "user" },
    { title: "Relatório de Itens", icon: require("../../assets/images/relatorio.png"), route: "/product_report", type: "admin" },
    { title: "Gerenciar Solicitações", icon: require("../../assets/images/pasta.png"), route: "/product_controller", type: "admin" },
  ];

   return (
    <View style={styles.containerMain}>
      <View style={styles.pageTop}>
        <TouchableOpacity onPress={() => router.push("/home")}>
          <Image
            source={require("../../assets/images/logo.png")}
            style={styles.logoAvatar}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push("/usuario")}>
          <Image
            source={require("../../assets/images/avatar.png")}
            style={styles.logoAvatar}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.header}>
        <Text style={styles.headerTitle}>Home</Text>
      </View>

      <View style={styles.containerCardsHome}>
    {cards
      .filter(
        (item) =>
          item.type === "" || 
          item.type === user?.type 
      )
      .map((item, index) => (
        <TouchableOpacity
          key={index}
          style={styles.cardsHome}
          onPress={() => router.push(item.route)}
        >
          <Image source={item.icon} style={styles.icon} />
          <Text style={styles.textButton}>{item.title}</Text>
        </TouchableOpacity>
      ))}
  </View>
    </View>
  );
}
