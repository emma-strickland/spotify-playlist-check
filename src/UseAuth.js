import { useEffect, useState } from "react";
import axios from 'axios';

// useAuth will request the server with the code value, and in response, the server will 
// return the accessToken of the User
const UseAuth = (code) => {
  const [accessToken, setAccessToken] = useState();

  // We have written our login in a useEffect with the dependency of code, 
  // so whenever our code value changes, this useEffect will run.
  useEffect(() => {
    axios
      // We are making a post request at the '/login' route to our server with the code value.
      // The server in response will send the accessToken, which we store in the state with the help of useState.
      .post("http://localhost:8000/login", { code })
      .then((response) => {

        // If success then cut the code string from the URL and execute the other thing
        window.history.pushState({}, null, "/");

        console.log(response.data);
        setAccessToken(response.data.accessToken);

      })
      .catch(() => {
        // If fail redirect to home page - Login page
        window.location = "/";
      });
  }, [code]);

  return accessToken
};

export default UseAuth;