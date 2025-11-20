import { UserContext } from "@/services/contexts/userContext";
import { getAllProducts } from "@/services/database/productQueries";
import { ProductWithCategory } from "@/services/types/productWithCategory";
import { exportToExcel } from "@/utils/exportToExcel";
import React, { useContext, useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import styles from "../../styles/_stylesPadrao";

export default function ProductReport() {
    const user = useContext(UserContext);

    const [productsAll, setProducts] = useState<ProductWithCategory[]>([]);

    useEffect(() => {
        async function fetchCart() {
            if (user.user?.id) {
                const data = await getAllProducts<ProductWithCategory>();
                setProducts(data || []);
            }
        }
        fetchCart();
    }, [user.user?.id]);

    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={{ paddingBottom: 30 }}
        >
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Relatório de Produtos</Text>
            </View>

            <TouchableOpacity style={styles.buttonExcel } onPress={() => exportToExcel(productsAll)}>
                <Text style={styles.buttonExcelText}>Exportar</Text>
            </TouchableOpacity>

            <View style={styles.card}>
                <Text style={[styles.cardTitle, { flex: 1.5, textAlign: "left", paddingLeft: 15 }]}>
                    Categoria
                </Text>
                <Text style={[styles.cardTitle, { flex: 1.5, textAlign: "center" }]}>
                    Produto
                </Text>
                <Text style={[styles.cardTitle, { flex: 1, textAlign: "right", paddingRight: 15 }]}>
                    Quantidade
                </Text>
            </View>

            {productsAll.map((item, index) => (
                <View
                    key={item.id}
                    style={[
                        styles.tableRow,
                        styles.card, 
                    ]}
                >
                    <Text style={[styles.cardSubtitle, { flex: 1.5, textAlign: "left", paddingLeft: 15 }]}>
                        {item.categories.name}
                    </Text>

                    <Text style={[styles.cardSubtitle, { flex: 1.5, textAlign: "center" }]}>
                        {item.name}
                    </Text>

                    <View style={{ flex: 1, alignItems: "flex-end", paddingRight: 15 }}>
                        <View
                            style={[
                                styles.badgeQuantidade,
                                item.available_amount === 0
                                    ? styles.badgeZerado
                                    : item.available_amount < 5
                                        ? styles.badgeBaixo
                                        : styles.badgeNormal,
                            ]}
                        >
                            <Text style={styles.badgeText}>{item.available_amount}</Text>
                        </View>
                    </View>
                </View>
            ))}
        </ScrollView>
    );

}
