import React, { useState, useEffect } from 'react';
import Player from './player/Player';
import OtherPlayer from './OtherPlayer';
import Table from './Table';
import InPlay from './InPlay';
import { Link, Switch, Route } from 'react-router-dom';
import * as io from 'socket.io-client';

import useForceUpdate from './useForceUpdate';

const socket = io('http://localhost:5050');

const Game = props => {
  const [player, setPlayer] = useState({
    username: '',
    hand: []
  });
  const [playerNumber, setPlayerNumber] = useState(1);
  const [username, setUsername] = useState('qusai');
  const [room, setRoom] = useState(props.match.params.room);

  const generateDeck = () => {
    socket.emit('generate_deck', 'qusai');
  };
  const startGame = () => {
    socket.emit('start_game', 'qusai');
  };
  socket.on('return_deck', data => {
    console.log(data);
  });
  socket.on('return_room', data => {
    console.log(data.players);
    setPlayer(data.players[`player${playerNumber}`]);
    console.log('player', player);
  });
  return (
    <>
      <button onClick={generateDeck}>generateDeck</button>
      <button onClick={startGame}>startGame</button>
      <button onClick={() => console.log(props)}>Props</button>
      <div className="table">
        <div className="player-3"></div>
        <Player player={player} />
        <Table />
      </div>
    </>
  );
};

export default Game;
