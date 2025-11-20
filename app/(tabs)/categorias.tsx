import { getAll } from "@/services/database/queries";
import { Categories } from "@/services/types/categories";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import styles from "../../styles/_stylesPadrao";

interface Categoria {
  nome: string;
  imagem?: string;
}
{/*Exemplos de categoria*/ }
export default function Categorias() {

  const [categoreisAll, setCategories] = useState<Categories[]>([]);

  useEffect(() => {
    async function fetchData() {
      const data = await getAll("categories");
      // console.log("Dados retornados do banco:", data); // <-- Adicione isto

      if (data) setCategories(data as Categories[]);
    }
    fetchData();
  }, []);

  return (
    <ScrollView
      style={styles.containerMain}
      contentContainerStyle={styles.contentContainerCentered}
    >
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Categorias</Text>
      </View>

      <View style={styles.containerCardsHome}>
        {categoreisAll.map((categoria, indice) => (
          <TouchableOpacity
            key={indice}
            style={styles.containerCategories}
            onPress={() =>
              router.push({
                pathname: "/componentes",
                params: { nome: categoria.name, id: categoria.id.toString() },
              })
            }
          >
            <View>
              <Text style={styles.categorieText}>
                {categoria.name}
              </Text>
            </View>
            {/* {categoria.description ? (
            <Image
              source={{ uri: categoria.description }}
              style={styles.imagemCategoria}
              resizeMode="contain"
            />
          ) : (
            
          )} */}
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}
