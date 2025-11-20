import { UserContext } from "@/services/contexts/userContext";
import { useRouter } from "expo-router";
import { useContext } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import styles from "../../styles/_stylesPadrao"; // importa os styles

export default function Usuario() {
  const router = useRouter();
  const { logout } = useContext(UserContext);

  const handleLogout = async () => {
    await logout();
    router.replace("/login")
  }

  return (
    <View style={[styles.containerMain, styles.contentContainerCentered]}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Usuário</Text>
      </View>

      {/* Avatar */}
      <Image
        source={require("../../assets/images/avatar.png")}
        style={styles.avatar}
      />

      {/* Botões */}
      <TouchableOpacity
        style={styles.buttonStyle}
        onPress={() => router.push("/redefinir_senha")}
      >
        <Text style={styles.textButton}>Redefinir Senha</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.buttonStyle}
        onPress={() => router.push("/dados_cadastrais")}
      >
        <Text style={styles.textButton}>Dados Cadastrais</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.buttonExit}
        onPress={handleLogout} // exemplo: voltar para login
      >
        <Text style={styles.buttonConfirmarExitText}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
}
