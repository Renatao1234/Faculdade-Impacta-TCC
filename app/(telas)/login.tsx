import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";
import estilos from "../../estilos/_stylesPadrao"; // importa os estilos
// import { supabase } from "@/services/database/supabaseClient";
import { UserContext } from "@/services/contexts/userContext";
import { existingUser } from '@/services/database/userQueries';
import type { User } from '@/services/types/users';
import { useContext } from "react";

export default function LoginScreen() {
  const { setUser } = useContext(UserContext);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();
  // const [users, setUsers] = useState<User[]>([]);

  // useEffect(() => {
  //   async function testeBanco() {
  //     const { data, error } = await supabase.from("users").select("*");
  //     console.log("Data:", data);
  //     console.log("Error:", error);
  //     if (data) setUsers(data);
  //   }
  //   testeBanco();
  // }, []);
  // teste@gmail.com

  const handleLogin = async () => {
    const exist = await existingUser<User>(username,password);
    
    if (exist) {
      await setUser(exist);
      router.replace("/home");
    } else {
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
{/* <Text > Usuarios no banco:</Text>
      {users.map((user: any) => (
        <Text key={user.id}>{user.password}</Text>
      ))} */}