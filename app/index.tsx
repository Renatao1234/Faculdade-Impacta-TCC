import { useRouter } from "expo-router";
import { Button, StyleSheet, Text, View } from "react-native";

export default function Menu() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Menu Inicial</Text>
      <Button title="Ir para Login" onPress={() => router.push("/login")} />
      <Button title="Ir para Home" onPress={() => router.push("/home")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 24, marginBottom: 20 },
});
