import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import LoginBg from './LoginBg';
import './Login.css';
const url = 'http://localhost:5050';

const Login = ({ saveUser, username }) => {
  const [formType, setFormType] = useState('login');
  const [userString, setUserString] = useState('');
  const [passwordString, setPasswordString] = useState('');
  let history = useHistory();

  function pushUrl(url) {
    history.push(url);
  }

  useEffect(() => {
    if (username) {
      history.push('/tarneeb/rooms');
    }
  }, []);

  const submitLogin = e => {
    e.preventDefault();
    const info = {
      username: userString,
      password: passwordString
    };
    console.log(info);
    fetch(`${url}/users/login`, {
      method: 'POST',
      body: JSON.stringify(info),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(data => {
        saveUser(data.username);
        history.push('/tarneeb/rooms');
      })
      .catch(console.error);
  };

  const submitSignup = e => {
    e.preventDefault();
    const info = {
      username: userString,
      password: passwordString
    };
    console.log(info);
    fetch(`${url}/users/create`, {
      method: 'POST',
      body: JSON.stringify(info),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(data => console.log(data))
      .catch(console.error);
  };
  return (
    <section id="login">
      <LoginBg />
      <form
        autocomplete="off"
        method="POST"
        className="login-form"
        onSubmit={formType === 'login' ? submitLogin : submitSignup}
      >
        <div className="form-switch">
          <div
            onClick={() => setFormType('signup')}
            className={`signup-selector selector ${
              formType === 'signup' ? 'active' : 'inactive'
            }`}
          >
            Sign Up
          </div>
          <div
            onClick={() => setFormType('login')}
            className={`login-selector selector ${
              formType === 'login' ? 'active' : 'inactive'
            }`}
          >
            Log In
          </div>
        </div>
        <h3>{formType === 'login' ? 'Welcome back' : 'Create account'}</h3>
        <div className={`input-container ${userString ? 'focus' : ''}`}>
          <label>Username</label>
          <input
            onChange={e => setUserString(e.target.value)}
            className="login-input user-input"
            type="text"
            name="userString"
            id="userString"
            value={userString}
          ></input>
        </div>
        <div className={`input-container ${passwordString ? 'focus' : ''}`}>
          <label>Password</label>
          <input
            onChange={e => setPasswordString(e.target.value)}
            className="login-input password-input"
            type="password"
            name="passwordString"
            id="passwordString"
            value={passwordString}
          ></input>
        </div>
        <button className="login-btn" type="submit">
          {formType === 'login' ? 'Log In' : 'Sign Up'}
        </button>
      </form>
    </section>
  );
};

export default Login;
