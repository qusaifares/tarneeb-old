import React from 'react';

const OtherPlayer = ({ playerNumber, direction, playerNames }) => {
  const directions = {
    1: {
      east: 2,
      north: 3,
      west: 4
    },
    2: {
      east: 3,
      north: 4,
      west: 1
    },
    3: {
      east: 4,
      north: 1,
      west: 2
    },
    4: {
      east: 1,
      north: 2,
      west: 3
    }
  };
  return (
    <div className={`other-player player-${direction}`}>
      {playerNumber
        ? playerNames[`player${directions[playerNumber][direction]}`]
        : null}
      {/* <div className="card-back-container">
        {player.hand &&
          player.hand.map(card => (
            <img
              src={`${process.env.PUBLIC_URL}/images/cards/red_back.png`}
              alt=""
              key={card.name}
              className="card-back"
            />
          ))}
      </div> */}
    </div>
  );
};

export default OtherPlayer;
