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
        const { artist, error} = this.props;

       if (artist && error===null) {
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
        const { error } = this.props;
        return (            
            <div>
                <Segment placeholder>
                    <Grid stackable textAlign='center'>
                        <Grid.Row verticalAlign='middle'>
                            <Grid.Column>
                                <Header icon color="teal">
                                    {error !== null && (<div style={{ color: 'red', backgroundColor: 'yellow', padding: '10px', marginBottom: '20px'}}><em>Could not fetch from spotify!!!</em> update your Access key</div>)}
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
    artist: PropTypes.object.isRequired,
    error: PropTypes.object.isRequired
}

const mapStateTopProps = state => ({
    artist: state.profile.artist,
    error: state.profile.error
});
export default connect(mapStateTopProps, { fetchArtist, fetchTracks })(SearchArtist);