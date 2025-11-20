import { getByEmailOrUsername, insertUser } from '@/services/database/userQueries';
import type { Users } from '@/services/types/users';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from "expo-router";
import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import styles from "../../styles/_stylesPadrao"; // importa os styles

export default function Cadastro() {
  const [nome, setNome] = useState<string>("");
  const [username, setUserName] = useState<string>("");
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

    const newUser: Omit<Users, "id"> = {
      name: nome,
      username: username,
      email: email,
      password: senha,
      registration: Number(matricula),
    };

    try {
      const exist = await getByEmailOrUsername<Users>(newUser.email, newUser.username);

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
    <View style={styles.containerMain}>
      <TouchableOpacity onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={40} color="#999" />
      </TouchableOpacity>
      <View style={styles.containerMiddle}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Cadastro</Text>
        </View>
        <TextInput style={styles.input} placeholder="Nome Completo" placeholderTextColor="#999" value={nome} onChangeText={setNome} />
        <TextInput style={styles.input} placeholder="Matrícula" placeholderTextColor="#999" value={matricula} onChangeText={setMatricula} />
        <TextInput style={styles.input} placeholder="Usuário" placeholderTextColor="#999" value={username} onChangeText={setUserName} />
        <TextInput style={styles.input} placeholder="E-mail" placeholderTextColor="#999" value={email} onChangeText={setEmail} />
        <TextInput style={styles.input} placeholder="Senha" placeholderTextColor="#999" value={senha} onChangeText={setSenha} secureTextEntry />
        <TextInput style={styles.input} placeholder="Confirmar Senha" placeholderTextColor="#999" value={confirmar} onChangeText={setConfirmar} secureTextEntry />

        <TouchableOpacity style={styles.buttonConfirmar} onPress={handleCadastro}>
          <Text style={styles.buttonConfirmarExitText}>Confirmar</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}
