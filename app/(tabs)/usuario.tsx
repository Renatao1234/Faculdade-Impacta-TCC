import { UserContext } from "@/services/contexts/userContext";
import { useRouter } from "expo-router";
import { useContext } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import estilos from "../../estilos/_stylesPadrao"; // importa os estilos

export default function Usuario() {
  const router = useRouter();
  const { logout } = useContext(UserContext);

  const handleLogout = async () => {
    await logout();
    router.replace("/login")
  }

  return (
    <View style={estilos.containerPrincipal}>
      <Text style={estilos.titulo}>Usuário</Text>

      {/* Avatar */}
      <Image
        source={require("../../assets/images/avatar.png")}
        style={{ width: 120, height: 120, borderRadius: 60, marginBottom: 30 }}
      />

      {/* Botões */}
      <TouchableOpacity
        style={estilos.botaoConfirmar}
        onPress={() => router.push("/redefinir_senha")}
      >
        <Text style={estilos.textoBotaoConfirmar}>Redefinir Senha</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={estilos.botaoConfirmar}
        onPress={() => router.push("/dados_cadastrais")}
      >
        <Text style={estilos.textoBotaoConfirmar}>Dados Cadastrais</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={estilos.botaoConfirmar}
        onPress={handleLogout} // exemplo: voltar para login
      >
        <Text style={estilos.textoBotaoConfirmar}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
}
