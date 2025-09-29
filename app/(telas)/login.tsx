import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";
import estilos from "../../estilos/_stylesPadrao"; // importa os estilos

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
    <View style={estilos.containerPrincipal}>
      <Text style={estilos.titulo}>Faça login</Text>

      <TextInput
        style={estilos.input}
        placeholder="E-mail - admin" //Apagar admin
        placeholderTextColor="#999"
        onChangeText={setUsername}
        value={username}
      />
      <TextInput
        style={estilos.input}
        placeholder="Senha - 1234" //Apagar senha
        placeholderTextColor="#999"
        onChangeText={setPassword}
        secureTextEntry
        value={password}  
      />

      <TouchableOpacity style={estilos.botaoConfirmar} onPress={handleLogin}>
        <Text style={estilos.textoBotaoConfirmar}>Confirmar</Text>
      </TouchableOpacity>
      <View style={estilos.containerLinks}>
        <View style={estilos.links}>
          <TouchableOpacity onPress={() => router.push("/cadastro")}>
            <Text style={[estilos.textoLink, { textAlign: "left" }]}>Criar Conta</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push("/recuperar")}>
            <Text style={estilos.textoLink}>Esqueci a senha</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
