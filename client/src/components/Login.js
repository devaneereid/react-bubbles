import React, { useState } from "react";
import { axiosWithAuth } from '../utils/axiosWithAuth';

const Login = (props) => {
  const [data, setData] = useState({
    username: '',
    password: ''
  });
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const handleChange = e => {
    e.preventDefault();
    setData({
      ...data,
      [e.target.name]: e.target.value
    })
  };

  const login = e => {
    e.preventDefault();
    axiosWithAuth()
      .post('/api/login', data)
      .then(res => {
        localStorage.setItem('token', res.data.payload);
        props.history.push('/bubblepage');
      })
      .catch(err => console.log(err, 'Login to Continue'));
  };

  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
        {/* <p>Build a login page here</p> */}
          <form onSubmit={login}>
            <input
              type='text'
              name='username'
              value={data.username}
              onChange={handleChange}
              placeholder='Username'
              />
            <input
              type='password'
              name='password'
              value={data.password}
              onChange={handleChange}
              placeholder='Password'
              />
            <button type='submit'>Login</button>
          </form>
    </>
  );
};

export default Login;
