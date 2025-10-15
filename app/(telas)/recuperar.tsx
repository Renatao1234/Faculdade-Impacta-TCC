import { useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function RecuperarSenha() {
  const [email, setEmail] = useState<string>("");
  const router = useRouter();

  return (
    <View style={estilos.container}>
      <Text style={estilos.title}>Recuperar Senha</Text>

      <TextInput
        style={estilos.input}
        placeholder="E-mail"
        placeholderTextColor="#999"
        value={email}
        onChangeText={setEmail}
      />

      <TouchableOpacity style={estilos.button} onPress={() => alert("Link enviado!")}>
        <Text style={estilos.buttonText}>Recuperar Senha</Text>
      </TouchableOpacity>

    </View>
  );
}

const estilos = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20, backgroundColor: "#0A1F44" },
  title: { fontSize: 26, fontWeight: "bold", textAlign: "center", marginBottom: 25, color: "#fff" },
  input: { backgroundColor: "#fff", padding: 12, marginBottom: 15, borderRadius: 8, fontSize: 16 },
  button: { backgroundColor: "#ddd", padding: 14, borderRadius: 10, alignItems: "center" },
  buttonText: { fontSize: 18, fontWeight: "bold", color: "#000" },
  backButton: { marginTop: 20, alignSelf: "center" },
  backText: { color: "#fff", fontSize: 16 },
});
