// _layout.tsx
import { Tabs } from "expo-router";
import { Image } from "react-native";
import styles from "../../estilos/_stylesPadrao";

export default function Layout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="home"
        options={{
          tabBarIcon: () => (
            <Image
              source={require("../../assets/images/menuHome.png")}
              style={styles.iconeMenu}
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
              style={styles.iconeMenu}
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
              style={styles.iconeMenu}
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
              style={styles.iconeMenu}
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
              style={styles.iconeMenu}
            />
          ),
        }}
      />
    </Tabs>
  );
}
