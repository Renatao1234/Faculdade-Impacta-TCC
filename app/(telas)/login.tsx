import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";
import styles from "../../estilos/_stylesPadrao"; // importa os estilos

export default function LoginScreen() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();

  const handleLogin = () => {
    if (username === "admin" && password === "1234") {
      router.replace("/home");
    } else {
      //alert("Usuário ou senha inválidos");
      Alert.alert("Erro", "Usuário ou senha inválidos");
    }
  };

  return (
    <View style={styles.containerPrincipal}>
      <Text style={styles.titulo}>Faça login</Text>

      <TextInput
        style={styles.input}
        placeholder="E-mail - admin" //Apagar admin
        placeholderTextColor="#999"
        onChangeText={setUsername}
        value={username}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha - 1234" //Apagar senha
        placeholderTextColor="#999"
        onChangeText={setPassword}
        secureTextEntry
        value={password}  
      />

      <TouchableOpacity style={styles.botaoConfirmar} onPress={handleLogin}>
        <Text style={styles.textoBotaoConfirmar}>Confirmar</Text>
      </TouchableOpacity>
      <View style={styles.containerLinks}>
        <View style={styles.links}>
          <TouchableOpacity onPress={() => router.push("/cadastro")}>
            <Text style={[styles.textoLink, { textAlign: "left" }]}>Criar Conta</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push("/recuperar")}>
            <Text style={styles.textoLink}>Esqueci a senha</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
