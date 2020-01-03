import axios from 'axios';
import { GET_PROFILE, GET_DIARY } from './types';
import { tokenConfig } from "./auth";

// GET_PROFILE
export const getProfile  = username  => dispatch => {

    axios.get(`http://127.0.0.1:8000/api/users/${username}`)
        .then(res => {
            dispatch({
                type: GET_PROFILE,
                payload: res.data
            });
        }).catch(err => {
            console.log(err.response.data);
            console.log(err.response.state);
        })
}

//GET_DIARY
export const getDiary  = username  => dispatch => {

    axios.get(`http://127.0.0.1:8000/api/actions/diary?username=${username}`)
        .then(res => {
            dispatch({
                type: GET_DIARY,
                payload: res.data
            });
        }).catch(err => {
            console.log(err.response.data);
            console.log(err.response.state);
        })
}