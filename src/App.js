import React, { useState } from 'react';
import { Link, Switch, Route } from 'react-router-dom';
import Login from './components/login/Login';
import Rooms from './components/rooms/Rooms';
import Game from './components/Game';

import './App.css';

const App = () => {
  const [username, setUsername] = useState('');
  return (
    <>
      <Switch>
        <Route
          path="/"
          exact
          render={routerProps => (
            <Login saveUser={setUsername} username={username} />
          )}
        />
        <Route path="/rooms" exact component={Rooms} username={username} />
        <Route
          path="/rooms/:roomName"
          exact
          render={routerProps => (
            <Game match={routerProps.match} username={username} />
          )}
        />
      </Switch>
    </>
  );
};

export default App;
