import * as actionTypes from "./types";
import axios from "axios";

export const login = (user) => async (dispatch) => {
    console.log(user);
    const res = await axios.post("/api/login", user);
    console.log(res.status);
    dispatch({ type: actionTypes.LOGIN, payload: res.status });
};

export const register = (user) => async (dispatch) => {
    console.log(user);
    const res = await axios.post("/api/register", user);
    dispatch({ type: actionTypes.REGISTER, payload: res.data });
};

export const fetchUser = () => async (dispatch) => {
    //const res = await axios.get('/api/current_user');
    dispatch({ type: actionTypes.FETCH_USER, payload: null });
};
