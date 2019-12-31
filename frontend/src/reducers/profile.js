import { GET_PROFILE } from '../actions/types.js'

const initialState = {
    id: '',
    username: '',
    email: '',
    bio: '',
    watched: [],
    watchlist: [],
    favorites: [],
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
            }
        default:
            return state;
    }
}