import { useRouter } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function LoginScreen() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();

  const handleLogin = () => {
    if (username === "admin" && password === "1234") {
      router.replace("/home");
    } else {
      alert("Usuário ou senha inválidos");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Teste de versionamento</Text>

      <TextInput
        style={styles.input}
        placeholder="E-mail"
        placeholderTextColor="#999"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        placeholderTextColor="#999"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Confirmar</Text>
      </TouchableOpacity>

      <View style={styles.links}>
        <TouchableOpacity onPress={() => router.push("/login/cadastro")}>
          <Text style={styles.linkText}>Criar Conta</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push("/login/recuperar")}>
          <Text style={styles.linkText}>Esqueci a senha</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20, backgroundColor: "#0A1F44" },
  title: { fontSize: 28, fontWeight: "bold", textAlign: "center", marginBottom: 30, color: "#fff" },
  input: { backgroundColor: "#fff", padding: 12, marginBottom: 15, borderRadius: 8, fontSize: 16 },
  button: { backgroundColor: "#ddd", padding: 14, borderRadius: 10, alignItems: "center", marginTop: 10 },
  buttonText: { fontSize: 18, fontWeight: "bold", color: "#000" },
  links: { flexDirection: "row", justifyContent: "space-between", marginTop: 15 },
  linkText: { color: "#fff", fontSize: 14 },
});
