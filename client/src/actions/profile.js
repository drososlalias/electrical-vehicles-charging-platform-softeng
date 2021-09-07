import axios from "axios";


import {GET_PROFILE , PROFILE_ERROR} from "./types";
import setAuthToken from "../utils/setAuthToken";

//Get current User Profile

export const getCurrentUser = () => async dispatch => {
    if (localStorage.token) {
        setAuthToken(localStorage.token);
    }
    try{
        const res = await axios.get('https://localhost:8765/evcharge/api/login/me');
        dispatch({
            type: GET_PROFILE,
            payload : res.data
        });
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: err.response.statusText , status : err.response.status}
        });
    }
}