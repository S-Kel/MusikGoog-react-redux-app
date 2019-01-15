import { FETCH_ARTIST, FETCH_TRACKS, FETCH_ERROR } from "../consts/types";

export const fetchArtist = (url, options) => async dispatch => {
    try {
        const res = await fetch(url, options);
        const json = await res.json();
        const { name, followers, genres, id, images } = json.artists.items[0];
        const artist = {
            id,
            name,
            followers: followers.total,
            avatar: images[0].url,
            genres: genres
        };
        dispatch({ type: FETCH_ARTIST, payload: artist });
    } catch (err) { dispatch({ type: FETCH_ERROR, payload: err }) }
};

export const fetchTracks = (url, options) => async dispatch => {
    try {
        const res = await fetch(url, options);
        const album = await res.json();
        const { tracks } = album;
        dispatch({ type: FETCH_TRACKS, payload: tracks });
    } catch (err) { dispatch({ type: FETCH_ERROR, payload: err }) }
};