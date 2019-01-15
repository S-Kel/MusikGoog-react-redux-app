import React, { Component } from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';

import { fetchArtist, fetchTracks} from '../redux/actions/artistAction'
import './App.css';
import ACCESS_TOKEN from '../config';


import Nav from '../components/nav';
import SearchArtistForm from '../components/artistSearchForm';
import Profile from '../components/profile';
import Gallery from '../components/galleries/Gallery';



class App extends Component {
    state={
        query: '',
        search: '',
        artist: {id: 'xab-12ch-123h-fafa', name: '50 Cent', followers: '5 Millions', genres: ['Hip Hop', 'RnB', 'Afrikaan'], avatar: 'https://media.gettyimages.com/photos/recording-artist-curtis-50-cent-jackson-of-the-music-group-gunit-picture-id455835418?s=612x612'},
        tracks: [
                {id: 'xab-12ch-123h-fafa', name: '50 Cent P.I.M.P',     url1: 'https://media.gettyimages.com/photos/recording-artist-50-cent-designer-kimora-lee-simmons-and-russell-picture-id73279995?s=612x612', album:{images: [{url: 'https://media.gettyimages.com/photos/recording-artist-50-cent-designer-kimora-lee-simmons-and-russell-picture-id73279995?s=612x612'}]}},
                {id: 'xab-12ch-123h-faf1', name: '50 Cent Candy Shop',  url1: 'https://ksassets.timeincuk.net/wp/uploads/sites/55/2017/09/50-Cent-GettyImages-853890410-1-920x584.jpg', album:{images: [{url: 'https://ksassets.timeincuk.net/wp/uploads/sites/55/2017/09/50-Cent-GettyImages-853890410-1-920x584.jpg'}]}},
                {id: 'xab-12ch-123h-faf2', name: '50 Cent In the Club',  url1: 'https://images-na.ssl-images-amazon.com/images/I/514rMymljXL.jpg', album:{images: [{url: 'https://images-na.ssl-images-amazon.com/images/I/514rMymljXL.jpg'}]}},
                {id: 'xab-12ch-123h-faf3', name: '50 Cent Many Men',     url1: 'https://media.gettyimages.com/photos/recording-artist-curtis-50-cent-jackson-of-the-music-group-gunit-picture-id455835418?s=612x612', album:{images: [{url: 'https://media.gettyimages.com/photos/recording-artist-curtis-50-cent-jackson-of-the-music-group-gunit-picture-id455835418?s=612x612'}]}},
                {id: 'xab-12ch-123h-faf4', name: '50 Cent Window Shopper',url1: 'https://cdn.shopify.com/s/files/1/2551/3076/files/50-Cent-Signo-del-Zodiaco-Cancer-2_large.jpg?v=1522177911', album:{images: [{url: 'https://cdn.shopify.com/s/files/1/2551/3076/files/50-Cent-Signo-del-Zodiaco-Cancer-2_large.jpg?v=1522177911'}]}},
        ]
    }
    
    async componentDidMount() {
        const BASE_URL = 'https://api.spotify.com/v1/search?';
        const ALBUM_URL = 'https://api.spotify.com/v1/artists/';
        
        const URI = `${BASE_URL}q=Nelly&type=artist&limit=1`;
        let fetchURL = encodeURI(URI);
        const { accessToken } = ACCESS_TOKEN;

        const options = {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${accessToken}` },
            mode: 'cors',
            cache: 'default'
        };
        await this.props.fetchArtist(fetchURL, options);
        const {artist,error}= this.props;
        if(artist){
            console.log("This.props.error artist Fetch error", error);
            console.log("This.props.tracks", artist);  

            fetchURL = `${ALBUM_URL}${artist.id}/top-tracks?country=US&`;
            await this.props.fetchTracks(fetchURL, options);

            console.log("This.props.tracks", this.props.tracks);  
            console.log("This.props.error  tracks Fetch error", error);
        }
    }

    fetchArtist = async(url, options)=>{
        try{
            const res = await fetch(url, options);
            const json = await res.json();
            return json;
        }catch(err){console.log("Error has occurred! ", err)}
    }
    searchArtist = async(url)=>{
        const BASE_URL = 'https://api.spotify.com/v1/search?';
        const ALBUM_URL = 'https://api.spotify.com/v1/artists/';
        const URI = `${BASE_URL}q=${this.state.query}&type=artist&limit=1`; 
        let fetchURL = encodeURI(URI);  
        const {accessToken} = ACCESS_TOKEN;      
                
        const options = {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${accessToken}` },
            mode: 'cors',
            cache: 'default'
        };
        try{
            const json = await this.fetchArtist(fetchURL, options);
            const {name, followers, genres, id, images } = json.artists.items[0];
            const artist = {
                id,
                name,
                followers: followers.total ,
                avatar: images[0].url,
                genres: genres           
            };      

            this.setState({artist});

            fetchURL = `${ALBUM_URL}${id}/top-tracks?country=US&`;  
            const album = await this.fetchArtist(fetchURL, options);
            const {tracks}= album;
            this.setState({tracks});

        }catch(err){ console.log("Unable to fetch Artist", err)}        
      
    }

    handleArtistSearch =(evt)=>{        
        this.setState({query: evt.target.value});        
    }

    handleEnterKeyEvent = (evt)=>{
        if(evt.key !=="Enter") return;
        this.searchArtist();
        this.setState({search: '', query: ''});

        // console.log('evt.target.value', evt.target.value);
    }

    render() {
        const {query, tracks, artist} = this.state;
        return (
            <div className="App" >
                <Nav />
                <SearchArtistForm
                    onEnterKey={this.handleEnterKeyEvent}
                    search={query}
                    searchArtist={this.handleArtistSearch}
                />
                {
                    artist ? (<div><Profile artist={artist} /><Gallery tracks={tracks} /></div>)
                           : (<div></div>)
                }
            </div>            
        );
    }
}

PropTypes.App={
    fetchArtist: PropTypes.func.isRequired,
    tracks: PropTypes.array.isRequired,
    artist: PropTypes.object.isRequired
}
const mapStateTopProps=state=>({
    artist: state.profile.artist,
    tracks: state.profile.tracks,
    error: state.profile.error
});

export default connect(mapStateTopProps, { fetchArtist, fetchTracks})(App);