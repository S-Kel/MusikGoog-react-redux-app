import React from 'react';
import logo from '../app/logo.png';
import '../app/App.css';

 const Nav = ()=> {
    return(
      <header className="App-header" >
        <img src={logo}
          className="App-logo"
          alt="logo" />
      </header > 
    );
}

export default Nav;