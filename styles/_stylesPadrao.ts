// styles.ts
import { Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  containerLogin:{
    width: "100%",
  },
  imageLogin: {
    width: "100%",
    height: 250, 
    resizeMode: "cover",
  },
  // Estilos para tabs
  iconeMenu: {
    width: 24,
    height: 24,
    resizeMode: "contain",
    borderRadius: 6,
    // backgroundColor:"#0A1F44",
  },
  containerPrincipal: {
    flex: 1,
    backgroundColor: "#0A1F44",
    padding: 20,
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
    // flexDirection: "row",
    // justifyContent: "space-between",
    // // alignItems: "center",
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


  container: {
    flex: 1,
    backgroundColor: "#0b1030",
    padding: 20,
  },
  containerConteudo: {
    alignItems: "center",
    justifyContent: "center"
  },

  botoesMaisMenosLixeira: {
    // flexDirection: "row",
    // alignItems: "center",
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

  // Relatórios
  reportsList: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#ddd",
    padding: 12,
  },

  // Botões


  // Header Título com Botão Excel
  containerTitleExcel: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    marginBottom: 10,
  },

  titulo: {
    flex: 1,
    // textAlign: "center",
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    paddingLeft: "44%",
  },

  contentContainerCentered: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },


  containerMain: {
    flex: 1,
    backgroundColor: "#0b1030",
    paddingHorizontal: 16,
    paddingBottom: 40,
  },

  header: {
    padding: 25,
  },

  headerTitle: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },



  exportText: {
    color: "#fff",
    fontWeight: "600",
  },

  statsContainer: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 20,
    flexWrap: "wrap",
    justifyContent: "center",
  },

  statBox: {
    backgroundColor: "#1e293b",
    padding: 18,
    borderRadius: 16,
    alignItems: "center",
    width: "45%",
  },

  statLabel: {
    color: "#fff",
    fontSize: 14,
  },

  statNumber: {
    color: "#fff",
    fontSize: 26,
    fontWeight: "bold",
    marginTop: 4,
  },

  listTitle: {
    marginTop: 28,
    marginBottom: 8,
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },

  card: {
    flexDirection: "row",
    backgroundColor: "#1e293b",
    padding: 16,
    borderRadius: 18,
    marginBottom: 14,
    alignItems: "center",
  },

  iconBox: {
    width: 46,
    height: 46,
    borderRadius: 10,
    backgroundColor: "#334155",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  cardTitle: {
    fontSize: 17,
    fontWeight: "600",
    color: "#fff",
  },

  cardSubtitle: {
    color: "#cbd5e1",
    marginTop: 2,
    marginRight: 10,
  },

  badge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  badgeRequested: {
    backgroundColor: "#facc1594",
  },
  badgeLoan: {
    backgroundColor: "#3b83f6ad",
  },
  badgeReturned: {
    backgroundColor: "#22c55ea4",
  },
  badgeText: {
    color: "#ffffffff",
    fontWeight: "bold",
  },
  emptyText: {
    color: "#94a3b8",
    marginBottom: 10,
    fontStyle: "italic"
  },


  listItens: {
    backgroundColor: "#f2f2f2",
    borderRadius: 15,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginBottom: 12,
    width: "70%"
  },

  // Texto do item
  textItem: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1c1c1c",
  },


  containerMiddle: {
    flex: 1, // ocupa toda a altura da tela
    justifyContent: "center", // centraliza verticalmente
    alignItems: "center", // centraliza horizontalmente
    paddingHorizontal: 20, // opcional
  },

  // Buttons -------------------------------------------------------------------------
  buttonStyle: {
    backgroundColor: "#ddd",
    paddingVertical: 10,
    borderRadius: 12,
    marginTop: 10,
    alignItems: "center",
    width: width < 400 ? "60%" : "20%",
  },
  textButton: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
    textAlign:"center",
  },
  buttonConfirmar: {
    backgroundColor: "#1668baff", // azul moderno
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
    alignItems: "center",
    width: "90%",
  },
  buttonConfirmarExitText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    letterSpacing: 0.5,
  },
  buttonExit: {
    backgroundColor: "#C62828",
    paddingVertical: 10,
    borderRadius: 12,
    marginTop: 10,
    alignItems: "center",
    width: width < 400 ? "60%" : "20%",
  },


  // Excel
  buttonExcel: {
    backgroundColor: "#1D6F42", // verde escuro estilo Excel
    width: width < 400 ? "30%" : "20%",
    paddingVertical: 10,
    paddingHorizontal: 10,
    margin: 0,
    borderRadius: 8,
    alignItems: "center",
    marginVertical: 10,
    alignSelf: "flex-end"
  },
  buttonExcelText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    letterSpacing: 0.5,
  },

  // Carts
  buttonsCarts: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: 12,
  },
  // Botões de + e -
  buttonsMoreLess: {
    backgroundColor: "#e6e6e6",
    borderRadius: 50,
    padding: 6,
  },
  // Botão da lixeira
  buttonTrash: {
    backgroundColor: "#C62828",
    borderRadius: 50,
    padding: 6,
  },

  botaoVoltar: {
    marginTop: 20,
    alignSelf: "center",
  },
  textoBotaoVoltar: {
    color: "#fff",
    fontSize: 16,
  },

  botaoPrincipal: {
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 15,
  },

  // --------------------------------------------------------------
  // Links ---------------------------------------------------------
  containerLinks: {
    padding: 20,
    width: "92%",
  },
  links: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15
  },
  textLink: {
    color: "#fff",
    fontSize: 14
  },
  // ---------------------------------------------------------------
  // Icons
  // Icons do menu
  icon: {
    width: 120,
    height: 120,
    resizeMode: "contain",
  },
  // ---------------------------------------------------------------
  // Home     
  pageTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
  },
  logoAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  containerCardsHome: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: 10,
  },
  cardsHome: {
    width: width * 0.4,
    height: 180,
    backgroundColor: "#e6e6e6",
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },

  // --------------------------------------------------
  // Categories
  containerCategories: {
    backgroundColor: "#e6e6e6",
    borderRadius: 10,
    width: "80%",
    height: 160,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  categorieText: {
    fontSize: width < 400 ? 30 : 50,
    fontWeight: "bold",
    color: "#000",
    textAlign: "center",
  },
  containerButtonsQuantity: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  // --------------------------------------------------
  // Dados Cadastrais
  cardUsuario: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    width: "90%",
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
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
  },


  // Relatório de Controle 
  statBoxActive: {
    borderWidth: 2,
    borderColor: "#007AFF",
  },
  // 🔹 Botões
  actionButton: {
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 10,
  },
  confirmButton: {
    backgroundColor: "#007AFF",
  },
  returnButton: {
    backgroundColor: "#34C759",
  },
  refuseButton: {
    marginRight: 20,
    backgroundColor: "#C62828",
  },
  actionButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 12,
  },
  containerButtonsReport: {
    flexDirection: "row",
  },

  // Relatório de Produtos
  tableRow: {
    flexDirection: "row",
    paddingVertical: 10,
    borderRadius: 10,
    marginBottom: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1.5,
    elevation: 1,
  },
  badgeQuantidade: {
    borderRadius: 10,
    paddingVertical: 4,
    paddingHorizontal: 10,
    minWidth: 35,
    alignItems: "center",
  },
  badgeZerado: {
    backgroundColor: "#ef4444", // vermelho
  },
  badgeBaixo: {
    backgroundColor: "#f59e0b", // amarelo
  },
  badgeNormal: {
    backgroundColor: "#22c55e", // verde
  },
  badgeCanceled: {
    backgroundColor: "#f97316b3",
  },
});

export default styles;

