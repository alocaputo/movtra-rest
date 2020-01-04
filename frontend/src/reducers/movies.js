import { GET_MOVIES, LOG_MOVIE, SEARCH_MOVIE, GET_MOVIE } from '../actions/types.js'

const initialState = {
    movies: [],
    movie: [],
    isLoaded: false
}

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_MOVIES:
        case LOG_MOVIE:
            return {
                ...state,
                movies: action.payload,
                isLoaded: true
            }
        case GET_MOVIE:
            return {
                ...state,
                movie: action.payload,
                isLoaded: true
            }
        case SEARCH_MOVIE:
            return {
                ...state,
                movies: action.payload,
                isLoaded: true
            }
        default:
            return state;
    }
}