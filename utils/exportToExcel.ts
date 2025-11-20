import { ProductWithCategory } from "@/services/types/productWithCategory";
import { Platform } from "react-native";
import * as XLSX from "xlsx";

// Mobile
import * as FileSystem from "expo-file-system/legacy";
import * as Sharing from "expo-sharing";

export async function exportToExcel(products: ProductWithCategory[]) {
  const worksheetData = products.map((item) => ({
    Categoria: item.categories.name,
    Produto: item.name,
    Quantidade: item.available_amount,
  }));

  const worksheet = XLSX.utils.json_to_sheet(worksheetData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Produtos");

  const wbout = XLSX.write(workbook, { type: "base64", bookType: "xlsx" });

  if (Platform.OS === "web") {
    // Web: criar link de download
    const blob = new Blob([s2ab(atob(wbout))], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "relatorio_produtos.xlsx";
    a.click();
    URL.revokeObjectURL(url);
  } else {
    // Mobile: salvar arquivo temporário e compartilhar
    const fileUri = `${FileSystem.documentDirectory}relatorio_produtos.xlsx`;
    await FileSystem.writeAsStringAsync(fileUri, wbout, {
      encoding: FileSystem.EncodingType.Base64,
    });
    await Sharing.shareAsync(fileUri, {
      mimeType:
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      dialogTitle: "Exportar lista de produtos",
      UTI: "com.microsoft.excel.xlsx",
    });
  }
}

// Função auxiliar para converter string em ArrayBuffer (necessário para web)
function s2ab(s: string) {
  const buf = new ArrayBuffer(s.length);
  const view = new Uint8Array(buf);
  for (let i = 0; i !== s.length; ++i) view[i] = s.charCodeAt(i) & 0xff;
  return buf;
}
