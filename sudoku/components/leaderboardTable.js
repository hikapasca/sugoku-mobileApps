import React from "react";

import { StyleSheet, Text, View, TextInput, Button, Alert } from "react-native";

export default function TableLeaderboard({ data, idx }) {
  return (
    <View key={idx} style={{ flexDirection: "row" }}>
      <Text
        style={{
          textAlign: "center",
          justifyContent: "center",
          borderWidth: 1,
          width: 50,
        }}
      >
        {idx + 1}
      </Text>
      <Text
        style={{
          textAlign: "center",
          justifyContent: "center",
          borderWidth: 1,
          width: 200,
        }}
      >
        {data.name}
      </Text>
      <Text
        style={{
          textAlign: "center",
          justifyContent: "center",
          borderWidth: 1,
          width: 100,
        }}
      >
        {data.time}
      </Text>
    </View>
  );
}
