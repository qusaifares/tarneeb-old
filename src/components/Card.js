import React, { useState, useEffect } from 'react';

const Card = ({ card, playCard }) => {
  const [cardData, setCardData] = useState();

  useEffect(() => {
    setCardData(card);
  }, [card]);

  if (card && card.name) {
    return (
      <img
        onClick={playCard}
        src={`${process.env.PUBLIC_URL}/images/cards/${
          !isNaN(card.rank) ? card.rank : card.rank.charAt(0)
        }${card.suit.charAt(0)}.png`}
        alt={card.name}
        data-suit={card.suit}
        data-rank={card.rank}
        data-value={card.value}
        data-name={card.name}
        data-power={card.power}
        data-player={card.player}
        className="card-img"
      />
    );
  } else {
    return <div></div>;
  }
};

export default Card;
