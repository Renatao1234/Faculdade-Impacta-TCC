import estilos from '@/estilos/_stylesPadrao';
import { UserContext } from "@/services/contexts/userContext";
import { existingUser } from '@/services/database/userQueries';
import type { User } from '@/services/types/users';
import { useRouter } from "expo-router";
import React, { useContext, useState } from "react";
import { Alert, Platform, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function LoginScreen() {
  const { setUser } = useContext(UserContext);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const exist = await existingUser<User>(username, password);

      if (exist) {
        await setUser(exist);
        router.replace("/home");
        return;
      }      
      if (Platform.OS === "web") {
        alert("Usuário ou senha inválidos");
      } else {
        Alert.alert("Erro", "Usuário ou senha inválidos");
      }    
    } catch (error) {
      console.error("Erro no login:", error);
      Alert.alert("Erro", "Falha ao tentar logar. Verifique sua conexão.");
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
        returnKeyType="done"
        onSubmitEditing={handleLogin}
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