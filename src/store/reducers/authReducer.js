import * as actionTypes from "../actions/types";

const initialState = {
    loggedIn: false,
};

const login = (state, action) => {
    if (action.payload === 200) {
        let st = { ...state, loggedIn: true };
        return st;
    }
};

const register = (state, action) => {
    // if (action.payload === 200) {
    //     let st = { ...state, loggedIn: true };
    //     return st;
    // }
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.LOGIN:
            return login(state, action);
        case actionTypes.REGISTER:
            return register(state, action);
        case actionTypes.FETCH_USER:
            return action.payload || false;
        default:
            return state;
    }
};

export default authReducer;
