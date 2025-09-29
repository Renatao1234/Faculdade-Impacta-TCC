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
    categoria_home: {
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
  categoriaTexto_home: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: "500",
    color: "#000",
  },
  categoria: {
    backgroundColor: "#fff",
    borderRadius: 10,
    width: "90%",
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
    botaoVoltar: {
    marginTop: 20,
    alignSelf: "center",
  },
  textoBotaoVoltar: {
    color: "#fff",
    fontSize: 16,
  },
    cardUsuario: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    width: "90%",
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
  },
  cardTextoTitulo: {
    fontWeight: "bold",
    fontSize: 16,
    marginTop: 10,
    color: "#000",
  },
  cardTextoInfo: {
    fontSize: 16,
    color: "#333",
  },
    categoriaSemImagem: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
    backgroundColor: "#ddd",
    justifyContent: "center",
    alignItems: "center",
  },
  categoriaSemImagemTexto: {
    fontSize: 50,
    fontWeight: "bold",
    color: "#000",
    textAlign: "center",
    padding: 10,
  },
  // === Estilos para Categorias ===
imagemCategoria: {
  width: "100%",
  height: 120,
  borderTopLeftRadius: 10,
  borderTopRightRadius: 10,
  backgroundColor: "#fff",
},

imagemPlaceholder: {
  width: "100%",
  height: 120,
  backgroundColor: "#ccc",
  justifyContent: "center",
  alignItems: "center",
  borderTopLeftRadius: 10,
  borderTopRightRadius: 10,
},

textoPlaceholder: {
  fontSize: 18,
  fontWeight: "bold",
  color: "#333",
},
// === Estilos para Componentes ===
itemLista: {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  backgroundColor: "#ddd",
  padding: 12,
  borderRadius: 8,
  marginBottom: 10,
},

itemEsquerda: {
  flexDirection: "row",
  alignItems: "center",
  gap: 8, // se estiver no RN <0.71, trocar por marginLeft manual
},

itemTexto: {
  fontSize: 16,
  fontWeight: "bold",
  color: "#000",
},

itemQuantidade: {
  fontSize: 16,
  color: "#000",
},

botaoPrincipal: {
  backgroundColor: "#fff",
  padding: 14,
  borderRadius: 10,
  alignItems: "center",
  marginTop: 15,
},

textoBotao: {
  fontSize: 18,
  fontWeight: "bold",
  color: "#000",
},
container: {
  flex: 1,
  backgroundColor: "#0b1030",
  padding: 20,
},
containerConteudo: {
  alignItems: "center",
  justifyContent: "center"
},
botaoLixeira: {
  marginLeft: 10,
},
botaoMaisMenos: {
  marginHorizontal: 5,
},
botoesMaisMenosLixeira: {
  flexDirection: "row", 
  alignItems: "center",
},
legenda: {
  flexDirection: "row", 
  marginBottom: 10, 
  justifyContent: "center", 
},
legendaTexto: {
  flexDirection: "row", 
  marginBottom: 10, 
  justifyContent: "center", 
},
});

export default styles;
