import { UserContext } from "@/services/contexts/userContext";
import { existingUser } from '@/services/database/userQueries';
import type { Users } from '@/services/types/users';
import styles from '@/styles/_stylesPadrao';
import { useRouter } from "expo-router";
import React, { useContext, useState } from "react";
import { Alert, Image, Platform, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function LoginScreen() {
  const { setUser } = useContext(UserContext);
  const [emailOrUsername, setEmailOrUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const exist = await existingUser<Users>(emailOrUsername, password);

      if (exist) {
        setUser(exist);
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
    <View style={styles.containerLogin}>
      <Image
          source={require("../../assets/images/login.png")}
          style={styles.imageLogin}
        >        
      </Image>
      <View style={styles.containerMain} >
        
        <View style={styles.containerMiddle}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Faça login</Text>
          </View>
          <TextInput
            style={styles.input}
            placeholder="E-mail - admin" //Apagar admin
            placeholderTextColor="#999"
            onChangeText={setEmailOrUsername}
            value={emailOrUsername}
          />
          <TextInput
            style={styles.input}
            placeholder="Senha - 1234" //Apagar senha
            placeholderTextColor="#999"
            onChangeText={setPassword}
            secureTextEntry
            value={password}
            returnKeyType="done"
            onSubmitEditing={handleLogin}
          />

          <TouchableOpacity style={styles.buttonConfirmar} onPress={handleLogin}>
            <Text style={styles.buttonConfirmarExitText}>Confirmar</Text>
          </TouchableOpacity>
          <View style={styles.containerLinks}>
            <View style={styles.links}>
              <TouchableOpacity onPress={() => router.push("/cadastro")}>
                <Text style={[styles.textLink]}>Criar Conta</Text>
              </TouchableOpacity>
              {/* <TouchableOpacity onPress={() => router.push("/recuperar")}>
                <Text style={styles.textLink}>Esqueci a senha</Text>
              </TouchableOpacity> */}
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}