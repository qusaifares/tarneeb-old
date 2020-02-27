import React, { Component } from 'react';
import Player from './components/Player';
import Table from './components/Table';
import Card from './components/Card';
import './App.css';

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playerNumber: 1,
      player1: {},
      player2: {},
      player3: {},
      player4: {},
      deck: [],
      cardsInPlay: {
        player1: {},
        player2: {},
        player3: {},
        player4: {}
      }
    };
  }
  generateDeck = () => {
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
    this.setState({ deck: tempDeck });
    console.log('Generated deck');
  };
  printDeck = () => {
    console.log(this.state.deck);
  };
  printHands = () => {
    console.log(
      this.state.player1,
      this.state.player2,
      this.state.player3,
      this.state.player4
    );
  };
  shuffleDeck = () => {
    let tempDeck = this.state.deck;
    for (let i = 0; i < tempDeck.length; i++) {
      let j = Math.floor(Math.random() * tempDeck.length);
      let temp = tempDeck[i];
      tempDeck[i] = tempDeck[j];
      tempDeck[j] = temp;
    }
    console.log('Shuffled deck');
  };
  dealCards = () => {
    for (let i = 1; i <= 4; i++) {
      let tempPlayer = { hand: [], score: 0 };
      for (let j = 0; j < 13; j++) {
        let cardIndex = j + (i - 1) * 13;
        tempPlayer.hand.push(this.state.deck[cardIndex]);
      }
      this.setState({ [`player${i}`]: tempPlayer });
    }
    console.log('Dealt cards');
  };
  playCard = () => {};
  render() {
    return (
      <>
        <button onClick={this.generateDeck}>Generate Deck</button>
        <button onClick={this.shuffleDeck}>Shuffle Deck</button>
        <button onClick={this.printDeck}>Print Deck</button>
        <button onClick={this.dealCards}>Deal Cards</button>
        <button onClick={this.printHands}>Print Hands</button>
        <Table />
        <Player data={this.state.player1} />
      </>
    );
  }
}

export default App;
