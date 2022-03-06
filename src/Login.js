import React from 'react'
import { loginUrl } from './spotifyConfig.js';

function Login() {
  return (
    <div>
      <a className='login-button' href={loginUrl}>LOGIN WITH SPOTIFY</a>
    </div>
  )
}

export default Login