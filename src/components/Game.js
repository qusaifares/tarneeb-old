import React, { useState, useEffect } from 'react';
import Player from './player/Player';
import OtherPlayer from './OtherPlayer';
import Table from './Table';
import InPlay from './InPlay';
import TeamModal from './TeamModal';
import { Link, Switch, Route } from 'react-router-dom';
import * as io from 'socket.io-client';

import useForceUpdate from './useForceUpdate';

const socket = io('http://localhost:5050');

const Game = props => {
  const [player, setPlayer] = useState({
    username: '',
    hand: [],
    score: 0,
    team: 0
  });
  const [playerNames, setPlayerNames] = useState({
    player1: null,
    player2: null,
    player3: null,
    player4: null
  });
  const [playerNumber, setPlayerNumber] = useState();
  const [roomName, setRoomName] = useState(props.match.params.roomName);

  useEffect(() => {
    socket.emit('join_room', props.match.params.roomName);
  }, []);

  const setSeat = e => {
    setPlayerNumber(e.target.dataset.number);
    let temp = player;
    temp.team = e.target.dataset.team;
    setPlayer(temp);
    socket.emit('choose_seat', {
      player: temp,
      playerNumber: e.target.dataset.number,
      roomName
    });
  };
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
    console.log(data);
    if (data) {
      if (playerNumber) {
        setPlayer(data.room.players[`player${playerNumber}`]);
      }
      if (data.tempPlayerNames) {
        setPlayerNames(data.tempPlayerNames);
        console.log('player', player);
      }
    }
  });
  return (
    <>
      <button onClick={generateDeck}>generateDeck</button>
      <button onClick={startGame}>startGame</button>
      <button onClick={() => console.log(playerNames)}>Props</button>
      <div className="table">
        <div className="player-3"></div>
        <Player player={player} />
        <Table />
        <TeamModal setSeat={setSeat} playerNames={playerNames} />
      </div>
    </>
  );
};

export default Game;
