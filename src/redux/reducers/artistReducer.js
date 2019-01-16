import { FETCH_ARTIST, FETCH_ERROR, FETCH_TRACKS } from '../consts/types';
import {} from '../actions/artistAction';

const initialState = {
    artist: { id: 'xab-12ch-123h-fafa', name: '50 Cent', followers: '5 Millions', genres: ['Hip Hop', 'RnB', 'Afrikaan'], avatar: 'https://media.gettyimages.com/photos/recording-artist-curtis-50-cent-jackson-of-the-music-group-gunit-picture-id455835418?s=612x612' },
    tracks: [
        { id: 'xab-12ch-123h-fafa', name: '50 Cent P.I.M.P', url1: 'https://media.gettyimages.com/photos/recording-artist-50-cent-designer-kimora-lee-simmons-and-russell-picture-id73279995?s=612x612', album: { images: [{ url: 'https://media.gettyimages.com/photos/recording-artist-50-cent-designer-kimora-lee-simmons-and-russell-picture-id73279995?s=612x612' }] } },
        { id: 'xab-12ch-123h-faf1', name: '50 Cent Candy Shop', url1: 'https://ksassets.timeincuk.net/wp/uploads/sites/55/2017/09/50-Cent-GettyImages-853890410-1-920x584.jpg', album: { images: [{ url: 'https://ksassets.timeincuk.net/wp/uploads/sites/55/2017/09/50-Cent-GettyImages-853890410-1-920x584.jpg' }] } },
        { id: 'xab-12ch-123h-faf2', name: '50 Cent In the Club', url1: 'https://images-na.ssl-images-amazon.com/images/I/514rMymljXL.jpg', album: { images: [{ url: 'https://images-na.ssl-images-amazon.com/images/I/514rMymljXL.jpg' }] } },
        { id: 'xab-12ch-123h-faf3', name: '50 Cent Many Men', url1: 'https://media.gettyimages.com/photos/recording-artist-curtis-50-cent-jackson-of-the-music-group-gunit-picture-id455835418?s=612x612', album: { images: [{ url: 'https://media.gettyimages.com/photos/recording-artist-curtis-50-cent-jackson-of-the-music-group-gunit-picture-id455835418?s=612x612' }] } },
        { id: 'xab-12ch-123h-faf4', name: '50 Cent Window Shopper', url1: 'https://cdn.shopify.com/s/files/1/2551/3076/files/50-Cent-Signo-del-Zodiaco-Cancer-2_large.jpg?v=1522177911', album: { images: [{ url: 'https://cdn.shopify.com/s/files/1/2551/3076/files/50-Cent-Signo-del-Zodiaco-Cancer-2_large.jpg?v=1522177911' }] } },
    ],
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