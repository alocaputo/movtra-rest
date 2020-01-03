import { GET_MOVIES, LOG_MOVIE, SEARCH_MOVIE } from '../actions/types.js'

const initialState = {
    movies: []
}

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_MOVIES:
        case LOG_MOVIE:
            return {
                ...state,
                movies: action.payload
            }
        case SEARCH_MOVIE:
            return {
                ...state,
                movies: action.payload
            }
        default:
            return state;
    }
}