import React from 'react';
import './TrumpModal.css';

const TrumpModal = ({ chooseTrump, trumpChooser }) => {
  return (
    <div className={`trump-modal ${trumpChooser ? 'active' : null}`}>
      <div onClick={chooseTrump} className="trump-choice" data-trump="spades">
        Spades
      </div>
      <div onClick={chooseTrump} className="trump-choice" data-trump="hearts">
        Hearts
      </div>
      <div onClick={chooseTrump} className="trump-choice" data-trump="clubs">
        Clubs
      </div>
      <div onClick={chooseTrump} className="trump-choice" data-trump="diamonds">
        Diamonds
      </div>
    </div>
  );
};

export default TrumpModal;
