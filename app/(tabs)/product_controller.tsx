import { UserContext } from "@/services/contexts/userContext";
import { confirmLoan, confirmReturn, getAllHistory, getAllHistoryBySelectedTab, refused } from "@/services/database/historyQueries";
import { HistoryRecordsWithInformations } from "@/services/types/historyRecordsWithProducts";
import React, { useContext, useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, Text, TouchableOpacity, View } from "react-native";
import styles from "../../styles/_stylesPadrao";
;

export default function ProductController() {
    const user = useContext(UserContext);
    const [history, setHistory] = useState<HistoryRecordsWithInformations[]>([]);
    const [historyAll, setHistoryAll] = useState<HistoryRecordsWithInformations[]>([]);
    const [selectedTab, setSelectedTab] = useState<"espera" | "alugadas" | "devolvidas" | "recusados">("espera");
    const [loading, setLoading] = useState(false);
    const [reloadFlag, setReloadFlag] = useState(false);


    async function fetchHistory() {
        if (!user.user?.id) return;

        let data: HistoryRecordsWithInformations[] | null = null;

        if (selectedTab === "espera") {
            data = await getAllHistoryBySelectedTab("espera", user.user.type!);
        } else if (selectedTab === "alugadas") {
            data = await getAllHistoryBySelectedTab("alugadas", user.user.type!);
        } else if (selectedTab === "devolvidas") {
            data = await getAllHistoryBySelectedTab("devolvidas", user.user.type!);
        } else if (selectedTab === "recusados") {
            data = await getAllHistoryBySelectedTab("recusados", user.user.type!);
        }
        setHistory(data || []);
    }

    async function fetchHistoryAll() {
        if (!user.user?.id) return;

        let data: HistoryRecordsWithInformations[] | null = null;
        data = await getAllHistory();
        setHistoryAll(data || []);
    }

    useEffect(() => {
        fetchHistory();
        fetchHistoryAll();
    }, [selectedTab, user.user?.id]);

    const requested = historyAll.filter((i) => i.status_id == 10);
    const loaned = historyAll.filter((i) => i.status_id == 11);
    const returned = historyAll.filter((i) => i.status_id == 12);
    const refuse = historyAll.filter((i) => i.status_id == 13);

    const filteredHistory =
        selectedTab === "espera"
            ? requested
            : selectedTab === "alugadas"
                ? loaned
                : selectedTab === "devolvidas"
                    ? returned
                    : refuse;

    return (
        <ScrollView style={styles.containerMain}>
            {/* 🔹 Cabeçalho */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Gerenciar Solicitações</Text>
            </View>

            {/* 🔹 Abas (como estatísticas) */}
            <View style={styles.statsContainer}>
                {[
                    { key: "espera", label: "Em Espera", count: requested.length, style: styles.badgeRequested },
                    { key: "alugadas", label: "Alugadas", count: loaned.length, style: styles.badgeLoan },
                    { key: "devolvidas", label: "Devolvidas", count: returned.length, style: styles.badgeReturned },
                    { key: "recusados", label: "Recusados", count: refuse.length, style: styles.badgeZerado },
                ].map((tab) => (
                    <TouchableOpacity
                        key={tab.key}
                        onPress={() => setSelectedTab(tab.key as "espera" | "alugadas" | "devolvidas" | "recusados")}
                        style={[styles.statBox, selectedTab === tab.key && styles.statBoxActive]}
                    >
                        <View style={[styles.badge, tab.style]}>
                            <Text style={[styles.badgeText, styles.statLabel]}>{tab.label}</Text>
                        </View>
                        <Text style={styles.statNumber}>{tab.count}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* 🔹 Lista de produtos */}
            {loading ? (
                <ActivityIndicator size="large" style={{ marginTop: 20 }} />
            ) : (
                <>
                    {filteredHistory.length === 0 ? (
                        <View style={styles.card}>
                            <View style={styles.iconBox}>
                                <Text style={{ fontSize: 26 }}>📦</Text>
                            </View>
                            <View style={{ flex: 1 }}>
                                <Text style={styles.cardTitle}>Nenhum item encontrado</Text>
                            </View>
                        </View>
                    ) : (
                        filteredHistory.map((item) => (
                            <View key={item.id} style={styles.card}>
                                <View style={styles.iconBox}>
                                    {selectedTab === "espera" && <Text style={{ fontSize: 26 }}>⏳</Text>}
                                    {selectedTab === "alugadas" && <Text style={{ fontSize: 26 }}>📦</Text>}
                                    {selectedTab === "devolvidas" && <Text style={{ fontSize: 26 }}>✅</Text>}
                                    {selectedTab === "recusados" && <Text style={{ fontSize: 26 }}>❌</Text>}
                                </View>

                                <View style={{ flex: 1 }}>
                                    <Text style={styles.cardTitle}>{item.products?.name}</Text>
                                    <Text style={styles.cardSubtitle}>{item.users?.name}</Text>
                                    <Text style={styles.cardSubtitle}>Qtd: {item.description || "-"}</Text>

                                    <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                                        {selectedTab === "recusados" ? (
                                            <Text style={styles.cardSubtitle}>
                                                Recusado em:{" "}
                                                {item.date_refused
                                                    ? new Date(item.date_refused).toLocaleDateString()
                                                    : "-"}
                                            </Text>
                                        ) : selectedTab === "espera" ? (
                                            <Text style={styles.cardSubtitle}>
                                                Solicitado em:{" "}
                                                {item.created_at
                                                    ? new Date(item.created_at).toLocaleDateString()
                                                    : "-"}
                                            </Text>
                                        ) : (
                                            <>
                                                <Text style={styles.cardSubtitle}>
                                                    Empréstimo em:{" "}
                                                    {item.date_loan
                                                        ? new Date(item.date_loan).toLocaleDateString()
                                                        : "-"}
                                                </Text>

                                                {selectedTab === "alugadas" && (
                                                    <View>
                                                        <Text style={styles.cardSubtitle}>
                                                            - Previsto para devolução:{" "}
                                                            {item.date_loan && item.loan_duration
                                                                ? new Date(
                                                                    new Date(item.date_loan).getTime() +
                                                                    item.loan_duration * 24 * 60 * 60 * 1000
                                                                ).toLocaleDateString()
                                                                : "-"}
                                                        </Text>
                                                    </View>
                                                )}

                                                {item.date_return && (
                                                    <Text style={styles.cardSubtitle}>
                                                        - Devolução: {new Date(item.date_return).toLocaleDateString()}
                                                    </Text>
                                                )}
                                            </>
                                        )}
                                    </View>
                                </View>

                                {(selectedTab === "espera" || selectedTab === "alugadas") && (
                                    <View style={styles.containerButtonsReport}>
                                        {(selectedTab === "espera") && (
                                            <TouchableOpacity
                                                style={[
                                                    styles.actionButton,
                                                    styles.refuseButton,
                                                ]}
                                                onPress={async () => {
                                                    setLoading(true);
                                                    try {
                                                        await refused(item.id, user.user?.type!);
                                                        await fetchHistory();
                                                        await fetchHistoryAll();
                                                    } finally {
                                                        setLoading(false);
                                                    }
                                                }}
                                            >
                                                <Text style={styles.actionButtonText}>
                                                    Recusar
                                                </Text>
                                            </TouchableOpacity>
                                        )}

                                        <TouchableOpacity
                                            style={[
                                                styles.actionButton,
                                                selectedTab === "espera" ? styles.confirmButton : styles.returnButton,
                                            ]}
                                            onPress={async () => {
                                                setLoading(true);
                                                try {
                                                    if (selectedTab === "espera") await confirmLoan(item.id);
                                                    else await confirmReturn(item.id);
                                                    await fetchHistory();
                                                    await fetchHistoryAll();
                                                } finally {
                                                    setLoading(false);
                                                }
                                            }}
                                        >
                                            <Text style={styles.actionButtonText}>
                                                {selectedTab === "espera" ? "Confirmar" : "Devolver"}
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                )}
                            </View>
                        ))
                    )}
                </>
            )}
        </ScrollView>
    );
}
