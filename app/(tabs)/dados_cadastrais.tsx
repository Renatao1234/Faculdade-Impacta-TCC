import { UserContext } from "@/services/contexts/userContext";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useContext } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import styles from "../../styles/_stylesPadrao";

export default function Visualizar_usuario() {
  const router = useRouter();
  const user = useContext(UserContext);

  return (
    <View style={[styles.containerMain]}>
      <TouchableOpacity onPress={() => router.push("/usuario")}>
        <Ionicons name="arrow-back" size={40} color="#999" />
      </TouchableOpacity>
      <View style={styles.containerMiddle}>
        <Image
          source={require("../../assets/images/avatar.png")}
          style={styles.avatar}
        />
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Informações do Usuário</Text>
        </View>
        <View style={styles.cardUsuario}>
          {user ? (
            <>
              <Text style={styles.cardTextoTitulo}>Nome:</Text>
              <Text style={styles.cardTextoInfo}>{user.user?.name}</Text>

              <Text style={styles.cardTextoTitulo}>E-mail:</Text>
              <Text style={styles.cardTextoInfo}>{user.user?.email}</Text>

              <Text style={styles.cardTextoTitulo}>RA:</Text>
              <Text style={styles.cardTextoInfo}>{user.user?.registration}</Text>
            </>
          ) : (
            <Text>Nenhum usuário logado</Text>
          )}
        </View>
      </View>
    </View>
  );
}
