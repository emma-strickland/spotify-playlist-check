import React, { useState } from 'react';
import UseAuth from './UseAuth';
import getId from './utils/getIds';

const SpotifyWebApi = require('spotify-web-api-node');

// credentials are optional
const spotifyApi = new SpotifyWebApi({
  clientId: process.env.REACT_APP_CLIENT_ID,
  clientSecret: process.env.REACT_APP_CLIENT_SECRET,
  redirectUri: process.env.REACT_APP_REDIRECT_URI
});

const Dashboard = ({ code }) => {
  const accessToken = UseAuth(code);

  const [playlistId, setPlaylistId] = useState('');
  const [userId, setUserId] = useState('');
  const [isUserFollowing, setIsUserFollowing] = useState(null);
  const [error, setError] = useState('');

  spotifyApi.setAccessToken(accessToken);
  console.log('access token in dashboard!', accessToken)

  const isUserFollowingPlaylist = (playlistLink, profileLink) => {
    let playlistId = getId('playlist', playlistLink);
    let profileId = getId('user', profileLink);
    console.log('playlist id? ', playlistId)
    console.log('User id? ', userId)

    spotifyApi.areFollowingPlaylist('1242322676', playlistId, [profileId])
      .then(function (data) {
        console.log('data?', data)
        data.body.forEach(function (isFollowing) {
          console.log("User is following: " + isFollowing);
          setIsUserFollowing(isFollowing)
        });
      }, function (err) {
        console.log('Something went wrong!', err);
        setError(err)
      });
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log('what is playlist id inside handlesubmit?', playlistId)
    // console.log('what is user id inside handlesubmit?', userId)

    isUserFollowingPlaylist(playlistId, userId);
    // console.log('isFolllowing state? ', isUserFollowing)
    // console.log(`you submitted the form with userId ${userId} and playlistId ${playlistId}!`)
  };

  // console.log('access token in dashboard?', accessToken)
  return (
    <>
      <div>
        Thanks for authorizing with Spotify.
      </div>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <label>
            Playlist Link:
            <input
              className="form"
              type="text"
              name="playlistId"
              onChange={event => setPlaylistId(event.target.value)}
            />
          </label>
          <label>
            Profile Link:
            <input
              className="form"
              type="text"
              name="userId"
              onChange={event => setUserId(event.target.value)} />
          </label>
          <input className='login-button' type="submit" value="Submit" />
        </form>
      </div>
      {/* {isUserFollowing ? */}
      <div>Is this user following this playlist? {isUserFollowing === true ? "Yes!" : "No :("}</div>
      {/* : <div></div> */}

    </>
  );
};

export default Dashboard;