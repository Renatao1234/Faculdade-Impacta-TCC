import { supabase } from "@/services/database/supabaseClient";
import type { User } from '@/services/types/users';
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";
import styles from "../../estilos/_stylesPadrao"; // importa os estilos

export default function LoginScreen() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);

  // async function seed() {
  //   const { data, error } = await supabase
  //     .from("users")
  //     .insert([
  //       { name: "Rodrigo", email: "rodrigo@email.com", password: "1234" }
  //     ])
  //     .select();

  //   console.log("Inserido:", data, "Erro:", error);
  // }
  // seed();

  useEffect(() => {
    async function testeBanco() {
      const { data, error } = await supabase.from("users").select("*");
      console.log("Data:", data);
      console.log("Error:", error);
      if (data) setUsers(data);
    }
    testeBanco();
  }, []);

  // useEffect(() => {
  //   async function testeBanco() {
  //     try {
  //       const usersData = await getAll<User>("users");
  //       console.log("Users do banco:", usersData); // <--- log para debug
  //       setUsers(usersData);
  //     } catch (error) {
  //       console.error("Erro ao buscar usuários:", error);
  //     }
  //   }
  //   testeBanco();
  // }, []);

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
      <Text > Usuarios no banco:</Text>
      {users.map((user: any) => (
        <Text key={user.id}>{user.name}</Text>
      ))}
    </View>
  );
}
