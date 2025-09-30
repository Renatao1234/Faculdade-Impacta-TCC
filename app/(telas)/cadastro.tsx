import { getByEmail, insertUser } from '@/services/database/userQueries';
import type { User } from '@/services/types/users';
import { useRouter } from "expo-router";
import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import estilos from "../../estilos/_stylesPadrao"; // importa os estilos

export default function Cadastro() {
  const [nome, setNome] = useState<string>("");
  const [matricula, setMatricula] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [senha, setSenha] = useState<string>("");
  const [confirmar, setConfirmar] = useState<string>("");
  const router = useRouter();

  const handleCadastro = async () => {
    if (senha !== confirmar) {
      alert("Senhas não coincidem!");
      return;
    }    

    const newUser: Omit<User, "id"> = {
      name: nome,
      email: email,
      password: senha,
      registration: Number(matricula), 
    };

    try {
      const exist = await getByEmail<User>(newUser.email);

      if (exist) {
        alert("Já existe um usuário cadastrado com esse email.");
        return; 
      }
      await insertUser(newUser);
      alert("Cadastro realizado com sucesso!");
      router.back();
    } catch (error) {
      alert("Erro ao cadastrar usuário. Tente novamente.");
    }
  }

  return (
    <View style={estilos.container}>
      <Text style={estilos.titulo}>Cadastro</Text>

      <TextInput style={estilos.input} placeholder="Nome Completo" placeholderTextColor="#999" value={nome} onChangeText={setNome} />
      <TextInput style={estilos.input} placeholder="Matrícula" placeholderTextColor="#999" value={matricula} onChangeText={setMatricula} />
      <TextInput style={estilos.input} placeholder="E-mail" placeholderTextColor="#999" value={email} onChangeText={setEmail} />
      <TextInput style={estilos.input} placeholder="Senha" placeholderTextColor="#999" value={senha} onChangeText={setSenha} secureTextEntry />
      <TextInput style={estilos.input} placeholder="Confirmar Senha" placeholderTextColor="#999" value={confirmar} onChangeText={setConfirmar} secureTextEntry />

      <TouchableOpacity style={estilos.botaoConfirmar} onPress={handleCadastro}>
        <Text style={estilos.textoBotaoConfirmar}>Confirmar</Text>
      </TouchableOpacity>
    </View>
  );
}
