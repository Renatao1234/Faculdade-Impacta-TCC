import { UserContext } from "@/services/contexts/userContext";
import { getAllHistoryByUser, refused } from "@/services/database/historyQueries";
import { HistoryRecordsWithInformations } from "@/services/types/historyRecordsWithProducts";
import { useFocusEffect } from "expo-router";
import React, { useCallback, useContext, useRef, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import styles from "../../styles/_stylesPadrao";

export default function Historico() {
  const user = useContext(UserContext);
  const [history, setHistory] = useState<HistoryRecordsWithInformations[]>([]);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<ScrollView | null>(null);
  const requestedRef = useRef<View | null>(null);
  const loanRef = useRef<View | null>(null);
  const returnedRef = useRef<View | null>(null);
  const rejectRef = useRef<View | null>(null);
  const canceledRef = useRef<View | null>(null);


  async function fetchHistory() {
    if (!user.user?.id) return;

    let data: HistoryRecordsWithInformations[] | null = null;
    data = await getAllHistoryByUser(user.user.id);
    setHistory(data || []);
  }

  const scrollToSection = (ref: React.RefObject<View | null>) => {
    const scrollViewNode = scrollRef.current;
    const sectionNode = ref.current;

    if (scrollViewNode && sectionNode) {
      sectionNode.measureLayout(
        (scrollViewNode as any).getInnerViewNode(),
        (x: number, y: number) => {
          scrollViewNode.scrollTo({ y, animated: true });
        },
        () => {
          console.warn("Erro ao medir layout");
        }
      );
    }
  };

  // Cálculo dos status
  const requested = history.filter((i) => i.status_id == 10);
  const loan = history.filter((i) => i.status_id == 11);
  const returned = history.filter((i) => i.status_id == 12);
  const reject = history.filter((i) => i.status_id == 13);
  const canceled = history.filter((i) => i.status_id == 14);

  useFocusEffect(
    useCallback(() => {
      fetchHistory();
    }, [])
  );

  return (
    <ScrollView ref={scrollRef} style={[styles.containerMain]}>

      {/* Título */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Histórico</Text>
      </View>

      {/* Estatísticas */}
      <View style={styles.statsContainer}>
        <TouchableOpacity
          style={styles.statBox}
          onPress={() => scrollToSection(requestedRef)}
        >
          <View style={[styles.badge, styles.badgeRequested]}>
            <Text style={[styles.badgeText, styles.statLabel]}>Solicitados</Text>
          </View>
          <Text style={styles.statNumber}>{requested.length}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.statBox}
          onPress={() => scrollToSection(loanRef)}
        >
          <View style={[styles.badge, styles.badgeLoan]}>
            <Text style={[styles.badgeText, styles.statLabel]}>Alugados</Text>
          </View>
          <Text style={styles.statNumber}>{loan.length}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.statBox}
          onPress={() => scrollToSection(returnedRef)}
        >
          <View style={[styles.badge, styles.badgeReturned]}>
            <Text style={[styles.badgeText, styles.statLabel]}>Devolvidos</Text>
          </View>
          <Text style={styles.statNumber}>{returned.length}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.statBox}
          onPress={() => scrollToSection(rejectRef)}
        >
          <View style={[styles.badge, styles.badgeZerado]}>
            <Text style={[styles.badgeText, styles.statLabel]}>Recusados</Text>
          </View>
          <Text style={styles.statNumber}>{reject.length}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.statBox}
          onPress={() => scrollToSection(canceledRef)}
        >
          <View style={[styles.badge, styles.badgeCanceled]}>
            <Text style={[styles.badgeText, styles.statLabel]}>Cancelados</Text>
          </View>
          <Text style={styles.statNumber}>{canceled.length}</Text>
        </TouchableOpacity>
      </View>

      {/* Lista por status */}
      <View ref={requestedRef}>
        <Text style={styles.listTitle}>Solicitados</Text>
      </View>


      {requested.length === 0 && (
        <View style={styles.card}>
          <View style={styles.iconBox}>
            <Text style={{ fontSize: 26 }}>⏳</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.cardTitle}>Nenhum item em Solicitados</Text>
          </View>
          <View style={[styles.badge, styles.badgeRequested]}>
            <Text style={styles.badgeText}></Text>
          </View>
        </View>
      )}

      {requested.map((item) => (
        <View key={item.id} style={styles.card}>

          <View style={styles.iconBox}>
            <Text style={{ fontSize: 26 }}>⏳</Text>
          </View>

          <View style={{ flex: 1 }}>
            <Text style={styles.cardTitle}>{item.products!.name}</Text>
            <Text style={styles.cardSubtitle}>
              Qtd: {item.description}
            </Text>
          </View>

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
              } finally {
                setLoading(false);
              }
            }}
          >
            <Text style={styles.actionButtonText}>
              Recusar
            </Text>
          </TouchableOpacity>

          <View style={[styles.badge, styles.badgeRequested]}>
            <Text style={styles.badgeText}></Text>
          </View>
        </View>
      ))}

      {/* ========================== */}

      <View ref={loanRef}>
        <Text style={styles.listTitle}>Alugados</Text>
      </View>

      {loan.length === 0 && (
        <View style={styles.card}>
          <View style={styles.iconBox}>
            <Text style={{ fontSize: 26 }}>📦</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.cardTitle}>Nenhum item em Alugados</Text>
          </View>
          <View style={[styles.badge, styles.badgeLoan]}>
            <Text style={styles.badgeText}></Text>
          </View>
        </View>
      )}

      {loan.map((item) => (
        <View key={item.id} style={styles.card}>

          <View style={styles.iconBox}>
            <Text style={{ fontSize: 26 }}>📦</Text>
          </View>

          <View style={{ flex: 1 }}>
            <Text style={styles.cardTitle}>{item.products!.name}</Text>
            <Text style={styles.cardSubtitle}>
              Qtd: {item.description}
            </Text>
            <View style={{ flexDirection: "row" }}>
              <Text style={[styles.cardSubtitle, { paddingRight: 80 }]}>Empréstimo: {item.date_loan ? new Date(item.date_loan).toLocaleDateString() : "—"}</Text>
            </View>
          </View>

          <View style={[styles.badge, styles.badgeLoan]}>
            <Text style={styles.badgeText}></Text>
          </View>

        </View>
      ))}

      {/* ========================== */}

      <View ref={returnedRef}>
        <Text style={styles.listTitle}>Devolvidos</Text>
      </View>

      {returned.length === 0 && (
        <View style={styles.card}>
          <View style={styles.iconBox}>
            <Text style={{ fontSize: 26 }}>✅</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.cardTitle}>Nenhum item em Devolvidos</Text>
          </View>
          <View style={[styles.badge, styles.badgeReturned]}>
            <Text style={styles.badgeText}></Text>
          </View>
        </View>
      )}

      {returned.map((item) => (
        <View key={item.id} style={styles.card}>

          <View style={styles.iconBox}>
            <Text style={{ fontSize: 26 }}>✅</Text>
          </View>

          <View style={{ flex: 1 }}>
            <Text style={styles.cardTitle}>{item.products!.name}</Text>
            <Text style={styles.cardSubtitle}>
              Qtd: {item.description}
            </Text>
            <View style={{ flexDirection: "row" }}>
              <Text style={[styles.cardSubtitle, { paddingRight: 80 }]}>Empréstimo: {item.date_loan ? new Date(item.date_loan).toLocaleDateString() : "—"}</Text>
              <Text style={styles.cardSubtitle}>Devolução: {item.date_return ? new Date(item.date_return).toLocaleDateString() : "—"}</Text>
            </View>
          </View>

          <View style={[styles.badge, styles.badgeReturned]}>
            <Text style={styles.badgeText}></Text>
          </View>

        </View>
      ))}

      {/* ========================== */}

      <View ref={rejectRef}>
        <Text style={styles.listTitle}>Recusados</Text>
      </View>

      {reject.length === 0 && (
        <View style={styles.card}>
          <View style={styles.iconBox}>
            <Text style={{ fontSize: 26 }}>❌</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.cardTitle}>Nenhum item em Cancelados</Text>
          </View>
          <View style={[styles.badge, styles.badgeZerado]}>
            <Text style={styles.badgeText}></Text>
          </View>
        </View>
      )}

      {reject.map((item) => (
        <View key={item.id} style={styles.card}>

          <View style={styles.iconBox}>
            <Text style={{ fontSize: 26 }}>❌</Text>
          </View>

          <View style={{ flex: 1 }}>
            <Text style={styles.cardTitle}>{item.products!.name}</Text>
            <Text style={styles.cardSubtitle}>
              Qtd: {item.description}
            </Text>
            <View style={{ flexDirection: "row" }}>
              <Text style={[styles.cardSubtitle, { paddingRight: 80 }]}>Recusado em:{" "}
                {item.date_refused
                  ? new Date(item.date_refused).toLocaleDateString()
                  : "-"}</Text>
            </View>
          </View>

          <View style={[styles.badge, styles.badgeZerado]}>
            <Text style={styles.badgeText}></Text>
          </View>

        </View>
      ))}

      {/* ========================== */}

      <View ref={canceledRef}>
        <Text style={styles.listTitle}>Cancelados</Text>
      </View>

      {canceled.length === 0 && (
        <View style={styles.card}>
          <View style={styles.iconBox}>
            <Text style={{ fontSize: 26 }}>❌</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.cardTitle}>Nenhum item em Cancelados</Text>
          </View>
          <View style={[styles.badge, styles.badgeCanceled]}>
            <Text style={styles.badgeText}></Text>
          </View>
        </View>
      )}

      {canceled.map((item) => (
        <View key={item.id} style={styles.card}>

          <View style={styles.iconBox}>
            <Text style={{ fontSize: 26 }}>❌</Text>
          </View>

          <View style={{ flex: 1 }}>
            <Text style={styles.cardTitle}>{item.products!.name}</Text>
            <Text style={styles.cardSubtitle}>
              Qtd: {item.description}
            </Text>
            <View style={{ flexDirection: "row" }}>
              <Text style={[styles.cardSubtitle, { paddingRight: 80 }]}>Recusado em:{" "}
                {item.date_refused
                  ? new Date(item.date_refused).toLocaleDateString()
                  : "-"}</Text>
            </View>
          </View>

          <View style={[styles.badge, styles.badgeCanceled]}>
            <Text style={styles.badgeText}></Text>
          </View>

        </View>
      ))}

    </ScrollView>
  );
}