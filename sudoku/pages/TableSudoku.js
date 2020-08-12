import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Constants from "expo-constants";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Dimensions,
  Button,
} from "react-native";
import {
  setTable,
  tableByDifficulty,
  validateData,
  solveData,
  setLeaderBoard,
} from "../store/actions/sudokuAction";
const boxSize = (Dimensions.get("window").width - 40) / 9;

export default function TableSudoku({ navigation, route }) {
  const [mins, setMins] = useState(0);
  const [secs, setSecs] = useState(0);
  const [formSudoku, setFormSudoku] = useState([]);
  const dispatch = useDispatch();
  const { sudokuData } = useSelector((state) => state);

  const { dataEditSudoku } = useSelector((state) => state);

  const { status } = useSelector((state) => state);

  useEffect(() => {
    dispatch(setTable());
  }, [dispatch]);

  useEffect(() => {
    setFormSudoku(JSON.parse(JSON.stringify(sudokuData)));
  }, [sudokuData]);

  useEffect(() => {
    if (sudokuData) {
      const timerId = setInterval(() => {
        if (secs >= 59) {
          setMins((m) => m + 1);
          setSecs(0);
        } else setSecs((s) => s + 1);
      }, 1000);
      return () => clearInterval(timerId);
    }
  }, [secs, mins]);

  const formatTime = () => {
    let minutes = "";
    if (mins < 10) {
      minutes = `0${mins}`;
    } else {
      minutes = mins;
    }
    let seconds = "";
    if (secs < 10) {
      seconds = `0${secs}`;
    } else {
      seconds = secs;
    }
    return `${minutes} : ${seconds}`;
  };

  function formHandler(e, rowIdx, colIdx) {
    const newData = [...formSudoku];
    newData[rowIdx][colIdx] = Number(e);
    setFormSudoku(newData);
    console.log(formSudoku, "break", sudokuData, "hehe");
  }

  function validateHandler() {
    // console.log(sudokuData, dataEditSudoku, "hehehe");
    const solve = { board: formSudoku };
    dispatch(validateData(solve));
    console.log(status, "Cek status");
    if (status === "solved") {
      let minutes = mins;
      let convertMinToSec = Number(minutes) * 60;
      let totalSec = Number(secs) + convertMinToSec;

      const leaderBoard = {
        name: route.params.name,
        time: totalSec,
      };
      dispatch(setLeaderBoard(leaderBoard));
      navigation.navigate("Finish");
    }
  }

  function solveHandler() {
    setFormSudoku([]);
    const solve = { board: sudokuData };
    dispatch(solveData(solve));
  }

  function changeDifficultyHandler(difficulty) {
    dispatch(tableByDifficulty(difficulty));
    setFormSudoku([]);
    setMins(0);
    setSecs(0);
  }
  function convertData(row, column) {
    let data = [];
    for (let i = 0; i < sudokuData.length; i++) {
      let data2 = [];
      for (let j = 0; j < sudokuData[i].length; j++) {
        if (Number(sudokuData[i][j]) === 0) {
          data2.push("");
        } else {
          data2.push(String(sudokuData[i][j]));
        }
      }
      data.push(data2);
    }
    return data[row][column];
  }
  return (
    <View style={styles.container}>
      <View>
        {formSudoku.length === 0 && (
          <View>
            <Text>Loading.....</Text>
          </View>
        )}
        {formSudoku.length !== 0 && (
          <View>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text>Hello {route.params.name}</Text>
              <Text>Timer: {formatTime()}</Text>
            </View>
            {formSudoku.map((row, rowIdx) => {
              return (
                <View style={{ flexDirection: "row" }}>
                  {row.map((column, colIdx) => {
                    return (
                      <TextInput
                        onChangeText={(e) => formHandler(e, rowIdx, colIdx)}
                        style={{
                          paddingLeft: 10,
                          borderLeftWidth: colIdx === 0 ? 4 : 0.2,
                          borderRightWidth: colIdx % 3 === 2 ? 4 : 0.2,
                          borderTopWidth: rowIdx === 0 ? 4 : 0.2,
                          borderBottomWidth: rowIdx % 3 === 2 ? 4 : 0.2,
                          padding: 2,
                          borderColor: "black",
                          width: boxSize,
                          height: boxSize,
                          backgroundColor: convertData(rowIdx, colIdx)
                            ? "grey"
                            : "white",
                        }}
                        maxLength={1}
                        editable={convertData(rowIdx, colIdx) ? false : true}
                        defaultValue={convertData(rowIdx, colIdx)}
                        keyboardType="number-pad"
                      />
                    );
                  })}
                </View>
              );
            })}
            <Text
              style={{
                justifyContent: "center",
                textAlign: "center",
                marginTop: 2,
              }}
            >
              Select difficulty:
            </Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 2,
                // marginRight: 75,
              }}
            >
              <View>
                <Button
                  title="Easy"
                  onPress={() => changeDifficultyHandler("easy")}
                  color="green"
                />
              </View>
              <View>
                <Button
                  title="Medium"
                  onPress={() => changeDifficultyHandler("medium")}
                  color="green"
                />
              </View>
              <View>
                <Button
                  title="Hard"
                  onPress={() => changeDifficultyHandler("hard")}
                  color="green"
                />
              </View>
            </View>
            <View
              style={{
                // width: 100,
                justifyContent: "space-around",
                flexDirection: "row",
                marginTop: 5,
                // marginRight: 75,
              }}
            >
              <View>
                <Button title="Validate" onPress={() => validateHandler()} />
              </View>
              <View>
                <Button title="Solve" onPress={() => solveHandler()} />
              </View>
            </View>
          </View>
        )}
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
