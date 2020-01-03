import { GET_PROFILE, GET_DIARY } from '../actions/types.js'

const initialState = {
    id: '',
    username: '',
    email: '',
    bio: '',
    watched: [],
    watchlist: [],
    favorites: [],
    recent: [],
    diary: []
}

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_PROFILE:
            return {
                ...state,
                id: action.payload.id,
                username: action.payload.username,
                email: action.payload.email,
                bio: action.payload.bio,
                watched: action.payload.watched,
                watchlist: action.payload.watchlist,
                favorites: action.payload.favorites,
                recent: action.payload.recent,
            }
        case GET_DIARY:
            return {
                ...state,
                diary: action.payload
            }
        default:
            return state;
    }
}