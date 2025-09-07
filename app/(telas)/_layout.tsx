import { Slot } from "expo-router";

export default function RootLayout() {
  // Esse é o layout global, só precisa renderizar o Slot
  return <Slot />;
}
