import * as actionTypes from "../actions/types";

const initialState = [];

const addScoreToScoreboard = (state, action) => {
    let scoreboard = [...state];
    return action.payload;
};

const fetchScoreboard = (state, action) => {
    let scoreboard = [...state, action.payload];
    return action.payload;
};

const scoreboardReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADDSCORETOSCOREBOARD:
            return addScoreToScoreboard(state, action);
        case actionTypes.FETCHSCOREBOARD:
            return fetchScoreboard(state, action);
        default:
            return state;
    }
};

export default scoreboardReducer;
