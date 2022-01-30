import * as actionTypes from "../actions/types";

const initialState = {
    loggedIn: false,
    registered: false,
    error: null,
    auth: null
};

const login = (state, action) => {
    if (action.payload === 200) {
        let st = { ...state, loggedIn: true };
        return st;
    } else {
        let st = { ...state, error: true };
        return st;
    }
};

const register = (state, action) => {
    if (action.payload === 200) {
        let st = { ...state, registered: true };
        return st;
    } else {
        let st = { ...state, error: true };
        return st;
    }
};

const fetchUser = (state, action) => {
    let st = { ...state, auth: action.payload || false }
    return st;
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.LOGIN:
            return login(state, action);
        case actionTypes.REGISTER:
            return register(state, action);
        case actionTypes.FETCH_USER:
            return fetchUser(state, action);
        default:
            return state;
    }
};

export default authReducer;
