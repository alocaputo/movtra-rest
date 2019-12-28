import axios from 'axios';
import { GET_MOVIES } from './types';
import { tokenConfig } from "./auth";

//GET_MOVIES
export const getMovies = () => (dispatch, getState) => {
    axios.get('http://127.0.0.1:8000/api/movies/', tokenConfig(getState))
    .then(res => {
        dispatch({
            type: GET_MOVIES,
            payload: res.data
        });
    }).catch(err => console.log(err));
};