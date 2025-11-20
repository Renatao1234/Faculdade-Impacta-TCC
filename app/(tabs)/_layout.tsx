// _layout.tsx
import { useCart } from "@/services/contexts/cartContext";
import { UserContext } from "@/services/contexts/userContext";
import { Tabs } from "expo-router";
import { useContext } from "react";
import { Image, Text, View } from "react-native";
import estilos from "../../styles/_stylesPadrao";

export default function Layout() {
  const user = useContext(UserContext);
  const { cart } = useCart();

  if (!user.user) {
    return null;
  }

  return (
    <Tabs screenOptions={{
      headerShown: false,
      tabBarStyle: {
        backgroundColor: "#1A2B4F",
        height: 70,
        borderTopWidth: 0,

      },
    }}>
      <Tabs.Screen
        name="home"
        options={{
          tabBarLabel: () => (
            <Text style={{fontSize: 12, flexWrap: "wrap", textAlign: "center", color: "#fff"}}>Home</Text>
          ),
          tabBarIcon: () => (
            <Image
              source={require("../../assets/images/home.png")}
              style={estilos.iconeMenu}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="categorias"
        options={{
          tabBarLabel: () => (
            <Text style={{fontSize: 12, flexWrap: "wrap", textAlign: "center", color: "#fff"}}>Componentes</Text>
          ),
          tabBarIcon: () => (
            <Image
              source={require("../../assets/images/componente.png")}
              style={estilos.iconeMenu}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="historico"
        options={{
          tabBarLabel: () => (
            <Text style={{fontSize: 12, flexWrap: "wrap", textAlign: "center", color: "#fff"}}>Histórico</Text>
          ),
          href: user.user?.type === "user" ? undefined : null,
          tabBarIcon: () => (
            <Image
              source={require("../../assets/images/relatorio.png")}
              style={estilos.iconeMenu}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="carrinho"
        options={{
          tabBarLabel: () => (
            <Text style={{fontSize: 12, flexWrap: "wrap", textAlign: "center", color: "#fff"}}>Carrinho</Text>
          ),
          href: user.user?.type === "user" ? undefined : null,
          tabBarIcon: () => {
            return (
              <View style={{ position: "relative" }}>
                {/* Ícone do carrinho */}
                <Image
                  source={require("../../assets/images/carrinho.png")}
                  style={estilos.iconeMenu}
                />

                {/* Badge (contador) */}
                {cart.length > 0 && (
                  <View
                    style={{
                      position: "absolute",
                      right: -6,
                      top: -4,
                      backgroundColor: "#ef4444", // vermelho
                      borderRadius: 9999,
                      width: 18,
                      height: 18,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={{
                        color: "#fff",
                        fontSize: 11,
                        fontWeight: "bold",
                      }}>
                      {cart.length}
                    </Text>
                  </View>
                )}
              </View>
            );
          },
        }}
      />
      {/* --- Telas exclusivas para administradores --- */}
      <Tabs.Screen
        name="product_report"
        options={{
          tabBarLabel: () => (
            <Text style={{fontSize: 12, flexWrap: "wrap", textAlign: "center", color: "#fff"}}>Relatório Produtos</Text>
          ),
          href: user.user?.type === "admin" ? undefined : null,
          tabBarIcon: () => (
            <Image
              source={require("../../assets/images/relatorio.png")}
              style={estilos.iconeMenu}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="product_controller"
        options={{
          tabBarLabel: () => (
            <Text style={{fontSize: 12, flexWrap: "wrap", textAlign: "center", color: "#fff"}}>Gerenciar Solicitações</Text>
          ),
          href: user.user?.type === "admin" ? undefined : null,
          tabBarIcon: () => (
            <Image
              source={require("../../assets/images/pasta.png")}
              style={estilos.iconeMenu}
            />
          ),
        }}
      />
      {/* Tela de Usuarios no final */}
      <Tabs.Screen
        name="usuario"
        options={{
          tabBarLabel: () => (
            <Text style={{fontSize: 12, flexWrap: "wrap", textAlign: "center", color: "#fff"}}>Usuário</Text>
          ),
          tabBarIcon: () => (
            <Image
              source={require("../../assets/images/usuario.png")}
              style={estilos.iconeMenu}
            />
          ),
        }}
      />
      {/* Telas invisiveis */}
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
