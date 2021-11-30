import * as actionTypes from "./types";

export const addScoreToScoreboard = (score) => {
  return {
    type: actionTypes.ADDSCORETOSCOREBOARD,
    score: score,
  };
};
