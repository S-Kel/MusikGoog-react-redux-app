import React, { Component } from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import {Container} from 'semantic-ui-react';
import '../../app/App.css';
import GalleryItem from "./galleryItem";
 

class Gallery extends Component {
  render() { 
    const { tracks } = this.props;
    return (        
      <div className="tests">
        <Container> {tracks.map((track,key) => <GalleryItem key={track.id} track={track} />)}</Container>     
      </div>
    
    );
  }
}

PropTypes.SearchArtist = {
  tracks: PropTypes.array.isRequired,
}
const mapStateTopProps = state => ({
    tracks: state.profile.tracks
});

export default connect(mapStateTopProps, {})(Gallery);

 