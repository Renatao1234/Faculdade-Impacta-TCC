import { useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function Cadastro() {
  const [nome, setNome] = useState<string>("");
  const [matricula, setMatricula] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [senha, setSenha] = useState<string>("");
  const [confirmar, setConfirmar] = useState<string>("");
  const router = useRouter();

  const handleCadastro = () => {
    if (senha !== confirmar) {
      alert("Senhas não coincidem!");
      return;
    }
    alert("Cadastro realizado com sucesso!");
    router.back();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro</Text>

      <TextInput style={styles.input} placeholder="Nome Completo" placeholderTextColor="#999" value={nome} onChangeText={setNome} />
      <TextInput style={styles.input} placeholder="Matrícula" placeholderTextColor="#999" value={matricula} onChangeText={setMatricula} />
      <TextInput style={styles.input} placeholder="E-mail" placeholderTextColor="#999" value={email} onChangeText={setEmail} />
      <TextInput style={styles.input} placeholder="Senha" placeholderTextColor="#999" value={senha} onChangeText={setSenha} secureTextEntry />
      <TextInput style={styles.input} placeholder="Confirmar Senha" placeholderTextColor="#999" value={confirmar} onChangeText={setConfirmar} secureTextEntry />

      <TouchableOpacity style={styles.button} onPress={handleCadastro}>
        <Text style={styles.buttonText}>Confirmar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Text style={styles.backText}>← Voltar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20, backgroundColor: "#0A1F44" },
  title: { fontSize: 26, fontWeight: "bold", textAlign: "center", marginBottom: 25, color: "#fff" },
  input: { backgroundColor: "#fff", padding: 12, marginBottom: 15, borderRadius: 8, fontSize: 16 },
  button: { backgroundColor: "#ddd", padding: 14, borderRadius: 10, alignItems: "center", marginTop: 10 },
  buttonText: { fontSize: 18, fontWeight: "bold", color: "#000" },
  backButton: { marginTop: 20, alignSelf: "center" },
  backText: { color: "#fff", fontSize: 16 },
});
