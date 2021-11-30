import * as actionTypes from "../actions/types";

const initialState = [];

const addScoreToScoreboard = (state, action) => {
  let scoreboard = [...state, action.score];
  scoreboard.sort((a, b) => (a.score > b.score ? -1 : 1));
  return scoreboard;
};

const scoreboardReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADDSCORETOSCOREBOARD:
      return addScoreToScoreboard(state, action);
    default:
      return state;
  }
};

export default scoreboardReducer;
