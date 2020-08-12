import { StatusBar } from "expo-status-bar";
import React, { useEffect, Component, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  TextInput,
} from "react-native";

import { Home, Finish, TableSudoku } from "./pages";
import { Table, Row, Rows } from "react-native-table-component";
import { Provider } from "react-redux";
import Constants from "expo-constants";
import store from "./store/index";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

export default function App() {
  const Stack = createStackNavigator();
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={Home}
            // options={{
            //   headerStyle: {
            //     backgroundColor: "grey",
            //   },
            // }}
          />
          <Stack.Screen name="Sudoku" component={TableSudoku} />
          <Stack.Screen name="Finish" component={Finish} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginTop: Constants.statusBarHeight,
  },
});
