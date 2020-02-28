import React, { useState, useEffect } from 'react';
import Card from '../Card';

const Player = ({ player, playCard }) => {
  const logPlayer = () => {
    console.log(player);
  };

  return (
    <div className="player">
      <button onClick={logPlayer}>Log Player</button>
      <div className="cards-container">
        {player.hand &&
          player.hand.map(card => (
            <Card playCard={playCard} card={card} key={card.name} />
          ))}
      </div>
    </div>
  );
};

export default Player;
