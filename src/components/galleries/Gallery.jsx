import React, { Component } from 'react';
import {Container} from 'semantic-ui-react';
import '../../app/App.css';
import GalleryItem from "./galleryItem";
 

class Gallery extends Component {
//  state={
//    tracks: []
//  };

  render() { 
    const { tracks } = this.props;
    return (        
      <div className="tests">
        <Container> {tracks.map((track,key) => <GalleryItem key={track.id} track={track} />)}</Container>     
      </div>
    
    );
  }
}
  
 export default Gallery;

 