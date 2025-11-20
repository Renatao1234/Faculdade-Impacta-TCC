import { UserContext } from "@/services/contexts/userContext";
import { getById } from "@/services/database/queries";
import { existingUser, updatePassword } from "@/services/database/userQueries";
import type { Users } from '@/services/types/users';
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useContext, useState } from "react";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";
import styles from "../../styles/_stylesPadrao"; // importa os styles


export default function Redefinir_senha() {
  const user = useContext(UserContext);
  const [old_password, setOldPassword] = useState("");
  const [new_password, setNewPassword] = useState("");
  const [confirm_password, setConfirmPassword] = useState("");
  const router = useRouter();

  function validar_senha() {
    if (!old_password || !new_password || !confirm_password) {
      Alert.alert("Erro", "Preencha todos os campos");
      return;
    }

    if (new_password !== confirm_password) {
      Alert.alert("Erro", "A nova senha e a confirmação não conferem");
      return;
    }

    if (old_password === new_password) {
      Alert.alert("Erro", "A nova senha não pode ser igual à antiga");
      return;
    }

    Alert.alert("Sucesso", "Senha redefinida com sucesso!");
  }

  const handleUpdatePassword = async () => {
    if (user.user?.id) {
      const teste = await getById<Users>("users", user.user?.id);
      console.log("Puxando pelo id: ", teste);
    }

    if (user.user?.email) {
      const exist = await existingUser<Users>(user.user?.email, old_password);

      if (exist) {
        validar_senha();
        const success = await updatePassword<Users>(user.user.id, new_password);
        if (success) {
          Alert.alert("Erro", "Senha alterada com sucesso!");
          router.replace("/home");
        } else {
          Alert.alert("Erro", "Erro em alterar senha!");
        }

      } else {
        Alert.alert("Erro", "Usuário ou senha inválidos");
      }
    } else {
      Alert.alert("Erro", "Senha Antiga inválida");
    }
  };

  return (
    <View style={styles.containerMain}>
      <TouchableOpacity onPress={() => router.push("/usuario")}>
        <Ionicons name="arrow-back" size={40} color="#999" />
      </TouchableOpacity>
      <View style={styles.containerMiddle}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Redefinir Senha</Text>
        </View>
        <TextInput
          style={styles.input}
          placeholder="Senha Antiga"
          placeholderTextColor="#999"
          secureTextEntry
          value={old_password}
          onChangeText={setOldPassword}
        />

        <TextInput
          style={styles.input}
          placeholder="Nova Senha"
          placeholderTextColor="#999"
          secureTextEntry
          value={new_password}
          onChangeText={setNewPassword}
        />

        <TextInput
          style={styles.input}
          placeholder="Confirmar Nova Senha"
          placeholderTextColor="#999"
          secureTextEntry
          value={confirm_password}
          onChangeText={setConfirmPassword}
        />

        <TouchableOpacity style={styles.buttonStyle} onPress={handleUpdatePassword}>
          <Text style={styles.textButton}>Confirmar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
