import React from 'react';

const OtherPlayer = ({ player }) => {
  return (
    <div className={`other-player ${player.id}`}>
      <div className="card-back-container">
        {player.hand &&
          player.hand.map(card => (
            <img
              src={`${process.env.PUBLIC_URL}/images/cards/red_back.png`}
              alt=""
              key={card.name}
              className="card-back"
            />
          ))}
      </div>
    </div>
  );
};

export default OtherPlayer;
