import { Tabs } from "expo-router";
import { Image } from "react-native";

export default function HomeLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false, // esconde o header se quiser
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={require("../../assets/images/menuHome.png")}
              style={{
                width: 24,
                height: 24,
                resizeMode: "contain",
              }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="categorias"
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={require("../../assets/images/menuCategorias.png")}
              style={{
                width: 24,
                height: 24,
                resizeMode: "contain",
              }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="historico"
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={require("../../assets/images/menuHistorico.png")}
              style={{
                width: 24,
                height: 24,
                resizeMode: "contain",
              }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="carrinho"
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={require("../../assets/images/menuCarrinho.png")}
              style={{
                width: 24,
                height: 24,
                resizeMode: "contain",
              }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="usuario"
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={require("../../assets/images/menuUsuario.png")}
              style={{
                width: 24,
                height: 24,
                resizeMode: "contain",
              }}
            />
          ),
        }}
      />
    </Tabs>
  );
}
