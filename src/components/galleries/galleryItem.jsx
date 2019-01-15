import React from "react";
import "../../app/App.css";

function GalleryItem(props) {
  const {track} = props;
  return (
    <div className="artist-track">
        <img className="artist-tractImg" src={track.album.images[0].url} alt="track" />
        <div className="artist-track-play">
          <div className="artist-play-inner">&#9654;</div>
        </div>
        <p className="artist-track-text">{track.name}</p>
    </div>);
}

// Export Genre
export default GalleryItem;
