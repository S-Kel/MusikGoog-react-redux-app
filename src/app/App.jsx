import React, { Component } from 'react';
import './App.css';

import Nav from '../components/nav';
import SearchArtistForm from '../components/artistSearchForm';
import Profile from '../components/profiles/profile';
import Gallery from '../components/galleries/Gallery';

class App extends Component {
    render() {      
        return (
            <div className="App" >
                <Nav />
                <SearchArtistForm/>
                <Profile /> 
                <Gallery />                
            </div>            
        );
    }
}

export default App;
