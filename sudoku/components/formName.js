import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, Button, Alert } from "react-native";
export default function FormName(props) {
  const [name, setName] = useState("");

  const nameHandler = (e) => {
    setName(e);
  };

  function playHandler() {
    if (!name) {
      Alert.alert("Nama tidak boleh kosong!");
    } else if (name.length >= 10) {
      Alert.alert("Panjang maksimal kata yaitu 10 huruf!");
    } else {
      props.formName(name);
      setName("");
    }
  }
  return (
    <View>
      <TextInput
        placeholder="nama..."
        style={{
          borderColor: "black",
          borderWidth: 2,
          width: 200,
          marginTop: 20,
          paddingLeft: 10,
          paddingBottom: 10,
          paddingTop: 10,
        }}
        value={name}
        onChangeText={(e) => nameHandler(e)}
      />
      <View
        style={{
          width: 200,
          marginTop: 10,
          //   justifyContent: "center",
          //   alignItems: "center",
        }}
      >
        <Button title="Play!" color="green" onPress={() => playHandler()} />
      </View>
    </View>
  );
}
