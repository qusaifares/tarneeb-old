import React, { useState } from 'react';
import Player from './components/Player';
import Table from './components/Table';
import Card from './components/Card';
import './App.css';

const App = () => {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     playerNumber: 1,
  //     player1: {},
  //     player2: {},
  //     player3: {},
  //     player4: {},
  //     deck: [],
  //     cardsInPlay: {
  //       player1: {},
  //       player2: {},
  //       player3: {},
  //       player4: {}
  //     }
  //   };
  // }

  const [players, setPlayers] = useState({
    player1: {},
    player2: {},
    player3: {},
    player4: {}
  });
  const [deck, setDeck] = useState([]);

  const [cardsInPlay, setCardsInPlay] = useState({
    player1: {},
    player2: {},
    player3: {},
    player4: {}
  });

  const generateDeck = () => {
    const suits = ['Spades', 'Clubs', 'Hearts', 'Diamonds'];
    const numbers = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
    const values = [
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
      '10',
      'Jack',
      'Queen',
      'King',
      'Ace'
    ];
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
    for (let i = 1; i <= 4; i++) {
      console.log(
        `Player ${i}`,
        players[`player${i}`].hand.map(card => card.name)
      );
    }
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
    let tempPlayers = players;
    for (let i = 1; i <= 4; i++) {
      let tempPlayer = { hand: [], score: 0 };
      for (let j = 0; j < 13; j++) {
        let cardIndex = j + (i - 1) * 13;
        tempPlayer.hand.push(deck[cardIndex]);
      }
      tempPlayers[`player${i}`] = tempPlayer;
      setPlayers(tempPlayers);
    }
    console.log('Dealt cards');
  };
  return (
    <>
      <button onClick={generateDeck}>Generate Deck</button>
      <button onClick={shuffleDeck}>Shuffle Deck</button>
      <button onClick={printDeck}>Print Deck</button>
      <button onClick={dealCards}>Deal Cards</button>
      <button onClick={printHands}>Print Hands</button>
      <Table />
      <Player data={players.player1} />
    </>
  );
};

export default App;
