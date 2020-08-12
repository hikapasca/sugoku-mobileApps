import React from "react";
import { StyleSheet, Text, View } from "react-native";
import FormName from "../components/formName";
export default function Home({ navigation }) {
  function playHandler(name) {
    navigation.navigate("Sudoku", { name });
  }
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 30, fontWeight: "bold" }}>SUDOKU</Text>
      <Text style={{ marginTop: 50 }}>Silahkan masukkan nama</Text>
      <FormName formName={(name) => playHandler(name)} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
