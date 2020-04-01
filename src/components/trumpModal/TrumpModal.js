import React from 'react';
import './TrumpModal.css';

const TrumpModal = ({ selectTrump, trumpChooser }) => {
  return (
    <div className={`trump-modal ${trumpChooser ? 'active' : null}`}>
      <div onClick={selectTrump} className="trump-choice" data-trump="Spades">
        Spades
      </div>
      <div onClick={selectTrump} className="trump-choice" data-trump="Hearts">
        Hearts
      </div>
      <div onClick={selectTrump} className="trump-choice" data-trump="Clubs">
        Clubs
      </div>
      <div onClick={selectTrump} className="trump-choice" data-trump="Diamonds">
        Diamonds
      </div>
    </div>
  );
};

export default TrumpModal;
