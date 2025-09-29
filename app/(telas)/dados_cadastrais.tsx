import { useRouter } from "expo-router";
import { Text, View } from "react-native";
import estilos from "../../estilos/_stylesPadrao"; // importa os estilos

export default function Visualizar_usuario() {
  const router = useRouter();

  // Exemplo de dados fixos (substitua depois com dados reais)
  const usuario = {
    nome: "João Silva",
    email: "joao.silva@email.com",
    ra: "202500123",
  };

  return (
    <View style={estilos.containerPrincipal}>
      <Text style={estilos.titulo}>Informações do Usuário</Text>

      <View style={estilos.cardUsuario}>
        <Text style={estilos.cardTextoTitulo}>Nome:</Text>
        <Text style={estilos.cardTextoInfo}>{usuario.nome}</Text>

        <Text style={estilos.cardTextoTitulo}>E-mail:</Text>
        <Text style={estilos.cardTextoInfo}>{usuario.email}</Text>

        <Text style={estilos.cardTextoTitulo}>RA:</Text>
        <Text style={estilos.cardTextoInfo}>{usuario.ra}</Text>
      </View>

    </View>
  );
}
