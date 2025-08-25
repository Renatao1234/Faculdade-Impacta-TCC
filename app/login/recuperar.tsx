import { useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function RecuperarSenha() {
  const [email, setEmail] = useState<string>("");
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recuperar Senha</Text>

      <TextInput
        style={styles.input}
        placeholder="E-mail"
        placeholderTextColor="#999"
        value={email}
        onChangeText={setEmail}
      />

      <TouchableOpacity style={styles.button} onPress={() => alert("Link enviado!")}>
        <Text style={styles.buttonText}>Recuperar Senha</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Text style={styles.backText}>← Voltar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20, backgroundColor: "#0A1F44" },
  title: { fontSize: 26, fontWeight: "bold", textAlign: "center", marginBottom: 25, color: "#fff" },
  input: { backgroundColor: "#fff", padding: 12, marginBottom: 15, borderRadius: 8, fontSize: 16 },
  button: { backgroundColor: "#ddd", padding: 14, borderRadius: 10, alignItems: "center" },
  buttonText: { fontSize: 18, fontWeight: "bold", color: "#000" },
  backButton: { marginTop: 20, alignSelf: "center" },
  backText: { color: "#fff", fontSize: 16 },
});
