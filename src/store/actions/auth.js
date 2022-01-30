import * as actionTypes from "./types";
import axios from "axios";

export const login = (user) => async (dispatch) => {
    let res,err;
    res = await axios.post("/api/login", user).catch(error => err=error.response.status)
    dispatch({ type: actionTypes.LOGIN, payload: res.status || err });
};

export const register = (user) => async (dispatch) => {
    const res = await axios.post("/api/register", user);
        console.log( res.data);

    dispatch({ type: actionTypes.REGISTER, payload: res.status });
};

export const fetchUser = () => async (dispatch) => {
    const res = await axios.get('/api/current_user');
    dispatch({ type: actionTypes.FETCH_USER, payload: res.data });
};
