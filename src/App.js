import React, { useState } from 'react';
import './App.css';
import Login from './Login';
import Dashboard from './Dashboard';
// import CheckFollowing from './Following';
// import SpotifyWebApi from 'spotify-web-api-node';

const SpotifyWebApi = require('spotify-web-api-node');

// credentials are optional
const spotifyApi = new SpotifyWebApi({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  redirectUri: process.env.REDIRECT_URI
});

// 'URLSearchParams(window.location.search)' will get url string after the '?' & .get() will get the code value from the url
const code = new URLSearchParams(window.location.search).get('code')
console.log(code);

function App() {

  return (
    <div className="App">
      <header className="App-header">Check if a user is following your Spotify playlist.
      </header>
      {code ?
        <>
          <Dashboard code={code} />
        </>
        : <Login />}
    </div>
  );
}

export default App;
