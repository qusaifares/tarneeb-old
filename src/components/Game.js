import React, { useState } from 'react';
import Player from './Player';
import OtherPlayer from './OtherPlayer';
import Table from './Table';
import InPlay from './InPlay';
import Card from './Card';
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
      <div className="table">
        <div className="player-3"></div>
        <Table />
        <InPlay cards={cardsInPlay} />
        <Player player={player1} playCard={playCard} />
        <OtherPlayer player={player2} />
        <OtherPlayer player={player3} />
        <OtherPlayer player={player4} />
      </div>
    </>
  );
};

export default Game;