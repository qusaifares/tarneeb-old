import React, { useState, useEffect } from 'react';
import Card from './Card';

const InPlay = ({ cards }) => {
  const [cardsData, setCardsData] = useState(cards);

  useEffect(() => {
    setCardsData(cards);
  }, [cards]);

  return (
    <div className="in-play">
      <div className="play-card play-1">
        <Card card={cards.player1} key={cards.player1.name} />
      </div>
      <div className="play-card play-2">
        <Card card={cards.player2} key={cards.player2.name} />
      </div>
      <div className="play-card play-3">
        <Card card={cards.player3} key={cards.player3.name} />
      </div>
      <div className="play-card play-4">
        <Card card={cards.player4} key={cards.player4.name} />
      </div>
    </div>
  );
};

export default InPlay;
