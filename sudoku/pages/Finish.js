import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { StyleSheet, Text, View, Button } from "react-native";
import TableLeaderboard from "../components/leaderboardTable";
export default function Finish({ navigation }) {
  const dispatch = useDispatch();
  const { leaderBoard } = useSelector((state) => state);
  const backToHomeHandler = () => {
    dispatch({
      type: "SET_STATUS",
      payload: "",
    });
    dispatch({
      type: "SET_TABLE",
      payload: [],
    });
    navigation.navigate("Home");
  };

  const leaderBoardFilter = () => {
    console.log("wkwkw");
    console.log(leaderBoard, "cek leaderboard");
    let flag = false;
    while (flag === false) {
      flag = true;
      for (let i = 0; i < leaderBoard.length - 1; i++) {
        if (leaderBoard[i].time > leaderBoard[i + 1].time) {
          flag = false;
          let swap = leaderBoard[i + 1];
          leaderBoard[i + 1] = leaderBoard[i];
          leaderBoard[i] = swap;
        }
      }
    }
    return leaderBoard.slice(0, 5);
  };
  return (
    <View style={styles.container}>
      <Text style={{ marginBottom: 4, fontWeight: "bold", fontSize: 30 }}>
        LEADERBOARD
      </Text>
      <View style={{ flexDirection: "row" }}>
        <Text
          style={{
            textAlign: "center",
            justifyContent: "center",
            borderWidth: 1,
            width: 50,
          }}
        >
          No
        </Text>
        <Text
          style={{
            textAlign: "center",
            justifyContent: "center",
            borderWidth: 1,
            width: 200,
          }}
        >
          Nama
        </Text>
        <Text
          style={{
            textAlign: "center",
            justifyContent: "center",
            borderWidth: 1,
            width: 100,
          }}
        >
          Waktu(s)
        </Text>
      </View>
      {leaderBoardFilter().map((data, idx) => (
        <TableLeaderboard key={idx} data={data} idx={idx} />
      ))}
      <View style={{ width: 200, marginTop: 20 }}>
        <Button
          color="green"
          title="Back To Home"
          onPress={() => backToHomeHandler()}
        />
      </View>
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
