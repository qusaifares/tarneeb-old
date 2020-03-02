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
          path="/tarneeb"
          exact
          render={routerProps => <Login saveUser={setUsername} />}
        />
        <Route path="/tarneeb/rooms" exact component={Rooms} />
        <Route
          path="/tarneeb/rooms/:room"
          exact
          render={routerProps => <Game match={routerProps.match} />}
        />
      </Switch>
    </>
  );
};

export default App;
