import { FETCH_ARTIST, FETCH_ERROR, FETCH_TRACKS } from '../consts/types';
import {} from '../actions/artistAction';

const initialState = {
    artist: {},
    tracks: [],
    error: {}
};

export default (state = initialState, action) => {
    switch (action.type) {
        case FETCH_ARTIST:
            return {...state, artist: action.payload };
        case FETCH_TRACKS:
            return {...state, tracks: action.payload };
        case FETCH_ERROR:
            return {...state, error: action.payload };
        default:
            return state;
    }

}