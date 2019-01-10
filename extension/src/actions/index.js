import axios from 'axios';
import {FETCH_USER, LOGOUT_USER} from './types'

export const fetchUser = () => async dispatch => {
    const res = await axios.get('http://127.0.0.1:5000/auth/current_user');
    dispatch({type: FETCH_USER, payload: res.data});
};

export const logoutCurrentUser = () => async dispatch => {
    console.log("function called");
    await axios.get('http://127.0.0.1:5000/auth/logout');
    dispatch({type: LOGOUT_USER});
};