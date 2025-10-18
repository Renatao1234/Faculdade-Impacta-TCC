import { UserContext } from "@/services/contexts/userContext";
import { useRouter } from "expo-router";
import React, { useContext } from "react";
import { Text, View } from "react-native";
import estilos from "../../estilos/_stylesPadrao"; // importa os estilos

export default function Visualizar_usuario() {
  const router = useRouter();
  const user = useContext(UserContext);

  return (
    <View style={estilos.containerPrincipal}>
      <Text style={estilos.titulo}>Informações do Usuário</Text>
      <View style={estilos.cardUsuario}>
        {user ? (
          <>
            <Text style={estilos.cardTextoTitulo}>Nome:</Text>
            <Text style={estilos.cardTextoInfo}>{user.user?.name}</Text>

            <Text style={estilos.cardTextoTitulo}>E-mail:</Text>
            <Text style={estilos.cardTextoInfo}>{user.user?.email}</Text>

            <Text style={estilos.cardTextoTitulo}>RA:</Text>
            <Text style={estilos.cardTextoInfo}>{user.user?.registration}</Text>
          </>
        ) : (
          <Text>Nenhum usuário logado</Text>
        )} 
      </View>
    </View>
  );
}
