import React, { Component } from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import {Container} from 'semantic-ui-react';
import '../../app/App.css';
import Genre from '../genres/genre'

class Profile extends Component {
  render() { 
    const {artist} = this.props;
    return ( 
      <Container>
        <div className="profile">
          <div className="profile-img">
            <img src={artist.avatar} alt="Profile" />
          </div>
          <div className="profile-info">
              <div className="profile-name">{artist.name} </div>
              <div className="profile-followers">{artist.followers} Followers</div>
              <Genre genres={artist.genres} />
          </div>
        </div>
      </Container>
    );
  }
}

PropTypes.SearchArtist = {
  artist: PropTypes.object.isRequired
}
const mapStateTopProps = state => ({
  artist: state.profile.artist
});

export default connect(mapStateTopProps, {})(Profile);