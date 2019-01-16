import React, { Component} from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import {Grid, Segment, Search,Header, Icon } from 'semantic-ui-react';

import ACCESS_TOKEN from '../config';
import { fetchArtist, fetchTracks } from '../redux/actions/artistAction'

class SearchArtist extends Component{
    state = { query: ''};

    searchArtist = async () => {
        const BASE_URL = 'https://api.spotify.com/v1/search?';
        const ALBUM_URL = 'https://api.spotify.com/v1/artists/';
        let fetchURL = encodeURI(`${BASE_URL}q=${this.state.query}&type=artist&limit=1`);

        const { accessToken } = ACCESS_TOKEN;
        const options = {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${accessToken}` },
            mode: 'cors',
            cache: 'default'
        };

        await this.props.fetchArtist(fetchURL, options);       
        const { artist} = this.props;
        console.log("This.props.artist", artist);
        if (artist) {
            fetchURL = `${ALBUM_URL}${artist.id}/top-tracks?country=US&`;
            await this.props.fetchTracks(fetchURL, options);
        }
    }

    handleArtistSearch =(evt)=>{
        this.setState({ query: evt.target.value });
    }

    handleEnterKeyEvent = (evt) =>{
        if (evt.key !== "Enter" || !this.state.query) 
            return;

        this.searchArtist();
        console.log("this.state.query", this.state.query);
        this.setState({ query: '' });
    }

    render(){
        // const { search, searchArtist, onEnterKey } = props;
        return (
            <div>
                <Segment placeholder>
                    <Grid stackable textAlign='center'>
                        <Grid.Row verticalAlign='middle'>
                            <Grid.Column>
                                <Header icon color="teal">
                                    <Icon name='search' />
                                    Find an Artist
                                </Header>
                                <Search             
                                    size="big"
                                    value={this.state.query}
                                    onSearchChange={this.handleArtistSearch}
                                    onKeyDown={this.handleEnterKeyEvent}
                                    placeholder='Search ...'
                                />
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Segment>
            </div>
        );
    }
 }
    
PropTypes.SearchArtist= {
    fetchArtist: PropTypes.func.isRequired,
    fetchTracks: PropTypes.func.isRequired,
    artist: PropTypes.object.isRequired
}

const mapStateTopProps = state => ({
    artist: state.profile.artist
});
export default connect(mapStateTopProps, { fetchArtist, fetchTracks })(SearchArtist);