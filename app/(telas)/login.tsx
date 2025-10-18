import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, Platform, Text, TextInput, TouchableOpacity, View } from "react-native";
// import { supabase } from "@/services/database/supabaseClient";
import estilos from '@/estilos/_stylesPadrao';
import { UserContext } from "@/services/contexts/userContext";
import { existingUser } from '@/services/database/userQueries';
import type { Products } from '@/services/types/products';
import type { User } from '@/services/types/users';
import { useContext } from "react";

export default function LoginScreen() {
  const { setUser } = useContext(UserContext);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();

  const [registerAll, setRegister] = useState<Products[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

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
  //   const registers  = [
  //   { name: "Protoboard 170 pontos", description: "Modelo compacto ideal para testes rápidos.", category_id: 5 }
  // ];

    // const handleCadastro = async (name: string, description: string, category_id: number) => {
    //   const newRegister: Omit<Products, "id"> = {
    //     name: name,
    //     description: description,
    //     category_id: category_id,
    //   };
    //   try {  
    //     await insert("products", newRegister);
    //   } catch (error) {
    //     alert("Erro ao cadastrar usuário. Tente novamente.");
    //   }
    // };

    // useEffect(() => {
    //   const cadastrarRegistros = async () => {
    //     for (const register of registers) {
    //       await handleCadastro(register.name, register.description, register.category_id);
    //     }
    //   };
    //   cadastrarRegistros();
    // }, []);


  // useEffect(() => {
  //   async function fetchData() {
  //     const data = await getAll("products");
  //     if (data) setRegister(data as Products[]);
  //   }
  //   fetchData();
  // }, []);


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

  // Paginação
  // const indexOfLastItem = currentPage * itemsPerPage;
  // const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  // const currentItems = registerAll.slice(indexOfFirstItem, indexOfLastItem);
  // const totalPages = Math.ceil(registerAll.length / itemsPerPage);

  // const goToPage = (pageNumber: number) => {
  //   if (pageNumber >= 1 && pageNumber <= totalPages) {
  //     setCurrentPage(pageNumber);
  //   }
  // };

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