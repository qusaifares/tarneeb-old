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
  const forceUpdate = useForceUpdate();
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
    let tempPlayer = player;
    tempPlayer.username = props.username;
    setPlayer(tempPlayer);
    socket.emit('join_room', props.match.params.roomName);
    socket.on('return_deck', data => {
      console.log(data);
    });
    socket.on('return_room', room => {
      console.log('room', room);
      console.log('pnum', playerNumber);
      if (room) {
        if (playerNumber) {
          console.log(room);
          setPlayer(room.players[`player${playerNumber}`]);
        }
        setPlayerNames({
          player1: room.players.player1.username,
          player2: room.players.player2.username,
          player3: room.players.player3.username,
          player4: room.players.player4.username
        });
        console.log('player', player);
      }
    });
    socket.on('return_seats', data => {
      console.log('SEATS RETURNED', data);
      if (data) {
        if (playerNumber) {
          setPlayer(data.room.players[`player${playerNumber}`]);
        }
        setPlayerNames({
          player1: data.room.player1.username,
          player2: data.room.player2.username,
          player3: data.room.player3.username,
          player4: data.room.player4.username
        });
        console.log('player', player);
        forceUpdate();
      }
    });
    // Component unmount
    return () => {
      if (playerNumber) {
        socket.emit('leave_room', {
          roomName: props.match.params.roomName,
          playerNumber
        });
      }
    };
  }, []);

  const setSeat = e => {
    console.log('data-num', e.target.dataset.number);
    // Get player number from event target dataset
    setPlayerNumber(parseInt(e.target.dataset.number));
    // Change player team and playerNumber
    let temp = player;
    temp.team = e.target.dataset.team;
    temp.username = props.username;
    setPlayer(temp);
    console.log('temp', temp);
    // Tell server we chose seat
    socket.emit('choose_seat', {
      player: temp,
      playerNumber: e.target.dataset.number,
      roomName: props.match.params.roomName,
      username: props.username
    });
  };
  const generateDeck = () => {
    socket.emit('generate_deck', 'qusai');
  };
  const startGame = () => {
    socket.emit('start_game', roomName);
  };

  return (
    <>
      <button onClick={generateDeck}>generateDeck</button>
      <button onClick={startGame}>startGame</button>
      <button onClick={() => console.log(playerNames)}>Props</button>
      <div className="table">
        <div className="player-3"></div>
        {playerNumber ? <Player player={player} /> : null}
        <Table />
        <TeamModal setSeat={setSeat} playerNames={playerNames} />
      </div>
    </>
  );
};

export default Game;
