// styles.ts
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  // Estilos do fundo e página
  fundo: {
    flex: 1,
    backgroundColor: "#0b1030",
    padding: 20,
  },
  topoPagina: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
  },
  logo: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },

  // Grade de botões
  grade: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 20,
  },
  categoria: {
    backgroundColor: "#fff",
    borderRadius: 10,
    width: "47%",
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
  },
  categoriaTexto: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: "500",
    color: "#000",
  },
  icone: {
    width: 140,
    height: 140,
    resizeMode: "contain",
    borderRadius: 10,
  },

  // Estilos para tabs
  iconeMenu: {
    width: 24,
    height: 24,
    resizeMode: "contain",
    borderRadius: 6,
  },
  containerPrincipal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",     // centraliza horizontalmente
    padding: 20,
    backgroundColor: "#0A1F44",
    width: "100%",    // garante que ocupe toda a largura da tela
    height: "100%",   // garante que ocupe toda a altura da tela
  },
    containerLinks: {
    padding: 20,
    backgroundColor: "#0A1F44",
    width: "100%",   // garante que ocupe toda a altura da tela
  },
  titulo: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
    color: "#fff"
  },
  input: {
    backgroundColor: "#fff",
    padding: 12,
    marginBottom: 15,
    borderRadius: 8,
    fontSize: 16,
    justifyContent: "center",
    width: "90%"
  },
  botaoConfirmar: {
    backgroundColor: "#ddd",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
    width: "70%"
  },
  textoBotaoConfirmar: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000"
  },
  links: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15
  },
  textoLink: {
    color: "#fff",
    fontSize: 14
  },
});

export default styles;
