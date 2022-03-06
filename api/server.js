// Following this tutorial: https://dev.to/dipscoder/spotify-authentication-using-client-react-and-server-expressjs-27l0

const express = require('express');
const cors = require('cors');
const spotifyWebApi = require('spotify-web-api-node');

const app = express();
const port = 8000;

app.use(cors()) // To handle cross-origin requests
app.use(express.json()); // To parse JSON bodies

require('dotenv').config();

const credentials = {
  clientId: process.env.REACT_APP_CLIENT_ID,
  redirectUri: process.env.REACT_APP_REDIRECT_URI,
  clientSecret: process.env.REACT_APP_CLIENT_SECRET,
};

app.get('/', (_req, res) => {
  res.send('Hello World!')
})

app.post('/login', (req, res) => {
  // Setup 
  let spotifyApi = new spotifyWebApi(credentials)
  console.log(credentials)

  // Get the "code" value posted from the client-side and get the user's accessToken from the spotify API     
  const code = req.body.code

  // Retrieve access token
  spotifyApi.authorizationCodeGrant(code).then((data) => {
    // Return the user's accessToken in JSON format
    console.log('access token from server? ', data.body.access_token)
    res.json({
      accessToken: data.body.access_token,
    })
  })
    .catch((err) => {
      console.log(err);
      res.sendStatus(400)
    })
})

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`)
})