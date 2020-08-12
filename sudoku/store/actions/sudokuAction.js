export const setTable = () => {
  return (dispatch) => {
    let url = "https://sugoku.herokuapp.com/board?difficulty=hard";
    fetch(url)
      .then((resp) => resp.json())
      .then((result) => {
        console.log("apakah masuk");
        dispatch({
          type: "SET_TABLE",
          payload: result.board,
        });
        dispatch({
          type: "SET_EDIT_TABLE",
          payload: result.board,
        });
        dispatch({
          type: "SET_STATUS",
          payload: "",
        });
      })
      .catch((err) => {
        // console.log(err, "ini error");
      });
  };
};

export const tableByDifficulty = (difficulty) => {
  return (dispatch) => {
    let url = `https://sugoku.herokuapp.com/board?difficulty=${difficulty}`;
    fetch(url)
      .then((resp) => resp.json())
      .then((result) => {
        console.log("apakah masuk");
        dispatch({
          type: "SET_TABLE",
          payload: result.board,
        });
        dispatch({
          type: "SET_EDIT_TABLE",
          payload: result.board,
        });
        dispatch({
          type: "SET_STATUS",
          payload: "",
        });
      })
      .catch((err) => {});
  };
};

export const validateData = (data) => {
  // console.log()
  return (dispatch) => {
    // console.log("apakah masuk sini");
    const encodeBoard = (board) =>
      board.reduce(
        (result, row, i) =>
          result +
          `%5B${encodeURIComponent(row)}%5D${
            i === board.length - 1 ? "" : "%2C"
          }`,
        ""
      );

    const encodeParams = (params) =>
      Object.keys(params)
        .map((key) => key + "=" + `%5B${encodeBoard(params[key])}%5D`)
        .join("&");

    fetch("https://sugoku.herokuapp.com/validate", {
      method: "POST",
      body: encodeParams(data),
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    })
      .then((response) => response.json())
      .then((response) => {
        console.log("apakah masuk validate");
        console.log(response.status, "cek response");
        dispatch({
          type: "SET_STATUS",
          payload: response.status,
        });
        if (response.status === "unsolved") {
          console.log("ABC");
          dispatch({
            type: "SET_TABLE",
            payload: data.board,
          });
        }
      })
      .catch((err) => {
        console.log(err, "errornya apa");
      });
  };
};

export const solveData = (data) => {
  return (dispatch) => {
    const encodeBoard = (board) =>
      board.reduce(
        (result, row, i) =>
          result +
          `%5B${encodeURIComponent(row)}%5D${
            i === board.length - 1 ? "" : "%2C"
          }`,
        ""
      );

    const encodeParams = (params) =>
      Object.keys(params)
        .map((key) => key + "=" + `%5B${encodeBoard(params[key])}%5D`)
        .join("&");

    fetch("https://sugoku.herokuapp.com/solve", {
      method: "POST",
      body: encodeParams(data),
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    })
      .then((response) => response.json())
      .then((response) => {
        // console.log(response.status, "ini response");
        dispatch({
          type: "SET_TABLE",
          payload: response.solution,
        });
        dispatch({
          type: "SET_STATUS",
          payload: response.status,
        });
      });
  };
  // .catch(console.warn);
};

export const setLeaderBoard = (data) => {
  return {
    type: "ADD_LEADERBOARD",
    payload: data,
  };
};
