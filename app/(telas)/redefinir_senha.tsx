import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";
import estilos from "../../estilos/_stylesPadrao"; // importa os estilos

export default function Redefinir_senha() {
  const [senha_antiga, setSenha_antiga] = useState("");
  const [senha_nova, setSenha_nova] = useState("");
  const [senha_confirma, setSenha_confirma] = useState("");
  const router = useRouter();

  function validar_senha() {
    if (!senha_antiga || !senha_nova || !senha_confirma) {
      Alert.alert("Erro", "Preencha todos os campos");
      return;
    }

    if (senha_nova !== senha_confirma) {
      Alert.alert("Erro", "A nova senha e a confirmação não conferem");
      return;
    }

    if (senha_antiga === senha_nova) {
      Alert.alert("Erro", "A nova senha não pode ser igual à antiga");
      return;
    }

    Alert.alert("Sucesso", "Senha redefinida com sucesso!");
    // aqui você pode chamar API ou lógica real
  }

  return (
    <View style={estilos.containerPrincipal}>
      <Text style={estilos.titulo}>Redefinir Senha</Text>

      <TextInput
        style={estilos.input}
        placeholder="Senha Antiga"
        placeholderTextColor="#999"
        secureTextEntry
        value={senha_antiga}
        onChangeText={setSenha_antiga}
      />

      <TextInput
        style={estilos.input}
        placeholder="Nova Senha"
        placeholderTextColor="#999"
        secureTextEntry
        value={senha_nova}
        onChangeText={setSenha_nova}
      />

      <TextInput
        style={estilos.input}
        placeholder="Confirmar Nova Senha"
        placeholderTextColor="#999"
        secureTextEntry
        value={senha_confirma}
        onChangeText={setSenha_confirma}
      />

      <TouchableOpacity style={estilos.botaoConfirmar} onPress={validar_senha}>
        <Text style={estilos.textoBotaoConfirmar}>Confirmar</Text>
      </TouchableOpacity>

    </View>
  );
}
