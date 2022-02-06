import * as actionTypes from "./types";
import axios from "axios";

export const addScoreToScoreboard = (score) => async (dispatch) => {
    let res, err;
    res = await axios
        .post("/api/scoreboard", score)
        .catch((error) => (err = error.response.status));
    dispatch({
        type: actionTypes.ADDSCORETOSCOREBOARD,
        payload: res.status || err,
    });
};

export const fetchScoreboard = () => async (dispatch) => {
    let res, err;
    res = await axios
        .get("/api/scoreboard")
        .catch((error) => (err = error.response.status));
    dispatch({
        type: actionTypes.FETCHSCOREBOARD,
        payload: res.data || err,
    });
};
