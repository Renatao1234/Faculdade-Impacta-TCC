// _layout.tsx
import { Tabs } from "expo-router";
import { Image } from "react-native";
import estilos from "../../estilos/_stylesPadrao";

export default function Layout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="home"
        options={{
          tabBarIcon: () => (
            <Image
              source={require("../../assets/images/menuHome.png")}
              style={estilos.iconeMenu}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="categorias"
        options={{
          tabBarIcon: () => (
            <Image
              source={require("../../assets/images/menuCategorias.png")}
              style={estilos.iconeMenu}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="historico"
        options={{
          tabBarIcon: () => (
            <Image
              source={require("../../assets/images/menuHistorico.png")}
              style={estilos.iconeMenu}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="carrinho"
        options={{
          tabBarIcon: () => (
            <Image
              source={require("../../assets/images/menuCarrinho.png")}
              style={estilos.iconeMenu}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="usuario"
        options={{
          tabBarIcon: () => (
            <Image
              source={require("../../assets/images/menuUsuario.png")}
              style={estilos.iconeMenu}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="componentes"
        options={{
          href: null, // não mostra no menu inferior
        }}
      />
      <Tabs.Screen
        name="dados_cadastrais"
        options={{
          href: null, // não mostra no menu inferior
        }}
      />
      <Tabs.Screen
        name="redefinir_senha"
        options={{
          href: null, // não mostra no menu inferior
        }}
      />
    </Tabs>
  );
}
