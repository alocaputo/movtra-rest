import axios from 'axios';
import { GET_MOVIES, LOG_MOVIE, SEARCH_MOVIE, GET_MOVIE } from './types';
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

//GET_MOVIE
export const getMovie = (tmdb_id)=> dispatch => {
    axios.get(`http://127.0.0.1:8000/api/movies/${tmdb_id}`)
    .then(res => {
        dispatch({
            type: GET_MOVIE,
            payload: res.data
        });
    }).catch(err => console.log(err));
};

//LOG_MOVIE
export const logMovie = ({ movie, review, rating, favorite, date }) => (dispatch, getState) => {

    const body = JSON.stringify({ movie, review, rating, favorite, date });

    axios.post('http://127.0.0.1:8000/api/actions/diary', body, tokenConfig(getState))
    .then(res => {
        dispatch({
            type: LOG_MOVIE,
            payload: res.data
        });
    }).catch(err => console.log(err));
};

//SEARCH_MOVIE
export const searchMovie = ({ title }) => dispatch => {


    axios.get(`http://127.0.0.1:8000/api/movies/search/${title}`)
    .then(res => {
        dispatch({
            type: SEARCH_MOVIE,
            payload: res.data
        });
    }).catch(err => console.log(err));
};