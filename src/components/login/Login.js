import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import './Login.css';
const url = 'http://localhost:5050';

const Login = ({ saveUser }) => {
  const [formType, setFormType] = useState('login');
  const [userString, setUserString] = useState('');
  const [passwordString, setPasswordString] = useState('');
  let history = useHistory();

  function pushUrl(url) {
    history.push(url);
  }

  const submitLogin = e => {
    e.preventDefault();
    fetch(`${url}/users/create`, {
      method: 'POST',
      body: JSON.stringify({
        username: userString,
        password: passwordString
      })
    })
      .then(res => res.json())
      .then(data => console.log(data))
      .catch(console.error);
  };
  return (
    <section id="login">
      <form method="POST" className="login-form" onSubmit={submitLogin}>
        <h3>Welcome</h3>
        <input
          onChange={e => setUserString(e.target.value)}
          className="login-input user-input"
          type="text"
          name="userString"
          id="userString"
          value={userString}
          placeholder="Username"
        />
        <input
          onChange={e => setPasswordString(e.target.value)}
          className="login-input password-input"
          type="text"
          name="passwordString"
          id="passwordString"
          value={passwordString}
          placeholder="Password"
        />
        <button className="login-btn" type="submit">
          Log In
        </button>
      </form>
    </section>
  );
};

export default Login;
