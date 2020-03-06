import React, { useState } from 'react';

const TeamModal = ({ playerNames, setSeat, playerNumber }) => {
  return (
    <div className={`teams-modal ${playerNumber ? 'modal-hidden' : null}`}>
      <div className="team-1-select team-select">
        <h4>Team 1</h4>
        <div
          onClick={setSeat}
          className="player-1-select player-select"
          data-team={1}
          data-number={1}
        >
          {playerNames.player1 ? playerNames.player1 : 'Player 1'}
        </div>
        <div
          onClick={setSeat}
          className="player-3-select player-select"
          data-team={1}
          data-number={3}
        >
          {playerNames.player3 ? playerNames.player3 : 'Player 3'}
        </div>
      </div>
      <div className="team-2-select team-select">
        <h4>Team 2</h4>
        <div
          onClick={setSeat}
          className="player-2-select player-select"
          data-team={2}
          data-number={2}
        >
          {playerNames.player2 ? playerNames.player2 : 'Player 2'}
        </div>
        <div
          onClick={setSeat}
          className="player-4-select player-select"
          data-team={2}
          data-number={4}
        >
          {playerNames.player4 ? playerNames.player4 : 'Player 4'}
        </div>
      </div>
    </div>
  );
};

export default TeamModal;
