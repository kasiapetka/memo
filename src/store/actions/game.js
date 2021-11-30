import * as actionTypes from "./types";

export const setUsername = (username) => {
  return {
    type: actionTypes.SETUSERNAME,
    username: username,
  };
};

export const setGameStatus = (status) => {
  return {
    type: actionTypes.SETGAMESTATUS,
    status: status,
  };
};

export const resetGame = () => {
  return {
    type: actionTypes.RESETGAME,
  };
};

export const setDifficulty = (difficulty) => {
  return {
    type: actionTypes.SETDIFFICULTY,
    difficulty: difficulty,
  };
};

export const setTime = (time) => {
  return {
    type: actionTypes.SETTIME,
    time: time,
  };
};

export const calcScore = () => {
  return {
    type: actionTypes.CALCSCORE,
  };
};

export const addAttempt = () => {
  return {
    type: actionTypes.ADDATTEMPT,
  };
};
