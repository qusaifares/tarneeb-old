import React, { useState, useEffect } from 'react';
import './BidModal.css';

const BidModal = ({
  playerNames,
  winningBidder,
  playerNumber,
  currentBidder,
  bid,
  selectBid
}) => {
  const [bidOptions, setBidOptions] = useState([]);
  useEffect(() => {
    let minBid = Math.max(7, bid + 1);
    let tempBids = [];
    for (let i = minBid; i <= 13; i++) {
      tempBids.push(i);
    }
    setBidOptions(tempBids);
  }, [bid]);

  return (
    <div
      className={`bid-modal ${
        playerNumber && playerNumber === currentBidder ? 'is-bidding' : null
      }`}
    >
      {bid >= 7 ? (
        <h4>
          {playerNames[`player${winningBidder}`]} has bid {bid}
        </h4>
      ) : null}
      <div className="bid-option" onClick={selectBid} data-bid="pass">
        Pass
      </div>
      {bidOptions.map(option => (
        <div
          className="bid-option"
          onClick={selectBid}
          data-bid={option}
          key={option}
        >
          {option}
        </div>
      ))}
    </div>
  );
};

export default BidModal;
