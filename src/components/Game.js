import React, { useState } from 'react';
import Player1 from './player/Player1';
import Player2 from './player/Player2';
import Player3 from './player/Player3';
import Player4 from './player/Player4';
import OtherPlayer from './OtherPlayer';
import Table from './Table';
import InPlay from './InPlay';
import Card from './Card';
import { Link, Switch, Route } from 'react-router-dom';

import useForceUpdate from './useForceUpdate';

const Game = () => {
  const [player1, setPlayer1] = useState({});
  const [player2, setPlayer2] = useState({});
  const [player3, setPlayer3] = useState({});
  const [player4, setPlayer4] = useState({});

  const [deck, setDeck] = useState([]);

  const [cardsInPlay, setCardsInPlay] = useState({
    player1: {},
    player2: {},
    player3: {},
    player4: {},
    count: 0
  });

  //   const [cardsInPlay, setCardsInPlay] = useState({
  //     player1: {
  //       suit: 'Spades',
  //       value: 'King',
  //       number: 13,
  //       name: 'King of Spades',
  //       power: 0,
  //       player: 'player1'
  //     },
  //     player2: {
  //       suit: 'Spades',
  //       value: 'Queen',
  //       number: 12,
  //       name: 'Queen of Spades',
  //       power: 0,
  //       player: 'player2'
  //     },
  //     player3: {
  //       suit: 'Spades',
  //       value: 'Jack',
  //       number: 11,
  //       name: 'Jack of Spades',
  //       power: 0,
  //       player: 'player3'
  //     },
  //     player4: {
  //       suit: 'Spades',
  //       value: 'Ace',
  //       number: 14,
  //       name: 'Ace of Spades',
  //       power: 0,
  //       player: 'player4'
  //     }
  //   });

  const generateDeck = () => {
    const suits = ['Spades', 'Clubs', 'Hearts', 'Diamonds'];
    const numbers = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
    const values = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'Jack', 'Queen', 'King', 'Ace'];
    let tempDeck = [];
    for (let i = 0; i < suits.length; i++) {
      for (let j = 0; j < values.length; j++) {
        tempDeck.push({
          suit: suits[i],
          value: values[j],
          number: numbers[j],
          name: `${values[j]} of ${suits[i]}`,
          power: 0
        });
      }
    }
    setDeck(tempDeck);
    console.log('Generated deck');
  };

  const printDeck = () => {
    console.log(deck);
  };

  const printHands = () => {
    console.log(
      'Player 1:',
      player1.hand.map(card => card.name)
    );
    console.log(
      'Player 2:',
      player2.hand.map(card => card.name)
    );
    console.log(
      'Player 3:',
      player3.hand.map(card => card.name)
    );
    console.log(
      'Player 4:',
      player4.hand.map(card => card.name)
    );
  };
  const shuffleDeck = () => {
    let tempDeck = deck;
    for (let i = 0; i < tempDeck.length; i++) {
      let j = Math.floor(Math.random() * tempDeck.length);
      let temp = tempDeck[i];
      tempDeck[i] = tempDeck[j];
      tempDeck[j] = temp;
    }
    setDeck(tempDeck);
    console.log('Shuffled deck');
  };
  const dealCards = () => {
    for (let i = 1; i <= 4; i++) {
      let tempPlayer = { id: `player${i}`, hand: [], score: 0, turn: false };
      for (let j = 0; j < 13; j++) {
        let cardIndex = j + (i - 1) * 13;
        let tempCard = deck[cardIndex];
        tempCard.player = `player${i}`;
        tempPlayer.hand.push(tempCard);
      }
      if (i === 1) {
        setPlayer1(tempPlayer);
      } else if (i === 2) {
        setPlayer2(tempPlayer);
      } else if (i === 3) {
        setPlayer3(tempPlayer);
      } else if (i === 4) {
        setPlayer4(tempPlayer);
      }
    }
    console.log('Dealt cards');
  };

  const playCard = e => {
    let tempInPlay = cardsInPlay;
    tempInPlay[e.target.dataset.player] = {
      suit: e.target.dataset.suit,
      value: e.target.dataset.value,
      number: e.target.dataset.number,
      name: e.target.dataset.name,
      power: e.target.dataset.power,
      player: e.target.dataset.player
    };
    // increment cardsInPlay count
    tempInPlay.count++;
    setCardsInPlay(tempInPlay);

    // remove card from player hand
    // PLAYER 1
    console.log(tempInPlay);
    if (e.target.dataset.player === 'player1') {
      let tempPlayer = player1;
      const i = tempPlayer.hand.findIndex(
        card => card.name === tempInPlay[tempPlayer.id].name
      );
      if (i > -1) {
        tempPlayer.hand.splice(i, 1);
      }
      setPlayer1(tempPlayer);
      // PLAYER 2
    } else if (e.target.dataset.player === 'player2') {
      let tempPlayer = player2;
      const i = tempPlayer.hand.findIndex(
        card => card.name === tempInPlay[tempPlayer.id].name
      );
      if (i > -1) {
        tempPlayer.hand.splice(i, 1);
      }
      setPlayer2(tempPlayer);
      // PLAYER 3
    } else if (e.target.dataset.player === 'player3') {
      let tempPlayer = player3;
      const i = tempPlayer.hand.findIndex(
        card => card.name === tempInPlay[tempPlayer.id].name
      );
      if (i > -1) {
        tempPlayer.hand.splice(i, 1);
      }
      setPlayer3(tempPlayer);
      // PLAYER 4
    } else if (e.target.dataset.player === 'player4') {
      let tempPlayer = player4;
      const i = tempPlayer.hand.findIndex(
        card => card.name === tempInPlay[tempPlayer.id].name
      );
      if (i > -1) {
        tempPlayer.hand.splice(i, 1);
      }
      setPlayer4(tempPlayer);
    }

    forceUpdate(); // forces rerender
  };
  const forceUpdate = useForceUpdate();
  return (
    <>
      <button onClick={generateDeck}>Generate Deck</button>
      <button onClick={shuffleDeck}>Shuffle Deck</button>
      <button onClick={printDeck}>Print Deck</button>
      <button onClick={dealCards}>Deal Cards</button>
      <button onClick={printHands}>Print Hands</button>
      <Link to="/play/1">Player 1</Link>
      <Link to="/play/2">Player 2</Link>
      <Link to="/play/3">Player 3</Link>
      <Link to="/play/4">Player 4</Link>
      <div className="table">
        <div className="player-3"></div>
        <Table />
        <InPlay cards={cardsInPlay} />
        <Switch>
          <Route
            path="/play/1"
            component={() => <Player1 player={player1} playCard={playCard} />}
          />
          <Route
            path="/play/2"
            component={() => <Player2 player={player2} playCard={playCard} />}
          />
          <Route
            path="/play/3"
            component={() => <Player3 player={player3} playCard={playCard} />}
          />
          <Route
            path="/play/4"
            component={() => <Player4 player={player4} playCard={playCard} />}
          />
        </Switch>
        <OtherPlayer player={player2} />
        <OtherPlayer player={player3} />
        <OtherPlayer player={player4} />
      </div>
    </>
  );
};

export default Game;
