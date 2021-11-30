import * as actionTypes from "../actions/types";

const initialState = {
  username: "",
  difficulty: 1,
  time: 0,
  gameStatus: 0,
  score: 0,
  attempts: 0,
};

const setUsername = (state, action) => {
  return { ...state, username: action.username };
};


const setDifficulty = (state, action) => {
  return { ...state, difficulty: action.difficulty };
};

const resetGame = (state, action) => {
  return {
    ...state,
    time: 0,
    attempts: 0,
    gameStatus: 0,
    score: 0,
  };
};

const setGameStatus = (state, action) => {
  return { ...state, gameStatus: action.status };
};

const setTime = (state, action) => {
  return { ...state, time: action.time };
};

const calcScore = (state, action) => {
  let scoreResult = 0;
  if (100 * state.difficulty - (state.attempts + state.time) <= 0)
    scoreResult = 0;
  else {
    scoreResult = 100 * state.difficulty - (state.attempts + state.time);
  }
  return {
    ...state,
    score: scoreResult,
  };
};

const addAttempt = (state, action) => {
  return { ...state, attempts: state.attempts + 1 };
};

const gameReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SETTIME:
      return setTime(state, action);
    case actionTypes.SETUSERNAME:
      return setUsername(state, action);
    case actionTypes.RESETGAME:
      return resetGame(state, action);
    case actionTypes.SETDIFFICULTY:
      return setDifficulty(state, action);
    case actionTypes.SETGAMESTATUS:
      return setGameStatus(state, action);
    case actionTypes.CALCSCORE:
      return calcScore(state, action);
    case actionTypes.ADDATTEMPT:
      return addAttempt(state, action);
    default:
      return state;
  }
};

export default gameReducer;
