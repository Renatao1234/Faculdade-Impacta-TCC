import { UserContext } from "@/services/contexts/userContext";
import { getById } from "@/services/database/queries";
import { existingUser, updatePassword } from "@/services/database/userQueries";
import type { User } from '@/services/types/users';
import { useRouter } from "expo-router";
import { useContext, useState } from "react";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";
import estilos from "../../estilos/_stylesPadrao"; // importa os estilos


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
    // aqui você pode chamar API ou lógica real
  }

  const handleUpdatePassword = async () => {
    if(user.user?.id) {
      const teste = await getById<User>("users",user.user?.id);
      console.log("Puxando pelo id: ", teste);
    }

    if (user.user?.email){
      const exist = await existingUser<User>(user.user?.email, old_password);

      if (exist) {
        validar_senha();
        const success = await updatePassword<User>(user.user.id, new_password);
        if(success){
          Alert.alert("Erro", "Senha alterada com sucesso!");
          router.replace("/home");
        } else{
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
    <View style={estilos.containerPrincipal}>
      <Text style={estilos.titulo}>Redefinir Senha</Text>

      <TextInput
        style={estilos.input}
        placeholder="Senha Antiga"
        placeholderTextColor="#999"
        secureTextEntry
        value={old_password}
        onChangeText={setOldPassword}
      />

      <TextInput
        style={estilos.input}
        placeholder="Nova Senha"
        placeholderTextColor="#999"
        secureTextEntry
        value={new_password}
        onChangeText={setNewPassword}
      />

      <TextInput
        style={estilos.input}
        placeholder="Confirmar Nova Senha"
        placeholderTextColor="#999"
        secureTextEntry
        value={confirm_password}
        onChangeText={setConfirmPassword}
      />

      <TouchableOpacity style={estilos.botaoConfirmar} onPress={handleUpdatePassword}>
        <Text style={estilos.textoBotaoConfirmar}>Confirmar</Text>
      </TouchableOpacity>

    </View>
  );
}
